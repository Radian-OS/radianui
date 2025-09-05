import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { type ChevronProps, DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ showOutsideDays = true, className, classNames, ...props }: CalendarProps) {
	return (
		<DayPicker
			classNames={{
				root: "w-fit h-fit",
				months: "relative flex flex-col gap-5 p-0 sm:flex-row",
				month_caption: cn("mx-10 flex items-center justify-center z-20 p-0 text-sm font-semibold h-7"),
				nav: "absolute top-0 flex w-full justify-between z-10 p-0",
				month: "flex flex-col gap-3 w-full",
				month_grid: "flex flex-col gap-1.5 items-center",
				weekdays: "w-full flex gap-1.5",
				weekday: "text-fg-tertiary text-sm font-medium size-8 shrink-0 flex items-center justify-center",
				weeks: "w-full flex flex-col gap-1.5",
				week: "w-full flex gap-1.5",
				day: "size-8 p-0 shrink-0 group text-sm aria-selected:opacity-100 *:data-disabled:text-red-500",
				day_button:
					"text-center rounded-lg text-fg text-sm font-medium hover:bg-fill2-alpha cursor-pointer size-8 p-0 hover:group-data-selected:bg-primary group-data-disabled:pointer-events-none group-data-disabled:line-through group-data-selected:bg-primary group-data-selected:text-primary-text hover:group-[.rdp-outside]:group-data-selected:bg-primary group-[.rdp-outside]:group-data-selected:text-white group-[.range-middle]:group-[.rdp-outside]:group-data-selected:text-primary-text hover:group-[.range-middle]:group-[.rdp-outside]:group-data-selected:bg-primary-accent group-data-selected:text-white group-data-disabled:text-fg-tertiary group-data-outside:text-fg-tertiary group-data-today:border group-data-today:border-primary hover:group-[.range-middle]:group-data-selected:bg-primary-accent group-[.range-middle]:group-data-selected:text-primary group-[.range-middle]:group-data-selected:bg-primary-accent group-[.range-middle]:group-data-selected:text-primary-text group-data-selected:group-data-outside:text-primary-text",
				button_previous: "border aria-disabled:opacity-50 rounded-lg border-border drop-shadow-xs p-1.5 flex justify-center items-center size-7",
				button_next: "border aria-disabled:opacity-50 rounded-lg border-border drop-shadow-xs p-1.5 flex justify-center items-center size-7",
				range_start: "range-start",
				range_middle: "range-middle",
				range_end: "range-end",
				...classNames,
			}}
			components={{
				Chevron: (props: ChevronProps) => {
					if (props.orientation === "left") return <ChevronLeft size={16} className="stroke-fg" />
					return <ChevronRight size={16} className="stroke-fg" />
				},
			}}
			className={cn("bg-elevation-level1 border-alpha rounded-xl border p-3", className)}
			showOutsideDays={showOutsideDays}
			{...props}
		/>
	)
}

export { Calendar }
