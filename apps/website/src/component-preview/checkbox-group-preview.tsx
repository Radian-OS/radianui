import React, { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Checkbox, CheckboxGroup } from "@/registry/ui/checkbox"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type Size = "sm" | "md" | "lg"

const DEFAULT_SIZE: Size = "md"

const CheckboxPreview = () => {
	const [size, setSize] = useState<Size>(DEFAULT_SIZE)

	return (
		<Tabs className="mt-3" defaultValue="preview" variant={"outline-ghost"} size={"md"}>
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
								<DropdownRadioGroup value={size} onValueChange={(value) => setSize(value as Size)}>
									<DropdownRadioItem value="sm" onSelect={(e) => e.preventDefault()}>
										sm
									</DropdownRadioItem>
									<DropdownRadioItem value="md" onSelect={(e) => e.preventDefault()}>
										md
									</DropdownRadioItem>
									<DropdownRadioItem value="lg" onSelect={(e) => e.preventDefault()}>
										lg
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<CheckboxGroup {...(size !== DEFAULT_SIZE && { size: size })} label="Select Options">
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
				<CodeSnippet
					title="checkbox-group.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<CheckboxGroup ${size !== DEFAULT_SIZE ? `size="${size}"` : ""} label="Select Options">
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
