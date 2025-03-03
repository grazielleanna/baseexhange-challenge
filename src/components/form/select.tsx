import { ReactNode } from "react";
import { Control, FieldValues } from "react-hook-form";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select as SelectBase, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Option } from "./types";

interface SelectProps {
    control: Control<FieldValues>;
    label: string;
    options: Option[];
    name: string;
    placeholder?: string;
    description?: string | ReactNode;
    classes?: {
        trigger?: string;
    }
}

export function Select({ control, label, name, options, description, placeholder, classes }: SelectProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="w-full">
                    <FormLabel className="mb-3 font-bold">{label}</FormLabel>
                    <SelectBase onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className={classes?.trigger}>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((option, index) => (
                                <SelectItem
                                    value={option.value}
                                    key={`select-${name}-${index}`}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </SelectBase>
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