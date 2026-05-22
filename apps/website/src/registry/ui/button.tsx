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
				"28": "r-btn-size-28 [&>svg]:size-4 text-[13px] leading-4.5 px-1 r-btn-size-28 cn-btn-size-28",
				"32": "r-btn-size-32 [&>svg]:size-4.5 text-sm px-1 r-btn-size-32 cn-btn-size-32",
				"36": "r-btn-size-36 [&>svg]:size-5 text-sm px-1 r-btn-size-36 cn-btn-size-36",
				"40": "r-btn-size-40 [&>svg]:size-5 text-sm px-1 r-btn-size-40 cn-btn-size-40",
				"44": "r-btn-size-44 [&>svg]:size-5 text-base px-1 r-btn-size-44 cn-btn-size-44",
				"48": "r-btn-size-48 [&>svg]:size-6 text-base px-1 r-btn-size-48 cn-btn-size-48",
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
				className: "r-btn-strong-primary cn-btn-strong-primary",
			},
			{
				variant: "strong",
				color: "info",
				className: "r-btn-strong-info cn-btn-strong-info",
			},
			{
				variant: "strong",
				color: "success",
				className: "r-btn-strong-success cn-btn-strong-success",
			},
			{
				variant: "strong",
				color: "error",
				className: "r-btn-strong-error cn-btn-strong-error",
			},
			{
				variant: "strong",
				color: "warning",
				className: "r-btn-strong-warning cn-btn-strong-warning",
			},
			{
				variant: "strong",
				color: "neutral",
				className: "r-btn-strong-neutral cn-btn-strong-neutral",
			},

			// Soft
			{
				variant: "soft",
				color: "primary",
				className: "r-btn-soft-primary cn-btn-soft-primary",
			},
			{
				variant: "soft",
				color: "info",
				className: "r-btn-soft-info cn-btn-soft-info",
			},
			{
				variant: "soft",
				color: "success",
				className: "r-btn-soft-success cn-btn-soft-success",
			},
			{
				variant: "soft",
				color: "error",
				className: "r-btn-soft-error cn-btn-soft-error",
			},
			{
				variant: "soft",
				color: "warning",
				className: "r-btn-soft-warning cn-btn-soft-warning",
			},
			{
				variant: "soft",
				color: "neutral",
				className: "r-btn-soft-neutral cn-btn-soft-neutral",
			},

			// Outline
			{
				variant: "outline",
				color: "primary",
				className: "r-btn-outline-primary cn-btn-outline-primary",
			},
			{
				variant: "outline",
				color: "info",
				className: "r-btn-outline-info cn-btn-outline-info",
			},
			{
				variant: "outline",
				color: "success",
				className: "r-btn-outline-success cn-btn-outline-success",
			},
			{
				variant: "outline",
				color: "error",
				className: "r-btn-outline-error cn-btn-outline-error",
			},
			{
				variant: "outline",
				color: "warning",
				className: "r-btn-outline-warning cn-btn-outline-warning",
			},
			{
				variant: "outline",
				color: "neutral",
				className: "r-btn-outline-neutral cn-btn-outline-neutral",
			},

			// Ghost
			{
				variant: "ghost",
				color: "primary",
				className: "r-btn-ghost-primary cn-btn-ghost-primary",
			},
			{
				variant: "ghost",
				color: "info",
				className: "r-btn-ghost-info cn-btn-ghost-info",
			},
			{
				variant: "ghost",
				color: "success",
				className: "r-btn-ghost-success cn-btn-ghost-success",
			},
			{
				variant: "ghost",
				color: "error",
				className: "r-btn-ghost-error cn-btn-ghost-error",
			},
			{
				variant: "ghost",
				color: "warning",
				className: "r-btn-ghost-warning cn-btn-ghost-warning",
			},
			{
				variant: "ghost",
				color: "neutral",
				className: "r-btn-ghost-neutral cn-btn-ghost-neutral",
			},

			// Link
			{
				variant: "link",
				color: "primary",
				className: "r-btn-link-primary cn-btn-link-primary",
			},
			{
				variant: "link",
				color: "info",
				className: "r-btn-link-info cn-btn-link-info",
			},
			{
				variant: "link",
				color: "success",
				className: "r-btn-link-success cn-btn-link-success",
			},
			{
				variant: "link",
				color: "error",
				className: "r-btn-link-error cn-btn-link-error",
			},
			{
				variant: "link",
				color: "warning",
				className: "r-btn-link-warning cn-btn-link-warning",
			},
			{
				variant: "link",
				color: "neutral",
				className: "r-btn-link-neutral cn-btn-link-neutral",
			},

			// Glossy
			{
				variant: "glossy",
				color: "primary",
				className: "r-btn-glossy-primary cn-btn-glossy-primary",
			},
			{
				variant: "glossy",
				color: "info",
				className: "r-btn-glossy-info cn-btn-glossy-info",
			},
			{
				variant: "glossy",
				color: "success",
				className: "r-btn-glossy-success cn-btn-glossy-success",
			},
			{
				variant: "glossy",
				color: "warning",
				className: "r-btn-glossy-warning cn-btn-glossy-warning",
			},
			{
				variant: "glossy",
				color: "error",
				className: "r-btn-glossy-error cn-btn-glossy-error",
			},
			{
				variant: "glossy",
				color: "neutral",
				className: "r-btn-glossy-neutral cn-btn-glossy-neutral",
			},

			// Glossy-inverted
			{
				variant: "glossy-inverted",
				color: "primary",
				className:
					"r-btn-glossy-inverted-primary cn-btn-glossy-inverted-primary",
			},
			{
				variant: "glossy-inverted",
				color: "info",
				className: "r-btn-glossy-inverted-info cn-btn-glossy-inverted-info",
			},
			{
				variant: "glossy-inverted",
				color: "success",
				className:
					"r-btn-glossy-inverted-success cn-btn-glossy-inverted-success",
			},
			{
				variant: "glossy-inverted",
				color: "warning",
				className:
					"r-btn-glossy-inverted-warning cn-btn-glossy-inverted-warning",
			},
			{
				variant: "glossy-inverted",
				color: "error",
				className: "r-btn-glossy-inverted-error cn-btn-glossy-inverted-error",
			},
			{
				variant: "glossy-inverted",
				color: "neutral",
				className:
					"r-btn-glossy-inverted-neutral cn-btn-glossy-inverted-neutral",
			},

			// Smooth
			{
				variant: "smooth",
				color: "primary",
				className: "r-btn-smooth-primary cn-btn-smooth-primary",
			},
			{
				variant: "smooth",
				color: "info",
				className: "r-btn-smooth-info cn-btn-smooth-info",
			},
			{
				variant: "smooth",
				color: "success",
				className: "r-btn-smooth-success cn-btn-smooth-success",
			},
			{
				variant: "smooth",
				color: "warning",
				className: "r-btn-smooth-warning cn-btn-smooth-warning",
			},
			{
				variant: "smooth",
				color: "error",
				className: "r-btn-smooth-error cn-btn-smooth-error",
			},
			{
				variant: "smooth",
				color: "neutral",
				className: "r-btn-smooth-neutral cn-btn-smooth-neutral",
			},

			// Smooth-inverted
			{
				variant: "smooth-inverted",
				color: "primary",
				className:
					"r-btn-smooth-inverted-primary cn-btn-smooth-inverted-primary",
			},
			{
				variant: "smooth-inverted",
				color: "info",
				className: "r-btn-smooth-inverted-info cn-btn-smooth-inverted-info",
			},
			{
				variant: "smooth-inverted",
				color: "success",
				className:
					"r-btn-smooth-inverted-success cn-btn-smooth-inverted-success",
			},
			{
				variant: "smooth-inverted",
				color: "warning",
				className:
					"r-btn-smooth-inverted-warning cn-btn-smooth-inverted-warning",
			},
			{
				variant: "smooth-inverted",
				color: "error",
				className: "r-btn-smooth-inverted-error cn-btn-smooth-inverted-error",
			},
			{
				variant: "smooth-inverted",
				color: "neutral",
				className:
					"r-btn-smooth-inverted-neutral cn-btn-smooth-inverted-neutral",
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
				? "rounded-l-lg"
				: isLast
					? "rounded-r-lg"
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
	"inline-flex whitespace-nowrap items-center justify-center box-border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-bg disabled:pointer-events-none hover:cursor-pointer w-fit r-compact-btn cn-compact-btn",
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
				className: "r-compact-btn-strong-primary cn-compact-btn-strong-primary",
			},
			{
				variant: "strong",
				color: "info",
				className: "r-compact-btn-strong-info cn-compact-btn-strong-info",
			},
			{
				variant: "strong",
				color: "success",
				className: "r-compact-btn-strong-success cn-compact-btn-strong-success",
			},
			{
				variant: "strong",
				color: "error",
				className: "r-compact-btn-strong-error cn-compact-btn-strong-error",
			},
			{
				variant: "strong",
				color: "warning",
				className: "r-compact-btn-strong-warning cn-compact-btn-strong-warning",
			},
			{
				variant: "strong",
				color: "neutral",
				className: "r-compact-btn-strong-neutral cn-compact-btn-strong-neutral",
			},

			// Soft
			{
				variant: "soft",
				color: "primary",
				className: "r-compact-btn-soft-primary cn-compact-btn-soft-primary",
			},
			{
				variant: "soft",
				color: "info",
				className: "r-compact-btn-soft-info cn-compact-btn-soft-info",
			},
			{
				variant: "soft",
				color: "success",
				className: "r-compact-btn-soft-success cn-compact-btn-soft-success",
			},
			{
				variant: "soft",
				color: "error",
				className: "r-compact-btn-soft-error cn-compact-btn-soft-error",
			},
			{
				variant: "soft",
				color: "warning",
				className: "r-compact-btn-soft-warning cn-compact-btn-soft-warning",
			},
			{
				variant: "soft",
				color: "neutral",
				className: "r-compact-btn-soft-neutral cn-compact-btn-soft-neutral",
			},

			// Outline
			{
				variant: "outline",
				color: "primary",
				className:
					"r-compact-btn-outline-primary cn-compact-btn-outline-primary",
			},
			{
				variant: "outline",
				color: "info",
				className: "r-compact-btn-outline-info cn-compact-btn-outline-info",
			},
			{
				variant: "outline",
				color: "success",
				className:
					"r-compact-btn-outline-success cn-compact-btn-outline-success",
			},
			{
				variant: "outline",
				color: "error",
				className: "r-compact-btn-outline-error cn-compact-btn-outline-error",
			},
			{
				variant: "outline",
				color: "warning",
				className:
					"r-compact-btn-outline-warning cn-compact-btn-outline-warning",
			},
			{
				variant: "outline",
				color: "neutral",
				className:
					"r-compact-btn-outline-neutral cn-compact-btn-outline-neutral",
			},

			// Ghost
			{
				variant: "ghost",
				color: "primary",
				className: "r-compact-btn-ghost-primary cn-compact-btn-ghost-primary",
			},
			{
				variant: "ghost",
				color: "info",
				className: "r-compact-btn-ghost-info cn-compact-btn-ghost-info",
			},
			{
				variant: "ghost",
				color: "success",
				className: "r-compact-btn-ghost-success cn-compact-btn-ghost-success",
			},
			{
				variant: "ghost",
				color: "error",
				className: "r-compact-btn-ghost-error cn-compact-btn-ghost-error",
			},
			{
				variant: "ghost",
				color: "warning",
				className: "r-compact-btn-ghost-warning cn-compact-btn-ghost-warning",
			},
			{
				variant: "ghost",
				color: "neutral",
				className: "r-compact-btn-ghost-neutral cn-compact-btn-ghost-neutral",
			},

			// Glossy
			{
				variant: "glossy",
				color: "primary",
				className: "r-compact-btn-glossy-primary cn-compact-btn-glossy-primary",
			},
			{
				variant: "glossy",
				color: "info",
				className: "r-compact-btn-glossy-info cn-compact-btn-glossy-info",
			},
			{
				variant: "glossy",
				color: "success",
				className: "r-compact-btn-glossy-success cn-compact-btn-glossy-success",
			},
			{
				variant: "glossy",
				color: "warning",
				className: "r-compact-btn-glossy-warning cn-compact-btn-glossy-warning",
			},
			{
				variant: "glossy",
				color: "error",
				className: "r-compact-btn-glossy-error cn-compact-btn-glossy-error",
			},
			{
				variant: "glossy",
				color: "neutral",
				className: "r-compact-btn-glossy-neutral cn-compact-btn-glossy-neutral",
			},

			// Glossy-inverted
			{
				variant: "glossy-inverted",
				color: "primary",
				className:
					"r-compact-btn-glossy-inverted-primary cn-compact-btn-glossy-inverted-primary",
			},
			{
				variant: "glossy-inverted",
				color: "info",
				className:
					"r-compact-btn-glossy-inverted-info cn-compact-btn-glossy-inverted-info",
			},
			{
				variant: "glossy-inverted",
				color: "success",
				className:
					"r-compact-btn-glossy-inverted-success cn-compact-btn-glossy-inverted-success",
			},
			{
				variant: "glossy-inverted",
				color: "warning",
				className:
					"r-compact-btn-glossy-inverted-warning cn-compact-btn-glossy-inverted-warning",
			},
			{
				variant: "glossy-inverted",
				color: "error",
				className:
					"r-compact-btn-glossy-inverted-error cn-compact-btn-glossy-inverted-error",
			},
			{
				variant: "glossy-inverted",
				color: "neutral",
				className:
					"r-compact-btn-glossy-inverted-neutral cn-compact-btn-glossy-inverted-neutral",
			},

			// Smooth
			{
				variant: "smooth",
				color: "primary",
				className: "r-compact-btn-smooth-primary cn-compact-btn-smooth-primary",
			},
			{
				variant: "smooth",
				color: "info",
				className: "r-compact-btn-smooth-info cn-compact-btn-smooth-info",
			},
			{
				variant: "smooth",
				color: "success",
				className: "r-compact-btn-smooth-success cn-compact-btn-smooth-success",
			},
			{
				variant: "smooth",
				color: "warning",
				className: "r-compact-btn-smooth-warning cn-compact-btn-smooth-warning",
			},
			{
				variant: "smooth",
				color: "error",
				className: "r-compact-btn-smooth-error cn-compact-btn-smooth-error",
			},
			{
				variant: "smooth",
				color: "neutral",
				className: "r-compact-btn-smooth-neutral cn-compact-btn-smooth-neutral",
			},

			// Smooth-inverted
			{
				variant: "smooth-inverted",
				color: "primary",
				className:
					"r-compact-btn-smooth-inverted-primary cn-compact-btn-smooth-inverted-primary",
			},
			{
				variant: "smooth-inverted",
				color: "info",
				className:
					"r-compact-btn-smooth-inverted-info cn-compact-btn-smooth-inverted-info",
			},
			{
				variant: "smooth-inverted",
				color: "success",
				className:
					"r-compact-btn-smooth-inverted-success cn-compact-btn-smooth-inverted-success",
			},
			{
				variant: "smooth-inverted",
				color: "warning",
				className:
					"r-compact-btn-smooth-inverted-warning cn-compact-btn-smooth-inverted-warning",
			},
			{
				variant: "smooth-inverted",
				color: "error",
				className:
					"r-compact-btn-smooth-inverted-error cn-compact-btn-smooth-inverted-error",
			},
			{
				variant: "smooth-inverted",
				color: "neutral",
				className:
					"r-compact-btn-smooth-inverted-neutral cn-compact-btn-smooth-inverted-neutral",
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
			"28": "[&>svg]:size-4 r-icon-btn-size-28 cn-icon-btn-size-28",
			"32": "[&>svg]:size-4.5 r-icon-btn-size-32 cn-icon-btn-size-32",
			"36": "[&>svg]:size-5 r-icon-btn-size-36 cn-icon-btn-size-36",
			"40": "[&>svg]:size-5 r-icon-btn-size-40 cn-icon-btn-size-40",
			"44": "[&>svg]:size-5 r-icon-btn-size-44 cn-icon-btn-size-44",
			"48": "[&>svg]:size-6 r-icon-btn-size-48 cn-icon-btn-size-48",
		},
		variant: {
			outline: "",
			default: "",
		},
	},
	compoundVariants: [
		{
			variant: "outline",
			size: "28",
			className: "r-icon-btn-outline-28 cn-icon-btn-outline-28",
		},
		{
			variant: "outline",
			size: "32",
			className: "r-icon-btn-outline-32 cn-icon-btn-outline-32",
		},
		{
			variant: "outline",
			size: "36",
			className: "r-icon-btn-outline-36 cn-icon-btn-outline-36",
		},
		{
			variant: "outline",
			size: "40",
			className: "r-icon-btn-outline-40 cn-icon-btn-outline-40",
		},
		{
			variant: "outline",
			size: "44",
			className: "r-icon-btn-outline-44 cn-icon-btn-outline-44",
		},
		{
			variant: "outline",
			size: "48",
			className: "r-icon-btn-outline-48 cn-icon-btn-outline-48",
		},
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
