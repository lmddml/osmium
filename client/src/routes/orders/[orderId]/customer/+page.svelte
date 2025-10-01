<script lang="ts">
    import { goto, invalidateAll } from "$app/navigation";
    import { onMount } from "svelte";

    const { params, data } = $props();

    let name = $state(data.order.customer.name);
    let email = $state(data.order.customer.email);
    let street = $state(data.order.customer.street);
    let city = $state(data.order.customer.city);
    let postalCode = $state(data.order.customer.postalCode);
    let country = $state(data.order.customer.country);
    let dialog: HTMLDialogElement | null = null;

    function handleClose() {
        goto(`/orders/${params.orderId}`);
    }

    onMount(() => {
        dialog?.showModal();
    });

    const handleSubmit = async (e: SubmitEvent) => {
        
    };
</script>

<dialog closedby="any" bind:this={dialog} onclose={handleClose}>
    <h1>Arbeitskarte</h1>
    <form method="dialog" onsubmit={handleSubmit}>
        <input type="text" name="name" bind:value={name} />
        <input type="email" name="email" bind:value={email} />
        <input type="text" name="street" bind:value={street} />
        <input type="text" name="city" bind:value={city} />
        <input type="text" name="postalCode" bind:value={postalCode} />
        <input type="text" name="country" bind:value={country} />
        <button type="submit">OK</button>
    </form>
</dialog>
