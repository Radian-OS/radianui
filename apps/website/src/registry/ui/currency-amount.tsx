import React, { forwardRef } from "react"
import { type VariantProps } from "class-variance-authority"
import CurrencyInput from "react-currency-input-field"
import { cn } from "@/lib/utils"
import { inputVariants } from "@/registry/ui/input"

export type CurrencyInputProps = Omit<React.ComponentProps<typeof CurrencyInput>, "className" | "size"> & {
	className?: string
	size?: VariantProps<typeof inputVariants>["size"]
}

const CurrencyInputField = forwardRef<HTMLInputElement, CurrencyInputProps>(({ className, size, ...props }, ref) => {
	const normalizedSize = typeof size === "number" ? (String(size) as VariantProps<typeof inputVariants>["size"]) : size

	return <CurrencyInput ref={ref} className={cn(inputVariants({ size: normalizedSize }), className)} allowDecimals={true} decimalsLimit={2} allowNegativeValue={false} {...props} />
})

CurrencyInputField.displayName = "CurrencyInputField"

export { CurrencyInputField, inputVariants }
