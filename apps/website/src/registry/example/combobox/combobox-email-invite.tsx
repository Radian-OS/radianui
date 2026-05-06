"use client"

import React from "react"
import { Check, ChevronRight, Plus } from "lucide-react"
import { Avatar, AvatarImage } from "@/styles/default/ui/avatar"
import { Button } from "@/styles/default/ui/button"
import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/styles/default/ui/command"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/styles/default/ui/popover"

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
					<Plus />
					Invite to Channel
					<ChevronRight />
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
										<Check className="ml-auto" />
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
