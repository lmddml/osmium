<script lang="ts">
    import { invalidate } from "$app/navigation";
    import type { PageProps } from "./$types";
    import type { InsertOrder } from "$lib/types";

    let { data }: PageProps = $props();

    const createOrder = async () => {
        try {
            const newOrder:InsertOrder = {
                customerId: null,
                orderDate: null,
                orderNumber: (Math.random()*10000).toFixed()
            }

            const response = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newOrder),
            });

            if (!response.ok) {
                const message = await response.text();
                throw new Error(message || "Failed to create order");
            }

            await invalidate("/api/orders?_embed=customer");
        } catch (error) {
            console.error("Failed to create order", error);
        } finally {
        }
    };
</script>

<h1>Arbeitskarten</h1>
<button onclick={createOrder}>Neue Arbeitskarte</button>
<ul>
    {#each data.orders as order}
        <li><a href={`/orders/${order.id}`}>{order.orderNumber}</a></li>
    {/each}
</ul>
