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
	"flex items-center justify-center w-full overflow-hidden gap-3 p-3",
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
				strong: "[&_[data-slot=banner-close]]:text-primary-fg",
				soft: "[&_[data-slot=banner-close]]:text-[current] [&_[data-slot=banner-title]]:text-fg [&_[data-slot=banner-description]]:text-fg",
				outline:
					"border-soft border border-l-0 border-r-0 border-t-0 [&_[data-slot=banner-close]]:text-fg-secondary [&_[data-slot=banner-title]]:text-fg [&_[data-slot=banner-description]]:text-fg-secondary",
			},
		},
		compoundVariants: [
			// Soft
			{
				color: "neutral",
				variant: "soft",
				className: "cn-banner-soft-neutral",
			},
			{
				color: "primary",
				variant: "soft",
				className: "cn-banner-soft-primary",
			},
			{ color: "info", variant: "soft", className: "cn-banner-soft-info" },
			{
				color: "success",
				variant: "soft",
				className: "cn-banner-soft-success",
			},
			{ color: "error", variant: "soft", className: "cn-banner-soft-error" },
			{
				color: "warning",
				variant: "soft",
				className: "cn-banner-soft-warning",
			},

			// Strong
			{
				color: "neutral",
				variant: "strong",
				className: "cn-banner-strong-neutral",
			},
			{
				color: "primary",
				variant: "strong",
				className: "cn-banner-strong-primary",
			},
			{ color: "info", variant: "strong", className: "cn-banner-strong-info" },
			{
				color: "warning",
				variant: "strong",
				className: "cn-banner-strong-warning",
			},
			{
				color: "error",
				variant: "strong",
				className: "cn-banner-strong-error",
			},
			{
				color: "success",
				variant: "strong",
				className: "cn-banner-strong-success",
			},

			// Outline
			{
				color: "neutral",
				variant: "outline",
				className: "cn-banner-outline-neutral",
			},
			{
				color: "primary",
				variant: "outline",
				className: "cn-banner-outline-primary",
			},
			{
				color: "info",
				variant: "outline",
				className: "cn-banner-outline-info",
			},
			{
				color: "success",
				variant: "outline",
				className: "cn-banner-outline-success",
			},
			{
				color: "error",
				variant: "outline",
				className: "cn-banner-outline-error",
			},
			{
				color: "warning",
				variant: "outline",
				className: "cn-banner-outline-warning",
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
					className="group flex size-5 shrink-0 cursor-pointer items-center justify-center">
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
				"flex flex-1 flex-col items-start justify-start gap-1 [&_[data-slot=banner-description]]:text-sm [&_[data-slot=banner-title]]:text-sm [&_[data-slot=banner-title]]:font-semibold",
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
