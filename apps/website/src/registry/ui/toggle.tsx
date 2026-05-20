"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toggleVariants = cva(
	[
		"group/toggle cursor-pointer inline-flex items-center justify-center whitespace-nowrap gap-2 rounded-md font-medium",
		"focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
		"disabled:pointer-events-none disabled:opacity-50",
		"[&_svg]:pointer-events-none [&_svg]:shrink-0",
		"outline-none transition-colors",
		// Invalid state
		"aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error-border",
	].join(" "),
	{
		variants: {
			variant: {
				ghost: "",
				outline: "border bg-transparent",
			},
			size: {
				"28": "h-7 px-2 py-1.5 text-[13px] gap-1 [&>svg]:size-4",
				"32": "h-8 px-2 py-1.5 text-sm gap-1.5 [&>svg]:size-4.5",
				"36": "h-9 px-3 py-2 text-sm gap-2 [&>svg]:size-5",
				"40": "h-10 px-3 py-2.5 text-sm gap-2 [&>svg]:size-5",
				"44": "h-11 px-3 py-2.5 text-base gap-2 [&>svg]:size-5",
				"48": "h-12 px-4 py-3 text-base gap-2 [&>svg]:size-6",
			},
			color: {
				primary: "",
				info: "",
				success: "",
				error: "",
				warning: "",
				neutral: "",
			},
		},
		defaultVariants: {
			variant: "outline",
			size: "28",
			color: "neutral",
		},
		compoundVariants: [
			// ==========================================
			// GHOST VARIANT + COLORS (off state)
			// ==========================================
			{
				variant: "ghost",
				color: "primary",
				className:
					"bg-transparent text-primary-text hover:bg-primary-focus focus-visible:ring-primary-focus",
			},
			{
				variant: "ghost",
				color: "info",
				className:
					"bg-transparent text-info-text hover:bg-info-focus focus-visible:ring-info-focus",
			},
			{
				variant: "ghost",
				color: "success",
				className:
					"bg-transparent text-success-text hover:bg-success-focus focus-visible:ring-success-focus",
			},
			{
				variant: "ghost",
				color: "error",
				className:
					"bg-transparent text-error-text hover:bg-error-focus focus-visible:ring-error-focus",
			},
			{
				variant: "ghost",
				color: "warning",
				className:
					"bg-transparent text-warning-text hover:bg-warning-focus focus-visible:ring-warning-focus",
			},
			{
				variant: "ghost",
				color: "neutral",
				className:
					"bg-transparent text-fg hover:bg-fill2 focus-visible:ring-border",
			},

			// ==========================================
			// OUTLINE VARIANT + COLORS (off state)
			// ==========================================
			{
				variant: "outline",
				color: "primary",
				className:
					"border-primary-border text-primary-text hover:bg-primary-accent focus-visible:ring-primary-hover",
			},
			{
				variant: "outline",
				color: "info",
				className:
					"border-info-border text-info-text hover:bg-info-accent focus-visible:ring-info-hover",
			},
			{
				variant: "outline",
				color: "success",
				className:
					"border-success-border text-success-text hover:bg-success-accent focus-visible:ring-success-hover",
			},
			{
				variant: "outline",
				color: "error",
				className:
					"border-error-border text-error-text hover:bg-error-accent focus-visible:ring-error-hover",
			},
			{
				variant: "outline",
				color: "warning",
				className:
					"border-warning-border text-warning-text hover:bg-warning-accent focus-visible:ring-warning-hover",
			},
			{
				variant: "outline",
				color: "neutral",
				className:
					"border-border text-fg hover:bg-fill1-alpha focus-visible:ring-border",
			},

			// ==========================================
			// TOGGLED ON STATE (data-[state=on])
			// Both variants use the "soft" style for on
			// ==========================================
			// Primary
			{
				variant: ["ghost", "outline"],
				color: "primary",
				className:
					"data-[state=on]:bg-primary-accent data-[state=on]:text-primary-text data-[state=on]:border-transparent",
			},
			{
				variant: "outline",
				color: "primary",
				className: "data-[state=on]:border-primary-accent",
			},

			// Info
			{
				variant: ["ghost", "outline"],
				color: "info",
				className:
					"data-[state=on]:bg-info-accent data-[state=on]:text-info-text data-[state=on]:border-transparent",
			},
			{
				variant: "outline",
				color: "info",
				className: "data-[state=on]:border-info-accent",
			},

			// Success
			{
				variant: ["ghost", "outline"],
				color: "success",
				className:
					"data-[state=on]:bg-success-accent data-[state=on]:text-success-text data-[state=on]:border-transparent",
			},
			{
				variant: "outline",
				color: "success",
				className: "data-[state=on]:border-success-accent",
			},

			// Error
			{
				variant: ["ghost", "outline"],
				color: "error",
				className:
					"data-[state=on]:bg-error-accent data-[state=on]:text-error-text data-[state=on]:border-transparent",
			},
			{
				variant: "outline",
				color: "error",
				className: "data-[state=on]:border-error-accent",
			},

			// Warning
			{
				variant: ["ghost", "outline"],
				color: "warning",
				className:
					"data-[state=on]:bg-warning-accent data-[state=on]:text-warning-text data-[state=on]:border-transparent",
			},
			{
				variant: "outline",
				color: "warning",
				className: "data-[state=on]:border-warning-accent",
			},

			// Neutral
			{
				variant: ["ghost", "outline"],
				color: "neutral",
				className:
					"data-[state=on]:bg-fill3 data-[state=on]:text-fg data-[state=on]:border-transparent",
			},
			{
				variant: "outline",
				color: "neutral",
				className: "data-[state=on]:border-fill4",
			},
		],
	}
)

function Toggle({
	className,
	variant = "ghost",
	size = "36",
	color = "primary",
	...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
	VariantProps<typeof toggleVariants>) {
	return (
		<TogglePrimitive.Root
			data-slot="toggle"
			className={cn(toggleVariants({ variant, size, color, className }))}
			{...props}
		/>
	)
}

export { Toggle, toggleVariants }
