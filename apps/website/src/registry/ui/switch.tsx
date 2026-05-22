"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

export type SwitchContextType = { permanent?: boolean }
export type SwitchWrapperProps = React.HTMLAttributes<HTMLDivElement> &
	SwitchContextType
export type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> &
	VariantProps<typeof switchVariants> & { thumbClassName?: string }
export type SwitchIndicatorProps = React.HTMLAttributes<HTMLSpanElement> &
	VariantProps<typeof switchIndicatorVariants>

const SwitchContext = React.createContext<SwitchContextType>({
	permanent: false,
})

const switchVariants = cva(
	"r-switch cn-switch relative peer inline-flex shrink-0 cursor-pointer items-center transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border aria-invalid:border-error aria-invalid:ring-error [[data-invalid=true]_&]:border [[data-invalid=true]_&]:border-error [[data-invalid=true]_&]:ring-error",
	{
		variants: {
			shape: {
				pill: "r-switch-shape-pill cn-switch-shape-pill",
				square: "r-switch-shape-square cn-switch-shape-square",
			},
			size: {
				"20": "r-switch-20 cn-switch-20 w-8.5 h-5",
				"24": "r-switch-24 cn-switch-24 w-10.5 h-6",
				"32": "r-switch-32 cn-switch-32 w-14 h-8",
			},
			permanent: {
				true: "r-switch-permanent cn-switch-permanent",
				false: "r-switch-toggleable cn-switch-toggleable",
			},
		},
		defaultVariants: {
			shape: "pill",
			permanent: false,
			size: "24",
		},
	}
)

const switchThumbVariants = cva(
	"r-switch-thumb cn-switch-thumb pointer-events-none ring-0 transition-transform data-[state=unchecked]:translate-x-[3px] rtl:data-[state=unchecked]:-translate-x-[3px] rtl:data-[state=checked]:-translate-x-[calc(100%-3px)] flex items-center justify-center",
	{
		variants: {
			shape: {
				pill: "r-switch-thumb-shape-pill cn-switch-thumb-shape-pill",
				square: "r-switch-thumb-shape-square cn-switch-thumb-shape-square",
			},
			size: {
				"20": "r-switch-thumb-20 cn-switch-thumb-20 size-3.5 data-[state=checked]:translate-x-4",
				"24": "r-switch-thumb-24 cn-switch-thumb-24 size-4.5 data-[state=checked]:translate-x-5",
				"32": "r-switch-thumb-32 cn-switch-thumb-32 size-6 data-[state=checked]:translate-x-7",
			},
		},
		defaultVariants: {
			shape: "pill",
			size: "24",
		},
	}
)

const switchIndicatorVariants = cva(
	"flex items-center justify-center w-full h-full transition-all duration-200 select-none",
	{
		variants: {
			state: {
				on: "r-switch-indicator-on cn-switch-indicator-on",
				off: "r-switch-indicator-off cn-switch-indicator-off",
			},
		},
		defaultVariants: {
			state: "off",
		},
	}
)

function useSwitch() {
	const context = React.useContext(SwitchContext)
	if (!context)
		throw new Error("SwitchIndicator must be used within a Switch component")
	return context
}

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
				{children}
			</SwitchPrimitive.Thumb>
		</SwitchPrimitive.Root>
	)
}

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

export { Switch, SwitchIndicator, SwitchWrapper }
