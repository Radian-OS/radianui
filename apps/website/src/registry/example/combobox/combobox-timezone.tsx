"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/registry/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"
import { ScrollArea } from "@/registry/ui/scroll-area"

export default function ComboboxTimezone() {
	const [open, setOpen] = React.useState(false)
	const [value, setValue] = React.useState("")

	const timezones = React.useMemo(() => Intl.supportedValuesOf("timeZone"), [])

	const formattedTimezones = React.useMemo(() => {
		return timezones
			.map((timezone) => {
				const formatter = new Intl.DateTimeFormat("en", {
					timeZone: timezone,
					timeZoneName: "longOffset",
				})

				const parts = formatter.formatToParts(new Date())

				const offset =
					parts.find((part) => part.type === "timeZoneName")?.value || ""

				const formattedOffset = offset === "GMT" ? "GMT+0" : offset

				return {
					value: timezone,
					offset,
					numericOffset: parseInt(
						formattedOffset.replace("GMT", "").replace("+", "") ||
							"0".slice(0, 2)
					),
				}
			})
			.sort((a, b) => a.numericOffset - b.numericOffset)
	}, [timezones])

	const selectedTimezone = formattedTimezones.find((t) => t.value === value)!

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					color="neutral"
					role="combobox"
					aria-expanded={open}
					className="w-80">
					{value ? (
						<>
							<span>{selectedTimezone.value}</span>
							<span className="text-fg-tertiary">
								{selectedTimezone.offset}
							</span>
						</>
					) : (
						<span className="text-fg-secondary truncate text-sm font-normal">
							Select Timezone
						</span>
					)}
					<ChevronDown className="text-fg-tertiary ml-auto" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-(--radix-popper-anchor-width) bg-bg p-0">
				<Command className="border-0">
					<CommandInput placeholder="Search" />
					<CommandList className="max-h-none overflow-visible">
						<CommandEmpty>No city found.</CommandEmpty>
						<ScrollArea className="h-74">
							<CommandGroup>
								{formattedTimezones.map((t) => (
									<CommandItem
										keywords={[t.value]}
										key={t.value}
										value={t.value}
										onSelect={(currentValue) => {
											setValue(currentValue === value ? "" : currentValue)
											setOpen(false)
										}}>
										<div className="flex gap-2 font-normal">
											<span className="flex-1 truncate">{t.value}</span>
											<span className="text-fg-secondary flex-nowrap text-[13px]">
												{t.offset}
											</span>
										</div>
										<Check
											className={cn(
												"ml-auto size-5",
												value === t.value ? "opacity-100" : "opacity-0"
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</ScrollArea>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
