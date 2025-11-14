"use client"

import React from "react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Spinner } from "./spinner"

export type ButtonProps = React.ComponentProps<"button"> & {
	variant?: VariantProps<typeof buttonVariants>["variant"]
	size?: VariantProps<typeof buttonVariants>["size"]
	className?: string
	children: React.ReactNode
	color?: VariantProps<typeof buttonVariants>["color"]
	loading?: boolean
	asChild?: boolean
}

export type ButtonGroupProps = React.HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode
	variant?: "strong" | "soft" | "outline" | "ghost"
	size?: VariantProps<typeof buttonVariants>["size"]
	color?: VariantProps<typeof buttonVariants>["color"]
}

export type CompactButtonProps = {
	loading?: boolean
	variant?: VariantProps<typeof compactButtonVariants>["variant"]
	size?: VariantProps<typeof compactButtonVariants>["size"]
	color?: VariantProps<typeof compactButtonVariants>["color"]
	className?: string
	children: React.ReactNode
	disabled?: boolean
	asChild?: boolean
} & React.ComponentProps<"button">

export type IconButtonProps = Omit<React.ComponentProps<"button">, "color"> & {
	className?: string
	children: React.ReactNode
	variant?: VariantProps<typeof buttonVariants>["variant"]
	size?: VariantProps<typeof buttonVariants>["size"]
	color?: VariantProps<typeof buttonVariants>["color"]
	loading?: boolean
	asChild?: boolean
}

export const buttonVariants = cva(
	"inline-flex whitespace-nowrap items-center justify-center box-border focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none hover:cursor-pointer w-fit",
	{
		variants: {
			variant: {
				strong: "",
				soft: "",
				outline: "",
				ghost: "",
				link: "",
			},
			size: {
				"28": "[&>svg]:size-4 text-[13px] leading-4.5 px-1 rounded-md",
				"32": "[&>svg]:size-4.5 text-sm px-1 rounded-md",
				"36": "[&>svg]:size-5 text-sm px-1 rounded-lg",
				"40": "[&>svg]:size-5 text-sm px-1 rounded-lg",
				"44": "[&>svg]:size-5 text-base px-1 rounded-[10px]",
				"48": "[&>svg]:size-6 text-base px-1 rounded-[10px]",
			},
			loading: {
				true: "",
				false: "",
			},
			color: {
				primary: "",
				info: "",
				success: "",
				error: "",
				warning: "",
				neutral: "",
			},
		},
		defaultVariants: {
			variant: "strong",
			size: "36",
			color: "primary",
			loading: false,
		},
		compoundVariants: [
			// Default size styles (for buttons with text)
			{ size: "28", className: "gap-1 h-7 px-2 py-1.5" },
			{ size: "32", className: "gap-1.5 h-8 px-2 py-1.5" },
			{ size: "36", className: "gap-2 h-9 px-3 py-2" },
			{ size: "40", className: "gap-2 h-10 px-3 py-2.5" },
			{ size: "44", className: "gap-2 h-11 px-3 py-2.5" },
			{ size: "48", className: "gap-2 h-12 px-4 py-3" },

			// Strong variant + colors
			{
				variant: "strong",
				color: "primary",
				className: "bg-primary font-medium text-white hover:bg-primary-hover focus-visible:ring-primary focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "info",
				className: "bg-info font-medium text-white hover:bg-info-hover focus-visible:ring-info focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "success",
				className: "bg-success font-medium text-white hover:bg-success-hover focus-visible:ring-success focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "error",
				className: "bg-error font-medium text-white hover:bg-error-hover focus-visible:ring-error focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "warning",
				className: "bg-warning font-medium text-white hover:bg-warning-hover focus-visible:ring-warning focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "neutral",
				className: "bg-black-inverse font-medium text-white-inverse hover:bg-fg-secondary focus-visible:ring-black-inverse focus-visible:outline-none",
			},

			// Soft variant + colors
			{
				variant: "soft",
				color: "primary",
				className: "bg-primary-accent font-medium text-primary-text hover:bg-primary-focus focus-visible:ring-primary-focus focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "info",
				className: "bg-info-accent font-medium text-info-text hover:bg-info-focus focus-visible:ring-info-focus focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "success",
				className: "bg-success-accent font-medium text-success-text hover:bg-success-focus focus-visible:ring-success-focus focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "error",
				className: "bg-error-accent font-medium text-error-text hover:bg-error-focus focus-visible:ring-error-focus focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "warning",
				className: "bg-warning-accent font-medium text-warning-text hover:bg-warning-focus focus-visible:ring-warning-focus focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "neutral",
				className: "bg-fill2 font-medium text-fg-secondary hover:bg-fill3 focus-visible:bg-bg focus-visible:outline-none focus-visible:ring-border",
			},

			// Outline variant + colors
			{
				variant: "outline",
				color: "primary",
				className: "bg-transparent font-medium border border-primary-border text-primary-text hover:bg-primary-accent focus-visible:ring-primary-hover",
			},
			{
				variant: "outline",
				color: "info",
				className: "bg-transparent font-medium border border-info-border text-info-text hover:bg-info-accent focus-visible:ring-info-hover",
			},
			{
				variant: "outline",
				color: "success",
				className: "bg-transparent font-medium border border-success-border text-success-text hover:bg-success-accent focus-visible:ring-success-hover",
			},
			{
				variant: "outline",
				color: "error",
				className: "bg-transparent font-medium border border-error-border text-error-text hover:bg-error-accent focus-visible:ring-error-hover",
			},
			{
				variant: "outline",
				color: "warning",
				className: "bg-transparent font-medium border border-warning-border text-warning-text hover:bg-warning-accent focus-visible:ring-warning-hover",
			},
			{
				variant: "outline",
				color: "neutral",
				className: "bg-elevation-level1 font-medium text-fg-secondary border border-border hover:bg-fill2 focus-visible:ring-border  dark:hover:bg-fill3",
			},

			// Ghost variant + colors
			{
				variant: "ghost",
				color: "primary",
				className: "bg-transparent text-primary-text font-medium hover:bg-primary-focus focus-visible:outline-none focus-visible:ring-primary-focus",
			},
			{
				variant: "ghost",
				color: "info",
				className: "bg-transparent text-info-text font-medium hover:bg-info-focus focus-visible:outline-none focus-visible:ring-info-focus",
			},
			{
				variant: "ghost",
				color: "success",
				className: "bg-transparent text-success-text font-medium hover:bg-success-focus focus-visible:outline-none focus-visible:ring-success-focus",
			},
			{
				variant: "ghost",
				color: "error",
				className: "bg-transparent text-error-text font-medium hover:bg-error-focus focus-visible:outline-none focus-visible:ring-error-focus",
			},
			{
				variant: "ghost",
				color: "warning",
				className: "bg-transparent text-warning-text font-medium hover:bg-warning-focus focus-visible:outline-none focus-visible:ring-warning-focus",
			},
			{
				variant: "ghost",
				color: "neutral",
				className: "bg-transparent text-fg-secondary font-medium hover:bg-fill2 focus-visible:outline-none focus-visible:ring-border",
			},

			// Link variant + colors
			{
				variant: "link",
				color: "primary",
				className:
					"bg-transparent text-primary-text font-medium hover:underline focus-visible:ring-primary focus-visible:outline-none h-auto px-0 py-0 gap-1 focus-visible:rounded-sm",
			},
			{
				variant: "link",
				color: "info",
				className: "bg-transparent text-info-text font-medium hover:underline focus-visible:ring-info focus-visible:outline-none h-auto px-0 py-0 gap-1 focus-visible:rounded-sm",
			},
			{
				variant: "link",
				color: "success",
				className:
					"bg-transparent text-success-text font-medium hover:underline focus-visible:ring-success focus-visible:outline-none h-auto px-0 py-0 gap-1 focus-visible:rounded-sm",
			},
			{
				variant: "link",
				color: "error",
				className: "bg-transparent text-error-text font-medium hover:underline focus-visible:ring-error focus-visible:outline-none h-auto px-0 py-0 gap-1 focus-visible:rounded-sm",
			},
			{
				variant: "link",
				color: "warning",
				className:
					"bg-transparent text-warning-text font-medium hover:underline focus-visible:ring-warning focus-visible:outline-none h-auto px-0 py-0 gap-1 focus-visible:rounded-sm",
			},
			{
				variant: "link",
				color: "neutral",
				className:
					"bg-transparent text-black-inverse font-medium hover:underline focus-visible:ring-black-inverse focus-visible:outline-none h-auto px-0 py-0 gap-1 focus-visible:rounded-sm",
			},

			// Link variant loading state (no underline when loading)
			{
				variant: "link",
				loading: true,
				className: "hover:no-underline",
			},
		],
	}
)

function Button({ loading = false, variant = "strong", size = "36", color = "primary", className, children, disabled, asChild = false, ...props }: ButtonProps) {
	const combinedClass = cn(buttonVariants({ variant, size, color, loading }), disabled && "opacity-50", className)

	const Comp = asChild ? Slot : "button"

	// Remove any invalid DOM props before spreading
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { iconOnly, ...validProps } = props as React.ComponentProps<"button"> & { iconOnly?: boolean }

	if (asChild) {
		if (loading) {
			console.warn("Button: loading prop is not supported when using asChild")
		}

		return (
			<Comp className={combinedClass} disabled={disabled} {...validProps}>
				{children}
			</Comp>
		)
	}

	return (
		<Comp type="button" className={combinedClass} disabled={disabled} {...validProps}>
			{loading && <Spinner variant="simple" size={size ? Number(size) : undefined} />}
			{children}
		</Comp>
	)
}
Button.displayName = "Button"

function ButtonGroup({ className, children, variant = "outline", size = "36", color = "neutral", ...props }: ButtonGroupProps) {
	const modifiedChildren = React.Children.map(children, (child, index) => {
		if (React.isValidElement(child)) {
			const isFirst = index === 0
			const isLast = index === React.Children.count(children) - 1

			const borderRadiusClass = isFirst ? "rounded-l-lg" : isLast ? "rounded-r-lg" : "rounded-none"

			if (React.isValidElement<ButtonProps>(child)) {
				return React.cloneElement(child, {
					variant,
					size,
					color,
					className: cn("rounded-none", borderRadiusClass, "-ml-[1px]", `${!isLast ? "border-r-0" : ""}`, child.props.className),
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

export const compactButtonVariants = cva(
	"inline-flex whitespace-nowrap items-center justify-center box-border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-bg disabled:pointer-events-none hover:cursor-pointer w-fit rounded-md",
	{
		variants: {
			variant: {
				strong: "",
				soft: "",
				outline: "",
				ghost: "",
			},
			size: {
				"20": "[&>svg]:!w-4 [&>svg]:!h-4 h-5 w-5 p-0.5",
				"24": "[&>svg]:!w-4 [&>svg]:!h-4 h-6 w-6 p-1",
			},
			color: {
				primary: "",
				info: "",
				success: "",
				error: "",
				warning: "",
				neutral: "",
			},
		},
		defaultVariants: {
			variant: "strong",
			size: "24",
			color: "primary",
		},
		compoundVariants: [
			// Strong variant + colors
			{
				variant: "strong",
				color: "primary",
				className: "bg-primary font-medium text-white hover:bg-primary-hover focus-visible:ring-primary focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "info",
				className: "bg-info font-medium text-white hover:bg-info-hover focus-visible:ring-info focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "success",
				className: "bg-success font-medium text-white hover:bg-success-hover focus-visible:ring-success focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "error",
				className: "bg-error font-medium text-white hover:bg-error-hover focus-visible:ring-error focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "warning",
				className: "bg-warning font-medium text-white hover:bg-warning-hover focus-visible:ring-warning focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "neutral",
				className: "bg-black-inverse font-medium text-white-inverse hover:bg-fg-secondary focus-visible:ring-black-inverse focus-visible:outline-none",
			},

			// Soft variant + colors
			{
				variant: "soft",
				color: "primary",
				className: "bg-primary-accent font-medium text-primary-text hover:bg-primary-focus focus-visible:ring-primary-focus focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "info",
				className: "bg-info-accent font-medium text-info-text hover:bg-info-focus focus-visible:ring-info-focus focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "success",
				className: "bg-success-accent font-medium text-success-text hover:bg-success-focus focus-visible:ring-success-focus focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "error",
				className: "bg-error-accent font-medium text-error-text hover:bg-error-focus focus-visible:ring-error-focus focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "warning",
				className: "bg-warning-accent font-medium text-warning-text hover:bg-warning-focus focus-visible:ring-warning-focus focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "neutral",
				className: "bg-fill2 font-medium text-fg-secondary hover:bg-fill3 focus-visible:bg-bg focus-visible:outline-none focus-visible:ring-border",
			},

			// Outline variant + colors
			{
				variant: "outline",
				color: "primary",
				className: "bg-transparent font-medium border border-primary-hover text-primary-text hover:bg-primary-accent focus-visible:ring-primary-hover",
			},
			{
				variant: "outline",
				color: "info",
				className: "bg-transparent font-medium border border-info-hover text-info-text hover:bg-info-accent focus-visible:ring-info-hover",
			},
			{
				variant: "outline",
				color: "success",
				className: "bg-transparent font-medium border border-success-hover text-success-text hover:bg-success-accent focus-visible:ring-success-hover",
			},
			{
				variant: "outline",
				color: "error",
				className: "bg-transparent font-medium border border-error-hover text-error-text hover:bg-error-accent focus-visible:ring-error-hover",
			},
			{
				variant: "outline",
				color: "warning",
				className: "bg-transparent font-medium border border-warning-hover text-warning-text hover:bg-warning-accent focus-visible:ring-warning-hover",
			},
			{
				variant: "outline",
				color: "neutral",
				className: "bg-elevation-level1 font-medium text-fg-secondary border border-border hover:bg-fill2 focus-visible:ring-border dark:hover:bg-fill3",
			},

			// Ghost variant + colors
			{
				variant: "ghost",
				color: "primary",
				className: "bg-transparent text-primary-text font-medium hover:bg-primary-focus focus-visible:outline-none focus-visible:ring-primary-focus",
			},
			{
				variant: "ghost",
				color: "info",
				className: "bg-transparent text-info-text font-medium hover:bg-info-focus focus-visible:outline-none focus-visible:ring-info-focus",
			},
			{
				variant: "ghost",
				color: "success",
				className: "bg-transparent text-success-text font-medium hover:bg-success-focus focus-visible:outline-none focus-visible:ring-success-focus",
			},
			{
				variant: "ghost",
				color: "error",
				className: "bg-transparent text-error-text font-medium hover:bg-error-focus focus-visible:outline-none focus-visible:ring-error-focus",
			},
			{
				variant: "ghost",
				color: "warning",
				className: "bg-transparent text-warning-text font-medium hover:bg-warning-focus focus-visible:outline-none focus-visible:ring-warning-focus",
			},
			{
				variant: "ghost",
				color: "neutral",
				className: "bg-transparent text-fg-secondary font-medium hover:bg-fill2 focus-visible:outline-none focus-visible:ring-border",
			},
		],
	}
)

function CompactButton({ loading = false, variant = "strong", size = "24", color = "primary", className, children, disabled, asChild = false, ...props }: CompactButtonProps) {
	const combinedClass = cn(compactButtonVariants({ variant, size, color }), disabled && "opacity-50", className)

	const Comp = asChild ? Slot : "button"

	return (
		<Comp className={combinedClass} disabled={disabled} {...props}>
			{loading ? <Spinner variant="simple" size={Number(size)} /> : children}
		</Comp>
	)
}

CompactButton.displayName = "CompactButton"

// Icon button size variants - only handles sizing
export const iconButtonSizeVariants = cva("", {
	variants: {
		size: {
			"28": "[&>svg]:size-4 rounded-md size-7 p-1.5",
			"32": "[&>svg]:size-4.5 rounded-md size-8 p-1.75",
			"36": "[&>svg]:size-5 rounded-lg size-9 p-2",
			"40": "[&>svg]:size-5 rounded-lg size-10 p-2.5",
			"44": "[&>svg]:size-5 rounded-[10px] size-11 p-3",
			"48": "[&>svg]:size-6 rounded-[10px] size-12 p-3",
		},
		variant: {
			outline: "",
			default: "",
		},
	},
	compoundVariants: [
		// Adjusted padding for outline variant (accounting for border)
		{ variant: "outline", size: "28", className: "p-1.25" },
		{ variant: "outline", size: "32", className: "p-1.5" },
		{ variant: "outline", size: "36", className: "p-1.75" },
		{ variant: "outline", size: "40", className: "p-2.25" },
		{ variant: "outline", size: "44", className: "p-2.75" },
		{ variant: "outline", size: "48", className: "p-2.75" },
	],
})

function IconButton({ loading = false, variant = "strong", size = "36", color = "primary", className, children, disabled, asChild = false, ...props }: IconButtonProps) {
	const iconButtonClass = cn(
		buttonVariants({ variant, size: "36", color })
			.split(" ")
			.filter((cls) => !cls.includes("rounded") && !cls.includes("h-") && !cls.includes("px-") && !cls.includes("py-") && !cls.includes("gap-"))
			.join(" "),

		iconButtonSizeVariants({
			size,
			variant: variant === "outline" ? "outline" : "default",
		}),
		disabled && "opacity-50",
		"flex items-center justify-center",
		className
	)

	const Comp = asChild ? Slot : "button"

	return (
		<Comp type="button" className={iconButtonClass} disabled={disabled} {...props}>
			{loading ? <Spinner variant="simple" size={size ? Number(size) : undefined} /> : children}
		</Comp>
	)
}

IconButton.displayName = "IconButton"

export { Button, ButtonGroup, CompactButton, IconButton }
