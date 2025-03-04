"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Input } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createLoginFormValidation } from "./validations";

export function LoginForm() {
    const router = useRouter();

    const schema = createLoginFormValidation();
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema)
    });

    async function onSubmit(values: z.infer<typeof schema>) {
        const result = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(values)
        });
        const response = await result.json();

        if (result.ok) {
            router.push('/admin/orders');
        } else {
            toast.error(response?.message);
        }
    }

    return (
        <Form {...form}>
            <form
                className="grid grid-cols-1 gap-9 mt-9"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <Input
                    name="username"
                    label="Usuário"
                    placeholder="Digite seu nome de usuário"
                    control={form.control}
                    className="w-[280px]"
                />

                <Input
                    name="password"
                    label="Senha"
                    type="password"
                    placeholder="Digite sua senha"
                    control={form.control}
                    className="w-[280px]"
                />

                <Button
                    type="submit"
                    variant="default"
                    className="w-full bg-secondary text-secondary-foreground font-bold hover:bg-secondary/80 transition-colors rounded-[4px] text-sm h-[42px]"
                    disabled={form.formState.isSubmitting || !form.formState.isValid}
                >
                    {form.formState.isSubmitting ? <Loader2 className="animate-spin" /> : 'Entrar'}
                </Button>
            </form>
        </Form>
    )
}