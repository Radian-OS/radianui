"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { format, isValid, parse } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ChevronProps, DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import { TimeSelector, formatTime, timeOptions } from "../ui/calendar"
import { DatePickerProps } from "../ui/date-picker"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

export function TypeableDatePicker({
	// selected,
	size,
	// onSelect,
	label,
	rounded,
	disables,
	hasError,
	// mode = "single",
	// triggerClassName,
	// onSelect: customOnSelect,
	classNames,
	// showShortcut = true,
	components,
	// showOutsideDays = true,
	navigatorStyle = "button",
	showTime = false,
	dualCalendar = false,
	// defaultDateRangeShortcutValue,
	className,
	footer,
	...props
}: DatePickerProps) {
	const [date, setDate] = useState<Date | undefined>(undefined)
	const [inputValue, setInputValue] = useState<string>("")
	const [isEditing, setIsEditing] = useState(false)
	const [open, setOpen] = useState(false)

	// Update input value when date changes (from calendar selection)
	// Only update if we're not currently editing the input
	useEffect(() => {
		if (date && !isEditing) {
			setInputValue(format(date, "dd/MM/yyyy"))
		}
	}, [date, isEditing])
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		const lower = value.toLowerCase()

		// Track if A or P was typed as last character
		const endsWithA = lower.endsWith("a")
		const endsWithP = lower.endsWith("p")

		// Remove all non-digit characters except 'a' or 'p'
		let raw = lower.replace(/[^0-9ap]/g, "")

		// Handle AM/PM shortcut
		let meridian = ""
		if (endsWithA) {
			meridian = " AM"
			raw = raw.replace(/a/g, "")
		} else if (endsWithP) {
			meridian = " PM"
			raw = raw.replace(/p/g, "")
		}

		// Limit digits to 12 (DDMMYYYYHHMM)
		raw = raw.slice(0, 12)

		let dd = raw.slice(0, 2)
		let mm = raw.slice(2, 4)
		const yyyy = raw.slice(4, 8)
		let hh = raw.slice(8, 10)
		let min = raw.slice(10, 12)

		// Normalize day
		if (dd.length === 1 && parseInt(dd, 10) > 3) dd = "0" + dd
		else if (dd.length === 2 && parseInt(dd, 10) > 31) return

		// Normalize month
		if (mm.length === 1 && parseInt(mm, 10) > 1) mm = "0" + mm
		else if (mm.length === 2 && parseInt(mm, 10) > 12) return

		// Normalize hour (12-hour format)
		if (hh.length === 1 && parseInt(hh, 10) > 1) hh = "0" + hh
		else if (hh.length === 2 && parseInt(hh, 10) > 12) return

		// Normalize minute
		if (min.length === 1 && parseInt(min, 10) > 5) min = "0" + min
		else if (min.length === 2 && parseInt(min, 10) > 59) return

		// Build formatted output
		let formatted = dd
		if (mm) formatted += `/${mm}`
		if (yyyy) formatted += `/${yyyy}`
		if (hh) formatted += ` ${hh}`
		if (min) formatted += `:${min}`
		if (meridian) formatted += meridian

		setInputValue(formatted)
	}

	// Parse the date when the input loses focus
	const handleInputBlur = () => {
		setIsEditing(false)

		try {
			// Only try to parse if we have something close to a complete date
			if (inputValue.length >= 8) {
				const parsedDate = parse(inputValue, "dd/MM/yyyy", new Date())

				if (isValid(parsedDate)) {
					setDate(new Date(parsedDate))
				}
			}
		} catch (error) {
			// If parsing fails, don't update the date
			console.log("Invalid date format", error)
		}
	}

	// Set editing mode when input is focused
	const handleInputFocus = () => {
		setIsEditing(true)
	}

	// Function to handle calendar opening
	// const handleCalendarToggle = () => {
	//     setOpen(!open)
	// }

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

	const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

	return (
		<Popover
			open={open}
			onOpenChange={(newOpen) => {
				if (!isEditing) {
					setOpen(newOpen)
				}
			}}>
			<PopoverTrigger disabled={disables}>
				<Input
					size={size}
					label={label}
					value={inputValue}
					rounded={rounded}
					disabled={disables}
					hasError={hasError}
					onChange={handleInputChange}
					onFocus={handleInputFocus}
					onBlur={handleInputBlur}
					errorMsg={hasError ? "There is an error" : undefined}
					placeholder="DD/MM/YYYY"
					className={cn("w-[320px]", date && !isEditing ? "border-primary" : "border-input")}
					trial={<CalendarIcon className={cn(disables ? "cursor-not-allowed" : "cursor-pointer")} />}
				/>
			</PopoverTrigger>

			<PopoverContent className="w-auto border-none p-0">
				<div className="bg-bg-level1 border-border drop-shadow-xs w-fit overflow-hidden rounded-xl border">
					<div className={`flex ${footer ? "border-b" : ""} overflow-hidden`}>
						<DayPicker
							mode="single"
							selected={date}
							month={date}
							onSelect={(selectedDate) => {
								if (selectedDate) {
									setDate(selectedDate)
									setInputValue(format(selectedDate, "dd/MM/yyyy"))
									setIsEditing(false)
								}
							}}
							className={mergedClassName}
							showOutsideDays
							defaultMonth={date || new Date()}
							components={mergedComponents}
							classNames={mergedClassNames}
						/>
						{showTime && (
							<TimeSelector
								timeOptions={timeOptions}
								selectedIndex={selectedIndex}
								setSelectedIndex={setSelectedIndex}
								formatTime={formatTime}
								showTime={showTime}
							/>
						)}
					</div>
					<div className="flex w-full justify-end">{footer && footer}</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
