"use client"

import React, { useId, useState } from "react"
import { ChevronDown, PhoneIcon } from "lucide-react"
import * as RPNInput from "react-phone-number-input"
import { getCountries, getCountryCallingCode } from "react-phone-number-input"
import flags from "react-phone-number-input/flags"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownTrigger } from "./dropdown"
import { Input, InputProps } from "./input"

type PhoneNumberProps = {
	size?: InputProps["size"]
	showTrigger?: boolean
}

const PhoneNumber = ({ size, showTrigger = true }: PhoneNumberProps) => {
	const id = useId()
	const [value, setValue] = useState("")
	const [country, setCountry] = useState<RPNInput.Country>("US")

	return (
		<div className="flex gap-0">
			<CountrySelect value={country} onChange={setCountry} size={size} showTrigger={showTrigger} />
			<RPNInput.default
				className="flex flex-1"
				country={country}
				flagComponent={() => null}
				countrySelectComponent={() => null}
				inputComponent={PhoneInput}
				id={id}
				placeholder="Enter phone number"
				value={value}
				// 1. Sync country when user types "+{digits}", via the built-in onCountryChange
				onCountryChange={(newCountry) => {
					if (newCountry) {
						setCountry(newCountry)
					}
				}}
				// 2. Only update the input value if it starts with "+" (or is empty)
				onChange={(newValue) => {
					const val = newValue ?? ""
					if (val === "" || /^\+\d*$/.test(val)) {
						setValue(val)
					}
					// else: ignore any typing that doesn't start with "+"
				}}
				size={size}
			/>
		</div>
	)
}

type CountrySelectProps = {
	value: RPNInput.Country
	onChange: (value: RPNInput.Country) => void
	size?: InputProps["size"]
	showTrigger: boolean
}

const CountrySelect = ({ value, onChange, size, showTrigger }: CountrySelectProps) => {
	const countries = getCountries()

	const triggerContent = (
		<Button
			variant="neutral-soft"
			size={size === "0" ? null : size}
			className="border-border-alpha flex items-center gap-1 rounded-r-none border border-r-0">
			<FlagComponent country={value} countryName={value} />
			<span>+{getCountryCallingCode(value)}</span>
			{showTrigger && <ChevronDown className="text-text-disabled size-5" />}
		</Button>
	)

	if (!showTrigger) return triggerContent

	return (
		<Dropdown>
			<DropdownTrigger asChild>{triggerContent}</DropdownTrigger>
			<DropdownContent className="max-h-60 w-80 overflow-auto">
				<DropdownGroup selectionMode="single" selectedValues={[value]} onSelectedChange={(vals) => onChange(vals[0] as RPNInput.Country)}>
					{countries.map((countryCode) => (
						<DropdownItem
							key={countryCode}
							value={countryCode}
							icon={<FlagComponent country={countryCode} countryName={countryCode} />}
							shortcut={`+${getCountryCallingCode(countryCode)}`}>
							{new Intl.DisplayNames(["en"], { type: "region" }).of(countryCode)}
						</DropdownItem>
					))}
				</DropdownGroup>
			</DropdownContent>
		</Dropdown>
	)
}

interface PhoneInputProps extends InputProps {
	className?: string
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(({ className, size, ...props }, ref) => (
	<Input ref={ref} data-slot="phone-input" size={size} className={cn("rounded-l-none", className)} {...props} />
))
PhoneInput.displayName = "PhoneInput"

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
	const Flag = flags[country]
	return (
		<span className="w-8 overflow-hidden rounded-sm">
			{Flag ? <Flag title={countryName} /> : <PhoneIcon className="size-5" aria-hidden="true" />}
		</span>
	)
}

export { PhoneNumber }
