import { z } from 'zod';

/**
 * @author: Grazielle Conceição
 * @since: 2025-03-04
 * @returns 
 */
function createAdminFilterFormValidation() {
    const schema = z.object({
        orderId: z.string({ required_error: 'O campo é obrigatório.' }).trim().optional(),
        instrument: z.string({ required_error: 'O campo é obrigatório.' }).trim().optional(),
        status: z.string().trim().optional().nullable()
    }).refine((data) => {
        return data.orderId || data.instrument || data.status
    });

    return schema;
}

export {
    createAdminFilterFormValidation
}