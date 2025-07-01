"use client"

import { useState } from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
	Omit<VariantProps<typeof badgeVariants>, "size"> & {
		closable?: boolean
		size?: BadgeSize
		className?: string
		color?: "primary" | "info" | "success" | "error" | "warning"
	}

type BadgeSize = "20" | "24" | "28"

const badgeVariants = cva("inline-flex items-center font-medium box-border w-fit whitespace-nowrap transition duration-200", {
	variants: {
		variant: {
			neutral: "outline outline-border-alpha text-text-secondary",
			strong: "",
			outline: "",
			pastel: "",
		},
		size: {
			"20": "h-5 px-1.5 text-xs rounded-sm",
			"24": "h-6 px-2 text-xs rounded-sm",
			"28": "h-7 px-2 text-sm rounded-md",
		},
		color: {
			primary: "",
			info: "",
			success: "",
			error: "",
			warning: "",
		},
	},
	defaultVariants: {
		variant: "neutral",
		size: "24",
		color: "primary",
	},
	compoundVariants: [
		// Strong variant + colors
		{
			variant: "strong",
			color: "primary",
			className: "bg-primary text-static-white font-semibold",
		},
		{
			variant: "strong",
			color: "info",
			className: "bg-info text-static-white font-semibold",
		},
		{
			variant: "strong",
			color: "success",
			className: "bg-success text-static-white font-semibold",
		},
		{
			variant: "strong",
			color: "error",
			className: "bg-error text-static-white font-semibold",
		},
		{
			variant: "strong",
			color: "warning",
			className: "bg-warning text-static-white font-semibold",
		},

		// Outline variant + colors
		{
			variant: "outline",
			color: "primary",
			className: "text-primary-text outline outline-primary bg-transparent",
		},
		{
			variant: "outline",
			color: "info",
			className: "text-info-text outline outline-info bg-transparent",
		},
		{
			variant: "outline",
			color: "success",
			className: "text-success-text outline outline-success bg-transparent",
		},
		{
			variant: "outline",
			color: "error",
			className: "text-error-text outline outline-error bg-transparent",
		},
		{
			variant: "outline",
			color: "warning",
			className: "text-warning-text outline outline-warning bg-transparent",
		},

		// Pastel variant + colors
		{
			variant: "pastel",
			color: "primary",
			className: "bg-primary-accent text-primary-text",
		},
		{
			variant: "pastel",
			color: "info",
			className: "bg-info-accent text-info-text",
		},
		{
			variant: "pastel",
			color: "success",
			className: "bg-success-accent text-success-text",
		},
		{
			variant: "pastel",
			color: "error",
			className: "bg-error-accent text-error-text",
		},
		{
			variant: "pastel",
			color: "warning",
			className: "bg-warning-accent text-warning-text",
		},
	],
})

function Badge({ variant = "neutral", size = "24", color = "primary", closable = false, className, children, ...props }: BadgeProps) {
	const [showBadge, setShowBadge] = useState(true)

	if (!showBadge) return null

	return (
		<div className={cn(badgeVariants({ variant, size, color }), "flex items-center gap-1", className)} {...props}>
			{Array.isArray(children)
				? children.map((child, index) =>
						typeof child === "object" && child !== null && "type" in child && (child.type === "svg" || typeof child.type === "function") ? <span key={index}>{child}</span> : child
					)
				: children}
			{closable && (
				<X
					onClick={() => setShowBadge(false)}
					className={cn(size === "20" || size === "24" ? "size-3" : "size-4", "cursor-pointer font-extrabold", variant === "neutral" && "text-text-disabled")}
				/>
			)}
		</div>
	)
}

Badge.displayName = "Badge"

export { Badge }
