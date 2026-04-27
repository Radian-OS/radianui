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

const checkboxVariants = cva(
	cn(
		"group peer shrink-0 border focus-visible:outline-none bg-bg text-primary-fg border-border ring-offset-bg focus-visible:ring-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-fg data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-primary-fg aria-invalid:border-error aria-invalid:ring-error [[data-invalid=true]_&]:border-error [[data-invalid=true]_&]:ring-error",
		"focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
	),
	{
		variants: {
			size: {
				sm: "size-4 [&_svg]:size-3.5 rounded-none",
				md: "size-5 [&_svg]:size-4 rounded-none",
				lg: "size-6 [&_svg]:size-4.5 rounded-none",
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
			<CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="">
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
