"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Context Types
export type SwitchContextType = { permanent?: boolean }
export type SwitchWrapperProps = React.HTMLAttributes<HTMLDivElement> &
	SwitchContextType
export type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> &
	VariantProps<typeof switchVariants> & { thumbClassName?: string }
export type SwitchIndicatorProps = React.HTMLAttributes<HTMLSpanElement> &
	VariantProps<typeof switchIndicatorVariants>

// Context
const SwitchContext = React.createContext<SwitchContextType>({
	permanent: false,
})

// Switch Variants
const switchVariants = cva(
	`
  relative peer inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors 
  focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg 
  disabled:cursor-not-allowed disabled:opacity-50 bg-fill2-alpha
  aria-invalid:border aria-invalid:border-error aria-invalid:ring-error
  [[data-invalid=true]_&]:border [[data-invalid=true]_&]:border-error [[data-invalid=true]_&]:ring-error
  `,
	{
		variants: {
			shape: {
				pill: "rounded-full",
				square: "rounded-md",
			},
			size: {
				"20": "w-8.5 h-5",
				"24": "w-10.5 h-6",
				"32": "w-14 h-8",
			},
			permanent: {
				true: "bg-fill3",
				false: "data-[state=checked]:bg-primary",
			},
		},
		defaultVariants: {
			shape: "pill",
			permanent: false,
			size: "24",
		},
	}
)

// Thumb Variants
const switchThumbVariants = cva(
	`
  pointer-events-none bg-white shadow-lg ring-0 transition-transform 
  data-[state=unchecked]:translate-x-[3px]
  rtl:data-[state=unchecked]:-translate-x-[3px]
  rtl:data-[state=checked]:-translate-x-[calc(100%-3px)]
  flex items-center justify-center
  `,
	{
		variants: {
			shape: {
				pill: "rounded-full",
				square: "rounded-sm",
			},
			size: {
				"20": "size-3.5 data-[state=checked]:translate-x-4",
				"24": "size-4.5 data-[state=checked]:translate-x-5",
				"32": "size-6 data-[state=checked]:translate-x-7",
			},
		},
		defaultVariants: {
			shape: "pill",
			size: "24",
		},
	}
)

// Indicator Variants (used for styling only)
const switchIndicatorVariants = cva(
	"flex items-center justify-center w-full h-full text-[10px] font-medium transition-all duration-200 select-none",
	{
		variants: {
			state: {
				on: "text-primary",
				off: "text-fg-secondary",
			},
		},
		defaultVariants: {
			state: "off",
		},
	}
)

// Hook
function useSwitch() {
	const context = React.useContext(SwitchContext)
	if (!context) {
		throw new Error("SwitchIndicator must be used within a Switch component")
	}
	return context
}

// Wrapper
function SwitchWrapper({
	className,
	children,
	permanent = false,
	...props
}: SwitchWrapperProps) {
	return (
		<SwitchContext.Provider value={{ permanent: permanent ?? false }}>
			<div
				data-slot="switch-wrapper"
				className={cn("relative inline-flex items-center", className)}
				{...props}>
				{children}
			</div>
		</SwitchContext.Provider>
	)
}

// Switch Root + Thumb (indicator inside)
function Switch({
	className,
	thumbClassName = "",
	shape,
	size,
	children,
	...props
}: SwitchProps) {
	const context = useSwitch()
	const permanent = context?.permanent ?? false

	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			className={cn(switchVariants({ shape, size, permanent }), className)}
			{...props}>
			<SwitchPrimitive.Thumb
				className={cn(switchThumbVariants({ shape, size }), thumbClassName)}>
				{children} {/* Indicator will render here */}
			</SwitchPrimitive.Thumb>
		</SwitchPrimitive.Root>
	)
}

// Indicator (text or icon inside thumb)
function SwitchIndicator({
	className,
	state,
	children,
	...props
}: SwitchIndicatorProps) {
	return (
		<span
			data-slot="switch-indicator"
			data-state={state}
			className={cn(switchIndicatorVariants({ state }), className)}
			{...props}>
			{children}
		</span>
	)
}

// Export
export { Switch, SwitchIndicator, SwitchWrapper }
