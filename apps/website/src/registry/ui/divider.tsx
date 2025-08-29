"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const dividerVariants = cva(
	"bg-soft-alpha shrink-0 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px",
	{
		variants: {
			orientation: {
				horizontal: "",
				vertical: "",
			},
			margin: {
				"0": "",
				"2": "my-0.5 data-[orientation=vertical]:mx-0.5 data-[orientation=vertical]:my-0",
				"4": "my-1 data-[orientation=vertical]:mx-1 data-[orientation=vertical]:my-0",
				"6": "my-1.5 data-[orientation=vertical]:mx-1.5 data-[orientation=vertical]:my-0",
				"8": "my-2 data-[orientation=vertical]:mx-2 data-[orientation=vertical]:my-0",
				"12": "my-3 data-[orientation=vertical]:mx-3 data-[orientation=vertical]:my-0",
				"16": "my-4 data-[orientation=vertical]:mx-4 data-[orientation=vertical]:my-0",
				"24": "my-6 data-[orientation=vertical]:mx-6 data-[orientation=vertical]:my-0",
				"32": "my-8 data-[orientation=vertical]:mx-8 data-[orientation=vertical]:my-0",
				"40": "my-10 data-[orientation=vertical]:mx-10 data-[orientation=vertical]:my-0",
			},
		},
		defaultVariants: {
			orientation: "horizontal",
			margin: "4",
		},
	}
)

// Omit 'orientation' from Radix props to avoid conflict with variant props
type SeparatorRootProps = Omit<React.ComponentProps<typeof SeparatorPrimitive.Root>, "orientation">

// Narrow margin type so it’s required and excludes null/undefined/none
type DividerMargin = Exclude<VariantProps<typeof dividerVariants>["margin"], "none" | null | undefined>

interface DividerProps extends SeparatorRootProps {
	orientation?: "horizontal" | "vertical"
	margin?: DividerMargin
	className?: string
	decorative?: boolean
}

function Divider({ className, orientation = "horizontal", decorative = true, margin = "4", ...props }: DividerProps) {
	return (
		<SeparatorPrimitive.Root data-slot="divider" decorative={decorative} orientation={orientation} className={cn(dividerVariants({ orientation, margin }), className)} {...props} />
	)
}

export { Divider }
