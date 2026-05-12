"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { IconSlot } from "@/registry/icon-library"

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> &
	VariantProps<typeof checkboxVariants> & {
		icon?: React.ReactNode
	}

const checkboxVariants = cva(
	cn(
		"flex items-center justify-center group peer shrink-0 border ring-offset-bg focus-visible:outline-none cn-checkbox",
		"focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
	),
	{
		variants: {
			size: {
				sm: "size-4 [&_svg]:size-3.5 cn-checkbox-sm",
				md: "size-5 [&_svg]:size-4 cn-checkbox-md",
				lg: "size-6 [&_svg]:size-4.5 cn-checkbox-lg",
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
				className="cn-checkbox-indicator">
				<div className="group-data-[state=indeterminate]:hidden">
					{icon || <IconSlot slot="check" />}
				</div>
				<IconSlot
					slot="minus"
					className="hidden group-data-[state=indeterminate]:block"
				/>
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	)
}

Checkbox.displayName = CheckboxPrimitive.Root.displayName
export { Checkbox }
