import React, { useState } from "react"
import type { Country, Value } from "react-phone-number-input"
import { CodeArea } from "@/registry/ui/code"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { PhoneNumber } from "@/registry/ui/phone-number"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const PhoneNumberPreview = () => {
	type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
	type CountryOptions = "US" | "GB" | "IN" | "CA" | "AU" | "DE" | "FR" | "JP" | "BR"
	type OnlyCountriesOptions = "all" | "north-america" | "europe" | "asia" | "custom"
	type PreferredCountriesOptions = "none" | "us-ca" | "major-english" | "eu-major" | "custom"
	type ExcludeCountriesOptions = "none" | "sanctioned" | "small-islands" | "custom"

	const [size, setSize] = useState<SizeOptions>("36")
	const [disabled, setDisabled] = useState<"true" | "false">("false")
	const [phone, setPhone] = useState<Value | undefined>()
	const [country, setCountry] = useState<Country>("US")
	const [showTrigger, setShowTrigger] = useState<"true" | "false">("true")
	const [flagsOnly, setFlagsOnly] = useState<"true" | "false">("false")
	const [defaultCountry, setDefaultCountry] = useState<CountryOptions>("US")
	const [onlyCountriesOption, setOnlyCountriesOption] = useState<OnlyCountriesOptions>("all")
	const [preferredCountriesOption, setPreferredCountriesOption] = useState<PreferredCountriesOptions>("none")
	const [excludeCountriesOption, setExcludeCountriesOption] = useState<ExcludeCountriesOptions>("none")
	const [hint, setHint] = useState<"true" | "false">("false")
	const [hasError, setHasError] = useState<"true" | "false">("false")

	const countryOptions = [
		{ value: "US", label: "United States" },
		{ value: "GB", label: "United Kingdom" },
		{ value: "IN", label: "India" },
		{ value: "CA", label: "Canada" },
		{ value: "AU", label: "Australia" },
		{ value: "DE", label: "Germany" },
		{ value: "FR", label: "France" },
		{ value: "JP", label: "Japan" },
		{ value: "BR", label: "Brazil" },
	]

	const onlyCountriesOptions = [
		{ value: "all", label: "All Countries", countries: undefined },
		{ value: "north-america", label: "North America", countries: ["United States", "Canada", "Mexico"] },
		{ value: "europe", label: "Europe", countries: ["United Kingdom", "Germany", "France", "Italy", "Spain"] },
		{ value: "asia", label: "Asia", countries: ["India", "China", "Japan", "South Korea", "Singapore"] },
		{ value: "custom", label: "Custom (US, CA, GB)", countries: ["US", "CA", "GB"] },
	]

	const preferredCountriesOptions = [
		{ value: "none", label: "None", countries: undefined },
		{ value: "us-ca", label: "US & Canada", countries: ["United States", "Canada"] },
		{ value: "major-english", label: "Major English Speaking", countries: ["United States", "United Kingdom", "Canada", "Australia"] },
		{ value: "eu-major", label: "Major EU Countries", countries: ["Germany", "France", "Italy", "Spain"] },
		{ value: "custom", label: "Custom (US, GB)", countries: ["US", "GB"] },
	]

	const excludeCountriesOptions = [
		{ value: "none", label: "None", countries: undefined },
		{ value: "sanctioned", label: "Sanctioned Countries", countries: ["North Korea", "Iran", "Syria"] },
		{ value: "small-islands", label: "Small Island Nations", countries: ["Nauru", "Tuvalu", "San Marino"] },
		{ value: "custom", label: "Custom (exclude CN, RU)", countries: ["China", "Russia"] },
	]

	const getOnlyCountries = () => {
		const option = onlyCountriesOptions.find((opt) => opt.value === onlyCountriesOption)
		return option?.countries
	}

	const getPreferredCountries = () => {
		const option = preferredCountriesOptions.find((opt) => opt.value === preferredCountriesOption)
		return option?.countries
	}

	const getExcludeCountries = () => {
		const option = excludeCountriesOptions.find((opt) => opt.value === excludeCountriesOption)
		return option?.countries
	}

	const handlePhoneChange = (value: Value | undefined) => {
		setPhone(value)
	}

	const handleCountryChange = (country: Country) => {
		setCountry(country)
	}

	const getOnlyCountriesCode = () => {
		const countries = getOnlyCountries()
		if (!countries) return ""
		return `
        onlyCountries={${JSON.stringify(countries)}}`
	}

	const getPreferredCountriesCode = () => {
		const countries = getPreferredCountries()
		if (!countries) return ""
		return `
        preferredCountries={${JSON.stringify(countries)}}`
	}

	const getExcludeCountriesCode = () => {
		const countries = getExcludeCountries()
		if (!countries) return ""
		return `
        excludeCountries={${JSON.stringify(countries)}}`
	}

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent className="min-w-20">
							<DropdownSub>
								<DropdownSubTrigger>Size</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setSize(Array.from(keys)[0] as SizeOptions)
										}}
										minSelectionCount={1}
										selectedValues={[size]}>
										<DropdownItem value="28">28</DropdownItem>
										<DropdownItem value="32">32</DropdownItem>
										<DropdownItem value="36">36</DropdownItem>
										<DropdownItem value="40">40</DropdownItem>
										<DropdownItem value="44">44</DropdownItem>
										<DropdownItem value="48">48</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Show Trigger</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										minSelectionCount={1}
										selectedValues={[showTrigger]}
										onSelectedChange={(keys) => {
											setShowTrigger(Array.from(keys)[0] as "true" | "false")
										}}>
										<DropdownItem value="true">true</DropdownItem>
										<DropdownItem value="false">false</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Flags Only</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										minSelectionCount={1}
										selectedValues={[flagsOnly]}
										onSelectedChange={(keys) => {
											setFlagsOnly(Array.from(keys)[0] as "true" | "false")
										}}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Country</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										minSelectionCount={1}
										selectedValues={[defaultCountry]}
										onSelectedChange={(keys) => {
											const newCountry = Array.from(keys)[0] as CountryOptions
											setDefaultCountry(newCountry)
											setCountry(newCountry as Country)
										}}>
										{countryOptions.map((option) => (
											<DropdownItem key={option.value} value={option.value}>
												{option.label}
											</DropdownItem>
										))}
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Only Countries</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										minSelectionCount={1}
										selectedValues={[onlyCountriesOption]}
										onSelectedChange={(keys) => {
											setOnlyCountriesOption(Array.from(keys)[0] as OnlyCountriesOptions)
										}}>
										{onlyCountriesOptions.map((option) => (
											<DropdownItem key={option.value} value={option.value}>
												{option.label}
											</DropdownItem>
										))}
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Preferred Countries</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										minSelectionCount={1}
										selectedValues={[preferredCountriesOption]}
										onSelectedChange={(keys) => {
											setPreferredCountriesOption(Array.from(keys)[0] as PreferredCountriesOptions)
										}}>
										{preferredCountriesOptions.map((option) => (
											<DropdownItem key={option.value} value={option.value}>
												{option.label}
											</DropdownItem>
										))}
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Exclude Countries</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										minSelectionCount={1}
										selectedValues={[excludeCountriesOption]}
										onSelectedChange={(keys) => {
											setExcludeCountriesOption(Array.from(keys)[0] as ExcludeCountriesOptions)
										}}>
										{excludeCountriesOptions.map((option) => (
											<DropdownItem key={option.value} value={option.value}>
												{option.label}
											</DropdownItem>
										))}
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Disabled</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										minSelectionCount={1}
										selectedValues={[disabled]}
										onSelectedChange={(keys) => {
											setDisabled(Array.from(keys)[0] as "true" | "false")
										}}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Hint</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										minSelectionCount={1}
										selectedValues={[hint]}
										onSelectedChange={(keys) => {
											setHint(Array.from(keys)[0] as "true" | "false")
										}}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>hasError</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										minSelectionCount={1}
										selectedValues={[hasError]}
										onSelectedChange={(keys) => {
											setHasError(Array.from(keys)[0] as "true" | "false")
										}}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
						</DropdownContent>
					</Dropdown>
				</div>
				<TabsList>
					<TabsTrigger value="preview">Preview</TabsTrigger>
					<TabsTrigger value="code">Code</TabsTrigger>
				</TabsList>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center rounded-xl border p-10">
					<div className="flex flex-col gap-1.5">
						{/* <Label>Phone Number</Label> */}
						<PhoneNumber
							hasError={hasError === "true"}
							hint={hint === "true" ? "Hint text to help the user with input" : ""}
							flagsOnly={flagsOnly === "true"}
							label="Phone Number"
							showTrigger={showTrigger === "true"}
							value={phone}
							disabled={disabled === "true"}
							size={size}
							onChange={handlePhoneChange}
							country={country}
							onCountryChange={handleCountryChange}
							onlyCountries={getOnlyCountries()}
							preferredCountries={getPreferredCountries()}
							excludeCountries={getExcludeCountries()}
							className={showTrigger === "false" ? "w-80" : ""}
						/>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea
					className="h-[420px]"
					language="tsx"
					code={`import React, { useState } from "react"
import { Label } from "@/registry/ui/label"
import { PhoneNumber } from "@/registry/ui/phone-number"
import type { Country, Value } from "react-phone-number-input"

const PhoneNumberExample = () => {
  const [phone, setPhone] = useState<Value | undefined>()
  const [country, setCountry] = useState<Country>("${country}")

  const handlePhoneChange = (value: Value | undefined) => {
    setPhone(value)
  }

  const handleCountryChange = (country: Country) => {
    setCountry(country)
  }

  return (
    <div className="flex gap-1.5 flex-col">
      <PhoneNumber
        hasError={${hasError === "true"}}
        hint="${hint === "true" ? "Hint text to help the user with input" : ""}"
        value={phone}
        label="Phone Number"
        onChange={handlePhoneChange}
        country={country}
        onCountryChange={handleCountryChange}
        size="${size}"
        showTrigger={${showTrigger === "true"}}${
					disabled === "true"
						? `
        disabled={true}`
						: ""
				}${
					flagsOnly === "true"
						? `
        flagsOnly={true}`
						: ""
				}${getOnlyCountriesCode()}${getPreferredCountriesCode()}${getExcludeCountriesCode()}${
					showTrigger === "false"
						? `
        className="w-80"`
						: ""
				}
      />
    </div>
  )
}

export default PhoneNumberExample`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default PhoneNumberPreview
