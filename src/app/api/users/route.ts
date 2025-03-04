import { NextRequest, NextResponse } from "next/server";
import argon2 from 'argon2';

import { prisma } from "@/lib/prisma";
import { Users } from "@prisma/client";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const user = await createUser(body);

        return NextResponse.json(user);
    } catch (error: unknown) {
        return NextResponse.json({ message: error instanceof Error ? error?.message : error }, { status: 500 });
    }
}

/**
 * @author: Grazielle Conceição
 * @since: 2025-03-04
 * @param data 
 * @returns 
 */
async function createUser(data: Users) {
    const { password, ...rest } = data;

    if (password.length < 6) {
        return NextResponse.json({ message: 'Password length should be more than 6 characters' }, { status: 500 });
    }

    const hashPassword = await generatePasswordHash(password);

    const user = await prisma.users.create({
        data: {
            ...rest,
            password: hashPassword
        }
    });

    return user;
}

/**
 * @author: Grazielle Conceição
 * @description Function that generates password hash to password received
 * @since: 2025-03-04
 * @param password 
 * @returns 
 */
async function generatePasswordHash(password: string) {
    const hash = await argon2.hash(password);

    return hash
}