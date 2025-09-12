"use client"

import React, { useState } from "react"
import { CountryIso2, FlagImage, defaultCountries, parseCountry, usePhoneInput } from "react-international-phone"
import { Input, InputWrapper } from "@/registry/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"

export default function InternationalPhoneWithHookExample() {
	const [internalValue, setInternalValue] = useState<string>("")

	const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
		defaultCountry: "np",
		value: internalValue,
		countries: defaultCountries,
		onChange: (data) => {
			setInternalValue(data.phone)
		},
	})

	return (
		<InputWrapper className="w-full max-w-[420px] ps-0">
			<Select value={country.iso2} onValueChange={(code) => setCountry(code as CountryIso2)}>
				<SelectTrigger className="w-fit rounded-none border-y-0 border-e border-s-0 focus-visible:ring-0">
					<SelectValue aria-label={country.name}>
						<FlagImage iso2={country.iso2} className="size-4" />
					</SelectValue>
				</SelectTrigger>
				<SelectContent className="max-h-80 w-80">
					<SelectGroup>
						{defaultCountries.map((c) => {
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
			<Input ref={inputRef} type="tel" placeholder={"Enter your phone number"} value={inputValue} onChange={handlePhoneValueChange} className="flex-1" />
		</InputWrapper>
	)
}
