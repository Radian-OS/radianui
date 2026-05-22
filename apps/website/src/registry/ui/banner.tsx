import * as React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { IconSlot } from "@/registry/icon/icon-library"

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
	"flex items-center justify-center w-full overflow-hidden r-banner cn-banner",
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
				strong: "r-banner-variant-strong cn-banner-variant-strong",
				soft: "r-banner-variant-soft cn-banner-variant-soft",
				outline: "r-banner-variant-outline cn-banner-variant-outline",
			},
		},
		compoundVariants: [
			// Soft
			{
				color: "neutral",
				variant: "soft",
				className: "r-banner-soft-neutral cn-banner-soft-neutral",
			},
			{
				color: "primary",
				variant: "soft",
				className: "r-banner-soft-primary cn-banner-soft-primary",
			},
			{
				color: "info",
				variant: "soft",
				className: "r-banner-soft-info cn-banner-soft-info",
			},
			{
				color: "success",
				variant: "soft",
				className: "r-banner-soft-success cn-banner-soft-success",
			},
			{
				color: "error",
				variant: "soft",
				className: "r-banner-soft-error cn-banner-soft-error",
			},
			{
				color: "warning",
				variant: "soft",
				className: "r-banner-soft-warning cn-banner-soft-warning",
			},

			// Strong
			{
				color: "neutral",
				variant: "strong",
				className: "r-banner-strong-neutral cn-banner-strong-neutral",
			},
			{
				color: "primary",
				variant: "strong",
				className: "r-banner-strong-primary cn-banner-strong-primary",
			},
			{
				color: "info",
				variant: "strong",
				className: "r-banner-strong-info cn-banner-strong-info",
			},
			{
				color: "warning",
				variant: "strong",
				className: "r-banner-strong-warning cn-banner-strong-warning",
			},
			{
				color: "error",
				variant: "strong",
				className: "r-banner-strong-error cn-banner-strong-error",
			},
			{
				color: "success",
				variant: "strong",
				className: "r-banner-strong-success cn-banner-strong-success",
			},

			// Outline
			{
				color: "neutral",
				variant: "outline",
				className: "r-banner-outline-neutral cn-banner-outline-neutral",
			},
			{
				color: "primary",
				variant: "outline",
				className: "r-banner-outline-primary cn-banner-outline-primary",
			},
			{
				color: "info",
				variant: "outline",
				className: "r-banner-outline-info cn-banner-outline-info",
			},
			{
				color: "success",
				variant: "outline",
				className: "r-banner-outline-success cn-banner-outline-success",
			},
			{
				color: "error",
				variant: "outline",
				className: "r-banner-outline-error cn-banner-outline-error",
			},
			{
				color: "warning",
				variant: "outline",
				className: "r-banner-outline-warning cn-banner-outline-warning",
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
					<IconSlot
						slot="cross"
						className="r-banner-close-icon cn-banner-close-icon size-5"
					/>
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
			className={cn("r-banner-title cn-banner-title", className)}
			{...props}
		/>
	)
}
BannerTitle.displayName = "BannerTitle"

function BannerDescription({ className, ...props }: BannerDescriptionProps) {
	return (
		<div
			data-slot="banner-description"
			className={cn("r-banner-description cn-banner-description", className)}
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
				"r-banner-content cn-banner-content flex flex-1 flex-col items-start justify-start",
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
