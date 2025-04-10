import { useState } from "react"
import { Avatar } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type Side = "top" | "bottom" | "left" | "right"
type Align = "center" | "end" | "start"

const profile = {
	name: "Aurthur Dominic",
	avatar: "https://randomuser.me/api/portraits/men/80.jpg",
	email: "dominic@radianos.com",
}

const PopoverPreview = () => {
	const [side, setSide] = useState<Side>("bottom")
	const [align, setAlign] = useState<Align>("center")

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
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => setSide(Array.from(keys)[0] as Side)}
										minSelectionCount={1}
										selectedValues={[side]}>
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
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => setAlign(Array.from(keys)[0] as Align)}
										minSelectionCount={1}
										selectedValues={[align]}>
										<DropdownItem value="start">Start</DropdownItem>
										<DropdownItem value="center">Center</DropdownItem>
										<DropdownItem value="end">End</DropdownItem>
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
					<Popover side={side} align={align}>
						<PopoverTrigger asChild>
							<Button variant={"neutral-outline"}>{profile.name}</Button>
						</PopoverTrigger>
						<PopoverContent className="flex w-fit flex-col gap-3">
							<div className="flex flex-col gap-2">
								<div className="text-sm font-medium">Contact Details</div>
								<Divider className="-mx-4 w-[calc(100%)+0.125rem]" />
							</div>
							<div className="flex items-center gap-3">
								<Avatar name="Aurther Dominic" src={profile.avatar} />
								<div className="flex flex-col text-sm">
									<div className="font-medium">{profile.name}</div>
									<div className="text-fg1">{profile.email}</div>
								</div>
							</div>
							<div className="flex gap-3">
								<Button variant="neutral-outline">Send Message</Button>
								<Button>Contact</Button>
							</div>
						</PopoverContent>
					</Popover>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea language="tsx" showLineNumbers className="h-[420px]" code={``} />
			</TabsContent>
		</Tabs>
	)
}

export default PopoverPreview
