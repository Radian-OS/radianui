"use client"

import React from "react"
import { type VariantProps } from "class-variance-authority"
import CurrencyInputField from "react-currency-input-field"
import { cn } from "@/lib/utils"
import { inputVariants } from "@/styles/lyra/ui/input"

export type CurrencyInputProps = Omit<
	React.ComponentProps<typeof CurrencyInputField>,
	"size"
> & {
	size?: VariantProps<typeof inputVariants>["size"]
}

function CurrencyInput({ className, size, ...props }: CurrencyInputProps) {
	return (
		<CurrencyInputField
			data-slot="currency-input"
			className={cn(inputVariants({ size }), className)}
			allowDecimals={true}
			decimalsLimit={2}
			allowNegativeValue={false}
			{...props}
		/>
	)
}

CurrencyInput.displayName = "CurrencyInput"

export { CurrencyInput, inputVariants as currencyInputVariants }
