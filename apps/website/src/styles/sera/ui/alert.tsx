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

const alertVariants = cva(
	"flex items-stretch w-full gap-3 p-3 rounded-lg [&>[data-slot=alert-title]]:font-medium [&>[data-slot=alert-title]]:text-sm [&>[data-slot=alert-title]]:mt-0.75 [&>[data-slot=alert-description]]:text-sm  [&>[data-slot=alert-icon]>svg]:size-5 [&_[data-slot=alert-icon]]:mt-0.75 [&_[data-slot=alert-close]]:mt-0.75",
	{
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
				soft: "[&_[data-slot=alert-title]]:text-fg [&_[data-slot=alert-description]]:text-fg",
				"soft-outline":
					"ring-1 ring-inset [&_[data-slot=alert-title]]:text-fg [&_[data-slot=alert-description]]:text-fg",
				outline:
					"border border-soft [&_[data-slot=alert-close]]:text-fg-tertiary [&_[data-slot=alert-title]]:text-fg [&_[data-slot=alert-description]]:text-fg",
			},
		},
		compoundVariants: [
			// Soft variants
			{ color: "neutral", variant: "soft", className: "bg-fill2" },
			{
				color: "primary",
				variant: "soft",
				className: "bg-primary-accent text-primary-text",
			},
			{
				color: "info",
				variant: "soft",
				className: "bg-info-accent text-info-text",
			},
			{
				color: "success",
				variant: "soft",
				className: "bg-success-accent text-success-text",
			},
			{
				color: "error",
				variant: "soft",
				className: "bg-error-accent text-error-text",
			},
			{
				color: "warning",
				variant: "soft",
				className: "bg-warning-accent text-warning-text",
			},

			// Strong variants
			{
				color: "neutral",
				variant: "strong",
				className: "bg-black-inverse text-white-inverse",
			},
			{
				color: "primary",
				variant: "strong",
				className: "bg-primary text-primary-fg",
			},
			{ color: "info", variant: "strong", className: "bg-info text-white" },
			{
				color: "warning",
				variant: "strong",
				className:
					"bg-warning text-warning-fg [&_[data-slot=alert-title]]:text-black",
			},
			{ color: "error", variant: "strong", className: "bg-error text-white" },
			{
				color: "success",
				variant: "strong",
				className: "bg-success text-white",
			},

			// Soft-outline variants
			{
				color: "neutral",
				variant: "soft-outline",
				className: "border-border bg-fill2",
			},
			{
				color: "primary",
				variant: "soft-outline",
				className: "bg-primary-accent text-primary-text border-primary-border",
			},
			{
				color: "info",
				variant: "soft-outline",
				className: "bg-info-accent text-info-text border-info-border",
			},
			{
				color: "success",
				variant: "soft-outline",
				className: "bg-success-accent text-success-text border-success-border",
			},
			{
				color: "error",
				variant: "soft-outline",
				className: "bg-error-accent text-error-text border-error-border",
			},
			{
				color: "warning",
				variant: "soft-outline",
				className: "bg-warning-accent text-warning-text border-warning-border",
			},

			// Outline variants
			{
				color: "neutral",
				variant: "outline",
				className: "bg-transparent text-fg ",
			},
			{
				color: "primary",
				variant: "outline",
				className: "bg-transparent text-primary-text",
			},
			{
				color: "info",
				variant: "outline",
				className: "bg-transparent text-info-text",
			},
			{
				color: "success",
				variant: "outline",
				className: "bg-transparent text-success-text",
			},
			{
				color: "error",
				variant: "outline",
				className: "bg-transparent text-error-text",
			},
			{
				color: "warning",
				variant: "outline",
				className: "bg-transparent text-warning-text",
			},
		],
		defaultVariants: {
			color: "primary",
			variant: "soft",
		},
	}
)

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
						"group flex size-5 shrink-0 cursor-pointer items-center justify-center"
					)}>
					<X className="size-4 opacity-60 group-hover:opacity-100" />
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
			className={cn("text-sm [&_p]:mb-2 [&_p]:leading-relaxed", className)}
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
				"flex grow flex-col justify-center gap-1 [&>[data-slot=alert-description]]:text-sm [&>[data-slot=alert-title]]:text-sm [&>[data-slot=alert-title]]:font-medium",
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
