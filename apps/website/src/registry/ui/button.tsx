"use client"

import React from "react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Spinner } from "./spinner"

type ButtonProps = VariantProps<typeof buttonVariants> &
	React.ButtonHTMLAttributes<HTMLButtonElement> & {
		className?: string
		children: React.ReactNode
		iconOnly?: boolean
		color?: "primary" | "info" | "success" | "error" | "warning" | "neutral"
		lead?: React.ReactNode
		trail?: React.ReactNode
		loading?: boolean
		asChild?: boolean
	}

type ButtonGroupProps = React.HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode
	variant?: ButtonProps["variant"]
	size?: ButtonProps["size"]
	color?: ButtonProps["color"]
}

type CompactButtonProps = Omit<ButtonProps, "iconOnly" | "lead" | "trail" | "size"> & {
	size?: "20" | "24"
	asChild?: boolean
}

export const buttonVariants = cva(
	"inline-flex whitespace-nowrap items-center justify-center box-border transition-colors duration-200 transform focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base disabled:pointer-events-none hover:cursor-pointer w-fit",
	{
		variants: {
			variant: {
				strong: "",
				soft: "",
				outline: "",
				ghost: "",
			},
			size: {
				"28": "[&>svg]:size-4 text-xs/4 px-1 rounded-md",
				"32": "[&>svg]:size-5 text-sm px-1 rounded-lg",
				"36": "[&>svg]:size-5 text-sm px-1 rounded-lg",
				"40": "[&>svg]:size-5 text-sm px-1 rounded-lg",
				"44": "[&>svg]:size-6 text-base px-1 rounded-lg",
				"48": "[&>svg]:size-6 text-base px-1 rounded-lg",
			},
			loading: {
				true: "",
				false: "",
			},

			iconOnly: {
				true: "",
				false: "",
			},
			color: {
				primary: "",
				info: "",
				success: "",
				error: "",
				warning: "",
				neutral: "[&>svg]:text-text-secondary",
			},
		},
		defaultVariants: {
			variant: "strong",
			size: "36",
			iconOnly: false,
			color: "primary",
			loading: false,
		},
		compoundVariants: [
			// Size variants
			{ iconOnly: false, size: "28", className: "gap-2 h-7 px-2" },
			{ iconOnly: false, size: "32", className: "gap-2 h-8 px-2.5" },
			{ iconOnly: false, size: "36", className: "gap-2 h-9 px-3" },
			{ iconOnly: false, size: "40", className: "gap-2 h-10 px-3.5" },
			{ iconOnly: false, size: "44", className: "gap-2 h-11 px-4" },
			{ iconOnly: false, size: "48", className: "gap-2 h-12 px-4.5" },

			{ iconOnly: true, size: "28", className: "px-1.5 h-7 gap-2" },
			{ iconOnly: true, size: "32", className: "px-1.5 h-8 gap-2" },
			{ iconOnly: true, size: "36", className: "px-2 h-9 gap-2" },
			{ iconOnly: true, size: "40", className: "px-2.5 h-10 gap-2" },
			{ iconOnly: true, size: "44", className: "px-2.5 h-11 gap-2" },
			{ iconOnly: true, size: "48", className: "px-3 h-12 gap-2" },

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
			{
				variant: "strong",
				color: "neutral",
				className: "bg-inverse-black font-medium text-inverse-white hover:bg-inverse-black/88 focus-visible:ring-inverse-black focus-visible:outline-none",
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
			{
				variant: "soft",
				color: "neutral",
				className: "bg-fill-level2 font-medium text-text-secondary hover:bg-border-alpha focus-visible:bg-base focus-visible:outline-none focus-visible:ring-border",
			},

			// Outline variant + colors
			{
				variant: "outline",
				color: "primary",
				className: "bg-transparent font-medium border border-primary-stroke text-primary hover:bg-primary-accent focus-visible:ring-primary-stroke",
			},
			{
				variant: "outline",
				color: "info",
				className: "bg-transparent font-medium border border-info-stroke text-info hover:bg-info-accent focus-visible:ring-info-stroke",
			},
			{
				variant: "outline",
				color: "success",
				className: "bg-transparent font-medium border border-success-stroke text-success hover:bg-success-accent focus-visible:ring-success-stroke",
			},
			{
				variant: "outline",
				color: "error",
				className: "bg-transparent font-medium border border-error-stroke text-error hover:bg-error-accent focus-visible:ring-error-stroke",
			},
			{
				variant: "outline",
				color: "warning",
				className: "bg-transparent font-medium border border-warning-stroke text-warning hover:bg-warning-accent focus-visible:ring-warning-stroke",
			},
			{
				variant: "outline",
				color: "neutral",
				className: "bg-bg-level1 font-medium border border-border  hover:bg-bg-level1 focus-visible:ring-border relative before:absolute before:inset-0 hover:before:bg-bg-alpha-2",
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
			{
				variant: "ghost",
				color: "neutral",
				className: "bg-transparent text-text-secondary font-medium hover:bg-border-alpha focus-visible:outline-none focus-visible:ring-border",
			},

			// Neutral variants
		],
	}
)

function Button({
	loading = false,
	variant = "strong",
	size = "36",
	iconOnly = false,
	color = "primary",
	className,
	children,
	disabled,
	lead,
	trail,
	asChild = false,
	...props
}: ButtonProps) {
	const combinedClass = cn(buttonVariants({ variant, size, iconOnly, color }), disabled && "opacity-50", className)

	const Comp = asChild ? Slot : "button"

	// When using asChild, we need to pass the styling to the child element
	// and cannot modify the children structure
	if (asChild) {
		// Don't allow lead/trail/loading when using asChild as it would break the single child requirement
		if (lead || trail || loading) {
			console.warn("Button: lead, trail, and loading props are not supported when using asChild")
		}

		return (
			<Comp className={combinedClass} disabled={disabled} {...props}>
				{children}
			</Comp>
		)
	}

	// Normal button behavior
	return (
		<Comp className={combinedClass} disabled={disabled} {...props}>
			{lead}
			{loading ? <Spinner size={size ? Number(size) : undefined} /> : null}
			{children}
			{trail}
		</Comp>
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
			if (variant === "outline") {
				// For outline variants, we need to completely eliminate double borders
				borderFixClass = !isFirst ? "ml-[1px]" : ""
			} else if (variant === "strong") {
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
						// "hover:z-20 focus:z-30",
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

function CompactButton({ loading = false, variant = "strong", size = "24", color = "primary", className, children, disabled, asChild = false, ...props }: CompactButtonProps) {
	const sizeStyles = size === "20" ? "[&>svg]:!w-4 [&>svg]:!h-4 h-5 w-5 p-0.5 rounded-sm" : "[&>svg]:!w-4 [&>svg]:!h-4 h-6 w-6 p-1 rounded-md"

	const combinedClass = cn(
		"inline-flex whitespace-nowrap items-center justify-center box-border transition-colors duration-200 transform focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base disabled:pointer-events-none hover:cursor-pointer w-fit",
		sizeStyles,
		buttonVariants({ variant, size: "36", iconOnly: true, color })
			.split(" ")
			.filter(
				(cls) =>
					!cls.includes("rounded") &&
					!cls.includes("h-") &&
					!cls.includes("w-") &&
					!cls.includes("px-") &&
					!cls.includes("gap-") &&
					!cls.includes("[&>svg]") &&
					!cls.includes("text-")
			)
			.join(" "),
		disabled && "opacity-50",
		className
	)

	const Comp = asChild ? Slot : "button"

	// When using asChild, we need to pass the styling to the child element
	if (asChild) {
		if (loading) {
			console.warn("CompactButton: loading prop is not supported when using asChild")
		}

		return (
			<Comp className={combinedClass} disabled={disabled} {...props}>
				{children}
			</Comp>
		)
	}

	return (
		<Comp className={combinedClass} disabled={disabled} {...props}>
			{loading ? <Spinner size={16} /> : children}
		</Comp>
	)
}
CompactButton.displayName = "CompactButton"

export { Button, ButtonGroup, CompactButton }
