"use client"

import React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

type ButtonProps = VariantProps<typeof buttonVariants> &
	React.ButtonHTMLAttributes<HTMLButtonElement> & {
		className?: string
		children: React.ReactNode
		isIcon?: boolean
		color?: "primary" | "information" | "success" | "error" | "warning"
	}

type ButtonGroupProps = React.HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode
	variant?: ButtonProps["variant"]
	size?: ButtonProps["size"]
	rounded?: "square" | "rounded" | "full" // Keep rounded for ButtonGroup only
	color?: ButtonProps["color"]
}

const buttonVariants = cva("inline-flex items-center justify-center box-border transition duration-200 transform rounded-lg", {
	variants: {
		variant: {
			strong: "",
			soft: "",
			outline: "",
			ghost: "",
			"neutral-soft": "bg-bg-base font-medium hover:bg-fill-level1 active:bg-bg-level0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border disabled:bg-fill-level1/50 disabled:text-text-secondary/50 disabled:cursor-not-allowed disabled:drop-shadow-sm",
			"neutral-outline": "bg-bg-base outline-transparent font-medium border drop-shadow-xs hover:border-stroke-decorative hover:bg-fill-level2  active:bg-bg-base active:border-stroke-decorative focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border disabled:border-border/50 disabled:bg-bg-base disabled:text-text-secondary/50 disabled:cursor-not-allowed",
		},
		size: {
			"28": "[&>svg]:size-4 text-xs", // 28px
			"32": "[&>svg]:size-5 text-sm", // 32px (formerly xs)
			"36": "[&>svg]:size-5 text-sm", // 36px (formerly sm)
			"40": "[&>svg]:size-5 text-sm", // 40px (formerly base)
			"44": "[&>svg]:size-6 text-base", // 44px (formerly lg)
			"48": "[&>svg]:size-6 text-base", // 48px (formerly xl)
		},
		isIcon: {
			true: "",
			false: "",
		},
		color: {
			primary: "",
			information: "",
			success: "",
			error: "",
			warning: "",
		}
	},
	defaultVariants: {
		variant: "strong",
		size: "36",
		isIcon: false,
		color: "primary",
	},
	compoundVariants: [
		// Size variants
		{ isIcon: false, size: "28", className: "gap-1.5 h-7 px-2" }, // 28px
		{ isIcon: false, size: "32", className: "gap-1.5 h-8 px-2.5" }, // 32px
		{ isIcon: false, size: "36", className: "gap-1.5 h-9 px-3" }, // 36px
		{ isIcon: false, size: "40", className: "gap-1.5 h-10 px-3.5" }, // 40px
		{ isIcon: false, size: "44", className: "gap-2 h-11 px-4" }, // 44px
		{ isIcon: false, size: "48", className: "gap-2 h-12 px-4.5" }, // 48px

		{ isIcon: true, size: "28", className: "px-1.5 h-7 gap-1.5" }, // 28px for icons
		{ isIcon: true, size: "32", className: "px-1.5 h-8 gap-1.5" }, // 32px
		{ isIcon: true, size: "36", className: "px-2 h-9 gap-1.5" }, // 36px
		{ isIcon: true, size: "40", className: "px-2.5 h-10 gap-1.5" }, // 40px
		{ isIcon: true, size: "44", className: "px-2.5 h-11 gap-2" }, // 44px
		{ isIcon: true, size: "48", className: "px-3 h-12 gap-2" }, // 48px

		// Strong variant + colors
		{ variant: "strong", color: "primary", className: "bg-primary font-semibold text-static-white hover:bg-primary-hover active:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:bg-bg-level0 disabled:bg-primary/50 disabled:cursor-not-allowed disabled:text-static-white/50" },
		{ variant: "strong", color: "information", className: "bg-information font-semibold text-static-white hover:bg-information-hover active:bg-information focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-information disabled:bg-bg-level0 disabled:bg-information/50 disabled:cursor-not-allowed disabled:text-static-white/50" },
		{ variant: "strong", color: "success", className: "bg-success font-semibold text-static-white hover:bg-success-hover active:bg-success focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success disabled:bg-bg-level0 disabled:bg-success/50 disabled:cursor-not-allowed disabled:text-static-white/50" },
		{ variant: "strong", color: "error", className: "bg-error font-semibold text-static-white hover:bg-error-hover active:bg-error focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error disabled:bg-bg-level0 disabled:bg-error/50 disabled:cursor-not-allowed disabled:text-static-white/50" },
		{ variant: "strong", color: "warning", className: "bg-warning font-semibold text-static-white hover:bg-warning-hover active:bg-warning focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning disabled:bg-bg-level0 disabled:bg-warning/50 disabled:cursor-not-allowed disabled:text-static-white/50" },

		// Soft variant + colors
		{ variant: "soft", color: "primary", className: "bg-primary-accent font-medium text-primary hover:bg-primary/15 active:bg-primary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-accent disabled:bg-primary-accent/50 disabled:cursor-not-allowed disabled:text-primary/50" },
		{ variant: "soft", color: "information", className: "bg-information-accent font-medium text-information hover:bg-information/15 active:bg-information/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-information-accent disabled:bg-information-accent/50 disabled:cursor-not-allowed disabled:text-information/50" },
		{ variant: "soft", color: "success", className: "bg-success-accent font-medium text-success hover:bg-success/15 active:bg-success/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success-accent disabled:bg-success-accent/50 disabled:cursor-not-allowed disabled:text-success/50" },
		{ variant: "soft", color: "error", className: "bg-error-accent font-medium text-error hover:bg-error/15 active:bg-error/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error-accent disabled:bg-error-accent/50 disabled:cursor-not-allowed disabled:text-error/50" },
		{ variant: "soft", color: "warning", className: "bg-warning-accent font-medium text-warning hover:bg-warning/15 active:bg-warning/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning-accent disabled:bg-warning-accent/50 disabled:cursor-not-allowed disabled:text-warning/50" },

		// Outline variant + colors
		{ variant: "outline", color: "primary", className: "bg-bg-base font-medium border border-primary-stroke text-primary hover:bg-primary-accent active:bg-primary-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-stroke disabled:bg-bg-base disabled:border-primary-stroke disabled:text-primary/50 disabled:border-primary-stroke/50 disabled:cursor-not-allowed" },
		{ variant: "outline", color: "information", className: "bg-bg-base font-medium border border-information-stroke text-information hover:bg-information-accent active:bg-information-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-information-stroke disabled:bg-bg-base disabled:border-information-stroke disabled:text-information/50 disabled:border-information-stroke/50 disabled:cursor-not-allowed" },
		{ variant: "outline", color: "success", className: "bg-bg-base font-medium border border-success-stroke text-success hover:bg-success-accent active:bg-success-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success-stroke disabled:bg-bg-base disabled:border-success-stroke disabled:text-success/50 disabled:border-success-stroke/50 disabled:cursor-not-allowed" },
		{ variant: "outline", color: "error", className: "bg-bg-base font-medium border border-error-stroke text-error hover:bg-error-accent active:bg-error-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error-stroke disabled:bg-bg-base disabled:border-error-stroke disabled:text-error/50 disabled:border-error-stroke/50 disabled:cursor-not-allowed" },
		{ variant: "outline", color: "warning", className: "bg-bg-base font-medium border border-warning-stroke text-warning hover:bg-warning-accent active:bg-warning-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning-stroke disabled:bg-bg-base disabled:border-warning-stroke disabled:text-warning/50 disabled:border-warning-stroke/50 disabled:cursor-not-allowed" },

		// Ghost variant + colors
		{ variant: "ghost", color: "primary", className: "bg-transparent text-primary font-medium hover:bg-primary/10 active:bg-primary/20 disabled:text-primary/50 disabled:cursor-not-allowed disabled:bg-primary/10" },
		{ variant: "ghost", color: "information", className: "bg-transparent text-information font-medium hover:bg-information/10 active:bg-information/20 disabled:text-information/50 disabled:cursor-not-allowed disabled:bg-information/10" },
		{ variant: "ghost", color: "success", className: "bg-transparent text-success font-medium hover:bg-success/10 active:bg-success/20 disabled:text-success/50 disabled:cursor-not-allowed disabled:bg-success/10" },
		{ variant: "ghost", color: "error", className: "bg-transparent text-error font-medium hover:bg-error/10 active:bg-error/20 disabled:text-error/50 disabled:cursor-not-allowed disabled:bg-error/10" },
		{ variant: "ghost", color: "warning", className: "bg-transparent text-warning font-medium hover:bg-warning/10 active:bg-warning/20 disabled:text-warning/50 disabled:cursor-not-allowed disabled:bg-warning/10" },
	],
})

function Button({
	variant = "strong",
	size = "36",
	isIcon = false,
	color = "primary",
	className,
	children,
	...props
}: ButtonProps) {
	return (
		<button className={cn(buttonVariants({ variant, size, isIcon, color }), className)} {...props}>
			{children}
		</button>
	)
}
Button.displayName = "Button"

function ButtonGroup({
	className,
	children,
	variant = "outline",
	size = "36",
	rounded = "rounded", // Keep rounded prop for ButtonGroup
	color = "primary",
	...props
}: ButtonGroupProps) {
	const modifiedChildren = React.Children.map(children, (child, index) => {
		if (React.isValidElement(child)) {
			const isFirst = index === 0
			const isLast = index === React.Children.count(children) - 1
			const borderRightClass = variant === "outline" || variant === "neutral-outline" ? "border-r" : ""

			// Define rounded corners based on the ButtonGroup's rounded prop
			let firstButtonRounding = ""
			let lastButtonRounding = ""

			if (rounded === "rounded") {
				firstButtonRounding = "rounded-l-lg"
				lastButtonRounding = "rounded-r-lg"
			} else if (rounded === "square") {
				firstButtonRounding = "rounded-l-xs"
				lastButtonRounding = "rounded-r-xs"
			} else if (rounded === "full") {
				firstButtonRounding = "rounded-l-full"
				lastButtonRounding = "rounded-r-full"
			}

			if (React.isValidElement<ButtonProps>(child)) {
				return React.cloneElement(child, {
					variant,
					size,
					color,
					className: cn(
						child.props.className,
						"relative focus:z-10",
						borderRightClass,
						"rounded-none", // Remove default rounding
						isFirst && firstButtonRounding,
						isLast && lastButtonRounding,
						!isFirst && "-ml-px"
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