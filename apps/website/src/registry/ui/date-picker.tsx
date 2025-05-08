import React, { useEffect, useMemo, useState } from "react"
import { CalendarDate, Time, getLocalTimeZone, today } from "@internationalized/date"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Check } from "lucide-react"
import { Modifiers } from "react-day-picker"
import { cn } from "@/lib/utils"
import { TypeableDatePicker } from "../example/typeable-date-picker"
import Calendar, { type CalendarProps, CalendarRange } from "./calendar"
import { Input, RoundedOptions, SizeOptions, defaultInputRadius, defaultInputSize } from "./input"
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

	// Function to handle the change in time zone
	// function handleTimezoneChange(timezone: string | null) {
	// 	setTimezone(timezone)
	// 	onSelectTimezone?.(timezone)
	// }

	// Function to handle the change in time
	// function handleTimeChange(time: Time | null) {
	// 	setTime(time)
	// 	onSelectTime?.(time)
	// }

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

		// if (mode === "time" && currentSelected instanceof CalendarDate) {
		// 	return `${format(currentSelected.toDate(getLocalTimeZone()), "MMM dd, yyyy")} ${time?.toString() || ""} ${timezone ? formatTZ(new Date(), "zzz", { timeZone: timezone }) : ""}`;
		// }

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

	useEffect(() => {
		const todayFormatted = format(new Date(), "MMMM dd, yyyy")
		const datePart = displayText || todayFormatted
		const combined = time ? `${datePart}  ${time}` : datePart
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
					<TypeableDatePicker size={size} label={label} rounded={rounded} disables={disabled} hasError={hasError} showTime={showTime} {...props} />
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
										className={cn(sizeHeightMapping[size], "stroke-text-tertiary cursor-pointer", {
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
									{/* {mode === "time" && (
								<React.Fragment>
									<Calendar
										mode="single"
										selected={currentSelected as CalendarDate}
										onSelect={onSelectHandler}
										className="border-none pb-0 drop-shadow-none"
										showTime={showTime}
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
							)} */}
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
	handleShortcutSelect: (shortcut: DateRangeShortcutValues) => void
	selectedValue: string | null
	mode?: string
}
// DateRangeShortcut component definition
export function DateRangeShortcut({ selectedValue, handleShortcutSelect, mode }: DateRangeShortcutProps) {
	return (
		<div
			className={`border-border w-50 flex flex-col border-r px-1.5 py-1 ${mode === "single" || mode === "multiple" ? "bg-fill-level1 text-text-disabled cursor-not-allowed" : "text-text"}`}>
			<p className="text-text-tertiary h-8 rounded-sm px-2 py-2.5 text-xs font-medium">SELECT DATE</p>
			{DATE_RANGE_SHORTCUT_VALUES.map((value) => (
				<DateRangeShortcutItem
					mode={mode}
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

// Type definition for TimePickerWrapperProps props
// type TimePickerWrapperProps = Pick<TimePickerProps, "value" | "onValueChange"> & {
// 	timezone: string | null
// 	setTimezone: (timezone: string | null) => void
// } & Pick<DatePickerProps, "timePickerProps" | "timeZoneProps">

// // TimePickerWrapper component definition
// function TimePickerWrapper({ value, onValueChange, timezone, setTimezone, timePickerProps, timeZoneProps }: TimePickerWrapperProps) {
// 	const allowedTimezones = timeZoneProps?.allowedTimezones || Object.keys(timeZones)

// 	return (
// 		<div className="flex w-full flex-1 gap-3 px-3 pb-3 shadow-none">
// 			<TimePicker
// 				size="36"
// 				className="w-31"
// 				classNames={{ content: "max-h-80" }}
// 				placeholder="Time"
// 				value={value}
// 				onValueChange={onValueChange}
// 				{...timePickerProps}
// 			/>
// 			<Select
// 				size="36"
// 				className="w-31"
// 				classNames={{ content: "max-h-80" }}
// 				placeholder="Timezone"
// 				selectedValues={timezone ? [timezone] : []}
// 				onSelectedChange={(values) => (values.length > 0 ? setTimezone(values[0]) : setTimezone(null))}
// 				{...timeZoneProps}>
// 				{TIME_ZONES.filter((timezone) => allowedTimezones.includes(timezone)).map((timezone) => (
// 					<SelectItem key={timezone} value={timezone}>
// 						{timezone
// 							.split("/")
// 							.map((part) => part.replace(/_/g, " ").replace(/(^|\s)\S/g, (t) => t.toUpperCase()))
// 							.join("/")}
// 					</SelectItem>
// 				))}
// 			</Select>
// 		</div>
// 	)
// }

export default DatePicker
