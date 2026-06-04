"use client"

import React from "react"
import { Plus, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { CompactButton } from "@/registry/ui/button"
import {
	Dropdown,
	DropdownCheckboxItem,
	DropdownContent,
	DropdownTrigger,
} from "@/registry/ui/dropdown"

const PEOPLE = [
	{ name: "Ava", initials: "AC", image: "/media/female-1.jpg" },
	{ name: "Noah", initials: "NP", image: "/media/male-1.jpg" },
	{ name: "Mia", initials: "MJ", image: "/media/female-2.jpg" },
	{ name: "Leo", initials: "LK", image: "/media/male-4.jpg" },
	{ name: "Zara", initials: "ZS", image: "/media/male-3.jpg" },
	{ name: "Ethan", initials: "EB", image: "/media/male-2.jpg" },
]

function BadgeInteractiveExample() {
	const [selected, setSelected] = React.useState<string[]>(["Ava", "Mia"])

	const add = (label: string) => {
		setSelected((prev) => (prev.includes(label) ? prev : [...prev, label]))
	}

	const remove = (label: string) => {
		setSelected((prev) => prev.filter((p) => p !== label))
	}

	const getPerson = (name: string) =>
		PEOPLE.find((person) => person.name === name)!

	return (
		<div className="flex flex-col items-start gap-3">
			<div className="flex flex-wrap items-center gap-2">
				{selected.map((label) => {
					const person = getPerson(label)

					return (
						<Badge key={label} color="neutral" variant="outline" size="28">
							<Avatar size="16" rounded="circle">
								<AvatarImage src={person.image} />
								<AvatarFallback>{person.initials}</AvatarFallback>
							</Avatar>
							{person.name}
							<CompactButton
								aria-label={`Remove ${person.name}`}
								size="20"
								variant="ghost"
								color="neutral"
								className="[&>svg]:!h-3.5! !p-0 [&>svg]:!w-3.5"
								onClick={() => remove(person.name)}>
								<X />
							</CompactButton>
						</Badge>
					)
				})}

				<Dropdown indicatorPosition="right">
					<DropdownTrigger asChild>
						<CompactButton
							aria-label="Add person"
							size="24"
							variant="outline"
							color="neutral">
							<Plus />
						</CompactButton>
					</DropdownTrigger>

					<DropdownContent>
						{PEOPLE.map((person) => (
							<DropdownCheckboxItem
								key={person.name}
								onSelect={(e) => e.preventDefault()}
								checked={selected.includes(person.name)}
								onCheckedChange={(checked) =>
									checked ? add(person.name) : remove(person.name)
								}>
								<Avatar size="16" rounded="circle">
									<AvatarImage src={person.image} />
									<AvatarFallback>{person.initials}</AvatarFallback>
								</Avatar>
								<span className="text-sm">{person.name}</span>
							</DropdownCheckboxItem>
						))}
					</DropdownContent>
				</Dropdown>
			</div>

			<div className="text-fg-secondary text-sm">
				Click + to add people. Click × to remove.
			</div>
		</div>
	)
}

export default BadgeInteractiveExample
