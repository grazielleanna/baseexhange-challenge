import { z } from 'zod';

/**
 * @author: Grazielle Conceição
 * @since: 2025-03-04
 * @returns 
 */
function createLoginFormValidation() {
    const schema = z.object({
        username: z.string({ required_error: 'O campo é obrigatório.' }).trim(),
        password: z.string({ required_error: 'O campo é obrigatório.' }).min(6, 'A senha deve ter no mínimo 06 caracteres.')
    });

    return schema;
}

export {
    createLoginFormValidation
}