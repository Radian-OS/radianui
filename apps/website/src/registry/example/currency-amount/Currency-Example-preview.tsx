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
// import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Select, SelectItem } from "@/registry/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type CurrencyOption = "usd" | "eur" | "gbp"

const CurrencyPreview = () => {
	const [currency, setCurrency] = useState<CurrencyOption>("usd")
	const [value, setValue] = useState<string>("100")
	const [hasError, setHasError] = useState<boolean>(false)

	const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	return (
		<Tabs defaultValue="preview" className="mb-10 mt-2">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent>
							<DropdownSub>
								<DropdownSubTrigger>HasError</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										selectedValues={[String(hasError)]}
										onSelectedChange={(values) => setHasError(values[0] === "true")}
										minSelectionCount={1}>
										<DropdownItem value="true">true</DropdownItem>
										<DropdownItem value="false">false</DropdownItem>
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
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<div className="*:not-first:mt-2">
						<Label>Currency Input</Label>
						<div className="flex rounded-md">
							<CurrencyInput
								className="w-80"
								size="36"
								placeholder="0.00"
								custom={true}
								trial={null}
								value={value}
								currency={currency}
								onChange={handleValueChange}
								hasError={hasError}
								errorMsg={hasError ? "Invalid amount" : undefined}
							/>
							<Select
								selectedValues={[currency]}
								onSelectedChange={(values) => setCurrency(values[0] as CurrencyOption)}
								disableOpenStyle={true}
								size="36"
								className="-ms-0 w-fit">
								<SelectItem value="usd">USD</SelectItem>
								<SelectItem value="eur">EUR</SelectItem>
								<SelectItem value="gbp">GBP</SelectItem>
							</Select>
						</div>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={`<div className="*:not-first:mt-2">
  <Label>Amount</Label>
  <div className="flex rounded-md shadow-xs">
    <CurrencyInput
      size="36"
      placeholder="0.00"
      type="text"
      value="${value}"
      onChange={(e) => setValue(e.target.value)}
      ${hasError ? 'hasError={true}\n      errorMsg="Invalid amount"' : ""}
    />
    
    <Select
      selectedValues={["${currency}"]}
      onSelectedChange={(values) => setCurrency(values[0] as CurrencyOption)}
      size="36"
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
