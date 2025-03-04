import { NextRequest, NextResponse } from "next/server";
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { Users } from "@prisma/client";

type LoginModel = {
    username: string;
    password: string;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as LoginModel;

        const user = await checkIfUserCredentialsAreValid(body);

        const token = await generateUserJwtToken(user);

        return new Response(JSON.stringify({ jwt: token }), {
            status: 200,
            headers: { 'Set-Cookie': `jwt=${token}; Secure` },
        });
    } catch (error: unknown) {
        return NextResponse.json({ message: error instanceof Error ? error?.message : error }, { status: 401 });
    }
}

/**
 * @author: Grazielle Conceição
 * @since: 2025-03-04
 * @param body 
 * @returns 
 */
async function checkIfUserCredentialsAreValid(body: LoginModel) {
    const { username, password } = body;

    const user = await prisma.users.findFirst({
        where: {
            username
        }
    });

    if (user) {
        const isValidCredentials = await argon2.verify(user.password, password);

        if (!isValidCredentials) {
            throw Error('Email or password incorrect.');

        }

        const { password: _, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }


    throw Error('Email or password incorrect.');
}

/**
 * @author: Grazielle Conceição
 * @since: 2025-03-04
 * @param user 
 * @returns 
 */
async function generateUserJwtToken(user: Omit<Users, 'password'>) {
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, {
        expiresIn: '1h'
    });

    const cookieStore = await cookies();
    cookieStore.set('jwt', token);

    return token;
}