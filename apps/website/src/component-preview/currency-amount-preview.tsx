"use client"

import { useState } from "react"
import { CodeArea } from "@/registry/ui/code"
import { CurrencyInput } from "@/registry/ui/currency"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const CurrencyInputPreview = () => {
	type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
	type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
	const roundedOptions = ["xs", "sm", "md", "lg", "xl", "2xl"]

	const [currency, setCurrency] = useState("usd")
	const [locale, setLocale] = useState("en-US")
	const [value, setValue] = useState("100")
	const [disabled, setDisabled] = useState("false")
	const [rounded, setRounded] = useState<RoundedOptions>("lg")
	const [size, setSize] = useState<SizeOptions>("36")
	const [hasError, setHasError] = useState<"true" | "false">("false")
	const [label, setLabel] = useState<"true" | "false">("true")
	const [allowDecimals, setAllowDecimals] = useState<"true" | "false">("true")
	const [decimalsLimit, setDecimalsLimit] = useState("2")
	const [maxValue, setMaxValue] = useState("")
	const [hint, setHint] = useState<boolean>(false)

	// Handle numeric value change
	const handleValueChange = (numValue: number | null) => {
		if (numValue !== null) {
			setValue(numValue.toString())
		} else {
			setValue("")
		}
	}

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent className="min-w-20">
							<DropdownSub>
								<DropdownSubTrigger>Rounded</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										selectedValues={[rounded]}
										onSelectedChange={(values) => setRounded(values[0] as RoundedOptions)}
										minSelectionCount={1}>
										{roundedOptions.map((roundedOption) => (
											<DropdownItem value={roundedOption} key={roundedOption}>
												{roundedOption}
											</DropdownItem>
										))}
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Currency</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setCurrency(Array.from(keys)[0])
										}}
										minSelectionCount={1}
										selectedValues={[currency]}>
										<DropdownItem value="usd">USD</DropdownItem>
										<DropdownItem value="eur">EUR</DropdownItem>
										<DropdownItem value="gbp">GBP</DropdownItem>
										<DropdownItem value="jpy">JPY</DropdownItem>
										<DropdownItem value="inr">INR</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Locale</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setLocale(Array.from(keys)[0])
										}}
										minSelectionCount={1}
										selectedValues={[locale]}>
										<DropdownItem value="en-US">English (US)</DropdownItem>
										<DropdownItem value="en-GB">English (UK)</DropdownItem>
										<DropdownItem value="fr-FR">French</DropdownItem>
										<DropdownItem value="de-DE">German</DropdownItem>
										<DropdownItem value="es-ES">Spanish</DropdownItem>
										<DropdownItem value="ja-JP">Japanese</DropdownItem>
										<DropdownItem value="zh-CN">Chinese</DropdownItem>
										<DropdownItem value="hi-IN">Hindi</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
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
								<DropdownSubTrigger>Hint</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										selectedValues={[String(hint)]}
										onSelectedChange={(values) => setHint(values[0] === "true")}
										minSelectionCount={1}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>HasError</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setHasError(Array.from(keys)[0] as "true" | "false")
										}}
										minSelectionCount={1}
										selectedValues={[hasError]}>
										<DropdownItem value="true">true</DropdownItem>
										<DropdownItem value="false">false</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Label</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setLabel(Array.from(keys)[0] as "true" | "false")
										}}
										selectedValues={[label]}>
										<DropdownItem value="true">true</DropdownItem>
										<DropdownItem value="false">false</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Allow Decimals</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setAllowDecimals(Array.from(keys)[0] as "true" | "false")
										}}
										selectedValues={[allowDecimals]}>
										<DropdownItem value="true">true</DropdownItem>
										<DropdownItem value="false">false</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Decimals Limit</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setDecimalsLimit(Array.from(keys)[0])
										}}
										selectedValues={[decimalsLimit]}>
										<DropdownItem value="0">0</DropdownItem>
										<DropdownItem value="1">1</DropdownItem>
										<DropdownItem value="2">2</DropdownItem>
										<DropdownItem value="3">3</DropdownItem>
										<DropdownItem value="4">4</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Max Value</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setMaxValue(Array.from(keys)[0])
										}}
										selectedValues={[maxValue]}>
										<DropdownItem value="">None</DropdownItem>
										<DropdownItem value="100">100</DropdownItem>
										<DropdownItem value="1000">1,000</DropdownItem>
										<DropdownItem value="10000">10,000</DropdownItem>
										<DropdownItem value="100000">100,000</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Disabled</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setDisabled(Array.from(keys)[0])
										}}
										minSelectionCount={1}
										selectedValues={[disabled]}>
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
					<div className="flex items-center justify-center">
						<CurrencyInput
							rounded={rounded}
							size={size}
							label={label === "true" ? "Currency Input" : ""}
							currency={currency}
							locale={locale}
							value={value}
							hint={hint ? "Currency Field" : ""}
							placeholder="Enter amount"
							disabled={disabled === "true"}
							onChange={(e) => setValue(e.target.value)}
							onValueChange={handleValueChange}
							className="w-80"
							hasError={hasError === "true"}
							allowDecimals={allowDecimals === "true"}
							decimalsLimit={parseInt(decimalsLimit)}
							maxValue={maxValue ? parseInt(maxValue) : undefined}
						/>
					</div>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={`<CurrencyInput
  rounded="${rounded}"
  size="${size}"
  label="${label === "true" ? "Currency Input" : ""}"
  currency="${currency}"
  ${hint === true ? `hint="Currency Field"` : ""}
  locale="${locale}"
  value="${value}"
  placeholder="Enter amount"
  disabled={${disabled === "true"}}
  onChange={(e) => setValue(e.target.value)}
  onValueChange={(numValue) => numValue !== null ? setValue(numValue.toString()) : setValue("")}
  className="w-80"
  hasError={${hasError === "true"}}
  allowDecimals={${allowDecimals === "true"}}
  decimalsLimit={${decimalsLimit}}${maxValue ? `\n  maxValue={${maxValue}}` : ""}
/>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default CurrencyInputPreview
