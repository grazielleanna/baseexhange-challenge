"use client"

import { useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Trash2 } from "lucide-react";

import { Input, Select } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useSearchParamsContext } from "@/contexts/search-params";
import { createAdminFilterFormValidation } from "../data/validations/filter";
import { getOrdersFilterParams } from "../data/mocks";
import { LoadAndGetOrdersStatus } from "../data/orders";

export function AdminFilter() {
    const { searchParams, handleSearch } = useSearchParamsContext();

    const schema = createAdminFilterFormValidation();
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        mode: 'onChange'
    });

    const { orderId, instrument, status: statusParams } = getOrdersFilterParams(searchParams);
    const hasFilter = orderId || instrument || statusParams;

    const { data: status } = LoadAndGetOrdersStatus();

    useEffect(() => {
        insertFilterValuesInForm();
    }, [status]);

    /**
     * @author: Grazielle Conceição
     * @since: 2025-03-04
     */
    function onSubmit(values: z.infer<typeof schema>) {
        const params: { orderId?: string, instrument?: string, status?: string } = {};

        if (values.orderId) {
            params['orderId'] = String(values.orderId)
        };

        if (values.instrument) {
            params['instrument'] = values.instrument;
        };

        if (values.status) {
            params['status'] = values.status;
        };

        handleSearch(params);
    }

    /**
     * @author: Grazielle Conceição
     * @since: 2025-03-04
     */
    function insertFilterValuesInForm() {
        if (orderId) {
            form.setValue('orderId', orderId);
        }

        if (instrument) {
            form.setValue('instrument', instrument);
        }

        if (statusParams) {
            form.setValue('status', statusParams);
        }
    }

    /**
     * @author: Grazielle Conceição
     * @since: 2025-03-04
     */
    function handleClearFilter() {
        form.reset({
            orderId: '',
            instrument: '',
            status: null
        });

        handleSearch({});
    }

    return (
        <Form {...form}>
            <form
                className="flex flex-wrap xl:flex-nowrap items-center gap-8 md:gap-12"
                onSubmit={form.handleSubmit(onSubmit)}

            >
                <div className="w-full md:w-[280px]">
                    <Input
                        label="ID da Ordem"
                        control={form.control}
                        name="orderId"
                        className="bg-transparent"
                        placeholder="Digite um ID..."
                        type="number"
                    />
                </div>

                <div className="w-full md:w-[280px]">
                    <Input
                        label="Instrumento"
                        control={form.control}
                        name="instrument"
                        className="bg-transparent"
                        placeholder="Digite um instrumento..."
                    />
                </div>

                <div className="w-full md:w-[280px]">
                    <Select
                        name="status"
                        label="Status"
                        control={form.control}
                        options={status?.map((item) => {
                            return {
                                label: item.status,
                                value: item.status
                            }
                        }) ?? []}
                        placeholder="Selecione um status"
                        classes={{ trigger: 'w-full' }}
                    />
                </div>

                <Button
                    className="flex items-center justify-center gap-1 font-bold rounded-sm w-full max-w-full md:max-w-[217px]"
                    variant="secondary"
                    disabled={!form.formState.isValid || form.formState.isSubmitting}
                >
                    <Image
                        src="/icons/search.svg"
                        width={19.39}
                        height={18.39}
                        alt="Icon search"
                    />
                    Filtrar resultados
                </Button>

                {hasFilter && (
                    <Button
                        className="flex items-center justify-center gap-1 font-bold rounded-sm w-full max-w-full md:max-w-[217px]"
                        variant="destructive"
                        onClick={handleClearFilter}
                    >
                        <Trash2 />
                        Limpar filtro
                    </Button>
                )}
            </form>
        </Form>
    )
}