import * as React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export type AlertProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	"color" | "variant"
> &
	VariantProps<typeof alertVariants> & {
		close?: boolean
		onClose?: () => void
	}

export type AlertTitleProps = React.HTMLAttributes<HTMLHeadingElement>
export type AlertDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>
export type AlertContentProps = React.HTMLAttributes<HTMLDivElement>
export type AlertIconProps = React.HTMLAttributes<HTMLDivElement>
export type AlertToolbarProps = React.HTMLAttributes<HTMLDivElement>

const alertVariants = cva("flex items-stretch w-full cn-alert", {
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
			soft: "cn-alert-variant-soft",
			"soft-outline": "cn-alert-variant-soft-outline",
			outline: "cn-alert-variant-outline",
		},
	},
	compoundVariants: [
		// Soft variants
		{ color: "neutral", variant: "soft", className: "cn-alert-soft-neutral" },
		{ color: "primary", variant: "soft", className: "cn-alert-soft-primary" },
		{ color: "info", variant: "soft", className: "cn-alert-soft-info" },
		{ color: "success", variant: "soft", className: "cn-alert-soft-success" },
		{ color: "error", variant: "soft", className: "cn-alert-soft-error" },
		{ color: "warning", variant: "soft", className: "cn-alert-soft-warning" },

		// Strong variants
		{
			color: "neutral",
			variant: "strong",
			className: "cn-alert-strong-neutral",
		},
		{
			color: "primary",
			variant: "strong",
			className: "cn-alert-strong-primary",
		},
		{ color: "info", variant: "strong", className: "cn-alert-strong-info" },
		{
			color: "warning",
			variant: "strong",
			className: "cn-alert-strong-warning",
		},
		{ color: "error", variant: "strong", className: "cn-alert-strong-error" },
		{
			color: "success",
			variant: "strong",
			className: "cn-alert-strong-success",
		},

		// Soft-outline variants
		{
			color: "neutral",
			variant: "soft-outline",
			className: "cn-alert-soft-outline-neutral",
		},
		{
			color: "primary",
			variant: "soft-outline",
			className: "cn-alert-soft-outline-primary",
		},
		{
			color: "info",
			variant: "soft-outline",
			className: "cn-alert-soft-outline-info",
		},
		{
			color: "success",
			variant: "soft-outline",
			className: "cn-alert-soft-outline-success",
		},
		{
			color: "error",
			variant: "soft-outline",
			className: "cn-alert-soft-outline-error",
		},
		{
			color: "warning",
			variant: "soft-outline",
			className: "cn-alert-soft-outline-warning",
		},

		// Outline variants
		{
			color: "neutral",
			variant: "outline",
			className: "cn-alert-outline-neutral",
		},
		{
			color: "primary",
			variant: "outline",
			className: "cn-alert-outline-primary",
		},
		{ color: "info", variant: "outline", className: "cn-alert-outline-info" },
		{
			color: "success",
			variant: "outline",
			className: "cn-alert-outline-success",
		},
		{ color: "error", variant: "outline", className: "cn-alert-outline-error" },
		{
			color: "warning",
			variant: "outline",
			className: "cn-alert-outline-warning",
		},
	],
	defaultVariants: {
		color: "primary",
		variant: "soft",
	},
})

function Alert({
	className,
	color = "primary",
	variant = "soft",
	close = false,
	onClose,
	children,
	...props
}: AlertProps) {
	return (
		<div
			data-slot="alert"
			role="alert"
			className={cn(alertVariants({ color, variant }), className)}
			{...props}>
			{children}
			{close && (
				<button
					onClick={onClose}
					aria-label="Dismiss"
					data-slot="alert-close"
					className={cn(
						"cn-alert-close group flex size-5 shrink-0 cursor-pointer items-center justify-center"
					)}>
					<X className="cn-alert-close-icon size-4" />
				</button>
			)}
		</div>
	)
}

Alert.displayName = "Alert"

function AlertTitle({ className, ...props }: AlertTitleProps) {
	return (
		<div data-slot="alert-title" className={cn("grow", className)} {...props} />
	)
}

AlertTitle.displayName = "AlertTitle"

function AlertIcon({ children, className, ...props }: AlertIconProps) {
	return (
		<div
			data-slot="alert-icon"
			className={cn("shrink-0", className)}
			{...props}>
			{children}
		</div>
	)
}
AlertIcon.displayName = "AlertIcon"

function AlertToolbar({ children, className, ...props }: AlertToolbarProps) {
	return (
		<div data-slot="alert-toolbar" className={cn(className)} {...props}>
			{children}
		</div>
	)
}
AlertToolbar.displayName = "AlertToolbar"

function AlertDescription({ className, ...props }: AlertDescriptionProps) {
	return (
		<div
			data-slot="alert-description"
			className={cn("cn-alert-description", className)}
			{...props}
		/>
	)
}
AlertDescription.displayName = "AlertDescription"

function AlertContent({ className, ...props }: AlertContentProps) {
	return (
		<div
			data-slot="alert-content"
			className={cn(
				"cn-alert-content flex grow flex-col justify-center",
				className
			)}
			{...props}
		/>
	)
}
AlertContent.displayName = "AlertContent"

export {
	Alert,
	AlertContent,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	AlertToolbar,
	alertVariants,
}
