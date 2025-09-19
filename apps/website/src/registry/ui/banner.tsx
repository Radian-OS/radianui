"use client"

import { type HTMLAttributes, type ReactNode } from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

export type BannerProps = HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof bannerVariants> & {
		children?: ReactNode
		className?: string
	}

export type BannerTitleProps = HTMLAttributes<HTMLHeadingElement>
export type BannerDescriptionProps = HTMLAttributes<HTMLParagraphElement>
export type BannerActionProps = HTMLAttributes<HTMLButtonElement>

const bannerVariants = cva("p-2 flex items-center justify-center gap-2 relative text-sm w-full", {
	variants: {
		variant: {
			strong: "",
			outline: "border-b border-border",
			soft: "",
		},
		color: {
			primary: "",
			info: "",
			success: "",
			error: "",
			warning: "",
			neutral: " bg-elevation-level1 border-alpha text-fg-inverse",
		},
	},
	compoundVariants: [
		// Strong variant + colors
		{
			variant: "strong",
			color: "primary",
			className: "bg-primary text-white",
		},
		{
			variant: "strong",
			color: "info",
			className: "bg-info text-white",
		},
		{
			variant: "strong",
			color: "success",
			className: "bg-success text-white",
		},
		{
			variant: "strong",
			color: "error",
			className: "bg-error text-white",
		},
		{
			variant: "strong",
			color: "warning",
			className: "bg-warning text-white",
		},
		{
			variant: "strong",
			color: "neutral",
			className: "bg-black-inverse",
		},
		// Outline variant + colors
		{
			variant: "outline",
			color: "primary",
			className: "bg-transparent",
		},
		{
			variant: "outline",
			color: "info",
			className: "bg-transparent",
		},
		{
			variant: "outline",
			color: "success",
			className: "bg-transparent",
		},
		{
			variant: "outline",
			color: "error",
			className: "bg-transparent",
		},
		{
			variant: "outline",
			color: "warning",
			className: "bg-transparent",
		},
		{
			variant: "outline",
			color: "neutral",
			className: "bg-transparent text-black-inverse",
		},
		// Soft variant + colors
		{
			variant: "soft",
			color: "primary",
			className: "bg-primary-accent",
		},
		{
			variant: "soft",
			color: "info",
			className: "bg-info-accent",
		},
		{
			variant: "soft",
			color: "success",
			className: "bg-success-accent",
		},
		{
			variant: "soft",
			color: "error",
			className: "bg-error-accent",
		},
		{
			variant: "soft",
			color: "warning",
			className: "bg-warning-accent",
		},
		{
			variant: "soft",
			color: "neutral",
			className: "bg-fill2 text-black-inverse",
		},
	],
	defaultVariants: {
		variant: "strong",
		color: "primary",
	},
})

function Banner({ color, variant, className, children }: BannerProps) {
	return (
		// <BannerContext.Provider value={{}}>
		<div role="banner" className={cn(bannerVariants({ color, variant }), className)}>
			{children}
		</div>
		// {/* </BannerContext.Provider> */}
	)
}
Banner.displayName = "Banner"

function BannerTitle({ className, ...props }: BannerTitleProps) {
	return <h5 className={cn("text-sm font-medium", className)} {...props}></h5>
}
BannerTitle.displayName = "BannerTitle"

function BannerDescription({ className, ...props }: BannerDescriptionProps) {
	return <p className={cn("text-sm", className)} {...props}></p>
}
BannerDescription.displayName = "BannerDescription"

function BannerAction({ className, children, ...props }: BannerActionProps) {
	return (
		<span className={cn("absolute right-2 top-1/2 -translate-y-1/2", className)} {...props}>
			{children}
		</span>
	)
}
BannerAction.displayName = "BannerAction"

export { Banner, BannerTitle, BannerDescription, BannerAction, bannerVariants }
