"use client"

import { useState } from "react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

type BadgeSize = "20" | "24" | "28"

type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
	Omit<VariantProps<typeof badgeVariants>, "size"> & {
		closable?: boolean
		size?: BadgeSize
		className?: string
		color?: "primary" | "info" | "success" | "error" | "warning"
		asChild?: boolean
	}

const badgeVariants = cva("inline-flex items-center font-medium box-border w-fit whitespace-nowrap transition duration-200", {
	variants: {
		variant: {
			neutral: "border border-border-alpha text-text-secondary",
			strong: "",
			outline: "",
			soft: "",
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
			className: "text-primary-text border border-primary bg-transparent",
		},
		{
			variant: "outline",
			color: "info",
			className: "text-info-text border border-info bg-transparent",
		},
		{
			variant: "outline",
			color: "success",
			className: "text-success-text border border-success bg-transparent",
		},
		{
			variant: "outline",
			color: "error",
			className: "text-error-text border border-error bg-transparent",
		},
		{
			variant: "outline",
			color: "warning",
			className: "text-warning-text border border-warning bg-transparent",
		},

		// Soft variant + colors
		{
			variant: "soft",
			color: "primary",
			className: "bg-primary-accent text-primary-text",
		},
		{
			variant: "soft",
			color: "info",
			className: "bg-info-accent text-info-text",
		},
		{
			variant: "soft",
			color: "success",
			className: "bg-success-accent text-success-text",
		},
		{
			variant: "soft",
			color: "error",
			className: "bg-error-accent text-error-text",
		},
		{
			variant: "soft",
			color: "warning",
			className: "bg-warning-accent text-warning-text",
		},
	],
})

function Badge({ variant = "neutral", size = "24", color = "primary", closable = false, className, asChild = false, children, ...props }: BadgeProps) {
	const [showBadge, setShowBadge] = useState(true)
	const Comp = asChild ? Slot : "div"

	if (!showBadge) return null

	// Wrap content in a single span if asChild is true
	const content = (
		<>
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
		</>
	)

	return (
		<Comp className={cn(badgeVariants({ variant, size, color }), "flex items-center gap-1", className)} {...props}>
			{asChild ? <span className="contents">{content}</span> : content}
		</Comp>
	)
}

Badge.displayName = "Badge"

export { Badge }
