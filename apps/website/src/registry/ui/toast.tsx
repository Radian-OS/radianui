import React from "react"
import { VariantProps, cva } from "class-variance-authority"
import { X } from "lucide-react"
import Link from "next/link"
import { Toaster as Sonner, toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "./button"

type ButtonType = {
	label: string
	onClick: (id: string | number) => void
	className?: string
	dismiss?: boolean
	href?: string // Add href property for links
}

type ToastProps = {
	title?: string
	icon?: React.ReactNode
	state?: VariantType
	description?: string
	buttons?: ButtonType[]
	duration?: number
	variant?: "outline" | "strong" | "inverse"
	content?: React.ReactNode
	closable?: boolean
	stack?: boolean
	visibleToasts?: number
	placement?: "horizontal" | "vertical"
	customContent?: React.ReactNode
	applyDefaultStyling?: boolean
	// New boolean flag to determine if it's a custom toast
	isCustom?: boolean

	// Custom content specific options
	closeOnClick?: boolean // Whether clicking anywhere on the toast closes it
	showCloseButton?: boolean
}

// Variant styles
const SonnerVariant = cva("group toast rounded-lg flex justify-between text-sm gap-1 p-2.5 ", {
	variants: {
		state: {
			neutral: "",
			primary: "",
			success: "",
			error: "",
			warning: "",
			info: "",
		},
		variant: {
			outline: "bg-bg-level1 border border-border group-[.toaster]:text-text-secondary",
			strong: "",
			inverse: " bg-inverse-black group-[.toaster]:text-text-inverse",
		},
		placement: {
			horizontal: "items-center",
			vertical: "items-start",
		},
	},
	compoundVariants: [
		// Apply state colors only when variant is "strong"
		{
			variant: "strong",
			state: "primary",
			class: "bg-primary text-static-white",
		},
		{
			variant: "strong",
			state: "neutral",
			class: "bg-static-black !text-white relative before:absolute before:inset-0 before:!bg-bg-alpha-4 overflow-hidden before:pointer-events-none",
		},
		{
			variant: "strong",
			state: "success",
			class: "bg-success text-static-white",
		},
		{
			variant: "strong",
			state: "error",
			class: "bg-error text-static-white",
		},
		{
			variant: "strong",
			state: "warning",
			class: "bg-warning text-static-white",
		},
		{
			variant: "strong",
			state: "info",
			class: "bg-info text-static-white",
		},
	],
	defaultVariants: {
		state: "neutral",
		variant: "outline",
		placement: "vertical",
	},
})

// Define the type for the toast variant
type VariantType = VariantProps<typeof SonnerVariant>["state"]

// Helper function to get icon color class based on variant and state
const getIconColorClass = (variant?: string, state?: string): string => {
	if (variant === "strong") {
		// For strong variant, icons are always white
		if (state === "neutral") {
			return "text-statiC-white"
		}
		return "text-static-white"
	} else if (variant === "outline") {
		// For neutral and inverse variants, use state color
		return state ? `text-${state}` : ""
	} else if (variant === "inverse") {
		const stateHoverColors = {
			primary: "text-primary-hover",
			error: "text-error-hover",
			success: "text-success-hover",
			warning: "text-warning-hover",
			info: "text-info-hover",
		}
		return (state && stateHoverColors[state as keyof typeof stateHoverColors]) || ""
	}
	return "text-static-black dark:text-static-white"
}

// Minimal container for custom content
const CustomContentContainer = cva("group toast rounded-lg w-full h-auto", {
	variants: {
		styled: {
			true: "p-3 bg-gray-500 text-white",
			false: "p-0 bg-transparent",
		},
	},
	defaultVariants: {
		styled: false,
	},
})

// Main consolidated toast function
export function showToast({
	title,
	customContent,
	description,
	variant,
	state = "neutral",
	applyDefaultStyling = false,
	closeOnClick = false,
	showCloseButton,
	icon,
	duration,
	placement = "horizontal",
	buttons = [],
	closable = true,
	isCustom = false, // New parameter with default false
}: ToastProps): string | number {
	const toastId = toast.custom(
		(t) => {
			// If isCustom is true OR customContent is provided, render custom toast
			if (isCustom || customContent) {
				const shouldShowCloseButton = showCloseButton !== undefined ? showCloseButton : closable

				return (
					<div
						className={`${CustomContentContainer({ styled: applyDefaultStyling })} ${closeOnClick ? "cursor-pointer" : ""} relative`}
						onClick={closeOnClick ? () => toast.dismiss(toastId) : undefined}>
						{customContent}
						{/* Optional close button for custom content */}
						{shouldShowCloseButton && (
							<Button
								isIcon
								onClick={(e) => {
									e.stopPropagation() // Prevent triggering closeOnClick
									toast.dismiss(toastId)
								}}
								className="absolute right-2 top-2 z-10 cursor-pointer rounded-full"
								aria-label="Close toast">
								<X className="size-4" />
							</Button>
						)}
					</div>
				)
			}

			// Apply color class to icon if it exists
			const coloredIcon =
				icon && React.isValidElement(icon)
					? React.cloneElement(icon as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
							...(icon.props || {}),
							className: cn((icon.props && (icon.props as React.HTMLAttributes<HTMLElement>).className) || "", getIconColorClass(variant, state ?? undefined)),
						})
					: icon

			// Default structured toast
			return (
				<div className={SonnerVariant({ state, variant, placement })}>
					{coloredIcon}
					<div
						className={cn("flex", {
							"flex-col items-start gap-1.5": placement === "vertical",
							"flex-row items-center gap-2": placement === "horizontal",
						})}>
						{/* Content */}
						<div className="gap-0.5 px-1">
							{title && (
								<div
									className={cn("font-medium", {
										"text-text": variant === "outline",
										"text-text-inverse": variant === "inverse",
									})}>
									{title}
								</div>
							)}
							{description && <div className={cn("w-47", {})}>{description}</div>}
						</div>

						{/* Buttons */}
						{buttons.length > 0 && (
							<div className="flex gap-3 px-1">
								{buttons.map((button, index) => (
									<Link
										href={button.href || ""} // Use the href from button or fallback to empty string
										className="inline-flex h-5 items-center" // Set specific height
										key={index}
										onClick={() => {
											button.onClick(t)
											if (button.dismiss !== false) {
												toast.dismiss(t)
											}
										}}>
										<span
											className={cn("font-inter whitespace-nowrap font-medium tracking-tight underline", {
												"text-text": variant === "outline",
												"text-text-inverse": variant === "inverse",
											})}>
											{button.label}
										</span>
									</Link>
								))}
							</div>
						)}
					</div>

					{/* Close button */}
					{closable && (
						<div
							onClick={function () {
								toast.dismiss(toastId)
							}}
							className={`flex cursor-pointer items-center justify-center p-0.5`}>
							<X className="size-4" />
						</div>
					)}
				</div>
			)
		},
		{
			duration,
		}
	)
	return toastId
}

// For structured toasts (backward compatibility)
export function showStructuredToast(options: Omit<ToastProps, "customContent">) {
	return showToast(options)
}

// For completely custom toasts (backward compatibility - now uses isCustom flag)
export function showCustomToast(
	content: React.ReactNode,
	options?: Partial<Pick<ToastProps, "duration" | "closable" | "applyDefaultStyling" | "closeOnClick" | "showCloseButton">>
) {
	return showToast({
		customContent: content,
		isCustom: true, // Set the flag to true
		duration: options?.duration,
		closable: options?.closable,
		applyDefaultStyling: options?.applyDefaultStyling,
		closeOnClick: options?.closeOnClick,
		showCloseButton: options?.showCloseButton,
	})
}

// Define the props for the Toaster component
type ToasterProps = React.ComponentProps<typeof Sonner> & {
	bgColor?: string | null
}

// Define the styles for the toaster using `class-variance-authority`
const toastClass = cva("group !p-0 rounded-lg toast group-[.toaster]:text-text-secondary", {
	variants: {
		position: {
			// Center positions get the negative margin
			"top-center": "md:ml-[-1.5rem] group-[.toaster]:!shadow-[0px_-4px_8px_0px_rgba(25,24,27,0.08)]",
			"bottom-center": "md:ml-[-1.5rem] group-[.toaster]:!shadow-[0px_4px_8px_0px_rgba(25,24,27,0.08)]",

			// Other positions without negative margin
			"top-left": "group-[.toaster]:!shadow-[0px_-4px_8px_0px_rgba(25,24,27,0.08)]",
			"top-right": "group-[.toaster]:!shadow-[0px_-4px_8px_0px_rgba(25,24,27,0.08)]",
			"bottom-left": "group-[.toaster]:!shadow-[0px_4px_8px_0px_rgba(25,24,27,0.08)]",
			"bottom-right": "group-[.toaster]:!shadow-[0px_4px_8px_0px_rgba(25,24,27,0.08)]",
		},
	},
	defaultVariants: {
		position: "bottom-right", // Set your preferred default
	},
})

// The Toaster component
export const Toaster = function ({ ...props }: ToasterProps) {
	return (
		<Sonner
			className={`toaster group`}
			gap={10}
			offset={16}
			toastOptions={{
				classNames: {
					toast: toastClass({
						position: props.position,
					}),
				},
			}}
			{...props}
		/>
	)
}
