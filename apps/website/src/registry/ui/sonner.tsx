import React from "react"
import { VariantProps, cva } from "class-variance-authority"
import { Box } from "lucide-react"
import { Toaster as Sonner, toast } from "sonner"
import { Button } from "./button"

// Toast variants
// type ToastVariant = "default" | "success" | "error" | "warning" | "info"

// Button type for toast actions
// type ToastButton = {
// 	label: string
// 	onClick: () => void
// 	variant?: "default" | "outline"
// }

// Variant styles
const SonnerVariant = cva(" group toast rounded-lg flex items-center justify-center gap-2 p-3 w-full h-auto text-xl group-[.toaster]:text-text-secondary", {
	variants: {
		variant: {
			default: " bg-[#565861] !text-white",
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
}

// Define the type for the toast variant
type VariantType = VariantProps<typeof SonnerVariant>["variant"]

// Main toast function
export function showToast({ title, description, variant = "default", duration = 20000, buttons = [], closable = true }: ToastProps): string | number {
	const toastId = toast.custom(
		(t) => (
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
		),
		{
			duration,
		}
	)

	return toastId
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
// Define the type for the toaster variant
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
