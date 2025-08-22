"use client"

import { type HTMLAttributes, type ReactNode, useState } from "react"

import { type VariantProps, cva } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

type BannerProps = HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof bannerVariants> & {
		children: ReactNode
		closable?: boolean
		className?: string
	}

const bannerVariants = cva("py-2 px-4 flex items-center justify-center gap-2.5 relative text-sm w-full", {
	variants: {
		variant: {
			strong: "",
			outline: "border-b border-soft-alpha",
			soft: "",
		},
		color: {
			primary: "",
			info: "",
			success: "",
			error: "",
			warning: "",
			neutral: " bg-elevation-level1 border-alpha",
		},
	},
	defaultVariants: {
		variant: "strong",
		color: "primary",
	},
	compoundVariants: [
		// Strong variant + colors
		{
			variant: "strong",
			color: "primary",
			className: "bg-primary text-white font-semibold",
		},
		{
			variant: "strong",
			color: "info",
			className: "bg-info text-white font-semibold",
		},
		{
			variant: "strong",
			color: "success",
			className: "bg-success  text-white font-semibold",
		},
		{
			variant: "strong",
			color: "error",
			className: "bg-error text-white font-semibold",
		},
		{
			variant: "strong",
			color: "warning",
			className: "bg-warning text-white font-semibold",
		},
		{
			variant: "strong",
			color: "neutral",
			className: "bg-black-inverse border border-alpha text-white-inverse font-medium",
		},
		// Outline variant + colors
		{
			variant: "outline",
			color: "primary",
			className: "text-primary-text border-b border-primary bg-transparent",
		},
		{
			variant: "outline",
			color: "info",
			className: "text-info-text border-b border-info bg-transparent",
		},
		{
			variant: "outline",
			color: "success",
			className: "text-success-text border-b border-success bg-transparent",
		},
		{
			variant: "outline",
			color: "error",
			className: "text-error-text border-b border-error bg-transparent",
		},
		{
			variant: "outline",
			color: "warning",
			className: "text-warning-text border-b border-warning bg-transparent",
		},
		{
			variant: "outline",
			color: "neutral",
			className: "text-fg-secondary border-b border-neutral bg-transparent",
		},
		// Soft variant + colors
		{
			variant: "soft",
			color: "primary",
			className: "bg-primary-accent text-primary-text",
		},
		{
			variant: "soft",
			color: "info",
			className: "bg-info-accent text-info-text",
		},
		{
			variant: "soft",
			color: "success",
			className: "bg-success-accent text-success-text",
		},
		{
			variant: "soft",
			color: "error",
			className: "bg-error-accent text-error-text",
		},
		{
			variant: "soft",
			color: "warning",
			className: "bg-warning-accent text-warning-text",
		},
		{
			variant: "soft",
			color: "neutral",
			className: "bg-fill2 text-fg-secondary",
		},
	],
})
function Banner({ children, color = "neutral", variant = "strong", closable, className = "", ...props }: BannerProps) {
	const [showBanner, setShowBanner] = useState(true)
	function getClosableVariant() {
		if (["primary", "destructive"].includes(color)) {
			return "text-white"
		}
		if (["outline", "gray"].includes(color)) {
			return "text-fg-disabled"
		}
	}

	return (
		showBanner && (
			<div {...props} className={cn(bannerVariants({ color, variant }), className)}>
				{children}
				{closable && <X size={20} onClick={() => setShowBanner(false)} className={`${getClosableVariant()} absolute right-4 cursor-pointer`} />}
			</div>
		)
	)
}
export { Banner }
