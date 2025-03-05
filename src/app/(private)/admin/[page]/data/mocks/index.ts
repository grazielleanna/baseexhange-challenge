const statusColor: { [x: string]: string } = {
    "Executada": "#388E3C",
    "Aberta": "#0288D1",
    "Parcial": "#F57C00",
    "Rejeitada": "#D32F2F",
};

/**
 * @author: Grazielle Conceição
 * @since: 2025-03-04
 * @param searchParams 
 * @returns 
 */
function getOrdersFilterParams(searchParams: URLSearchParams) {
    const orderId = searchParams.get('orderId');
    const instrument = searchParams.get('instrument');
    const status = searchParams.get('status');

    return {
        orderId,
        instrument,
        status
    }
}

export {
    statusColor,
    getOrdersFilterParams
}