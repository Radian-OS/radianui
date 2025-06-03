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

	/** NEW: show input in international mode (“+<code>”) */
	international?: boolean
	/**
	 * NEW: when `international={true}`, if `countryCallingCodeEditable={false}`
	 * then the “+<code>” is read-only (user cannot delete those digits).
	 */
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
	// New props
	label,
	hint,
	hasError = false,
	lead,
	trail,
	/** NEW (default false) */
	international = false,
	/** NEW (default false) */
	countryCallingCodeEditable = false,
	...rpnInputProps
}) => {
	const id = useId()
	const allCountries = useMemo(() => getCountries(), [])

	// Helper: convert “US” or “United States” → country code “US”
	const normalizeCountryIdentifier = (identifier: string): RPNInput.Country | null => {
		if (allCountries.includes(identifier as RPNInput.Country)) {
			return identifier as RPNInput.Country
		}
		const found = allCountries.find((c) => {
			const regionName = new Intl.DisplayNames(["en"], {
				type: "region",
			}).of(c)
			return regionName?.toLowerCase() === identifier.toLowerCase()
		})
		return found || null
	}

	// Filter based on only/exclude lists:
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

	// Split out preferred vs. regular:
	const { preferredCountriesList, regularCountriesList } = useMemo(() => {
		if (!preferredCountries || preferredCountries.length === 0) {
			return { preferredCountriesList: [], regularCountriesList: countries }
		}
		const preferredCodes = preferredCountries.map(normalizeCountryIdentifier).filter(Boolean) as RPNInput.Country[]
		const preferred = countries.filter((c) => preferredCodes.includes(c))
		const regular = countries.filter((c) => !preferredCodes.includes(c))
		return { preferredCountriesList: preferred, regularCountriesList: regular }
	}, [countries, preferredCountries])

	// Map from regionName → country code:
	const countryNameToCode = useMemo(() => {
		const map = new Map<string, RPNInput.Country>()
		countries.forEach((c) => {
			const regionName = new Intl.DisplayNames(["en"], { type: "region" }).of(c) || c
			map.set(regionName.toLowerCase(), c)
		})
		return map
	}, [countries])

	// Priority for shared calling codes:
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

		// If we're in international mode but prefix must remain locked:
		if (international && countryCallingCodeEditable === false) {
			// Compute the “locked” prefix for the current country (e.g. "+1" if country="US")
			const lockedPrefix = country ? `+${getCountryCallingCode(country)}` : "+"

			// 1) If the user completely cleared → allow undefined
			if (val === undefined) {
				onChange?.(undefined)
				return
			}

			// 2) If they backspaced such that the new val no longer starts with lockedPrefix:
			if (!val.startsWith(lockedPrefix)) {
				// Force it back to exactly the full prefix
				onChange?.(lockedPrefix as Value)
				return
			}
		}

		// From here on, either:
		// • international===false, or
		// • countryCallingCodeEditable===true, or
		// • prefix has remained intact
		if (val) {
			onChange?.(val)

			// If they typed "+" + digits, auto‐detect which country code fits:
			if (val.startsWith("+")) {
				const numberWithoutPlus = val.slice(1)
				// Sort by longest calling‐code first so we match e.g. "977" before "9"
				const sortedCountries = [...countries].sort((a, b) => getCountryCallingCode(b).length - getCountryCallingCode(a).length)

				const matchingCountries = sortedCountries.filter((c) => {
					const code = getCountryCallingCode(c)
					return numberWithoutPlus.startsWith(code)
				})

				if (matchingCountries.length > 0) {
					let selected = matchingCountries[0]
					const firstMatchCode = getCountryCallingCode(matchingCountries[0])
					const prio = countryPriority[firstMatchCode]
					if (prio) {
						const p = prio.find((x) => matchingCountries.includes(x as RPNInput.Country))
						if (p) selected = p as RPNInput.Country
					}
					if (selected && selected !== country) {
						onCountryChange?.(selected)
					}
				}
			}
			return
		}

		// If val === "+": treat it as “prefix only” → snap back to full lockedPrefix
		if (val === "+") {
			if (international && countryCallingCodeEditable === false) {
				const lockedPrefix = country ? `+${getCountryCallingCode(country)}` : "+"
				onChange?.(lockedPrefix as Value)
				return
			}
			// otherwise (editable prefix case), allow the lone "+" and do nothing
			onChange?.("+" as Value)
			return
		}

		// Finally: val is undefined → clear everything
		onChange?.(undefined)
	}

	// User selects from dropdown (by name or code string):
	const handleCountrySelection = (selectedValues: string[]) => {
		if (disabled) return
		const v = selectedValues[0]
		if (countries.includes(v as RPNInput.Country)) {
			onCountryChange?.(v as RPNInput.Country)
		} else {
			const code = countryNameToCode.get(v.toLowerCase())
			if (code) onCountryChange?.(code)
		}
	}

	const InputWithClass = useMemo(() => {
		const Comp = (props: InputProps) => (
			<Input
				{...props}
				data-slot="phone-input"
				size={size}
				disabled={disabled}
				hasError={hasError}
				lead={lead}
				trail={trail}
				className={cn(showTrigger && "rounded-l-none", className, props.className)}
			/>
		)
		Comp.displayName = "PhoneNumber.InputWithClass"
		return Comp
	}, [className, size, showTrigger, disabled, hasError, lead, trail])

	const selectedCountryName = country ? new Intl.DisplayNames(["en"], { type: "region" }).of(country) || country : ""
	const [selectOpen, setSelectOpen] = useState(false)

	const renderCountryItem = (c: RPNInput.Country) => {
		const regionName = new Intl.DisplayNames(["en"], { type: "region" }).of(c) || c
		return (
			<SelectItem endContent={`+${getCountryCallingCode(c)}`} startContent={<Flag country={c} />} key={c} value={regionName}>
				<span>{regionName}</span>
			</SelectItem>
		)
	}

	return (
		<div className={cn("text-fg-1 flex flex-col items-start gap-1.5 text-sm", { "cursor-not-allowed": disabled })}>
			{label && (
				<Label htmlFor={id} className={cn({ "text-text-disabled cursor-not-allowed": disabled })}>
					{label}
				</Label>
			)}
			<div className="flex w-full gap-0">
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
								variant="neutral-soft"
								size={size === "0" ? undefined : size}
								disabled={disabled}
								className={cn(
									"disabled:bg-fill-level2 focus-visible:border-primary border-border-alpha focus-visible:border-r-1 flex flex-shrink-0 items-center justify-center gap-1 rounded-r-none border border-r-0 px-2 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
									{ "border-error": hasError && !disabled }
								)}>
								<Flag country={country} />
								<span className="text-text-tertiary">{country ? countryCallingCodeEditable && `+${getCountryCallingCode(country)}` : null}</span>
								{selectOpen ? <ChevronUp className="text-text-disabled size-4" /> : <ChevronDown className="text-text-disabled size-4" />}
							</Button>
						)}>
						{preferredCountriesList.length > 0 && <SelectGroup>{preferredCountriesList.map(renderCountryItem)}</SelectGroup>}
						{regularCountriesList.length > 0 && <SelectGroup>{regularCountriesList.map(renderCountryItem)}</SelectGroup>}
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
					countries={countries}
					/** NEW: pass down international/withCountryCallingCode so “+<code>” shows */
					international={international}
					withCountryCallingCode={international}
					/** NEW: lock prefix if false */
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
			{CountryFlag ? <CountryFlag title={country} /> : <ChevronDown className="size-5" />}
		</span>
	)
}

PhoneNumber.displayName = "PhoneNumber"

export { PhoneNumber }
