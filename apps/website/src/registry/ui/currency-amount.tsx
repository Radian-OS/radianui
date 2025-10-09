"use client"

import React from "react"
import { type VariantProps } from "class-variance-authority"
import CurrencyInput from "react-currency-input-field"
import { cn } from "@/lib/utils"
import { inputVariants } from "@/registry/ui/input"

export type CurrencyInputProps = Omit<React.ComponentProps<typeof CurrencyInput>, "size"> & {
	size?: VariantProps<typeof inputVariants>["size"]
}

function CurrencyInputField({ className, size, ...props }: CurrencyInputProps) {
	return <CurrencyInput className={cn(inputVariants({ size }), className)} allowDecimals={true} decimalsLimit={2} allowNegativeValue={false} {...props} />
}

CurrencyInputField.displayName = "CurrencyInputField"

export { CurrencyInputField, inputVariants as currencyInputVariants }
