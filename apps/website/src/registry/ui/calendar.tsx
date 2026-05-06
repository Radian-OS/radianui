"use client"

import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { type ChevronProps, DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
	showOutsideDays = true,
	className,
	classNames,
	...props
}: CalendarProps) {
	return (
		<DayPicker
			classNames={{
				months: "relative flex flex-col gap-5 sm:flex-row",
				month_caption:
					"flex mx-auto items-center justify-center z-20 h-7 cn-calendar-month-caption",
				nav: "absolute top-0 flex w-full justify-between z-10 cn-calendar-nav",
				month: "flex flex-col gap-3 w-full",
				month_grid: "flex flex-col gap-1 items-center",
				weekdays: "w-full flex gap-1",
				weekday:
					"size-9 shrink-0 flex items-center justify-center cn-calendar-weekday",
				weeks: "w-full flex flex-col gap-1",
				week: "w-full flex gap-1",
				day: "size-9 p-0 shrink-0 group aria-selected:opacity-100 *:data-disabled:text-red-500 cn-calendar-day",
				day_button:
					"text-center cursor-pointer size-9 p-0 group-data-disabled:pointer-events-none cn-calendar-day-button",
				button_previous:
					"cursor-pointer flex justify-center items-center size-7 cn-calendar-button-previous",
				button_next:
					"cursor-pointer flex justify-center items-center size-7 cn-calendar-button-next",
				range_start: "range-start",
				range_middle: "range-middle",
				range_end: "range-end",
				...classNames,
			}}
			components={{
				Chevron: (props: ChevronProps) => {
					if (props.orientation === "left")
						return <ChevronLeft size={16} className="cn-calendar-chevron" />
					return <ChevronRight size={16} className="cn-calendar-chevron" />
				},
			}}
			className={cn("cn-calendar", className)}
			showOutsideDays={showOutsideDays}
			mode="single"
			{...props}
		/>
	)
}

export { Calendar }
