"use client"

import { type HTMLAttributes, type ReactNode, useState } from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { CompactButton } from "./button"

type BannerProps = HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof bannerVariants> & {
		children?: ReactNode
		className?: string
		start?: ReactNode
		end?: ReactNode
		title?: string
		description?: string
		onClose?: () => void
	}

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
	defaultVariants: {
		variant: "strong",
		color: "primary",
	},
	compoundVariants: [
		// Strong variant + colors
		{
			variant: "strong",
			color: "primary",
			className: "bg-primary",
		},
		{
			variant: "strong",
			color: "info",
			className: "bg-info",
		},
		{
			variant: "strong",
			color: "success",
			className: "bg-success",
		},
		{
			variant: "strong",
			color: "error",
			className: "bg-error",
		},
		{
			variant: "strong",
			color: "warning",
			className: "bg-warning",
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
})
function Banner({ children, color = "neutral", variant = "strong", onClose, start, end, title, description, className = "", ...props }: BannerProps) {
	const [showBanner, setShowBanner] = useState(true)

	const closeButton = onClose && (
		<CompactButton
			size="20"
			disabled={false}
			color="neutral"
			variant="ghost"
			onClick={() => setShowBanner(false)}
			className={`absolute right-4 cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-4 ${variant === "strong" ? (color === "neutral" ? "text-white-inverse" : "text-white") : ""}`}>
			<X />
		</CompactButton>
	)

	return (
		showBanner && (
			<div {...props} className={cn(bannerVariants({ color, variant }), className)}>
				{start && start}
				{title && <h4 className={`font-medium ${variant === "strong" ? (color === "neutral" ? "text-white-inverse" : "text-white") : ""}`}>{title}</h4>}
				{description && (
					<p
						className={`font-normal ${variant === "outline" ? "text-fg-secondary" : variant === "soft" ? "text-fg" : variant === "strong" ? (color === "neutral" ? "text-white-inverse" : "text-white") : ""}`}>
						{description}
					</p>
				)}
				{children}
				{end && end}
				{closeButton}
			</div>
		)
	)
}
export { Banner }
