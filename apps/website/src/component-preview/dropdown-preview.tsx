import React, { useState } from "react"
import { Box, ChevronDown, ChevronUp, EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button, IconButton } from "@/registry/ui/button"
import {
	Dropdown,
	DropdownContent,
	DropdownGroup,
	DropdownItem,
	DropdownRadioGroup,
	DropdownRadioItem,
	DropdownSub,
	DropdownSubContent,
	DropdownSubTrigger,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
export type AlignOptions = "start" | "center" | "end"
export type PlacementOptions = "top" | "bottom" | "left" | "right"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type VariantOptions = "input" | "button"

const alignOptions: AlignOptions[] = ["start", "center", "end"]
const placementOptions: PlacementOptions[] = ["top", "bottom", "left", "right"]

const DropdownPreview = () => {
	const [open, setOpen] = useState<boolean>(false)
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

export const DropdownPreview = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dropdown open={open} onOpenChange={setOpen}>
      <DropdownTrigger asChild>
			<Button color="neutral" variant="outline" end={open ? <ChevronUp /> : <ChevronDown />}>
				Dropdown
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
          <DropdownItem${start ? ` start={<Box />}` : ""}${end ? ` end={<Box />}` : ""} value="1">
            Active
          </DropdownItem>
          <DropdownItem${start ? ` start={<Box />}` : ""}${end ? ` end={<Box />}` : ""} value="2">
            Inactive
          </DropdownItem>
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
								<DropdownRadioGroup value={String(start)} onValueChange={(value) => setStart(value === "true")}>
									<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
										True
									</DropdownRadioItem>
									<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
										False
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>End</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(end)} onValueChange={(value) => setEnd(value === "true")}>
									<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
										True
									</DropdownRadioItem>
									<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
										False
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Placement</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={placement} onValueChange={(value) => setPlacement(value as PlacementOptions)}>
									{placementOptions.map((placementOption) => (
										<DropdownRadioItem value={placementOption} key={placementOption} onSelect={(e) => e.preventDefault()}>
											{placementOption.charAt(0).toUpperCase() + placementOption.slice(1)}
										</DropdownRadioItem>
									))}
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Align</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={align} onValueChange={(value) => setAlign(value as AlignOptions)}>
									{alignOptions.map((alignOption) => (
										<DropdownRadioItem value={alignOption} key={alignOption} onSelect={(e) => e.preventDefault()}>
											{alignOption.charAt(0).toUpperCase() + alignOption.slice(1)}
										</DropdownRadioItem>
									))}
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<Dropdown open={open} onOpenChange={setOpen}>
						<DropdownTrigger asChild>
							<Button color="neutral" variant="outline" end={open ? <ChevronUp /> : <ChevronDown />}>
								Dropdown
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
								<DropdownItem start={start ? <Box /> : null} end={end ? <Box /> : null}>
									Active
								</DropdownItem>
								<DropdownItem start={start ? <Box /> : null} end={end ? <Box /> : null}>
									Inactive
								</DropdownItem>
								<DropdownItem>Lunch</DropdownItem>
								<DropdownItem>Commuting</DropdownItem>
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
