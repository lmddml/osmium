import type { SelectOrder, SelectTask } from '$lib/types';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params, fetch }) => {
    const response = await fetch("/api/orders/" + params.orderId + "?_embed=customer");
    const order: SelectOrder = await response.json();
    
    const tasksResponse = await fetch("/api/tasks?orderId=" + order.id);
    const tasks: SelectTask[] = await tasksResponse.json();

    // const hoursResponse = await fetch("/api/hours?orderId=" + order.id);
    // const hours: Hour[] = await hoursResponse.json();
    
    return {
        order: order,
        tasks: tasks,
        hours: []
    }
};
