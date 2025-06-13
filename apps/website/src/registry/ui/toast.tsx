import React from "react"
import { VariantProps, cva } from "class-variance-authority"
import { Box } from "lucide-react"
import { Toaster as Sonner, toast } from "sonner"
import { Button } from "./button"

type ButtonType = {
	label: string
	onClick: (id: string | number) => void
	className?: string
	dismiss?: boolean
}
type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center"

type ToastProps = {
	title?: string
	icon?: React.ReactNode
	description?: string
	buttons?: ButtonType[]
	duration?: number
	variant?: VariantType
	content?: React.ReactNode
	closable?: boolean
	position?: Position
	stack?: boolean
	visibleToasts?: number
	customContent?: React.ReactNode
	applyDefaultStyling?: boolean
	// New boolean flag to determine if it's a custom toast
	isCustom?: boolean

	// Custom content specific options
	closeOnClick?: boolean // Whether clicking anywhere on the toast closes it
	showCloseButton?: boolean
}

// Variant styles
const SonnerVariant = cva(" group toast rounded-lg flex items-center justify-center gap-2 p-3 w-full h-auto text-xl group-[.toaster]:text-text-secondary", {
	variants: {
		variant: {
			default: " bg-bg-level2 text-white",
			success: "bg-success text-white!",
			error: "bg-error text-white!",
			warning: "bg-warning text-white!",
			information: "bg-info text-white!",
		},
	},
	defaultVariants: {
		variant: "default",
	},
})

// Define the type for the toast variant
type VariantType = VariantProps<typeof SonnerVariant>["variant"]

// Minimal container for custom content
const CustomContentContainer = cva("group toast rounded-lg w-full h-auto", {
	variants: {
		styled: {
			true: "p-3 bg-[#565861] text-white",
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
	variant = "default",
	applyDefaultStyling = false,
	closeOnClick = false,
	showCloseButton,
	duration = 20000,
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
							<button
								onClick={(e) => {
									e.stopPropagation() // Prevent triggering closeOnClick
									toast.dismiss(toastId)
								}}
								className="absolute right-2 top-2 z-10 cursor-pointer rounded-full bg-white/20 p-1 text-gray-500 transition-colors hover:bg-white/30 hover:text-gray-700"
								aria-label="Close toast">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round">
									<path d="M18 6 6 18" />
									<path d="m6 6 12 12" />
								</svg>
							</button>
						)}
					</div>
				)
			}

			// Default structured toast
			return (
				<div className={SonnerVariant({ variant })}>
					<Box />
					{/* Content */}
					<div className="flex-1">
						{title && <div className="mb-1 text-sm font-semibold">{title}</div>}
						{description && <div className="text-sm opacity-90">{description}</div>}
					</div>

					{/* Buttons */}
					{buttons.length > 0 && (
						<div className="flex gap-2">
							{buttons.map((button, index) => (
								<Button
									key={index}
									size="36"
									variant="ghost"
									className={`p-0 text-xs text-white`}
									onClick={() => {
										button.onClick(t)
										if (button.dismiss !== false) {
											toast.dismiss(t)
										}
									}}>
									{button.label}
								</Button>
							))}
						</div>
					)}

					{/* Close button */}
					{closable && (
						<div
							onClick={function () {
								toast.dismiss(toastId)
							}}
							className={`cursor-pointer`}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round">
								<path d="M18 6 6 18" />
								<path d="m6 6 12 12" />
							</svg>
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
const toastClass = cva("group !p-0 w-106 rounded-lg toast group-[.toaster]:text-text-secondary", {
	variants: {
		position: {
			bottom: "group-[.toaster]:!shadow-[0_-10px_10px_-5px_rgba(0,0,0,0.1),0_-10px_10px_-5px_rgba(0,0,0,0.04)]",
			top: "group-[.toaster]:!shadow-[0_10px_10px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]",
		},
	},
	defaultVariants: {
		position: "bottom",
	},
})

// The Toaster component
export const Toaster = function ({ ...props }: ToasterProps) {
	return (
		<Sonner
			className="toaster group"
			toastOptions={{
				classNames: {
					toast: toastClass({
						position: props.position?.charAt(0) === "b" ? "bottom" : "top",
					}),
				},
			}}
			{...props}
		/>
	)
}
