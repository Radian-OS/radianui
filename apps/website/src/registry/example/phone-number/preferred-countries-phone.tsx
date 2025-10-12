"use client"

import React, { useMemo, useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { CountryIso2, FlagImage, defaultCountries, parseCountry, usePhoneInput } from "react-international-phone"
import { ScrollArea } from "@/components/scroll-area"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/registry/ui/command"
import { Divider } from "@/registry/ui/divider"
import { Input, InputGroup } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

export default function InternationalPhone({ preferredCountries = ["us", "gb", "np"] }: { preferredCountries?: CountryIso2[] }) {
	const [internalValue, setInternalValue] = useState<string>("")
	const [open, setOpen] = useState(false)

	// Split countries into preferred and others
	const { preferred, others } = useMemo(() => {
		const preferred = defaultCountries.filter((country) => {
			const parsed = parseCountry(country)
			return preferredCountries.includes(parsed.iso2 as CountryIso2)
		})
		const others = defaultCountries.filter((country) => {
			const parsed = parseCountry(country)
			return !preferredCountries.includes(parsed.iso2 as CountryIso2)
		})
		return { preferred, others }
	}, [preferredCountries])

	const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
		defaultCountry: preferredCountries.length > 0 ? preferredCountries[0] : "us",
		value: internalValue,
		countries: defaultCountries,
		onChange: (data) => {
			setInternalValue(data.phone)
		},
	})

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
						<ScrollArea>
							<PopoverContent className="w-[300px] p-0 sm:w-full" align="start">
								<Command className="border-0">
									<CommandInput placeholder="Search country..." />
									<CommandList>
										<CommandEmpty>No country found.</CommandEmpty>

										{/* Preferred Countries */}
										{preferred.length > 0 && (
											<>
												<CommandGroup heading="Preferred">
													{preferred.map((c) => {
														const parsed = parseCountry(c)
														return (
															<CommandItem
																key={`preferred-${parsed.iso2}`}
																value={`${parsed.name} ${parsed.dialCode}`}
																onSelect={() => {
																	setCountry(parsed.iso2 as CountryIso2)
																	setOpen(false)
																}}>
																<div className="flex flex-1 items-center gap-2">
																	<FlagImage iso2={parsed.iso2} className="size-5" />
																	<span className="truncate">{parsed.name}</span>
																	<span className="text-muted-foreground ml-auto text-sm">+{parsed.dialCode}</span>
																</div>
																<Check className={cn("ml-2", country.iso2 === parsed.iso2 ? "opacity-100" : "opacity-0")} />
															</CommandItem>
														)
													})}
												</CommandGroup>
												<Divider className="my-1" />
											</>
										)}

										{/* All Other Countries */}
										<CommandGroup heading={preferred.length > 0 ? "All Countries" : undefined}>
											{others.map((c) => {
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
															<span className="text-muted-foreground ml-auto text-sm">+{parsed.dialCode}</span>
														</div>
														<Check className={cn("ml-2", country.iso2 === parsed.iso2 ? "opacity-100" : "opacity-0")} />
													</CommandItem>
												)
											})}
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
			</div>
		</div>
	)
}
