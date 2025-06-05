import React, { useState } from "react"
import type { Country, Value } from "react-phone-number-input"
import { CodeArea } from "@/registry/ui/code"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { PhoneNumber } from "@/registry/ui/phone-number"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const PhoneNumberPreview = () => {
	type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
	type CountryOptions = "none" | "US" | "CA" | "CN" | "IN" | "DE" | "GB"

	const [size, setSize] = useState<SizeOptions>("36")
	const [disabled, setDisabled] = useState<"true" | "false">("false")
	const [phone, setPhone] = useState<Value | undefined>()
	const [country, setCountry] = useState<CountryOptions>("none")
	const [showTrigger, setShowTrigger] = useState<"true" | "false">("true")
	const [hint, setHint] = useState<"true" | "false">("false")
	const [hasError, setHasError] = useState<"true" | "false">("false")
	const [label, setLabel] = useState<"true" | "false">("true")
	const [international, setInternational] = useState<"true" | "false">("true")
	const [countryDropdown, setCountryDropdown] = useState<"true" | "false">("true")

	// Multiselect states for countries
	const [selectedOnlyCountries, setSelectedOnlyCountries] = useState<string[]>([])
	const [selectedPreferredCountries, setSelectedPreferredCountries] = useState<string[]>([])
	const [selectedExcludeCountries, setSelectedExcludeCountries] = useState<string[]>([])

	const countryOptions = [
		{ value: "none", label: "None (No Default)" },
		{ value: "US", label: "United States" },
		{ value: "CA", label: "Canada" },
		{ value: "CN", label: "China" },
		{ value: "IN", label: "India" },
		{ value: "DE", label: "Germany" },
		{ value: "GB", label: "United Kingdom" },
	]

	// Available countries for multiselect
	const availableCountries = [
		{ code: "US", name: "United States" },
		{ code: "CA", name: "Canada" },
		{ code: "MX", name: "Mexico" },
		{ code: "GB", name: "United Kingdom" },
		{ code: "DE", name: "Germany" },
		{ code: "FR", name: "France" },
		{ code: "IT", name: "Italy" },
		{ code: "ES", name: "Spain" },
		{ code: "IN", name: "India" },
		{ code: "CN", name: "China" },
		{ code: "JP", name: "Japan" },
		{ code: "KR", name: "South Korea" },
		{ code: "SG", name: "Singapore" },
		{ code: "AU", name: "Australia" },
		{ code: "BR", name: "Brazil" },
		{ code: "RU", name: "Russia" },
		{ code: "KP", name: "North Korea" },
		{ code: "IR", name: "Iran" },
		{ code: "SY", name: "Syria" },
		{ code: "NR", name: "Nauru" },
		{ code: "TV", name: "Tuvalu" },
		{ code: "SM", name: "San Marino" },
	]

	const getOnlyCountries = () => {
		return selectedOnlyCountries.length > 0 ? selectedOnlyCountries : undefined
	}

	const getPreferredCountries = () => {
		return selectedPreferredCountries.length > 0 ? selectedPreferredCountries : undefined
	}

	const getExcludeCountries = () => {
		return selectedExcludeCountries.length > 0 ? selectedExcludeCountries : undefined
	}

	const handlePhoneChange = (value: Value | undefined) => {
		setPhone(value)
	}

	const handleCountryChange = (country: Country) => {
		setCountry(country as CountryOptions)
	}

	// Helper for code snippet: include country only if not "none"
	const getCountryCode = () => {
		if (country === "none") return ""
		return `
        country="${country}"`
	}

	// Get the actual country value to pass to PhoneNumber component
	const getCountryValue = (): Country | undefined => {
		return country === "none" ? undefined : (country as Country)
	}

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent className="min-w-20">
							<DropdownGroup title="Input">
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

								<DropdownSub>
									<DropdownSubTrigger>Label</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											minSelectionCount={1}
											selectedValues={[label]}
											onSelectedChange={(keys) => {
												setLabel(Array.from(keys)[0] as "true" | "false")
											}}>
											<DropdownItem value="true">True</DropdownItem>
											<DropdownItem value="false">False</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>
							</DropdownGroup>

							<DropdownGroup title="Phone Number">
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

								{/* Country dropdown (controlled value) */}
								<DropdownSub>
									<DropdownSubTrigger>Country</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											minSelectionCount={1}
											selectedValues={[country]}
											onSelectedChange={(keys) => {
												setCountry(Array.from(keys)[0] as CountryOptions)
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
									<DropdownSubTrigger>Country Dropdown</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											minSelectionCount={1}
											selectedValues={[countryDropdown]}
											onSelectedChange={(keys) => {
												setCountryDropdown(Array.from(keys)[0] as "true" | "false")
											}}>
											<DropdownItem value="true">True</DropdownItem>
											<DropdownItem value="false">False</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>

								<DropdownSub>
									<DropdownSubTrigger>Only Countries {selectedOnlyCountries.length > 0 && `(${selectedOnlyCountries.length})`}</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="multiple"
											selectedValues={selectedOnlyCountries}
											onSelectedChange={(keys) => {
												setSelectedOnlyCountries(Array.from(keys))
											}}>
											{availableCountries.map((country) => (
												<DropdownItem key={country.code} value={country.code}>
													{country.name}
												</DropdownItem>
											))}
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>

								<DropdownSub>
									<DropdownSubTrigger>Preferred Countries {selectedPreferredCountries.length > 0 && `(${selectedPreferredCountries.length})`}</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="multiple"
											selectedValues={selectedPreferredCountries}
											onSelectedChange={(keys) => {
												setSelectedPreferredCountries(Array.from(keys))
											}}>
											{availableCountries.map((country) => (
												<DropdownItem key={country.code} value={country.code}>
													{country.name}
												</DropdownItem>
											))}
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>

								<DropdownSub>
									<DropdownSubTrigger>Exclude Countries {selectedExcludeCountries.length > 0 && `(${selectedExcludeCountries.length})`}</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="multiple"
											selectedValues={selectedExcludeCountries}
											onSelectedChange={(keys) => {
												setSelectedExcludeCountries(Array.from(keys))
											}}>
											{availableCountries.map((country) => (
												<DropdownItem key={country.code} value={country.code}>
													{country.name}
												</DropdownItem>
											))}
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>

								<DropdownSub>
									<DropdownSubTrigger>International</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownGroup
											selectionMode="single"
											minSelectionCount={1}
											selectedValues={[international]}
											onSelectedChange={(keys) => {
												setInternational(Array.from(keys)[0] as "true" | "false")
											}}>
											<DropdownItem value="true">True</DropdownItem>
											<DropdownItem value="false">False</DropdownItem>
										</DropdownGroup>
									</DropdownSubContent>
								</DropdownSub>
							</DropdownGroup>
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
						<PhoneNumber
							countryDropdown={countryDropdown === "true"}
							hasError={hasError === "true"}
							hint={hint === "true" ? "Hint text to help the user with input" : ""}
							label={label === "true" ? "Phone Number" : ""}
							showTrigger={showTrigger === "true"}
							value={phone}
							disabled={disabled === "true"}
							international={international === "true"}
							size={size}
							onChange={handlePhoneChange}
							country={getCountryValue()}
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
import { PhoneNumber } from "@/registry/ui/phone-number"
import type { Country, Value } from "react-phone-number-input"

const PhoneNumberExample = () => {
  const [phone, setPhone] = useState<Value | undefined>()
  const [country, setCountry] = useState<Country | undefined>(${country === "none" ? "undefined" : `"${country}"`})

  const handlePhoneChange = (value: Value | undefined) => {
    setPhone(value)
  }

  const handleCountryChange = (country: Country) => {
    setCountry(country)
  }

  return (
    <div className="flex gap-1.5 flex-col">
      <PhoneNumber
	    countryDropdown={${countryDropdown === "true"}}
        hasError={${hasError === "true"}}
        hint="${hint === "true" ? "Hint text to help the user with input" : ""}"
        value={phone}
        label="${label === "true" ? "Phone Number" : ""}"
        onChange={handlePhoneChange}${getCountryCode()}
        onCountryChange={handleCountryChange}
        size="${size}"
        showTrigger={${showTrigger === "true"}}
        ${disabled === "true" ? `disabled={true}` : ""}
        international={${international === "true"}}
        ${showTrigger === "false" ? `className="w-80"` : ""}
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
