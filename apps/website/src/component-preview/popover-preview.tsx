import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Avatar } from "@/registry/ui/avatar"
import { Button, IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type Side = "top" | "bottom" | "left" | "right"
type Align = "center" | "end" | "start"

const DEFAULT_SIDE: Side = "bottom"
const DEFAULT_ALIGN: Align = "center"

const profile = {
	name: "Aurthur Dominic",
	avatar: "https://randomuser.me/api/portraits/men/80.jpg",
	email: "dominic@radianos.com",
}

const PopoverPreview = () => {
	const [side, setSide] = useState<Side>(DEFAULT_SIDE)
	const [align, setAlign] = useState<Align>(DEFAULT_ALIGN)

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
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<Popover>
						<PopoverTrigger asChild>
							<Button color="neutral" variant={"outline"}>
								{profile.name}
							</Button>
						</PopoverTrigger>
						<PopoverContent side={side} align={align} className="flex w-fit flex-col gap-3">
							<div className="flex flex-col gap-2">
								<div className="text-sm font-medium">Contact Details</div>
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
				<CodeSnippet
					title="popover.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Popover>
	<PopoverTrigger asChild>
		<Button color="neutral" variant={"outline"}>
			{profile.name}
		</Button>
	</PopoverTrigger>
	<PopoverContent ${side !== DEFAULT_SIDE ? ` side="${side}"` : ""} ${align !== DEFAULT_ALIGN ? ` align="${align}"` : ""} className="flex w-fit flex-col gap-3">
		<div className="flex flex-col gap-2">
			<div className="text-sm font-medium">Contact Details</div>
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
</Popover>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default PopoverPreview
