import { ComponentProps, ReactNode } from "react";
import { Control } from "react-hook-form";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input as InputBase } from '../ui/input';

interface SelectProps extends ComponentProps<typeof InputBase> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    label: string;
    name: string;
    placeholder?: string;
    description?: string | ReactNode;
}

export function Input({ control, label, name, description, placeholder, ...rest }: SelectProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="w-full">
                    <FormLabel className="mb-3 font-bold">{label}</FormLabel>
                    <FormControl>
                        <InputBase
                            placeholder={placeholder}
                            {...field}
                            {...rest}
                        />
                    </FormControl>
                    {description && (
                        <FormDescription>
                            {description}
                        </FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}