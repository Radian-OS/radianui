import { useState } from "react"
import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import ColorPicker from "@/registry/ui/color-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type ColorFormatOptions = "HEX" | "HSL" | "OKLCH" | "HSB" | "RGBA"

export default function ColorPickerExample() {
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
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<div className="flex flex-col gap-1.5">
						<div className="flex rounded-md">
							<ColorPicker
								size="36"
								inputFormat={inputFormat}
								onInputFormatChange={handleFormatChange}
								defaultColor="#461EFA"
								className="w-fit rounded-r-none border-r-0 focus-within:border-r"
							/>
							<Select value={inputFormat} onValueChange={(value) => handleFormatChange(value as ColorFormatOptions)}>
								<SelectTrigger className="w-fit rounded-l-none">
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
	<div className="flex rounded-md">
		<ColorPicker
			inputFormat={inputFormat}
			onInputFormatChange={handleFormatChange}
			className="w-62 rounded-r-none border-r-0 focus-within:border-r"
			defaultColor="#461EFA"
		/>
		<Select value={inputFormat} onValueChange={(value) => handleFormatChange(value as ColorFormatOptions)}>
			<SelectTrigger className="w-fit rounded-l-none">
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
`}
				/>
			</TabsContent>
		</Tabs>
	)
}
