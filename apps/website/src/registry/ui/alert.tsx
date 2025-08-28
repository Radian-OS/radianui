"use client"

import React, { useState } from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export type AlertProps = React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof alertVariants> & {
		title?: string
		description?: string
		children?: React.ReactNode
		start?: React.ReactNode
		end?: React.ReactNode
		onClose?: () => void
	}

export const alertVariants = cva("w-full rounded-xl p-3 flex items-center justify-center gap-2", {
	variants: {
		color: {
			neutral: "bg-fill2",
			primary: "ring-primary bg-primary-accent text-primary-text",
			info: "ring-info bg-info-accent text-info-text",
			success: "ring-success bg-success-accent text-success-text",
			error: "ring-error bg-error-accent text-error-text",
			warning: "ring-warning bg-warning-accent text-warning-text",
		},
		variant: {
			default: "",
			soft: "",
			"soft-outline": "ring-1 ring-inset",
			outline: "ring-1 ring-inset ring-border bg-transparent",
		},
	},
	defaultVariants: {
		color: "neutral",
		variant: "default",
	},
	compoundVariants: [
		{
			color: "neutral",
			variant: "soft-outline",
			className: "ring-1 ring-inset ring-border bg-fill2",
		},
		{
			color: "primary",
			variant: "soft",
			className: "bg-primary-accent text-white",
		},
		{
			color: "info",
			variant: "soft",
			className: "bg-info-accent text-white",
		},
		{
			color: "success",
			variant: "soft",
			className: "bg-success-accent text-white",
		},
		{
			color: "warning",
			variant: "soft",
			className: "bg-warning-accent text-white",
		},
		{
			color: "error",
			variant: "soft",
			className: "bg-error-accent text-white",
		},
	],
})

function Alert({ color = "primary", variant = "default", onClose, title, description, start, end, className, children, ...props }: AlertProps) {
	const [showAlert, setShowAlert] = useState(true)
	const isNeutralOutline = variant === "outline"
	const hasCustomTextColor = className?.includes("text-")

	// Check if we're using the children pattern
	const hasChildrenOnly = children && !title && !description

	const closeButton = onClose && <X size={20} onClick={() => setShowAlert(false)} className={cn("text-fg-tertiary cursor-pointer")} />

	return (
		showAlert && (
			<div className={cn(alertVariants({ color, variant }), className)} {...props}>
				{start && start}
				{hasChildrenOnly ? (
					// Render children directly when no title/description provided
					<div className="text-sm">{children}</div>
				) : (
					// Original title/description structure
					<div className="flex flex-grow flex-col">
						{title && <h5 className={cn("text-sm font-medium", isNeutralOutline && "text-fg", isNeutralOutline && hasCustomTextColor && "!text-current")}>{title}</h5>}
						{description && (
							<p className={cn("text-sm", isNeutralOutline && "text-fg-secondary", isNeutralOutline && hasCustomTextColor && "!text-current opacity-80")}>{description}</p>
						)}
						{children}
					</div>
				)}
				{end && <div className="flex-shrink-0">{end}</div>}
				{closeButton}
			</div>
		)
	)
}

export { Alert }
