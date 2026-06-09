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
				months: "relative flex flex-col gap-5 p-0 sm:flex-row",
				month_caption:
					"flex mx-auto items-center justify-center z-20 p-0 text-base font-semibold h-7",
				nav: "absolute top-0 flex w-full justify-between z-10 p-0 pb-3",
				month: "flex flex-col gap-3 w-full",
				month_grid: "flex flex-col gap-1 items-center",
				weekdays: "w-full flex gap-1",
				weekday:
					"text-fg-tertiary text-sm font-medium size-9 shrink-0 flex items-center justify-center",
				weeks: "w-full flex flex-col gap-1",
				week: "w-full flex gap-1",
				day: "size-9 p-0 shrink-0 group text-sm aria-selected:opacity-100 *:data-disabled:text-red-500",
				day_button:
					"text-center rounded-lg text-fg text-sm font-medium hover:bg-fill1-alpha cursor-pointer size-9 p-0 hover:group-data-selected:bg-primary group-data-disabled:pointer-events-none group-data-disabled:line-through group-data-selected:bg-primary group-data-selected:text-primary-text hover:group-[.rdp-outside]:group-data-selected:bg-primary group-[.rdp-outside]:group-data-selected:text-white group-[.range-middle]:group-[.rdp-outside]:group-data-selected:text-primary-text hover:group-[.range-middle]:group-[.rdp-outside]:group-data-selected:bg-primary-accent group-data-selected:text-white group-data-disabled:text-fg-tertiary group-data-outside:text-fg-tertiary group-data-today:border group-data-today:border-primary group-data-today:text-primary-text group-data-today:group-data-selected:text-white hover:group-[.range-middle]:group-data-selected:bg-primary-accent group-[.range-middle]:group-data-selected:text-primary group-[.range-middle]:group-data-selected:bg-primary-accent group-[.range-middle]:group-data-selected:text-primary-text group-data-selected:group-data-outside:text-primary-text",
				button_previous:
					"cursor-pointer focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-bg bg-elevation-level1 font-medium text-fg-secondary border border-border hover:bg-fill1-alpha focus-visible:ring-border aria-disabled:opacity-50 rounded-lg p-1.5 flex justify-center items-center size-7",
				button_next:
					"cursor-pointer focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-bg bg-elevation-level1 font-medium text-fg-secondary border border-border hover:bg-fill1-alpha focus-visible:ring-border aria-disabled:opacity-50 rounded-lg p-1.5 flex justify-center items-center size-7",
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
			className={cn(
				"bg-elevation-level1 border-border rounded-xl border p-3",
				className
			)}
			showOutsideDays={showOutsideDays}
			mode="single"
			{...props}
		/>
	)
}

export { Calendar }
