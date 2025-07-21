"use client"

import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import { Button } from "@/registry/ui/button"
// import { CodeArea } from "@/registry/ui/code-area"
import { CodeArea } from "@/registry/ui/code-area"
import { CurrencyInput } from "@/registry/ui/currency"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const CurrencyInputPreview = () => {
	type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
	type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
	const roundedOptions = ["xs", "sm", "md", "lg", "xl", "2xl"]

	const [separator, setSeparator] = useState<string>("true")
	const [currency, setCurrency] = useState("usd")
	const [locale, setLocale] = useState("en-US")
	const [disabled, setDisabled] = useState("false")
	const [rounded, setRounded] = useState<RoundedOptions>("lg")
	const [size, setSize] = useState<SizeOptions>("36")
	const [hasError, setHasError] = useState<"true" | "false">("false")
	const [label, setLabel] = useState<"true" | "false">("true")
	const [decimals, setDecimals] = useState("2")
	const [maxValue, setMaxValue] = useState("")
	const [hint, setHint] = useState<boolean>(false)
	const [placeholder, setPlaceholder] = useState<"true" | "false">("true")

	return (
		<Tabs defaultValue="preview" variant={"outline-ghost"} size={"md"}>
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="preview" icon={<EyeIcon />}>
						Preview
					</TabsTrigger>
					<TabsTrigger value="code" icon={<SquareTerminal />}>
						Code
					</TabsTrigger>
				</TabsList>
				<Dropdown>
					<DropdownTrigger asChild>
						<Button variant="outline" color="neutral" size="36" iconOnly>
							<Settings />
						</Button>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
						<DropdownGroup title="Input">
							<DropdownSub>
								<DropdownSubTrigger>Label</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setLabel(Array.from(keys)[0] as "true" | "false")
										}}
										selectedValues={[label]}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Placeholder</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setPlaceholder(Array.from(keys)[0] as "true" | "false")
										}}
										minSelectionCount={1}
										selectedValues={[placeholder]}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
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
								<DropdownSubTrigger>Rounded</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" selectedValues={[rounded]} onSelectedChange={(values) => setRounded(values[0] as RoundedOptions)} minSelectionCount={1}>
										{roundedOptions.map((roundedOption) => (
											<DropdownItem value={roundedOption} key={roundedOption}>
												{roundedOption}
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

							<DropdownSub>
								<DropdownSubTrigger>Has error</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setHasError(Array.from(keys)[0] as "true" | "false")
										}}
										minSelectionCount={1}
										selectedValues={[hasError]}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Hint</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" selectedValues={[String(hint)]} onSelectedChange={(values) => setHint(values[0] === "true")} minSelectionCount={1}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
						</DropdownGroup>

						<DropdownGroup title="Currency">
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
								<DropdownSubTrigger>Separator</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setSeparator(Array.from(keys)[0])
										}}
										minSelectionCount={1}
										selectedValues={[separator]}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
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
										<DropdownItem value="de-DE">German (DE)</DropdownItem>
										<DropdownItem value="en-US">English (US)</DropdownItem>
										<DropdownItem value="en-GB">English (UK)</DropdownItem>
										<DropdownItem value="ja-JP">Japanese</DropdownItem>
										<DropdownItem value="en-IN">English (India)</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Decimals</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setDecimals(Array.from(keys)[0])
										}}
										selectedValues={[decimals]}>
										<DropdownItem value="0">0 (No decimals)</DropdownItem>
										<DropdownItem value="1">1</DropdownItem>
										<DropdownItem value="2">2</DropdownItem>
										<DropdownItem value="3">3</DropdownItem>
										<DropdownItem value="4">4</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Max value</DropdownSubTrigger>
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
						</DropdownGroup>
					</DropdownContent>
				</Dropdown>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center rounded-xl border p-10">
					<div className="flex items-center justify-center">
						<CurrencyInput
							separator={separator === "true" ? true : false}
							rounded={rounded}
							size={size}
							label={label === "true" ? "Currency Input" : ""}
							currency={currency}
							locale={locale}
							hint={hint ? "Hint text to help the user with input" : ""}
							placeholder={placeholder === "true" ? "Enter amount" : ""}
							disabled={disabled === "true"}
							className="w-80"
							hasError={hasError === "true"}
							decimals={parseInt(decimals)}
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
  ${hint === true ? `hint="Hint text to help the user with input"` : ""}
  locale="${locale}"
  ${placeholder === "true" ? `placeholder="Enter amount"` : ""}
  disabled={${disabled === "true"}}
  className="w-80"
  hasError={${hasError === "true"}}
  decimals={${decimals}}${maxValue ? `\n  maxValue={${maxValue}}` : ""}
/>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default CurrencyInputPreview
