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
				"28": "[&>svg]:size-4 text-[13px] leading-4.5 px-1 rounded-md",
				"32": "[&>svg]:size-4.5 text-sm px-1 rounded-md",
				"36": "[&>svg]:size-5 text-sm px-1 rounded-lg",
				"40": "[&>svg]:size-5 text-sm px-1 rounded-lg",
				"44": "[&>svg]:size-5 text-base px-1 rounded-lg",
				"48": "[&>svg]:size-6 text-base px-1 rounded-lg",
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
			{ size: "32", className: "gap-1.5 h-8 px-2.5 py-1.5" },
			{ size: "36", className: "gap-2 h-9 px-3 py-2" },
			{ size: "40", className: "gap-2 h-10 px-3 py-2.5" },
			{ size: "44", className: "gap-2 h-11 px-3 py-2.5" },
			{ size: "48", className: "gap-2 h-12 px-4 py-3" },

			// Strong variant + colors
			{
				variant: "strong",
				color: "primary",
				className:
					"bg-primary font-medium text-primary-fg hover:bg-primary-hover focus-visible:ring-primary focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "info",
				className:
					"bg-info font-medium text-white hover:bg-info-hover focus-visible:ring-info focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "success",
				className:
					"bg-success font-medium text-white hover:bg-success-hover focus-visible:ring-success focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "error",
				className:
					"bg-error font-medium text-white hover:bg-error-hover focus-visible:ring-error focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "warning",
				className:
					"bg-warning font-medium text-white hover:bg-warning-hover focus-visible:ring-warning focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "neutral",
				className:
					"bg-black-inverse font-medium text-white-inverse hover:bg-fg-secondary focus-visible:ring-black-inverse focus-visible:outline-none",
			},

			// Soft variant + colors
			{
				variant: "soft",
				color: "primary",
				className:
					"bg-primary-accent font-medium text-primary-text hover:bg-primary-focus focus-visible:ring-primary-focus focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "info",
				className:
					"bg-info-accent font-medium text-info-text hover:bg-info-focus focus-visible:ring-info-focus focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "success",
				className:
					"bg-success-accent font-medium text-success-text hover:bg-success-focus focus-visible:ring-success-focus focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "error",
				className:
					"bg-error-accent font-medium text-error-text hover:bg-error-focus focus-visible:ring-error-focus focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "warning",
				className:
					"bg-warning-accent font-medium text-warning-text hover:bg-warning-focus focus-visible:ring-warning-focus focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "neutral",
				className:
					"bg-fill2 font-medium text-fg hover:bg-fill3 focus-visible:bg-bg focus-visible:outline-none focus-visible:ring-border",
			},

			// Outline variant + colors
			{
				variant: "outline",
				color: "primary",
				className:
					"bg-transparent font-medium border border-primary-border text-primary-text hover:bg-primary-accent focus-visible:ring-primary-hover",
			},
			{
				variant: "outline",
				color: "info",
				className:
					"bg-transparent font-medium border border-info-border text-info-text hover:bg-info-accent focus-visible:ring-info-hover",
			},
			{
				variant: "outline",
				color: "success",
				className:
					"bg-transparent font-medium border border-success-border text-success-text hover:bg-success-accent focus-visible:ring-success-hover",
			},
			{
				variant: "outline",
				color: "error",
				className:
					"bg-transparent font-medium border border-error-border text-error-text hover:bg-error-accent focus-visible:ring-error-hover",
			},
			{
				variant: "outline",
				color: "warning",
				className:
					"bg-transparent font-medium border border-warning-border text-warning-text hover:bg-warning-accent focus-visible:ring-warning-hover",
			},
			{
				variant: "outline",
				color: "neutral",
				className:
					"bg-elevation-level1 font-medium  text-fg border border-border hover:bg-fill1-alpha focus-visible:ring-border",
			},

			// Ghost variant + colors
			{
				variant: "ghost",
				color: "primary",
				className:
					"bg-transparent text-primary-text font-medium hover:bg-primary-focus focus-visible:outline-none focus-visible:ring-primary-focus",
			},
			{
				variant: "ghost",
				color: "info",
				className:
					"bg-transparent text-info-text font-medium hover:bg-info-focus focus-visible:outline-none focus-visible:ring-info-focus",
			},
			{
				variant: "ghost",
				color: "success",
				className:
					"bg-transparent text-success-text font-medium hover:bg-success-focus focus-visible:outline-none focus-visible:ring-success-focus",
			},
			{
				variant: "ghost",
				color: "error",
				className:
					"bg-transparent text-error-text font-medium hover:bg-error-focus focus-visible:outline-none focus-visible:ring-error-focus",
			},
			{
				variant: "ghost",
				color: "warning",
				className:
					"bg-transparent text-warning-text font-medium hover:bg-warning-focus focus-visible:outline-none focus-visible:ring-warning-focus",
			},
			{
				variant: "ghost",
				color: "neutral",
				className:
					"bg-transparent text-fg font-medium hover:bg-fill2 focus-visible:outline-none focus-visible:ring-border",
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
				className:
					"bg-transparent text-info-text font-medium hover:underline focus-visible:ring-info focus-visible:outline-none h-auto px-0 py-0 gap-1 focus-visible:rounded-sm",
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
				className:
					"bg-transparent text-error-text font-medium hover:underline focus-visible:ring-error focus-visible:outline-none h-auto px-0 py-0 gap-1 focus-visible:rounded-sm",
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

			// glossy variants + colors

			{
				variant: "glossy",
				color: "primary",
				className:
					"bg-primary relative hover:bg-primary-hover before:absolute before:inset-x-0 before:top-0 before:h-full before:bg-gradient-to-b before:from-white/20 before:to-transparent before:content-['']  focus-visible:ring-primary  focus-visible:outline-none shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-primary),0_3px_4px_-1px_var(--color-primary-border)]  overflow-hidden text-primary-fg font-medium",
			},

			{
				variant: "glossy",
				color: "info",
				className:
					"bg-info relative hover:bg-info-hover before:absolute before:inset-x-0 before:top-0 before:h-full before:bg-gradient-to-b before:from-white/20 before:to-transparent before:content-['']  focus-visible:ring-info  focus-visible:outline-none shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-info),0_3px_4px_-1px_var(--color-info-border)]  overflow-hidden text-white font-medium",
			},
			{
				variant: "glossy",
				color: "success",
				className:
					"bg-success relative hover:bg-success-hover before:absolute before:inset-x-0 before:top-0 before:h-full before:bg-gradient-to-b before:from-white/20 before:to-transparent before:content-['']  focus-visible:ring-success  focus-visible:outline-none shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-success),0_3px_4px_-1px_var(--color-success-border)]  overflow-hidden text-white font-medium",
			},
			{
				variant: "glossy",
				color: "warning",
				className:
					"bg-warning relative hover:bg-warning-hover before:absolute before:inset-x-0 before:top-0 before:h-full before:bg-gradient-to-b before:from-white/20 before:to-transparent before:content-['']  focus-visible:ring-warning  focus-visible:outline-none shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-warning),0_3px_4px_-1px_var(--color-warning-border)]  overflow-hidden text-white font-medium",
			},
			{
				variant: "glossy",
				color: "error",
				className:
					"bg-error relative hover:bg-error-hover before:absolute before:inset-x-0 before:top-0 before:h-full before:bg-gradient-to-b before:from-white/20 before:to-transparent before:content-['']  focus-visible:ring-error  focus-visible:outline-none shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-error),0_3px_4px_-1px_var(--color-error-border)]  overflow-hidden text-white font-medium",
			},
			{
				variant: "glossy",
				color: "neutral",
				className:
					"bg-black-inverse relative hover:brightness-110 before:absolute before:inset-x-0 before:top-0 before:h-full before:bg-gradient-to-b before:from-white/20 before:to-transparent before:content-['']  focus-visible:ring-black-inverse  focus-visible:outline-none shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-black-inverse),0_3px_4px_-1px_var(--color-black-inverse)]  overflow-hidden text-white-inverse font-medium",
			},

			// glossy-inverted + colors
			{
				variant: "glossy-inverted",
				color: "primary",
				className:
					"bg-primary relative hover:bg-primary-hover before:absolute before:inset-x-0 before:top-0 before:h-full before:bg-gradient-to-b before:from-transparent before:to-white/20 before:content-['']  focus-visible:ring-primary  focus-visible:outline-none shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-primary),0_3px_4px_-1px_var(--color-primary-border)]  overflow-hidden text-primary-fg font-medium",
			},

			{
				variant: "glossy-inverted",
				color: "info",
				className:
					"bg-info relative hover:bg-info-hover before:absolute before:inset-x-0 before:top-0 before:h-full before:bg-gradient-to-b before:from-transparent before:to-white/20 before:content-['']  focus-visible:ring-info  focus-visible:outline-none shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-info),0_3px_4px_-1px_var(--color-info-border)]  overflow-hidden text-white font-medium",
			},
			{
				variant: "glossy-inverted",
				color: "success",
				className:
					"bg-success relative hover:bg-success-hover before:absolute before:inset-x-0 before:top-0 before:h-full before:bg-gradient-to-b before:from-transparent before:to-white/20 before:content-['']  focus-visible:ring-success  focus-visible:outline-none shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-success),0_3px_4px_-1px_var(--color-success-border)]  overflow-hidden text-white font-medium",
			},
			{
				variant: "glossy-inverted",
				color: "warning",
				className:
					"bg-warning relative hover:bg-warning-hover before:absolute before:inset-x-0 before:top-0 before:h-full before:bg-gradient-to-b before:from-transparent before:to-white/20 before:content-['']  focus-visible:ring-warning  focus-visible:outline-none shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-warning),0_3px_4px_-1px_var(--color-warning-border)]  overflow-hidden text-white font-medium",
			},
			{
				variant: "glossy-inverted",
				color: "error",
				className:
					"bg-error relative hover:bg-error-hover before:absolute before:inset-x-0 before:top-0 before:h-full before:bg-gradient-to-b before:from-transparent before:to-white/20 before:content-['']  focus-visible:ring-error  focus-visible:outline-none shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-error),0_3px_4px_-1px_var(--color-error-border)]  overflow-hidden text-white font-medium",
			},
			{
				variant: "glossy-inverted",
				color: "neutral",
				className:
					"bg-black-inverse relative hover:brightness-110 before:absolute before:inset-x-0 before:top-0 before:h-full before:bg-gradient-to-b before:from-white/20 before:to-transparent before:content-['']  focus-visible:ring-black-inverse  focus-visible:outline-none shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-black-inverse),0_3px_4px_-1px_var(--color-black-inverse)]  overflow-hidden text-white-inverse font-medium",
			},

			// smooth button
			{
				variant: "smooth",
				color: "primary",
				className:
					"relative font-medium text-primary-fg focus-visible:ring-primary  focus-visible:outline-none bg-primary overflow-hidden shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0_0_1px_var(--color-primary)] hover:brightness-110 after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-primary-hover after:to-primary after:-z-10 before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/16 before:pointer-events-none before:mask-b-from-98%",
			},
			{
				variant: "smooth",
				color: "info",
				className:
					"relative font-medium focus-visible:ring-info  focus-visible:outline-none text-white bg-info overflow-hidden shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0_0_1px_var(--color-info)] hover:brightness-110 after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-info-hover after:to-info after:-z-10 before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/16 before:pointer-events-none before:mask-b-from-98%",
			},
			{
				variant: "smooth",
				color: "success",
				className:
					"relative font-medium focus-visible:ring-success  focus-visible:outline-none text-white bg-success overflow-hidden shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0_0_1px_var(--color-success)] hover:brightness-110 after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-success-hover after:to-success after:-z-10 before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/16 before:pointer-events-none before:mask-b-from-98%",
			},
			{
				variant: "smooth",
				color: "warning",
				className:
					"relative font-medium focus-visible:ring-warning  focus-visible:outline-none text-white bg-warning overflow-hidden shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0_0_1px_var(--color-warning)] hover:brightness-110 after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-warning-hover after:to-warning after:-z-10 before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/16 before:pointer-events-none before:mask-b-from-98%",
			},

			{
				variant: "smooth",
				color: "error",
				className:
					"relative font-medium focus-visible:ring-error  focus-visible:outline-none text-white bg-error overflow-hidden shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0_0_1px_var(--color-error)] hover:brightness-110 after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-error-hover after:to-error after:-z-10 before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/16 before:pointer-events-none before:mask-b-from-98%",
			},
			{
				variant: "smooth",
				color: "neutral",
				className:
					"relative font-medium focus-visible:ring-black-inverse  focus-visible:outline-none text-white-inverse bg-black-inverse overflow-hidden shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0_0_1px_var(--color-white-inverse)] hover:opacity-95 after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-white/20 after:to-black-inverse after:-z-10 before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white-inverse/16 before:pointer-events-none before:mask-b-from-98%",
			},
			// smooth-inverted variants
			{
				variant: "smooth-inverted",
				color: "primary",
				className:
					"relative font-medium text-primary-fg focus-visible:ring-primary  focus-visible:outline-none bg-primary overflow-hidden shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0_0_1px_var(--color-primary)] hover:brightness-110 after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-primary after:to-primary-hover after:-z-10 before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/16 before:pointer-events-none before:mask-b-from-98%",
			},
			{
				variant: "smooth-inverted",
				color: "info",
				className:
					"relative font-medium text-white focus-visible:ring-info  focus-visible:outline-none bg-info overflow-hidden shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0_0_1px_var(--color-info)] hover:brightness-110 after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-info after:to-info-hover after:-z-10 before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/16 before:pointer-events-none before:mask-b-from-98%",
			},
			{
				variant: "smooth-inverted",
				color: "success",
				className:
					"relative font-medium text-white focus-visible:ring-success  focus-visible:outline-none bg-success overflow-hidden shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0_0_1px_var(--color-success)] hover:brightness-110 after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-success after:to-success-hover after:-z-10 before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/16 before:pointer-events-none before:mask-b-from-98%",
			},
			{
				variant: "smooth-inverted",
				color: "warning",
				className:
					"relative font-medium text-white focus-visible:ring-warning  focus-visible:outline-none bg-warning overflow-hidden shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0_0_1px_var(--color-warning)] hover:brightness-110 after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-warning after:to-warning-hover after:-z-10 before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/16 before:pointer-events-none before:mask-b-from-98%",
			},
			{
				variant: "smooth-inverted",
				color: "error",
				className:
					"relative font-medium text-white focus-visible:ring-error  focus-visible:outline-none bg-error overflow-hidden shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0_0_1px_var(--color-error)] hover:brightness-110 after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-error after:to-error-hover after:-z-10 before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/16 before:pointer-events-none before:mask-b-from-98%",
			},
			{
				variant: "smooth-inverted",
				color: "neutral",
				className:
					"relative font-medium focus-visible:ring-black-inverse  focus-visible:outline-none text-white-inverse bg-black-inverse overflow-hidden shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0_0_1px_var(--color-white-inverse)] hover:opacity-95 after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-black-inverse after:to-white/20 after:-z-10 before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white-inverse/16 before:pointer-events-none before:mask-b-from-98%",
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
	"inline-flex whitespace-nowrap items-center justify-center box-border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-bg disabled:pointer-events-none hover:cursor-pointer w-fit rounded-md",
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
			// Strong variant + colors
			{
				variant: "strong",
				color: "primary",
				className:
					"bg-primary font-medium text-primary-fg hover:bg-primary-hover focus-visible:ring-primary focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "info",
				className:
					"bg-info font-medium text-white hover:bg-info-hover focus-visible:ring-info focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "success",
				className:
					"bg-success font-medium text-white hover:bg-success-hover focus-visible:ring-success focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "error",
				className:
					"bg-error font-medium text-white hover:bg-error-hover focus-visible:ring-error focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "warning",
				className:
					"bg-warning font-medium text-white hover:bg-warning-hover focus-visible:ring-warning focus-visible:outline-none",
			},
			{
				variant: "strong",
				color: "neutral",
				className:
					"bg-black-inverse font-medium text-white-inverse hover:bg-fg-secondary focus-visible:ring-black-inverse focus-visible:outline-none",
			},

			// Soft variant + colors
			{
				variant: "soft",
				color: "primary",
				className:
					"bg-primary-accent font-medium text-primary-text hover:bg-primary-focus focus-visible:ring-primary-focus focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "info",
				className:
					"bg-info-accent font-medium text-info-text hover:bg-info-focus focus-visible:ring-info-focus focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "success",
				className:
					"bg-success-accent font-medium text-success-text hover:bg-success-focus focus-visible:ring-success-focus focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "error",
				className:
					"bg-error-accent font-medium text-error-text hover:bg-error-focus focus-visible:ring-error-focus focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "warning",
				className:
					"bg-warning-accent font-medium text-warning-text hover:bg-warning-focus focus-visible:ring-warning-focus focus-visible:outline-none",
			},
			{
				variant: "soft",
				color: "neutral",
				className:
					"bg-fill2 font-medium text-fg-secondary hover:bg-fill1-alpha focus-visible:bg-bg focus-visible:outline-none focus-visible:ring-border",
			},

			// Outline variant + colors
			{
				variant: "outline",
				color: "primary",
				className:
					"bg-transparent font-medium border border-primary-hover text-primary-text hover:bg-primary-accent focus-visible:ring-primary-hover",
			},
			{
				variant: "outline",
				color: "info",
				className:
					"bg-transparent font-medium border border-info-hover text-info-text hover:bg-info-accent focus-visible:ring-info-hover",
			},
			{
				variant: "outline",
				color: "success",
				className:
					"bg-transparent font-medium border border-success-hover text-success-text hover:bg-success-accent focus-visible:ring-success-hover",
			},
			{
				variant: "outline",
				color: "error",
				className:
					"bg-transparent font-medium border border-error-hover text-error-text hover:bg-error-accent focus-visible:ring-error-hover",
			},
			{
				variant: "outline",
				color: "warning",
				className:
					"bg-transparent font-medium border border-warning-hover text-warning-text hover:bg-warning-accent focus-visible:ring-warning-hover",
			},
			{
				variant: "outline",
				color: "neutral",
				className:
					"bg-elevation-level1 font-medium text-fg-secondary border border-border hover:bg-fill1-alpha focus-visible:ring-border",
			},

			// Ghost variant + colors
			{
				variant: "ghost",
				color: "primary",
				className:
					"bg-transparent text-primary-text font-medium hover:bg-primary-focus focus-visible:outline-none focus-visible:ring-primary-focus",
			},
			{
				variant: "ghost",
				color: "info",
				className:
					"bg-transparent text-info-text font-medium hover:bg-info-focus focus-visible:outline-none focus-visible:ring-info-focus",
			},
			{
				variant: "ghost",
				color: "success",
				className:
					"bg-transparent text-success-text font-medium hover:bg-success-focus focus-visible:outline-none focus-visible:ring-success-focus",
			},
			{
				variant: "ghost",
				color: "error",
				className:
					"bg-transparent text-error-text font-medium hover:bg-error-focus focus-visible:outline-none focus-visible:ring-error-focus",
			},
			{
				variant: "ghost",
				color: "warning",
				className:
					"bg-transparent text-warning-text font-medium hover:bg-warning-focus focus-visible:outline-none focus-visible:ring-warning-focus",
			},
			{
				variant: "ghost",
				color: "neutral",
				className:
					"bg-transparent text-fg-secondary font-medium hover:bg-fill1 focus-visible:outline-none focus-visible:ring-border",
			},
			{
				variant: "glossy",
				color: "primary",
				className:
					"before:absolute before:inset-0 before:border before:border-white/44 bg-primary before:pointer-events-none before:bg-gradient-to-b before:from-white/20 before:to-transparent hover:bg-primary-hover  focus-visible:ring-primary  focus-visible:outline-none shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-primary),0_3px_4px_-1px_var(--color-primary-border)]  overflow-hidden hover:brightness-110 before:mask-b-from-0%  text-primary-fg font-medium before:rounded-[inherit]",
			},

			{
				variant: "glossy",
				color: "info",
				className:
					"before:absolute before:inset-0 before:border before:border-white/44 bg-info before:pointer-events-none before:bg-gradient-to-b before:from-white/20 before:to-transparent hover:bg-info-hover  focus-visible:ring-info  focus-visible:outline-none shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-info),0_3px_4px_-1px_var(--color-info-border)]  overflow-hidden hover:brightness-110 before:mask-b-from-0%  text-white font-medium before:rounded-[inherit]",
			},
			{
				variant: "glossy",
				color: "success",
				className:
					"before:absolute before:inset-0 before:border before:border-white/44 bg-success before:pointer-events-none before:bg-gradient-to-b before:from-white/20 before:to-transparent hover:bg-success-hover  focus-visible:ring-success  focus-visible:outline-none shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-success),0_3px_4px_-1px_var(--color-success-border)]  overflow-hidden hover:brightness-110 before:mask-b-from-0%  text-white font-medium before:rounded-[inherit]",
			},
			{
				variant: "glossy",
				color: "warning",
				className:
					"before:absolute before:inset-0 before:border before:border-white/44 bg-warning before:pointer-events-none before:bg-gradient-to-b before:from-white/20 before:to-transparent hover:bg-warning-hover  focus-visible:ring-warning  focus-visible:outline-none shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-warning),0_3px_4px_-1px_var(--color-warning-border)]  overflow-hidden hover:brightness-110 before:mask-b-from-0%  text-white font-medium before:rounded-[inherit]",
			},
			{
				variant: "glossy",
				color: "error",
				className:
					"before:absolute before:inset-0 before:border before:border-white/44 bg-error before:pointer-events-none before:bg-gradient-to-b before:from-white/20 before:to-transparent hover:bg-error-hover  focus-visible:ring-error  focus-visible:outline-none shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-error),0_3px_4px_-1px_var(--color-error-border)]  overflow-hidden hover:brightness-110 before:mask-b-from-0%  text-white font-medium before:rounded-[inherit]",
			},
			{
				variant: "glossy",
				color: "neutral",
				className:
					"before:absolute before:inset-0 focus-visible:ring-black-inverse focus-visible:outline-none before:border overflow-hidden before:border-white-inverse/16 before:mask-b-from-0% bg-black-inverse  bg-linear-to-t from-white/0 to-white/20 text-white-inverse font-medium before:rounded-[inherit]  hover:opacity-90  shadow-[0_0_0_1px_var(--color-black-inverse),0_3px_4px_-1px_var(--color-black-inverse)]",
			},

			// glossy-inverted + colors
			{
				variant: "glossy-inverted",
				color: "primary",
				className:
					"before:absolute before:inset-0 focus-visible:ring-primary hover:bg-primary-hover bg-primary focus-visible:outline-none before:border overflow-hidden before:border-white/44 before:mask-b-from-0%   text-primary-fg font-medium before:rounded-[inherit] before:bg-gradient-to-b before:from-transparent before:to-white/20  shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-primary),0_3px_4px_-1px_var(--color-primary-border)]",
			},

			{
				variant: "glossy-inverted",
				color: "info",
				className:
					"before:absolute before:inset-0 focus-visible:ring-info hover:bg-info-hover bg-info focus-visible:outline-none before:border overflow-hidden before:border-white/44 before:mask-b-from-0%   text-white font-medium before:rounded-[inherit] before:bg-gradient-to-b before:from-transparent before:to-white/20  shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-info),0_3px_4px_-1px_var(--color-info-border)]",
			},
			{
				variant: "glossy-inverted",
				color: "success",
				className:
					"before:absolute before:inset-0 focus-visible:ring-success hover:bg-success-hover bg-success focus-visible:outline-none before:border overflow-hidden before:border-white/44 before:mask-b-from-0%   text-white font-medium before:rounded-[inherit] before:bg-gradient-to-b before:from-transparent before:to-white/20  shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-success),0_3px_4px_-1px_var(--color-success-border)]",
			},
			{
				variant: "glossy-inverted",
				color: "warning",
				className:
					"before:absolute before:inset-0 focus-visible:ring-warning hover:bg-warning-hover bg-warning focus-visible:outline-none before:border overflow-hidden before:border-white/44 before:mask-b-from-0%   text-white font-medium before:rounded-[inherit] before:bg-gradient-to-b before:from-transparent before:to-white/20  shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-warning),0_3px_4px_-1px_var(--color-warning-border)]",
			},
			{
				variant: "glossy-inverted",
				color: "error",
				className:
					"before:absolute before:inset-0 focus-visible:ring-error hover:bg-error-hover bg-error focus-visible:outline-none before:border overflow-hidden before:border-white/44 before:mask-b-from-0%   text-white font-medium before:rounded-[inherit] before:bg-gradient-to-b before:from-transparent before:to-white/20  shadow-[0_1px_0_0_rgba(255,255,255,0.32)_inset,0_0_0_1px_var(--color-error),0_3px_4px_-1px_var(--color-error-border)]",
			},
			{
				variant: "glossy-inverted",
				color: "neutral",
				className:
					"before:absolute before:inset-0 focus-visible:ring-black-inverse focus-visible:outline-none before:border overflow-hidden before:border-white-inverse/16 before:mask-b-from-0% bg-black-inverse  bg-linear-to-t from-white/20 to-white/0 text-white-inverse font-medium before:rounded-[inherit]  hover:opacity-90  shadow-[0_0_0_1px_var(--color-black-inverse),0_3px_4px_-1px_var(--color-black-inverse)]",
			},

			// smooth button
			{
				variant: "smooth",
				color: "primary",
				className:
					"before:absolute before:bg-gradient-to-b before:from-primary-hover before:to-primary before:mask-b-from-98% bg-primary  before:inset-0 shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0px_0px_1px_var(--color-primary)] focus-visible:ring-primary focus-visible:outline-none before:border overflow-hidden before:border-white/16  hover:brightness-110 before:-z-10 text-primary-fg font-medium before:rounded-[inherit]",
			},
			{
				variant: "smooth",
				color: "info",
				className:
					"before:absolute before:bg-gradient-to-b before:from-info-hover before:to-info before:mask-b-from-98% bg-info  before:inset-0 shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0px_0px_1px_var(--color-info)] focus-visible:ring-info focus-visible:outline-none before:border overflow-hidden before:border-white/16  hover:brightness-110 before:-z-10 text-white font-medium before:rounded-[inherit]",
			},
			{
				variant: "smooth",
				color: "success",
				className:
					"before:absolute before:bg-gradient-to-b before:from-success-hover before:to-success before:mask-b-from-98% bg-success  before:inset-0 shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0px_0px_1px_var(--color-success)] focus-visible:ring-success focus-visible:outline-none before:border overflow-hidden before:border-white/16  hover:brightness-110 before:-z-10 text-white font-medium before:rounded-[inherit]",
			},
			{
				variant: "smooth",
				color: "warning",
				className:
					"before:absolute before:bg-gradient-to-b before:from-warning-hover before:to-warning before:mask-b-from-98% bg-warning  before:inset-0 shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0px_0px_1px_var(--color-warning)] focus-visible:ring-warning focus-visible:outline-none before:border overflow-hidden before:border-white/16  hover:brightness-110 before:-z-10 text-white font-medium before:rounded-[inherit]",
			},

			{
				variant: "smooth",
				color: "error",
				className:
					"before:absolute before:bg-gradient-to-b before:from-error-hover before:to-error before:mask-b-from-98% bg-error  before:inset-0 shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0px_0px_1px_var(--color-error)] focus-visible:ring-error focus-visible:outline-none before:border overflow-hidden before:border-white/16  hover:brightness-110 before:-z-10 text-white font-medium before:rounded-[inherit]",
			},
			{
				variant: "smooth",
				color: "neutral",
				className:
					"before:absolute before:inset-px focus-visible:ring-black-inverse focus-visible:outline-none before:border overflow-hidden before:border-white-inverse/16 before:mask-b-from-98% bg-black-inverse  bg-linear-to-t from-white/0 to-white/20 text-white-inverse font-medium before:rounded-[inherit]  hover:before:bg-black-inverse/30",
			},
			// smooth-inverted variants
			{
				variant: "smooth-inverted",
				color: "primary",
				className:
					"before:absolute before:bg-gradient-to-b before:from-primary before:to-primary-hover before:mask-b-from-98% bg-primary  before:inset-0 shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0px_0px_1px_var(--color-primary)] focus-visible:ring-primary focus-visible:outline-none before:border overflow-hidden before:border-white/16  hover:brightness-110 before:-z-10 text-primary-fg font-medium before:rounded-[inherit]",
			},
			{
				variant: "smooth-inverted",
				color: "info",
				className:
					"before:absolute before:bg-gradient-to-b before:from-info before:to-info-hover before:mask-b-from-98% bg-info  before:inset-0 shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0px_0px_1px_var(--color-info)] focus-visible:ring-info focus-visible:outline-none before:border overflow-hidden before:border-white/16  hover:brightness-110 before:-z-10 text-white font-medium before:rounded-[inherit]",
			},
			{
				variant: "smooth-inverted",
				color: "success",
				className:
					"before:absolute before:bg-gradient-to-b before:from-success before:to-success-hover before:mask-b-from-98% bg-success  before:inset-0 shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0px_0px_1px_var(--color-success)] focus-visible:ring-success focus-visible:outline-none before:border overflow-hidden before:border-white/16  hover:brightness-110 before:-z-10 text-white font-medium before:rounded-[inherit]",
			},
			{
				variant: "smooth-inverted",
				color: "warning",
				className:
					"before:absolute before:bg-gradient-to-b before:from-warning before:to-warning-hover before:mask-b-from-98% bg-warning  before:inset-0 shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0px_0px_1px_var(--color-warning)] focus-visible:ring-warning focus-visible:outline-none before:border overflow-hidden before:border-white/16  hover:brightness-110 before:-z-10 text-white font-medium before:rounded-[inherit]",
			},
			{
				variant: "smooth-inverted",
				color: "error",
				className:
					"before:absolute before:bg-gradient-to-b before:from-error before:to-error-hover before:mask-b-from-98% bg-error before:inset-0 shadow-[0_4px_4px_0_rgba(9,10,11,0.16),0_0px_0px_1px_var(--color-error)] focus-visible:ring-error focus-visible:outline-none before:border overflow-hidden before:border-white/16  hover:brightness-110 before:-z-10 text-white font-medium before:rounded-[inherit]",
			},
			{
				variant: "smooth",
				color: "neutral",
				className:
					"before:absolute before:inset-px focus-visible:ring-black-inverse focus-visible:outline-none before:border overflow-hidden before:border-white-inverse/16 before:mask-b-from-98% bg-black-inverse  bg-linear-to-b from-white/0 to-white/20 text-white-inverse font-medium before:rounded-[inherit]  hover:before:bg-black-inverse/30",
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
			"28": "[&>svg]:size-4 rounded-md size-7 p-1.5",
			"32": "[&>svg]:size-4.5 rounded-md size-8 p-1.75",
			"36": "[&>svg]:size-5 rounded-lg size-9 p-2",
			"40": "[&>svg]:size-5 rounded-lg size-10 p-2.5",
			"44": "[&>svg]:size-5 rounded-lg size-11 p-3",
			"48": "[&>svg]:size-6 rounded-lg size-12 p-3",
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
