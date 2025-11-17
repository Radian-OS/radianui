"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Calendar } from "@/registry/ui/calendar"
import { Label } from "@/registry/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

export default function DatePickerDemo() {
	const [open, setOpen] = React.useState(false)
	const [date, setDate] = React.useState<Date>()

	return (
		<div className="flex flex-col gap-1.5">
			<Label htmlFor="date">Select a date</Label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<div className="relative w-[320px]">
						<Button id="date" type="button" variant="outline" color="neutral" className="text-fg hover:bg-elevation-level1 w-full justify-start gap-2">
							{date ? format(date, "PPP") : <span className="text-fg-tertiary text-sm font-normal">Pick a date</span>}
							<CalendarIcon className="text-fg-tertiary ml-auto size-4" />
						</Button>
					</div>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="single"
						className="border-0"
						selected={date}
						onSelect={(value) => {
							setDate(value)
							setOpen(false)
						}}
						autoFocus
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}
