import React from "react"
import { cva } from "class-variance-authority"
import { DateField, DateInput as DateInputRC, DateSegment, DateValue, Label } from "react-aria-components"
import { cn } from "@/lib/utils"
import { RoundedOptions, SizeOptions, cvaInputVariants } from "./input"

// Creating a variant for date input styles using cva
const dateInputStyles = cva(
	"border-gray flex items-center w-fit whitespace-nowrap rounded-lg border focus-within:outline-2 focus-within:-outline-offset-1 focus-within:outline-primary focus-within:ring-2 focus-within:ring-primary/20",
	{
		variants: {
			...cvaInputVariants,
		},
		defaultVariants: {
			rounded: "rounded",
			size: "40",
		},
	}
)

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
		<DateField
			className={cn("flex w-fit flex-col gap-1", classNames?.base)}
			onChange={handleChange}
			value={currentValue}
			isDisabled={disabled}
			ref={ref}
			{...props}>
			{label && (
				<Label
					className={cn(
						"text-text text-sm font-medium",
						{
							"text-text-tertiary": disabled,
						},
						classNames?.label
					)}>
					{label}
				</Label>
			)}
			<DateInputRC className={cn(dateInputStyles({ size, rounded }), { "text-text-tertiary cursor-not-allowed": disabled }, classNames?.dateInput)}>
				{(segment) => (
					<DateSegment
						className={cn(
							"focus:bg-primary data-placeholder:text-text-tertiary focus:outline-hidden rounded-sm px-0 py-0.5 text-end text-sm tabular-nums focus:text-white focus:caret-transparent data-[type=dayPeriod]:mx-0.5 data-[type=literal]:mx-0.5 data-[type=timeZoneName]:mx-0.5 data-[type=hour]:ml-0.5",
							classNames?.dateSegment
						)}
						segment={segment}
					/>
				)}
			</DateInputRC>
		</DateField>
	)
}

export default DateInput
