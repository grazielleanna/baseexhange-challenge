"use client"

import Image from "next/image";
import { useForm } from "react-hook-form";

import { Input, Select } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

export function AdminFilter() {

    const form = useForm();

    return (
        <Form {...form}>
            <form className="flex flex-wrap xl:flex-nowrap items-center gap-8 md:gap-12">
                <div className="w-full md:w-[280px]">
                    <Input
                        label="ID da Ordem"
                        control={form.control}
                        name="id"
                        className="bg-transparent"
                        placeholder="Digite um ID..."
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
                        options={[]}
                        placeholder="Selecione um status"
                        classes={{ trigger: 'w-full' }}
                    />
                </div>

                <Button className="flex items-center justify-center gap-1 font-bold rounded-sm w-full max-w-full md:max-w-[217px]" variant="secondary">
                    <Image
                        src="/icons/search.svg"
                        width={19.39}
                        height={18.39}
                        alt="Icon search"
                    />
                    Filtrar resultados
                </Button>
            </form>
        </Form>
    )
}