"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/registry/ui/calendar"
import { Input, InputWrapper } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

const DateInputPreview = () => {
	const [date, setDate] = useState<Date | undefined>()
	const [isOpen, setIsOpen] = useState(false)

	const handleSelect = (selected: Date | undefined) => {
		setDate(selected)
		setIsOpen(false)
	}

	return (
		<div className="flex w-80 flex-col gap-6">
			<div className="flex flex-col gap-1.5">
				<Label>Date Input</Label>
				<Popover open={isOpen} onOpenChange={setIsOpen}>
					<InputWrapper className="w-full">
						<PopoverTrigger asChild>
							<CalendarIcon className="text-fg-tertiary size-4 shrink-0 cursor-pointer" />
						</PopoverTrigger>
						<Input
							type="date"
							value={date ? format(date, "yyyy-MM-dd") : ""}
							onChange={(e) => {
								const parsed = new Date(e.target.value)
								setDate(isNaN(parsed.getTime()) ? undefined : parsed)
							}}
							className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
						/>
					</InputWrapper>
					<PopoverContent
						className="w-auto p-0"
						align="start"
						alignOffset={-10}
						sideOffset={14}>
						<Calendar
							mode="single"
							selected={date}
							onSelect={handleSelect}
							className="border-0"
						/>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	)
}

export default DateInputPreview
