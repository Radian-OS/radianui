"use client"

import React, { useState } from "react"
import { FlagImage, defaultCountries, usePhoneInput } from "react-international-phone"
import { Input, InputWrapper } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

export default function PhoneNumberStatic() {
	const [internalValue, setInternalValue] = useState<string>("")
	const { inputValue, handlePhoneValueChange, inputRef, country } = usePhoneInput({
		defaultCountry: "us",
		disableDialCodeAndPrefix: true,
		value: internalValue,
		countries: defaultCountries,
		onChange: (data) => {
			setInternalValue(data.phone)
		},
	})

	return (
		<div className="flex w-full max-w-[420px] flex-col items-start justify-center gap-3">
			<div className="flex flex-col gap-1.5">
				<Label>Enter your Number</Label>
				<InputWrapper className="md:w-80">
					<FlagImage iso2={country.iso2} className="size-4" />
					<Input type="tel" onChange={handlePhoneValueChange} placeholder="Enter Your Number" value={inputValue} ref={inputRef} />
				</InputWrapper>
			</div>
		</div>
	)
}
