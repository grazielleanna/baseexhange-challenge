import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * @author: Grazielle Conceição
 * @since: 2025-03-04
 * @param value 
 */
function numberFormat(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat('pt-BR', { ...options }).format(value)
}

export {
  cn,
  numberFormat
}