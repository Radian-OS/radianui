import React, { useEffect, useMemo, useRef, useState } from "react"
import { CalendarDate, Time, getLocalTimeZone, now, today } from "@internationalized/date"
import { CalendarDateTime, ZonedDateTime, parseZonedDateTime } from "@internationalized/date"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Check } from "lucide-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DateField, DateInput as DateInputRC, DateSegment, DateValue } from "react-aria-components"
import { ChevronProps, DayPicker, Modifiers } from "react-day-picker"
import { cn } from "@/lib/utils"
import { TimeSelector, formatTime, timeOptions } from "../ui/calendar"
import { dateInputStyles } from "../ui/date-input"
import Calendar, { type CalendarProps, CalendarRange, getMergedClassNames } from "./calendar"
import { Input, RoundedOptions, SizeOptions, defaultInputRadius, defaultInputSize } from "./input"
import { Label } from "./label"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { SelectProps } from "./select"
import { TimePickerProps } from "./time-picker"

// Mock mouse click event
export function mockMouseClick(): React.MouseEvent {
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
// const TIME_ZONES = Intl.supportedValuesOf("timeZone")

const DATE_RANGE_SHORTCUT_VALUES = ["today", "last_7_days", "last_30_days", "last_3_months", "last_6_months", "last_12_months", "custom"] as const
export type DateRangeShortcutValues = (typeof DATE_RANGE_SHORTCUT_VALUES)[number]

export type DatePickerModes = "single" | "multiple" | "range" | "time"
// Type definition for DatePickerProps props
export type DatePickerProps = Omit<CalendarProps, "mode"> & {
	triggerClassName?: string
	showDateRangeShortcut?: boolean
	defaultDateRangeShortcutValue?: DateRangeShortcutValues
	placeholder?: string
	timePickerProps?: Partial<TimePickerProps>
	timeZoneProps?: Partial<SelectProps> & {
		allowedTimezones?: string[]
	}
	errorMsg?: string
	time?: Time
	onSelectTime?: (time: Time | null) => void
	selectedTimezone?: string
	onSelectTimezone?: (timezone: string | null) => void
	size?: SizeOptions
	rounded?: RoundedOptions
	mode?: DatePickerModes
	showTime?: boolean
	label?: string
	hasError?: boolean
	disabled?: boolean
	typeable?: boolean
	disables?: boolean
}
// DatePicker component definition
function DatePicker({
	selected,
	mode = "single",
	onSelect,
	disabled,
	label,
	hasError = false,
	showTime = true,
	triggerClassName,
	showDateRangeShortcut = false,
	defaultDateRangeShortcutValue,
	placeholder,
	// timePickerProps,
	// timeZoneProps,
	// onSelectTime,
	// selectedTimezone,
	// onSelectTimezone,
	size = defaultInputSize,
	rounded = defaultInputRadius,
	typeable = false,
	...props
}: DatePickerProps) {
	const [internalSelected, setInternalSelected] = React.useState<CalendarDate | CalendarDate[] | CalendarRange | undefined>(selected || undefined)
	const isControlled = selected !== undefined
	const currentSelected = isControlled ? selected : internalSelected
	const [selectedShortcut, setSelectedShortcut] = React.useState<string | null>(defaultDateRangeShortcutValue || null)
	// const [time, setTime] = React.useState<Time | null>(null)
	// const [timezone, setTimezone] = React.useState<string | null>(null)
	// const currenTimezone = selectedTimezone || timezone

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

	const getDisplayText = () => {
		if (!currentSelected) return placeholder

		if (mode === "single" && currentSelected instanceof CalendarDate) {
			return format(currentSelected.toDate(getLocalTimeZone()), "MMM dd, yyyy")
		}

		if (mode === "multiple" && Array.isArray(currentSelected)) {
			return currentSelected.map((date) => format(date.toDate(getLocalTimeZone()), "MMM dd")).join(", ")
		}

		if (mode === "range" && isCalendarRange(currentSelected)) {
			if (showDateRangeShortcut && selectedShortcut && selectedShortcut !== "custom") {
				return selectedShortcut
					.split("_")
					.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
					.join(" ")
			} else {
				return `${format(currentSelected.from.toDate(getLocalTimeZone()), "MMM dd")} - ${format(currentSelected.to!.toDate(getLocalTimeZone()), "MMM dd")}`
			}
		}

		return placeholder
	}
	const displayText = getDisplayText()

	const [inputValue, setInputValue] = useState(displayText || "")

	const sizeHeightMapping = {
		28: "h-4 w-4",
		32: "h-5 w-5",
		36: "h-5 w-5",
		40: "h-5 w-5",
		44: "h-6 w-6",
		48: "h-6 w-6",
	}

	const [open, setOpen] = useState<boolean>(false)
	const [time, setTime] = useState<string>("")
	const getCurrentTimeInAMPM = (): string => {
		const now = new Date()
		let hours = now.getHours()
		const minutes = now.getMinutes()
		const ampm = hours >= 12 ? "PM" : "AM"

		hours = hours % 12 || 12 // Convert 0 to 12
		const minutesStr = minutes < 10 ? `0${minutes}` : minutes

		return `${hours}:${minutesStr} ${ampm}`
	}
	useEffect(() => {
		const currentTime = getCurrentTimeInAMPM()
		setTime(currentTime)
	}, [])

	useEffect(() => {
		const todayFormatted = format(new Date(), "MMMM dd, yyyy")
		const datePart = displayText || todayFormatted
		const combined = time ? `${datePart}, ${time}` : datePart
		setInputValue(combined)
	}, [displayText, time])

	const alignOffset = useMemo(() => {
		if (showTime && showDateRangeShortcut && props.dualCalendar) return -581
		if (props.dualCalendar && showTime) return -378
		if (props.dualCalendar && showDateRangeShortcut) return -458
		if (showTime && showDateRangeShortcut) return -298
		if (props.dualCalendar) return -259
		if (showTime) return -98
		if (showDateRangeShortcut) return -178
		return 20
	}, [props.dualCalendar, showTime, showDateRangeShortcut])

	return (
		<div>
			{typeable ? (
				<>
					<TypeableDatePicker
						size={size}
						label={label}
						rounded={rounded}
						disables={disabled}
						hasError={hasError}
						errorMsg={hasError ? "There is an error" : undefined}
						showTime={showTime}
						showDateRangeShortcut={showDateRangeShortcut}
						{...props}
					/>
				</>
			) : (
				<>
					<Input
						size={size}
						onClick={() => !disabled && setOpen(true)}
						label={label}
						rounded={rounded}
						disabled={disabled}
						hasError={hasError}
						errorMsg={hasError ? "There is an error" : undefined}
						className={cn(triggerClassName)}
						readOnly
						value={inputValue}
						placeholder="Date picker"
						trial={
							<Popover align="end" open={open} onOpenChange={setOpen} sideOffset={14}>
								<PopoverTrigger disabled={disabled}>
									<CalendarIcon
										className={cn(sizeHeightMapping[size || 36], "stroke-text-tertiary cursor-pointer", {
											"text-text-tertiary": !disabled,
											"text-text-disabled cursor-not-allowed": disabled,
										})}
									/>
								</PopoverTrigger>

								<PopoverContent
									alignOffset={alignOffset}
									className={cn("bg-bg-base drop-shadow-xs flex w-fit flex-col gap-3 rounded-xl border-none p-0 shadow-none")}>
									{mode === "single" && (
										<Calendar
											onIndexChange={(value) => {
												if (value !== null) {
													setTime?.(value)
												}
											}}
											mode="single"
											selected={currentSelected as CalendarDate}
											onSelect={onSelectHandler}
											showTime={showTime}
											showShortcut={showDateRangeShortcut}
											{...props}
										/>
									)}
									{mode === "multiple" && (
										<Calendar
											mode="multiple"
											onIndexChange={(value) => {
												if (value !== null) {
													setTime?.(value)
												}
											}}
											selected={currentSelected as CalendarDate[]}
											onSelect={onSelectHandler}
											showTime={showTime}
											showShortcut={showDateRangeShortcut}
											{...props}
										/>
									)}
									{mode === "range" && (
										<Calendar
											mode="range"
											onIndexChange={(value) => {
												if (value !== null) {
													setTime?.(value)
												}
											}}
											selected={currentSelected as CalendarRange}
											showTime={showTime}
											showShortcut={showDateRangeShortcut}
											onSelect={onSelectHandler}
											{...props}
										/>
									)}
								</PopoverContent>
							</Popover>
						}
					/>
				</>
			)}
		</div>
	)
}

// Type definition for DateRangeShortcutProps props
type DateRangeShortcutProps = {
	handleShortcutSelect?: (shortcut: DateRangeShortcutValues) => void
	selectedValue?: string | null
	mode?: string
}
// DateRangeShortcut component definition
export function DateRangeShortcut({ selectedValue, handleShortcutSelect, mode }: DateRangeShortcutProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				handleShortcutSelect?.("custom") // clear selection
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [handleShortcutSelect])
	return (
		<div
			ref={containerRef}
			className={`border-border w-50 flex flex-col border-r px-1.5 py-1 ${mode === "single" || mode === "multiple" ? "bg-fill-level1 text-text-disabled cursor-not-allowed" : "text-text"}`}>
			<p className="text-text-tertiary h-8 rounded-sm px-2 py-2.5 text-xs font-medium">SELECT DATE</p>
			{DATE_RANGE_SHORTCUT_VALUES.map((value) => (
				<DateRangeShortcutItem
					mode={mode}
					key={value}
					label={value.charAt(0).toUpperCase() + value.split("_").join(" ").slice(1)}
					value={value}
					onClick={function () {
						handleShortcutSelect?.(value)
					}}
					selectedValue={selectedValue || null}
				/>
			))}
		</div>
	)
}
type DateRangeShortcutItemProps = {
	selectedValue: string | null
	onClick: (e: React.MouseEvent<HTMLSpanElement>) => void
	value: string
	label: string
	mode?: string
}

// DateRangeShortcutItem component definition
function DateRangeShortcutItem({ selectedValue, onClick, label, value, mode }: DateRangeShortcutItemProps) {
	return (
		<span
			className={`${mode === "single" || mode === "multiple" ? "cursor-not-allowed" : "hover:bg-fill-level2 cursor-pointer"} group flex flex-nowrap items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm font-normal leading-5`}
			data-value={value}
			onClick={mode !== "single" && mode !== "multiple" ? onClick : undefined}>
			{label}
			{selectedValue === value ? (
				mode !== "single" && mode !== "multiple" ? (
					<Check className="stroke-text-secondary" size={16} />
				) : (
					<span className="size-4" />
				)
			) : (
				<span className="size-4" />
			)}
		</span>
	)
}
export default DatePicker

function TypeableDatePicker({
	size,
	label,
	rounded,
	disables,
	hasError,
	classNames,
	components,
	navigatorStyle = "button",
	showTime = false,
	dualCalendar = false,
	className,
	footer,
	showDateRangeShortcut,
	errorMsg,
	...props
}: DatePickerProps) {
	const mergedClassName = cn(`p-3 bg-bg-level1 ${showTime ? " border-r" : ""}`, className)
	const hideCaption: boolean = false

	// Merged class names for styling
	const mergedClassNames = getMergedClassNames({
		props,
		navigatorStyle,
		dualCalendar,
		hideCaption,
		classNames,
	})

	// Merged components including custom ones
	const mergedComponents = {
		Chevron: (props: ChevronProps) => {
			if (props.orientation === "left") return <ChevronLeft size={16} className="stroke-text" />
			return <ChevronRight size={16} className="stroke-text" />
		},
		// ...customComponents,
		...components,
	}

	const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

	// Convert Date to DateValue for the DateField
	const [dateTime, setDateTime] = useState<ZonedDateTime | null>(now(getLocalTimeZone()))

	const dateTimeValue = dateTime ? new CalendarDateTime(dateTime.year, dateTime.month, dateTime.day, dateTime.hour, dateTime.minute) : null

	// Handle time change
	const handleDateTimeChange = (value: DateValue | null) => {
		if (!value) {
			setDateTime(null)
			return
		}

		const newDateTime = parseZonedDateTime(
			`${value.year}-${String(value.month).padStart(2, "0")}-${String(value.day).padStart(2, "0")}` +
				`T${String("hour" in value ? value.hour : 0).padStart(2, "0")}:${String("minute" in value ? value.minute : 0).padStart(2, "0")}` +
				`[America/Los_Angeles]`
		)
		setDateTime(newDateTime)
	}

	const sizeHeightMapping = {
		28: "h-4 w-4",
		32: "h-5 w-5",
		36: "h-5 w-5",
		40: "h-5 w-5",
		44: "h-6 w-6",
		48: "h-6 w-6",
	}

	useEffect(() => {
		// If dateTime is not set, do nothing
		if (!dateTime) return

		// Find the matching index from timeOptions based on the dateTime hour and minute
		const matchedIndex = timeOptions.findIndex((time) => time.hour === dateTime.hour && time.minute === dateTime.minute)

		// If a matching time is found, update the selectedIndex to sync the checkmark
		if (matchedIndex !== -1 && matchedIndex !== selectedIndex) {
			setSelectedIndex(matchedIndex)
		}
	}, [dateTime, timeOptions, selectedIndex, setSelectedIndex])

	return (
		<Popover>
			<PopoverTrigger disabled={disables}>
				<div className="flex flex-col items-start gap-1.5">
					{label && <Label className={cn({ "text-text-disabled cursor-not-allowed": disables })}>{label}</Label>}
					<div
						className={cn("w-[320px]", dateInputStyles({ size, rounded }), {
							"border-error focus-within:ring-error/10 focus-within:ring-2": hasError && !disables,

							"focus-within:border-primary focus-within:ring-primary/10 border-border-alpha focus-within:ring-2": !hasError && !disables,

							"text-text-disables bg-fill-level1 cursor-not-allowed drop-shadow-none": disables,
						})}>
						<DateField
							granularity="minute"
							className={cn("flex flex-col gap-1 border-none")}
							value={dateTimeValue}
							onChange={handleDateTimeChange}
							isDisabled={disables}
							{...props}>
							<DateInputRC>
								{(segment) => (
									<DateSegment
										className={cn(
											size,
											"rounded-sm text-end",
											"data-[focused]:bg-bg-level2",
											"data-placeholder:text-text-tertiary",
											"focus:outline-hidden focus:caret-transparent",
											"data-[type=dayPeriod]:mr-0.5 data-[type=literal]:mr-0.5",
											{
												"text-text-disabled placeholder-text-disabled cursor-not-allowed": disables,
											}
										)}
										segment={segment}
									/>
								)}
							</DateInputRC>
						</DateField>
						<CalendarIcon
							className={cn(sizeHeightMapping[size || 36], "stroke-text-tertiary cursor-pointer", {
								"text-text-tertiary": !disables,
								"text-text-disabled cursor-not-allowed": disables,
							})}
						/>
					</div>
					{hasError && <Label className={cn("text-error flex items-start text-xs font-medium", className)}>{errorMsg}</Label>}
				</div>
			</PopoverTrigger>

			<PopoverContent className="w-auto border-none p-0">
				<div className="bg-bg-level1 border-border drop-shadow-xs w-fit overflow-hidden rounded-xl border">
					<div className={`flex ${footer ? "border-b" : ""} overflow-hidden`}>
						{showDateRangeShortcut && <DateRangeShortcut mode="single" />}
						<DayPicker
							mode="single"
							numberOfMonths={dualCalendar ? 2 : 1}
							selected={dateTime ? new Date(dateTime.year, dateTime.month - 1, dateTime.day) : undefined}
							month={dateTime ? new Date(dateTime.year, dateTime.month - 1, 1) : new Date()}
							onSelect={(selectedDate) => {
								if (selectedDate) {
									const currentTime = dateTime
										? {
												hour: dateTime.hour,
												minute: dateTime.minute,
											}
										: { hour: 0, minute: 0 }

									const newDateTime = parseZonedDateTime(
										`${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}` +
											`T${String(currentTime.hour).padStart(2, "0")}:${String(currentTime.minute).padStart(2, "0")}` +
											`[America/Los_Angeles]`
									)
									setDateTime(newDateTime)
								}
							}}
							className={mergedClassName}
							showOutsideDays
							defaultMonth={dateTime ? new Date(dateTime.year, dateTime.month - 1, 1) : new Date()}
							components={mergedComponents}
							classNames={mergedClassNames}
						/>
						<TimeSelector
							timeOptions={timeOptions}
							selectedIndex={selectedIndex}
							setSelectedIndex={setSelectedIndex}
							formatTime={formatTime}
							showTime={showTime}
							onTimeSelect={(formattedTime) => {
								const [timePart, rawPeriod] = formattedTime.trim().split(" ")
								if (!timePart || !rawPeriod) return

								const period = rawPeriod.toUpperCase() === "PM" ? "PM" : "AM"
								const [hourStr, minuteStr] = timePart.split(":")
								let hour = parseInt(hourStr, 10)
								const minute = parseInt(minuteStr, 10)

								// Convert to 24-hour format
								if (period === "AM" && hour === 12) hour = 0
								if (period === "PM" && hour !== 12) hour += 12

								if (dateTime) {
									const newDateTime = parseZonedDateTime(
										`${dateTime.year}-${String(dateTime.month).padStart(2, "0")}-${String(dateTime.day).padStart(2, "0")}` +
											`T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}` +
											`[America/Los_Angeles]`
									)
									setDateTime(newDateTime)
								}
							}}
						/>
					</div>
					<div className="flex w-full justify-end">{footer && footer}</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
