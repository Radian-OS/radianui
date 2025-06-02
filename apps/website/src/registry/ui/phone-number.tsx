import React, { useId, useMemo, useState } from "react"
import { ChevronDown, ChevronUp, PhoneIcon } from "lucide-react"
import * as RPNInput from "react-phone-number-input"
import { Value, getCountries, getCountryCallingCode } from "react-phone-number-input"
import flags from "react-phone-number-input/flags"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Input, InputProps } from "@/registry/ui/input"
import { Select, SelectGroup, SelectItem } from "@/registry/ui/select"

type PhoneNumberPrimitiveProps = Omit<RPNInput.Props<typeof Input>, "inputComponent" | "displayName"> & {
	size?: InputProps["size"]
	showTrigger?: boolean
	flagsOnly?: boolean
	className?: string
	country?: RPNInput.Country
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
	...rpnInputProps
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

	const handlePhoneChange = (val: Value | undefined) => {
		if (disabled) return

		if (val) {
			onChange?.(val)

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
						onCountryChange?.(selectedCountry)
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
			onCountryChange?.(selectedValue as RPNInput.Country)
		} else {
			// If not, look up the country code from the name
			const countryCode = countryNameToCode.get(selectedValue.toLowerCase())
			if (countryCode) {
				onCountryChange?.(countryCode)
			}
		}
	}

	const InputWithClass = useMemo(() => {
		const Comp = (props: InputProps) => (
			<Input {...props} data-slot="phone-input" size={size} disabled={disabled} className={cn(showTrigger && "rounded-l-none", className, props.className)} />
		)
		Comp.displayName = "PhoneNumber.InputWithClass"
		return Comp
	}, [className, size, showTrigger, disabled])

	// Get the display name for the selected country
	const selectedCountryName = country ? new Intl.DisplayNames(["en"], { type: "region" }).of(country) || country : ""
	const [selectOpen, setSelectOpen] = useState(false)

	return (
		<div className="flex gap-0">
			{showTrigger && (
				<Select
					open={selectOpen}
					onOpenChange={setSelectOpen}
					selectedValues={selectedCountryName ? [selectedCountryName] : []}
					onSelectedChange={handleCountrySelection}
					selectionMode="single"
					isSearchable={true}
					searchPlaceholder="Search countries..."
					disabled={disabled}
					renderTrigger={() => (
						<Button
							trail={flagsOnly ? undefined : selectOpen ? <ChevronUp className="text-text-disabled size-4" /> : <ChevronDown className="text-text-disabled size-4" />}
							variant="neutral-soft"
							size={size === "0" ? undefined : size}
							disabled={disabled}
							lead={<Flag country={country} />}
							className="focus-visible:border-primary border-border-alpha focus-visible:border-r-1 flex flex-shrink-0 items-center justify-center gap-1 rounded-r-none border border-r-0 px-2 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
							{!flagsOnly && <span className="text-text-tertiary">{country ? `+${getCountryCallingCode(country)}` : ""}</span>}
						</Button>
					)}>
					<SelectGroup>
						{countries.map((c) => {
							const regionName = new Intl.DisplayNames(["en"], { type: "region" }).of(c) || c
							return (
								<SelectItem endContent={`+${getCountryCallingCode(c)}`} startContent={<Flag country={c} />} key={c} value={regionName}>
									<span>{regionName}</span>
								</SelectItem>
							)
						})}
					</SelectGroup>
				</Select>
			)}
			<RPNInput.default
				{...rpnInputProps}
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
			/>
		</div>
	)
}

const Flag = ({ country }: { country?: RPNInput.Country }) => {
	if (!country) return <PhoneIcon className="text-text-disabled h-5 w-5" />
	const CountryFlag = flags[country]
	return (
		<span className="flex items-center justify-center overflow-hidden rounded-sm [&>svg]:size-5">
			{CountryFlag ? <CountryFlag title={country} /> : <ChevronDown className="size-5" />}
		</span>
	)
}

PhoneNumber.displayName = "PhoneNumber"

export { PhoneNumber }
