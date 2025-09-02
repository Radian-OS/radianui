import React from "react"
import { CalendarDate, getLocalTimeZone, parseDate } from "@internationalized/date"
import { format } from "date-fns"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { type ChevronProps, type DateRange, DayPicker, type Modifiers } from "react-day-picker"
import { cn } from "@/lib/utils"

// Function to convert CalendarDate to native Date object
export function convertToNativeDate(selected: CalendarDate | CalendarDate[] | undefined | { from: CalendarDate; to?: CalendarDate }): Date | Date[] | undefined | DateRange {
	const timeZone = getLocalTimeZone() // Get the local time zone

	if (selected instanceof Array) {
		return selected.map((date) => date.toDate(timeZone))
	}
	if (selected && "from" in selected && "to" in selected) {
		return {
			from: selected.from.toDate(timeZone),
			to: selected?.to?.toDate(timeZone),
		}
	}
	if (selected instanceof CalendarDate) {
		return selected.toDate(timeZone)
	}
	return undefined
}

// Function to convert native Date to CalendarDate
function convertToInternationalizedDate(selected: Date | Date[] | undefined | DateRange): CalendarDate | CalendarDate[] | undefined | { from: CalendarDate; to?: CalendarDate } {
	if (!selected) return undefined

	if (selected instanceof Array) {
		return selected.map((date) => parseDate(format(date, "yyyy-MM-dd")))
	}
	if (selected && "from" in selected && "to" in selected) {
		return {
			from: parseDate(format(selected.from!, "yyyy-MM-dd")),
			to: selected?.to ? parseDate(format(selected.to, "yyyy-MM-dd")) : undefined,
		}
	}
	if (selected instanceof Date) {
		return parseDate(format(selected, "yyyy-MM-dd"))
	}
	return undefined
}

export type OnSelectHandler<T> = (selected: T, triggerDate: CalendarDate, modifiers: Modifiers, e: React.MouseEvent | React.KeyboardEvent) => void

// Type definition for CalendarSingleSelect props
export type CalendarSingleSelect = {
	mode?: "single"
	selected?: CalendarDate
	onSelect?: OnSelectHandler<CalendarDate | undefined>
	onTimeSelected?: (selectedTime: string) => void
	onSelectIndex?: (index: number) => void
	className?: string
	selectedTime?: string
}

// Type definition for CalendarMultipleSelect props
export type CalendarMultipleSelect = {
	mode?: "multiple"
	selected?: CalendarDate[]
	onSelect?: OnSelectHandler<CalendarDate[] | undefined>
	className?: string
}

export type CalendarRange = { from: CalendarDate; to?: CalendarDate }

// Type definition for CalendarRangeSelect props
export type CalendarRangeSelect = {
	mode?: "range"
	selected?: CalendarRange
	onSelect?: OnSelectHandler<CalendarRange | undefined>
	className?: string
}

// Main CalendarProps type combining different selection modes and additional props
export type CalendarProps = Omit<React.ComponentProps<typeof DayPicker>, "selected" | "onSelect" | "numberOfMonths" | "disabled"> &
	(CalendarSingleSelect | CalendarMultipleSelect | CalendarRangeSelect) & {
		dual?: boolean
		navigatorStyle?: "button" | "selector"
		disabled?: boolean
		time?: boolean
		footer?: React.ReactNode
		onIndexChange?: (value: string | null) => void
		numberOfMonths?: number
		selectedTime?: string
		onTimeSelected?: (selectedTime: string) => void
	}

type GetMergedClassNamesParams = {
	props: { disabled?: boolean; hideNavigation?: boolean }
	navigatorStyle: string
	dual: boolean
	hideCaption?: boolean
}

export function getMergedClassNames({ props, navigatorStyle, dual, hideCaption }: GetMergedClassNamesParams): Record<string, string> {
	return {
		root: cn({ "cursor-not-allowed": props.disabled }),
		months: cn("relative flex flex-col bg-elevation-level1 w-full gap-5 p-0", {
			"flex-row pt-10": navigatorStyle === "selector",
			"sm:flex-row": navigatorStyle !== "selector",
		}),
		month_caption: cn("mx-10 flex items-center justify-center z-20 p-0 text-sm font-semibold h-7", {
			hidden: props.hideNavigation || hideCaption || (navigatorStyle === "selector" && !dual),
		}),
		nav: "absolute top-0 flex w-full justify-between z-10 p-0",
		month: "flex flex-col gap-3",
		month_grid: "flex flex-col gap-1.5 items-center",
		weekdays: "w-full flex gap-1.5",
		weekday: "text-fg-tertiary text-sm font-medium size-8 shrink-0 flex items-center justify-center",
		weeks: "w-full flex flex-col gap-1.5",
		week: "w-full flex gap-1.5",
		day: "size-8 p-0 shrink-0 group text-sm aria-selected:opacity-100",
		day_button:
			"text-center rounded-lg text-fg text-sm font-medium hover:bg-fill2-alpha cursor-pointer size-8 p-0 hover:group-data-selected:bg-primary group-data-disabled:pointer-events-none group-data-selected:bg-primary group-data-selected:text-white hover:group-[.rdp-outside]:group-data-selected:bg-primary group-[.rdp-outside]:group-data-selected:text-white hover:group-[.range-middle]:group-[.rdp-outside]:group-data-selected:bg-primary-accent group-data-selected:text-white group-data-disabled:text-fg-tertiary group-data-outside:text-fg-tertiary group-data-today:border group-data-today:border-primary hover:group-[.range-middle]:group-data-selected:bg-primary-accent group-[.range-middle]:group-data-selected:text-primary group-[.range-middle]:group-data-selected:bg-primary-accent group-[.range-middle]:group-data-selected:text-fg group-data-selected:group-data-outside:text-fg",
		button_previous: cn("border rounded-lg border-border drop-shadow-xs p-1.5 flex justify-center items-center size-7", {
			"pointer-events-none": props.disabled,
		}),
		button_next: cn("border rounded-lg border-border drop-shadow-xs p-1.5 flex justify-center items-center size-7", {
			"pointer-events-none": props.disabled,
		}),
		range_start: "range-start",
		range_middle: "range-middle",
		range_end: "range-end",
	}
}

// Time picker component
function TimePicker({ selectedTime, onTimeSelected, disabled }: { selectedTime?: string; onTimeSelected?: (time: string) => void; disabled?: boolean }) {
	const [hour, setHour] = React.useState(selectedTime ? selectedTime.split(":")[0] : "12")
	const [minute, setMinute] = React.useState(selectedTime ? selectedTime.split(":")[1] : "00")
	const [period, setPeriod] = React.useState(selectedTime && parseInt(selectedTime.split(":")[0]) >= 12 ? "PM" : "AM")

	React.useEffect(() => {
		if (selectedTime) {
			const [h, m] = selectedTime.split(":")
			const hourNum = parseInt(h)
			setHour(hourNum > 12 ? (hourNum - 12).toString().padStart(2, "0") : hourNum === 0 ? "12" : h)
			setMinute(m)
			setPeriod(hourNum >= 12 ? "PM" : "AM")
		}
	}, [selectedTime])

	const handleTimeChange = React.useCallback(
		(newHour: string, newMinute: string, newPeriod: string) => {
			let hour24 = parseInt(newHour)
			if (newPeriod === "PM" && hour24 !== 12) {
				hour24 += 12
			} else if (newPeriod === "AM" && hour24 === 12) {
				hour24 = 0
			}
			const timeString = `${hour24.toString().padStart(2, "0")}:${newMinute}`
			onTimeSelected?.(timeString)
		},
		[onTimeSelected]
	)

	const handleHourChange = (newHour: string) => {
		setHour(newHour)
		handleTimeChange(newHour, minute, period)
	}

	const handleMinuteChange = (newMinute: string) => {
		setMinute(newMinute)
		handleTimeChange(hour, newMinute, period)
	}

	const handlePeriodChange = (newPeriod: string) => {
		setPeriod(newPeriod)
		handleTimeChange(hour, minute, newPeriod)
	}

	const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"))
	const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"))

	return (
		<div className="border-border bg-elevation-level1 flex min-w-[200px] flex-col gap-4 border-l p-4">
			<div className="text-fg flex items-center gap-2 text-sm font-semibold">
				<Clock size={16} />
				Select Time
			</div>

			<div className="flex items-center gap-2">
				<div className="flex flex-col gap-2">
					<label className="text-fg-tertiary text-xs">Hour</label>
					<select
						value={hour}
						onChange={(e) => handleHourChange(e.target.value)}
						disabled={disabled}
						className="border-border bg-bg text-fg focus:ring-primary focus:border-primary rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50">
						{hours.map((h) => (
							<option key={h} value={h}>
								{h}
							</option>
						))}
					</select>
				</div>

				<div className="flex flex-col gap-2">
					<label className="text-fg-tertiary text-xs">Minute</label>
					<select
						value={minute}
						onChange={(e) => handleMinuteChange(e.target.value)}
						disabled={disabled}
						className="border-border bg-bg text-fg focus:ring-primary focus:border-primary rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50">
						{minutes
							.filter((_, i) => i % 5 === 0)
							.map((m) => (
								<option key={m} value={m}>
									{m}
								</option>
							))}
					</select>
				</div>

				<div className="flex flex-col gap-2">
					<label className="text-fg-tertiary text-xs">Period</label>
					<select
						value={period}
						onChange={(e) => handlePeriodChange(e.target.value)}
						disabled={disabled}
						className="border-border bg-bg text-fg focus:ring-primary focus:border-primary rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50">
						<option value="AM">AM</option>
						<option value="PM">PM</option>
					</select>
				</div>
			</div>
		</div>
	)
}

// Calendar component definition
function Calendar({
	selected,
	onSelect,
	mode = "single",
	components,
	showOutsideDays = true,
	navigatorStyle = "button",
	time = false,
	dual = false,
	className,
	footer,
	numberOfMonths = 1,
	selectedTime,
	onTimeSelected,
	...props
}: CalendarProps) {
	const [internalSelected, setInternalSelected] = React.useState<Date | Date[] | DateRange | undefined>(convertToNativeDate(selected))
	const isControlled = selected !== undefined
	const currentSelected = isControlled ? convertToNativeDate(selected) : internalSelected

	// Effect to update internal selected state when external selected changes
	React.useEffect(
		function () {
			if (isControlled) {
				setInternalSelected(convertToNativeDate(selected))
			}
		},
		[selected, isControlled]
	)

	const mergedClassName = cn(`p-3 bg-elevation-level1 ${time ? " border-r" : ""}`, className)

	// Merged class names for styling
	const mergedClassNames = getMergedClassNames({
		props,
		navigatorStyle,
		dual,
	})

	// Merged components including custom ones
	const mergedComponents = {
		Chevron: (props: ChevronProps) => {
			if (props.orientation === "left") return <ChevronLeft size={16} className="stroke-fg" />
			return <ChevronRight size={16} className="stroke-fg" />
		},
		...components,
	}

	// Handle selection of dates
	function handleOnSelect(selected: Date | Date[] | undefined | DateRange, triggerDate: Date, modifiers: Modifiers, e: React.MouseEvent | React.KeyboardEvent) {
		// Always update internal state for uncontrolled usage
		if (!isControlled) {
			setInternalSelected(selected)
		}

		// Call the onSelect handler if provided
		if (onSelect) {
			const convertedSelected = convertToInternationalizedDate(selected)
			const convertedTriggerDate = parseDate(format(triggerDate, "yyyy-MM-dd"))
			onSelect(convertedSelected as CalendarDate & CalendarDate[] & CalendarRange, convertedTriggerDate, modifiers, e)
		}
	}

	if (mode === "single") {
		return (
			<div className={`bg-elevation-level1 drop-shadow-xs w-fit overflow-hidden ${className ? className : "border-border rounded-xl border"}`}>
				<div className={`flex ${footer ? "border-b" : ""} overflow-hidden`}>
					<DayPicker
						classNames={mergedClassNames}
						components={mergedComponents}
						className={mergedClassName}
						showOutsideDays={showOutsideDays}
						mode="single"
						selected={currentSelected as Date}
						onSelect={handleOnSelect}
						numberOfMonths={numberOfMonths ? numberOfMonths : dual ? 2 : 1}
						{...props}
					/>
					{time && <TimePicker selectedTime={selectedTime} onTimeSelected={onTimeSelected} disabled={props.disabled} />}
				</div>
				<div className="flex w-full justify-end">{footer && footer}</div>
			</div>
		)
	}

	if (mode == "multiple") {
		return (
			<div className={`bg-elevation-level1 drop-shadow-xs w-fit overflow-hidden ${className ? className : "border-border rounded-xl border"}`}>
				<div className={`flex ${footer ? "border-b" : ""} overflow-hidden`}>
					<DayPicker
						classNames={mergedClassNames}
						components={mergedComponents}
						className={mergedClassName}
						showOutsideDays={showOutsideDays}
						mode="multiple"
						selected={currentSelected as Date[]}
						onSelect={handleOnSelect}
						numberOfMonths={numberOfMonths ? numberOfMonths : dual ? 2 : 1}
						{...props}
					/>
					{time && <TimePicker selectedTime={selectedTime} onTimeSelected={onTimeSelected} disabled={props.disabled} />}
				</div>
				<div className="flex w-full justify-end">{footer && footer}</div>
			</div>
		)
	}

	return (
		<div className={`bg-elevation-level1 drop-shadow-xs w-fit overflow-hidden ${className ? className : "border-border rounded-xl border"}`}>
			<div className={`flex ${footer ? "border-b" : ""} overflow-hidden`}>
				<DayPicker
					classNames={mergedClassNames}
					components={mergedComponents}
					className={mergedClassName}
					showOutsideDays={showOutsideDays}
					mode="range"
					selected={currentSelected as DateRange}
					onSelect={handleOnSelect}
					numberOfMonths={numberOfMonths ? numberOfMonths : dual ? 2 : 1}
					{...props}
				/>
				{time && <TimePicker selectedTime={selectedTime} onTimeSelected={onTimeSelected} disabled={props.disabled} />}
			</div>
			<div className="flex w-full justify-end">{footer && footer}</div>
		</div>
	)
}

export { Calendar }
