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
const checkboxVariants = cva("cn-checkbox", {
	variants: {
		size: {
			sm: "cn-checkbox-size-sm",
			md: "cn-checkbox-size-md",
			lg: "cn-checkbox-size-lg",
		},
	},
	defaultVariants: {
		size: "md",
	},
})

function Checkbox({ className, size, icon, ...props }: CheckboxProps) {
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={cn(checkboxVariants({ size }), className)}
			{...props}>
			<CheckboxPrimitive.Indicator
				data-slot="checkbox-indicator"
				className="cn-checkbox-indicator">
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
