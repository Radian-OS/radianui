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
	"inline-flex items-center w-fit whitespace-nowrap transition duration-200 gap-1 r-badge cn-badge",
	{
		variants: {
			variant: {
				strong: "",
				outline: "r-badge-variant-outline cn-badge-variant-outline",
				soft: "",
			},
			size: {
				"20": "r-badge-size-20 cn-badge-size-20",
				"24": "r-badge-size-24 cn-badge-size-24",
				"28": "r-badge-size-28 cn-badge-size-28",
			},
			color: {
				primary: "",
				info: "",
				success: "",
				error: "",
				warning: "",
				neutral: "r-badge-color-neutral cn-badge-color-neutral",
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
				className: "r-badge-strong-primary cn-badge-strong-primary",
			},
			{
				variant: "strong",
				color: "info",
				className: "r-badge-strong-info cn-badge-strong-info",
			},
			{
				variant: "strong",
				color: "success",
				className: "r-badge-strong-success cn-badge-strong-success",
			},
			{
				variant: "strong",
				color: "error",
				className: "r-badge-strong-error cn-badge-strong-error",
			},
			{
				variant: "strong",
				color: "warning",
				className: "r-badge-strong-warning cn-badge-strong-warning",
			},
			{
				variant: "strong",
				color: "neutral",
				className: "r-badge-strong-neutral cn-badge-strong-neutral",
			},
			// outline
			{
				variant: "outline",
				color: "primary",
				className: "r-badge-outline-primary cn-badge-outline-primary",
			},
			{
				variant: "outline",
				color: "info",
				className: "r-badge-outline-info cn-badge-outline-info",
			},
			{
				variant: "outline",
				color: "success",
				className: "r-badge-outline-success cn-badge-outline-success",
			},
			{
				variant: "outline",
				color: "error",
				className: "r-badge-outline-error cn-badge-outline-error",
			},
			{
				variant: "outline",
				color: "warning",
				className: "r-badge-outline-warning cn-badge-outline-warning",
			},
			{
				variant: "outline",
				color: "neutral",
				className: "r-badge-outline-neutral cn-badge-outline-neutral",
			},
			// soft
			{
				variant: "soft",
				color: "primary",
				className: "r-badge-soft-primary cn-badge-soft-primary",
			},
			{
				variant: "soft",
				color: "info",
				className: "r-badge-soft-info cn-badge-soft-info",
			},
			{
				variant: "soft",
				color: "success",
				className: "r-badge-soft-success cn-badge-soft-success",
			},
			{
				variant: "soft",
				color: "error",
				className: "r-badge-soft-error cn-badge-soft-error",
			},
			{
				variant: "soft",
				color: "warning",
				className: "r-badge-soft-warning cn-badge-soft-warning",
			},
			{
				variant: "soft",
				color: "neutral",
				className: "r-badge-soft-neutral cn-badge-soft-neutral",
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
			className={cn("r-badge-dot cn-badge-dot size-1.5 shrink-0", className)}
			{...props}
		/>
	)
}
export { Badge, BadgeDot, badgeVariants }
