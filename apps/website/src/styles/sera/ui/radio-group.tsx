"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { type VariantProps, cva } from "class-variance-authority"
import { CircleIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type RadioGroupContextType = {
	size?: VariantProps<typeof radioItemVariants>["size"]
}

type RadioGroupItemProps = React.ComponentProps<
	typeof RadioGroupPrimitive.Item
> &
	RadioGroupContextType

type RadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive.Root> &
	RadioGroupContextType

const radioItemVariants = cva(
	cn(
		"outline-hidden border-alpha data-[state=checked]:bg-primary disabled:opacity-50 focus-visible:ring-primary focus-visible:ring-offset-bg peer flex aspect-square items-center justify-center rounded-full border transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed data-[state=checked]:border-none",
		"aria-invalid:border-error-text aria-invalid:ring-error ",
		"[[data-invalid=true]_&]:border-error-text [[data-invalid=true]_&]:ring-error"
	),
	{
		variants: {
			size: {
				sm: "size-4 [&_svg]:size-2",
				md: "size-5 [&_svg]:size-2.5",
				lg: "size-6 [&_svg]:size-3",
			},
		},
		defaultVariants: {
			size: "md",
		},
	}
)

const RadioGroupContext = React.createContext<RadioGroupContextType | null>(
	null
)

function useRadioGroup() {
	const context = React.useContext(RadioGroupContext)
	if (!context)
		throw new Error("useRadioGroup must be used within a <RadioGroup />")
	return context
}

function RadioGroup({
	className,
	size = "md",
	children,
	...props
}: RadioGroupProps) {
	const ctxValues = React.useMemo(() => ({ size }), [size])
	return (
		<RadioGroupContext.Provider value={ctxValues}>
			<RadioGroupPrimitive.Root
				className={cn("grid gap-3", className)}
				data-slot="radio-group"
				{...props}>
				{children}
			</RadioGroupPrimitive.Root>
		</RadioGroupContext.Provider>
	)
}

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

function RadioGroupItem({
	className,
	size: itemSize,
	...props
}: RadioGroupItemProps) {
	const { size: groupSize } = useRadioGroup()
	const size = itemSize ?? groupSize

	return (
		<RadioGroupPrimitive.Item
			data-slot="radio-group-item"
			className={cn(radioItemVariants({ size }), className)}
			{...props}>
			<RadioGroupPrimitive.Indicator
				data-slot="radio-group-indicator"
				className="relative flex items-center justify-center">
				<CircleIcon className="fill-bg stroke-bg absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	)
}

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
