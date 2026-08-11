"use client"

import React, { useState } from "react"
import {
	FlagImage,
	defaultCountries,
	usePhoneInput,
} from "react-international-phone"
import { Input, InputWrapper } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

export default function PhoneNumberStatic() {
	const [internalValue, setInternalValue] = useState<string>("")
	const { inputValue, handlePhoneValueChange, inputRef, country } =
		usePhoneInput({
			defaultCountry: "us",
			disableDialCodeAndPrefix: true,
			value: internalValue,
			countries: defaultCountries,
			onChange: (data) => {
				setInternalValue(data.phone)
			},
		})

	return (
		<div className="flex w-full max-w-80 flex-col justify-center gap-1.5">
			<Label htmlFor="static">Enter Your Number</Label>
			<InputWrapper className="w-full">
				<FlagImage iso2={country.iso2} className="size-4" />
				<Input
					id="static"
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
