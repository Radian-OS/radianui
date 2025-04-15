"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"
import { cn } from "@/lib/utils"

type RadioGroupSize = "sm" | "md" | "lg"

type RadioGroupContext = {
	size: RadioGroupSize
}

type RadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive.Root> & {
	label?: string
	size?: RadioGroupSize
}

type RadioGroupItemProps = React.ComponentProps<typeof RadioGroupPrimitive.Item> & { size?: RadioGroupSize }

const RadioGroupContext = React.createContext<RadioGroupContext | null>(null)

function useRadioGroup() {
	const context = React.use(RadioGroupContext)

	if (!context) {
		throw new Error("useRadioGroup must be used within a <RadioGroup />")
	}

	return context
}

function RadioGroup({ className, size = "md", label, children, ...props }: RadioGroupProps) {
	return (
		<div className="flex flex-col gap-3">
			{label && <span className="text-sm font-medium">{label}</span>}
			<RadioGroupContext.Provider value={{ size }}>
				<RadioGroupPrimitive.Root className={cn("flex flex-col gap-2", className)} data-slot="radio-group" {...props}>
					{children}
				</RadioGroupPrimitive.Root>
			</RadioGroupContext.Provider>
		</div>
	)
}

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

function RadioGroupItem({ className, size: itemSize, children, ...props }: RadioGroupItemProps) {
	const { size: groupSize } = useRadioGroup()
	const size = itemSize ?? groupSize

	const sizeClasses: Record<string, string> = {
		sm: "size-4",
		md: "size-5",
		lg: "size-6",
	}

	const indicatorSizeClasses: Record<string, string> = {
		sm: "size-2",
		md: "size-2.5",
		lg: "size-3",
	}

	return (
		<label className={cn("flex max-w-fit items-center gap-2 text-sm", props.disabled ? "text-text-tertiary cursor-not-allowed" : "cursor-pointer")}>
			<RadioGroupPrimitive.Item
				data-slot="radio-item"
				className={cn(
					"data-[state=checked]:bg-primary data-[state=checked]:disabled:bg-text-tertiary aspect-square rounded-full border outline-hidden transition-all duration-200 data-[state=checked]:border-none",
					"flex items-center justify-center",
					sizeClasses[size],
					"border-border",
					"disabled:cursor-not-allowed",
					className
				)}
				{...props}>
				<RadioGroupPrimitive.Indicator className={cn("flex items-center justify-center", indicatorSizeClasses[size])}>
					<Circle className="fill-white stroke-0" />
				</RadioGroupPrimitive.Indicator>
			</RadioGroupPrimitive.Item>
			{children && <span>{children}</span>}
		</label>
	)
}
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
