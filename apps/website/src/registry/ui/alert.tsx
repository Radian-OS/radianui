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
			primary: "bg-primary-accent text-primary-text",
			info: "bg-info-accent text-info-text",
			success: "bg-success-accent text-success-text",
			error: "bg-error-accent text-error-text",
			warning: "bg-warning-accent text-warning-text",
		},
		variant: {
			strong: "",
			soft: "",
			"soft-outline": "ring-1 ring-inset",
			outline: "ring-1 ring-inset ring-border bg-transparent",
		},
	},
	defaultVariants: {
		color: "neutral",
		variant: "soft",
	},
	compoundVariants: [
		{
			color: "neutral",
			variant: "soft-outline",
			className: "ring-border bg-fill2",
		},
		{
			color: "neutral",
			variant: "strong",
			className: "bg-black-inverse text-white-inverse",
		},
		{
			color: "primary",
			variant: "strong",
			className: "bg-primary text-white",
		},
		{
			color: "info",
			variant: "strong",
			className: "bg-info text-white",
		},
		{
			color: "warning",
			variant: "strong",
			className: "bg-warning text-white",
		},
		{
			color: "error",
			variant: "strong",
			className: "bg-error text-white",
		},
		{
			color: "success",
			variant: "strong",
			className: "bg-success text-white",
		},
	],
})

function Alert({ color = "primary", variant = "soft", onClose, title, description, start, end, className, children, ...props }: AlertProps) {
	const [showAlert, setShowAlert] = useState(true)

	const handleClose = () => {
		setShowAlert(false)
		onClose?.()
	}

	const isNeutralOutline = variant === "outline"
	const hasCustomTextColor = className?.includes("text-")
	const hasChildrenOnly = children && !title && !description

	if (!showAlert) return null

	const closeButton = onClose && <X size={20} onClick={handleClose} className="text-fg-tertiary hover:text-fg-secondary cursor-pointer transition-colors" />

	const getTextClassName = (baseClass: string) => cn(baseClass, isNeutralOutline && "text-fg", isNeutralOutline && hasCustomTextColor && "!text-current")

	const getDescriptionClassName = () => cn("text-sm", isNeutralOutline && "text-fg-secondary", isNeutralOutline && hasCustomTextColor && "!text-current opacity-80")

	return (
		<div className={cn(alertVariants({ color, variant }), className)} {...props}>
			{start && <div className="flex-shrink-0">{start}</div>}

			{hasChildrenOnly ? (
				<div className="flex-grow text-sm">{children}</div>
			) : (
				<div className="flex flex-grow flex-col">
					{title && <h5 className={getTextClassName("text-sm font-medium")}>{title}</h5>}
					{description && <p className={getDescriptionClassName()}>{description}</p>}
					{children}
				</div>
			)}

			{end && <div className="flex-shrink-0">{end}</div>}
			{closeButton}
		</div>
	)
}

export { Alert }
