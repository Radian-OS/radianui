import React from "react"
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Calendar } from "@/registry/ui/calendar"
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "@/registry/ui/dropdown"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

const ButtonExampleInput = () => {
	const [open, setOpen] = React.useState(false)
	const [date, setDate] = React.useState<Date>()
	return (
		<div className="flex flex-wrap items-center justify-center gap-3">
			<Dropdown>
				<DropdownTrigger asChild>
					<Button color="neutral" variant="outline">
						<CalendarIcon />
						Last 30 Days <ChevronDown />
					</Button>
				</DropdownTrigger>
				<DropdownContent className="w-39.5">
					<DropdownItem>English (Default)</DropdownItem>
					<DropdownItem>Spanish</DropdownItem>
					<DropdownItem>French</DropdownItem>
					<DropdownItem>Chinese</DropdownItem>
					<DropdownItem>German</DropdownItem>
				</DropdownContent>
			</Dropdown>

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button color="neutral" variant="outline">
						<CalendarIcon />
						Pick Date Range
					</Button>
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
