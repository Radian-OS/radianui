import React from "react"
import { cva } from "class-variance-authority"
import { CalendarIcon } from "lucide-react"
import { DateField, DateInput as DateInputRC, DateSegment, DateValue, Label } from "react-aria-components"
import { cn } from "@/lib/utils"
import { RoundedOptions, SizeOptions, cvaInputVariants } from "./input"

// Creating a variant for date input styles using cva
export const dateInputStyles = cva("flex h-10 items-center justify-between gap-2 border drop-shadow-xs bg-bg-base cursor-text", {
	variants: {
		...cvaInputVariants,
	},
	defaultVariants: {
		rounded: "md",
		size: "40",
	},
})

// Type definition for custom class names for various parts of the date input
export type DateInputProps = Omit<React.ComponentPropsWithoutRef<typeof DateField>, "isDisabled"> & {
	size?: SizeOptions
	rounded?: RoundedOptions
	label?: string
	disabled?: boolean
	classNames?: {
		base?: string
		label?: string
		dateInput?: string
		dateSegment?: string
	}
	ref?: React.RefObject<HTMLDivElement>
}

// Implementation of the custom date input component
const DateInput = ({ size, rounded, label, disabled, onChange, value, classNames, ref, ...props }: DateInputProps) => {
	const [internalDate, setInternalDate] = React.useState<DateValue | null>(props.defaultValue ?? null)
	const isControlled = onChange !== null

	// Function to handle date change and update the internal state and trigger the change event if necessary
	const handleChange = (value: DateValue | null) => {
		setInternalDate(value)
		onChange?.(value)
	}

	const currentValue = isControlled ? value : internalDate

	return (
		<div
			className={cn("w-[320px]", dateInputStyles({ size, rounded }), { "text-text-tertiary cursor-not-allowed": disabled }, classNames?.dateInput)}>
			<DateField
				granularity="minute"
				className={cn("flex flex-col gap-1 border-none")}
				onChange={handleChange}
				value={currentValue}
				isDisabled={disabled}
				ref={ref}
				{...props}>
				{label && <Label className={cn("text-text text-sm font-medium", { "text-text-tertiary": disabled }, classNames?.label)}>{label}</Label>}
				<DateInputRC>
					{(segment) => (
						<DateSegment
							className={cn(
								"rounded-sm px-0 py-0.5 text-end text-sm tabular-nums",
								"data-[focused]:bg-red-500 data-[focused]:text-white",
								"data-placeholder:text-text-tertiary",
								"focus:outline-hidden focus:caret-transparent",
								"data-[type=dayPeriod]:mx-0.5 data-[type=literal]:mx-0.5 data-[type=timeZoneName]:mx-0.5 data-[type=hour]:ml-0.5",
								classNames?.dateSegment
							)}
							segment={segment}
						/>
					)}
				</DateInputRC>
			</DateField>
			<CalendarIcon className={cn(disabled ? "cursor-not-allowed" : "cursor-pointer")} />
		</div>
	)
}

export default DateInput
