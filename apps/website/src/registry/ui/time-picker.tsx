import React from "react"
import { Time } from "@internationalized/date"
import { cn } from "@/lib/utils"
import { Select, SelectItem, SelectProps } from "./select"

export type TimePickerProps = Pick<
	SelectProps,
	"className" | "classNames" | "defaultSelected" | "label" | "placeholder" | "rounded" | "size" | "renderTrigger" | "disabled"
> & {
	interval?: number
	value?: Time | null
	onValueChange?: (time: Time | null) => void
	is24Hour?: boolean
	minTime?: string
	maxTime?: string
	defaultValue?: Time
	allowEmptySelection?: boolean
}

/**
 * Converts a Dayjs object to a string in "HH:mm" format.
 * @param time - The Dayjs object to format.
 * @returns The formatted time string.
 */
export function serializeTime(time: Time) {
	const hour = String(time.hour).padStart(2, "0")
	const minute = String(time.minute).padStart(2, "0")
	return `${hour}:${minute}`
}

/**
 * Converts a string in "HH:mm" format to a Time object.
 * @param timeString - The time string to parse.
 * @returns A Time object representing the given time.
 */
function deserializeTime(timeString: string) {
	const [hour, minute] = timeString.split(":").map(Number)
	return new Time(hour, minute)
}

function TimePicker({
	interval = 15,
	onValueChange,
	is24Hour = false,
	minTime = "00:00",
	maxTime = "23:59",
	defaultValue,
	value = null,
	allowEmptySelection = true,
	classNames,
	...props
}: TimePickerProps) {
	const isControlled = value !== null

	/* Store the time as a serialized string ("HH:mm") to simplify comparisons and render */
	const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue ? [serializeTime(defaultValue)] : [])

	const currentValue = isControlled ? serializeTime(value) : internalValue[0]

	/**
	 * Generates an array of Dayjs objects representing selectable time options.
	 *
	 * The function computes times starting from minTime until maxTime using the provided interval.
	 * We choose this approach to support various ranges and intervals without hardcoding values.
	 *
	 * @returns An array of Dayjs objects for each selectable time.
	 */
	function generateTimeOptions() {
		const times: Time[] = []
		const [minHour, minMinute] = minTime.split(":").map(Number)
		const [maxHour, maxMinute] = maxTime.split(":").map(Number)

		let currentHour = minHour
		let currentMinute = minMinute

		while (currentHour < maxHour || (currentHour === maxHour && currentMinute <= maxMinute)) {
			const time = new Time(currentHour, currentMinute)
			times.push(time)

			currentMinute += interval
			if (currentMinute >= 60) {
				currentHour += Math.floor(currentMinute / 60)
				currentMinute %= 60
			}
		}

		return times
	}

	const timeOptions = generateTimeOptions()
	/**
	 * Handles value changes when a user selects a time.
	 * Updates the internal state and calls the onValueChange callback.
	 * @param value - The selected time as a string.
	 */
	function handleChange(value: string | undefined) {
		if (!value) {
			onValueChange?.(null)
			setInternalValue([])
		} else {
			onValueChange?.(deserializeTime(value))
			setInternalValue([value])
		}
	}
	// Formats a Time object into a human-readable string based on 12-hour or 24-hour format.
	function formatTime(time: Time) {
		let hour = time.hour
		const minute = String(time.minute).padStart(2, "0")
		if (!is24Hour) {
			const period = hour >= 12 ? "pm" : "am"
			hour = hour % 12
			hour = hour === 0 ? 12 : hour // 12 am/pm handling
			return `${String(hour).padStart(2, "0")}:${minute} ${period}`
		} else {
			return `${String(hour).padStart(2, "0")}:${minute}`
		}
	}

	return (
		<div className="flex items-center justify-center">
			<Select
				selectedValues={[currentValue]}
				onSelectedChange={function (values) {
					handleChange(values[0])
				}}
				classNames={{ content: cn("h-80"), ...classNames }}
				minSelectionCount={allowEmptySelection ? 0 : 1}
				{...props}>
				{timeOptions.map((time, index) => {
					const formatted = formatTime(time)
					return (
						<SelectItem key={index} value={serializeTime(time)}>
							{formatted}
						</SelectItem>
					)
				})}
			</Select>
		</div>
	)
}

export default TimePicker
