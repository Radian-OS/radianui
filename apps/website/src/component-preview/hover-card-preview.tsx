import React, { useState } from "react"
import { Avatar } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code-area"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/ui/hover-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type Side = "top" | "bottom" | "left" | "right"
type Align = "center" | "end" | "start"
type Arrow = "true" | "false"

const profile = {
	name: "Aurthur Dominic",
	avatar: "https://randomuser.me/api/portraits/men/80.jpg",
	email: "dominic@radianos.com",
}

const HovercardPreview = () => {
	const [side, setSide] = useState<Side>("bottom")
	const [align, setAlign] = useState<Align>("center")
	const [arrow, setArrow] = useState<Arrow>("false")

	const withArrow = arrow === "true"

	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent className="min-w-20">
							<DropdownSub>
								<DropdownSubTrigger>Side</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setSide(Array.from(keys)[0] as Side)} minSelectionCount={1} selectedValues={[side]}>
										<DropdownItem value="top">Top</DropdownItem>
										<DropdownItem value="right">Right</DropdownItem>
										<DropdownItem value="bottom">Bottom</DropdownItem>
										<DropdownItem value="left">Left</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							{/* Dropdown for 'align' */}
							<DropdownSub>
								<DropdownSubTrigger>Align</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setAlign(Array.from(keys)[0] as Align)} minSelectionCount={1} selectedValues={[align]}>
										<DropdownItem value="start">Start</DropdownItem>
										<DropdownItem value="center">Center</DropdownItem>
										<DropdownItem value="end">End</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							<DropdownSub>
								<DropdownSubTrigger>With arrow</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setArrow(Array.from(keys)[0] as Arrow)} minSelectionCount={1} selectedValues={[arrow]}>
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
					<HoverCard side={side} align={align} withArrow={withArrow}>
						<HoverCardTrigger asChild>
							<Button variant={"ghost"}>Hover Me</Button>
						</HoverCardTrigger>
						<HoverCardContent className="flex w-fit flex-col gap-3">
							<div className="flex items-center gap-3">
								<Avatar name="Aurther Dominic" src={profile.avatar} />
								<div className="flex flex-col text-sm">
									<div className="font-medium">{profile.name}</div>
									<div className="text-text-secondary">{profile.email}</div>
								</div>
							</div>
							<div className="flex gap-3">
								<Button variant="outline">Send Message</Button>
								<Button>Contact</Button>
							</div>
						</HoverCardContent>
					</HoverCard>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea language="tsx" showLineNumbers className="h-[420px]" code={``} />
			</TabsContent>
		</Tabs>
	)
}

export default HovercardPreview
