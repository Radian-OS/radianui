"use client"

import React, { useState } from "react"
import {
	FlagImage,
	defaultCountries,
	usePhoneInput,
} from "react-international-phone"
import { Input, InputWrapper } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

export default function PhoneNumberExample() {
	const [internalValue, setInternalValue] = useState<string>("")

	const { inputValue, handlePhoneValueChange, inputRef, country } =
		usePhoneInput({
			defaultCountry: "us",
			value: internalValue,
			countries: defaultCountries,
			onChange: (data) => {
				setInternalValue(data.phone)
			},
		})

	return (
		<div className="flex w-full max-w-80 flex-col justify-center gap-1.5">
			<Label htmlFor="phone-number">Enter your Number</Label>
			<InputWrapper className="w-full">
				<FlagImage iso2={country.iso2} className="size-4" />
				<Input
					id="phone-number"
					type="tel"
					value={inputValue}
					onChange={handlePhoneValueChange}
					ref={inputRef}
					placeholder="Enter Your Number"
				/>
			</InputWrapper>
		</div>
	)
}
