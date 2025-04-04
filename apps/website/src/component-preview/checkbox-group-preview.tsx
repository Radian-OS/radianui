import React, { useState } from "react"
import { Checkbox, CheckboxGroup } from "@/registry/ui/checkbox"
import { CodeArea } from "@/registry/ui/code"
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

type Size = "sm" | "md" | "lg"

const CheckboxPreview = () => {
	const [size, setSize] = useState<Size>("sm")

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent className="min-w-20">
							<DropdownSub>
								<DropdownSubTrigger>Size</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => setSize(Array.from(keys)[0] as Size)}
										minSelectionCount={1}
										selectedValues={[size]}>
										<DropdownItem value="sm">sm</DropdownItem>
										<DropdownItem value="md">md</DropdownItem>
										<DropdownItem value="lg">lg</DropdownItem>
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
					<CheckboxGroup size={size} label="Select Options">
						<Checkbox value="1">Option 1</Checkbox>
						<Checkbox value="2">Option 2</Checkbox>
						<Checkbox value="3">Option 3</Checkbox>
						<Checkbox value="4" disabled>
							Option 4 (Disabled)
						</Checkbox>
					</CheckboxGroup>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={`<CheckboxGroup size="${size}" label="Select Options">
	<Checkbox value="1">Option 1</Checkbox>
	<Checkbox value="2">Option 2</Checkbox>
	<Checkbox value="3">Option 3</Checkbox>
	<Checkbox value="4" disabled>
		Option 4 (Disabled)
	</Checkbox>
</CheckboxGroup>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default CheckboxPreview
