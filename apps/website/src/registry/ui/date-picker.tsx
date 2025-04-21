import React from "react"
import { CalendarDate, Time, getLocalTimeZone, today } from "@internationalized/date"
import { format } from "date-fns"
import { format as formatTZ } from "date-fns-tz"
import { Calendar as CalendarIcon, Check } from "lucide-react"
import { Modifiers } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import Calendar, { type CalendarProps, CalendarRange } from "./calendar"
import { RoundedOptions, SizeOptions, defaultInputRadius, defaultInputSize } from "./input"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Select, SelectItem, SelectProps } from "./select"
import TimePicker, { TimePickerProps } from "./time-picker"

// Mock mouse click event
function mockMouseClick(): React.MouseEvent {
	return new MouseEvent("click") as unknown as React.MouseEvent
}

type TimeZone = Record<string, string>
const timeZones: TimeZone = {}
// Populate the timeZones object with the supported timezones
Intl.supportedValuesOf("timeZone").map(function (zone) {
	timeZones[zone] = zone
		.split("/")
		.map((part) => part.replace(/_/g, " ").replace(/(^|\s)\S/g, (t) => t.toUpperCase()))
		.join("/")
})
const TIME_ZONES = Intl.supportedValuesOf("timeZone")

const DATE_RANGE_SHORTCUT_VALUES = ["today", "last_7_days", "last_30_days", "last_3_months", "last_6_months", "last_12_months", "custom"] as const
type DateRangeShortcutValues = (typeof DATE_RANGE_SHORTCUT_VALUES)[number]

export type DatePickerModes = "single" | "multiple" | "range" | "time"
// Type definition for DatePickerProps props
type DatePickerProps = Omit<CalendarProps, "mode"> & {
	triggerClassName?: string
	showDateRangeShortcut?: boolean
	defaultDateRangeShortcutValue?: DateRangeShortcutValues
	placeholder?: string
	timePickerProps?: Partial<TimePickerProps>
	timeZoneProps?: Partial<SelectProps> & {
		allowedTimezones?: string[]
	}
	time?: Time
	onSelectTime?: (time: Time | null) => void
	selectedTimezone?: string
	onSelectTimezone?: (timezone: string | null) => void
	size?: SizeOptions
	rounded?: RoundedOptions
	mode?: DatePickerModes
}
// DatePicker component definition
function DatePicker({
	selected,
	mode = "single",
	onSelect,
	triggerClassName,
	showDateRangeShortcut = false,
	defaultDateRangeShortcutValue,
	placeholder = "Select Date",
	timePickerProps,
	timeZoneProps,
	onSelectTime,
	selectedTimezone,
	onSelectTimezone,
	size = defaultInputSize,
	rounded = defaultInputRadius,
	...props
}: DatePickerProps) {
	const [internalSelected, setInternalSelected] = React.useState<CalendarDate | CalendarDate[] | CalendarRange | undefined>(selected || undefined)
	const isControlled = selected !== undefined
	const currentSelected = isControlled ? selected : internalSelected
	const [selectedShortcut, setSelectedShortcut] = React.useState<string | null>(defaultDateRangeShortcutValue || null)
	const [time, setTime] = React.useState<Time | null>(null)
	const [timezone, setTimezone] = React.useState<string | null>(null)
	const currenTimezone = selectedTimezone || timezone

	/**
	 * This function manipulates the selected date according
	 * to the range shortcut value passed
	 * @param shortcut - Value of the shortcut type
	 */
	function handleShortcutSelect(shortcut: DateRangeShortcutValues) {
		const todayDate = today(getLocalTimeZone())
		const rangeMap: Record<DateRangeShortcutValues, { from: CalendarDate; to: CalendarDate }> = {
			today: { from: todayDate, to: today(getLocalTimeZone()) },
			last_7_days: { from: todayDate.subtract({ weeks: 1 }), to: todayDate },
			last_30_days: { from: todayDate.subtract({ months: 1 }), to: todayDate },
			last_3_months: { from: todayDate.subtract({ months: 3 }), to: todayDate },
			last_6_months: { from: todayDate.subtract({ months: 6 }), to: todayDate },
			last_12_months: {
				from: todayDate.subtract({ months: 12 }),
				to: todayDate,
			},
			custom: { from: todayDate, to: todayDate },
		}

		if (shortcut !== "custom") {
			const range = rangeMap[shortcut]
			onSelectHandler(range, todayDate, {}, mockMouseClick())
		}
		setSelectedShortcut(shortcut)
	}

	// Function to handle the selection of the date
	function onSelectHandler(
		selected: CalendarDate | CalendarDate[] | CalendarRange | undefined,
		triggerDate: CalendarDate,
		modifiers: Modifiers,
		e: React.MouseEvent | React.KeyboardEvent
	) {
		if (!selected || (selected as CalendarDate[]).length == 0) {
			setInternalSelected(undefined)
			onSelect?.(undefined, triggerDate, modifiers, e)
			return
		}

		setInternalSelected(selected)
		onSelect?.(selected as CalendarDate & CalendarDate[] & CalendarRange, triggerDate, modifiers, e)

		if (e.currentTarget?.getAttribute("data-value") == null) setSelectedShortcut("custom")
	}
	// Effect hook to update the internal selected state based on the selected date
	React.useEffect(function () {
		if (defaultDateRangeShortcutValue) {
			handleShortcutSelect(defaultDateRangeShortcutValue)
		}
	}, [])

	// Function to handle the change in time zone
	function handleTimezoneChange(timezone: string | null) {
		setTimezone(timezone)
		onSelectTimezone?.(timezone)
	}

	// Function to handle the change in time
	function handleTimeChange(time: Time | null) {
		setTime(time)
		onSelectTime?.(time)
	}

	// Effect hook to update the internal selected state based on the selected time zone and time
	React.useEffect(
		function () {
			setInternalSelected(undefined)
			onSelect?.(undefined, today(getLocalTimeZone()), {}, mockMouseClick())
		},
		[mode]
	)

	// Type guard for CalendarRange
	function isCalendarRange(value: CalendarDate | CalendarDate[] | CalendarRange): value is CalendarRange {
		return (
			typeof value === "object" &&
			value !== null &&
			"from" in value &&
			value.from instanceof CalendarDate &&
			("to" in value ? value.to instanceof CalendarDate : true)
		)
	}

	return (
		<Popover align="start">
			<PopoverTrigger asChild disabled={props.disabled}>
				<Button
					variant="neutral-outline"
					className={cn(
						"text-text w-fit max-w-full items-center justify-between gap-2 text-sm font-normal",
						{
							"rounded-lg": rounded === "rounded",
							"rounded-none": rounded === "square",
							"cursor-not-allowed": props.disabled,
						},
						triggerClassName
					)}
					size={size as "32" | "36" | "40" | "44" | "48" | "28" | null | undefined}
					disabled={props.disabled}>
					<span className="w-full truncate text-left">
						{currentSelected === undefined && placeholder}
						{currentSelected &&
							mode === "single" &&
							currentSelected instanceof CalendarDate &&
							format(currentSelected.toDate(getLocalTimeZone()), "MMM dd, yyyy")}
						{currentSelected &&
							mode === "multiple" &&
							currentSelected instanceof Array &&
							(currentSelected as CalendarDate[]).map((date) => format(date.toDate(getLocalTimeZone()), "MMM dd")).join(", ")}
						{currentSelected &&
							mode === "range" &&
							isCalendarRange(currentSelected) &&
							(showDateRangeShortcut && selectedShortcut && selectedShortcut != "custom"
								? selectedShortcut
										.split("_")
										.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
										.join(" ")
								: `${format((currentSelected as CalendarRange).from.toDate(getLocalTimeZone()), "MMM dd")} - ${format((currentSelected as CalendarRange).to!.toDate(getLocalTimeZone()), "MMM dd")}`)}
						{currentSelected &&
							mode === "time" &&
							currentSelected instanceof CalendarDate &&
							`${format(currentSelected.toDate(getLocalTimeZone()), "MMM dd, yyyy")} ${time ? time.toString() : ""} ${timezone ? formatTZ(new Date(), "zzz", { timeZone: timezone }) : ""}`}
					</span>
					<CalendarIcon size={20} className="stroke-text-tertiary" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className={cn("border-border bg-bg-base drop-shadow-xs flex w-fit flex-col gap-3 rounded-xl border p-0 shadow-none")}>
				{mode === "single" && (
					<Calendar
						mode="single"
						selected={currentSelected as CalendarDate}
						onSelect={onSelectHandler}
						className="border-none drop-shadow-none"
						{...props}
					/>
				)}
				{mode === "multiple" && (
					<Calendar
						mode="multiple"
						selected={currentSelected as CalendarDate[]}
						onSelect={onSelectHandler}
						className="border-none drop-shadow-none"
						{...props}
					/>
				)}
				{mode === "range" && showDateRangeShortcut && (
					<div className="flex">
						<DateRangeShortcut handleShortcutSelect={handleShortcutSelect} selectedValue={selectedShortcut} />
						<Calendar
							mode="range"
							className="border-none drop-shadow-none"
							selected={currentSelected as CalendarRange}
							onSelect={onSelectHandler}
							{...props}
						/>
					</div>
				)}
				{mode === "range" && !showDateRangeShortcut && (
					<Calendar
						mode="range"
						selected={currentSelected as CalendarRange}
						className="border-none drop-shadow-none"
						onSelect={onSelectHandler}
						{...props}
					/>
				)}
				{mode === "time" && (
					<React.Fragment>
						<Calendar
							mode="single"
							selected={currentSelected as CalendarDate}
							onSelect={onSelectHandler}
							className="border-none pb-0 drop-shadow-none"
							{...props}
						/>
						<TimePickerWrapper
							value={time}
							onValueChange={handleTimeChange}
							timezone={currenTimezone}
							setTimezone={handleTimezoneChange}
							timePickerProps={timePickerProps}
							timeZoneProps={timeZoneProps}
						/>
					</React.Fragment>
				)}
			</PopoverContent>
		</Popover>
	)
}

// Type definition for DateRangeShortcutProps props
type DateRangeShortcutProps = {
	handleShortcutSelect: (shortcut: DateRangeShortcutValues) => void
	selectedValue: string | null
}
// DateRangeShortcut component definition
function DateRangeShortcut({ selectedValue, handleShortcutSelect }: DateRangeShortcutProps) {
	return (
		<div className="border-border text-text flex flex-col border-r p-2 text-sm font-medium">
			{DATE_RANGE_SHORTCUT_VALUES.map((value) => (
				<DateRangeShortcutItem
					key={value}
					label={value.charAt(0).toUpperCase() + value.split("_").join(" ").slice(1)}
					value={value}
					onClick={function () {
						handleShortcutSelect(value)
					}}
					selectedValue={selectedValue}
				/>
			))}
		</div>
	)
}

// Type definition for DateRangeShortcutItemProps props
type DateRangeShortcutItemProps = {
	selectedValue: string | null
	onClick: (e: React.MouseEvent<HTMLSpanElement>) => void
	value: string
	label: string
}

// DateRangeShortcutItem component definition
function DateRangeShortcutItem({ selectedValue, onClick, label, value }: DateRangeShortcutItemProps) {
	return (
		<span
			className="hover:bg-bg-level1 group flex h-8 cursor-pointer flex-nowrap items-center justify-between gap-2 rounded-sm px-2 py-2.5"
			data-value={value}
			onClick={onClick}>
			{label}
			{selectedValue == value ? <Check className="stroke-text-secondary" size={16} /> : <span className="size-4" />}
		</span>
	)
}

// Type definition for TimePickerWrapperProps props
type TimePickerWrapperProps = Pick<TimePickerProps, "value" | "onValueChange"> & {
	timezone: string | null
	setTimezone: (timezone: string | null) => void
} & Pick<DatePickerProps, "timePickerProps" | "timeZoneProps">

// TimePickerWrapper component definition
function TimePickerWrapper({ value, onValueChange, timezone, setTimezone, timePickerProps, timeZoneProps }: TimePickerWrapperProps) {
	const allowedTimezones = timeZoneProps?.allowedTimezones || Object.keys(timeZones)

	return (
		<div className="flex w-full flex-1 gap-3 px-3 pb-3 shadow-none">
			<TimePicker
				size="36"
				className="w-31"
				classNames={{ content: "max-h-80" }}
				placeholder="Time"
				value={value}
				onValueChange={onValueChange}
				{...timePickerProps}
			/>
			<Select
				size="36"
				className="w-31"
				classNames={{ content: "max-h-80" }}
				placeholder="Timezone"
				selectedValues={timezone ? [timezone] : []}
				onSelectedChange={(values) => (values.length > 0 ? setTimezone(values[0]) : setTimezone(null))}
				{...timeZoneProps}>
				{TIME_ZONES.filter((timezone) => allowedTimezones.includes(timezone)).map((timezone) => (
					<SelectItem key={timezone} value={timezone}>
						{timezone
							.split("/")
							.map((part) => part.replace(/_/g, " ").replace(/(^|\s)\S/g, (t) => t.toUpperCase()))
							.join("/")}
					</SelectItem>
				))}
			</Select>
		</div>
	)
}

export default DatePicker
