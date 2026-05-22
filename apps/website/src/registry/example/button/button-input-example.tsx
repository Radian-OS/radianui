"use client"

import React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Calendar } from "@/registry/ui/calendar"
import {
	Dropdown,
	DropdownContent,
	DropdownItem,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

const ButtonExampleInput = () => {
	const [open, setOpen] = React.useState(false)
	const [date, setDate] = React.useState<Date>()
	const [value, setValue] = React.useState("Last 30 Days")

	const options = [
		"Last 7 Days",
		"Last 30 Days",
		"Last 90 Days",
		"Last 6 Months",
		"Last Year",
	]

	return (
		<div className="flex flex-wrap items-center justify-center gap-3">
			<Dropdown>
				<DropdownTrigger asChild>
					<Button color="neutral" variant="outline">
						<CalendarIcon />
						{value}
						<ChevronDown />
					</Button>
				</DropdownTrigger>
				<DropdownContent className="w-39.5">
					{options.map((option) => (
						<DropdownItem key={option} onSelect={() => setValue(option)}>
							{option}
						</DropdownItem>
					))}
				</DropdownContent>
			</Dropdown>

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<div className="relative">
						<Button id="date" type="button" variant="outline" color="neutral">
							<CalendarIcon />
							{date ? (
								format(date, "PPP")
							) : (
								<>
									<span>Pick Date Range</span>
								</>
							)}
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

export default ButtonExampleInput
