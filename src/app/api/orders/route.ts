import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const searchParams = new URLSearchParams(url.searchParams);

        const orderId = searchParams.get('orderId');
        const instrument = searchParams.get('instrument');
        const status = searchParams.get('status');

        const hasFilter = !!orderId || !!instrument || !!status;

        const orders = await prisma.orders.findMany({
            ...(hasFilter && {
                where: {
                    ...(orderId && ({
                        id: Number(orderId)
                    })),
                    ...(instrument && ({
                        instrument: {
                            contains: instrument.toLocaleLowerCase(),
                        }
                    })),
                    ...(status && ({
                        status
                    })),
                }
            })
        });

        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json({ message: error instanceof Error ? error?.message : error }, { status: 500 });
    }
}