import * as React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { IconSlot } from "@/registry/icon-library"

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
	"flex items-center justify-center w-full overflow-hidden cn-banner",
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
				strong: "cn-banner-variant-strong",
				soft: "cn-banner-variant-soft",
				outline: "cn-banner-variant-outline",
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
					<IconSlot slot="cross" className="cn-banner-close-icon size-5" />
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
			className={cn("cn-banner-title", className)}
			{...props}
		/>
	)
}
BannerTitle.displayName = "BannerTitle"

function BannerDescription({ className, ...props }: BannerDescriptionProps) {
	return (
		<div
			data-slot="banner-description"
			className={cn("cn-banner-description", className)}
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
				"cn-banner-content flex flex-1 flex-col items-start justify-start",
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
