"use client"

import * as React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

export type AlertProps = Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "variant"> & VariantProps<typeof alertVariants>
export type AlertTitleProps = React.HTMLAttributes<HTMLHeadingElement>
export type AlertDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>
export type AlertContentProps = React.HTMLAttributes<HTMLDivElement>
export type AlertIconProps = React.HTMLAttributes<HTMLDivElement>
export type AlertActionsProps = React.HTMLAttributes<HTMLDivElement>

const alertVariants = cva("w-full rounded-xl p-3 flex items-center justify-center gap-2", {
	variants: {
		color: {
			neutral: "",
			primary: "",
			info: "",
			success: "",
			error: "",
			warning: "",
		},
		variant: {
			strong: "",
			soft: "",
			"soft-outline": "ring-1 ring-inset",
			outline: "ring-1 ring-inset ring-border bg-transparent",
		},
	},
	compoundVariants: [
		// Soft
		{ color: "neutral", variant: "soft", className: "bg-fill2" },
		{ color: "primary", variant: "soft", className: "bg-primary-accent text-primary-text" },
		{ color: "info", variant: "soft", className: "bg-info-accent text-info-text" },
		{ color: "success", variant: "soft", className: "bg-success-accent text-success-text" },
		{ color: "error", variant: "soft", className: "bg-error-accent text-error-text" },
		{ color: "warning", variant: "soft", className: "bg-warning-accent text-warning-text" },

		// Strong
		{ color: "neutral", variant: "strong", className: "bg-black-inverse text-white-inverse" },
		{ color: "primary", variant: "strong", className: "bg-primary text-white" },
		{ color: "info", variant: "strong", className: "bg-info text-white" },
		{ color: "warning", variant: "strong", className: "bg-warning text-white" },
		{ color: "error", variant: "strong", className: "bg-error text-white" },
		{ color: "success", variant: "strong", className: "bg-success text-white" },

		// Soft-outline
		{ color: "neutral", variant: "soft-outline", className: "outline-border bg-fill2" },
		{ color: "primary", variant: "soft-outline", className: "bg-primary-accent text-primary-text outline-primary-accent" },
		{ color: "info", variant: "soft-outline", className: "bg-info-accent text-info-text outline-info-accent" },
		{ color: "success", variant: "soft-outline", className: "bg-success-accent text-success-text outline-success-accent" },
		{ color: "error", variant: "soft-outline", className: "bg-error-accent text-error-text outline-error-accent" },
		{ color: "warning", variant: "soft-outline", className: "bg-warning-accent text-warning-text outline-warning-accent" },

		// Outline
		{ color: "neutral", variant: "outline", className: "ring-border bg-transparent text-foreground" },
		{ color: "primary", variant: "outline", className: "ring-primary bg-transparent text-primary" },
		{ color: "info", variant: "outline", className: "ring-info bg-transparent text-info" },
		{ color: "success", variant: "outline", className: "ring-success bg-transparent text-success" },
		{ color: "error", variant: "outline", className: "ring-error bg-transparent text-error" },
		{ color: "warning", variant: "outline", className: "ring-warning bg-transparent text-warning" },
	],
	defaultVariants: {
		color: "primary",
		variant: "soft",
	},
})

function Alert({ className, color, variant, ...props }: AlertProps) {
	return <div role="alert" className={cn(alertVariants({ color, variant }), className)} {...props} />
}
Alert.displayName = "Alert"

function AlertTitle({ className, ...props }: AlertTitleProps) {
	return <h5 className={cn("text-sm font-medium", className)} {...props} />
}
AlertTitle.displayName = "AlertTitle"

function AlertDescription({ className, ...props }: AlertDescriptionProps) {
	return <div className={cn("text-sm", className)} {...props} />
}
AlertDescription.displayName = "AlertDescription"

function AlertContent({ className, ...props }: AlertContentProps) {
	return <div className={cn("flex flex-grow flex-col gap-1", className)} {...props} />
}
AlertContent.displayName = "AlertContent"

function AlertIcon({ className, ...props }: AlertIconProps) {
	return <div className={cn("flex-shrink-0", className)} {...props} />
}
AlertIcon.displayName = "AlertIcon"

function AlertActions({ className, ...props }: AlertActionsProps) {
	return <div className={cn("flex-shrink-0", className)} {...props} />
}
AlertActions.displayName = "AlertActions"

export { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle, AlertActions, alertVariants }
