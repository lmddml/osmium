import type { DetailOrder } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
    const response = await fetch("/api/orders?_embed=customer");
    const orders = await response.json() as DetailOrder[];

    return {
        orders: orders
    }
};