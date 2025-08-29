import React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

export type Orientation = "horizontal" | "vertical"
export type margin = "0" | "2" | "4" | "6" | "8" | "12" | "16" | "20" | "24" | "32" | "40" | "80" | "120"

const dividerVariants = cva("bg-soft-alpha", {
	variants: {
		orientation: {
			horizontal: "h-0.25 w-full",
			vertical: "w-0.25 h-full",
		},
		margin: {
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
		// Horizontal margin variants
		{ orientation: "horizontal", margin: "0", className: "my-0" },
		{ orientation: "horizontal", margin: "2", className: "my-0.5" },
		{ orientation: "horizontal", margin: "4", className: "my-1" },
		{ orientation: "horizontal", margin: "6", className: "my-1.5" },
		{ orientation: "horizontal", margin: "8", className: "my-2" },
		{ orientation: "horizontal", margin: "12", className: "my-3" },
		{ orientation: "horizontal", margin: "16", className: "my-4" },
		{ orientation: "horizontal", margin: "20", className: "my-5" },
		{ orientation: "horizontal", margin: "24", className: "my-6" },
		{ orientation: "horizontal", margin: "32", className: "my-8" },
		{ orientation: "horizontal", margin: "40", className: "my-10" },
		{ orientation: "horizontal", margin: "80", className: "my-20" },
		{ orientation: "horizontal", margin: "120", className: "my-30" },

		// Vertical margin variants
		{ orientation: "vertical", margin: "0", className: "mx-0" },
		{ orientation: "vertical", margin: "2", className: "mx-0.5" },
		{ orientation: "vertical", margin: "4", className: "mx-1" },
		{ orientation: "vertical", margin: "6", className: "mx-1.5" },
		{ orientation: "vertical", margin: "8", className: "mx-2" },
		{ orientation: "vertical", margin: "12", className: "mx-3" },
		{ orientation: "vertical", margin: "16", className: "mx-4" },
		{ orientation: "vertical", margin: "20", className: "mx-5" },
		{ orientation: "vertical", margin: "24", className: "mx-6" },
		{ orientation: "vertical", margin: "32", className: "mx-8" },
		{ orientation: "vertical", margin: "40", className: "mx-10" },
		{ orientation: "vertical", margin: "80", className: "mx-20" },
		{ orientation: "vertical", margin: "120", className: "mx-30" },
	],
	defaultVariants: {
		orientation: "horizontal",
		margin: "4",
	},
})

type DividerProps = React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof dividerVariants> & {
		className?: string
	}

function Divider({ orientation, margin, className, ...props }: DividerProps) {
	return <div role="separator" {...(orientation ? { "aria-orientation": orientation } : {})} className={cn(dividerVariants({ orientation, margin }), className)} {...props} />
}

Divider.displayName = "Divider"

export { Divider }
