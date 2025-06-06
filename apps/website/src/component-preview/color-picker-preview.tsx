import { useState } from "react"
import { CodeArea } from "@/registry/ui/code"
import ColorPicker from "@/registry/ui/color-picker"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
// import { Label } from "@/registry/ui/label"
// import { Select, SelectItem } from "@/registry/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type ColorFormatOptions = "HEX" | "HSL" | "OKLCH" | "HSB" | "RGBA"
const roundedOptions = ["xs", "sm", "md", "lg", "xl", "2xl"]
const sizes = ["28", "32", "36", "40", "44", "48"]

export default function ColorPickerPreview() {
	const [rounded, setRounded] = useState<RoundedOptions>("lg")
	const [size, setSize] = useState<SizeOptions>("36")
	const [disabled, setDisabled] = useState<boolean>(false)
	const [hasError, setHasError] = useState<boolean>(false)
	const [label, setLabel] = useState<boolean>(true)
	const [hint, setHint] = useState<boolean>(false)

	// const [inputFormat, setInputFormat] = useState<ColorFormatOptions>("HEX")
	// const handleFormatChange = (newFormat: ColorFormatOptions) => {
	// 	setInputFormat(newFormat)
	// }
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
								<DropdownSubTrigger>Size</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" selectedValues={[size]} onSelectedChange={(values) => setSize(values[0] as SizeOptions)} minSelectionCount={1}>
										{sizes.map((size) => (
											<DropdownItem value={size} key={size}>
												{size}
											</DropdownItem>
										))}
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Label</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" selectedValues={[String(label)]} onSelectedChange={(values) => setLabel(values[0] === "true")} minSelectionCount={1}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Disabled</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" selectedValues={[String(disabled)]} onSelectedChange={(values) => setDisabled(values[0] === "true")} minSelectionCount={1}>
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
							<DropdownSub>
								<DropdownSubTrigger>Has error</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" selectedValues={[String(hasError)]} onSelectedChange={(values) => setHasError(values[0] === "true")} minSelectionCount={1}>
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
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<ColorPicker
						rounded={rounded}
						hasError={hasError}
						hint={hint ? "Hint text to help the user with input" : ""}
						size={size}
						className="w-74"
						disabled={disabled}
						label={label ? "Select Color" : undefined}
					/>

					{/* <div className="flex flex-col gap-1.5">
						<Label>Select Color</Label>
						<div className="flex rounded-md">
							<ColorPicker inputFormat={inputFormat} onInputFormatChange={handleFormatChange} className="w-74 rounded-r-none border-r-0 focus-within:border-r" size={size} />
							<Select
								selectedValues={[inputFormat]}
								onSelectedChange={(values) => handleFormatChange(values[0] as ColorFormatOptions)}
								disableOpenStyle={true}
								size={size}
								className="-ms-0 w-fit">
								<SelectItem value="HEX">HEX</SelectItem>
								<SelectItem value="HSL">HSL</SelectItem>
								<SelectItem value="OKLCH">OKLCH</SelectItem>
								<SelectItem value="HSB">HSB</SelectItem>
								<SelectItem value="RGBA">RGBA</SelectItem>
							</Select>
						</div>
					</div> */}
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={`<ColorPicker
	rounded="${rounded}"
	hasError={${hasError}}
	size="${size}"
	disabled={${disabled}}
    label="${label ? "Select Color" : ""}"
	${hint ? `hint="Hint text to help the user with input"` : ""}
/>
`}
				/>
			</TabsContent>
		</Tabs>
	)
}
