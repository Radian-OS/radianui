"use client"

import React, { useState } from "react"
import { CountryIso2, FlagImage, defaultCountries, parseCountry } from "react-international-phone"
import { Input, InputGroup } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"

function NationalPhoneWithHookExample() {
	const [localPhone, setLocalPhone] = useState<string>("")
	const [localCountry, setLocalCountry] = useState<CountryIso2>("np")

	const selectedLocalCountry = parseCountry(defaultCountries.find((c) => parseCountry(c).iso2 === localCountry)!)

	return (
		<div className="flex w-full max-w-[420px] flex-col items-start justify-center gap-3">
			<div className="flex w-full items-center justify-between">
				<Label>Enter Your Number</Label>
			</div>
			<div className="flex w-full">
				<InputGroup className="w-full">
					<Select value={localCountry} onValueChange={(code) => setLocalCountry(code as CountryIso2)}>
						<SelectTrigger className="w-fit rounded-r-none">
							<SelectValue aria-label={selectedLocalCountry.name}>
								<div className="flex items-center gap-2">
									<FlagImage iso2={selectedLocalCountry.iso2} className="size-4" />
								</div>
							</SelectValue>
						</SelectTrigger>
						<SelectContent className="max-h-80 w-full">
							<SelectGroup>
								{defaultCountries.map((c) => {
									const parsed = parseCountry(c)
									return (
										<SelectItem key={parsed.iso2} value={parsed.iso2} className="justify-between gap-2">
											<span className="inline-flex flex-1 items-center gap-2">
												<FlagImage iso2={parsed.iso2} className="size-5" />
												<span className="truncate">{parsed.name}</span>
											</span>
										</SelectItem>
									)
								})}
							</SelectGroup>
						</SelectContent>
					</Select>
					<Input
						type="tel"
						placeholder="Enter your phone number"
						value={localPhone}
						onChange={(e) => setLocalPhone(e.target.value)}
						className="flex-1 rounded-l-none border-l-0 focus-within:border-l"
					/>
				</InputGroup>
			</div>
		</div>
	)
}

export default NationalPhoneWithHookExample
