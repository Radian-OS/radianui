"use client"

import React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

type ButtonProps = VariantProps<typeof buttonVariants> &
	React.ButtonHTMLAttributes<HTMLButtonElement> & {
		className?: string
		children: React.ReactNode
		isIcon?: boolean
		color?: "primary" | "info" | "success" | "error" | "warning"
		lead?: React.ReactNode
		trail?: React.ReactNode
	}

type ButtonGroupProps = React.HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode
	variant?: ButtonProps["variant"]
	size?: ButtonProps["size"]
	color?: ButtonProps["color"]
}

const buttonVariants = cva(
	"inline-flex whitespace-nowrap items-center justify-center box-border transition duration-200 transform focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base disabled:pointer-events-none w-fit",
	{
		variants: {
			variant: {
				strong: "",
				soft: "",
				outline: "",
				ghost: "",
				"neutral-soft": "bg-bg-base font-medium hover:bg-fill-level1 focus-visible:outline-none focus-visible:ring-border-alpha",
				"neutral-outline": "bg-bg-base font-medium outline-1 outline-border-alpha drop-shadow-xs hover:bg-fill-level2 focus-visible:ring-border-alpha",
			},
			size: {
				"28": "[&>svg]:size-4 text-xs [&>span]:px-1 rounded-md",
				"32": "[&>svg]:size-5 text-sm [&>span]:px-1 rounded-lg",
				"36": "[&>svg]:size-5 text-sm [&>span]:px-1 rounded-lg",
				"40": "[&>svg]:size-5 text-sm [&>span]:px-1 rounded-lg",
				"44": "[&>svg]:size-6 text-base [&>span]:px-1 rounded-lg",
				"48": "[&>svg]:size-6 text-base [&>span]:px-1 rounded-lg",
			},

			isIcon: {
				true: "",
				false: "",
			},
			color: {
				primary: "",
				info: "",
				success: "",
				error: "",
				warning: "",
			},
		},
		defaultVariants: {
			variant: "strong",
			size: "36",
			isIcon: false,
			color: "primary",
		},
		compoundVariants: [
			// Size variants
			{ isIcon: false, size: "28", className: "gap-2 h-7 px-2" },
			{ isIcon: false, size: "32", className: "gap-2 h-8 px-2.5" },
			{ isIcon: false, size: "36", className: "gap-2 h-9 px-3" },
			{ isIcon: false, size: "40", className: "gap-2 h-10 px-3.5" },
			{ isIcon: false, size: "44", className: "gap-2 h-11 px-4" },
			{ isIcon: false, size: "48", className: "gap-2 h-12 px-4.5" },

			{ isIcon: true, size: "28", className: "px-1.5 h-7 gap-2" },
			{ isIcon: true, size: "32", className: "px-1.5 h-8 gap-2" },
			{ isIcon: true, size: "36", className: "px-2 h-9 gap-2" },
			{ isIcon: true, size: "40", className: "px-2.5 h-10 gap-2" },
			{ isIcon: true, size: "44", className: "px-2.5 h-11 gap-2" },
			{ isIcon: true, size: "48", className: "px-3 h-12 gap-2" },

			// Strong variant + colors
			{
				variant: "strong",
				color: "primary",
				className: "bg-primary font-medium text-static-white hover:bg-primary-hover focus-visible:ring-primary focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "info",
				className: "bg-info font-medium text-static-white hover:bg-info-hover focus-visible:ring-info focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "success",
				className: "bg-success font-medium text-static-white hover:bg-success-hover focus-visible:ring-success focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "error",
				className: "bg-error font-medium text-static-white hover:bg-error-hover focus-visible:ring-error focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "warning",
				className: "bg-warning font-medium text-static-white hover:bg-warning-hover focus-visible:ring-warning focus-visible:outline-none",
			},

			// Soft variant + colors
			{
				variant: "soft",
				color: "primary",
				className: "bg-primary-accent font-medium text-primary hover:bg-primary/15 focus-visible:ring-primary-focus focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "info",
				className: "bg-info-accent font-medium text-info hover:bg-info/15 focus-visible:ring-info-focus focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "success",
				className: "bg-success-accent font-medium text-success hover:bg-success/15 focus-visible:ring-success-focus focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "error",
				className: "bg-error-accent font-medium text-error hover:bg-error/15 focus-visible:ring-error-focus focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "warning",
				className: "bg-warning-accent font-medium text-warning hover:bg-warning/15 focus-visible:ring-warning-focus focus-visible:outline-none",
			},

			// Outline variant + colors
			{
				variant: "outline",
				color: "primary",
				className: "bg-transparent font-medium outline outline-primary-stroke text-primary hover:bg-primary-accent focus-visible:ring-primary-stroke",
			},
			{
				variant: "outline",
				color: "info",
				className: "bg-transparent font-medium outline outline-info-stroke text-info hover:bg-info-accent focus-visible:ring-info-stroke",
			},
			{
				variant: "outline",
				color: "success",
				className: "bg-transparent font-medium outline outline-success-stroke text-success hover:bg-success-accent focus-visible:ring-success-stroke",
			},
			{
				variant: "outline",
				color: "error",
				className: "bg-transparent font-medium outline outline-error-stroke text-error hover:bg-error-accent focus-visible:ring-error-stroke",
			},
			{
				variant: "outline",
				color: "warning",
				className: "bg-transparent font-medium outline outline-warning-stroke text-warning hover:bg-warning-accent focus-visible:ring-warning-stroke",
			},

			// Ghost variant + colors
			{
				variant: "ghost",
				color: "primary",
				className: "bg-transparent text-primary font-medium hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-primary-focus",
			},
			{
				variant: "ghost",
				color: "info",
				className: "bg-transparent text-info font-medium hover:bg-info/10 focus-visible:outline-none focus-visible:ring-info-focus",
			},
			{
				variant: "ghost",
				color: "success",
				className: "bg-transparent text-success font-medium hover:bg-success/10 focus-visible:outline-none focus-visible:ring-success-focus",
			},
			{
				variant: "ghost",
				color: "error",
				className: "bg-transparent text-error font-medium hover:bg-error/10 focus-visible:outline-none focus-visible:ring-error-focus",
			},
			{
				variant: "ghost",
				color: "warning",
				className: "bg-transparent text-warning font-medium hover:bg-warning/10 focus-visible:outline-none focus-visible:ring-warning-focus",
			},
		],
	}
)

function Button({ variant = "strong", size = "36", isIcon = false, color = "primary", className, children, disabled, lead, trail, ...props }: ButtonProps) {
	// Create a combined class with a special treatment for disabled state
	const combinedClass = cn(
		buttonVariants({ variant, size, isIcon, color }),
		disabled && "opacity-50", // Apply opacity only in disabled state
		className
	)

	return (
		<button className={combinedClass} disabled={disabled} {...props}>
			{lead}
			{children}
			{trail}
		</button>
	)
}
Button.displayName = "Button"

function ButtonGroup({ className, children, variant = "outline", size = "36", color = "primary", ...props }: ButtonGroupProps) {
	const modifiedChildren = React.Children.map(children, (child, index) => {
		if (React.isValidElement(child)) {
			const isFirst = index === 0
			const isLast = index === React.Children.count(children) - 1
			const totalChildren = React.Children.count(children)

			// Define border radius class consistently
			const borderRadiusClass = isFirst ? "rounded-l-lg" : isLast ? "rounded-r-lg" : "rounded-none"

			// Set position for proper z-index layering
			const positionClass = isFirst ? "relative z-10" : `relative z-[${totalChildren - index}]`

			// Special handling for different variants
			let borderFixClass = ""
			if (variant === "outline" || variant === "neutral-outline") {
				// For outline variants, we need to completely eliminate double borders
				borderFixClass = !isFirst ? "border-l-0 -ml-[1px]" : ""
			} else if (variant === "strong" || variant === "neutral-soft") {
				// For solid variants
				borderFixClass = !isFirst ? "-ml-[1px]" : ""
			}

			// Check if this is a Button component that should receive our props
			if (React.isValidElement<ButtonProps>(child)) {
				return React.cloneElement(child, {
					variant,
					size,
					color, // Ensure color is passed to child buttons
					className: cn(
						"rounded-none",
						borderRadiusClass,
						positionClass,
						borderFixClass,
						variant === "outline" && "outline-0 border border-current",
						variant === "neutral-outline" && "outline-0 border border-border-alpha",
						"hover:z-20 focus:z-30",
						child.props.className
					),
				})
			}
		}
		return child
	})

	return (
		<div className={cn("inline-flex", className)} role="group" {...props}>
			{modifiedChildren}
		</div>
	)
}
ButtonGroup.displayName = "ButtonGroup"

export { Button, ButtonGroup }
