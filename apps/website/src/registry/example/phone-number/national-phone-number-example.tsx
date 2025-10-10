"use client"

import React, { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { CountryIso2, FlagImage, defaultCountries, parseCountry } from "react-international-phone"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/registry/ui/command"
import { Input, InputGroup } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

export default function NationalPhone() {
	const [localPhone, setLocalPhone] = useState<string>("")
	const [localCountry, setLocalCountry] = useState<CountryIso2>("us")
	const [open, setOpen] = useState(false)

	const selectedLocalCountry = parseCountry(defaultCountries.find((c) => parseCountry(c).iso2 === localCountry)!)
	const parsedCountries = defaultCountries.map(parseCountry)

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Only allow numbers
		const numericValue = e.target.value.replace(/\D/g, "")
		setLocalPhone(numericValue)
	}

	return (
		<div className="flex w-full max-w-[420px] flex-col items-start justify-center gap-3">
			<div className="flex w-full items-center justify-between">
				<Label>Enter Your Number</Label>
			</div>
			<div className="flex w-full">
				<InputGroup className="w-full">
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button color="neutral" variant="outline" role="combobox" aria-expanded={open} className="border-r-1 w-fit justify-between gap-2 rounded-r-none">
								<div className="flex items-center gap-2">
									<FlagImage iso2={selectedLocalCountry.iso2} className="size-4" />
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
												value={c.name}
												onSelect={() => {
													setLocalCountry(c.iso2 as CountryIso2)
													setOpen(false)
												}}>
												<div className="flex flex-1 items-center gap-2">
													<FlagImage iso2={c.iso2} className="size-5" />
													<span className="truncate">{c.name}</span>
												</div>
												<Check className={cn("ml-2", localCountry === c.iso2 ? "opacity-100" : "opacity-0")} />
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
					<Input
						type="tel"
						placeholder="Enter your phone number"
						value={localPhone}
						onChange={handlePhoneChange}
						inputMode="numeric"
						className="flex-1 rounded-l-none border-l-0 focus-within:border-l"
					/>
				</InputGroup>
			</div>
		</div>
	)
}
