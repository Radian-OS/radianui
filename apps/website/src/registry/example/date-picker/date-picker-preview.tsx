"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Calendar } from "@/registry/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

export default function DatePickerDemo() {
	const [open, setOpen] = React.useState(false)
	const [date, setDate] = React.useState<Date>(new Date())

	return (
		<div className="flex flex-col gap-1.5">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<div className="relative w-60">
						<Button
							type="button"
							variant="outline"
							color="neutral"
							className="text-fg hover:bg-elevation-level1 flex w-full gap-2">
							<CalendarIcon className="text-fg-tertiary size-4" />
							{format(date, "PPP")}
						</Button>
					</div>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="single"
						className="border-0"
						selected={date}
						onSelect={(value) => {
							setDate(value ?? new Date())
							setOpen(false)
						}}
						autoFocus
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}
