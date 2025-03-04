import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';

import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const jwtCookies = cookieStore.get('jwt')?.value;

        if (!jwtCookies) {
            throw Error('Unauthorized!');
        }

        const jwtDecoded = jwt.verify(jwtCookies, process.env.JWT_SECRET as string) as JwtPayload;
        const user = await prisma.users.findUnique({
            where: {
                id: jwtDecoded.id,
                active: true
            },
            omit: {
                password: true
            }
        });

        if (!user) {
            throw Error("Unauthorized.");
        }

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 401 });
    }
}