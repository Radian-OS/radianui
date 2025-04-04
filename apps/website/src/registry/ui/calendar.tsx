import React from "react"
import { CalendarDate, getLocalTimeZone, parseDate } from "@internationalized/date"
import { format } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ChevronProps, CustomComponents, DateRange, DayPicker, Modifiers, useDayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Select, SelectItem } from "./select"

/**
 * Convert different form of Date object to
 * native Date object
 * @param selected
 * @returns native Date object in original provided form
 */

// Function to convert CalendarDate to native Date object
function convertToNativeDate(
	selected: CalendarDate | CalendarDate[] | undefined | { from: CalendarDate; to?: CalendarDate }
): Date | Date[] | undefined | DateRange {
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

// Define the calendar component
function convertToInternationalizedDate(
	selected: Date | Date[] | undefined | DateRange
): CalendarDate | CalendarDate[] | undefined | { from: CalendarDate; to?: CalendarDate } {
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
}

// Type definition for CalendarMultipleSelect props
export type CalendarMultipleSelect = {
	mode?: "multiple"
	selected?: CalendarDate[]
	onSelect?: OnSelectHandler<CalendarDate[] | undefined>
}

export type CalendarRange = { from: CalendarDate; to?: CalendarDate }
// Type definition for CalendarRangeSelect props
export type CalendarRangeSelect = {
	mode?: "range"
	selected?: CalendarRange
	onSelect?: OnSelectHandler<CalendarRange | undefined>
}

// Main CalendarProps type combining different selection modes and additional props
export type CalendarProps = Omit<React.ComponentProps<typeof DayPicker>, "selected" | "onSelect" | "numberOfMonths" | "disabled"> &
	(CalendarSingleSelect | CalendarMultipleSelect | CalendarRangeSelect) & {
		doubleCalendar?: boolean
		navigatorStyle?: "button" | "selector"
		disabled?: boolean
	}

// Calendar component definition
function CalendarComponent({
	selected,
	mode = "single",
	onSelect: customOnSelect,
	classNames,
	components,
	showOutsideDays = true,
	navigatorStyle = "button",
	doubleCalendar = false,
	className,
	...props
}: CalendarProps) {
	const [internalSelected, setInternalSelected] = React.useState<Date | Date[] | DateRange | undefined>(convertToNativeDate(selected))
	const isControlled = selected !== undefined
	const currentSelected = isControlled ? convertToNativeDate(selected) : internalSelected
	let hideCaption: boolean = false

	// Effect to update internal selected state when external selected changes
	React.useEffect(
		function () {
			setInternalSelected(convertToNativeDate(selected))
		},
		[selected]
	)

	const mergedClassName = cn("p-3 w-fit border border-stroke rounded-xl bg-bg1 drop-shadow-xs", className)

	// Merged class names for styling
	const mergedClassNames: Record<string, string> = {
		root: cn({ "cursor-not-allowed": props.disabled }),
		months: cn("relative flex flex-col bg-bg1 w-full gap-5 p-0", {
			"flex-row pt-10": navigatorStyle === "selector",
			"sm:flex-row": navigatorStyle !== "selector",
		}),
		month_caption: cn("mx-10 flex items-center justify-center z-20 p-0 text-sm font-semibold h-7", {
			hidden: props.hideNavigation || hideCaption || (navigatorStyle === "selector" && !doubleCalendar),
		}),
		nav: "absolute top-0 flex w-full justify-between z-10 p-0",
		month: "flex flex-col gap-3",
		month_grid: "flex flex-col gap-1.5 items-center",
		weekdays: "w-full flex gap-1.5",
		weekday: "text-fg3 body-sm font-medium size-8 shrink-0 flex items-center justify-center",
		weeks: "w-full flex flex-col gap-1.5",
		week: "w-full flex gap-1.5",
		day: "size-8 p-0 shrink-0 group text-sm aria-selected:opacity-100",
		day_button:
			"text-center rounded-lg text-fg1 body-sm font-medium hover:bg-bg3 size-8 p-0 hover:group-data-selected:bg-primary group-data-disabled:pointer-events-none group-data-selected:bg-primary hover:group-[.rdp-outside]:group-data-selected:bg-primary/10 group-[.rdp-outside]:group-data-selected:bg-primary/10 group-[.rdp-outside]:group-data-selected:text-fg3 group-data-selected:text-white group-data-disabled:text-fg3 group-data-outside:text-fg3 group-data-today:border group-data-today:border-primary hover:group-[.range-middle]:group-data-selected:bg-primary/10 group-[.range-middle]:group-data-selected:bg-primary/10 group-[.range-middle]:group-data-selected:text-fg1 group-data-selected:group-data-outside:text-white",
		button_previous: cn("border rounded-lg border-stroke drop-shadow-xs p-1.5 flex justify-center items-center size-7", {
			"pointer-events-none": props.disabled,
		}),
		button_next: cn("border rounded-lg border-stroke drop-shadow-xs p-1.5 flex justify-center items-center size-7", {
			"pointer-events-none": props.disabled,
		}),
		range_start: "range-start",
		range_middle: "range-middle",
		range_end: "range-end",
		...classNames,
	}

	// Custom components for the calendar
	const customComponents: Partial<CustomComponents> = {}
	if (navigatorStyle === "selector") {
		hideCaption = false
		customComponents["Nav"] = () => <SelectorNavigator localeCode={props.locale?.code as Intl.LocalesArgument} />
	}
	// Merged components including custom ones
	const mergedComponents = {
		Chevron: (props: ChevronProps) => {
			if (props.orientation === "left") return <ChevronLeft size={16} className="stroke-fg1" />
			return <ChevronRight size={16} className="stroke-fg1" />
		},
		...customComponents,
		...components,
	}

	// Handle selection of dates
	function handleOnSelect(
		selected: Date | Date[] | undefined | DateRange,
		triggerDate: Date,
		modifiers: Modifiers,
		e: React.MouseEvent | React.KeyboardEvent
	) {
		setInternalSelected(selected)

		const convertedSelected = convertToInternationalizedDate(selected)
		const convertedTriggerDate = parseDate(format(triggerDate, "yyyy-MM-dd"))
		customOnSelect?.(convertedSelected as CalendarDate & CalendarDate[] & CalendarRange, convertedTriggerDate, modifiers, e)
	}

	if (mode === "single") {
		return (
			<DayPicker
				classNames={mergedClassNames}
				components={mergedComponents}
				className={mergedClassName}
				showOutsideDays={showOutsideDays}
				mode="single"
				selected={currentSelected as Date}
				onSelect={handleOnSelect}
				numberOfMonths={doubleCalendar ? 2 : 1}
				{...props}
			/>
		)
	}

	if (mode == "multiple") {
		return (
			<DayPicker
				classNames={mergedClassNames}
				components={mergedComponents}
				className={mergedClassName}
				showOutsideDays={showOutsideDays}
				mode="multiple"
				selected={currentSelected as Date[]}
				onSelect={handleOnSelect}
				numberOfMonths={doubleCalendar ? 2 : 1}
				{...props}
			/>
		)
	}

	return (
		<DayPicker
			classNames={mergedClassNames}
			components={mergedComponents}
			className={mergedClassName}
			showOutsideDays={showOutsideDays}
			mode="range"
			selected={currentSelected as DateRange}
			onSelect={handleOnSelect}
			numberOfMonths={doubleCalendar ? 2 : 1}
			{...props}
		/>
	)
}

function SelectorNavigator({
	localeCode = "en-US",
	minYear = new Date().getFullYear() - 5,
	maxYear = new Date().getFullYear() + 5,
}: {
	localeCode?: Intl.LocalesArgument
	minYear?: number
	maxYear?: number
}) {
	const { months, goToMonth } = useDayPicker()
	const pickedYear = months[0].date.getFullYear()
	const allMonths = Array.from({ length: 12 }, function (_, i) {
		return {
			name: new Intl.DateTimeFormat(localeCode, { month: "long" }).format(new Date(pickedYear, i)),
			date: new Date(pickedYear, i),
		}
	})
	const years = Array.from({ length: maxYear - minYear + 1 }, (_, index) => minYear + index)
	const [year, setYear] = React.useState<string[]>([pickedYear.toString()])

	return (
		<div className="absolute top-0 flex h-fit w-full gap-1.5">
			<Select
				selectedValues={[months[0].date.getMonth().toString()]}
				onSelectedChange={function (values) {
					goToMonth(new Date(pickedYear, parseInt(values[0])))
				}}
				placeholder="Month"
				classNames={{ content: "max-h-60 z-50" }}
				minSelectionCount={1}
				size="36">
				{allMonths.map((month, i) => (
					<SelectItem key={i} value={month.date.getMonth().toString()}>
						{month.name}
					</SelectItem>
				))}
			</Select>
			<Select
				placeholder="Year"
				selectedValues={year}
				onSelectedChange={function (years) {
					setYear(years)
					goToMonth(new Date(parseInt(years[0]), months[0].date.getMonth()))
				}}
				classNames={{ content: "max-h-60 z-50" }}
				minSelectionCount={1}
				size="36">
				{years.map((year) => (
					<SelectItem key={year} value={year.toString()}>
						{year}
					</SelectItem>
				))}
			</Select>
		</div>
	)
}

export default CalendarComponent
