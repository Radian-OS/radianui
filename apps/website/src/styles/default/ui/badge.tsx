import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

export type BadgeProps = Omit<React.HTMLAttributes<HTMLDivElement>, "color"> &
	VariantProps<typeof badgeVariants> & {
		asChild?: boolean
	}
export type BadgeDotProps = React.HTMLAttributes<HTMLSpanElement>

const badgeVariants = cva(
	"inline-flex items-center w-fit whitespace-nowrap transition duration-200 gap-1 font-medium",
	{
		variants: {
			variant: {
				strong: "",
				outline: "bg-transparent",
				soft: "",
			},
			size: {
				"20": "h-5 rounded-md px-1.5 text-xs [&_svg]:size-3.5",
				"24": "h-6 rounded-md px-2 text-[13px] [&_svg]:size-3.5",
				"28": "h-7 rounded-md px-2 text-sm [&_svg]:size-4",
			},
			color: {
				primary: "",
				info: "",
				success: "",
				error: "",
				warning: "",
				neutral: "bg-elevation-level1 border-alpha",
			},
		},
		defaultVariants: {
			variant: "soft",
			size: "24",
			color: "primary",
		},
		compoundVariants: [
			// strong
			{
				variant: "strong",
				color: "primary",
				className:
					"bg-primary border-alpha text-primary-fg border font-semibold",
			},
			{
				variant: "strong",
				color: "info",
				className: "bg-info border-alpha border font-semibold text-white",
			},
			{
				variant: "strong",
				color: "success",
				className: "bg-success border-alpha border font-semibold text-white",
			},
			{
				variant: "strong",
				color: "error",
				className: "bg-error border-alpha border font-semibold text-white",
			},
			{
				variant: "strong",
				color: "warning",
				className: "bg-warning border-alpha border font-semibold text-white",
			},
			{
				variant: "strong",
				color: "neutral",
				className:
					"bg-black-inverse text-white-inverse border-alpha border font-medium",
			},
			// outline
			{
				variant: "outline",
				color: "primary",
				className:
					"text-primary-text border-primary-border border bg-transparent",
			},
			{
				variant: "outline",
				color: "info",
				className: "text-info-text border-info-border border bg-transparent",
			},
			{
				variant: "outline",
				color: "success",
				className:
					"text-success-text border-success-border border bg-transparent",
			},
			{
				variant: "outline",
				color: "error",
				className: "text-error-text border-error-border border bg-transparent",
			},
			{
				variant: "outline",
				color: "warning",
				className:
					"text-warning-text border-warning-border border bg-transparent",
			},
			{
				variant: "outline",
				color: "neutral",
				className: "text-fg border bg-transparent",
			},
			// soft
			{
				variant: "soft",
				color: "primary",
				className: "bg-primary-accent text-primary-text border-soft-alpha",
			},
			{
				variant: "soft",
				color: "info",
				className: "bg-info-accent text-info-text border-soft-alpha",
			},
			{
				variant: "soft",
				color: "success",
				className: "bg-success-accent text-success-text border-soft-alpha",
			},
			{
				variant: "soft",
				color: "error",
				className: "bg-error-accent text-error-text border-soft-alpha",
			},
			{
				variant: "soft",
				color: "warning",
				className: "bg-warning-accent text-warning-text border-soft-alpha",
			},
			{
				variant: "soft",
				color: "neutral",
				className: "bg-fill2 text-fg border-soft-alpha",
			},
		],
	}
)

function Badge({
	className,
	variant,
	size,
	color,
	asChild = false,
	children,
	...props
}: BadgeProps) {
	if (asChild) {
		return (
			<Slot
				className={cn(badgeVariants({ variant, size, color }), className)}
				{...props}>
				{children}
			</Slot>
		)
	}
	return (
		<span
			className={cn(badgeVariants({ variant, size, color }), className)}
			{...props}>
			{children}
		</span>
	)
}
Badge.displayName = "Badge"

function BadgeDot({ className, ...props }: BadgeDotProps) {
	return (
		<span
			data-slot="badge-dot"
			className={cn(
				"size-1.5 shrink-0 rounded-full bg-[currentColor]",
				className
			)}
			{...props}
		/>
	)
}

export { Badge, BadgeDot, badgeVariants }
