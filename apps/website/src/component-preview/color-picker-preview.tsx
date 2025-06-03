import { useState } from "react"
import { CodeArea } from "@/registry/ui/code"
import ColorPicker from "@/registry/ui/color-picker"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

// type Size = "sm" | "lg"
type Variant = "open" | "box" | "table"
// type Interaction = "single" | "multiple"

// const DEFAULT_SIZE: Size = "sm"
const DEFAULT_VARIANT: Variant = "box"
// const DEFAULT_INTERACTION: Interaction = "single"

export default function ColorPickerPreview() {
	const [variant, setVariant] = useState<Variant>(DEFAULT_VARIANT)

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent className="min-w-20">
							<DropdownSub>
								<DropdownSubTrigger>Variant</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setVariant(Array.from(keys)[0] as Variant)} minSelectionCount={1} selectedValues={[variant]}>
										<DropdownItem value="open">Open</DropdownItem>
										<DropdownItem value="box">Box</DropdownItem>
										<DropdownItem value="table">Table</DropdownItem>
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
					<ColorPicker />
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={`

`}
				/>
			</TabsContent>
		</Tabs>
	)
}
