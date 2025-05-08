import React, { useEffect, useMemo, useState } from "react"
import { CalendarDate, Time, getLocalTimeZone, now, today } from "@internationalized/date"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Check } from "lucide-react"
import { Modifiers } from "react-day-picker"
import { cn } from "@/lib/utils"
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
		if (!currentSelected) return placeholder;

		if (mode === "single" && currentSelected instanceof CalendarDate) {
			return format(currentSelected.toDate(getLocalTimeZone()), "MMM dd, yyyy");
		}

		if (mode === "multiple" && Array.isArray(currentSelected)) {
			return currentSelected.map((date) =>
				format(date.toDate(getLocalTimeZone()), "MMM dd")
			).join(", ");
		}

		if (mode === "range" && isCalendarRange(currentSelected)) {
			if (showDateRangeShortcut && selectedShortcut && selectedShortcut !== "custom") {
				return selectedShortcut
					.split("_")
					.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
					.join(" ");
			} else {
				return `${format(currentSelected.from.toDate(getLocalTimeZone()), "MMM dd")} - ${format(currentSelected.to!.toDate(getLocalTimeZone()), "MMM dd")}`;
			}
		}

		// if (mode === "time" && currentSelected instanceof CalendarDate) {
		// 	return `${format(currentSelected.toDate(getLocalTimeZone()), "MMM dd, yyyy")} ${time?.toString() || ""} ${timezone ? formatTZ(new Date(), "zzz", { timeZone: timezone }) : ""}`;
		// }

		return placeholder;
	};
	const displayText = getDisplayText();

	const [inputValue, setInputValue] = useState(displayText || "");



	const sizeHeightMapping = {
		28: "h-4 w-4",
		32: "h-5 w-5",
		36: "h-5 w-5",
		40: "h-5 w-5",
		44: "h-6 w-6",
		48: "h-6 w-6",
	};

	const [open, setOpen] = useState<boolean>(false);
	const [time, setTime] = useState<string>("");
	const getCurrentTimeInAMPM = (): string => {
		const now = new Date();
		let hours = now.getHours();
		const minutes = now.getMinutes();
		const ampm = hours >= 12 ? "PM" : "AM";

		hours = hours % 12 || 12; // Convert 0 to 12
		const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

		return `${hours}:${minutesStr} ${ampm}`;
	}; useEffect(() => {
		const currentTime = getCurrentTimeInAMPM();
		setTime(currentTime);
	}, []);

	useEffect(() => {
		const todayFormatted = format(new Date(), "MMMM dd, yyyy");
		const datePart = displayText || todayFormatted;
		const combined = time ? `${datePart}  ${time}` : datePart;
		setInputValue(combined);
	}, [displayText, time]);



	const alignOffset = useMemo(() => {
		if (showTime && showDateRangeShortcut && props.dualCalendar) return -581;
		if (props.dualCalendar && showTime) return -378;
		if (props.dualCalendar && showDateRangeShortcut) return -458;
		if (showTime && showDateRangeShortcut) return -298;
		if (props.dualCalendar) return -259;
		if (showTime) return -98;
		if (showDateRangeShortcut) return -178;
		return 20;
	}, [props.dualCalendar, showTime, showDateRangeShortcut]);

	return (
		<div>
			{
				typeable ? (<>
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
				</>) : (
					<>
						<Input
							size={size}
							onClick={() => !disabled && setOpen(true)}
							label={label}
							rounded={rounded}
							disabled={disabled}
							hasError={hasError}
							errorMsg={hasError ? "There is an error" : undefined}
							className={cn(
								triggerClassName
							)}
							readOnly
							value={inputValue}
							placeholder="Date picker"
							trial={
								< Popover align="end" open={open} onOpenChange={setOpen} sideOffset={14} >
									<PopoverTrigger disabled={disabled}>
										<CalendarIcon className={cn(
											sizeHeightMapping[size || 36],
											"cursor-pointer stroke-text-tertiary",
											{
												"text-text-tertiary": !disabled,
												"text-text-disabled cursor-not-allowed": disabled,
											}
										)}
										/>
									</PopoverTrigger>

									<PopoverContent alignOffset={alignOffset} className={cn(" bg-bg-base border-none drop-shadow-xs flex w-fit flex-col gap-3 rounded-xl p-0 shadow-none")}>
										{mode === "single" && (
											<Calendar
												onIndexChange={(value) => {
													if (value !== null) {
														setTime?.(value);
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
														setTime?.(value);
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
														setTime?.(value);
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
				)
			}

		</div >
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
	return (
		<div className={`border-border w-50 flex flex-col border-r px-1.5 py-1
		${mode === "single" || mode === "multiple" ? "bg-fill-level1 text-text-disabled cursor-not-allowed" : " text-text"}`}>
			<p className="rounded-sm px-2 py-2.5 h-8 text-text-tertiary text-xs font-medium">SELECT DATE</p>
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
	);
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
			className={`${mode === "single" || mode === "multiple" ? "cursor-not-allowed" : "hover:bg-fill-level2 cursor-pointer"} group flex leading-5 font-normal text-sm flex-nowrap items-center justify-between gap-2 rounded-sm px-2 py-1.5`}
			data-value={value}
			onClick={mode !== "single" && mode !== "multiple" ? onClick : undefined}
		>
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


import { ChevronProps, DayPicker } from "react-day-picker"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { formatTime, timeOptions, TimeSelector } from "../ui/calendar"
import { dateInputStyles } from "../ui/date-input"
import { DateField, DateInput as DateInputRC, DateSegment, DateValue } from "react-aria-components"
import { CalendarDateTime, parseZonedDateTime, ZonedDateTime } from "@internationalized/date"
import { Label } from "./label"

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
	const mergedClassNames: Record<string, string> = {
		root: cn({ "cursor-not-allowed": props.disabled }),
		months: cn("relative flex flex-col bg-bg-level1 w-full gap-5 p-0", {
			"flex-row pt-10": navigatorStyle === "selector",
			"sm:flex-row": navigatorStyle !== "selector",
		}),
		month_caption: cn("mx-10 flex items-center justify-center z-20 p-0 text-sm font-semibold h-7", {
			hidden: props.hideNavigation || hideCaption || (navigatorStyle === "selector" && !dualCalendar),
		}),
		nav: "absolute top-0 flex w-full justify-between z-10 p-0",
		month: "flex flex-col gap-3",
		month_grid: "flex flex-col gap-1.5 items-center",
		weekdays: "w-full flex gap-1.5",
		weekday: "text-text-tertiary text-sm font-medium size-8 shrink-0 flex items-center justify-center",
		weeks: "w-full flex flex-col gap-1.5",
		week: "w-full flex gap-1.5",
		day: "size-8 p-0 shrink-0 group text-sm aria-selected:opacity-100",
		day_button:
			"text-center rounded-lg text-text text-sm font-medium hover:bg-bg-level1 size-8 p-0 hover:group-data-selected:bg-primary group-data-disabled:pointer-events-none group-data-selected:bg-primary hover:group-[.rdp-outside]:group-data-selected:bg-primary/10 group-[.rdp-outside]:group-data-selected:bg-primary/10 group-[.rdp-outside]:group-data-selected:text-text-tertiary group-data-selected:text-white group-data-disabled:text-text-tertiary group-data-outside:text-text-tertiary group-data-today:border group-data-today:border-primary hover:group-[.range-middle]:group-data-selected:bg-primary/10 group-[.range-middle]:group-data-selected:bg-primary/10 group-[.range-middle]:group-data-selected:text-text group-data-selected:group-data-outside:text-white",
		button_previous: cn("border rounded-lg border-border drop-shadow-xs p-1.5 flex justify-center items-center size-7", {
			"pointer-events-none": props.disabled,
		}),
		button_next: cn("border rounded-lg border-border drop-shadow-xs p-1.5 flex justify-center items-center size-7", {
			"pointer-events-none": props.disabled,
		}),
		range_start: "range-start",
		range_middle: "range-middle",
		range_end: "range-end",
		...classNames,
	}

	// Merged components including custom ones
	const mergedComponents = {
		Chevron: (props: ChevronProps) => {
			if (props.orientation === "left") return <ChevronLeft size={16} className="stroke-text" />
			return <ChevronRight size={16} className="stroke-text" />
		},
		// ...customComponents,
		...components,
	}

	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);


	// Convert Date to DateValue for the DateField
	const [dateTime, setDateTime] = useState<ZonedDateTime | null>(now(getLocalTimeZone()));


	const dateTimeValue = dateTime
		? new CalendarDateTime(
			dateTime.year,
			dateTime.month,
			dateTime.day,
			dateTime.hour,
			dateTime.minute
		)
		: null;

	// Handle time change
	const handleDateTimeChange = (value: DateValue | null) => {
		if (!value) {
			setDateTime(null);
			return;
		}

		const newDateTime = parseZonedDateTime(
			`${value.year}-${String(value.month).padStart(2, '0')}-${String(value.day).padStart(2, '0')}`
			+ `T${String('hour' in value ? value.hour : 0).padStart(2, '0')}:${String('minute' in value ? value.minute : 0).padStart(2, '0')}`
			+ `[America/Los_Angeles]`
		);
		setDateTime(newDateTime);
	};

	const sizeHeightMapping = {
		28: "h-4 w-4",
		32: "h-5 w-5",
		36: "h-5 w-5",
		40: "h-5 w-5",
		44: "h-6 w-6",
		48: "h-6 w-6",
	};

	return (
		<Popover>
			<PopoverTrigger disabled={disables}>
				<div className=" flex flex-col items-start gap-1.5">
					{label && (
						<Label className={cn({ "text-text-disabled cursor-not-allowed ": disables })}>
							{label}
						</Label>
					)}
					<div className={cn("w-[320px]", dateInputStyles({ size, rounded }), {
						"border-error focus-within:ring-error/10 focus-within:ring-2": hasError && !disables,

						"focus-within:border-primary focus-within:ring-primary/10 border-border-alpha focus-within:ring-2": !hasError && !disables,

						"text-text-disables cursor-not-allowed bg-fill-level1 drop-shadow-none": disables,


					},)}>
						<DateField
							granularity="minute"
							className={cn("flex flex-col gap-1 border-none")}
							value={dateTimeValue}
							onChange={handleDateTimeChange}
							isDisabled={disables}
							{...props}
						>
							<DateInputRC>
								{(segment) => (
									<DateSegment
										className={cn(
											"rounded-sm px-0 py-0.5 text-end text-sm tabular-nums",
											"data-[focused]:bg-bg-level2 data-[focused]:text-white",
											"data-placeholder:text-text-tertiary",
											"focus:outline-hidden focus:caret-transparent",
											"data-[type=dayPeriod]:mx-0.5 data-[type=literal]:mx-0.5 data-[type=timeZoneName]:mx-0.5 data-[type=hour]:ml-0.5",
											{
												"text-text-disabled placeholder-text-disabled cursor-not-allowed": disables,
											},)}
										segment={segment}
									/>
								)}
							</DateInputRC>
						</DateField>
						<CalendarIcon className={cn(
							sizeHeightMapping[size || 36],
							"cursor-pointer stroke-text-tertiary",
							{
								"text-text-tertiary": !disables,
								"text-text-disabled cursor-not-allowed": disables,
							}
						)} />
					</div>
					{hasError && <Label className={cn("text-error flex items-start text-xs font-medium", className)}>{errorMsg}</Label>}
				</div>
			</PopoverTrigger>

			<PopoverContent className="w-auto p-0 border-none">
				<div className="w-fit rounded-xl bg-bg-level1 border border-border drop-shadow-xs overflow-hidden">
					<div className={`flex ${footer ? "border-b" : ""} overflow-hidden`}>
						{
							showDateRangeShortcut && (
								<DateRangeShortcut mode="single" />
							)
						}
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
											minute: dateTime.minute
										}
										: { hour: 0, minute: 0 };

									const newDateTime = parseZonedDateTime(
										`${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
										+ `T${String(currentTime.hour).padStart(2, '0')}:${String(currentTime.minute).padStart(2, '0')}`
										+ `[America/Los_Angeles]`
									);
									setDateTime(newDateTime);
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
							mode="type"
						/>
					</div>
					<div className="flex w-full justify-end">
						{footer && footer}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
