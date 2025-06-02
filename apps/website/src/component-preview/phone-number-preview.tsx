import React, { useState } from "react"
import type { Country, Value } from "react-phone-number-input"
import { CodeArea } from "@/registry/ui/code"
import {
	Dropdown,
	DropdownContent,
	DropdownGroup,
	DropdownItem,
	DropdownSub,
	DropdownSubContent,
	DropdownSubTrigger,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import { Label } from "@/registry/ui/label"
import { PhoneNumber } from "@/registry/ui/phone-number"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const PhoneNumberPreview = () => {
	type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
	type CountryOptions = "US" | "GB" | "IN" | "CA" | "AU" | "DE" | "FR" | "JP" | "BR"

	const [size, setSize] = useState<SizeOptions>("36")
	const [disabled, setDisabled] = useState<"true" | "false">("false")
	const [phone, setPhone] = useState<Value | undefined>()
	const [country, setCountry] = useState<Country>("US")
	const [showTrigger, setShowTrigger] = useState<"true" | "false">("true")
	const [flagsOnly, setFlagsOnly] = useState<"true" | "false">("false")
	const [defaultCountry, setDefaultCountry] = useState<CountryOptions>("US")

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

	const handlePhoneChange = (value: Value | undefined) => {
		setPhone(value)
	}

	const handleCountryChange = (country: Country) => {
		setCountry(country)
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
						<Label>Phone Number</Label>
						<PhoneNumber
							defaultCountry="US"
							flagsOnly={flagsOnly === "true"}
							showTrigger={showTrigger === "true"}
							value={phone}
							disabled={disabled === "true"}
							size={size}
							onChange={handlePhoneChange}
							country={country}
							onCountryChange={handleCountryChange}
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
      <Label>Phone Number</Label>
      <PhoneNumber
        value={phone}
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
				}${
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
