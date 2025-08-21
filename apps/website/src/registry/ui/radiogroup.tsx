"use client"

import * as React from "react"

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"

type RadioGroupSize = "sm" | "md" | "lg"

type RadioGroupItemProps = React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
	size?: RadioGroupSize
}

type RadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive.Root> & {
	label?: string
	size?: RadioGroupSize
	disabled?: boolean
}

type RadioGroupContextType = {
	size: RadioGroupSize
	disabled?: boolean
}

const RadioGroupContext = React.createContext<RadioGroupContextType | null>(null)

function useRadioGroup() {
	const context = React.useContext(RadioGroupContext)
	if (!context) throw new Error("useRadioGroup must be used within a <RadioGroup />")
	return context
}

function RadioGroup({ className, label, size = "md", disabled, children, ...props }: RadioGroupProps) {
	const ctxValues = React.useMemo(() => ({ size, disabled }), [size, disabled])
	return (
		<div className="flex flex-col gap-3">
			{label && <span className="text-sm font-medium">{label}</span>}
			<RadioGroupContext.Provider value={ctxValues}>
				<RadioGroupPrimitive.Root disabled={disabled} className={cn("flex flex-col gap-3", className)} data-slot="radio-group" {...props}>
					{children}
				</RadioGroupPrimitive.Root>
			</RadioGroupContext.Provider>
		</div>
	)
}

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

function RadioGroupItem({ className, size: itemSize, disabled: itemDisabled, children, ...props }: RadioGroupItemProps) {
	const { size: groupSize, disabled: groupDisabled } = useRadioGroup()
	const size = itemSize ?? groupSize
	const disabled = itemDisabled ?? groupDisabled

	return (
		<label
			className={cn(
				"flex max-w-fit cursor-pointer items-center gap-2 text-sm font-medium",
				{
					"text-fg-tertiary cursor-not-allowed": disabled,
					"text-base": size === "lg",
				},
				className
			)}>
			<RadioGroupPrimitive.Item
				disabled={disabled}
				data-slot="radio-item"
				className={cn(
					"outline-hidden border-alpha data-[state=checked]:bg-primary data-[state=checked]:disabled:bg-text-tertiary focus-visible:ring-primary focus-visible:ring-offset-bg-bg flex aspect-square items-center justify-center rounded-full border transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed data-[state=checked]:border-none",
					{
						"size-4": size === "sm",
						"size-5": size === "md",
						"size-6": size === "lg",
					}
				)}
				{...props}>
				<RadioGroupPrimitive.Indicator
					className={cn("bg-bg flex items-center justify-center rounded-full", {
						"size-2": size === "sm",
						"size-2.5": size === "md",
						"size-3": size === "lg",
					})}
				/>
			</RadioGroupPrimitive.Item>
			{children && <span>{children}</span>}
		</label>
	)
}

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
