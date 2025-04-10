import React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

type ButtonProps = VariantProps<typeof buttonVariants> &
	React.ButtonHTMLAttributes<HTMLButtonElement> & {
		className?: string
		children: React.ReactNode
		isIcon?: boolean
	}

type ButtonGroupProps = React.HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode
	variant?: ButtonProps["variant"]
	size?: ButtonProps["size"]
	rounded?: ButtonProps["rounded"]
}

const buttonVariants = cva("inline-flex items-center justify-center box-border", {
	variants: {
		variant: {
			strong: "bg-primary font-semibold text-white hover:bg-primary-500 active:bg-primary-700",
			soft: "bg-primary/10 font-medium text-primary hover:bg-primary/15 active:bg-primary/20",
			outline: "bg-bg1 font-medium border border-primary text-primary hover:bg-primary/5 active:bg-primary/10",
			ghost: "bg-transparent text-primary font-medium hover:bg-primary/10 active:bg-primary/20",
			"neutral-soft": "bg-bg0 font-medium hover:bg-bg2 active:bg-bg3",
			"neutral-outline": "bg-bg1 font-medium border drop-shadow-xs hover:border-stroke-decorative active:bg-bg0 active:border-stroke-decorative",
		},
		rounded: {
			square: "rounded-xs",
			rounded: "rounded-md",
			full: "rounded-full",
		},
		size: {
			"32": "[&>svg]:size-5 text-sm", // 32px (formerly xs)
			"36": "[&>svg]:size-5 text-sm", // 36px (formerly sm)
			"40": "[&>svg]:size-5 text-sm", // 40px (formerly base)
			"44": "[&>svg]:size-6 text-base", // 44px (formerly lg)
			"48": "[&>svg]:size-6 text-base", // 48px (formerly xl)
			"56": "[&>svg]:size-6 text-base", // 56px (formerly 2xl)
		},
		isIcon: {
			true: "",
			false: "",
		},
	},
	defaultVariants: {
		variant: "strong",
		size: "40",
		rounded: "rounded",
		isIcon: false,
	},
	compoundVariants: [
		{ isIcon: false, size: "32", className: "gap-1.5 h-8 px-2.5" }, // 32px
		{ isIcon: false, size: "36", className: "gap-1.5 h-9 px-3" }, // 36px
		{ isIcon: false, size: "40", className: "gap-1.5 h-10 px-3.5" }, // 40px
		{ isIcon: false, size: "44", className: "gap-2 h-11 px-4" }, // 44px
		{ isIcon: false, size: "48", className: "gap-2 h-12 px-4.5" }, // 48px
		{ isIcon: false, size: "56", className: "gap-2 h-14 px-5" }, // 56px

		{ isIcon: true, size: "32", className: "px-1.5 h-8 gap-1.5" }, // 32px
		{ isIcon: true, size: "36", className: "px-2 h-9 gap-1.5" }, // 36px
		{ isIcon: true, size: "40", className: "px-2.5 h-10 gap-1.5" }, // 40px
		{ isIcon: true, size: "44", className: "px-2.5 h-11 gap-2" }, // 44px
		{ isIcon: true, size: "48", className: "px-3 h-12 gap-2" }, // 48px
		{ isIcon: true, size: "56", className: "px-4 h-14 gap-2" }, // 56px
	],
})

function Button({ variant = "strong", size = "40", rounded = "rounded", isIcon = false, className, children, ...props }: ButtonProps) {
	return (
		<button className={cn(buttonVariants({ variant, size, rounded, isIcon }), className)} {...props}>
			{children}
		</button>
	)
}
Button.displayName = "Button"

function ButtonGroup({ className, children, variant = "outline", size = "40", rounded = "rounded", ...props }: ButtonGroupProps) {
	const modifiedChildren = React.Children.map(children, (child, index) => {
		if (React.isValidElement(child)) {
			const isFirst = index === 0
			const isLast = index === React.Children.count(children) - 1
			const borderRightClass = variant === "outline" || variant === "neutral-outline" ? "border-r" : ""

			if (React.isValidElement<ButtonProps>(child)) {
				return React.cloneElement(child, {
					variant,
					size,
					className: cn(
						child.props.className,
						"relative focus:z-10",
						borderRightClass,
						"rounded-none",
						isFirst && rounded === "rounded" && "rounded-l-md",
						isFirst && rounded === "square" && "rounded-l-xs",
						isFirst && rounded === "full" && "rounded-l-full",
						isLast && rounded === "rounded" && "rounded-r-md",
						isLast && rounded === "square" && "rounded-r-xs",
						isLast && rounded === "full" && "rounded-r-full",
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
