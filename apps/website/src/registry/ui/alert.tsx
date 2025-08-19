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
		closable?: boolean
	}

export const alertVariants = cva("w-full rounded-xl p-4 flex items-center justify-center gap-3", {
	variants: {
		color: {
			neutral: "bg-fill2",
			primary: "border-primary bg-primary/10 text-primary-text",
			info: "border-info bg-info/10 text-info-text",
			success: "border-success bg-success/10 text-success-text",
			danger: "border-error bg-error/10 text-error-text",
			warning: "border-warning bg-warning/10 text-warning-text",
		},
		variant: {
			default: "",
			bordered: "border bg-transparent",
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
			className: "bg-primary text-white",
		},
		{
			color: "info",
			className: "bg-info text-white",
		},
		{
			color: "success",
			className: "bg-success text-white",
		},
		{
			color: "warning",
			className: "bg-warning text-white",
		},
		{
			color: "danger",
			className: "bg-error text-white",
		},
	],
})

function Alert({ color = "primary", variant = "default", title, closable, description, start, end, className, children, ...props }: AlertProps) {
	const [showAlert, setShowAlert] = useState(true)
	const isNeutralOutline = variant === "neutral-outline"
	const hasCustomTextColor = className?.includes("text-")

	// Check if we're using the children pattern
	const hasChildrenOnly = children && !title && !description

	return (
		showAlert && (
			<div className={cn(alertVariants({ color, variant }), className)} {...props}>
				{start && <div className="flex-shrink-0">{start}</div>}

				{hasChildrenOnly ? (
					// Render children directly when no title/description provided
					<div className="text-sm">{children}</div>
				) : (
					// Original title/description structure
					<div className="flex flex-grow flex-col">
						{title && <h5 className={cn("text-sm font-semibold", isNeutralOutline && "text-fg", isNeutralOutline && hasCustomTextColor && "!text-current")}>{title}</h5>}
						{description && (
							<p className={cn("text-sm", isNeutralOutline && "text-fg-secondary", isNeutralOutline && hasCustomTextColor && "!text-current opacity-80")}>{description}</p>
						)}
						{children}
					</div>
				)}

				{end && <div className="flex-shrink-0">{end}</div>}
				{closable && <X size={20} onClick={() => setShowAlert(false)} className={`text-fg-tertiary cursor-pointer`} />}
			</div>
		)
	)
}

export { Alert }
