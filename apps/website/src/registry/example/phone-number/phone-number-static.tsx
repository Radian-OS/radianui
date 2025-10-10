"use client"

import React, { useState } from "react"
import { FlagImage, defaultCountries, parseCountry } from "react-international-phone"
import { Input, InputWrapper } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

export default function PhoneNumberStatic() {
	const [localPhone, setLocalPhone] = useState<string>("")
	const selectedLocalCountry = parseCountry(defaultCountries.find((c) => parseCountry(c).iso2 === "us")!)

	return (
		<div className="flex w-full max-w-[420px] flex-col items-start justify-center gap-3">
			<div className="flex flex-col gap-1.5">
				<Label>Enter your Number</Label>
				<InputWrapper className="md:w-80">
					<FlagImage iso2={selectedLocalCountry.iso2} className="size-4" />
					<Input type="tel" placeholder="Enter Your Number" value={localPhone} onChange={(e) => setLocalPhone(e.target.value)} />
				</InputWrapper>
			</div>
		</div>
	)
}
