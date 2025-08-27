import React, { useState } from "react"

import { Box, ChevronDown, EyeIcon, Settings, SquareTerminal } from "lucide-react"

import CodeSnippet from "@/components/code-snippet"
import { Button, IconButton } from "@/registry/ui/button"
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
	const [start, setStart] = useState<boolean>(false)
	const [end, setEnd] = useState<boolean>(false)

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
${start ? `start={<Box />}` : ""}
${end ? `end={<Box />}` : ""}
value="1">Active</DropdownItem>
<DropdownItem
${start ? `start={<Box />}` : ""}
${end ? `end={<Box />}` : ""}
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
						<IconButton variant="outline" color="neutral" size="36">
							<Settings />
						</IconButton>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
						<DropdownSub>
							<DropdownSubTrigger>Start</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" selectedValues={[String(start)]} onSelectedChange={(values) => setStart(values[0] === "true")} minSelectionCount={1}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>End</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" selectedValues={[String(end)]} onSelectedChange={(values) => setEnd(values[0] === "true")} minSelectionCount={1}>
									<DropdownItem value="true">True</DropdownItem>
									<DropdownItem value="false">False</DropdownItem>
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
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<Dropdown>
						<DropdownTrigger asChild>
							<Button color="neutral" variant="outline">
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
								<DropdownItem start={start ? <Box /> : null} end={end ? <Box /> : null} value="1">
									Active
								</DropdownItem>
								<DropdownItem start={start ? <Box /> : null} end={end ? <Box /> : null} value="2">
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
				<CodeSnippet title="dropdown.tsx" showLineNumber className="h-[420px]" code={code} />
			</TabsContent>
		</Tabs>
	)
}

export default DropdownPreview
