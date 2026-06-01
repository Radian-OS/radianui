"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
import { IconSlot } from "@/registry/icon/icon-library"
import { Button } from "@/registry/ui/button"
import { Calendar } from "@/registry/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

export default function DatePickerPresetsExample() {
	const today = new Date()
	const defaultDate: DateRange = {
		from: today,
		to: addDays(today, 5),
	}

	const [date, setDate] = React.useState<DateRange | undefined>(defaultDate)

	const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)

	const handleApply = () => {
		if (date) {
			setDate(date)
		}
		setIsPopoverOpen(false)
	}

	const handleReset = () => {
		setDate(defaultDate)
		setIsPopoverOpen(false)
	}

	const handleSelect = (selected: DateRange | undefined) => {
		setDate({
			from: selected?.from || undefined,
			to: selected?.to || undefined,
		})
	}

	return (
		<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
			<PopoverTrigger asChild>
				<Button
					type="button"
					variant="outline"
					className="text-fg w-[320px] justify-start gap-2"
					color="neutral">
					{date?.from ? (
						date.to ? (
							<>
								{format(date.from, "LLL dd, y")} -{" "}
								{format(date.to, "LLL dd, y")}
							</>
						) : (
							format(date.from, "LLL dd, y")
						)
					) : (
						<span className="text-fg-tertiary text-sm font-normal">
							Pick a date range
						</span>
					)}
					<IconSlot
						slot="calendar"
						className="text-fg-tertiary ml-auto size-4"
					/>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					autoFocus
					className="border-0"
					mode="range"
					defaultMonth={date?.from}
					showOutsideDays={false}
					selected={date}
					onSelect={handleSelect}
					numberOfMonths={2}
				/>
				<div className="border-border flex items-center justify-end gap-1.5 border-t p-3">
					<Button color="neutral" variant="outline" onClick={handleReset}>
						Reset
					</Button>
					<Button onClick={handleApply}>Apply</Button>
				</div>
			</PopoverContent>
		</Popover>
	)
}
