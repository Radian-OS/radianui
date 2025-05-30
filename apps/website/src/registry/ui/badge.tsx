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

type BadgeSize = "20" | "24" | "28" | "32"

const badgeVariants = cva("inline-flex items-center font-medium box-border w-fit whitespace-nowrap transition duration-200", {
	variants: {
		variant: {
			"neutral-outline": "outline outline-border-alpha text-text-tertiary",
			strong: "",
			outline: "",
			pastel: "",
		},
		size: {
			"20": "h-5 px-1.5 text-xs rounded-sm",
			"24": "h-6 px-2 text-xs rounded-sm",
			"28": "h-7 px-2 text-sm rounded-md",
			"32": "h-8 px-3 text-sm rounded-md",
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
		variant: "neutral-outline",
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
			className: "text-primary outline outline-primary-stroke bg-transparent",
		},
		{
			variant: "outline",
			color: "info",
			className: "text-info outline outline-info-stroke bg-transparent",
		},
		{
			variant: "outline",
			color: "success",
			className: "text-success outline outline-success-stroke bg-transparent",
		},
		{
			variant: "outline",
			color: "error",
			className: "text-error outline outline-error-stroke bg-transparent",
		},
		{
			variant: "outline",
			color: "warning",
			className: "text-warning outline outline-warning-stroke bg-transparent",
		},

		// Pastel variant + colors
		{
			variant: "pastel",
			color: "primary",
			className: "bg-primary-accent text-primary",
		},
		{
			variant: "pastel",
			color: "info",
			className: "bg-info-accent text-info",
		},
		{
			variant: "pastel",
			color: "success",
			className: "bg-success-accent text-success",
		},
		{
			variant: "pastel",
			color: "error",
			className: "bg-error-accent text-error",
		},
		{
			variant: "pastel",
			color: "warning",
			className: "bg-warning-accent text-warning",
		},
	],
})

function Badge({ variant = "neutral-outline", size = "24", color = "primary", closable = false, className, children, ...props }: BadgeProps) {
	const [showBadge, setShowBadge] = useState(true)

	if (!showBadge) return null

	return (
		<div className={cn(badgeVariants({ variant, size, color }), "flex items-center gap-1", className)} {...props}>
			{Array.isArray(children)
				? children.map((child, index) =>
						typeof child === "object" && child !== null && "type" in child && (child.type === "svg" || typeof child.type === "function") ? (
							<span key={index}>{child}</span>
						) : (
							child
						)
					)
				: children}
			{closable && (
				<X
					onClick={() => setShowBadge(false)}
					className={cn(
						size === "20" || size === "24" ? "size-3" : "size-4",
						"cursor-pointer font-extrabold",
						variant === "neutral-outline" && "text-text-disabled"
					)}
				/>
			)}
		</div>
	)
}

Badge.displayName = "Badge"

export { Badge }
