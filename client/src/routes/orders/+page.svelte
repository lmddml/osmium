<script lang="ts">
	import type { PageProps } from './$types';

let { data }: PageProps = $props();
</script>

<h1>Arbeitskarten</h1>

<ul>
    {#each data.orders as order}
        <li><a href={`/orders/${order.id}`}>{order.orderNumber}</a></li>
    {/each}
</ul>