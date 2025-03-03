"use client"

import { useForm } from "react-hook-form";

import { Input } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

export function LoginForm() {

    const form = useForm();

    return (
        <Form {...form}>
            <form className="grid grid-cols-1 gap-9 mt-9">
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
                >
                    Entrar
                </Button>
            </form>
        </Form>
    )
}