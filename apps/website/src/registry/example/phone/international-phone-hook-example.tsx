"use client"

import React, { useState } from "react"
import { CountryIso2, FlagImage, defaultCountries, parseCountry, usePhoneInput } from "react-international-phone"
import { cn } from "@/lib/utils"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"

type InternationalPhoneProps = {
	value?: string
	onChange?: (phone: string) => void
	label?: string
	placeholder?: string
	disabled?: boolean
	className?: string
}

export default function InternationalPhoneWithHookExample({
	value: valueProp,
	onChange,
	label = "Phone number",
	placeholder = "Enter phone number",
	disabled = false,
	className,
}: InternationalPhoneProps) {
	const [internalValue, setInternalValue] = useState<string>(valueProp ?? "")

	const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
		defaultCountry: "us",
		value: internalValue,
		countries: defaultCountries,
		onChange: (data) => {
			setInternalValue(data.phone)
			onChange?.(data.phone)
		},
	})

	return (
		<div className={cn("flex w-full max-w-[420px] flex-col gap-1.5", className)}>
			{label ? <Label className="text-sm font-medium">{label}</Label> : null}
			<div className="flex items-stretch gap-2">
				<Select value={country.iso2} onValueChange={(code) => setCountry(code as CountryIso2)} disabled={disabled}>
					<SelectTrigger className="w-[110px]">
						<SelectValue aria-label={country.name}>
							<span className="inline-flex items-center gap-1.5">
								<FlagImage iso2={country.iso2} style={{ display: "flex" }} />
								<span className="text-fg-tertiary">+{country.dialCode}</span>
							</span>
						</SelectValue>
					</SelectTrigger>
					<SelectContent className="max-h-80 w-80">
						<SelectGroup>
							{defaultCountries.map((c) => {
								const parsed = parseCountry(c)
								return (
									<SelectItem key={parsed.iso2} value={parsed.iso2} className="justify-between gap-2">
										<span className="inline-flex flex-1 items-center gap-2">
											<FlagImage iso2={parsed.iso2} style={{ display: "flex" }} />
											<span className="truncate">{parsed.name}</span>
										</span>
										<span className="text-fg-tertiary">+{parsed.dialCode}</span>
									</SelectItem>
								)
							})}
						</SelectGroup>
					</SelectContent>
				</Select>

				<Input ref={inputRef} type="tel" placeholder={placeholder} value={inputValue} onChange={handlePhoneValueChange} disabled={disabled} className="flex-1" />
			</div>
		</div>
	)
}
