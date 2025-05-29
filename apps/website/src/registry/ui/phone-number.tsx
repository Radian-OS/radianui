import React, { useId, useMemo } from "react"
import { ChevronDown, PhoneIcon } from "lucide-react"
import * as RPNInput from "react-phone-number-input"
import { getCountries, getCountryCallingCode } from "react-phone-number-input"
import flags from "react-phone-number-input/flags"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Input, InputProps } from "@/registry/ui/input"
import { Select, SelectItem } from "@/registry/ui/select"

type PhoneNumberPrimitiveProps = {
	value: string
	onChange: (value: string) => void
	country: RPNInput.Country
	onCountryChange: (country: RPNInput.Country) => void
	size?: InputProps["size"]
	showTrigger?: boolean
	disabled?: boolean
	flagsOnly?: boolean
	className?: string
}

const PhoneNumber: React.FC<PhoneNumberPrimitiveProps> = ({
	value,
	onChange,
	country,
	onCountryChange,
	size,
	showTrigger = true,
	disabled = false,
	flagsOnly = false,
	className,
}) => {
	const id = useId()
	const countries = useMemo(() => getCountries(), [])

	// Create a map of country names to country codes for reverse lookup
	const countryNameToCode = useMemo(() => {
		const map = new Map<string, RPNInput.Country>()
		countries.forEach((c) => {
			const regionName = new Intl.DisplayNames(["en"], { type: "region" }).of(c) || c
			map.set(regionName.toLowerCase(), c)
		})
		return map
	}, [countries])

	// Country priority mapping for shared calling codes
	const countryPriority = useMemo(
		() =>
			({
				"1": ["US", "CA"],
				"7": ["RU", "KZ"],
				"47": ["NO", "SJ"],
				"590": ["GP", "BL", "MF"],
				"599": ["CW", "BQ"],
				"1242": ["BS"],
				"1246": ["BB"],
				"1264": ["AI"],
				"1268": ["AG"],
			}) as Record<string, string[]>,
		[]
	)

	const handlePhoneChange = (val: string | undefined) => {
		if (disabled) return

		if (typeof val === "string") {
			onChange(val)

			if (val.startsWith("+")) {
				const numberWithoutPlus = val.slice(1)
				const sortedCountries = [...countries].sort((a, b) => getCountryCallingCode(b).length - getCountryCallingCode(a).length)

				const matchingCountries = sortedCountries.filter((countryCode) => {
					const callingCode = getCountryCallingCode(countryCode)
					return numberWithoutPlus.startsWith(callingCode)
				})

				if (matchingCountries.length > 0) {
					let selectedCountry = matchingCountries[0]

					const firstMatchCallingCode = getCountryCallingCode(matchingCountries[0])
					const priorityList = countryPriority[firstMatchCallingCode as string]

					if (priorityList) {
						const priorityCountry = priorityList.find((code) => matchingCountries.includes(code as RPNInput.Country))
						if (priorityCountry) {
							selectedCountry = priorityCountry as RPNInput.Country
						}
					}

					if (selectedCountry && selectedCountry !== country) {
						onCountryChange(selectedCountry)
					}
				}
			}
		}
	}

	// Handle country selection - convert from country name back to country code
	const handleCountrySelection = (selectedValues: string[]) => {
		if (disabled) return

		const selectedValue = selectedValues[0]

		// First check if it's already a country code
		if (countries.includes(selectedValue as RPNInput.Country)) {
			onCountryChange(selectedValue as RPNInput.Country)
		} else {
			// If not, look up the country code from the name
			const countryCode = countryNameToCode.get(selectedValue.toLowerCase())
			if (countryCode) {
				onCountryChange(countryCode)
			}
		}
	}

	const InputWithClass = useMemo(() => {
		const Comp = React.forwardRef<HTMLInputElement, InputProps>(({ className: innerClassName, ...props }, ref) => (
			<Input
				ref={ref}
				data-slot="phone-input"
				size={size}
				disabled={disabled}
				className={cn(showTrigger && "rounded-l-none", className, innerClassName)}
				{...props}
			/>
		))
		Comp.displayName = "InputWithClass"
		return Comp
	}, [className, size, showTrigger, disabled])

	// Get the display name for the selected country
	const selectedCountryName = country ? new Intl.DisplayNames(["en"], { type: "region" }).of(country) || country : ""

	return (
		<div className="flex gap-0">
			{showTrigger && (
				<Select
					selectedValues={selectedCountryName ? [selectedCountryName] : []}
					onSelectedChange={handleCountrySelection}
					selectionMode="single"
					isSearchable={true}
					searchPlaceholder="Search countries..."
					disabled={disabled}
					renderTrigger={() => (
						<Button
							variant="neutral-soft"
							size={size === "0" ? undefined : size}
							disabled={disabled}
							className="border-border-alpha flex flex-shrink-0 items-center gap-1 rounded-r-none border border-r-0">
							<Flag country={country} />
							{!flagsOnly && <span>{country ? `+${getCountryCallingCode(country)}` : ""}</span>}
							<ChevronDown className="text-text-disabled size-4" />
						</Button>
					)}>
					{countries.map((c) => {
						const regionName = new Intl.DisplayNames(["en"], { type: "region" }).of(c) || c
						return (
							<SelectItem key={c} value={regionName}>
								<Flag country={c} />
								<span>{regionName}</span>
								<span className="text-text-tertiary ml-auto text-xs">+{getCountryCallingCode(c)}</span>
							</SelectItem>
						)
					})}
				</Select>
			)}
			<RPNInput.default
				id={id}
				className="flex-1"
				country={country}
				value={value}
				onChange={handlePhoneChange}
				onCountryChange={onCountryChange}
				flagComponent={() => null}
				countrySelectComponent={() => null}
				inputComponent={InputWithClass}
				placeholder="Enter phone number"
				disabled={disabled}
				size={size}
			/>
		</div>
	)
}

const Flag = ({ country }: { country?: RPNInput.Country }) => {
	if (!country) return <PhoneIcon className="text-text-disabled h-5 w-5" />
	const CountryFlag = flags[country]
	return (
		<span className="flex h-5 w-10 items-center justify-center overflow-hidden rounded-sm [&>svg]:h-5 [&>svg]:w-5">
			{CountryFlag ? <CountryFlag title={country} /> : <ChevronDown className="h-5 w-5" />}
		</span>
	)
}

export { PhoneNumber }
