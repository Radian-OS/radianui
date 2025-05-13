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
	const [value, setValue] = useState("100")
	const [placeholder, setPlaceholder] = useState("Enter amount")
	const [disabled, setDisabled] = useState("false")
	const [rounded, setRounded] = useState<RoundedOptions>("lg")
	const [size, setSize] = useState<SizeOptions>("36")
	const [hasError, setHasError] = useState<"true" | "false">("false")

	const [label, setLabel] = useState<"true" | "false">("true")

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
											// setKey((k) => k + 1)
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
								<DropdownSubTrigger>Size</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setSize(Array.from(keys)[0] as SizeOptions)
											// setKey((k) => k + 1)
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
								<DropdownSubTrigger>HasError</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setHasError(Array.from(keys)[0] as "true" | "false")
											// setKey((k) => k + 1)
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
								<DropdownSubTrigger>Value</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setValue(Array.from(keys)[0])
											// setKey((k) => k + 1)
										}}
										minSelectionCount={1}
										selectedValues={[value]}>
										<DropdownItem value="100">$100</DropdownItem>
										<DropdownItem value="1000">$1,000</DropdownItem>
										<DropdownItem value="10000">$10,000</DropdownItem>
										<DropdownItem value="">Empty</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Placeholder</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setPlaceholder(Array.from(keys)[0])
											// setKey((k) => k + 1)
										}}
										minSelectionCount={1}
										selectedValues={[placeholder]}>
										<DropdownItem value="Enter amount">Enter amount</DropdownItem>
										<DropdownItem value="0.00">0.00</DropdownItem>
										<DropdownItem value="Payment amount">Payment amount</DropdownItem>
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
											// setKey((k) => k + 1)
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
					{/* <div className="w-full max-w-sm"> */}
					<CurrencyInput
						rounded={rounded}
						size={size}
						label={label === "true" ? "Currency Input" : ""}
						currency={currency}
						value={value}
						placeholder={placeholder}
						disabled={disabled === "true"}
						onChange={(e) => setValue(e.target.value)}
						className="w-80"
						hasError={hasError === "true"}
					/>
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
value="${value}"
placeholder="${placeholder}"
disabled={${disabled === "true"}}
onChange={(e) => setValue(e.target.value)}
className="w-80"
hasError={${hasError === "true"}}
/>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default CurrencyInputPreview
