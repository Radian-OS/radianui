"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/registry/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

const topCities = [
	{
		value: "amsterdam",
		label: "Amsterdam, Netherlands",
	},
	{
		value: "london",
		label: "London, UK",
	},
	{
		value: "paris",
		label: "Paris, France",
	},
	{
		value: "tokyo",
		label: "Tokyo, Japan",
	},
	{
		value: "new_york",
		label: "New York, USA",
	},
	{
		value: "dubai",
		label: "Dubai, UAE",
	},
]

export default function ComboboxDemo() {
	const [open, setOpen] = React.useState(false)
	const [value, setValue] = React.useState("")

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" color="neutral" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
					<span className="truncate">{value ? topCities.find((city) => city.value === value)?.label : "Select city..."}</span>
					<ChevronsUpDown />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-(--radix-popper-anchor-width) bg-bg p-0">
				<Command className="border-0">
					<CommandInput placeholder="Search city..." />
					<CommandList>
						<CommandEmpty>No city found.</CommandEmpty>
						<CommandGroup>
							{topCities.map((city) => (
								<CommandItem
									key={city.value}
									value={city.value}
									onSelect={(currentValue) => {
										setValue(currentValue === value ? "" : currentValue)
										setOpen(false)
									}}>
									<span className="truncate">{city.label}</span>
									<Check className={cn("ml-auto", value === city.value ? "opacity-100" : "opacity-0")} />
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
