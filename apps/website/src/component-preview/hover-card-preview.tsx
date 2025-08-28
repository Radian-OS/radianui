import React, { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Avatar } from "@/registry/ui/avatar"
import { Button, IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
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
							<DropdownSubTrigger>Side</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={side} onValueChange={(value) => setSide(value as Side)}>
									<DropdownRadioItem value="top" onSelect={(e) => e.preventDefault()}>
										Top
									</DropdownRadioItem>
									<DropdownRadioItem value="right" onSelect={(e) => e.preventDefault()}>
										Right
									</DropdownRadioItem>
									<DropdownRadioItem value="bottom" onSelect={(e) => e.preventDefault()}>
										Bottom
									</DropdownRadioItem>
									<DropdownRadioItem value="left" onSelect={(e) => e.preventDefault()}>
										Left
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						{/* Dropdown for 'align' */}
						<DropdownSub>
							<DropdownSubTrigger>Align</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={align} onValueChange={(value) => setAlign(value as Align)}>
									<DropdownRadioItem value="start" onSelect={(e) => e.preventDefault()}>
										Start
									</DropdownRadioItem>
									<DropdownRadioItem value="center" onSelect={(e) => e.preventDefault()}>
										Center
									</DropdownRadioItem>
									<DropdownRadioItem value="end" onSelect={(e) => e.preventDefault()}>
										End
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>With arrow</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={arrow} onValueChange={(value) => setArrow(value as Arrow)}>
									<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
										True
									</DropdownRadioItem>
									<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
										False
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
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
									<div className="text-fg-secondary">{profile.email}</div>
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
				<CodeSnippet title="hover-card.tsx" showLineNumber className="h-[420px]" code={``} />
			</TabsContent>
		</Tabs>
	)
}

export default HovercardPreview
