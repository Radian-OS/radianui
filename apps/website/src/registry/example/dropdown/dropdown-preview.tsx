"use client"

import * as React from "react"
import { IconSlot } from "@/registry/icon/icon-library"
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
					<IconSlot slot="user" />
					View Profile
					<DropdownShortcut>⌘+P</DropdownShortcut>
				</DropdownItem>
				<DropdownItem>
					<IconSlot slot="setting" />
					Settings
					<DropdownShortcut>⌘+G</DropdownShortcut>
				</DropdownItem>
				<DropdownItem>
					<IconSlot slot="card" />
					Subscription
					<DropdownShortcut>⌘+D</DropdownShortcut>
				</DropdownItem>
				<DropdownDivider />
				<DropdownItem>
					<IconSlot slot="clock" />
					Changelog
					<DropdownShortcut>⌘+F</DropdownShortcut>
				</DropdownItem>
				<DropdownSub>
					<DropdownSubTrigger>
						<IconSlot slot="users" />
						Invite Member
					</DropdownSubTrigger>
					<DropdownSubContent>
						<DropdownItem>
							<IconSlot slot="users" />
							Invite All
						</DropdownItem>
						<DropdownItem>
							<IconSlot slot="user-plus" />
							Invite Selected
						</DropdownItem>
					</DropdownSubContent>
				</DropdownSub>
				<DropdownDivider />
				<DropdownItem>
					<IconSlot slot="headset" />
					Support
					<DropdownShortcut>⌘+Z</DropdownShortcut>
				</DropdownItem>
				<DropdownItem>
					<IconSlot slot="community" />
					Community
					<DropdownShortcut>⌘+R</DropdownShortcut>
				</DropdownItem>
				<DropdownDivider />
				<DropdownItem>
					<IconSlot slot="logout" />
					Sign Out
				</DropdownItem>
			</DropdownContent>
		</Dropdown>
	)
}
