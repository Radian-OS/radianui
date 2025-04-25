import React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

type AlertProps = React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof alertVariants> & {
		title: string
		message: string
		icon?: React.ReactNode
		endContent?: React.ReactNode
	}

const alertVariants = cva("w-full rounded-md p-4 flex items-center justify-center gap-3", {
	variants: {
		color: {
			neutral: "bg-fill-level2",
			primary: "border-primary bg-primary/10 text-primary",
			info: "border-info bg-info/10 text-info",
			success: "border-success bg-success/10 text-success",
			danger: "border-error bg-error/10 text-error",
			warning: "border-warning bg-warning/10 text-warning",
		},
		variant: {
			default: "",
			bordered: "border bg-transparent",
			colored: ""
		},
	},
	defaultVariants: {
		color: "neutral",
		variant: "default",
	},
	compoundVariants: [
		{
			color: "neutral",
			variant: "bordered",
			className: "border bg-transparent",
		},
		{
			color: "primary",
			variant: "colored",
			className: "bg-primary text-static-white",
		},
		{
			color: "info",
			variant: "colored",
			className: "bg-info text-static-white",
		},
		{
			color: "success",
			variant: "colored",
			className: "bg-success text-static-white",
		},
		{
			color: "warning",
			variant: "colored",
			className: "bg-warning text-static-white",
		},
		{
			color: "danger",
			variant: "colored",
			className: "bg-error text-static-white",
		},
		{
			color: "neutral",
			variant: "colored",
			className: "bg-text text-inverse-white",
		}
	],
})

function Alert({
	color = "neutral",
	variant = "default",
	title,
	message,
	icon,
	endContent,
	className,
	...props
}: AlertProps) {
	const hasCustomTextColor = className?.includes("text-");

	return (
		<section className={cn(alertVariants({ color, variant, className }), "items-start")} {...props}>
			{icon && <div className="flex-shrink-0 [&>svg]:h-5 [&>svg]:w-5">{icon}</div>}
			<div className="flex flex-col gap-0.5 flex-grow">
				<p className="text-sm font-semibold">{title}</p>
				<p className={cn(
					"text-sm",
					!hasCustomTextColor && color === "neutral" && variant !== "colored" && "text-text-secondary",
					!hasCustomTextColor && color === "neutral" && variant === "colored" && "text-inverse-white"
				)}>
					{message}
				</p>
			</div>
			{endContent && (
				<div>
					{endContent}
				</div>
			)}
		</section>
	)
}

export { Alert }