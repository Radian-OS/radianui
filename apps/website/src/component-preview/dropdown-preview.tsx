import React from "react"
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

const DropdownPreview = () => {
	const [mode, setMode] = React.useState<"single" | "multiple">("single")
	const [selected, setSelected] = React.useState<string[]>(["1"])

	const code = `"use client"	
import React from "react"
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
	
export const DropdownPreview=()=>{

const [mode, setMode] = React.useState<"single" | "multiple">("single")
const [selected, setSelected] = React.useState<string[]>(["1"])

return(
<Dropdown>
<DropdownTrigger>Dropdown</DropdownTrigger>
<DropdownContent>
<DropdownGroup title="date range">
<DropdownItem>This week</DropdownItem>
<DropdownItem>This month</DropdownItem>
<DropdownItem>This quarter</DropdownItem>
<DropdownSub>
<DropdownSubTrigger>Last quarter</DropdownSubTrigger>
<DropdownSubContent>
<DropdownItem>Last 1 quarter</DropdownItem>
<DropdownItem>Last 2 quarter</DropdownItem>
</DropdownSubContent>
</DropdownSub>
</DropdownGroup>
<DropdownGroup
title="status"
selectionMode={mode}
onSelectedChange={(keys) => (mode === "single" ? setSelected([keys[0]]) : setSelected(keys))}
selectedValues={selected}>
<DropdownItem value="1">Active</DropdownItem>
<DropdownItem value="2">Inactive</DropdownItem>
<DropdownItem value="3">Lunch</DropdownItem>
<DropdownItem value="4">Commuting</DropdownItem>
</DropdownGroup>
</DropdownContent>
</Dropdown>
)
}`

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent className="min-w-20">
							<DropdownSub>
								<DropdownSubTrigger>Selection Mode</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => setMode(keys[0] as "single" | "multiple")}
										minSelectionCount={1}
										selectedValues={[mode]}>
										<DropdownItem value="single">Single</DropdownItem>
										<DropdownItem value="multiple">Multiple</DropdownItem>
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
					<Dropdown>
						<DropdownTrigger>Dropdown</DropdownTrigger>
						<DropdownContent>
							<DropdownGroup title="date range">
								<DropdownItem>This week</DropdownItem>
								<DropdownItem>This month</DropdownItem>
								<DropdownItem>This quarter</DropdownItem>
								<DropdownSub>
									<DropdownSubTrigger>Last quarter</DropdownSubTrigger>
									<DropdownSubContent>
										<DropdownItem>Last 1 quarter</DropdownItem>
										<DropdownItem>Last 2 quarter</DropdownItem>
									</DropdownSubContent>
								</DropdownSub>
							</DropdownGroup>
							<DropdownGroup
								title="status"
								selectionMode={mode}
								onSelectedChange={(keys) => (mode === "single" ? setSelected([keys[0]]) : setSelected(keys))}
								selectedValues={selected}>
								<DropdownItem value="1">Active</DropdownItem>
								<DropdownItem value="2">Inactive</DropdownItem>
								<DropdownItem value="3">Lunch</DropdownItem>
								<DropdownItem value="4">Commuting</DropdownItem>
							</DropdownGroup>
						</DropdownContent>
					</Dropdown>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea language="tsx" showLineNumbers className="h-[420px]" code={code} />
			</TabsContent>
		</Tabs>
	)
}

export default DropdownPreview
