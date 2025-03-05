import { Orders } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

/**
 * @author: Grazielle Conceição
 * @since: 2025-03-04
 * @returns 
 */
async function getOrders(orderId?: string | null, instrument?: string | null, status?: string | null) {
    const params = new URLSearchParams();

    if (orderId) params.append('orderId', String(orderId))
    if (instrument) params.append('instrument', instrument)
    if (status) params.append('status', status)

    const result = await fetch(`/api/orders?${params.toString()}`, {
        method: 'GET',

    });
    const response = await result.json();

    return response;
}

/**
 * @author: Grazielle Conceição
 * @since: 2025-03-04
 * @returns 
 */
async function getOrdersStatus() {
    const result = await fetch(`/api/orders/status`, {
        method: 'GET',

    });
    const response = await result.json();

    return response;
}

/**
 * @author: Grazielle Conceição
 * @since: 2025-03-04
 * @returns 
 */
function LoadAndGetOrders(orderId?: string | null, instrument?: string | null, status?: string | null) {
    return useQuery<Orders[]>({
        queryKey: ['orders', 'list', orderId, instrument, status],
        queryFn: () => getOrders(orderId, instrument, status)
    });
}

/**
 * @author: Grazielle Conceição
 * @since: 2025-03-04
 * @returns 
 */
function LoadAndGetOrdersStatus() {
    return useQuery<{ status: string }[]>({
        queryKey: ['orders', 'status'],
        queryFn: () => getOrdersStatus()
    });
}

export {
    LoadAndGetOrders,
    LoadAndGetOrdersStatus
}