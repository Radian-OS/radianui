"use client"

import React, { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import {
	CountryIso2,
	FlagImage,
	defaultCountries,
	parseCountry,
	usePhoneInput,
} from "react-international-phone"
import { cn } from "@/lib/utils"
import { Button } from "@/styles/default/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/styles/default/ui/command"
import { Input, InputGroup } from "@/styles/default/ui/input"
import { Label } from "@/styles/default/ui/label"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/styles/default/ui/popover"
import { ScrollArea } from "@/styles/default/ui/scroll-area"

function InternationalPhone() {
	const [internalValue, setInternalValue] = useState<string>("")
	const [open, setOpen] = useState(false)

	const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
		usePhoneInput({
			defaultCountry: "us",
			value: internalValue,
			countries: defaultCountries,
			onChange: (data) => {
				setInternalValue(data.phone)
			},
		})

	const parsedCountries = defaultCountries.map(parseCountry)

	return (
		<div className="flex w-full max-w-80 flex-col justify-center gap-1.5">
			<Label htmlFor="international-phone">Enter Your Number</Label>
			<InputGroup className="w-full">
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							color="neutral"
							variant="outline"
							role="combobox"
							aria-expanded={open}
							className="border-r-1 w-fit justify-between gap-2 rounded-r-none">
							<FlagImage iso2={country.iso2} className="size-4" />
							<ChevronDown className="size-4 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-full p-0 md:w-80" align="start">
						<Command className="border-0">
							<CommandInput placeholder="Search country..." />
							<CommandList>
								<ScrollArea className="h-75">
									<CommandEmpty>No country found.</CommandEmpty>
									<CommandGroup className="no-scrollbar">
										{parsedCountries.map((c) => (
											<CommandItem
												key={c.iso2}
												className="px-1"
												value={`${c.name} ${c.dialCode}`}
												onSelect={() => {
													setCountry(c.iso2 as CountryIso2)
													setOpen(false)
												}}>
												<div className="flex flex-1 items-center gap-2">
													<FlagImage iso2={c.iso2} className="size-5" />
													<span className="truncate">{c.name}</span>
													<span className="text-fg-secondary ml-auto text-sm">
														+{c.dialCode}
													</span>
												</div>
												<Check
													className={cn(
														country.iso2 === c.iso2
															? "opacity-100"
															: "opacity-0"
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
				<Input
					id="international-phone"
					ref={inputRef}
					type="tel"
					placeholder="Enter your phone number"
					value={inputValue}
					onChange={handlePhoneValueChange}
					className="flex-1 rounded-l-none border-l-0 focus-within:border-l"
				/>
			</InputGroup>
		</div>
	)
}

export default InternationalPhone
