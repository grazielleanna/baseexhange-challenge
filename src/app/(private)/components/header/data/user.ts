import { Users } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

/**
 * @author: Grazielle Conceição
 * @since: 2025-03-04
 * @returns 
 */
async function getUserAuthenticated() {
    const result = await fetch(`/api/users/authenticated`, {
        method: 'GET'
    });
    const response = await result.json();

    return response;
}

/**
 * @author: Grazielle Conceição
 * @since: 2025-03-04
 * @returns 
 */
function LoadAndGetUserAuthenticated() {
    return useQuery<Users>({
        queryKey: ['users', 'authenticated'],
        queryFn: getUserAuthenticated
    })
}

export {
    LoadAndGetUserAuthenticated
}