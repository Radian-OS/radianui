"use client"

import React, { useState } from "react"
import {
	FlagImage,
	defaultCountries,
	usePhoneInput,
} from "react-international-phone"
import { Input, InputWrapper } from "@/styles/default/ui/input"
import { Label } from "@/styles/default/ui/label"

export default function PhoneNumberNoFormatting() {
	const [internalValue, setInternalValue] = useState<string>("")
	const { inputValue, handlePhoneValueChange, inputRef, country } =
		usePhoneInput({
			defaultCountry: "us",
			disableFormatting: true,
			disableDialCodeAndPrefix: true,
			value: internalValue,
			countries: defaultCountries,
			onChange: (data) => {
				setInternalValue(data.phone)
			},
		})

	return (
		<div className="flex w-full max-w-80 flex-col justify-center gap-1.5">
			<Label htmlFor="no">Enter Your Number</Label>
			<InputWrapper className="w-full">
				<FlagImage iso2={country.iso2} className="size-4" />
				<Input
					id="no"
					type="tel"
					onChange={handlePhoneValueChange}
					placeholder="Enter Your Number"
					value={inputValue}
					ref={inputRef}
				/>
			</InputWrapper>
		</div>
	)
}
