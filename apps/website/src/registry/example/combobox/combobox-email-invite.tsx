"use client"

import React from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import { Avatar, AvatarImage } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/registry/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

const DATA = [
	{ icon: "/media/male-1.jpg", email: "alex@radian.com" },
	{ icon: "/media/female-3.jpg", email: "maria@radian.com" },
	{ icon: "/media/male-2.jpg", email: "david@radian.com" },
	{ icon: "/media/male-3.jpg", email: "james@radian.com" },
	{ icon: "/media/female-4.jpg", email: "sophia@radian.com" },
]

export default function ComboboxEmailInvite() {
	const [selectedValues, setSelectedValues] = React.useState<string[]>([])

	const toggleSelection = (value: string) => {
		setSelectedValues((prev) =>
			prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
		)
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="soft">
					<IconSlot slot="plus" />
					Invite to Channel
					<IconSlot slot="right" />
				</Button>
			</PopoverTrigger>
			<PopoverContent align="start" className="p-0">
				<Command className="border-0">
					<CommandInput placeholder="Search" />
					<CommandList>
						<CommandGroup heading="MEMBERS">
							{DATA.map((d) => (
								<CommandItem
									key={d.email}
									onSelect={() => toggleSelection(d.email)}>
									<Avatar size="20">
										<AvatarImage src={d.icon} />
									</Avatar>
									{d.email}
									{selectedValues.includes(d.email) && (
										<IconSlot slot="check" className="ml-auto" />
									)}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
