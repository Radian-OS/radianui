import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import ColorPicker from "@/registry/ui/color-picker"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Label } from "@/registry/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type ColorFormatOptions = "HEX" | "HSL" | "OKLCH" | "HSB" | "RGBA"
const roundedOptions = ["xs", "sm", "md", "lg", "xl", "2xl"]
const sizes = ["28", "32", "36", "40", "44", "48"]

export default function ColorPickerExample() {
	const [rounded, setRounded] = useState<RoundedOptions>("lg")
	const [size, setSize] = useState<SizeOptions>("36")
	const [label, setLabel] = useState<boolean>(true)
	const [hint, setHint] = useState<boolean>(false)

	const [inputFormat, setInputFormat] = useState<ColorFormatOptions>("HEX")
	const handleFormatChange = (newFormat: ColorFormatOptions) => {
		setInputFormat(newFormat)
	}
	return (
		<Tabs defaultValue="preview">
			<div className="flex items-center justify-between">
				<TabsList variant="outline-ghost" size="md">
					<TabsTrigger value="preview">
						<EyeIcon />
						Preview
					</TabsTrigger>
					<TabsTrigger value="code">
						<SquareTerminal />
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
						<DropdownSub>
							<DropdownSubTrigger>Label</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(label)} onValueChange={(value) => setLabel(value === "true")}>
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
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<div className="flex flex-col gap-1.5">
						{label && <Label>Select Color</Label>}
						<div className="flex rounded-md">
							<ColorPicker
								hint={hint ? "Hint text to help the user with input" : ""}
								size={size}
								inputFormat={inputFormat}
								onInputFormatChange={handleFormatChange}
								defaultColor="#461EFA"
								className="w-62 rounded-r-none border-r-0 focus-within:border-r"
							/>
							<Select value={inputFormat} onValueChange={(value) => handleFormatChange(value as ColorFormatOptions)}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="HEX">HEX</SelectItem>
									<SelectItem value="HSL">HSL</SelectItem>
									<SelectItem value="OKLCH">OKLCH</SelectItem>
									<SelectItem value="HSB">HSB</SelectItem>
									<SelectItem value="RGBA">RGBA</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="color-picker-example.tsx"
					showLineNumber
					className="h-[420px]"
					code={`export type ColorFormatOptions = "HEX" | "HSL" | "OKLCH" | "HSB" | "RGBA"

const [inputFormat, setInputFormat] = useState<ColorFormatOptions>("HEX")
const handleFormatChange = (newFormat: ColorFormatOptions) => {
	setInputFormat(newFormat)
}

<div className="flex flex-col gap-1.5">
	${label ? "<Label>Select Color</Label>" : ""}
	<div className="flex rounded-md">
		<ColorPicker
			rounded="${rounded}"
			size="${size}"
			inputFormat={inputFormat}
			onInputFormatChange={handleFormatChange}
			className="w-62 rounded-r-none border-r-0 focus-within:border-r"
			${hint ? `hint="Hint text to help the user with input"` : ""}
			defaultColor="#461EFA"
		/>
		<Select
			selectedValues={[inputFormat]}
			onSelectedChange={(values) => handleFormatChange(values[0] as ColorFormatOptions)}
			disableOpenStyle={true}
			size="${size}"
			rounded="${rounded}"
			className="-ms-0 w-fit">
			<SelectItem value="HEX">HEX</SelectItem>
			<SelectItem value="HSL">HSL</SelectItem>
			<SelectItem value="OKLCH">OKLCH</SelectItem>
			<SelectItem value="HSB">HSB</SelectItem>
			<SelectItem value="RGBA">RGBA</SelectItem>
		</Select>
	</div>
</div>
`}
				/>
			</TabsContent>
		</Tabs>
	)
}
