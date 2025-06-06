import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from "react"
import { ChevronDown, ChevronUp, PhoneIcon } from "lucide-react"
import * as RPNInput from "react-phone-number-input"
import { Value, getCountries, getCountryCallingCode, isValidPhoneNumber } from "react-phone-number-input"
import flags from "react-phone-number-input/flags"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Input, InputProps } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Select, SelectGroup, SelectItem } from "@/registry/ui/select"

type PhoneNumberPrimitiveProps = Omit<RPNInput.Props<typeof Input>, "inputComponent" | "displayName"> & {
	size?: InputProps["size"]
	showTrigger?: boolean
	countryDropdown?: boolean
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
	validateOnChange?: boolean
	showValidationIcon?: boolean
	onValidationChange?: (isValid: boolean) => void
}

const PhoneNumber: React.FC<PhoneNumberPrimitiveProps> = ({
	value,
	onChange,
	country,
	onCountryChange,
	size,
	showTrigger = true,
	countryDropdown = true,
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
	countryCallingCodeEditable = international,
	validateOnChange = false,
	showValidationIcon = false,
	onValidationChange,
	...rpnInputProps
}) => {
	const id = useId()
	const allCountries = useMemo(() => getCountries(), [])
	const [isValid, setIsValid] = useState<boolean | null>(null)
	const [selectOpen, setSelectOpen] = useState(false)
	const validationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

	// When international is false, force countryCallingCodeEditable to be false
	const effectiveCountryCallingCodeEditable = international ? countryCallingCodeEditable : false

	// Normalize "US" or "United States" → "US"
	const normalizeCountryIdentifier = useCallback(
		(identifier: string): RPNInput.Country | null => {
			if (allCountries.includes(identifier as RPNInput.Country)) {
				return identifier as RPNInput.Country
			}
			const found = allCountries.find((c) => {
				const regionName = new Intl.DisplayNames(["en"], { type: "region" }).of(c)
				return regionName?.toLowerCase() === identifier.toLowerCase()
			})
			return found || null
		},
		[allCountries]
	)

	// Function to get alternative/common names for countries
	const getAlternativeCountryNames = useCallback((countryCode: string): string[] => {
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
			NL: ["Netherlands", "Holland"],
			BE: ["Belgium"],
			CH: ["Switzerland"],
			AT: ["Austria"],
			SE: ["Sweden"],
			NO: ["Norway"],
			DK: ["Denmark"],
			FI: ["Finland"],
			PT: ["Portugal"],
			GR: ["Greece"],
			TR: ["Turkey"],
			PL: ["Poland"],
			CZ: ["Czech Republic", "Czechia"],
			HU: ["Hungary"],
			RO: ["Romania"],
			BG: ["Bulgaria"],
			HR: ["Croatia"],
			SI: ["Slovenia"],
			SK: ["Slovakia"],
			LT: ["Lithuania"],
			LV: ["Latvia"],
			EE: ["Estonia"],
		}
		return alternatives[countryCode] || []
	}, [])

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
	}, [allCountries, onlyCountries, excludeCountries, normalizeCountryIdentifier])

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
	}, [countries, getAlternativeCountryNames])

	// Separate preferred vs. regular with search data
	const { preferredCountriesList, regularCountriesList } = useMemo(() => {
		if (!preferredCountries || preferredCountries.length === 0) {
			return { preferredCountriesList: [], regularCountriesList: countriesWithSearchData }
		}
		const preferredCodes = preferredCountries.map(normalizeCountryIdentifier).filter(Boolean) as RPNInput.Country[]
		const preferred = countriesWithSearchData.filter((c) => preferredCodes.includes(c.code))
		const regular = countriesWithSearchData.filter((c) => !preferredCodes.includes(c.code))
		return { preferredCountriesList: preferred, regularCountriesList: regular }
	}, [countriesWithSearchData, preferredCountries, normalizeCountryIdentifier])

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
	const detectCountryFromNumber = useCallback(
		(numberWithoutPlus: string): RPNInput.Country | null => {
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
		},
		[countries, countryCodeMap, countryPriority]
	)

	// Validation logic with debouncing
	const validatePhoneNumber = useCallback(
		(phoneValue: Value | undefined) => {
			if (!validateOnChange || !phoneValue) {
				setIsValid(null)
				onValidationChange?.(false)
				return
			}

			// Clear existing timeout
			if (validationTimeoutRef.current) {
				clearTimeout(validationTimeoutRef.current)
			}

			// Debounce validation by 300ms
			validationTimeoutRef.current = setTimeout(() => {
				try {
					const valid = isValidPhoneNumber(phoneValue)
					setIsValid(valid)
					onValidationChange?.(valid)
				} catch {
					setIsValid(false)
					onValidationChange?.(false)
				}
			}, 300)
		},
		[validateOnChange, onValidationChange]
	)

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (validationTimeoutRef.current) {
				clearTimeout(validationTimeoutRef.current)
			}
		}
	}, [])

	const handlePhoneChange = useCallback(
		(val: Value | undefined) => {
			if (disabled) return

			// 🔒 When international is false, completely block "+" and country changes
			if (!international) {
				// Block any input that contains "+"
				if (val && val.includes("+")) {
					// Don't update if trying to add "+"
					return
				}
				// Pass through non-international input
				onChange?.(val)
				validatePhoneNumber(val)
				return
			}

			// 🔒 If country calling code is not editable (but international is true), prevent country changes
			if (!effectiveCountryCallingCodeEditable) {
				// Handle locked mode input restrictions for international mode
				const lockedPrefix = country ? `+${countryCodeMap.get(country)}` : "+"

				if (val === undefined) {
					onChange?.(undefined)
					validatePhoneNumber(undefined)
					return
				}

				if (val === "+") {
					onChange?.("+" as Value)
					validatePhoneNumber("+" as Value)
					return
				}

				if (!val.startsWith(lockedPrefix)) {
					onChange?.(lockedPrefix as Value)
					validatePhoneNumber(lockedPrefix as Value)
					return
				}

				onChange?.(val)
				validatePhoneNumber(val)
				return
			}

			// Only run country detection logic if country calling code is editable AND international
			if (effectiveCountryCallingCodeEditable && international && val && val.startsWith("+")) {
				const numberWithoutPlus = val.slice(1)
				const detected = detectCountryFromNumber(numberWithoutPlus)

				if (detected && detected !== country) {
					onCountryChange?.(detected)
				}
			}

			onChange?.(val)
			validatePhoneNumber(val)
		},
		[disabled, international, effectiveCountryCallingCodeEditable, country, countryCodeMap, onChange, validatePhoneNumber, detectCountryFromNumber, onCountryChange]
	)

	// When user selects country from dropdown - allow manual selection even when countryCallingCodeEditable is false
	const handleCountrySelection = useCallback(
		(selectedValues: string[]) => {
			if (disabled) return
			const selectedCode = selectedValues[0] as RPNInput.Country
			if (countries.includes(selectedCode)) {
				onCountryChange?.(selectedCode)
			}
		},
		[disabled, countries, onCountryChange]
	)

	// Wrapper for onCountryChange - only block automatic detection, allow manual changes
	const handleCountryChangeWrapper = useCallback(
		(newCountry: RPNInput.Country | undefined) => {
			// Allow manual country changes via dropdown, but block automatic detection when effectiveCountryCallingCodeEditable is false
			// This gets called by the RPNInput component for automatic detection, so we block it when locked
			if (!effectiveCountryCallingCodeEditable) {
				return
			}
			onCountryChange?.(newCountry)
		},
		[effectiveCountryCallingCodeEditable, onCountryChange]
	)

	// Custom input component that applies className only to the actual Input
	const InputWithClass = useMemo(() => {
		const Comp = (props: InputProps) => {
			// Determine validation trail icon
			let validationTrail = trail
			if (showValidationIcon && isValid !== null) {
				validationTrail = (
					<div className="flex items-center gap-1">
						{isValid ? <span className="text-success text-sm">✓</span> : <span className="text-error text-sm">✗</span>}
						{trail}
					</div>
				)
			}

			// Add onKeyDown handler to prevent "+" when international is false
			const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
				if (!international && (e.key === "+" || e.key === "Plus")) {
					e.preventDefault()
				}
				props.onKeyDown?.(e)
			}

			// Add onPaste handler to filter out "+" when international is false
			const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
				if (!international) {
					const pasteData = e.clipboardData.getData("text")
					if (pasteData.includes("+")) {
						e.preventDefault()
						// Filter out + from pasted content
						const filteredData = pasteData.replace(/\+/g, "")
						if (filteredData) {
							const target = e.target as HTMLInputElement
							const start = target.selectionStart || 0
							const end = target.selectionEnd || 0
							const currentValue = target.value
							const newValue = currentValue.slice(0, start) + filteredData + currentValue.slice(end)

							// Trigger the change event with filtered data
							const syntheticEvent = {
								target: { ...target, value: newValue },
							} as React.ChangeEvent<HTMLInputElement>
							props.onChange?.(syntheticEvent)
						}
					}
				}
				if (!e.defaultPrevented) {
					props.onPaste?.(e)
				}
			}

			return (
				<Input
					{...props}
					data-slot="phone-input"
					aria-label={label || "Phone number"}
					aria-invalid={hasError || (validateOnChange && isValid === false)}
					size={size}
					disabled={disabled}
					lead={lead}
					trail={validationTrail}
					hasError={hasError || (validateOnChange && isValid === false)}
					className={cn(showTrigger && "rounded-l-none", className, props.className)}
					onKeyDown={handleKeyDown}
					onPaste={handlePaste}
				/>
			)
		}
		Comp.displayName = "PhoneNumber.InputWithClass"
		return Comp
	}, [className, size, showTrigger, disabled, hasError, lead, trail, label, showValidationIcon, isValid, validateOnChange, international])

	// Enhanced country item renderer with better search support
	const renderCountryItem = useCallback((countryData: { code: RPNInput.Country; name: string; callingCode: string; searchKeywords: string[] }) => {
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
	}, [])

	// Generate dynamic search placeholder based on search capabilities
	const getSearchPlaceholder = useCallback(() => {
		return "Search by Country or Code"
	}, [])

	// Custom handler for open/close - allow dropdown to open regardless of countryCallingCodeEditable
	const handleSelectOpenChange = useCallback((open: boolean) => {
		setSelectOpen(open)
	}, [])

	// Determine effective error state
	const effectiveHasError = hasError || (validateOnChange && isValid === false)
	const effectiveHint = validateOnChange && isValid === false && !hint ? "Please enter a valid phone number" : hint

	return (
		<div className={cn("text-fg-1 flex flex-col items-start gap-1.5 text-sm", { "cursor-not-allowed": disabled })}>
			{label && (
				<Label htmlFor={id} className={cn({ "text-text-disabled cursor-not-allowed": disabled })}>
					{label}
				</Label>
			)}
			<div className="flex w-full gap-0">
				{showTrigger && countryDropdown && (
					<Select
						open={selectOpen}
						onOpenChange={handleSelectOpenChange}
						selectedValues={country ? [country] : []} // ISO code in array
						onSelectedChange={handleCountrySelection}
						selectionMode="single"
						isSearchable={true} // Always allow search
						searchPlaceholder={getSearchPlaceholder()}
						disabled={disabled}
						renderTrigger={() => (
							<Button
								variant="neutral-soft"
								size={size === "0" ? undefined : size}
								disabled={disabled}
								className={cn(
									"disabled:bg-fill-level2 focus-visible:border-primary border-border-alpha focus-visible:border-r-1 flex flex-shrink-0 items-center justify-center gap-1 rounded-r-none border border-r-0 px-2 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
									{ "border-error": effectiveHasError && !disabled }
								)}>
								<Flag country={country} />
								{international && <span className="text-text-tertiary">{country ? `+${countryCodeMap.get(country)}` : null}</span>}
								{/* Always show chevron since dropdown is always functional */}
								{selectOpen ? <ChevronUp className="text-text-disabled size-4" /> : <ChevronDown className="text-text-disabled size-4" />}
							</Button>
						)}>
						{preferredCountriesList.length > 0 && <SelectGroup label="Preferred">{preferredCountriesList.map(renderCountryItem)}</SelectGroup>}
						{regularCountriesList.length > 0 && <SelectGroup label="All Countries">{regularCountriesList.map(renderCountryItem)}</SelectGroup>}
					</Select>
				)}
				{showTrigger && !countryDropdown && (
					<Button
						variant="neutral-soft"
						size={size === "0" ? undefined : size}
						disabled={disabled}
						className={cn("disabled:bg-fill-level2 border-border-alpha flex flex-shrink-0 cursor-default items-center justify-center gap-1 rounded-r-none border border-r-0 px-2", {
							"border-error": effectiveHasError && !disabled,
						})}>
						<Flag country={country} />
						{international && <span className="text-text-tertiary">{country ? `+${countryCodeMap.get(country)}` : null}</span>}
						{/* No chevron icon when dropdown is disabled */}
					</Button>
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
					countryCallingCodeEditable={effectiveCountryCallingCodeEditable}
					// Force domestic format when international is false
					defaultCountry={international ? undefined : country}
				/>
			</div>
			{(effectiveHasError || effectiveHint) && (
				<Label className={`flex items-start text-xs font-normal ${effectiveHasError ? "text-error" : "text-text-tertiary"}`}>{effectiveHint}</Label>
			)}
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
