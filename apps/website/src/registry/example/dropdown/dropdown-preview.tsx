"use client"

import * as React from "react"
import {
	Clock,
	CreditCard,
	Headset,
	LogOut,
	MessageCircleMore,
	Settings,
	UserPlus,
	UserRound,
	Users,
} from "lucide-react"
import { Button } from "@/registry/ui/button"
import {
	Dropdown,
	DropdownContent,
	DropdownDivider,
	DropdownItem,
	DropdownLabel,
	DropdownShortcut,
	DropdownSub,
	DropdownSubContent,
	DropdownSubTrigger,
	DropdownTrigger,
} from "@/registry/ui/dropdown"

export default function DropdownPreview() {
	const [open, setOpen] = React.useState<boolean>(false)

	return (
		<Dropdown open={open} onOpenChange={setOpen}>
			<DropdownTrigger asChild>
				<Button color="neutral" variant="outline">
					Dropdown
				</Button>
			</DropdownTrigger>
			<DropdownContent className="w-80">
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
							<Users />
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
