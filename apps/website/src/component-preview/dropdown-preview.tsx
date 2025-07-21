import React, { useState } from "react"
import { Box, ChevronDown, EyeIcon, Settings, SquareTerminal } from "lucide-react"
import { Button } from "@/registry/ui/button"
// import { CodeArea } from "@/registry/ui/code-area"
import { CodeArea } from "@/registry/ui/code-area"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
export type AlignOptions = "start" | "center" | "end"
export type PlacementOptions = "top" | "bottom" | "left" | "right"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type VariantOptions = "input" | "button"

const alignOptions: AlignOptions[] = ["start", "center", "end"]
const placementOptions: PlacementOptions[] = ["top", "bottom", "left", "right"]

const DropdownPreview = () => {
	const [startContent, setStartContent] = useState<boolean>(false)
	const [endContent, setEndContent] = useState<boolean>(false)

	const [align, setAlign] = useState<AlignOptions>("start")
	const [placement, setPlacement] = useState<PlacementOptions>("bottom")

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


return(
<Dropdown>
<DropdownTrigger asChild >
<Button variant="outline" color="neutral" >
Dropdown <ChevronDown className="size-5" />
<Button
	variant="outline">
	Dropdown <ChevronDown className="size-5" />
</Button>
</DropdownTrigger>
<DropdownContent align={align} placement={placement} className="w-48">
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
>
<DropdownItem 
${startContent ? `startContent={<Box />}` : ""}
${endContent ? `endContent={<Box />}` : ""}
value="1">Active</DropdownItem>
<DropdownItem
${startContent ? `startContent={<Box />}` : ""}
${endContent ? `endContent={<Box />}` : ""}
value="2">Inactive</DropdownItem>
<DropdownItem value="3">Lunch</DropdownItem>
<DropdownItem value="4">Commuting</DropdownItem>
</DropdownGroup>
</DropdownContent>
</Dropdown>
)
}`

	return (
		<Tabs defaultValue="preview" variant={"outline-ghost"} size={"md"}>
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
						<Button variant="outline" color="neutral" size="36" iconOnly>
							<Settings />
						</Button>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
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

						<DropdownSub>
							<DropdownSubTrigger>Align</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" selectedValues={[align]} onSelectedChange={(values) => setAlign(values[0] as AlignOptions)}>
									{alignOptions.map((alignOptions) => (
										<DropdownItem value={alignOptions} key={alignOptions}>
											{alignOptions.charAt(0).toUpperCase() + alignOptions.slice(1)}
										</DropdownItem>
									))}
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Placement</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" selectedValues={[placement]} onSelectedChange={(values) => setPlacement(values[0] as PlacementOptions)}>
									{placementOptions.map((placementOptions) => (
										<DropdownItem value={placementOptions} key={placementOptions}>
											{placementOptions.charAt(0).toUpperCase() + placementOptions.slice(1)}
										</DropdownItem>
									))}
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<Dropdown>
						<DropdownTrigger asChild>
							<Button variant="outline">
								Dropdown <ChevronDown className="size-5" />
							</Button>
						</DropdownTrigger>
						<DropdownContent align={align} placement={placement} className="w-48">
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
							<DropdownGroup title="status">
								<DropdownItem startContent={startContent ? <Box /> : null} endContent={endContent ? <Box /> : null} value="1">
									Active
								</DropdownItem>
								<DropdownItem startContent={startContent ? <Box /> : null} endContent={endContent ? <Box /> : null} value="2">
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
