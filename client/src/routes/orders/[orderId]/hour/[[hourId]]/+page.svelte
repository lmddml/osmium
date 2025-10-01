<script lang="ts">
    import { goto, invalidateAll } from "$app/navigation";
    import { onMount } from "svelte";

    const { params, data } = $props();

    const hourId = params.hourId?.toString();
    const hour = data.hours.find((h) => h.id?.toString() === hourId);

    let description = $state(hour?.description ?? "");
    let position = $state(hour?.position ?? 0);
    let doneAt = $state(hour?.doneAt ?? 0);
    let dialog: HTMLDialogElement | null = null;

    function handleClose() {
        goto(`/orders/${params.orderId}`);
    }

    onMount(() => {
        dialog?.showModal();
    });

    const handleSubmit = async (e: SubmitEvent) => {
        if (!taskId) {
            const maxPosition = Math.max(
                0,
                ...data.tasks.map((t) => t.position ?? 0),
            );
            await fetch("/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    description,
                    position: maxPosition + 1,
                    doneAt,
                    orderId: data.order.id,
                }),
            });
        } else {
            await fetch(`/api/tasks/${taskId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description, position, doneAt }),
            });
        }
        await invalidateAll();
    };
</script>

<dialog closedby="any" bind:this={dialog} onclose={handleClose}>
    <h1>Aufgabe: {taskId ?? "Neu"}</h1>
    <form method="dialog" onsubmit={handleSubmit}>
        <textarea name="description" bind:value={description}></textarea>
        <input type="number" name="position" bind:value={position} />
        <input type="date" name="doneAt" bind:value={doneAt} />
        <button type="submit">OK</button>
    </form>
</dialog>
