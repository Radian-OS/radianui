"use client"

import * as React from "react"
import {
	Archive,
	ArrowLeftRight,
	ChevronDown,
	Copy,
	Link,
	Move,
	PencilLine,
	Star,
	Trash2,
	UserPlus,
	Users,
} from "lucide-react"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import {
	Dropdown,
	DropdownContent,
	DropdownDivider,
	DropdownItem,
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
					Quick Actions
					<ChevronDown className="text-fg-secondary" />
				</Button>
			</DropdownTrigger>
			<DropdownContent className="w-80">
				<DropdownItem>
					<PencilLine />
					Edit
					<DropdownShortcut>
						<Badge size="20" variant="outline" color="neutral">
							⌘E
						</Badge>
					</DropdownShortcut>
				</DropdownItem>
				<DropdownItem>
					<Copy />
					Duplicate
					<DropdownShortcut>
						<Badge size="20" variant="outline" color="neutral">
							⌘D
						</Badge>
					</DropdownShortcut>
				</DropdownItem>
				<DropdownSub>
					<DropdownSubTrigger>
						<Move />
						Move to...
					</DropdownSubTrigger>
					<DropdownSubContent>
						<DropdownItem>
							<Users />
							Existing Users
						</DropdownItem>
						<DropdownItem>
							<UserPlus />
							New Users
						</DropdownItem>
					</DropdownSubContent>
				</DropdownSub>
				<DropdownItem>
					<Link />
					Copy link
				</DropdownItem>
				<DropdownDivider />
				<DropdownItem>
					<Star />
					Add to favorites
				</DropdownItem>
				<DropdownItem>
					<ArrowLeftRight />
					Transfer
				</DropdownItem>
				<DropdownItem>
					<Archive />
					Archive
				</DropdownItem>
				<DropdownDivider />
				<DropdownItem>
					<Trash2 />
					Delete
					<DropdownShortcut>
						<Badge size="20" variant="outline" color="neutral">
							⌫
						</Badge>
					</DropdownShortcut>
				</DropdownItem>
			</DropdownContent>
		</Dropdown>
	)
}
