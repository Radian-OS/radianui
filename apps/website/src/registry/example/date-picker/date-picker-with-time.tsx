"use client"

import * as React from "react"
import { format, setHours, setMinutes, setSeconds } from "date-fns"
import { Calendar as CalendarIcon, ClockIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Calendar } from "@/registry/ui/calendar"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

export default function DatePickerWithTimeExample() {
	const today = new Date()
	const id = React.useId()

	const [date, setDate] = React.useState<Date | undefined>(today)
	const [time, setTime] = React.useState<Date | undefined>(today)

	const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)

	const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const [h, m, s] = e.target.value.split(":").map(Number)
		let updated = setHours(time!, h)
		updated = setMinutes(updated, m)
		updated = setSeconds(updated, s || 0)
		setTime(updated)
	}

	return (
		<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
			<PopoverTrigger asChild>
				<Button type="button" variant="outline" className="text-fg w-[250px] justify-start gap-2" color="neutral">
					{date ? `${format(date, "LLL dd, y")} ${time && `- ${format(time, "hh:mm a")}`}` : <span className="text-fg-tertiary text-sm font-normal">Pick a date and time</span>}
					<CalendarIcon className="text-fg-tertiary ml-auto size-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start" side="top">
				<Calendar mode="single" className="border-0 p-2" selected={date} onSelect={setDate} />
				<div className="border-t p-3">
					<div className="flex items-center gap-3">
						<Label htmlFor={id}>Enter time</Label>
						<div className="relative grow">
							<Input
								id={id}
								type="time"
								step="1"
								value={format(time!, "HH:mm:ss")}
								onChange={handleTimeChange}
								className="peer appearance-none ps-9 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
							/>
							<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
								<ClockIcon size={16} aria-hidden="true" />
							</div>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
