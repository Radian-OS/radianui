"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

export type BadgeProps = Omit<React.HTMLAttributes<HTMLDivElement>, "color"> &
	VariantProps<typeof badgeVariants> & {
		asChild?: boolean
	}

export type BadgeDotProps = React.HTMLAttributes<HTMLSpanElement>

const badgeVariants = cva("inline-flex items-center font-medium w-fit whitespace-nowrap transition duration-200 gap-1", {
	variants: {
		variant: {
			strong: "",
			outline: "",
			soft: "",
		},
		size: {
			"20": "h-5 px-1.5 text-xs rounded-md [&_svg]:size-3.5",
			"24": "h-6 px-2 text-[13px] rounded-md [&_svg]:size-3.5",
			"28": "h-7 px-2 text-sm rounded-md [&_svg]:size-4",
		},
		color: {
			primary: "",
			info: "",
			success: "",
			error: "",
			warning: "",
			neutral: "bg-elevation-level1 border-alpha",
		},
	},
	defaultVariants: {
		variant: "soft",
		size: "24",
		color: "primary",
	},
	compoundVariants: [
		// strong
		{ variant: "strong", color: "primary", className: "bg-primary text-white font-semibold border border-alpha" },
		{ variant: "strong", color: "info", className: "bg-info text-white font-semibold border border-alpha" },
		{ variant: "strong", color: "success", className: "bg-success text-white font-semibold border border-alpha" },
		{ variant: "strong", color: "error", className: "bg-error text-white font-semibold border border-alpha" },
		{ variant: "strong", color: "warning", className: "bg-warning text-white font-semibold border border-alpha" },
		{
			variant: "strong",
			color: "neutral",
			className: "bg-black-inverse border border-alpha text-white-inverse font-medium",
		},
		// outline
		{ variant: "outline", color: "primary", className: "text-primary-text border border-primary-border bg-transparent" },
		{ variant: "outline", color: "info", className: "text-info-text border border-info-border bg-transparent" },
		{ variant: "outline", color: "success", className: "text-success-text border border-success-border bg-transparent" },
		{ variant: "outline", color: "error", className: "text-error-text border border-error-border bg-transparent" },
		{ variant: "outline", color: "warning", className: "text-warning-text border border-warning-border bg-transparent" },
		{ variant: "outline", color: "neutral", className: "text-fg-secondary border bg-transparent" },
		// soft
		{ variant: "soft", color: "primary", className: "bg-primary-accent text-primary-text" },
		{ variant: "soft", color: "info", className: "bg-info-accent text-info-text" },
		{ variant: "soft", color: "success", className: "bg-success-accent text-success-text" },
		{ variant: "soft", color: "error", className: "bg-error-accent text-error-text" },
		{ variant: "soft", color: "warning", className: "bg-warning-accent text-warning-text" },
		{ variant: "soft", color: "neutral", className: "bg-fill2 text-fg-secondary" },
	],
})

function Badge({ className, variant, size, color, asChild = false, children, ...props }: BadgeProps) {
	if (asChild) {
		return (
			<Slot className={cn(badgeVariants({ variant, size, color }), className)} {...props}>
				{children}
			</Slot>
		)
	}

	return (
		<span className={cn(badgeVariants({ variant, size, color }), className)} {...props}>
			{children}
		</span>
	)
}

Badge.displayName = "Badge"

function BadgeDot({ className, ...props }: BadgeDotProps) {
	return <span data-slot="badge-dot" className={cn("size-1.5 rounded-full bg-[currentColor]", className)} {...props} />
}
export { Badge, BadgeDot, badgeVariants }
