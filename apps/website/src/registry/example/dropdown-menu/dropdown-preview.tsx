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
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuDivider,
	DropdownMenuItem,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"

export default function DropdownPreview() {
	const [open, setOpen] = React.useState<boolean>(false)

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<Button color="neutral" variant="outline">
					Quick Actions
					<ChevronDown className="text-fg-secondary" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-80">
				<DropdownMenuItem>
					<PencilLine />
					Edit
					<DropdownMenuShortcut>
						<Badge size="20" variant="outline" color="neutral">
							⌘E
						</Badge>
					</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Copy />
					Duplicate
					<DropdownMenuShortcut>
						<Badge size="20" variant="outline" color="neutral">
							⌘D
						</Badge>
					</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>
						<Move />
						Move to...
					</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuItem>
							<Users />
							Existing Users
						</DropdownMenuItem>
						<DropdownMenuItem>
							<UserPlus />
							New Users
						</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
				<DropdownMenuItem>
					<Link />
					Copy link
				</DropdownMenuItem>
				<DropdownMenuDivider />
				<DropdownMenuItem>
					<Star />
					Add to favorites
				</DropdownMenuItem>
				<DropdownMenuItem>
					<ArrowLeftRight />
					Transfer
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Archive />
					Archive
				</DropdownMenuItem>
				<DropdownMenuDivider />
				<DropdownMenuItem>
					<Trash2 />
					Delete
					<DropdownMenuShortcut>
						<Badge size="20" variant="outline" color="neutral">
							⌫
						</Badge>
					</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
