"use client"

import React, { useMemo, useState } from "react"
import { CountryIso2, FlagImage, defaultCountries, parseCountry, usePhoneInput } from "react-international-phone"
import { Input, InputGroup } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"

export default function InternationalPhoneWithHookExample2({
	onlyCountries = ["us", "np", "it", "gb"], // Pass array of ISO2 codes like ["us", "np", "it", "gb"]
}: {
	onlyCountries?: CountryIso2[]
}) {
	const [internalValue, setInternalValue] = useState<string>("")

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

	return (
		<div className="flex w-full max-w-[420px] flex-col items-start justify-center gap-1.5">
			<Label>Enter Your Number</Label>
			<div className="flex w-full">
				<InputGroup className="w-full">
					<Select value={country.iso2} onValueChange={(code) => setCountry(code as CountryIso2)}>
						<SelectTrigger className="w-fit rounded-r-none">
							<SelectValue aria-label={country.name}>
								<div className="flex items-center gap-2">
									<FlagImage iso2={country.iso2} className="size-4" />
									<span className="text-sm">+{country.dialCode}</span>
								</div>
							</SelectValue>
						</SelectTrigger>
						<SelectContent className="max-h-80 w-full">
							<SelectGroup>
								{filteredCountries.map((c) => {
									const parsed = parseCountry(c)
									return (
										<SelectItem key={parsed.iso2} value={parsed.iso2} className="justify-between gap-2">
											<span className="inline-flex flex-1 items-center gap-2">
												<FlagImage iso2={parsed.iso2} className="size-5" />
												<span className="truncate">{`${parsed.name} (+${parsed.dialCode})`}</span>
											</span>
										</SelectItem>
									)
								})}
							</SelectGroup>
						</SelectContent>
					</Select>
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
