import React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

export type Orientation = "horizontal" | "vertical"
export type Spacing = "0" | "2" | "4" | "6" | "8" | "12" | "16" | "20" | "24" | "32" | "40" | "80" | "120"

const dividerVariants = cva("bg-soft", {
	variants: {
		orientation: {
			horizontal: "h-0.25 w-full",
			vertical: "w-0.25 h-full",
		},
		spacing: {
			"0": "",
			"2": "",
			"4": "",
			"6": "",
			"8": "",
			"12": "",
			"16": "",
			"20": "",
			"24": "",
			"32": "",
			"40": "",
			"80": "",
			"120": "",
		},
	},
	compoundVariants: [
		// Horizontal spacing variants
		{ orientation: "horizontal", spacing: "0", class: "my-0" },
		{ orientation: "horizontal", spacing: "2", class: "my-2" },
		{ orientation: "horizontal", spacing: "4", class: "my-4" },
		{ orientation: "horizontal", spacing: "6", class: "my-6" },
		{ orientation: "horizontal", spacing: "8", class: "my-8" },
		{ orientation: "horizontal", spacing: "12", class: "my-12" },
		{ orientation: "horizontal", spacing: "16", class: "my-16" },
		{ orientation: "horizontal", spacing: "20", class: "my-20" },
		{ orientation: "horizontal", spacing: "24", class: "my-24" },
		{ orientation: "horizontal", spacing: "32", class: "my-32" },
		{ orientation: "horizontal", spacing: "40", class: "my-40" },
		{ orientation: "horizontal", spacing: "80", class: "my-80" },
		{ orientation: "horizontal", spacing: "120", class: "my-120" },

		// Vertical spacing variants
		{ orientation: "vertical", spacing: "0", class: "mx-0" },
		{ orientation: "vertical", spacing: "2", class: "mx-2" },
		{ orientation: "vertical", spacing: "4", class: "mx-4" },
		{ orientation: "vertical", spacing: "6", class: "mx-6" },
		{ orientation: "vertical", spacing: "8", class: "mx-8" },
		{ orientation: "vertical", spacing: "12", class: "mx-12" },
		{ orientation: "vertical", spacing: "16", class: "mx-16" },
		{ orientation: "vertical", spacing: "20", class: "mx-20" },
		{ orientation: "vertical", spacing: "24", class: "mx-24" },
		{ orientation: "vertical", spacing: "32", class: "mx-32" },
		{ orientation: "vertical", spacing: "40", class: "mx-40" },
		{ orientation: "vertical", spacing: "80", class: "mx-80" },
		{ orientation: "vertical", spacing: "120", class: "mx-120" },
	],
	defaultVariants: {
		orientation: "horizontal",
		spacing: "4",
	},
})

type DividerProps = React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof dividerVariants> & {
		className?: string
	}

function Divider({ orientation, spacing, className, ...props }: DividerProps) {
	return <div role="separator" {...(orientation ? { "aria-orientation": orientation } : {})} className={cn(dividerVariants({ orientation, spacing }), className)} {...props} />
}

Divider.displayName = "Divider"

export { Divider }
