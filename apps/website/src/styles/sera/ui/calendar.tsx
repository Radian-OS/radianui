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
					"flex mx-auto items-center justify-center z-20 h-7 p-0 text-base font-semibold",
				nav: "absolute top-0 flex w-full justify-between z-10 p-0 pb-4",
				month: "flex flex-col gap-3 w-full",
				month_grid: "flex flex-col gap-1 items-center",
				weekdays: "w-full flex gap-1",
				weekday:
					"size-9 shrink-0 flex items-center justify-center text-fg-tertiary text-sm font-medium",
				weeks: "w-full flex flex-col gap-1",
				week: "w-full flex gap-1",
				day: "size-9 p-0 shrink-0 group aria-selected:opacity-100 *:data-disabled:text-red-500 text-sm",
				day_button:
					"text-center cursor-pointer size-9 p-0 group-data-disabled:pointer-events-none text-fg rounded-none text-sm font-medium hover:bg-fill1-alpha hover:group-data-selected:bg-primary group-data-disabled:line-through group-data-selected:bg-primary group-data-selected:text-primary-fg hover:group-[.rdp-outside]:group-data-selected:bg-primary group-[.rdp-outside]:group-data-selected:text-white group-[.range-middle]:group-[.rdp-outside]:group-data-selected:text-primary-text hover:group-[.range-middle]:group-[.rdp-outside]:group-data-selected:bg-primary-accent group-data-disabled:text-fg-tertiary group-data-outside:text-fg-tertiary group-data-today:border group-data-today:border-primary group-data-today:text-primary-text group-data-today:group-data-selected:text-primary-fg hover:group-[.range-middle]:group-data-selected:bg-primary-accent group-[.range-middle]:group-data-selected:bg-primary-accent group-[.range-middle]:group-data-selected:text-primary-text group-data-selected:group-data-outside:text-primary-fg",
				button_previous:
					"cursor-pointer flex justify-center items-center size-7 focus-visible:ring-offset-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-elevation-level1 text-fg-secondary overflow-hidden font-medium border-border border hover:bg-fill1-alpha focus-visible:ring-border hover:before:bg-fill2-alpha relative before:absolute before:inset-0 aria-disabled:opacity-50 rounded-none p-2",
				button_next:
					"cursor-pointer flex justify-center items-center size-7 focus-visible:ring-offset-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-elevation-level1 text-fg-secondary overflow-hidden font-medium border-border border hover:bg-fill1-alpha focus-visible:ring-border hover:before:bg-fill2-alpha relative before:absolute before:inset-0 aria-disabled:opacity-50 rounded-none p-2",
				range_start: "range-start",
				range_middle: "range-middle",
				range_end: "range-end",
				...classNames,
			}}
			components={{
				Chevron: (props: ChevronProps) => {
					if (props.orientation === "left")
						return <ChevronLeft size={16} className="text-fg-tertiary" />
					return <ChevronRight size={16} className="text-fg-tertiary" />
				},
			}}
			className={cn("bg-card border-border rounded-none border p-4", className)}
			showOutsideDays={showOutsideDays}
			mode="single"
			{...props}
		/>
	)
}

export { Calendar }
