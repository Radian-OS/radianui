"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { type VariantProps, cva } from "class-variance-authority"
import { Check, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> &
	VariantProps<typeof checkboxVariants> & {
		icon?: React.ReactNode
	}

// Define the variants for the Checkbox using cva.
const checkboxVariants = cva(
	cn(
		"group peer bg-bg border-border ring-offset-bg shrink-0 border focus-visible:outline-none",
		"focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
		"data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=checked]:text-white data-[state=indeterminate]:text-white",
		"aria-invalid:border-error aria-invalid:ring-error",
		"[[data-invalid=true]_&]:border-error [[data-invalid=true]_&]:ring-error"
	),
	{
		variants: {
			size: {
				sm: "size-4 rounded-sm [&_svg]:size-3.5",
				md: "size-5 rounded-md [&_svg]:size-4",
				lg: "size-6 rounded-md [&_svg]:size-4.5",
			},
		},
		defaultVariants: {
			size: "md",
		},
	}
)

function Checkbox({ className, size, icon, ...props }: CheckboxProps) {
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={cn(checkboxVariants({ size }), className)}
			{...props}>
			<CheckboxPrimitive.Indicator
				data-slot="checkbox-indicator"
				className="flex items-center justify-center text-current">
				<div className="group-data-[state=indeterminate]:hidden">
					{icon || <Check />}
				</div>
				<Minus className="hidden group-data-[state=indeterminate]:block" />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	)
}
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
