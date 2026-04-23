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
	"flex items-stretch w-full gap-4 rounded-none p-4 [&>[data-slot=alert-title]]:font-medium [&>[data-slot=alert-title]]:text-sm [&>[data-slot=alert-title]]:mt-0.75 [&>[data-slot=alert-description]]:text-sm [&>[data-slot=alert-icon]>svg]:size-5 [&_[data-slot=alert-icon]]:mt-0.75 [&_[data-slot=alert-close]]:mt-0.75",
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
					"border-soft border [&_[data-slot=alert-close]]:text-fg-tertiary [&_[data-slot=alert-title]]:text-fg [&_[data-slot=alert-description]]:text-fg",
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
			{
				color: "error",
				variant: "outline",
				className: "cn-alert-outline-error",
			},
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
			className={cn("text-sm [&_p]:mb-3 [&_p]:leading-relaxed", className)}
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
				"flex grow flex-col justify-center gap-2 [&>[data-slot=alert-description]]:text-sm [&>[data-slot=alert-title]]:text-sm [&>[data-slot=alert-title]]:font-medium",
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
