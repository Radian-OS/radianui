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
	"focus-visible:ring-offset-bg box-border inline-flex w-fit items-center justify-center whitespace-nowrap hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none",
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
				"28": "rounded-none px-1 text-[13px] leading-4.5 [&>svg]:size-4",
				"32": "rounded-none px-1 text-sm [&>svg]:size-4.5",
				"36": "rounded-none px-1 text-sm [&>svg]:size-5",
				"40": "rounded-none px-1 text-sm [&>svg]:size-5",
				"44": "rounded-none px-1 text-base [&>svg]:size-5",
				"48": "rounded-none px-1 text-base [&>svg]:size-6",
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
			{ size: "28", className: "h-7 gap-1 px-2 py-1.5" },
			{ size: "32", className: "h-8 gap-1.5 px-2 py-1.5" },
			{ size: "36", className: "h-9 gap-2 px-3 py-2" },
			{ size: "40", className: "h-10 gap-2 px-3 py-2.5" },
			{ size: "44", className: "h-11 gap-2 px-3 py-2.5" },
			{ size: "48", className: "h-12 gap-2 px-4 py-3" },

			// Strong variant + colors
			{
				variant: "strong",
				color: "primary",
				className:
					"bg-primary text-primary-fg hover:bg-primary-hover focus-visible:ring-primary font-medium focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "info",
				className:
					"bg-info hover:bg-info-hover focus-visible:ring-info font-medium text-white focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "success",
				className:
					"bg-success hover:bg-success-hover focus-visible:ring-success font-medium text-white focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "error",
				className:
					"bg-error hover:bg-error-hover focus-visible:ring-error font-medium text-white focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "warning",
				className:
					"bg-warning hover:bg-warning-hover focus-visible:ring-warning font-medium text-white focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "neutral",
				className:
					"bg-black-inverse text-white-inverse hover:bg-fg-secondary focus-visible:ring-black-inverse font-medium focus-visible:outline-none",
			},

			// Soft variant + colors
			{
				variant: "soft",
				color: "primary",
				className:
					"bg-primary-accent text-primary-text hover:bg-primary-focus focus-visible:ring-primary-focus font-medium focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "info",
				className:
					"bg-info-accent text-info-text hover:bg-info-focus focus-visible:ring-info-focus font-medium focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "success",
				className:
					"bg-success-accent text-success-text hover:bg-success-focus focus-visible:ring-success-focus font-medium focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "error",
				className:
					"bg-error-accent text-error-text hover:bg-error-focus focus-visible:ring-error-focus font-medium focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "warning",
				className:
					"bg-warning-accent text-warning-text hover:bg-warning-focus focus-visible:ring-warning-focus font-medium focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "neutral",
				className:
					"bg-fill2 text-fg hover:bg-fill3 focus-visible:bg-bg focus-visible:ring-border font-medium focus-visible:outline-none",
			},

			// Outline variant + colors
			{
				variant: "outline",
				color: "primary",
				className:
					"border-primary-border text-primary-text hover:bg-primary-accent focus-visible:ring-primary-hover border bg-transparent font-medium",
			},
			{
				variant: "outline",
				color: "info",
				className:
					"border-info-border text-info-text hover:bg-info-accent focus-visible:ring-info-hover border bg-transparent font-medium",
			},
			{
				variant: "outline",
				color: "success",
				className:
					"border-success-border text-success-text hover:bg-success-accent focus-visible:ring-success-hover border bg-transparent font-medium",
			},
			{
				variant: "outline",
				color: "error",
				className:
					"border-error-border text-error-text hover:bg-error-accent focus-visible:ring-error-hover border bg-transparent font-medium",
			},
			{
				variant: "outline",
				color: "warning",
				className:
					"border-warning-border text-warning-text hover:bg-warning-accent focus-visible:ring-warning-hover border bg-transparent font-medium",
			},
			{
				variant: "outline",
				color: "neutral",
				className:
					"bg-elevation-level1 text-fg border-border hover:bg-fill1-alpha focus-visible:ring-border border font-medium",
			},

			// Ghost variant + colors
			{
				variant: "ghost",
				color: "primary",
				className:
					"text-primary-text hover:bg-primary-focus focus-visible:ring-primary-focus bg-transparent font-medium focus-visible:outline-none",
			},
			{
				variant: "ghost",
				color: "info",
				className:
					"text-info-text hover:bg-info-focus focus-visible:ring-info-focus bg-transparent font-medium focus-visible:outline-none",
			},
			{
				variant: "ghost",
				color: "success",
				className:
					"text-success-text hover:bg-success-focus focus-visible:ring-success-focus bg-transparent font-medium focus-visible:outline-none",
			},
			{
				variant: "ghost",
				color: "error",
				className:
					"text-error-text hover:bg-error-focus focus-visible:ring-error-focus bg-transparent font-medium focus-visible:outline-none",
			},
			{
				variant: "ghost",
				color: "warning",
				className:
					"text-warning-text hover:bg-warning-focus focus-visible:ring-warning-focus bg-transparent font-medium focus-visible:outline-none",
			},
			{
				variant: "ghost",
				color: "neutral",
				className:
					"text-fg hover:bg-fill2 focus-visible:ring-border bg-transparent font-medium focus-visible:outline-none",
			},

			// Link variant + colors
			{
				variant: "link",
				color: "primary",
				className:
					"text-primary-text focus-visible:ring-primary h-auto gap-1 bg-transparent px-0 py-0 font-medium hover:underline focus-visible:rounded-sm focus-visible:outline-none",
			},
			{
				variant: "link",
				color: "info",
				className:
					"text-info-text focus-visible:ring-info h-auto gap-1 bg-transparent px-0 py-0 font-medium hover:underline focus-visible:rounded-sm focus-visible:outline-none",
			},
			{
				variant: "link",
				color: "success",
				className:
					"text-success-text focus-visible:ring-success h-auto gap-1 bg-transparent px-0 py-0 font-medium hover:underline focus-visible:rounded-sm focus-visible:outline-none",
			},
			{
				variant: "link",
				color: "error",
				className:
					"text-error-text focus-visible:ring-error h-auto gap-1 bg-transparent px-0 py-0 font-medium hover:underline focus-visible:rounded-sm focus-visible:outline-none",
			},
			{
				variant: "link",
				color: "warning",
				className:
					"text-warning-text focus-visible:ring-warning h-auto gap-1 bg-transparent px-0 py-0 font-medium hover:underline focus-visible:rounded-sm focus-visible:outline-none",
			},
			{
				variant: "link",
				color: "neutral",
				className:
					"text-black-inverse focus-visible:ring-black-inverse h-auto gap-1 bg-transparent px-0 py-0 font-medium hover:underline focus-visible:rounded-sm focus-visible:outline-none",
			},

			// glossy variants + colors

			{
				variant: "glossy",
				color: "primary",
				className:
					"bg-primary hover:bg-primary-hover focus-visible:ring-primary relative overflow-hidden font-medium text-white shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-primary),0_3px_4px_-1px_var(--color-primary-border)] before:absolute before:inset-x-0 before:top-0 before:h-full before:bg-gradient-to-b before:from-white/20 before:to-transparent before:content-[''] focus-visible:outline-none",
			},

			{
				variant: "glossy",
				color: "info",
				className:
					"bg-info hover:bg-info-hover focus-visible:ring-info relative overflow-hidden font-medium text-white shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-info),0_3px_4px_-1px_var(--color-info-border)] before:absolute before:inset-x-0 before:top-0 before:h-full before:bg-gradient-to-b before:from-white/20 before:to-transparent before:content-[''] focus-visible:outline-none",
			},
			{
				variant: "glossy",
				color: "success",
				className:
					"bg-success hover:bg-success-hover focus-visible:ring-success relative overflow-hidden font-medium text-white shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-success),0_3px_4px_-1px_var(--color-success-border)] before:absolute before:inset-x-0 before:top-0 before:h-full before:bg-gradient-to-b before:from-white/20 before:to-transparent before:content-[''] focus-visible:outline-none",
			},
			{
				variant: "glossy",
				color: "warning",
				className:
					"bg-warning hover:bg-warning-hover focus-visible:ring-warning relative overflow-hidden font-medium text-white shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-warning),0_3px_4px_-1px_var(--color-warning-border)] before:absolute before:inset-x-0 before:top-0 before:h-full before:bg-gradient-to-b before:from-white/20 before:to-transparent before:content-[''] focus-visible:outline-none",
			},
			{
				variant: "glossy",
				color: "error",
				className:
					"bg-error hover:bg-error-hover focus-visible:ring-error relative overflow-hidden font-medium text-white shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-error),0_3px_4px_-1px_var(--color-error-border)] before:absolute before:inset-x-0 before:top-0 before:h-full before:bg-gradient-to-b before:from-white/20 before:to-transparent before:content-[''] focus-visible:outline-none",
			},
			{
				variant: "glossy",
				color: "neutral",
				className:
					"bg-black-inverse focus-visible:ring-black-inverse text-white-inverse relative overflow-hidden font-medium shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-black-inverse),0_3px_4px_-1px_var(--color-black-inverse)] before:absolute before:inset-x-0 before:top-0 before:h-full before:bg-gradient-to-b before:from-white/20 before:to-transparent before:content-[''] hover:brightness-110 focus-visible:outline-none",
			},

			// glossy-inverted + colors
			{
				variant: "glossy-inverted",
				color: "primary",
				className:
					"bg-primary hover:bg-primary-hover focus-visible:ring-primary relative overflow-hidden font-medium text-white shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-primary),0_3px_4px_-1px_var(--color-primary-border)] before:absolute before:inset-x-0 before:top-0 before:h-full before:bg-gradient-to-b before:from-transparent before:to-white/20 before:content-[''] focus-visible:outline-none",
			},

			{
				variant: "glossy-inverted",
				color: "info",
				className:
					"bg-info hover:bg-info-hover focus-visible:ring-info relative overflow-hidden font-medium text-white shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-info),0_3px_4px_-1px_var(--color-info-border)] before:absolute before:inset-x-0 before:top-0 before:h-full before:bg-gradient-to-b before:from-transparent before:to-white/20 before:content-[''] focus-visible:outline-none",
			},
			{
				variant: "glossy-inverted",
				color: "success",
				className:
					"bg-success hover:bg-success-hover focus-visible:ring-success relative overflow-hidden font-medium text-white shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-success),0_3px_4px_-1px_var(--color-success-border)] before:absolute before:inset-x-0 before:top-0 before:h-full before:bg-gradient-to-b before:from-transparent before:to-white/20 before:content-[''] focus-visible:outline-none",
			},
			{
				variant: "glossy-inverted",
				color: "warning",
				className:
					"bg-warning hover:bg-warning-hover focus-visible:ring-warning relative overflow-hidden font-medium text-white shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-warning),0_3px_4px_-1px_var(--color-warning-border)] before:absolute before:inset-x-0 before:top-0 before:h-full before:bg-gradient-to-b before:from-transparent before:to-white/20 before:content-[''] focus-visible:outline-none",
			},
			{
				variant: "glossy-inverted",
				color: "error",
				className:
					"bg-error hover:bg-error-hover focus-visible:ring-error relative overflow-hidden font-medium text-white shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-error),0_3px_4px_-1px_var(--color-error-border)] before:absolute before:inset-x-0 before:top-0 before:h-full before:bg-gradient-to-b before:from-transparent before:to-white/20 before:content-[''] focus-visible:outline-none",
			},
			{
				variant: "glossy-inverted",
				color: "neutral",
				className:
					"bg-black-inverse focus-visible:ring-black-inverse text-white-inverse relative overflow-hidden font-medium shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-black-inverse),0_3px_4px_-1px_var(--color-black-inverse)] before:absolute before:inset-x-0 before:top-0 before:h-full before:bg-gradient-to-b before:from-white/20 before:to-transparent before:content-[''] hover:brightness-110 focus-visible:outline-none",
			},

			// smooth button
			{
				variant: "smooth",
				color: "primary",
				className:
					"focus-visible:ring-primary bg-primary after:from-primary-hover after:to-primary relative overflow-hidden font-medium text-white shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0_0_1px_var(--color-primary)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/16 before:mask-b-from-98% after:absolute after:inset-0 after:-z-10 after:rounded-[inherit] after:bg-gradient-to-b hover:brightness-110 focus-visible:outline-none",
			},
			{
				variant: "smooth",
				color: "info",
				className:
					"focus-visible:ring-info bg-info after:from-info-hover after:to-info relative overflow-hidden font-medium text-white shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0_0_1px_var(--color-info)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/16 before:mask-b-from-98% after:absolute after:inset-0 after:-z-10 after:rounded-[inherit] after:bg-gradient-to-b hover:brightness-110 focus-visible:outline-none",
			},
			{
				variant: "smooth",
				color: "success",
				className:
					"focus-visible:ring-success bg-success after:from-success-hover after:to-success relative overflow-hidden font-medium text-white shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0_0_1px_var(--color-success)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/16 before:mask-b-from-98% after:absolute after:inset-0 after:-z-10 after:rounded-[inherit] after:bg-gradient-to-b hover:brightness-110 focus-visible:outline-none",
			},
			{
				variant: "smooth",
				color: "warning",
				className:
					"focus-visible:ring-warning bg-warning after:from-warning-hover after:to-warning relative overflow-hidden font-medium text-white shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0_0_1px_var(--color-warning)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/16 before:mask-b-from-98% after:absolute after:inset-0 after:-z-10 after:rounded-[inherit] after:bg-gradient-to-b hover:brightness-110 focus-visible:outline-none",
			},

			{
				variant: "smooth",
				color: "error",
				className:
					"focus-visible:ring-error bg-error after:from-error-hover after:to-error relative overflow-hidden font-medium text-white shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0_0_1px_var(--color-error)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/16 before:mask-b-from-98% after:absolute after:inset-0 after:-z-10 after:rounded-[inherit] after:bg-gradient-to-b hover:brightness-110 focus-visible:outline-none",
			},
			{
				variant: "smooth",
				color: "neutral",
				className:
					"focus-visible:ring-black-inverse text-white-inverse bg-black-inverse after:to-black-inverse before:border-white-inverse/16 relative overflow-hidden font-medium shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0_0_1px_var(--color-white-inverse)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:mask-b-from-98% after:absolute after:inset-0 after:-z-10 after:rounded-[inherit] after:bg-gradient-to-b after:from-white/20 hover:opacity-95 focus-visible:outline-none",
			},
			// smooth-inverted variants
			{
				variant: "smooth-inverted",
				color: "primary",
				className:
					"focus-visible:ring-primary bg-primary after:from-primary after:to-primary-hover relative overflow-hidden font-medium text-white shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0_0_1px_var(--color-primary)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/16 before:mask-b-from-98% after:absolute after:inset-0 after:-z-10 after:rounded-[inherit] after:bg-gradient-to-b hover:brightness-110 focus-visible:outline-none",
			},
			{
				variant: "smooth-inverted",
				color: "info",
				className:
					"focus-visible:ring-info bg-info after:from-info after:to-info-hover relative overflow-hidden font-medium text-white shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0_0_1px_var(--color-info)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/16 before:mask-b-from-98% after:absolute after:inset-0 after:-z-10 after:rounded-[inherit] after:bg-gradient-to-b hover:brightness-110 focus-visible:outline-none",
			},
			{
				variant: "smooth-inverted",
				color: "success",
				className:
					"focus-visible:ring-success bg-success after:from-success after:to-success-hover relative overflow-hidden font-medium text-white shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0_0_1px_var(--color-success)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/16 before:mask-b-from-98% after:absolute after:inset-0 after:-z-10 after:rounded-[inherit] after:bg-gradient-to-b hover:brightness-110 focus-visible:outline-none",
			},
			{
				variant: "smooth-inverted",
				color: "warning",
				className:
					"focus-visible:ring-warning bg-warning after:from-warning after:to-warning-hover relative overflow-hidden font-medium text-white shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0_0_1px_var(--color-warning)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/16 before:mask-b-from-98% after:absolute after:inset-0 after:-z-10 after:rounded-[inherit] after:bg-gradient-to-b hover:brightness-110 focus-visible:outline-none",
			},
			{
				variant: "smooth-inverted",
				color: "error",
				className:
					"focus-visible:ring-error bg-error after:from-error after:to-error-hover relative overflow-hidden font-medium text-white shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0_0_1px_var(--color-error)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/16 before:mask-b-from-98% after:absolute after:inset-0 after:-z-10 after:rounded-[inherit] after:bg-gradient-to-b hover:brightness-110 focus-visible:outline-none",
			},
			{
				variant: "smooth-inverted",
				color: "neutral",
				className:
					"focus-visible:ring-black-inverse text-white-inverse bg-black-inverse after:from-black-inverse before:border-white-inverse/16 relative overflow-hidden font-medium shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0_0_1px_var(--color-white-inverse)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:mask-b-from-98% after:absolute after:inset-0 after:-z-10 after:rounded-[inherit] after:bg-gradient-to-b after:to-white/20 hover:opacity-95 focus-visible:outline-none",
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

	// Remove any invalid DOM props before spreading
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
		if (!React.isValidElement(child)) return child

		const isFirst = index === 0
		const isLast = index === React.Children.count(children) - 1

		const borderRadiusClass = isFirst
			? "rounded-l-lg"
			: isLast
				? "rounded-r-lg"
				: "rounded-none"

		const layoutClassName = cn(
			"rounded-none",
			borderRadiusClass,
			"-ml-[1px]",
			!isLast ? "border-r-0" : ""
		)

		// If the child is an asChild wrapper (e.g. DropdownTrigger asChild),
		// Radix's Slot won't forward custom props (variant/color/size) to the
		// real button. Instead, inject those props into the wrapper's child
		// (the actual button element) and apply layout classes to the wrapper.
		const childProps = child.props as Record<string, unknown>
		if (
			childProps.asChild === true &&
			React.isValidElement(childProps.children)
		) {
			const innerChild = childProps.children as React.ReactElement<ButtonProps>
			const patchedInner = React.cloneElement(innerChild, {
				variant,
				size,
				color,
				className: cn(layoutClassName, innerChild.props.className),
			})
			return React.cloneElement(
				child as React.ReactElement<Record<string, unknown>>,
				{
					children: patchedInner,
				}
			)
		}

		// Normal button child — inject directly.
		return React.cloneElement(child as React.ReactElement<ButtonProps>, {
			variant,
			size,
			color,
			className: cn(layoutClassName, (child.props as ButtonProps).className),
		})
	})

	return (
		<div className={cn("inline-flex", className)} role="group" {...props}>
			{modifiedChildren}
		</div>
	)
}
ButtonGroup.displayName = "ButtonGroup"

export const compactButtonVariants = cva(
	"focus-visible:ring-offset-bg-bg box-border inline-flex w-fit items-center justify-center rounded-none whitespace-nowrap hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none",
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
				"20": "h-5 w-5 p-0.5 [&>svg]:!h-4 [&>svg]:!w-4",
				"24": "h-6 w-6 p-1 [&>svg]:!h-4 [&>svg]:!w-4",
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
				className:
					"bg-primary hover:bg-primary-hover focus-visible:ring-primary font-medium text-white focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "info",
				className:
					"bg-info hover:bg-info-hover focus-visible:ring-info font-medium text-white focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "success",
				className:
					"bg-success hover:bg-success-hover focus-visible:ring-success font-medium text-white focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "error",
				className:
					"bg-error hover:bg-error-hover focus-visible:ring-error font-medium text-white focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "warning",
				className:
					"bg-warning hover:bg-warning-hover focus-visible:ring-warning font-medium text-white focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "neutral",
				className:
					"bg-black-inverse text-white-inverse hover:bg-fg-secondary focus-visible:ring-black-inverse font-medium focus-visible:outline-none",
			},

			// Soft variant + colors
			{
				variant: "soft",
				color: "primary",
				className:
					"bg-primary-accent text-primary-text hover:bg-primary-focus focus-visible:ring-primary-focus font-medium focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "info",
				className:
					"bg-info-accent text-info-text hover:bg-info-focus focus-visible:ring-info-focus font-medium focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "success",
				className:
					"bg-success-accent text-success-text hover:bg-success-focus focus-visible:ring-success-focus font-medium focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "error",
				className:
					"bg-error-accent text-error-text hover:bg-error-focus focus-visible:ring-error-focus font-medium focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "warning",
				className:
					"bg-warning-accent text-warning-text hover:bg-warning-focus focus-visible:ring-warning-focus font-medium focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "neutral",
				className:
					"bg-fill2 text-fg-secondary hover:bg-fill1-alpha focus-visible:bg-bg focus-visible:ring-border font-medium focus-visible:outline-none",
			},

			// Outline variant + colors
			{
				variant: "outline",
				color: "primary",
				className:
					"border-primary-hover text-primary-text hover:bg-primary-accent focus-visible:ring-primary-hover border bg-transparent font-medium",
			},
			{
				variant: "outline",
				color: "info",
				className:
					"border-info-hover text-info-text hover:bg-info-accent focus-visible:ring-info-hover border bg-transparent font-medium",
			},
			{
				variant: "outline",
				color: "success",
				className:
					"border-success-hover text-success-text hover:bg-success-accent focus-visible:ring-success-hover border bg-transparent font-medium",
			},
			{
				variant: "outline",
				color: "error",
				className:
					"border-error-hover text-error-text hover:bg-error-accent focus-visible:ring-error-hover border bg-transparent font-medium",
			},
			{
				variant: "outline",
				color: "warning",
				className:
					"border-warning-hover text-warning-text hover:bg-warning-accent focus-visible:ring-warning-hover border bg-transparent font-medium",
			},
			{
				variant: "outline",
				color: "neutral",
				className:
					"bg-elevation-level1 text-fg-secondary border-border hover:bg-fill1-alpha focus-visible:ring-border border font-medium",
			},

			// Ghost variant + colors
			{
				variant: "ghost",
				color: "primary",
				className:
					"text-primary-text hover:bg-primary-focus focus-visible:ring-primary-focus bg-transparent font-medium focus-visible:outline-none",
			},
			{
				variant: "ghost",
				color: "info",
				className:
					"text-info-text hover:bg-info-focus focus-visible:ring-info-focus bg-transparent font-medium focus-visible:outline-none",
			},
			{
				variant: "ghost",
				color: "success",
				className:
					"text-success-text hover:bg-success-focus focus-visible:ring-success-focus bg-transparent font-medium focus-visible:outline-none",
			},
			{
				variant: "ghost",
				color: "error",
				className:
					"text-error-text hover:bg-error-focus focus-visible:ring-error-focus bg-transparent font-medium focus-visible:outline-none",
			},
			{
				variant: "ghost",
				color: "warning",
				className:
					"text-warning-text hover:bg-warning-focus focus-visible:ring-warning-focus bg-transparent font-medium focus-visible:outline-none",
			},
			{
				variant: "ghost",
				color: "neutral",
				className:
					"text-fg-secondary hover:bg-fill1 focus-visible:ring-border bg-transparent font-medium focus-visible:outline-none",
			},
			{
				variant: "glossy",
				color: "primary",
				className:
					"bg-primary hover:bg-primary-hover focus-visible:ring-primary overflow-hidden font-medium text-white shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-primary),0_3px_4px_-1px_var(--color-primary-border)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/44 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:mask-b-from-0% hover:brightness-110 focus-visible:outline-none",
			},

			{
				variant: "glossy",
				color: "info",
				className:
					"bg-info hover:bg-info-hover focus-visible:ring-info overflow-hidden font-medium text-white shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-info),0_3px_4px_-1px_var(--color-info-border)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/44 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:mask-b-from-0% hover:brightness-110 focus-visible:outline-none",
			},
			{
				variant: "glossy",
				color: "success",
				className:
					"bg-success hover:bg-success-hover focus-visible:ring-success overflow-hidden font-medium text-white shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-success),0_3px_4px_-1px_var(--color-success-border)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/44 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:mask-b-from-0% hover:brightness-110 focus-visible:outline-none",
			},
			{
				variant: "glossy",
				color: "warning",
				className:
					"bg-warning hover:bg-warning-hover focus-visible:ring-warning overflow-hidden font-medium text-white shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-warning),0_3px_4px_-1px_var(--color-warning-border)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/44 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:mask-b-from-0% hover:brightness-110 focus-visible:outline-none",
			},
			{
				variant: "glossy",
				color: "error",
				className:
					"bg-error hover:bg-error-hover focus-visible:ring-error overflow-hidden font-medium text-white shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-error),0_3px_4px_-1px_var(--color-error-border)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/44 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:mask-b-from-0% hover:brightness-110 focus-visible:outline-none",
			},
			{
				variant: "glossy",
				color: "neutral",
				className:
					"focus-visible:ring-black-inverse before:border-white-inverse/16 bg-black-inverse text-white-inverse overflow-hidden bg-linear-to-t from-white/0 to-white/20 font-medium shadow-[0_0_0_1px_var(--color-black-inverse),0_3px_4px_-1px_var(--color-black-inverse)] before:absolute before:inset-0 before:rounded-[inherit] before:border before:mask-b-from-0% hover:opacity-90 focus-visible:outline-none",
			},

			// glossy-inverted + colors
			{
				variant: "glossy-inverted",
				color: "primary",
				className:
					"focus-visible:ring-primary hover:bg-primary-hover bg-primary overflow-hidden font-medium text-white shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-primary),0_3px_4px_-1px_var(--color-primary-border)] before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/44 before:bg-gradient-to-b before:from-transparent before:to-white/20 before:mask-b-from-0% focus-visible:outline-none",
			},

			{
				variant: "glossy-inverted",
				color: "info",
				className:
					"focus-visible:ring-info hover:bg-info-hover bg-info overflow-hidden font-medium text-white shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-info),0_3px_4px_-1px_var(--color-info-border)] before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/44 before:bg-gradient-to-b before:from-transparent before:to-white/20 before:mask-b-from-0% focus-visible:outline-none",
			},
			{
				variant: "glossy-inverted",
				color: "success",
				className:
					"focus-visible:ring-success hover:bg-success-hover bg-success overflow-hidden font-medium text-white shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-success),0_3px_4px_-1px_var(--color-success-border)] before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/44 before:bg-gradient-to-b before:from-transparent before:to-white/20 before:mask-b-from-0% focus-visible:outline-none",
			},
			{
				variant: "glossy-inverted",
				color: "warning",
				className:
					"focus-visible:ring-warning hover:bg-warning-hover bg-warning overflow-hidden font-medium text-white shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-warning),0_3px_4px_-1px_var(--color-warning-border)] before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/44 before:bg-gradient-to-b before:from-transparent before:to-white/20 before:mask-b-from-0% focus-visible:outline-none",
			},
			{
				variant: "glossy-inverted",
				color: "error",
				className:
					"focus-visible:ring-error hover:bg-error-hover bg-error overflow-hidden font-medium text-white shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-error),0_3px_4px_-1px_var(--color-error-border)] before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/44 before:bg-gradient-to-b before:from-transparent before:to-white/20 before:mask-b-from-0% focus-visible:outline-none",
			},
			{
				variant: "glossy-inverted",
				color: "neutral",
				className:
					"focus-visible:ring-black-inverse before:border-white-inverse/16 bg-black-inverse text-white-inverse overflow-hidden bg-linear-to-t from-white/20 to-white/0 font-medium shadow-[0_0_0_1px_var(--color-black-inverse),0_3px_4px_-1px_var(--color-black-inverse)] before:absolute before:inset-0 before:rounded-[inherit] before:border before:mask-b-from-0% hover:opacity-90 focus-visible:outline-none",
			},

			// smooth button
			{
				variant: "smooth",
				color: "primary",
				className:
					"before:from-primary-hover before:to-primary bg-primary focus-visible:ring-primary overflow-hidden font-medium text-white shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0px_0px_1px_var(--color-primary)] before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:border before:border-white/16 before:bg-gradient-to-b before:mask-b-from-98% hover:brightness-110 focus-visible:outline-none",
			},
			{
				variant: "smooth",
				color: "info",
				className:
					"before:from-info-hover before:to-info bg-info focus-visible:ring-info overflow-hidden font-medium text-white shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0px_0px_1px_var(--color-info)] before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:border before:border-white/16 before:bg-gradient-to-b before:mask-b-from-98% hover:brightness-110 focus-visible:outline-none",
			},
			{
				variant: "smooth",
				color: "success",
				className:
					"before:from-success-hover before:to-success bg-success focus-visible:ring-success overflow-hidden font-medium text-white shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0px_0px_1px_var(--color-success)] before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:border before:border-white/16 before:bg-gradient-to-b before:mask-b-from-98% hover:brightness-110 focus-visible:outline-none",
			},
			{
				variant: "smooth",
				color: "warning",
				className:
					"before:from-warning-hover before:to-warning bg-warning focus-visible:ring-warning overflow-hidden font-medium text-white shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0px_0px_1px_var(--color-warning)] before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:border before:border-white/16 before:bg-gradient-to-b before:mask-b-from-98% hover:brightness-110 focus-visible:outline-none",
			},

			{
				variant: "smooth",
				color: "error",
				className:
					"before:from-error-hover before:to-error bg-error focus-visible:ring-error overflow-hidden font-medium text-white shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0px_0px_1px_var(--color-error)] before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:border before:border-white/16 before:bg-gradient-to-b before:mask-b-from-98% hover:brightness-110 focus-visible:outline-none",
			},
			{
				variant: "smooth",
				color: "neutral",
				className:
					"focus-visible:ring-black-inverse before:border-white-inverse/16 bg-black-inverse text-white-inverse hover:before:bg-black-inverse/30 overflow-hidden bg-linear-to-t from-white/0 to-white/20 font-medium before:absolute before:inset-px before:rounded-[inherit] before:border before:mask-b-from-98% focus-visible:outline-none",
			},
			// smooth-inverted variants
			{
				variant: "smooth-inverted",
				color: "primary",
				className:
					"before:from-primary before:to-primary-hover bg-primary focus-visible:ring-primary overflow-hidden font-medium text-white shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0px_0px_1px_var(--color-primary)] before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:border before:border-white/16 before:bg-gradient-to-b before:mask-b-from-98% hover:brightness-110 focus-visible:outline-none",
			},
			{
				variant: "smooth-inverted",
				color: "info",
				className:
					"before:from-info before:to-info-hover bg-info focus-visible:ring-info overflow-hidden font-medium text-white shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0px_0px_1px_var(--color-info)] before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:border before:border-white/16 before:bg-gradient-to-b before:mask-b-from-98% hover:brightness-110 focus-visible:outline-none",
			},
			{
				variant: "smooth-inverted",
				color: "success",
				className:
					"before:from-success before:to-success-hover bg-success focus-visible:ring-success overflow-hidden font-medium text-white shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0px_0px_1px_var(--color-success)] before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:border before:border-white/16 before:bg-gradient-to-b before:mask-b-from-98% hover:brightness-110 focus-visible:outline-none",
			},
			{
				variant: "smooth-inverted",
				color: "warning",
				className:
					"before:from-warning before:to-warning-hover bg-warning focus-visible:ring-warning overflow-hidden font-medium text-white shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0px_0px_1px_var(--color-warning)] before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:border before:border-white/16 before:bg-gradient-to-b before:mask-b-from-98% hover:brightness-110 focus-visible:outline-none",
			},
			{
				variant: "smooth-inverted",
				color: "error",
				className:
					"before:from-error before:to-error-hover bg-error focus-visible:ring-error overflow-hidden font-medium text-white shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0px_0px_1px_var(--color-error)] before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:border before:border-white/16 before:bg-gradient-to-b before:mask-b-from-98% hover:brightness-110 focus-visible:outline-none",
			},
			{
				variant: "smooth",
				color: "neutral",
				className:
					"focus-visible:ring-black-inverse before:border-white-inverse/16 bg-black-inverse text-white-inverse hover:before:bg-black-inverse/30 overflow-hidden bg-linear-to-b from-white/0 to-white/20 font-medium before:absolute before:inset-px before:rounded-[inherit] before:border before:mask-b-from-98% focus-visible:outline-none",
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

// Icon button size variants - only handles sizing
export const iconButtonSizeVariants = cva("", {
	variants: {
		size: {
			"28": "size-7 rounded-none p-1.5 [&>svg]:size-4",
			"32": "size-8 rounded-none p-1.75 [&>svg]:size-4.5",
			"36": "size-9 rounded-none p-2 [&>svg]:size-5",
			"40": "size-10 rounded-none p-2.5 [&>svg]:size-5",
			"44": "size-11 rounded-none p-3 [&>svg]:size-5",
			"48": "size-12 rounded-none p-3 [&>svg]:size-6",
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
