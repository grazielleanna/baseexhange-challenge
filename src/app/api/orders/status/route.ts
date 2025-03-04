import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const status = await prisma.orders.findMany({
            distinct: ['status'],
            select: {
                status: true
            }
        });

        return NextResponse.json(status);
    } catch (error) {
        return NextResponse.json({ message: error instanceof Error ? error?.message : error }, { status: 500 });
    }
}