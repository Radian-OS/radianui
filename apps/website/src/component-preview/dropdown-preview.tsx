import React, { useState } from "react"
import {
	ChevronDown,
	ChevronUp,
	Clock,
	CreditCard,
	EyeIcon,
	Headset,
	LogOut,
	MessageCircleMore,
	Settings,
	SquareTerminal,
	UserPlus,
	UserRound,
	Users,
	UsersRound,
} from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button, IconButton } from "@/registry/ui/button"
import {
	Dropdown,
	DropdownContent,
	DropdownDivider,
	DropdownItem,
	DropdownLabel,
	DropdownRadioGroup,
	DropdownRadioItem,
	DropdownShortcut,
	DropdownSub,
	DropdownSubContent,
	DropdownSubTrigger,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const alignOptions = ["start", "center", "end"] as const
type AlignOptions = (typeof alignOptions)[number]

const placementOptions = ["top", "bottom", "left", "right"] as const
type PlacementOptions = (typeof placementOptions)[number]

export default function DropdownPreview() {
	const [open, setOpen] = useState<boolean>(false)
	const [align, setAlign] = useState<AlignOptions>("start")
	const [placement, setPlacement] = useState<PlacementOptions>("bottom")

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
						<DropdownContent align={align} placement={placement} className="w-80">
							<DropdownLabel>My Account</DropdownLabel>
							<DropdownItem>
								<UserRound />
								View Profile
								<DropdownShortcut>⌘+P</DropdownShortcut>
							</DropdownItem>
							<DropdownItem>
								<Settings />
								Settings
								<DropdownShortcut>⌘+G</DropdownShortcut>
							</DropdownItem>
							<DropdownItem>
								<CreditCard />
								Subscription
								<DropdownShortcut>⌘+D</DropdownShortcut>
							</DropdownItem>
							<DropdownDivider />
							<DropdownItem>
								<Clock />
								Changelog
								<DropdownShortcut>⌘+F</DropdownShortcut>
							</DropdownItem>
							<DropdownSub>
								<DropdownSubTrigger>
									<Users />
									Invite Member
								</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownItem>
										<UsersRound />
										Invite All
									</DropdownItem>
									<DropdownItem>
										<UserPlus />
										Invite Selected
									</DropdownItem>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownDivider />
							<DropdownItem>
								<Headset />
								Support
								<DropdownShortcut>⌘+Z</DropdownShortcut>
							</DropdownItem>
							<DropdownItem>
								<MessageCircleMore />
								Community
								<DropdownShortcut>⌘+R</DropdownShortcut>
							</DropdownItem>
							<DropdownDivider />
							<DropdownItem>
								<LogOut />
								Sign Out
							</DropdownItem>
						</DropdownContent>
					</Dropdown>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="dropdown.tsx"
					showLineNumber
					className="h-[420px]"
					code={`
import React, { useState } from "react"
import {
	ChevronDown,
	ChevronUp,
	Clock,
	CreditCard,
	EyeIcon,
	Headset,
	LogOut,
	MessageCircleMore,
	Settings,
	SquareTerminal,
	UserPlus,
	UserRound,
	Users,
	UsersRound,
} from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Button, IconButton } from "@/registry/ui/button"
import {
	Dropdown,
	DropdownContent,
	DropdownDivider,
	DropdownItem,
	DropdownLabel,
	DropdownRadioGroup,
	DropdownRadioItem,
	DropdownShortcut,
	DropdownSub,
	DropdownSubContent,
	DropdownSubTrigger,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"


export default function DropdownPreview() {
	const [open, setOpen] = useState<boolean>(false)

	return (
		<Dropdown open={open} onOpenChange={setOpen}>
			<DropdownTrigger asChild>
				<Button color="neutral" variant="outline" end={open ? <ChevronUp /> : <ChevronDown />}>
					Dropdown
				</Button>
			</DropdownTrigger>
			<DropdownContent align=${align} placement=${placement} className="w-80">
				<DropdownLabel>My Account</DropdownLabel>
				<DropdownItem>
					<UserRound />
					View Profile
					<DropdownShortcut>⌘+P</DropdownShortcut>
				</DropdownItem>
				<DropdownItem>
					<Settings />
					Settings
					<DropdownShortcut>⌘+G</DropdownShortcut>
				</DropdownItem>
				<DropdownItem>
					<CreditCard />
					Subscription
					<DropdownShortcut>⌘+D</DropdownShortcut>
				</DropdownItem>
				<DropdownDivider />
				<DropdownItem>
					<Clock />
					Changelog
					<DropdownShortcut>⌘+F</DropdownShortcut>
				</DropdownItem>
				<DropdownSub>
					<DropdownSubTrigger>
						<Users />
						Invite Member
					</DropdownSubTrigger>
					<DropdownSubContent>
						<DropdownItem>
							<UsersRound />
							Invite All
						</DropdownItem>
						<DropdownItem>
							<UserPlus />
							Invite Selected
						</DropdownItem>
					</DropdownSubContent>
				</DropdownSub>
				<DropdownDivider />
				<DropdownItem>
					<Headset />
					Support
					<DropdownShortcut>⌘+Z</DropdownShortcut>
				</DropdownItem>
				<DropdownItem>
					<MessageCircleMore />
					Community
					<DropdownShortcut>⌘+R</DropdownShortcut>
				</DropdownItem>
				<DropdownDivider />
				<DropdownItem>
					<LogOut />
					Sign Out
				</DropdownItem>
			</DropdownContent>
		</Dropdown>
	)
}
`}
				/>
			</TabsContent>
		</Tabs>
	)
}
