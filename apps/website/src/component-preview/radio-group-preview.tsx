import { useState } from "react"
import { CodeArea } from "@/registry/ui/code-area"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radiogroup"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type Size = "sm" | "md" | "lg"

const DEFAULT_SIZE: Size = "md"

const RadiogroupPreview = () => {
	const [size, setSize] = useState<Size>(DEFAULT_SIZE)

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
									<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setSize(Array.from(keys)[0] as Size)} minSelectionCount={1} selectedValues={[size]}>
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
					<RadioGroup {...(size !== DEFAULT_SIZE && { size: size })} defaultValue="1" label="Notify me about...">
						<RadioGroupItem value="1">All new messages</RadioGroupItem>
						<RadioGroupItem value="2">Direct messages and mentions</RadioGroupItem>
						<RadioGroupItem value="3">Nothing</RadioGroupItem>
					</RadioGroup>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={`<RadioGroup ${size !== DEFAULT_SIZE ? `size="${size}"` : ``} defaultValue="1" label="Notify me about...">
	<RadioGroupItem value="1">All new messages</RadioGroupItem>
	<RadioGroupItem value="2">Direct messages and mentions</RadioGroupItem>
	<RadioGroupItem value="3">Nothing</RadioGroupItem>
</RadioGroup>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default RadiogroupPreview
