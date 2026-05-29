"use client"

import React, { useMemo, useState } from "react"
import {
	CountryIso2,
	FlagImage,
	defaultCountries,
	parseCountry,
	usePhoneInput,
} from "react-international-phone"
import { cn } from "@/lib/utils"
import { IconSlot } from "@/registry/icon/icon-library"
import { Button } from "@/registry/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/registry/ui/command"
import { Input, InputGroup } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"
import { ScrollArea } from "@/registry/ui/scroll-area"

export default function InternationalPhone({
	excludeCountries = ["us", "np", "it", "gb"],
}: {
	excludeCountries?: CountryIso2[]
}) {
	const [internalValue, setInternalValue] = useState<string>("")
	const [open, setOpen] = useState(false)

	// Filter countries based on excludeCountries prop
	const filteredCountries = useMemo(() => {
		// If excludeCountries is provided, exclude them
		if (excludeCountries && excludeCountries.length > 0) {
			return defaultCountries.filter((country) => {
				const parsed = parseCountry(country)
				return !excludeCountries.includes(parsed.iso2 as CountryIso2)
			})
		}

		// If not provided, return all countries
		return defaultCountries
	}, [excludeCountries])

	const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
		usePhoneInput({
			defaultCountry: "ca",
			value: internalValue,
			countries: filteredCountries,
			onChange: (data) => {
				setInternalValue(data.phone)
			},
		})

	const parsedCountries = filteredCountries.map(parseCountry)

	return (
		<div className="flex w-full max-w-80 flex-col justify-center gap-1.5">
			<Label htmlFor="exclude-countries">Enter Your Number</Label>
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
							<IconSlot slot="down" className="size-4 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-full p-0 md:w-80" align="start">
						<Command className="border-0">
							<CommandInput placeholder="Search country..." />
							<CommandList>
								<ScrollArea className="h-75">
									<CommandEmpty>No country found.</CommandEmpty>
									<CommandGroup>
										{parsedCountries.map((c) => (
											<CommandItem
												key={c.iso2}
												className="px-1"
												value={`${c.name} ${c.dialCode}`}
												onSelect={() => {
													setCountry(c.iso2 as CountryIso2)
													setOpen(false)
												}}>
												<div className="flex flex-1 items-center justify-center gap-2">
													<FlagImage iso2={c.iso2} className="size-5" />
													<span className="truncate">{c.name}</span>
													<span className="text-fg-secondary ml-auto text-sm">
														+{c.dialCode}
													</span>
													<IconSlot
														slot="check"
														className={cn(
															country.iso2 === c.iso2
																? "opacity-100"
																: "opacity-0"
														)}
													/>
												</div>
											</CommandItem>
										))}
									</CommandGroup>
								</ScrollArea>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
				<Input
					id="exclude-countries"
					ref={inputRef}
					type="tel"
					placeholder="Enter your phone number"
					value={inputValue}
					onChange={handlePhoneValueChange}
					className="flex-1 rounded-l-none border-l-0 focus-within:border-l"
				/>
			</InputGroup>
			<p className="text-fg-secondary text-xs">
				Excluded Countries: USA, Nepal, Italy & United Kingdom
			</p>
		</div>
	)
}
