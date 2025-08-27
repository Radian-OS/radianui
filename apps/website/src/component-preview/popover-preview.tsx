import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Avatar } from "@/registry/ui/avatar"
import { Button, IconButton } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
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
	const [align, setAlign] = useState<Align>("start")

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
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<Popover side={side} align={align}>
						<PopoverTrigger asChild>
							<Button color="neutral" variant={"outline"}>
								{profile.name}
							</Button>
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
									<div className="text-fg-secondary">{profile.email}</div>
								</div>
							</div>
							<div className="flex gap-3">
								<Button variant="outline">Send Message</Button>
								<Button>Contact</Button>
							</div>
						</PopoverContent>
					</Popover>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet title="popover.tsx" showLineNumber className="h-[420px]" code={``} />
			</TabsContent>
		</Tabs>
	)
}

export default PopoverPreview
