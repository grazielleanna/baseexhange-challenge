import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";

import { IndeterminateCheckbox, Table } from "@/components/table";

export function AdminList() {

    const ordersColumns = useMemo<ColumnDef<unknown, any>[]>(
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
                accessorKey: '',
                header: 'ID da Ordem'
            },
            {
                accessorKey: '',
                header: 'Instrumento'
            },
            {
                accessorKey: '',
                header: 'Lado'
            },
            {
                accessorKey: '',
                header: 'Preço'
            },
            {
                accessorKey: '',
                header: 'Status'
            },
            {
                accessorKey: '',
                header: 'Qtd Total'
            },
            {
                accessorKey: '',
                header: 'Qtd Restante'
            },
            {
                accessorKey: '',
                header: 'Data'
            }
        ],
        []
    )

    return (
        <div className="mt-9">
            <Table
                columns={ordersColumns}
                data={[]}
            />
        </div>
    )
}