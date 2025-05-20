import { useState } from "react"
import { CodeArea } from "@/registry/ui/code"
import { Divider } from "@/registry/ui/divider"
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

const DividerPreview = () => {
	const [orientation, setOrientation] = useState<"vertical" | "horizontal">("vertical")
	const [spacing, setSpacing] = useState<"2" | "4" | "6" | "8" | "12" | "16" | "24" | "32" | "40">("4")

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent className="min-w-20">
							<DropdownSub>
								<DropdownSubTrigger>Orientation</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => setOrientation(Array.from(keys)[0] as "vertical" | "horizontal")}
										selectedValues={[orientation]}>
										<DropdownItem value="vertical">vertical</DropdownItem>
										<DropdownItem value="horizontal">horizontal</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>Spacing</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => setSpacing(Array.from(keys)[0] as "2" | "4" | "6" | "8" | "12" | "16" | "24" | "32" | "40")}
										minSelectionCount={1}
										selectedValues={[spacing]}>
										<DropdownItem value="2">2</DropdownItem>
										<DropdownItem value="4">4</DropdownItem>
										<DropdownItem value="6">6</DropdownItem>
										<DropdownItem value="8">8</DropdownItem>
										<DropdownItem value="12">12</DropdownItem>
										<DropdownItem value="16">16</DropdownItem>
										<DropdownItem value="24">24</DropdownItem>
										<DropdownItem value="32">32</DropdownItem>
										<DropdownItem value="40">40</DropdownItem>
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
				<div
					className={`flex ${orientation === "horizontal" ? "flex-col" : ""} h-[420px] items-center justify-center overflow-auto rounded-xl border px-10`}>
					<h1 className="heading-4">Heading1</h1>
					<Divider spacing={spacing} orientation={orientation} />
					<h1 className="heading-4">Heading2</h1>
					<Divider spacing={spacing} orientation={orientation} />
					<h1 className="heading-4">Heading3</h1>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={`<div className="${orientation === "horizontal" ? "flex flex-col" : "flex"}" >
<h1 className="heading-4">Heading1</h1>
<Divider spacing="${spacing}" orientation="${orientation}" />
<h1 className="heading-4">Heading2</h1>
<Divider spacing="${spacing}" orientation="${orientation}" />
<h1 className="heading-4">Heading3</h1>
</div>
`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default DividerPreview
