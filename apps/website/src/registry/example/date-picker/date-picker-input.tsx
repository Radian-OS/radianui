"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/registry/ui/calendar"
import { Input, InputWrapper } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

export default function DatePickerInput() {
	const [date, setDate] = useState<Date | undefined>(new Date())
	const [open, setOpen] = useState(false)

	return (
		<div className="flex w-60 flex-col gap-1.5">
			<Label>Datepicker</Label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<InputWrapper className="w-full">
						<Input
							placeholder="Pick a date"
							value={date ? format(date, "PPP") : ""}
							className="w-full cursor-pointer pr-9"
						/>
						<CalendarIcon className="cursor-pointer" />
					</InputWrapper>
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
