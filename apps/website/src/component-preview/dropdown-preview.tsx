import React, { useState } from "react"
import { Box, ChevronDown } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code"
import {
	Dropdown,
	DropdownContent,
	DropdownDivider,
	DropdownGroup,
	DropdownItem,
	DropdownSub,
	DropdownSubContent,
	DropdownSubTrigger,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type VariantOptions = "input" | "button"
const sizes = ["28", "32", "36", "40", "44", "48"]

const DropdownPreview = () => {
	const [mode, setMode] = useState<"single" | "multiple">("single")
	const [selected, setSelected] = useState<string[]>(["1"])
	const [startContent, setStartContent] = useState<boolean>(false)
	const [endContent, setEndContent] = useState<boolean>(false)

	const [size, setSize] = useState<SizeOptions>("36")
	const [disabled, setDisabled] = useState(false)
	const [leadIcon, setLeadIcon] = useState<boolean>(false)
	const getLeadTrialClass = () => {
		if (leadIcon && (size === "36" || size === "32" || size === "40")) {
			return "size-5"
		}
		if (leadIcon && size === "28") {
			return "size-4"
		}
		if (leadIcon && (size === "44" || size === "48")) {
			return "size-6"
		}
		return ""
	}

	const iconClass = getLeadTrialClass()

	const code = `"use client"	
import React from "react"
import { ChevronDown } from "lucide-react"
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
import { Button } from "@/registry/ui/button"
	
export const DropdownPreview=()=>{

const [mode, setMode] = useState<"single" | "multiple">("single")
const [selected, setSelected] = useState<string[]>(["1"])

return(
<Dropdown>
<DropdownTrigger asChild >
<Button variant="neutral-outline" >
Dropdown <ChevronDown className="size-5" />
<Button
	size="${size}"
	${leadIcon ? `lead={<Box className="${iconClass}" />}` : ""}
	disabled={${disabled}}
	variant="neutral-outline">
	Dropdown <ChevronDown className="size-5" />
</Button>
</DropdownTrigger>
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
<DropdownItem 
${startContent ? `startContent={<Box className="${iconClass}" />}` : ""}
${endContent ? `endContent={<Box className="${iconClass}" />}` : ""}
value="1">Active</DropdownItem>
<DropdownItem
${startContent ? `startContent={<Box className="${iconClass}" />}` : ""}
${endContent ? `endContent={<Box className="${iconClass}" />}` : ""}
value="2">Inactive</DropdownItem>
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
							<DropdownSub>
								<DropdownSubTrigger>Size</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										selectedValues={[size]}
										onSelectedChange={(values) => setSize(values[0] as SizeOptions)}
										minSelectionCount={1}>
										{sizes.map((size) => (
											<DropdownItem value={size} key={size}>
												{size}
											</DropdownItem>
										))}
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Disabled</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										selectedValues={[String(disabled)]}
										onSelectedChange={(values) => setDisabled(values[0] === "true")}
										minSelectionCount={1}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Lead</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										selectedValues={[String(leadIcon)]}
										onSelectedChange={(values) => setLeadIcon(values[0] === "true")}
										minSelectionCount={1}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Start Content</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										selectedValues={[String(startContent)]}
										onSelectedChange={(values) => setStartContent(values[0] === "true")}
										minSelectionCount={1}>
										<DropdownItem value="true">True</DropdownItem>
										<DropdownItem value="false">False</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>End Content</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										selectedValues={[String(endContent)]}
										onSelectedChange={(values) => setEndContent(values[0] === "true")}
										minSelectionCount={1}>
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
					<Dropdown>
						<DropdownTrigger asChild>
							<Button size={size} lead={leadIcon ? <Box className={iconClass} /> : null} disabled={disabled} variant="neutral-outline">
								Dropdown <ChevronDown className="size-5" />
							</Button>
						</DropdownTrigger>
						<DropdownContent className="w-48">
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
							<DropdownDivider />
							<DropdownGroup
								title="status"
								selectionMode={mode}
								onSelectedChange={(keys) => (mode === "single" ? setSelected([keys[0]]) : setSelected(keys))}
								selectedValues={selected}>
								<DropdownItem
									startContent={startContent ? <Box className={iconClass} /> : null}
									endContent={endContent ? <Box className={iconClass} /> : null}
									value="1">
									Active
								</DropdownItem>
								<DropdownItem
									startContent={startContent ? <Box className={iconClass} /> : null}
									endContent={endContent ? <Box className={iconClass} /> : null}
									value="2">
									Inactive
								</DropdownItem>
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
