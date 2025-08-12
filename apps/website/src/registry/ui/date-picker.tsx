import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { CalendarDate, Time, getLocalTimeZone, today } from "@internationalized/date"
import { ZonedDateTime, parseZonedDateTime } from "@internationalized/date"
import { cva } from "class-variance-authority"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Check } from "lucide-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { type ChevronProps, DayPicker, type Modifiers } from "react-day-picker"
import { cn } from "@/lib/utils"
import { TimeSelector, formatTime, timeOptions } from "../ui/calendar"
import { Calendar, type CalendarProps, type CalendarRange, getMergedClassNames } from "./calendar"
import { Input, type RoundedOptions, type SizeOptions, cvaInputVariants, defaultInputRadius, defaultInputSize } from "./input"
import { Label } from "./label"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { type SelectProps } from "./select"
import { type TimePickerProps } from "./time-picker"

export const dateInputStyles = cva("flex h-10 items-center justify-between gap-2 border drop-shadow-xs bg-base cursor-text", {
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

const DATE_RANGE_SHORTCUT_VALUES = ["today", "last_7_days", "last_30_days", "last_3_months", "last_6_months", "last_12_months", "custom"] as const
export type DateRangeShortcutValues = (typeof DATE_RANGE_SHORTCUT_VALUES)[number]

export type DatePickerModes = "single" | "multiple" | "range" | "time"

// Custom Segmented Date Input Types and Component
interface DateSegment {
	type: "month" | "day" | "year" | "hour" | "minute" | "ampm" | "literal"
	value: string
	placeholder: string
	maxLength: number
	editable: boolean
}

interface SegmentedDateInputProps {
	value?: ZonedDateTime | null
	onChange?: (dateTime: ZonedDateTime | null) => void
	showTime?: boolean
	disabled?: boolean
	className?: string
	size?: SizeOptions
}

function SegmentedDateInput({ value, onChange, showTime = false, disabled = false, className = "", size = "32" }: SegmentedDateInputProps) {
	const [focusedIndex, setFocusedIndex] = useState<number>(-1)
	const [segments, setSegments] = useState<DateSegment[]>([])
	const inputRefs = useRef<(HTMLInputElement | null)[]>([])

	// Initialize segments based on showTime
	const initializeSegments = useCallback(() => {
		const baseSegments: DateSegment[] = [
			{ type: "month", value: "", placeholder: "mm ", maxLength: 2, editable: true },
			{ type: "literal", value: "/", placeholder: "/", maxLength: 1, editable: false },
			{ type: "day", value: "", placeholder: "dd", maxLength: 2, editable: true },
			{ type: "literal", value: "/", placeholder: "/", maxLength: 1, editable: false },
			{ type: "year", value: "", placeholder: "yyyy", maxLength: 4, editable: true },
		]

		if (showTime) {
			baseSegments.push(
				{ type: "literal", value: " ", placeholder: " ", maxLength: 1, editable: false },
				{ type: "hour", value: "", placeholder: "hh", maxLength: 2, editable: true },
				{ type: "literal", value: ":", placeholder: ":", maxLength: 1, editable: false },
				{ type: "minute", value: "", placeholder: "mm ", maxLength: 2, editable: true },
				{ type: "literal", value: " ", placeholder: " ", maxLength: 1, editable: false },
				{ type: "ampm", value: "", placeholder: "AM", maxLength: 2, editable: true }
			)
		}

		setSegments(baseSegments)
	}, [showTime])

	// Update segments from ZonedDateTime value
	const updateSegmentsFromValue = useCallback((dateTime: ZonedDateTime | null) => {
		setSegments((prev) =>
			prev.map((segment) => {
				if (!dateTime) {
					return { ...segment, value: segment.editable ? "" : segment.placeholder }
				}

				switch (segment.type) {
					case "month":
						return { ...segment, value: String(dateTime.month).padStart(2, "0") }
					case "day":
						return { ...segment, value: String(dateTime.day).padStart(2, "0") }
					case "year":
						return { ...segment, value: String(dateTime.year) }
					case "hour":
						const displayHour = dateTime.hour % 12 || 12
						return { ...segment, value: String(displayHour).padStart(2, "0") }
					case "minute":
						return { ...segment, value: String(dateTime.minute).padStart(2, "0") }
					case "ampm":
						return { ...segment, value: dateTime.hour >= 12 ? "PM" : "AM" }
					default:
						return segment
				}
			})
		)
	}, [])

	// Initialize segments on mount
	useEffect(() => {
		initializeSegments()
	}, [initializeSegments])

	// Update segments when value prop changes
	useEffect(() => {
		if (segments.length > 0) {
			updateSegmentsFromValue(value ?? null)
		}
	}, [value, segments.length, updateSegmentsFromValue])

	const handleSegmentChange = (index: number, newValue: string) => {
		const segment = segments[index]
		if (!segment.editable) return

		// Validate input based on segment type
		let validatedValue = newValue

		switch (segment.type) {
			case "month":
				validatedValue = newValue.replace(/\D/g, "").slice(0, 2)
				if (parseInt(validatedValue) > 12 && validatedValue.length === 2) validatedValue = "12"
				break
			case "day":
				validatedValue = newValue.replace(/\D/g, "").slice(0, 2)
				if (parseInt(validatedValue) > 31 && validatedValue.length === 2) validatedValue = "31"
				break
			case "year":
				validatedValue = newValue.replace(/\D/g, "").slice(0, 4)
				break
			case "hour":
				validatedValue = newValue.replace(/\D/g, "").slice(0, 2)
				const hourNum = parseInt(validatedValue)
				if (hourNum > 12 && validatedValue.length === 2) validatedValue = "12"
				if (hourNum === 0 && validatedValue.length === 2) validatedValue = "01"
				break
			case "minute":
				validatedValue = newValue.replace(/\D/g, "").slice(0, 2)
				if (parseInt(validatedValue) > 59 && validatedValue.length === 2) validatedValue = "59"
				break
			case "ampm":
				const upper = newValue.toUpperCase()
				if (upper.startsWith("A")) validatedValue = "AM"
				else if (upper.startsWith("P")) validatedValue = "PM"
				else validatedValue = upper.slice(0, 2).replace(/[^AP]/g, "")
				break
		}

		const newSegments = [...segments]
		newSegments[index] = { ...segment, value: validatedValue }
		setSegments(newSegments)

		// Try to parse and notify parent
		setTimeout(() => {
			const updatedSegments = [...segments]
			updatedSegments[index] = { ...segment, value: validatedValue }

			const monthSegment = updatedSegments.find((s) => s.type === "month")
			const daySegment = updatedSegments.find((s) => s.type === "day")
			const yearSegment = updatedSegments.find((s) => s.type === "year")

			const month = monthSegment?.value
			const day = daySegment?.value
			const year = yearSegment?.value

			if (month && day && year && month.length >= 1 && day.length >= 1 && year.length === 4) {
				let hour = 0
				let minute = 0

				if (showTime) {
					const hourSegment = updatedSegments.find((s) => s.type === "hour")?.value
					const minuteSegment = updatedSegments.find((s) => s.type === "minute")?.value
					const ampm = updatedSegments.find((s) => s.type === "ampm")?.value

					if (hourSegment && minuteSegment && ampm && hourSegment.length >= 1 && minuteSegment.length >= 1) {
						hour = parseInt(hourSegment, 10)
						minute = parseInt(minuteSegment, 10)

						if (ampm === "AM" && hour === 12) hour = 0
						if (ampm === "PM" && hour !== 12) hour += 12
					} else if (showTime) {
						onChange?.(null)
						return
					}
				}

				const isoString = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}[America/Los_Angeles]`
				const parsedDateTime = parseZonedDateTime(isoString)
				onChange?.(parsedDateTime)
			} else if (!month && !day && !year) {
				onChange?.(null)
			}
		}, 0)

		// Auto-advance to next editable segment
		if (validatedValue.length === segment.maxLength) {
			const nextEditableIndex = segments.findIndex((s, i) => i > index && s.editable)
			if (nextEditableIndex !== -1) {
				setTimeout(() => {
					inputRefs.current[nextEditableIndex]?.focus()
				}, 0)
			}
		}
	}

	const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
		const segment = segments[index]

		if (e.key === "ArrowRight" || (e.key === "Tab" && !e.shiftKey)) {
			const nextIndex = segments.findIndex((s, i) => i > index && s.editable)
			if (nextIndex !== -1) {
				e.preventDefault()
				inputRefs.current[nextIndex]?.focus()
			}
		} else if (e.key === "ArrowLeft" || (e.key === "Tab" && e.shiftKey)) {
			const prevSegments = segments.slice(0, index).reverse()
			const prevIndex = prevSegments.findIndex((s) => s.editable)
			if (prevIndex !== -1) {
				const actualIndex = index - prevIndex - 1
				e.preventDefault()
				inputRefs.current[actualIndex]?.focus()
			}
		} else if (e.key === "Backspace" && segment.value === "") {
			const prevSegments = segments.slice(0, index).reverse()
			const prevIndex = prevSegments.findIndex((s) => s.editable)
			if (prevIndex !== -1) {
				const actualIndex = index - prevIndex - 1
				inputRefs.current[actualIndex]?.focus()
			}
		}
	}

	const sizeClassMap = {
		0: "h-fit",
		28: "h-7 text-xs ",
		32: "h-8 text-sm",
		36: "h-9 text-sm",
		40: "h-10 text-sm",
		44: "h-11 text-base",
		48: "h-12 text-base",
	}

	return (
		<div className={`flex items-center ${sizeClassMap[size]} ${className}`}>
			{segments.map((segment, index) => {
				if (!segment.editable) {
					return (
						<span key={index} className="text-fg-tertiary mx-1 select-none">
							{segment.placeholder}
						</span>
					)
				}

				return (
					<input
						key={index}
						ref={(el) => {
							inputRefs.current[index] = el
						}}
						type="text"
						value={segment.value}
						onChange={(e) => handleSegmentChange(index, e.target.value)}
						onKeyDown={(e) => handleKeyDown(index, e)}
						onFocus={() => setFocusedIndex(index)}
						onBlur={() => setFocusedIndex(-1)}
						disabled={disabled}
						placeholder={segment.placeholder}
						className={cn(
							"inline-block rounded-sm border-none bg-transparent text-center outline-none",
							"data-[focused]:bg-fill3",
							"placeholder:text-fg-tertiary",
							"focus:outline-hidden focus:caret-transparent",
							{
								"bg-fill3": focusedIndex === index,
								"text-fg-disabled placeholder-text-disabled cursor-not-allowed": disabled,
							}
						)}
						style={{
							width: `${Math.max(segment.placeholder.length * 0.8, 1.5)}em`,
							minWidth: "1.2em",
						}}
					/>
				)
			})}
		</div>
	)
}

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
	onChange?: (dateTime: ZonedDateTime | null) => void
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
	onSelectTime,
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
										className={cn(sizeHeightMapping[size || 36], "stroke-fg-tertiary cursor-pointer", {
											"text-fg-tertiary": !disabled,
											"text-fg-disabled cursor-not-allowed": disabled,
										})}
									/>
								</PopoverTrigger>

								<PopoverContent alignOffset={alignOffset} className={cn("bg-base drop-shadow-xs flex w-fit flex-col gap-3 rounded-xl border-none p-0 shadow-none")}>
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
			className={`border-border w-50 flex flex-col border-r px-1.5 py-1 ${mode === "single" || mode === "multiple" ? "bg-fill1 text-fg-disabled cursor-not-allowed" : "text-fg"}`}>
			<p className="text-fg-tertiary h-8 rounded-sm px-2 py-2.5 text-xs font-medium">SELECT DATE</p>
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
			className={`${mode === "single" || mode === "multiple" ? "cursor-not-allowed" : "hover:bg-fill2 cursor-pointer"} group flex flex-nowrap items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm font-normal leading-5`}
			data-value={value}
			onClick={mode !== "single" && mode !== "multiple" ? onClick : undefined}>
			{label}
			{selectedValue === value ? (
				mode !== "single" && mode !== "multiple" ? (
					<Check className="stroke-fg-secondary" size={16} />
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
	onChange,
	value,
	...props
}: DatePickerProps & {
	onChange?: (dateTime: ZonedDateTime | null) => void
	value?: ZonedDateTime | null
}) {
	const mergedClassName = cn(`p-3 bg-elevation-level1 ${showTime ? " border-r" : ""}`, className)
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
			if (props.orientation === "left") return <ChevronLeft size={16} className="stroke-fg" />
			return <ChevronRight size={16} className="stroke-fg" />
		},
		...components,
	}

	const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

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
					{label && <Label className={cn({ "text-fg-disabled cursor-not-allowed": disables })}>{label}</Label>}
					<div
						className={cn("w-[320px]", dateInputStyles({ size, rounded }), {
							"border-error focus-within:ring-error/10 focus-within:ring-2": hasError && !disables,
							"focus-within:border-primary focus-within:ring-primary/10 border-alpha focus-within:ring-2": !hasError && !disables,
							"text-fg-disables bg-fill1 cursor-not-allowed drop-shadow-none": disables,
						})}>
						<SegmentedDateInput value={dateTime} onChange={handleDateTimeChange} showTime={showTime} disabled={disables} size={size} />
						<CalendarIcon
							className={cn(sizeHeightMapping[size || 36], "stroke-fg-tertiary cursor-pointer", {
								"text-fg-tertiary": !disables,
								"text-fg-disabled cursor-not-allowed": disables,
							})}
						/>
					</div>
					{hint && <Label className={`flex items-start text-xs font-normal ${hasError ? "text-error" : "text-fg-tertiary"}`}>{hint}</Label>}
				</div>
			</PopoverTrigger>

			<PopoverContent className="w-auto border-none p-0">
				<div className="bg-elevation-level1 border-border drop-shadow-xs w-fit overflow-hidden rounded-xl border">
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

export { DatePicker }
