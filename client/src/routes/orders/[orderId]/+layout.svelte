<script lang="ts">
    let { children, params, data } = $props();

</script>

<h1>Arbeitskarte {params.orderId}</h1>
<h2>Kunde</h2>
<a href={`/orders/${params.orderId}/customer`}>Kunde bearbeiten</a>
<ul>
    <!-- <li>{data.order.customer.name}</li>
    <li>{data.order.customer.email}</li>
    <li>{data.order.customer.street}</li>
    <li>{data.order.customer.postalCode} {data.order.customer.city}</li> -->
</ul>
<h2>Aufgaben</h2>
<a href={`/orders/${params.orderId}/task`}>Neue Aufgabe</a>
<table>
    <thead>
        <tr>
            <th>Titel</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
        {#each data.tasks as task}
            <tr>
                <th
                    ><a
                        href={`/orders/${params.orderId}/task/${task.id}`}
                        >{task.description}</a
                    ></th
                >
                <td>{task.doneAt ? new Date(task.doneAt).toLocaleDateString() : "Offen"}</td>
            </tr>
        {/each}
    </tbody>
</table>

{@render children?.()}
