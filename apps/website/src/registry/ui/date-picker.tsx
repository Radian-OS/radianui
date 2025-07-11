import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { CalendarDate, Time, getLocalTimeZone, today } from "@internationalized/date"
import { CalendarDateTime, ZonedDateTime, parseZonedDateTime } from "@internationalized/date"
import { cva } from "class-variance-authority"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Check } from "lucide-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DateField, DateInput as DateInputRC, DateSegment, DateValue } from "react-aria-components"
import { ChevronProps, DayPicker, Modifiers } from "react-day-picker"
import { cn } from "@/lib/utils"
import { TimeSelector, formatTime, timeOptions } from "../ui/calendar"
import Calendar, { type CalendarProps, CalendarRange, getMergedClassNames } from "./calendar"
import { Input, RoundedOptions, SizeOptions, cvaInputVariants, defaultInputRadius, defaultInputSize } from "./input"
import { Label } from "./label"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { SelectProps } from "./select"
import { TimePickerProps } from "./time-picker"

export const dateInputStyles = cva("flex h-10 items-center justify-between gap-2 border drop-shadow-xs bg-bg-base cursor-text", {
	variants: {
		...cvaInputVariants,
	},
	defaultVariants: {
		rounded: "md",
		size: "40",
	},
})

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
	hint?: string
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
	onChange?: (dateTime: ZonedDateTime | null) => void // Add this line
	value?: ZonedDateTime | null
}
// DatePicker component definition
function DatePicker({
	selected,
	mode = "single",
	onSelect,
	disabled,
	label,
	hint,
	hasError = false,
	showTime = true,
	triggerClassName,
	showDateRangeShortcut = false,
	defaultDateRangeShortcutValue,
	placeholder,
	// timePickerProps,
	// timeZoneProps,
	onSelectTime,
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

	// Add state for typeable date time
	const [typeableDateTime, setTypeableDateTime] = useState<ZonedDateTime | null>(null)

	// Handle typeable date time changes
	const handleTypeableChange = (dateTime: ZonedDateTime | null) => {
		setTypeableDateTime(dateTime)

		// Convert ZonedDateTime to CalendarDate for consistency with existing onSelect
		if (dateTime) {
			const calendarDate = new CalendarDate(dateTime.year, dateTime.month, dateTime.day)
			onSelect?.(calendarDate as CalendarDate & CalendarDate[] & CalendarRange, calendarDate, {}, mockMouseClick())
		} else {
			onSelect?.(undefined, today(getLocalTimeZone()), {}, mockMouseClick())
		}
	}

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
		return typeof value === "object" && value !== null && "from" in value && value.from instanceof CalendarDate && ("to" in value ? value.to instanceof CalendarDate : true)
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
		0: "",
		28: "h-4 w-4",
		32: "h-5 w-5",
		36: "h-5 w-5",
		40: "h-5 w-5",
		44: "h-6 w-6",
		48: "h-6 w-6",
	}

	const [open, setOpen] = useState<boolean>(false)
	const [timeDisplay, setTimeDisplay] = useState<string>("")

	useEffect(() => {
		if (!displayText && !timeDisplay) return // Skip setting input if both are empty

		// const todayFormatted = format(new Date(), "MMMM dd, yyyy");
		const datePart = displayText
		const combined = timeDisplay ? `${datePart}, ${timeDisplay}` : datePart
		setInputValue(combined || "")
	}, [displayText, timeDisplay])

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
						hint={hint ? `${hint}` : ""}
						showTime={showTime}
						showDateRangeShortcut={showDateRangeShortcut}
						onChange={handleTypeableChange}
						value={props.value || typeableDateTime}
						onSelectTime={onSelectTime}
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
						hint={hint ? `${hint}` : ""}
						className={cn(triggerClassName)}
						readOnly
						value={inputValue}
						placeholder="Select a date"
						end={
							<Popover align="end" open={open} onOpenChange={setOpen} sideOffset={14}>
								<PopoverTrigger disabled={disabled}>
									<CalendarIcon
										className={cn(sizeHeightMapping[size || 36], "stroke-text-tertiary cursor-pointer", {
											"text-text-tertiary": !disabled,
											"text-text-disabled cursor-not-allowed": disabled,
										})}
									/>
								</PopoverTrigger>

								<PopoverContent alignOffset={alignOffset} className={cn("bg-bg-base drop-shadow-xs flex w-fit flex-col gap-3 rounded-xl border-none p-0 shadow-none")}>
									{mode === "single" && (
										<Calendar
											onIndexChange={(value) => {
												if (value !== null) {
													setTimeDisplay?.(value)
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
													setTimeDisplay?.(value)
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
													setTimeDisplay?.(value)
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
	onSelectTime,
	hint,
	time,
	onChange, // Add this prop
	value, // Add this prop for controlled component
	...props
}: DatePickerProps & {
	onChange?: (dateTime: ZonedDateTime | null) => void
	value?: ZonedDateTime | null
}) {
	const mergedClassName = cn(`p-3 bg-bg-level1 ${showTime ? " border-r" : ""}`, className)
	const hideCaption: boolean = false

	// Use controlled/uncontrolled pattern
	const [internalDateTime, setInternalDateTime] = useState<ZonedDateTime | null>(null)
	const isControlled = value !== undefined
	const dateTime = isControlled ? value : internalDateTime

	// Initialize dateTime from props if provided
	useEffect(() => {
		if (!isControlled && !internalDateTime) {
			// Try to create initial dateTime from props
			const today = new Date()
			const initialHour = time?.hour || 0
			const initialMinute = time?.minute || 0

			const isoString =
				`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}` +
				`T${String(initialHour).padStart(2, "0")}:${String(initialMinute).padStart(2, "0")}` +
				`[America/Los_Angeles]`

			try {
				const initialDateTime = parseZonedDateTime(isoString)
				setInternalDateTime(initialDateTime)
			} catch (error) {
				console.error("Failed to parse initial dateTime", error)
			}
		}
	}, [time, isControlled, internalDateTime])

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
		...components,
	}

	const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

	// Convert to DateValue for DateField
	const dateValue = useMemo(() => {
		if (!dateTime) {
			// If no dateTime but time prop exists, create a dateTime with today's date
			if (time && !dateTime) {
				const today = new Date()
				const isoString =
					`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}` +
					`T${String(time.hour).padStart(2, "0")}:${String(time.minute).padStart(2, "0")}` +
					`[America/Los_Angeles]`

				try {
					const tempDateTime = parseZonedDateTime(isoString)
					return new CalendarDateTime(tempDateTime.year, tempDateTime.month, tempDateTime.day, showTime ? tempDateTime.hour : 0, showTime ? tempDateTime.minute : 0)
				} catch (error) {
					console.error("Failed to create dateValue from time prop", error)
					return null
				}
			}
			return null
		}

		return new CalendarDateTime(dateTime.year, dateTime.month, dateTime.day, showTime ? dateTime.hour : 0, showTime ? dateTime.minute : 0)
	}, [dateTime, showTime, time])

	// Modified to call onChange callback
	const handleDateTimeChange = (newDateTime: ZonedDateTime | null) => {
		if (!isControlled) {
			setInternalDateTime(newDateTime)
		}
		onChange?.(newDateTime) // Notify parent of changes

		// Also call onSelectTime if time changes
		if (newDateTime && onSelectTime) {
			const newTime = new Time(newDateTime.hour, newDateTime.minute)
			onSelectTime(newTime)
		}
	}

	// Handle date changes with proper validation
	const handleDateChange = useCallback(
		(value: DateValue | null) => {
			if (!value) {
				handleDateTimeChange(null)
				return
			}

			try {
				// Ensure all date parts are properly formatted
				const year = value.year
				const month = "month" in value ? value.month : dateTime?.month || 1
				const day = "day" in value ? value.day : dateTime?.day || 1
				const hour = showTime && "hour" in value ? value.hour : dateTime?.hour || 0
				const minute = showTime && "minute" in value ? value.minute : dateTime?.minute || 0

				// Construct properly padded ISO string
				const isoString =
					`${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}` +
					`T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}` +
					`[America/Los_Angeles]`

				const newDateTime = parseZonedDateTime(isoString)
				handleDateTimeChange(newDateTime)
			} catch (error) {
				console.error("Invalid date input", error)
			}
		},
		[dateTime, showTime, handleDateTimeChange]
	)

	const sizeHeightMapping = {
		0: "",
		28: "h-4 w-4",
		32: "h-5 w-5",
		36: "h-5 w-5",
		40: "h-5 w-5",
		44: "h-6 w-6",
		48: "h-6 w-6",
	}

	useEffect(() => {
		if (!dateTime) return

		const matchedIndex = timeOptions.findIndex((time) => time.hour === dateTime.hour && time.minute === dateTime.minute)

		if (matchedIndex !== -1 && matchedIndex !== selectedIndex) {
			setSelectedIndex(matchedIndex)
		}
	}, [dateTime, selectedIndex])

	// Update selectedIndex when time prop changes
	useEffect(() => {
		if (time && timeOptions) {
			const matchedIndex = timeOptions.findIndex((option) => option.hour === time.hour && option.minute === time.minute)
			if (matchedIndex !== -1) {
				setSelectedIndex(matchedIndex)
			}
		}
	}, [time, timeOptions])

	return (
		<Popover>
			<PopoverTrigger disabled={disables} asChild>
				<div className="flex flex-col items-start gap-1.5">
					{label && <Label className={cn({ "text-text-disabled cursor-not-allowed": disables })}>{label}</Label>}
					<div
						className={cn("w-[320px]", dateInputStyles({ size, rounded }), {
							"border-error focus-within:ring-error/10 focus-within:ring-2": hasError && !disables,
							"focus-within:border-primary focus-within:ring-primary/10 border-border-alpha focus-within:ring-2": !hasError && !disables,
							"text-text-disables bg-fill-level1 cursor-not-allowed drop-shadow-none": disables,
						})}>
						<DateField
							granularity={showTime ? "minute" : "day"}
							className={cn("flex flex-col gap-1 border-none")}
							value={dateValue}
							onChange={handleDateChange}
							isDisabled={disables}
							{...props}>
							<DateInputRC>
								{(segment) => (
									<DateSegment
										className={cn(
											size,
											"rounded-sm text-end",
											"data-[focused]:bg-fill-level3",
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
					{hint && <Label className={`flex items-start text-xs font-normal ${hasError ? "text-error" : "text-text-tertiary"}`}>{hint}</Label>}
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

									const year = selectedDate.getFullYear()
									const month = selectedDate.getMonth() + 1
									const maxDay = new Date(year, month, 0).getDate()
									const day = Math.min(selectedDate.getDate(), maxDay)

									const newDateTime = parseZonedDateTime(
										`${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}` +
											`T${String(currentTime.hour).padStart(2, "0")}:${String(currentTime.minute).padStart(2, "0")}` +
											`[America/Los_Angeles]`
									)

									handleDateTimeChange(newDateTime)
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
									handleDateTimeChange(newDateTime)
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
