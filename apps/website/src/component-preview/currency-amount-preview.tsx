"use client"

import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { CurrencyInput } from "@/registry/ui/currency-amount"
import {
	Dropdown,
	DropdownContent,
	DropdownGroup,
	DropdownRadioGroup,
	DropdownRadioItem,
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
						<IconButton variant="outline" color="neutral" size="36">
							<Settings />
						</IconButton>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
						<DropdownGroup title="Input">
							<DropdownSub>
								<DropdownSubTrigger>Label</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={label} onValueChange={(value) => setLabel(value as "true" | "false")}>
										<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
											True
										</DropdownRadioItem>
										<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
											False
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Placeholder</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={placeholder} onValueChange={(value) => setPlaceholder(value as "true" | "false")}>
										<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
											True
										</DropdownRadioItem>
										<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
											False
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Size</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={size} onValueChange={(value) => setSize(value as SizeOptions)}>
										<DropdownRadioItem value="28" onSelect={(e) => e.preventDefault()}>
											28
										</DropdownRadioItem>
										<DropdownRadioItem value="32" onSelect={(e) => e.preventDefault()}>
											32
										</DropdownRadioItem>
										<DropdownRadioItem value="36" onSelect={(e) => e.preventDefault()}>
											36
										</DropdownRadioItem>
										<DropdownRadioItem value="40" onSelect={(e) => e.preventDefault()}>
											40
										</DropdownRadioItem>
										<DropdownRadioItem value="44" onSelect={(e) => e.preventDefault()}>
											44
										</DropdownRadioItem>
										<DropdownRadioItem value="48" onSelect={(e) => e.preventDefault()}>
											48
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Rounded</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={rounded} onValueChange={(value) => setRounded(value as RoundedOptions)}>
										{roundedOptions.map((roundedOption) => (
											<DropdownRadioItem value={roundedOption} key={roundedOption} onSelect={(e) => e.preventDefault()}>
												{roundedOption}
											</DropdownRadioItem>
										))}
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Disabled</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={disabled} onValueChange={(value) => setDisabled(value)}>
										<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
											True
										</DropdownRadioItem>
										<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
											False
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Has error</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={hasError} onValueChange={(value) => setHasError(value as "true" | "false")}>
										<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
											True
										</DropdownRadioItem>
										<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
											False
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Hint</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={String(hint)} onValueChange={(value) => setHint(value === "true")}>
										<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
											True
										</DropdownRadioItem>
										<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
											False
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>
						</DropdownGroup>

						<DropdownGroup title="Currency">
							<DropdownSub>
								<DropdownSubTrigger>Currency</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={currency} onValueChange={(value) => setCurrency(value)}>
										<DropdownRadioItem value="usd" onSelect={(e) => e.preventDefault()}>
											USD
										</DropdownRadioItem>
										<DropdownRadioItem value="eur" onSelect={(e) => e.preventDefault()}>
											EUR
										</DropdownRadioItem>
										<DropdownRadioItem value="gbp" onSelect={(e) => e.preventDefault()}>
											GBP
										</DropdownRadioItem>
										<DropdownRadioItem value="jpy" onSelect={(e) => e.preventDefault()}>
											JPY
										</DropdownRadioItem>
										<DropdownRadioItem value="inr" onSelect={(e) => e.preventDefault()}>
											INR
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Separator</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={separator} onValueChange={(value) => setSeparator(value)}>
										<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
											True
										</DropdownRadioItem>
										<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
											False
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Locale</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={locale} onValueChange={(value) => setLocale(value)}>
										<DropdownRadioItem value="de-DE" onSelect={(e) => e.preventDefault()}>
											German (DE)
										</DropdownRadioItem>
										<DropdownRadioItem value="en-US" onSelect={(e) => e.preventDefault()}>
											English (US)
										</DropdownRadioItem>
										<DropdownRadioItem value="en-GB" onSelect={(e) => e.preventDefault()}>
											English (UK)
										</DropdownRadioItem>
										<DropdownRadioItem value="ja-JP" onSelect={(e) => e.preventDefault()}>
											Japanese
										</DropdownRadioItem>
										<DropdownRadioItem value="en-IN" onSelect={(e) => e.preventDefault()}>
											English (India)
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Decimals</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={decimals} onValueChange={(value) => setDecimals(value)}>
										<DropdownRadioItem value="0" onSelect={(e) => e.preventDefault()}>
											0 (No decimals)
										</DropdownRadioItem>
										<DropdownRadioItem value="1" onSelect={(e) => e.preventDefault()}>
											1
										</DropdownRadioItem>
										<DropdownRadioItem value="2" onSelect={(e) => e.preventDefault()}>
											2
										</DropdownRadioItem>
										<DropdownRadioItem value="3" onSelect={(e) => e.preventDefault()}>
											3
										</DropdownRadioItem>
										<DropdownRadioItem value="4" onSelect={(e) => e.preventDefault()}>
											4
										</DropdownRadioItem>
									</DropdownRadioGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Max value</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownRadioGroup value={maxValue} onValueChange={(value) => setMaxValue(value)}>
										<DropdownRadioItem value="" onSelect={(e) => e.preventDefault()}>
											None
										</DropdownRadioItem>
										<DropdownRadioItem value="100" onSelect={(e) => e.preventDefault()}>
											100
										</DropdownRadioItem>
										<DropdownRadioItem value="1000" onSelect={(e) => e.preventDefault()}>
											1,000
										</DropdownRadioItem>
										<DropdownRadioItem value="10000" onSelect={(e) => e.preventDefault()}>
											10,000
										</DropdownRadioItem>
										<DropdownRadioItem value="100000" onSelect={(e) => e.preventDefault()}>
											100,000
										</DropdownRadioItem>
									</DropdownRadioGroup>
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
				<CodeSnippet
					title="currency-input.tsx"
					showLineNumber
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
