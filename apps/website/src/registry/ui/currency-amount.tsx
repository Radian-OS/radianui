import React, { forwardRef } from "react"
import { type VariantProps, cva } from "class-variance-authority"
import CurrencyInput from "react-currency-input-field"
import { cn } from "@/lib/utils"

const currencyInputVariants = cva(
	`
  flex w-full bg-bg border border-alpha transition-[color,box-shadow] text-fg placeholder:text-fg-tertiary
  focus-visible:ring-primary-focus focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2
  disabled:cursor-not-allowed disabled:opacity-60 disabled:text-fg-disabled disabled:bg-fill1
  [&[readonly]]:bg-fill1 [&[readonly]]:cursor-not-allowed
  file:h-full [&[type=file]]:py-0 file:border-solid file:border-alpha file:bg-transparent
  file:font-medium file:not-italic file:text-fg file:p-0 file:border-0 file:border-e
  aria-invalid:border-error aria-invalid:ring-error-focus
  `,
	{
		variants: {
			size: {
				"28": "h-7 text-xs p-1.5 rounded-md file:pe-1.5 file:me-1.5",
				"32": "h-8 text-sm px-3 py-1.5 rounded-md file:pe-3 file:me-3",
				"36": "h-9 text-sm px-2.5 py-2 rounded-lg file:pe-2.5 file:me-2.5",
				"40": "h-10 text-sm px-3 py-2.5 rounded-lg file:pe-3 file:me-3",
				"44": "h-11 text-base py-2.5 px-3.5 rounded-[10px] file:pe-3.5 file:me-3.5",
				"48": "h-12 text-base py-3 px-3.5 rounded-[10px] file:pe-3.5 file:me-3.5",
			},
		},
		defaultVariants: {
			size: "36",
		},
	}
)

export interface CurrencyInputProps extends Omit<React.ComponentProps<typeof CurrencyInput>, "className" | "size"> {
	className?: string
	size?: VariantProps<typeof currencyInputVariants>["size"]
}

const CurrencyInputField = forwardRef<HTMLInputElement, CurrencyInputProps>(({ className, size, ...props }, ref) => {
	// Ensure size is a string matching the allowed variant values
	const normalizedSize = typeof size === "number" ? (String(size) as VariantProps<typeof currencyInputVariants>["size"]) : size

	return (
		<CurrencyInput
			ref={ref}
			className={cn(currencyInputVariants({ size: normalizedSize }), className)}
			allowDecimals={true}
			decimalsLimit={2}
			allowNegativeValue={false}
			{...props}
		/>
	)
})

CurrencyInputField.displayName = "CurrencyInputField"

export { CurrencyInputField, currencyInputVariants }
