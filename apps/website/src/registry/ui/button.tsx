import React from "react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Spinner } from "@/registry/ui/spinner"

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
	variant?:
		| "strong"
		| "soft"
		| "outline"
		| "ghost"
		| "glossy"
		| "smooth"
		| "glossy-inverted"
		| "smooth-inverted"
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
				glossy: "",
				"glossy-inverted": "",
				smooth: "",
				"smooth-inverted": "",
			},
			size: {
				"28": "[&>svg]:size-4 text-[13px] leading-4.5 px-1 cn-btn-size-28",
				"32": "[&>svg]:size-4.5 text-sm px-1 cn-btn-size-32",
				"36": "[&>svg]:size-5 text-sm px-1 cn-btn-size-36",
				"40": "[&>svg]:size-5 text-sm px-1 cn-btn-size-40",
				"44": "[&>svg]:size-5 text-base px-1 cn-btn-size-44",
				"48": "[&>svg]:size-6 text-base px-1 cn-btn-size-48",
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
			// Size + spacing
			{ size: "28", className: "gap-1 h-7 px-2 py-1.5" },
			{ size: "32", className: "gap-1.5 h-8 px-2 py-1.5" },
			{ size: "36", className: "gap-2 h-9 px-3 py-2" },
			{ size: "40", className: "gap-2 h-10 px-3 py-2.5" },
			{ size: "44", className: "gap-2 h-11 px-3 py-2.5" },
			{ size: "48", className: "gap-2 h-12 px-4 py-3" },

			// Strong
			{
				variant: "strong",
				color: "primary",
				className: "cn-btn-strong-primary",
			},
			{ variant: "strong", color: "info", className: "cn-btn-strong-info" },
			{
				variant: "strong",
				color: "success",
				className: "cn-btn-strong-success",
			},
			{ variant: "strong", color: "error", className: "cn-btn-strong-error" },
			{
				variant: "strong",
				color: "warning",
				className: "cn-btn-strong-warning",
			},
			{
				variant: "strong",
				color: "neutral",
				className: "cn-btn-strong-neutral",
			},

			// Soft
			{ variant: "soft", color: "primary", className: "cn-btn-soft-primary" },
			{ variant: "soft", color: "info", className: "cn-btn-soft-info" },
			{ variant: "soft", color: "success", className: "cn-btn-soft-success" },
			{ variant: "soft", color: "error", className: "cn-btn-soft-error" },
			{ variant: "soft", color: "warning", className: "cn-btn-soft-warning" },
			{ variant: "soft", color: "neutral", className: "cn-btn-soft-neutral" },

			// Outline
			{
				variant: "outline",
				color: "primary",
				className: "cn-btn-outline-primary",
			},
			{ variant: "outline", color: "info", className: "cn-btn-outline-info" },
			{
				variant: "outline",
				color: "success",
				className: "cn-btn-outline-success",
			},
			{ variant: "outline", color: "error", className: "cn-btn-outline-error" },
			{
				variant: "outline",
				color: "warning",
				className: "cn-btn-outline-warning",
			},
			{
				variant: "outline",
				color: "neutral",
				className: "cn-btn-outline-neutral",
			},

			// Ghost
			{ variant: "ghost", color: "primary", className: "cn-btn-ghost-primary" },
			{ variant: "ghost", color: "info", className: "cn-btn-ghost-info" },
			{ variant: "ghost", color: "success", className: "cn-btn-ghost-success" },
			{ variant: "ghost", color: "error", className: "cn-btn-ghost-error" },
			{ variant: "ghost", color: "warning", className: "cn-btn-ghost-warning" },
			{ variant: "ghost", color: "neutral", className: "cn-btn-ghost-neutral" },

			// Link
			{ variant: "link", color: "primary", className: "cn-btn-link-primary" },
			{ variant: "link", color: "info", className: "cn-btn-link-info" },
			{ variant: "link", color: "success", className: "cn-btn-link-success" },
			{ variant: "link", color: "error", className: "cn-btn-link-error" },
			{ variant: "link", color: "warning", className: "cn-btn-link-warning" },
			{ variant: "link", color: "neutral", className: "cn-btn-link-neutral" },

			// Glossy
			{
				variant: "glossy",
				color: "primary",
				className: "cn-btn-glossy-primary",
			},
			{ variant: "glossy", color: "info", className: "cn-btn-glossy-info" },
			{
				variant: "glossy",
				color: "success",
				className: "cn-btn-glossy-success",
			},
			{
				variant: "glossy",
				color: "warning",
				className: "cn-btn-glossy-warning",
			},
			{ variant: "glossy", color: "error", className: "cn-btn-glossy-error" },
			{
				variant: "glossy",
				color: "neutral",
				className: "cn-btn-glossy-neutral",
			},

			// Glossy-inverted
			{
				variant: "glossy-inverted",
				color: "primary",
				className: "cn-btn-glossy-inverted-primary",
			},
			{
				variant: "glossy-inverted",
				color: "info",
				className: "cn-btn-glossy-inverted-info",
			},
			{
				variant: "glossy-inverted",
				color: "success",
				className: "cn-btn-glossy-inverted-success",
			},
			{
				variant: "glossy-inverted",
				color: "warning",
				className: "cn-btn-glossy-inverted-warning",
			},
			{
				variant: "glossy-inverted",
				color: "error",
				className: "cn-btn-glossy-inverted-error",
			},
			{
				variant: "glossy-inverted",
				color: "neutral",
				className: "cn-btn-glossy-inverted-neutral",
			},

			// Smooth
			{
				variant: "smooth",
				color: "primary",
				className: "cn-btn-smooth-primary",
			},
			{ variant: "smooth", color: "info", className: "cn-btn-smooth-info" },
			{
				variant: "smooth",
				color: "success",
				className: "cn-btn-smooth-success",
			},
			{
				variant: "smooth",
				color: "warning",
				className: "cn-btn-smooth-warning",
			},
			{ variant: "smooth", color: "error", className: "cn-btn-smooth-error" },
			{
				variant: "smooth",
				color: "neutral",
				className: "cn-btn-smooth-neutral",
			},

			// Smooth-inverted
			{
				variant: "smooth-inverted",
				color: "primary",
				className: "cn-btn-smooth-inverted-primary",
			},
			{
				variant: "smooth-inverted",
				color: "info",
				className: "cn-btn-smooth-inverted-info",
			},
			{
				variant: "smooth-inverted",
				color: "success",
				className: "cn-btn-smooth-inverted-success",
			},
			{
				variant: "smooth-inverted",
				color: "warning",
				className: "cn-btn-smooth-inverted-warning",
			},
			{
				variant: "smooth-inverted",
				color: "error",
				className: "cn-btn-smooth-inverted-error",
			},
			{
				variant: "smooth-inverted",
				color: "neutral",
				className: "cn-btn-smooth-inverted-neutral",
			},

			// Link loading state
			{ variant: "link", loading: true, className: "hover:no-underline" },
		],
	}
)

function Button({
	loading = false,
	variant = "strong",
	size = "36",
	color = "primary",
	className,
	children,
	disabled,
	asChild = false,
	...props
}: ButtonProps) {
	const combinedClass = cn(
		buttonVariants({ variant, size, color, loading }),
		disabled && "opacity-50",
		className
	)

	const Comp = asChild ? Slot : "button"

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { iconOnly, ...validProps } =
		props as React.ComponentProps<"button"> & { iconOnly?: boolean }

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
		<Comp
			type="button"
			className={combinedClass}
			disabled={disabled}
			{...validProps}>
			{loading && (
				<Spinner variant="simple" size={size ? Number(size) : undefined} />
			)}
			{children}
		</Comp>
	)
}
Button.displayName = "Button"

function ButtonGroup({
	className,
	children,
	variant = "outline",
	size = "36",
	color = "neutral",
	...props
}: ButtonGroupProps) {
	const modifiedChildren = React.Children.map(children, (child, index) => {
		if (React.isValidElement(child)) {
			const isFirst = index === 0
			const isLast = index === React.Children.count(children) - 1

			const borderRadiusClass = isFirst
				? "rounded-l-control"
				: isLast
					? "rounded-r-control"
					: "rounded-none"

			if (React.isValidElement<ButtonProps>(child)) {
				return React.cloneElement(child, {
					variant,
					size,
					color,
					className: cn(
						"rounded-none",
						borderRadiusClass,
						"-ml-[1px]",
						`${!isLast ? "border-r-0" : ""}`,
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

export const compactButtonVariants = cva(
	"inline-flex whitespace-nowrap items-center justify-center box-border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-bg disabled:pointer-events-none hover:cursor-pointer w-fit cn-compact-btn",
	{
		variants: {
			variant: {
				strong: "",
				soft: "",
				outline: "",
				ghost: "",
				glossy: "",
				"glossy-inverted": "",
				smooth: "",
				"smooth-inverted": "",
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
			// Strong
			{
				variant: "strong",
				color: "primary",
				className: "cn-compact-btn-strong-primary",
			},
			{
				variant: "strong",
				color: "info",
				className: "cn-compact-btn-strong-info",
			},
			{
				variant: "strong",
				color: "success",
				className: "cn-compact-btn-strong-success",
			},
			{
				variant: "strong",
				color: "error",
				className: "cn-compact-btn-strong-error",
			},
			{
				variant: "strong",
				color: "warning",
				className: "cn-compact-btn-strong-warning",
			},
			{
				variant: "strong",
				color: "neutral",
				className: "cn-compact-btn-strong-neutral",
			},

			// Soft
			{
				variant: "soft",
				color: "primary",
				className: "cn-compact-btn-soft-primary",
			},
			{ variant: "soft", color: "info", className: "cn-compact-btn-soft-info" },
			{
				variant: "soft",
				color: "success",
				className: "cn-compact-btn-soft-success",
			},
			{
				variant: "soft",
				color: "error",
				className: "cn-compact-btn-soft-error",
			},
			{
				variant: "soft",
				color: "warning",
				className: "cn-compact-btn-soft-warning",
			},
			{
				variant: "soft",
				color: "neutral",
				className: "cn-compact-btn-soft-neutral",
			},

			// Outline
			{
				variant: "outline",
				color: "primary",
				className: "cn-compact-btn-outline-primary",
			},
			{
				variant: "outline",
				color: "info",
				className: "cn-compact-btn-outline-info",
			},
			{
				variant: "outline",
				color: "success",
				className: "cn-compact-btn-outline-success",
			},
			{
				variant: "outline",
				color: "error",
				className: "cn-compact-btn-outline-error",
			},
			{
				variant: "outline",
				color: "warning",
				className: "cn-compact-btn-outline-warning",
			},
			{
				variant: "outline",
				color: "neutral",
				className: "cn-compact-btn-outline-neutral",
			},

			// Ghost
			{
				variant: "ghost",
				color: "primary",
				className: "cn-compact-btn-ghost-primary",
			},
			{
				variant: "ghost",
				color: "info",
				className: "cn-compact-btn-ghost-info",
			},
			{
				variant: "ghost",
				color: "success",
				className: "cn-compact-btn-ghost-success",
			},
			{
				variant: "ghost",
				color: "error",
				className: "cn-compact-btn-ghost-error",
			},
			{
				variant: "ghost",
				color: "warning",
				className: "cn-compact-btn-ghost-warning",
			},
			{
				variant: "ghost",
				color: "neutral",
				className: "cn-compact-btn-ghost-neutral",
			},

			// Glossy
			{
				variant: "glossy",
				color: "primary",
				className: "cn-compact-btn-glossy-primary",
			},
			{
				variant: "glossy",
				color: "info",
				className: "cn-compact-btn-glossy-info",
			},
			{
				variant: "glossy",
				color: "success",
				className: "cn-compact-btn-glossy-success",
			},
			{
				variant: "glossy",
				color: "warning",
				className: "cn-compact-btn-glossy-warning",
			},
			{
				variant: "glossy",
				color: "error",
				className: "cn-compact-btn-glossy-error",
			},
			{
				variant: "glossy",
				color: "neutral",
				className: "cn-compact-btn-glossy-neutral",
			},

			// Glossy-inverted
			{
				variant: "glossy-inverted",
				color: "primary",
				className: "cn-compact-btn-glossy-inverted-primary",
			},
			{
				variant: "glossy-inverted",
				color: "info",
				className: "cn-compact-btn-glossy-inverted-info",
			},
			{
				variant: "glossy-inverted",
				color: "success",
				className: "cn-compact-btn-glossy-inverted-success",
			},
			{
				variant: "glossy-inverted",
				color: "warning",
				className: "cn-compact-btn-glossy-inverted-warning",
			},
			{
				variant: "glossy-inverted",
				color: "error",
				className: "cn-compact-btn-glossy-inverted-error",
			},
			{
				variant: "glossy-inverted",
				color: "neutral",
				className: "cn-compact-btn-glossy-inverted-neutral",
			},

			// Smooth
			{
				variant: "smooth",
				color: "primary",
				className: "cn-compact-btn-smooth-primary",
			},
			{
				variant: "smooth",
				color: "info",
				className: "cn-compact-btn-smooth-info",
			},
			{
				variant: "smooth",
				color: "success",
				className: "cn-compact-btn-smooth-success",
			},
			{
				variant: "smooth",
				color: "warning",
				className: "cn-compact-btn-smooth-warning",
			},
			{
				variant: "smooth",
				color: "error",
				className: "cn-compact-btn-smooth-error",
			},
			{
				variant: "smooth",
				color: "neutral",
				className: "cn-compact-btn-smooth-neutral",
			},

			// Smooth-inverted
			{
				variant: "smooth-inverted",
				color: "primary",
				className: "cn-compact-btn-smooth-inverted-primary",
			},
			{
				variant: "smooth-inverted",
				color: "info",
				className: "cn-compact-btn-smooth-inverted-info",
			},
			{
				variant: "smooth-inverted",
				color: "success",
				className: "cn-compact-btn-smooth-inverted-success",
			},
			{
				variant: "smooth-inverted",
				color: "warning",
				className: "cn-compact-btn-smooth-inverted-warning",
			},
			{
				variant: "smooth-inverted",
				color: "error",
				className: "cn-compact-btn-smooth-inverted-error",
			},
			{
				variant: "smooth-inverted",
				color: "neutral",
				className: "cn-compact-btn-smooth-inverted-neutral",
			},
		],
	}
)

function CompactButton({
	loading = false,
	variant = "strong",
	size = "24",
	color = "primary",
	className,
	children,
	disabled,
	asChild = false,
	...props
}: CompactButtonProps) {
	const combinedClass = cn(
		compactButtonVariants({ variant, size, color }),
		disabled && "opacity-50",
		className
	)

	const Comp = asChild ? Slot : "button"

	return (
		<Comp className={combinedClass} disabled={disabled} {...props}>
			{loading ? <Spinner variant="simple" size={Number(size)} /> : children}
		</Comp>
	)
}
CompactButton.displayName = "CompactButton"

export const iconButtonSizeVariants = cva("", {
	variants: {
		size: {
			"28": "[&>svg]:size-4 cn-icon-btn-size-28",
			"32": "[&>svg]:size-4.5 cn-icon-btn-size-32",
			"36": "[&>svg]:size-5 cn-icon-btn-size-36",
			"40": "[&>svg]:size-5 cn-icon-btn-size-40",
			"44": "[&>svg]:size-5 cn-icon-btn-size-44",
			"48": "[&>svg]:size-6 cn-icon-btn-size-48",
		},
		variant: {
			outline: "",
			default: "",
		},
	},
	compoundVariants: [
		{ variant: "outline", size: "28", className: "cn-icon-btn-outline-28" },
		{ variant: "outline", size: "32", className: "cn-icon-btn-outline-32" },
		{ variant: "outline", size: "36", className: "cn-icon-btn-outline-36" },
		{ variant: "outline", size: "40", className: "cn-icon-btn-outline-40" },
		{ variant: "outline", size: "44", className: "cn-icon-btn-outline-44" },
		{ variant: "outline", size: "48", className: "cn-icon-btn-outline-48" },
	],
})

function IconButton({
	loading = false,
	variant = "strong",
	size = "36",
	color = "primary",
	className,
	children,
	disabled,
	asChild = false,
	...props
}: IconButtonProps) {
	const iconButtonClass = cn(
		buttonVariants({ variant, size: "36", color })
			.split(" ")
			.filter(
				(cls) =>
					!cls.includes("rounded") &&
					!cls.includes("h-") &&
					!cls.includes("px-") &&
					!cls.includes("py-") &&
					!cls.includes("gap-")
			)
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
		<Comp
			type="button"
			className={iconButtonClass}
			disabled={disabled}
			{...props}>
			{loading ? (
				<Spinner variant="simple" size={size ? Number(size) : undefined} />
			) : (
				children
			)}
		</Comp>
	)
}
IconButton.displayName = "IconButton"

export { Button, ButtonGroup, CompactButton, IconButton }
