"use client"

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Orders } from "@prisma/client";

import { IndeterminateCheckbox, Table } from "@/components/table";
import { LoadAndGetOrders } from "../data/orders";
import { numberFormat } from "@/lib/utils";
import { getOrdersFilterParams, statusColor } from "../data/mocks";
import { useSearchParamsContext } from "@/contexts/search-params";

export function AdminList() {

    const ordersColumns = useMemo<ColumnDef<Orders, unknown>[]>(
        () => [
            {
                id: 'select',
                header: ({ table }) => (
                    <IndeterminateCheckbox
                        {...{
                            checked: table.getIsAllRowsSelected(),
                            indeterminate: table.getIsSomeRowsSelected(),
                            onChange: table.getToggleAllRowsSelectedHandler(),
                        }}
                    />
                ),
                cell: ({ row }) => (
                    <div className="px-1">
                        <IndeterminateCheckbox
                            {...{
                                checked: row.getIsSelected(),
                                disabled: !row.getCanSelect(),
                                indeterminate: row.getIsSomeSelected(),
                                onChange: row.getToggleSelectedHandler(),
                            }}
                        />
                    </div>
                ),
            },
            {
                accessorKey: 'id',
                header: 'ID da Ordem'
            },
            {
                accessorKey: 'instrument',
                header: 'Instrumento'
            },
            {
                accessorKey: 'side',
                header: 'Lado',
                cell: ({ row }) => {
                    const side = row.getValue('side');

                    if (side === 'Compra') {
                        return (
                            <Image
                                src="/icons/buy.svg"
                                width={20}
                                height={20}
                                alt="Green icon with the letter C indicating purchase of stock"
                                className="mx-auto"
                            />
                        )
                    }

                    return (
                        <Image
                            src="/icons/sale.svg"
                            width={20}
                            height={20}
                            alt="Green icon with the letter C indicating sale of shares"
                            className="mx-auto"
                        />
                    )
                }
            },
            {
                accessorKey: 'price',
                header: 'Preço',
                cell: ({ row }) => numberFormat(row.original.price, {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: ({ row }) => {
                    const status = row.getValue('status') as string;
                    const color = statusColor[status];

                    return (
                        <div className="py-2.5 px-10 rounded-full border" style={{ borderColor: color }}>
                            <span className="font-bold" style={{ color }}>{status}</span>
                        </div>
                    )
                }
            },
            {
                accessorKey: 'quantity',
                header: 'Qtd Total',
            },
            {
                accessorKey: 'remainingQuantity',
                header: 'Qtd Restante'
            },
            {
                accessorKey: 'date',
                header: 'Data'
            }
        ],
        []
    );

    const { searchParams } = useSearchParamsContext();
    const { orderId, instrument, status } = getOrdersFilterParams(searchParams);

    const { data } = LoadAndGetOrders(orderId, instrument, status);

    return (
        <div className="mt-9">
            <Table
                columns={ordersColumns}
                data={data ?? []}
            />
        </div>
    )
}