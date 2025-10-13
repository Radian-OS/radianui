"use client"

import React, { useMemo, useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { CountryIso2, FlagImage, defaultCountries, parseCountry, usePhoneInput } from "react-international-phone"
import { ScrollArea } from "@/components/scroll-area"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/registry/ui/command"
import { Input, InputGroup } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

export default function InternationalPhone({ excludeCountries = ["us", "np", "it", "gb"] }: { excludeCountries?: CountryIso2[] }) {
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

	const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
		defaultCountry: "ca",
		value: internalValue,
		countries: filteredCountries,
		onChange: (data) => {
			setInternalValue(data.phone)
		},
	})

	const parsedCountries = filteredCountries.map(parseCountry)

	return (
		<div className="flex w-full max-w-[420px] flex-col items-start justify-center gap-1.5">
			<Label>Enter Your Number</Label>
			<div className="flex w-full flex-col gap-1.5">
				<InputGroup className="w-full">
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button color="neutral" variant="outline" role="combobox" aria-expanded={open} className="border-r-1 w-fit justify-between gap-2 rounded-r-none">
								<FlagImage iso2={country.iso2} className="size-4" />
								<ChevronDown className="size-4 opacity-50" />
							</Button>
						</PopoverTrigger>
						<ScrollArea>
							<PopoverContent className="w-[300px] p-0 sm:w-full" align="start">
								<Command className="border-0">
									<CommandInput placeholder="Search country..." />
									<CommandList>
										<CommandEmpty>No country found.</CommandEmpty>
										<CommandGroup>
											{parsedCountries.map((c) => (
												<CommandItem
													key={c.iso2}
													value={`${c.name} ${c.dialCode}`}
													onSelect={() => {
														setCountry(c.iso2 as CountryIso2)
														setOpen(false)
													}}>
													<div className="flex flex-1 items-center gap-2">
														<FlagImage iso2={c.iso2} className="size-5" />
														<span className="truncate">{c.name}</span>
														<span className="text-muted-foreground ml-auto text-sm">+{c.dialCode}</span>
													</div>
													<Check className={cn("ml-2", country.iso2 === c.iso2 ? "opacity-100" : "opacity-0")} />
												</CommandItem>
											))}
										</CommandGroup>
									</CommandList>
								</Command>
							</PopoverContent>
						</ScrollArea>
					</Popover>
					<Input
						ref={inputRef}
						type="tel"
						placeholder="Enter your phone number"
						value={inputValue}
						onChange={handlePhoneValueChange}
						className="flex-1 rounded-l-none border-l-0 focus-within:border-l"
					/>
				</InputGroup>
				<p className="text-fg-secondary text-xs">Excluded Countries: USA, Nepal, Italy & United Kingdom</p>
			</div>
		</div>
	)
}
