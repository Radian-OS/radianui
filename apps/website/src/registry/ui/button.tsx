"use client"

import React from "react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Spinner } from "./spinner"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

type ButtonProps = VariantProps<typeof buttonVariants> &
	React.ComponentProps<"button"> & {
		className?: string
		children: React.ReactNode
		color?: "primary" | "info" | "success" | "error" | "warning" | "neutral"
		start?: React.ReactNode
		end?: React.ReactNode
		loading?: boolean
		asChild?: boolean
		innerSpanClassName?: string
	}

type ButtonGroupProps = React.HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode
	variant?: ButtonProps["variant"]
	size?: ButtonProps["size"]
	color?: ButtonProps["color"]
}

type CompactButtonProps = {
	loading?: boolean
	variant?: "strong" | "soft" | "outline" | "ghost"
	size?: "20" | "24"
	color?: "primary" | "info" | "success" | "error" | "warning" | "neutral"
	className?: string
	children: React.ReactNode
	disabled?: boolean
	asChild?: boolean
} & React.ComponentProps<"button">

type LinkButtonProps = {
	loading?: boolean
	size?: "14" | "16"
	href: string
	color?: "primary" | "info" | "success" | "error" | "warning" | "neutral"
	className?: string
	children: React.ReactNode
	disabled?: boolean
	target?: string
	rel?: string
	start?: React.ReactNode
	end?: React.ReactNode
}

type IconButtonProps = VariantProps<typeof buttonVariants> &
	Omit<React.ComponentProps<"button">, "color"> & {
		className?: string
		children: React.ReactNode
		color?: "primary" | "info" | "success" | "error" | "warning" | "neutral"
		loading?: boolean
		asChild?: boolean
		tooltip?: string
		iconOnly?: boolean
	}

export const buttonVariants = cva(
	"inline-flex whitespace-nowrap items-center justify-center box-border transition-colors duration-200 transform focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none hover:cursor-pointer w-fit",
	{
		variants: {
			variant: {
				strong: "",
				soft: "",
				outline: "",
				ghost: "",
			},
			size: {
				"28": "[&>svg]:size-4 text-[13px] leading-4.5 px-1 rounded-md",
				"32": "[&>svg]:size-4.5 text-sm px-1 rounded-md",
				"36": "[&>svg]:size-5 text-sm px-1 rounded-lg",
				"40": "[&>svg]:size-5 text-sm px-1 rounded-lg",
				"44": "[&>svg]:size-5 text-base px-1 rounded-lg",
				"48": "[&>svg]:size-5 text-base px-1 rounded-lg",
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
				neutral: "",
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
			{ iconOnly: false, size: "28", className: "gap-0.5 h-7 px-2 py-1.5" },
			{ iconOnly: false, size: "32", className: "gap-0.5 h-8 px-2 py-1.5" },
			{ iconOnly: false, size: "36", className: "gap-1 h-9 px-2.5 py-2" },
			{ iconOnly: false, size: "40", className: "gap-1 h-10 px-3 py-2.5" },
			{ iconOnly: false, size: "44", className: "gap-1 h-11 px-3 py-2.5" },
			{ iconOnly: false, size: "48", className: "gap-1 h-12 px-3.5 py-3" },

			{ iconOnly: true, size: "28", className: "p-1.5 h-7 gap-1" },
			{ iconOnly: true, size: "32", className: "p-1.75 h-8 gap-1" },
			{ iconOnly: true, size: "36", className: "p-2 h-9 gap-1" },
			{ iconOnly: true, size: "40", className: "p-2.5 h-10 gap-1" },
			{ iconOnly: true, size: "44", className: "p-3 h-11 gap-1" },
			{ iconOnly: true, size: "48", className: "p-3.5 h-12 gap-1" },

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
				className: "bg-black-inverse font-medium text-white-inverse hover:bg-fg focus-visible:ring-black-inverse focus-visible:outline-none",
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
				className: "bg-fill2 font-medium text-fg-secondary hover:bg-fill1-alpha focus-visible:bg-bg focus-visible:outline-none focus-visible:ring-border",
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
				className:
					"bg-elevation-level1 overflow-hidden font-medium text-fg-secondary border border-border  hover:bg-fill1-alpha focus-visible:ring-border relative before:absolute before:inset-0 hover:before:bg-fill2-alpha",
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

			// Neutral variants
		],
	}
)

function Button({
	loading = false,
	variant = "strong",
	size = "36",
	color = "primary",
	innerSpanClassName,
	className,
	children,
	disabled,
	start,
	end,
	asChild = false,
	// Extract iconOnly from props to prevent it from reaching DOM
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	iconOnly: _iconOnly,
	...props
}: ButtonProps) {
	const combinedClass = cn(buttonVariants({ variant, size, color, iconOnly: false }), disabled && "opacity-50", className)

	const Comp = asChild ? Slot : "button"

	if (asChild) {
		if (start || end || loading) {
			console.warn("Button: start, end, and loading props are not supported when using asChild")
		}

		return (
			<Comp className={combinedClass} disabled={disabled} {...props}>
				{children}
			</Comp>
		)
	}

	return (
		<Comp type="button" className={combinedClass} disabled={disabled} {...props}>
			{start}
			{loading ? <Spinner size={size ? Number(size) : undefined} /> : null}
			<span className={cn(innerSpanClassName, "px-0.5")}>{children}</span>
			{end}
		</Comp>
	)
}
Button.displayName = "Button"

function ButtonGroup({ className, children, variant = "outline", size = "36", color = "primary", ...props }: ButtonGroupProps) {
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

function CompactButton({ loading = false, variant = "strong", size = "24", color = "primary", className, children, disabled, asChild = false, ...props }: CompactButtonProps) {
	const sizeStyles = size === "20" ? "[&>svg]:!w-4 [&>svg]:!h-4 h-5 w-5 p-0.5 rounded-sm" : "[&>svg]:!w-4 [&>svg]:!h-4 h-6 w-6 p-1 rounded-md"

	const combinedClass = cn(
		"inline-flex whitespace-nowrap items-center justify-center box-border transition-colors duration-200 transform focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-bg disabled:pointer-events-none hover:cursor-pointer w-fit",
		sizeStyles,
		buttonVariants({ variant, size: "36", iconOnly: false, color })
			.split(" ")
			.filter(
				(cls) =>
					!cls.includes("rounded") &&
					!cls.includes("h-") &&
					!cls.includes("w-") &&
					!cls.includes("px-") &&
					!cls.includes("gap-") &&
					!cls.includes("[&>svg]") &&
					!(
						cls.includes("text-") &&
						!cls.includes("text-fg-") &&
						!cls.includes("text-primary") &&
						!cls.includes("text-info") &&
						!cls.includes("text-success") &&
						!cls.includes("text-error") &&
						!cls.includes("text-warning") &&
						!cls.includes("text-static-")
					)
			)
			.join(" "),
		disabled && "opacity-50",
		className
	)

	const Comp = asChild ? Slot : "button"

	if (asChild) {
		if (loading) {
			throw new Error("CompactButton: loading prop is not supported when using asChild")
		}

		return (
			<Comp className={combinedClass} disabled={disabled} {...props}>
				{loading ? <Spinner variant="simple" size={Number(size)} /> : children}
			</Comp>
		)
	}

	return (
		<Comp className={combinedClass} disabled={disabled} {...props}>
			{loading ? <Spinner variant="simple" size={16} /> : children}
		</Comp>
	)
}
CompactButton.displayName = "CompactButton"

const linkButtonVariants = cva(
	"inline-flex gap-1 whitespace-nowrap items-center justify-center box-border transition-colors duration-200 transform focus-visible:ring-2 disabled:pointer-events-none hover:cursor-pointer w-fit hover:underline",
	{
		variants: {
			color: {
				primary: "text-primary font-medium focus-visible:ring-primary focus-visible:outline-none",
				info: "text-info font-medium focus-visible:ring-info focus-visible:outline-none",
				success: "text-success font-medium focus-visible:ring-success focus-visible:outline-none",
				error: "text-error font-medium focus-visible:ring-error focus-visible:outline-none",
				warning: "text-warning font-medium focus-visible:ring-warning focus-visible:outline-none",
				neutral: "text-black-inverse font-medium focus-visible:ring-black-inverse focus-visible:outline-none",
			},
			size: {
				"14": "text-sm focus-visible:rounded-sm",
				"16": "text-base  focus-visible:rounded-md",
			},
		},
		defaultVariants: {
			color: "primary",
		},
	}
)

function LinkButton({ size = "14", href, color = "primary", start, end, className, children, disabled, target, rel, loading, ...props }: LinkButtonProps) {
	const combinedClass = cn(linkButtonVariants({ color, size }), disabled && "opacity-50 pointer-events-none", className)

	if (disabled) {
		return (
			<span className={combinedClass} {...props}>
				{start}
				{loading ? <Spinner variant="simple" size={size === "14" ? 14 : 16} /> : null}
				{children}
				{end}
			</span>
		)
	}

	return (
		<Link href={href} className={combinedClass} target={target} rel={rel} {...props}>
			{start}
			{loading ? <Spinner variant="simple" size={size === "14" ? 14 : 16} /> : null}
			{children}
			{end}
		</Link>
	)
}

LinkButton.displayName = "LinkButton"

function IconButton({
	loading = false,
	variant = "strong",
	size = "36",
	iconOnly = true,
	color = "primary",
	className,
	children,
	disabled,
	asChild = false,
	tooltip,
	// Extract these props to prevent them from reaching DOM
	...props
}: IconButtonProps) {
	const combinedClass = cn(buttonVariants({ variant, size, iconOnly, color }), disabled && "opacity-50", className)

	const Comp = asChild ? Slot : "button"

	if (asChild) {
		return tooltip ? (
			<Tooltip>
				<TooltipTrigger asChild>
					<Comp className={combinedClass} disabled={disabled} {...props}>
						{children}
					</Comp>
				</TooltipTrigger>
				<TooltipContent>{tooltip}</TooltipContent>
			</Tooltip>
		) : (
			<Comp className={combinedClass} disabled={disabled} {...props}>
				{children}
			</Comp>
		)
	}

	return tooltip ? (
		<Tooltip>
			<TooltipTrigger asChild>
				<Comp type="button" className={combinedClass} disabled={disabled} {...props}>
					{loading ? <Spinner variant="simple" size={size ? Number(size) : undefined} /> : children}
				</Comp>
			</TooltipTrigger>
			<TooltipContent>{tooltip}</TooltipContent>
		</Tooltip>
	) : (
		<Comp type="button" className={combinedClass} disabled={disabled} {...props}>
			{loading ? <Spinner variant="simple" size={size ? Number(size) : undefined} /> : children}
		</Comp>
	)
}

IconButton.displayName = "IconButton"

export { Button, ButtonGroup, CompactButton, LinkButton, IconButton }
