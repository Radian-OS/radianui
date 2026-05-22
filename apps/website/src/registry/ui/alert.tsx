import * as React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { IconSlot } from "@/registry/icon/icon-library"

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

const alertVariants = cva("flex items-stretch w-full r-alert cn-alert", {
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
			soft: "r-alert-variant-soft cn-alert-variant-soft",
			"soft-outline":
				"r-alert-variant-soft-outline cn-alert-variant-soft-outline",
			outline: "r-alert-variant-outline cn-alert-variant-outline",
		},
	},
	compoundVariants: [
		// Soft variants
		{
			color: "neutral",
			variant: "soft",
			className: "r-alert-soft-neutral cn-alert-soft-neutral",
		},
		{
			color: "primary",
			variant: "soft",
			className: "r-alert-soft-primary cn-alert-soft-primary",
		},
		{
			color: "info",
			variant: "soft",
			className: "r-alert-soft-info cn-alert-soft-info",
		},
		{
			color: "success",
			variant: "soft",
			className: "r-alert-soft-success cn-alert-soft-success",
		},
		{
			color: "error",
			variant: "soft",
			className: "r-alert-soft-error cn-alert-soft-error",
		},
		{
			color: "warning",
			variant: "soft",
			className: "r-alert-soft-warning cn-alert-soft-warning",
		},

		// Strong variants
		{
			color: "neutral",
			variant: "strong",
			className: "r-alert-strong-neutral cn-alert-strong-neutral",
		},
		{
			color: "primary",
			variant: "strong",
			className: "r-alert-strong-primary cn-alert-strong-primary",
		},
		{
			color: "info",
			variant: "strong",
			className: "r-alert-strong-info cn-alert-strong-info",
		},
		{
			color: "warning",
			variant: "strong",
			className: "r-alert-strong-warning cn-alert-strong-warning",
		},
		{
			color: "error",
			variant: "strong",
			className: "r-alert-strong-error cn-alert-strong-error",
		},
		{
			color: "success",
			variant: "strong",
			className: "r-alert-strong-success cn-alert-strong-success",
		},

		// Soft-outline variants
		{
			color: "neutral",
			variant: "soft-outline",
			className: "r-alert-soft-outline-neutral cn-alert-soft-outline-neutral",
		},
		{
			color: "primary",
			variant: "soft-outline",
			className: "r-alert-soft-outline-primary cn-alert-soft-outline-primary",
		},
		{
			color: "info",
			variant: "soft-outline",
			className: "r-alert-soft-outline-info cn-alert-soft-outline-info",
		},
		{
			color: "success",
			variant: "soft-outline",
			className: "r-alert-soft-outline-success cn-alert-soft-outline-success",
		},
		{
			color: "error",
			variant: "soft-outline",
			className: "r-alert-soft-outline-error cn-alert-soft-outline-error",
		},
		{
			color: "warning",
			variant: "soft-outline",
			className: "r-alert-soft-outline-warning cn-alert-soft-outline-warning",
		},

		// Outline variants
		{
			color: "neutral",
			variant: "outline",
			className: "r-alert-outline-neutral cn-alert-outline-neutral",
		},
		{
			color: "primary",
			variant: "outline",
			className: "r-alert-outline-primary cn-alert-outline-primary",
		},
		{
			color: "info",
			variant: "outline",
			className: "r-alert-outline-info cn-alert-outline-info",
		},
		{
			color: "success",
			variant: "outline",
			className: "r-alert-outline-success cn-alert-outline-success",
		},
		{
			color: "error",
			variant: "outline",
			className: "r-alert-outline-error cn-alert-outline-error",
		},
		{
			color: "warning",
			variant: "outline",
			className: "r-alert-outline-warning cn-alert-outline-warning",
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
						"r-alert-close cn-alert-close group flex size-5 shrink-0 cursor-pointer items-center justify-center"
					)}>
					<IconSlot
						slot="cross"
						className="r-alert-close-icon cn-alert-close-icon size-4"
					/>
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
			className={cn("r-alert-description cn-alert-description", className)}
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
				"r-alert-content cn-alert-content flex grow flex-col justify-center",
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
