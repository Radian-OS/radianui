"use client"

import React, { useMemo, useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { CountryIso2, FlagImage, defaultCountries, parseCountry, usePhoneInput } from "react-international-phone"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/registry/ui/command"
import { Input, InputGroup } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

export default function InternationalPhone({
	onlyCountries = ["us", "np", "it", "gb"], // Pass array of ISO2 codes like ["us", "np", "it", "gb"]
}: {
	onlyCountries?: CountryIso2[]
}) {
	const [internalValue, setInternalValue] = useState<string>("")
	const [open, setOpen] = useState(false)

	// Filter countries based on onlyCountries prop
	const filteredCountries = useMemo(() => {
		if (!onlyCountries || onlyCountries.length === 0) {
			return defaultCountries
		}
		return defaultCountries.filter((country) => {
			const parsed = parseCountry(country)
			return onlyCountries.includes(parsed.iso2 as CountryIso2)
		})
	}, [onlyCountries])

	const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
		defaultCountry: onlyCountries.length > 0 ? onlyCountries[0] : "us",
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
			<div className="flex w-full">
				<InputGroup className="w-full">
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button color="neutral" variant="outline" role="combobox" aria-expanded={open} className="border-r-1 w-fit justify-between gap-2 rounded-r-none">
								<div className="flex items-center gap-2">
									<FlagImage iso2={country.iso2} className="size-4" />
									<span className="text-sm">+{country.dialCode}</span>
								</div>
								<ChevronDown className="size-4 opacity-50" />
							</Button>
						</PopoverTrigger>
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
			</div>
		</div>
	)
}
