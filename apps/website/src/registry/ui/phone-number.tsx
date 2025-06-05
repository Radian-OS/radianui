import React, { useId, useMemo, useState } from "react"
import { ChevronDown, ChevronUp, PhoneIcon } from "lucide-react"
import * as RPNInput from "react-phone-number-input"
import { Value, getCountries, getCountryCallingCode } from "react-phone-number-input"
import flags from "react-phone-number-input/flags"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Input, InputProps } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Select, SelectGroup, SelectItem } from "@/registry/ui/select"

type PhoneNumberPrimitiveProps = Omit<RPNInput.Props<typeof Input>, "inputComponent" | "displayName"> & {
	size?: InputProps["size"]
	showTrigger?: boolean
	className?: string
	country?: RPNInput.Country
	onlyCountries?: string[]
	preferredCountries?: string[]
	excludeCountries?: string[]
	label?: string
	hint?: string
	hasError?: boolean
	lead?: React.ReactNode
	trail?: React.ReactNode
	international?: boolean
	countryCallingCodeEditable?: boolean
}

const PhoneNumber: React.FC<PhoneNumberPrimitiveProps> = ({
	value,
	onChange,
	country,
	onCountryChange,
	size,
	showTrigger = true,
	disabled = false,
	className,
	onlyCountries,
	preferredCountries,
	excludeCountries,
	label,
	hint,
	hasError = false,
	lead,
	trail,
	international = false,
	countryCallingCodeEditable = false,
	...rpnInputProps
}) => {
	const id = useId()
	const allCountries = useMemo(() => getCountries(), [])

	// Normalize "US" or "United States" → "US"
	const normalizeCountryIdentifier = (identifier: string): RPNInput.Country | null => {
		if (allCountries.includes(identifier as RPNInput.Country)) {
			return identifier as RPNInput.Country
		}
		const found = allCountries.find((c) => {
			const regionName = new Intl.DisplayNames(["en"], { type: "region" }).of(c)
			return regionName?.toLowerCase() === identifier.toLowerCase()
		})
		return found || null
	}

	// Function to get alternative/common names for countries
	const getAlternativeCountryNames = (countryCode: string): string[] => {
		const alternatives: Record<string, string[]> = {
			US: ["USA", "United States", "America"],
			GB: ["UK", "United Kingdom", "Britain", "England"],
			DE: ["Germany", "Deutschland"],
			FR: ["France"],
			IT: ["Italy"],
			ES: ["Spain", "España"],
			CN: ["China", "People's Republic of China"],
			JP: ["Japan"],
			KR: ["Korea", "South Korea"],
			RU: ["Russia", "Russian Federation"],
			IN: ["India"],
			BR: ["Brazil"],
			CA: ["Canada"],
			AU: ["Australia"],
			MX: ["Mexico"],
			// Add more as needed
		}
		return alternatives[countryCode] || []
	}

	// Filter out based on only/exclude lists
	const countries = useMemo(() => {
		let filtered = [...allCountries]
		if (excludeCountries && excludeCountries.length > 0) {
			const excludeCodes = excludeCountries.map(normalizeCountryIdentifier).filter(Boolean) as RPNInput.Country[]
			filtered = filtered.filter((c) => !excludeCodes.includes(c))
		}
		if (onlyCountries && onlyCountries.length > 0) {
			const onlyCodes = onlyCountries.map(normalizeCountryIdentifier).filter(Boolean) as RPNInput.Country[]
			filtered = filtered.filter((c) => onlyCodes.includes(c))
		}
		return filtered
	}, [allCountries, onlyCountries, excludeCountries])

	// Enhanced country data with search metadata
	const countriesWithSearchData = useMemo(() => {
		return countries.map((c) => {
			const regionName = new Intl.DisplayNames(["en"], { type: "region" }).of(c) || c
			const callingCode = getCountryCallingCode(c)

			// Create search keywords for each country
			const searchKeywords = [
				regionName.toLowerCase(),
				c.toLowerCase(),
				callingCode,
				`+${callingCode}`,
				// Add common alternative names
				...(getAlternativeCountryNames(c) || []).map((name) => name.toLowerCase()),
			]

			return {
				code: c,
				name: regionName,
				callingCode,
				searchKeywords,
			}
		})
	}, [countries])

	// Separate preferred vs. regular with search data
	const { preferredCountriesList, regularCountriesList } = useMemo(() => {
		if (!preferredCountries || preferredCountries.length === 0) {
			return { preferredCountriesList: [], regularCountriesList: countriesWithSearchData }
		}
		const preferredCodes = preferredCountries.map(normalizeCountryIdentifier).filter(Boolean) as RPNInput.Country[]
		const preferred = countriesWithSearchData.filter((c) => preferredCodes.includes(c.code))
		const regular = countriesWithSearchData.filter((c) => !preferredCodes.includes(c.code))
		return { preferredCountriesList: preferred, regularCountriesList: regular }
	}, [countriesWithSearchData, preferredCountries])

	// Precompute calling codes for performance
	const countryCodeMap = useMemo(() => {
		const m = new Map<RPNInput.Country, string>()
		countries.forEach((c) => {
			m.set(c, getCountryCallingCode(c))
		})
		return m
	}, [countries])

	// Priority for shared calling codes
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

	// Helper: detect country from raw "digits" (without "+")
	const detectCountryFromNumber = (numberWithoutPlus: string): RPNInput.Country | null => {
		const sorted = [...countries].sort((a, b) => {
			return countryCodeMap.get(b)!.length - countryCodeMap.get(a)!.length
		})
		const matches = sorted.filter((c) => numberWithoutPlus.startsWith(countryCodeMap.get(c)!))
		if (matches.length === 0) return null

		let selected = matches[0]
		const firstMatchCode = countryCodeMap.get(matches[0])!
		const prioList = countryPriority[firstMatchCode]
		if (prioList) {
			const prioCountry = prioList.find((p) => matches.includes(p as RPNInput.Country))
			if (prioCountry) {
				selected = prioCountry as RPNInput.Country
			}
		}
		return selected
	}

	const handlePhoneChange = (val: Value | undefined) => {
		if (disabled) return

		// 🔒 If country calling code is not editable, completely prevent country changes
		if (countryCallingCodeEditable === false) {
			// Handle locked mode input restrictions (both international and non-international)
			if (international) {
				const lockedPrefix = country ? `+${countryCodeMap.get(country)}` : "+"

				if (val === undefined) {
					onChange?.(undefined)
					return
				}

				if (val === "+") {
					onChange?.("+" as Value)
					return
				}

				if (!val.startsWith(lockedPrefix)) {
					onChange?.(lockedPrefix as Value)
					return
				}
			}
			// For non-international locked mode, just pass through the value without country detection
			onChange?.(val)
			return
		}

		// Only run country detection logic if country calling code is editable
		if (international && val && val.startsWith("+")) {
			const numberWithoutPlus = val.slice(1)
			const detected = detectCountryFromNumber(numberWithoutPlus)

			if (detected && detected !== country) {
				onCountryChange?.(detected)
			}
		}

		onChange?.(val)
	}

	// When user selects country from dropdown
	const handleCountrySelection = (selectedValues: string[]) => {
		if (disabled || countryCallingCodeEditable === false) return
		const selectedCode = selectedValues[0] as RPNInput.Country
		if (countries.includes(selectedCode)) {
			onCountryChange?.(selectedCode)
		}
	}

	// Wrapper for onCountryChange that respects the locked state
	const handleCountryChangeWrapper = (newCountry: RPNInput.Country | undefined) => {
		if (countryCallingCodeEditable === false) {
			// Completely ignore country changes when locked
			return
		}
		onCountryChange?.(newCountry)
	}

	// Custom input component that applies className only to the actual Input
	const InputWithClass = useMemo(() => {
		const Comp = (props: InputProps) => (
			<Input
				{...props}
				data-slot="phone-input"
				aria-label={label || "Phone number"}
				aria-invalid={hasError}
				size={size}
				disabled={disabled}
				lead={lead}
				trail={trail}
				hasError={hasError}
				className={cn(showTrigger && "rounded-l-none", className, props.className)}
			/>
		)
		Comp.displayName = "PhoneNumber.InputWithClass"
		return Comp
	}, [className, size, showTrigger, disabled, hasError, lead, trail, label])

	const [selectOpen, setSelectOpen] = useState(false)

	// Enhanced country item renderer with better search support
	const renderCountryItem = (countryData: { code: RPNInput.Country; name: string; callingCode: string; searchKeywords: string[] }) => {
		const { code, name, callingCode } = countryData

		return (
			<SelectItem
				key={code}
				value={code} // ISO code as value
				// Pass search keywords to the SelectItem for enhanced search
				keywords={countryData.searchKeywords}
				endContent={`+${callingCode}`}
				startContent={<Flag country={code} />}>
				<span>{name}</span>
			</SelectItem>
		)
	}

	// Generate dynamic search placeholder based on search capabilities
	const getSearchPlaceholder = () => {
		return "Search by country, code, or +1, +44..."
	}

	// Determine if the country selector should be shown and editable
	const shouldShowCountrySelector = showTrigger && countryCallingCodeEditable !== false

	return (
		<div className={cn("text-fg-1 flex flex-col items-start gap-1.5 text-sm", { "cursor-not-allowed": disabled })}>
			{label && (
				<Label htmlFor={id} className={cn({ "text-text-disabled cursor-not-allowed": disabled })}>
					{label}
				</Label>
			)}
			<div className="flex w-full gap-0">
				{showTrigger && (
					<>
						{shouldShowCountrySelector ? (
							// Show full Select with enhanced search capabilities
							<Select
								open={selectOpen}
								onOpenChange={setSelectOpen}
								selectedValues={country ? [country] : []} // ISO code in array
								onSelectedChange={handleCountrySelection}
								selectionMode="single"
								isSearchable={true}
								searchPlaceholder={getSearchPlaceholder()}
								disabled={disabled}
								renderTrigger={() => (
									<Button
										variant="neutral-soft"
										size={size === "0" ? undefined : size}
										disabled={disabled}
										className={cn(
											"disabled:bg-fill-level2 focus-visible:border-primary border-border-alpha focus-visible:border-r-1 flex flex-shrink-0 items-center justify-center gap-1 rounded-r-none border border-r-0 px-2 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
											{ "border-error": hasError && !disabled }
										)}>
										<Flag country={country} />
										<span className="text-text-tertiary">{country ? `+${countryCodeMap.get(country)}` : null}</span>
										{selectOpen ? <ChevronUp className="text-text-disabled size-4" /> : <ChevronDown className="text-text-disabled size-4" />}
									</Button>
								)}>
								{preferredCountriesList.length > 0 && <SelectGroup label="Preferred">{preferredCountriesList.map(renderCountryItem)}</SelectGroup>}
								{regularCountriesList.length > 0 && <SelectGroup label="All Countries">{regularCountriesList.map(renderCountryItem)}</SelectGroup>}
							</Select>
						) : (
							// Show locked flag + code, no chevron, no dropdown
							<Button
								variant="neutral-soft"
								size={size === "0" ? undefined : size}
								disabled={disabled}
								className={cn(
									"disabled:bg-fill-level2 focus-visible:border-primary border-border-alpha focus-visible:border-r-1 flex flex-shrink-0 items-center justify-center gap-1 rounded-r-none border border-r-0 px-2 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
									{ "border-error": hasError && !disabled }
								)}>
								<Flag country={country} />
								<span className="text-text-tertiary">{country ? `+${countryCodeMap.get(country)}` : null}</span>
							</Button>
						)}
					</>
				)}

				<RPNInput.default
					{...rpnInputProps}
					id={id}
					className="flex-1"
					country={country}
					value={value}
					onChange={handlePhoneChange}
					onCountryChange={handleCountryChangeWrapper}
					flagComponent={() => null}
					countrySelectComponent={() => null}
					inputComponent={InputWithClass}
					placeholder="Enter phone number"
					disabled={disabled}
					countries={countries}
					international={international}
					withCountryCallingCode={international}
					countryCallingCodeEditable={countryCallingCodeEditable}
				/>
			</div>
			{(hasError || hint) && <Label className={`flex items-start text-xs font-normal ${hasError ? "text-error" : "text-text-tertiary"}`}>{hint}</Label>}
		</div>
	)
}

const Flag = ({ country }: { country?: RPNInput.Country }) => {
	if (!country) return <PhoneIcon className="text-text-disabled h-5 w-5" />
	const CountryFlag = flags[country]
	return (
		<span className="flex items-center justify-center overflow-hidden rounded-sm [&>svg]:size-5">
			{CountryFlag ? <CountryFlag title={country} /> : <PhoneIcon className="size-5" />}
		</span>
	)
}

PhoneNumber.displayName = "PhoneNumber"

export { PhoneNumber }
