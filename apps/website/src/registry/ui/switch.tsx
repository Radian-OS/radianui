"use client"

import * as React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { Switch as SwitchPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

export type SwitchContextType = { permanent?: boolean }

export type SwitchWrapperProps = React.HTMLAttributes<HTMLDivElement> & SwitchContextType

export type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> & VariantProps<typeof switchVariants> & { thumbClassName?: string }

export type SwitchIndicatorProps = React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof switchIndicatorVariants>

const SwitchContext = React.createContext<SwitchContextType>({
	permanent: false,
})

const switchVariants = cva(
	`
    relative peer inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors 
    focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg 
    disabled:cursor-not-allowed disabled:opacity-50 bg-fill3
    aria-invalid:border aria-invalid:border-error/60 aria-invalid:ring-error/10 dark:aria-invalid:border-error dark:aria-invalid:ring-error/20
    [[data-invalid=true]_&]:border [[data-invalid=true]_&]:border-error/60 [[data-invalid=true]_&]:ring-error/10  dark:[[data-invalid=true]_&]:border-error dark:[[data-invalid=true]_&]:ring-error/20
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

const switchThumbVariants = cva(
	"pointer-events-none block bg-white shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-[3px] rtl:data-[state=unchecked]:-translate-x-[3px] rtl:data-[state=checked]:-translate-x-[calc(100%-3px)]",
	{
		variants: {
			shape: {
				pill: "rounded-full",
				square: "rounded-md",
			},
			size: {
				"20": "size-3.5 data-[state=checked]:translate-x-4",
				"24": "size-4.5 data-[state=checked]:translate-x-5",
			},
		},
		compoundVariants: [
			{
				shape: "square",
				size: "20",
				className: "rounded-sm",
			},
		],
		defaultVariants: {
			shape: "pill",
			size: "24",
		},
	}
)

const switchIndicatorVariants = cva(
	"text-sm font-medium absolute mx-[2px] top-1/2 w-1/2 -translate-y-1/2 flex pointer-events-none items-center justify-center text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
	{
		variants: {
			state: {
				on: "start-0",
				off: "end-0",
			},
			permanent: {
				true: "",
				false: "",
			},
		},
		compoundVariants: [
			{
				state: "on",
				permanent: false,
				className: "text-primary-foreground peer-data-[state=unchecked]:invisible peer-data-[state=unchecked]:translate-x-full rtl:peer-data-[state=unchecked]:-translate-x-full",
			},
			{
				state: "off",
				permanent: false,
				className: "peer-data-[state=checked]:invisible -translate-x-full rtl:translate-x-full peer-data-[state=unchecked]:translate-x-0",
			},
			{
				state: "on",
				permanent: true,
				className: "start-0",
			},
			{
				state: "off",
				permanent: true,
				className: "end-0",
			},
		],
		defaultVariants: {
			state: "off",
			permanent: false,
		},
	}
)

const useSwitch = () => {
	const context = React.useContext(SwitchContext)
	if (!context) {
		throw new Error("SwitchIndicator must be used within a Switch component")
	}
	return context
}

function SwitchWrapper({ className, children, permanent = false, ...props }: SwitchWrapperProps) {
	return (
		<SwitchContext.Provider value={{ permanent: permanent ?? false }}>
			<div data-slot="switch-wrapper" className={cn("relative inline-flex items-center", className)} {...props}>
				{children}
			</div>
		</SwitchContext.Provider>
	)
}

function Switch({ className, thumbClassName = "", shape, size, ...props }: SwitchProps) {
	const context = useSwitch()
	const permanent = context?.permanent ?? false

	return (
		<SwitchPrimitive.Root data-slot="switch" className={cn(switchVariants({ shape, size, permanent }), className)} {...props}>
			<SwitchPrimitive.Thumb className={cn(switchThumbVariants({ shape, size }), thumbClassName)} />
		</SwitchPrimitive.Root>
	)
}

function SwitchIndicator({ className, state, ...props }: SwitchIndicatorProps) {
	const context = useSwitch()
	const permanent = context?.permanent ?? false

	return <span data-slot="switch-indicator" className={cn(switchIndicatorVariants({ state, permanent }), className)} {...props} />
}

export { Switch, SwitchIndicator, SwitchWrapper }
