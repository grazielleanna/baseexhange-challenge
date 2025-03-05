/* eslint-disable @typescript-eslint/no-unused-vars */

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose'

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const isApiRoute = pathname.startsWith('/api');

    const userIsAuthenticated = await getUserAuthentication();

    if (!userIsAuthenticated) {
        if (isApiRoute) {
            return NextResponse.json({ message: 'Unauthorized!' }, { status: 401 })
        } else {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}

/**
 * @author: Grazielle Conceição
 * @since: 2025-03-04
 * @description: Function that gets JWT from cookies and checks if is valid
 * @returns 
 */
async function getUserAuthentication() {
    try {
        const cookieStore = await cookies();

        const jwtCookie = cookieStore.get("jwt")?.value;

        if (jwtCookie) {
            const jwtDecoded = await jose.jwtVerify(jwtCookie as string, new TextEncoder().encode(process.env.JWT_SECRET))

            if (!jwtDecoded) {
                return false;
            }

            return true;
        }

        return false;
    } catch (error) {
        return false;
    }
}

export const config = {
    matcher: ["/admin/:path*", "/api/users/:path*", "/api/orders/:path*"],
};