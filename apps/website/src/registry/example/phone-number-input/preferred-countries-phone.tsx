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
import { Button } from "@/styles/default/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/styles/default/ui/command"
import { Divider } from "@/styles/default/ui/divider"
import { Input, InputGroup } from "@/styles/default/ui/input"
import { Label } from "@/styles/default/ui/label"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/styles/default/ui/popover"
import { ScrollArea } from "@/styles/default/ui/scroll-area"

export default function InternationalPhone({
	preferredCountries = ["us", "gb", "np"],
}: {
	preferredCountries?: CountryIso2[]
}) {
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

	const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
		usePhoneInput({
			defaultCountry:
				preferredCountries.length > 0 ? preferredCountries[0] : "us",
			value: internalValue,
			countries: defaultCountries,
			onChange: (data) => {
				setInternalValue(data.phone)
			},
		})

	return (
		<div className="flex w-full max-w-80 flex-col justify-center gap-1.5">
			<Label htmlFor="preferred-countries-phone">Enter Your Number</Label>
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
								<CommandEmpty>No country found.</CommandEmpty>
								{/* Preferred Countries */}
								<ScrollArea className="h-75">
									{preferred.length > 0 && (
										<>
											<CommandGroup>
												{preferred.map((c) => {
													const parsed = parseCountry(c)
													return (
														<CommandItem
															key={`preferred-${parsed.iso2}`}
															className="px-1"
															value={`${parsed.name} ${parsed.dialCode}`}
															onSelect={() => {
																setCountry(parsed.iso2 as CountryIso2)
																setOpen(false)
															}}>
															<div className="flex flex-1 items-center gap-2">
																<FlagImage
																	iso2={parsed.iso2}
																	className="size-5"
																/>
																<span className="truncate">{parsed.name}</span>
																<span className="text-fg-secondary ml-auto text-sm">
																	+{parsed.dialCode}
																</span>
																<Check
																	className={cn(
																		country.iso2 === parsed.iso2
																			? "opacity-100"
																			: "opacity-0"
																	)}
																/>
															</div>
														</CommandItem>
													)
												})}
											</CommandGroup>
											<Divider className="my-1" />
										</>
									)}

									{/* All Other Countries */}
									<CommandGroup>
										{others.map((c) => {
											const parsed = parseCountry(c)
											return (
												<CommandItem
													key={parsed.iso2}
													className="px-1"
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
														<Check
															className={cn(
																country.iso2 === parsed.iso2
																	? "opacity-100"
																	: "opacity-0"
															)}
														/>
													</div>
												</CommandItem>
											)
										})}
									</CommandGroup>
								</ScrollArea>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
				<Input
					id="preferred-countries-phone"
					ref={inputRef}
					type="tel"
					placeholder="Enter Your Number"
					value={inputValue}
					onChange={handlePhoneValueChange}
					className="flex-1 rounded-l-none border-l-0 focus-within:border-l"
				/>
			</InputGroup>
		</div>
	)
}
