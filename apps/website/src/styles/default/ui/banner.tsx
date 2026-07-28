import * as React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export type BannerProps = Omit<React.HTMLAttributes<HTMLDivElement>, "color"> &
	VariantProps<typeof bannerVariants> & {
		onClose?: () => void
	}
export type BannerTitleProps = React.HTMLAttributes<HTMLHeadingElement>
export type BannerDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>
export type BannerContentProps = React.HTMLAttributes<HTMLDivElement>
export type BannerIconProps = React.HTMLAttributes<HTMLDivElement>
export type BannerToolbarProps = React.HTMLAttributes<HTMLDivElement>

const bannerVariants = cva(
	"flex items-center justify-center w-full gap-2 p-2 overflow-hidden",
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
				strong: "[&_[data-slot=banner-close]]:text-white",
				soft: "[&_[data-slot=banner-close]]:text-[current] [&_[data-slot=banner-title]]:text-fg [&_[data-slot=banner-description]]:text-fg",
				outline:
					"border border-soft border-l-0 border-t-0 border-r-0 [&_[data-slot=banner-close]]:text-fg-secondary [&_[data-slot=banner-title]]:text-fg [&_[data-slot=banner-description]]:text-fg-secondary",
			},
		},
		compoundVariants: [
			// Soft
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
				className:
					"bg-warning-accent text-warning-text [&_[data-slot=banner-icon]]:text-warning-border",
			},

			// Strong
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
			{ color: "info", variant: "strong", className: "bg-info text-white" },
			{
				color: "warning",
				variant: "strong",
				className:
					"bg-warning text-warning-fg [&_[data-slot=banner-title]]:text-black",
			},
			{ color: "error", variant: "strong", className: "bg-error text-white" },
			{
				color: "success",
				variant: "strong",
				className: "bg-success text-white",
			},

			// Outline
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

function Banner({
	className,
	color,
	variant,
	onClose,
	children,
	...props
}: BannerProps) {
	return (
		<div
			data-slot="banner"
			role="banner"
			className={cn(bannerVariants({ color, variant }), className)}
			{...props}>
			{children}
			{onClose && (
				<button
					onClick={onClose}
					aria-label="Dismiss"
					data-slot="banner-close"
					className={cn(
						"group flex size-5 shrink-0 cursor-pointer items-center justify-center"
					)}>
					<X className="size-5 group-hover:opacity-60" />
				</button>
			)}
		</div>
	)
}
Banner.displayName = "Banner"

function BannerTitle({ className, ...props }: BannerTitleProps) {
	return (
		<div
			data-slot="banner-title"
			className={cn("text-sm font-medium", className)}
			{...props}
		/>
	)
}
BannerTitle.displayName = "BannerTitle"

function BannerDescription({ className, ...props }: BannerDescriptionProps) {
	return (
		<div
			data-slot="banner-description"
			className={cn("text-sm", className)}
			{...props}
		/>
	)
}
BannerDescription.displayName = "BannerDescription"

function BannerContent({ className, ...props }: BannerContentProps) {
	return (
		<div
			data-slot="banner-content"
			className={cn(
				"flex flex-1 flex-col items-start justify-start gap-0.5 [&_[data-slot=banner-description]]:text-sm [&_[data-slot=banner-title]]:text-sm [&_[data-slot=banner-title]]:font-semibold",
				className
			)}
			{...props}
		/>
	)
}
BannerContent.displayName = "BannerContent"

function BannerIcon({ className, ...props }: BannerIconProps) {
	return (
		<div
			data-slot="banner-icon"
			className={cn("flex shrink-0 items-center justify-center", className)}
			{...props}
		/>
	)
}
BannerIcon.displayName = "BannerIcon"

export {
	Banner,
	BannerContent,
	BannerDescription,
	BannerIcon,
	BannerTitle,
	bannerVariants,
}
