import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { CurrencyInput } from "@/registry/ui/currency-amount"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Label } from "@/registry/ui/label"
import { Select, SelectItem } from "@/registry/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
export type CurrencyOption = "usd" | "eur" | "gbp"

const sizes = ["28", "32", "36", "40", "44", "48"]

const CurrencyPreview = () => {
	const [currency, setCurrency] = useState<CurrencyOption>("usd")
	const [size, setSize] = useState<SizeOptions>("36")

	return (
		<Tabs defaultValue="preview" variant={"outline-ghost"}>
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
						<DropdownSub>
							<DropdownSubTrigger>Size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={size} onValueChange={(value) => setSize(value as SizeOptions)}>
									{sizes.map((size) => (
										<DropdownRadioItem value={size} key={size} onSelect={(e) => e.preventDefault()}>
											{size}
										</DropdownRadioItem>
									))}
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<div className="flex flex-col gap-1.5">
						<Label>Currency Input</Label>
						<div className="flex rounded-md">
							<CurrencyInput
								className="w-80 border-r-0 focus-within:border-r"
								currency={`${currency}`}
								size={size}
								placeholder="0.00"
								custom={true}
								end={null}
								// currency={currency}
								// hint={hasError ? "Hint text to help the user with input" : undefined}
							/>
							<Select
								selectedValues={[currency]}
								onSelectedChange={(values) => setCurrency(values[0] as CurrencyOption)}
								disableOpenStyle={true}
								size={size}
								minSelectionCount={1}
								className="border-alpha focus-visible:border-primary -ms-0 w-fit rounded-l-none border text-center focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
								<SelectItem value="usd">USD</SelectItem>
								<SelectItem value="eur">EUR</SelectItem>
								<SelectItem value="gbp">GBP</SelectItem>
							</Select>
						</div>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="currency-example-preview.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<div className="flex gap-1.5 flex-col">
  <Label>Amount</Label>
  <div className="flex rounded-md shadow-xs">
    <CurrencyInput
	  className="w-80 border-r-0 focus-within:border-r"
      size="${size}"
      placeholder="0.00"
      type="text"
    />
    
    <Select
      selectedValues={["${currency}"]}
      onSelectedChange={(values) => setCurrency(values[0] as CurrencyOption)}
      size="${size}"
      className="-ms-0 w-fit">
      <SelectItem value="usd">USD</SelectItem>
      <SelectItem value="eur">EUR</SelectItem>
      <SelectItem value="gbp">GBP</SelectItem>
    </Select>
  </div>
</div>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default CurrencyPreview
