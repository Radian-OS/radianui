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
		{ orientation: "horizontal", spacing: "0", className: "my-0" },
		{ orientation: "horizontal", spacing: "2", className: "my-0.5" },
		{ orientation: "horizontal", spacing: "4", className: "my-1" },
		{ orientation: "horizontal", spacing: "6", className: "my-1.5" },
		{ orientation: "horizontal", spacing: "8", className: "my-2" },
		{ orientation: "horizontal", spacing: "12", className: "my-3" },
		{ orientation: "horizontal", spacing: "16", className: "my-4" },
		{ orientation: "horizontal", spacing: "20", className: "my-5" },
		{ orientation: "horizontal", spacing: "24", className: "my-6" },
		{ orientation: "horizontal", spacing: "32", className: "my-8" },
		{ orientation: "horizontal", spacing: "40", className: "my-10" },
		{ orientation: "horizontal", spacing: "80", className: "my-20" },
		{ orientation: "horizontal", spacing: "120", className: "my-30" },

		// Vertical spacing variants
		{ orientation: "vertical", spacing: "0", className: "mx-0" },
		{ orientation: "vertical", spacing: "2", className: "mx-0.5" },
		{ orientation: "vertical", spacing: "4", className: "mx-1" },
		{ orientation: "vertical", spacing: "6", className: "mx-1.5" },
		{ orientation: "vertical", spacing: "8", className: "mx-2" },
		{ orientation: "vertical", spacing: "12", className: "mx-3" },
		{ orientation: "vertical", spacing: "16", className: "mx-4" },
		{ orientation: "vertical", spacing: "20", className: "mx-5" },
		{ orientation: "vertical", spacing: "24", className: "mx-6" },
		{ orientation: "vertical", spacing: "32", className: "mx-8" },
		{ orientation: "vertical", spacing: "40", className: "mx-10" },
		{ orientation: "vertical", spacing: "80", className: "mx-20" },
		{ orientation: "vertical", spacing: "120", className: "mx-30" },
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
