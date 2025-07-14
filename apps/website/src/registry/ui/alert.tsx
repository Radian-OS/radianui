import React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

type AlertProps = React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof alertVariants> & {
		title?: string
		message?: string
		icon?: React.ReactNode
		endContent?: React.ReactNode
		children?: React.ReactNode
	}

export const alertVariants = cva("w-full rounded-xl p-4 flex items-center justify-center gap-3", {
	variants: {
		color: {
			neutral: "bg-fill-level2",
			primary: "border-primary bg-primary/10 text-primary-text",
			info: "border-info bg-info/10 text-info-text",
			success: "border-success bg-success/10 text-success-text",
			danger: "border-error bg-error/10 text-error-text",
			warning: "border-warning bg-warning/10 text-warning-text",
		},
		variant: {
			default: "",
			bordered: "border bg-transparent",
			strong: "",
			"neutral-outline": "border border-border bg-transparent",
		},
	},
	defaultVariants: {
		color: "neutral",
		variant: "default",
	},
	compoundVariants: [
		{
			color: "neutral",
			variant: "bordered",
			className: "border bg-transparent",
		},
		{
			color: "primary",
			variant: "strong",
			className: "bg-primary text-static-white",
		},
		{
			color: "info",
			variant: "strong",
			className: "bg-info text-static-white",
		},
		{
			color: "success",
			variant: "strong",
			className: "bg-success text-static-white",
		},
		{
			color: "warning",
			variant: "strong",
			className: "bg-warning text-static-white",
		},
		{
			color: "danger",
			variant: "strong",
			className: "bg-error text-static-white",
		},
		{
			color: "neutral",
			variant: "strong",
			className: "bg-text text-inverse-white",
		},
	],
})

function Alert({ color = "neutral", variant = "default", title, message, icon, endContent, className, children, ...props }: AlertProps) {
	const isNeutralOutline = variant === "neutral-outline"
	const hasCustomTextColor = className?.includes("text-")

	// Check if we're using the children pattern
	const hasChildrenOnly = children && !title && !message

	return (
		<div className={cn(alertVariants({ color, variant }), className)} {...props}>
			{icon && <div className="flex-shrink-0">{icon}</div>}

			{hasChildrenOnly ? (
				// Render children directly when no title/message provided
				<div className="flex-grow text-sm">{children}</div>
			) : (
				// Original title/message structure
				<div className="flex flex-grow flex-col">
					{title && <h5 className={cn("text-sm font-semibold", isNeutralOutline && "text-text", isNeutralOutline && hasCustomTextColor && "!text-current")}>{title}</h5>}
					{message && <p className={cn("text-sm", isNeutralOutline && "text-text-secondary", isNeutralOutline && hasCustomTextColor && "!text-current opacity-80")}>{message}</p>}
					{children}
				</div>
			)}

			{endContent && <div className="flex-shrink-0">{endContent}</div>}
		</div>
	)
}

export { Alert }
