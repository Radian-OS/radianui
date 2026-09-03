"use client"

import React, { useMemo, useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import {
	CountryIso2,
	FlagImage,
	defaultCountries,
	parseCountry,
	usePhoneInput,
} from "react-international-phone"
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
import { Input, InputGroup } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

export default function InternationalPhone({
	onlyCountries = ["us", "np", "it", "gb"],
}: {
	onlyCountries?: CountryIso2[]
}) {
	const [internalValue, setInternalValue] = useState<string>("")
	const [open, setOpen] = useState(false)

	// Filter countries to get full country data arrays
	const filteredCountries = useMemo(() => {
		if (!onlyCountries || onlyCountries.length === 0) {
			return defaultCountries
		}
		return defaultCountries.filter((country) => {
			const parsed = parseCountry(country)
			return onlyCountries.includes(parsed.iso2 as CountryIso2)
		})
	}, [onlyCountries])

	const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
		usePhoneInput({
			defaultCountry: onlyCountries.length > 0 ? onlyCountries[0] : "us",
			value: internalValue,
			countries: filteredCountries,
			onChange: (data) => {
				setInternalValue(data.phone)
			},
		})

	return (
		<div className="flex w-full max-w-80 flex-col justify-center gap-1.5">
			<Label htmlFor="only-countries-phone">Enter Your Number</Label>
			<InputGroup className="w-full">
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							color="neutral"
							variant="outline"
							role="combobox"
							aria-expanded={open}
							className="w-fit justify-between gap-2 rounded-r-none border-r-1">
							<FlagImage iso2={country.iso2} className="size-4" />
							<ChevronDown className="size-4 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-full p-0 md:w-80" align="start">
						<Command className="border-0">
							<CommandInput placeholder="Search country..." />
							<CommandList>
								<CommandEmpty>No country found.</CommandEmpty>
								<CommandGroup>
									{filteredCountries.map((c) => {
										const parsed = parseCountry(c)
										return (
											<CommandItem
												key={parsed.iso2}
												value={`${parsed.name} ${parsed.dialCode}`}
												onSelect={() => {
													setCountry(parsed.iso2 as CountryIso2)
													setOpen(false)
												}}>
												<div className="flex flex-1 items-center gap-2">
													<FlagImage iso2={parsed.iso2} className="size-5" />
													<span className="truncate">{parsed.name}</span>
													<span className="text-fg-secondary ml-auto text-sm">
														+{parsed.dialCode}
													</span>
												</div>
												<Check
													className={cn(
														"ml-2",
														country.iso2 === parsed.iso2
															? "opacity-100"
															: "opacity-0"
													)}
												/>
											</CommandItem>
										)
									})}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
				<Input
					id="only-countries-phone"
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
