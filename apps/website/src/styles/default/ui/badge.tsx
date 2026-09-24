import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

export type BadgeProps = Omit<React.HTMLAttributes<HTMLDivElement>, "color"> &
	VariantProps<typeof badgeVariants> & {
		asChild?: boolean
	}

export type BadgeDotProps = React.HTMLAttributes<HTMLSpanElement>

const badgeVariants = cva(
	"inline-flex items-center font-medium w-fit whitespace-nowrap transition duration-200 gap-0.5",
	{
		variants: {
			variant: {
				strong: "",
				outline: "",
				soft: "",
			},
			size: {
				"20": "h-5 px-1 text-xs rounded-md [&_svg]:size-3",
				"24": "h-6 px-1.5 text-[13px] rounded-md [&_svg]:size-3.5",
				"28": "h-7 px-1.5 text-sm rounded-md [&_svg]:size-4",
			},
			color: {
				primary: "",
				info: "",
				success: "",
				error: "",
				warning: "",
				neutral: "bg-elevation-level1 border-alpha",
				red: "",
				orange: "",
				amber: "",
				yellow: "",
				neon: "",
				green: "",
				emerald: "",
				teal: "",
				cyan: "",
				"light-blue": "",
				blue: "",
				"violet-blue": "",
				purple: "",
				"dark-orchid": "",
				fuchsia: "",
				magenta: "",
				rose: "",
			},
		},
		defaultVariants: {
			variant: "outline",
			size: "24",
			color: "neutral",
		},
		compoundVariants: [
			// strong
			{
				variant: "strong",
				color: "primary",
				className: "bg-primary text-primary-fg  border border-alpha",
			},
			{
				variant: "strong",
				color: "info",
				className: "bg-info text-info-fg border border-alpha",
			},
			{
				variant: "strong",
				color: "success",
				className: "bg-success text-success-fg border border-alpha",
			},
			{
				variant: "strong",
				color: "error",
				className: "bg-error text-error-fg border border-alpha",
			},
			{
				variant: "strong",
				color: "warning",
				className: "bg-warning text-warning-fg border border-alpha",
			},
			{
				variant: "strong",
				color: "neutral",
				className:
					"bg-black-inverse border border-alpha text-white-inverse font-medium",
			},
			// outline
			{
				variant: "outline",
				color: "primary",
				className:
					"text-primary-text border border-primary-border bg-transparent",
			},
			{
				variant: "outline",
				color: "info",
				className: "text-info-text border border-info-border bg-transparent",
			},
			{
				variant: "outline",
				color: "success",
				className:
					"text-success-text border border-success-border bg-transparent",
			},
			{
				variant: "outline",
				color: "error",
				className: "text-error-text border border-error-border bg-transparent",
			},
			{
				variant: "outline",
				color: "warning",
				className:
					"text-warning-text border border-warning-border bg-transparent",
			},
			{
				variant: "outline",
				color: "neutral",
				className: "text-fg border bg-transparent",
			},
			// soft
			{
				variant: "soft",
				color: "primary",
				className: "bg-primary-accent text-primary-text border-soft-alpha",
			},
			{
				variant: "soft",
				color: "info",
				className: "bg-info-accent text-info-text border-soft-alpha",
			},
			{
				variant: "soft",
				color: "success",
				className: "bg-success-accent text-success-text border-soft-alpha",
			},
			{
				variant: "soft",
				color: "error",
				className: "bg-error-accent text-error-text border-soft-alpha",
			},
			{
				variant: "soft",
				color: "warning",
				className: "bg-warning-accent text-warning-text border-soft-alpha",
			},
			{
				variant: "soft",
				color: "neutral",
				className: "bg-fill2 text-fg border-soft-alpha",
			},
			// utility colors (soft)
			{
				variant: "soft",
				color: "red",
				className: "bg-red-accent text-red-text border-soft-alpha",
			},
			{
				variant: "soft",
				color: "orange",
				className: "bg-orange-accent text-orange-text border-soft-alpha",
			},
			{
				variant: "soft",
				color: "amber",
				className: "bg-amber-accent text-amber-text border-soft-alpha",
			},
			{
				variant: "soft",
				color: "yellow",
				className: "bg-yellow-accent text-yellow-text border-soft-alpha",
			},
			{
				variant: "soft",
				color: "neon",
				className: "bg-neon-accent text-neon-text border-soft-alpha",
			},
			{
				variant: "soft",
				color: "green",
				className: "bg-green-accent text-green-text border-soft-alpha",
			},
			{
				variant: "soft",
				color: "emerald",
				className: "bg-emerald-accent text-emerald-text border-soft-alpha",
			},
			{
				variant: "soft",
				color: "teal",
				className: "bg-teal-accent text-teal-text border-soft-alpha",
			},
			{
				variant: "soft",
				color: "cyan",
				className: "bg-cyan-accent text-cyan-text border-soft-alpha",
			},
			{
				variant: "soft",
				color: "light-blue",
				className:
					"bg-light-blue-accent text-light-blue-text border-soft-alpha",
			},
			{
				variant: "soft",
				color: "blue",
				className: "bg-blue-accent text-blue-text border-soft-alpha",
			},
			{
				variant: "soft",
				color: "violet-blue",
				className:
					"bg-violet-blue-accent text-violet-blue-text border-soft-alpha",
			},
			{
				variant: "soft",
				color: "purple",
				className: "bg-purple-accent text-purple-text border-soft-alpha",
			},
			{
				variant: "soft",
				color: "dark-orchid",
				className:
					"bg-dark-orchid-accent text-dark-orchid-text border-soft-alpha",
			},
			{
				variant: "soft",
				color: "fuchsia",
				className: "bg-fuchsia-accent text-fuchsia-text border-soft-alpha",
			},
			{
				variant: "soft",
				color: "magenta",
				className: "bg-magenta-accent text-magenta-text border-soft-alpha",
			},
			{
				variant: "soft",
				color: "rose",
				className: "bg-rose-accent text-rose-text border-soft-alpha",
			},

			// utility colors (strong)
			{ variant: "strong", color: "red", className: "bg-red text-red-fg" },
			{
				variant: "strong",
				color: "orange",
				className: "bg-orange text-orange-fg",
			},
			{
				variant: "strong",
				color: "amber",
				className: "bg-amber text-amber-fg",
			},
			{
				variant: "strong",
				color: "yellow",
				className: "bg-yellow text-yellow-fg",
			},
			{ variant: "strong", color: "neon", className: "bg-neon text-neon-fg" },
			{
				variant: "strong",
				color: "green",
				className: "bg-green text-green-fg",
			},
			{
				variant: "strong",
				color: "emerald",
				className: "bg-emerald text-emerald-fg",
			},
			{ variant: "strong", color: "teal", className: "bg-teal text-teal-fg" },
			{ variant: "strong", color: "cyan", className: "bg-cyan text-cyan-fg" },
			{
				variant: "strong",
				color: "light-blue",
				className: "bg-light-blue text-light-blue-fg",
			},
			{ variant: "strong", color: "blue", className: "bg-blue text-blue-fg" },
			{
				variant: "strong",
				color: "violet-blue",
				className: "bg-violet-blue text-violet-blue-fg",
			},
			{
				variant: "strong",
				color: "purple",
				className: "bg-purple text-purple-fg",
			},
			{
				variant: "strong",
				color: "dark-orchid",
				className: "bg-dark-orchid text-dark-orchid-fg",
			},
			{
				variant: "strong",
				color: "fuchsia",
				className: "bg-fuchsia text-fuchsia-fg",
			},
			{
				variant: "strong",
				color: "magenta",
				className: "bg-magenta text-magenta-fg",
			},
			{ variant: "strong", color: "rose", className: "bg-rose text-rose-fg" },

			// utility colors (outline)
			{
				variant: "outline",
				color: "red",
				className: "text-red-text border border-red-border bg-transparent",
			},
			{
				variant: "outline",
				color: "orange",
				className:
					"text-orange-text border border-orange-border bg-transparent",
			},
			{
				variant: "outline",
				color: "amber",
				className: "text-amber-text border border-amber-border bg-transparent",
			},
			{
				variant: "outline",
				color: "yellow",
				className:
					"text-yellow-text border border-yellow-border bg-transparent",
			},
			{
				variant: "outline",
				color: "neon",
				className: "text-neon-text border border-neon-border bg-transparent",
			},
			{
				variant: "outline",
				color: "green",
				className: "text-green-text border border-green-border bg-transparent",
			},
			{
				variant: "outline",
				color: "emerald",
				className:
					"text-emerald-text border border-emerald-border bg-transparent",
			},
			{
				variant: "outline",
				color: "teal",
				className: "text-teal-text border border-teal-border bg-transparent",
			},
			{
				variant: "outline",
				color: "cyan",
				className: "text-cyan-text border border-cyan-border bg-transparent",
			},
			{
				variant: "outline",
				color: "light-blue",
				className:
					"text-light-blue-text border border-light-blue-border bg-transparent",
			},
			{
				variant: "outline",
				color: "blue",
				className: "text-blue-text border border-blue-border bg-transparent",
			},
			{
				variant: "outline",
				color: "violet-blue",
				className:
					"text-violet-blue-text border border-violet-blue-border bg-transparent",
			},
			{
				variant: "outline",
				color: "purple",
				className:
					"text-purple-text border border-purple-border bg-transparent",
			},
			{
				variant: "outline",
				color: "dark-orchid",
				className:
					"text-dark-orchid-text border border-dark-orchid-border bg-transparent",
			},
			{
				variant: "outline",
				color: "fuchsia",
				className:
					"text-fuchsia-text border border-fuchsia-border bg-transparent",
			},
			{
				variant: "outline",
				color: "magenta",
				className:
					"text-magenta-text border border-magenta-border bg-transparent",
			},
			{
				variant: "outline",
				color: "rose",
				className: "text-rose-text border border-rose-border bg-transparent",
			},
		],
	}
)

function Badge({
	className,
	variant,
	size,
	color,
	asChild = false,
	children,
	...props
}: BadgeProps) {
	const wrappedChildren = React.Children.map(children, (child) =>
		typeof child === "string" ? <span className="px-0.5">{child}</span> : child
	)

	if (asChild) {
		return (
			<Slot
				className={cn(badgeVariants({ variant, size, color }), className)}
				{...props}>
				{children}
			</Slot>
		)
	}

	return (
		<span
			className={cn(badgeVariants({ variant, size, color }), className)}
			{...props}>
			{wrappedChildren}
		</span>
	)
}

Badge.displayName = "Badge"

function BadgeDot({ className, ...props }: BadgeDotProps) {
	return (
		<span className="flex shrink-0 p-0.75">
			<span
				data-slot="badge-dot"
				className={cn(
					"bg-fg-disabled size-1.5 shrink-0 rounded-full",
					className
				)}
				{...props}
			/>
		</span>
	)
}

export { Badge, BadgeDot, badgeVariants }
