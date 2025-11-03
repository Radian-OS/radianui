"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { VariantProps, cva } from "class-variance-authority"
import { Check, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> &
	VariantProps<typeof checkboxVariants> & {
		icon?: React.ReactNode
	}

// Define the variants for the Checkbox using cva.
const checkboxVariants = cva(
	cn(
		"group peer bg-bg shrink-0 border border-border ring-offset-bg focus-visible:outline-none",
		"focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
		"data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-white",
		"aria-invalid:border-error/60 aria-invalid:ring-error/10 dark:aria-invalid:border-error dark:aria-invalid:ring-error/20",
		"[[data-invalid=true]_&]:border-error/60 [[data-invalid=true]_&]:ring-error/10  dark:[[data-invalid=true]_&]:border-error dark:[[data-invalid=true]_&]:ring-error/20"
	),
	{
		variants: {
			size: {
				sm: "size-4 [&_svg]:size-3.5 rounded-sm",
				md: "size-5 [&_svg]:size-4 rounded-md",
				lg: "size-6 [&_svg]:size-4.5 rounded-md",
			},
		},
		defaultVariants: {
			size: "md",
		},
	}
)

function Checkbox({ className, size, icon, ...props }: CheckboxProps) {
	return (
		<CheckboxPrimitive.Root data-slot="checkbox" className={cn(checkboxVariants({ size }), className)} {...props}>
			<CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="flex items-center justify-center text-current">
				<div className="group-data-[state=indeterminate]:hidden">{icon || <Check />}</div>
				<Minus className="hidden group-data-[state=indeterminate]:block" />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	)
}
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
