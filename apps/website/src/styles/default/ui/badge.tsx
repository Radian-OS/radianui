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
				className: "cn-badge-strong-primary",
			},
			{ variant: "strong", color: "info", className: "cn-badge-strong-info" },
			{
				variant: "strong",
				color: "success",
				className: "cn-badge-strong-success",
			},
			{ variant: "strong", color: "error", className: "cn-badge-strong-error" },
			{
				variant: "strong",
				color: "warning",
				className: "cn-badge-strong-warning",
			},
			{
				variant: "strong",
				color: "neutral",
				className: "cn-badge-strong-neutral",
			},
			// outline
			{
				variant: "outline",
				color: "primary",
				className: "cn-badge-outline-primary",
			},
			{ variant: "outline", color: "info", className: "cn-badge-outline-info" },
			{
				variant: "outline",
				color: "success",
				className: "cn-badge-outline-success",
			},
			{
				variant: "outline",
				color: "error",
				className: "cn-badge-outline-error",
			},
			{
				variant: "outline",
				color: "warning",
				className: "cn-badge-outline-warning",
			},
			{
				variant: "outline",
				color: "neutral",
				className: "cn-badge-outline-neutral",
			},
			// soft
			{ variant: "soft", color: "primary", className: "cn-badge-soft-primary" },
			{ variant: "soft", color: "info", className: "cn-badge-soft-info" },
			{ variant: "soft", color: "success", className: "cn-badge-soft-success" },
			{ variant: "soft", color: "error", className: "cn-badge-soft-error" },
			{ variant: "soft", color: "warning", className: "cn-badge-soft-warning" },
			{ variant: "soft", color: "neutral", className: "cn-badge-soft-neutral" },
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
