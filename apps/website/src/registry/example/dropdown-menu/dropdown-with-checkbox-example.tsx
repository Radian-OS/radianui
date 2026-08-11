"use client"

import * as React from "react"
import { ChevronDown, Link2, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import {
	Dropdown,
	DropdownCheckboxItem,
	DropdownContent,
	DropdownDivider,
	DropdownItem,
	DropdownLabel,
	DropdownTrigger,
} from "@/registry/ui/dropdown-menu"

type Workspace = "debcon" | "xavion" | "qubio" | "personal"

const DropdownWithCheckboxExample = () => {
	const [checkedWorkspaces, setCheckedWorkspaces] = React.useState<Workspace[]>(
		["debcon"]
	)

	const isWorkspaceChecked = (workspace: Workspace) =>
		checkedWorkspaces.includes(workspace)

	const setWorkspaceChecked = (workspace: Workspace, checked: boolean) => {
		setCheckedWorkspaces((currentWorkspaces) =>
			checked
				? currentWorkspaces.includes(workspace)
					? currentWorkspaces
					: [...currentWorkspaces, workspace]
				: currentWorkspaces.filter((item) => item !== workspace)
		)
	}

	return (
		<Dropdown indicatorPosition="right">
			<DropdownTrigger asChild>
				<Button color="neutral" variant="outline">
					Switch Workspace <ChevronDown className="text-fg-secondary" />
				</Button>
			</DropdownTrigger>

			<DropdownContent className="w-80">
				<DropdownLabel className="uppercase">Switch Workspace</DropdownLabel>
				<DropdownCheckboxItem
					checked={isWorkspaceChecked("debcon")}
					onCheckedChange={(checked) =>
						setWorkspaceChecked("debcon", checked === true)
					}
					onSelect={(event) => event.preventDefault()}>
					<Avatar size="32" rounded="square">
						<AvatarImage src="/media/debcon.png" alt="debcon" />
						<AvatarFallback>DC</AvatarFallback>
					</Avatar>
					<div className="flex flex-1 flex-col gap-0.5">
						<span className="text-sm font-medium">Debcon Inc.</span>
						<span className="text-fg-secondary text-xs">14 members</span>
					</div>
					<Badge variant="soft" color="info">
						Pro
					</Badge>
				</DropdownCheckboxItem>
				<DropdownCheckboxItem
					checked={isWorkspaceChecked("xavion")}
					onCheckedChange={(checked) =>
						setWorkspaceChecked("xavion", checked === true)
					}
					onSelect={(event) => event.preventDefault()}>
					<Avatar size="32" rounded="square">
						<AvatarImage src="/media/xavion.png" alt="xavion" />
						<AvatarFallback>XV</AvatarFallback>
					</Avatar>
					<div className="flex flex-1 flex-col gap-0.5">
						<span className="text-sm font-medium">Xavion Inc.</span>
						<span className="text-fg-secondary text-xs">51 members</span>
					</div>
					<Badge variant="soft" color="warning">
						Biz
					</Badge>
				</DropdownCheckboxItem>
				<DropdownCheckboxItem
					checked={isWorkspaceChecked("qubio")}
					onCheckedChange={(checked) =>
						setWorkspaceChecked("qubio", checked === true)
					}
					onSelect={(event) => event.preventDefault()}>
					<Avatar size="32" rounded="square">
						<AvatarImage src="/media/qubio.png" alt="qubio" />
						<AvatarFallback>QB</AvatarFallback>
					</Avatar>
					<div className="flex flex-1 flex-col gap-0.5">
						<span className="text-sm font-medium">Qubio Inc.</span>
						<span className="text-fg-secondary text-xs">84 members</span>
					</div>
					<Badge variant="outline" color="neutral">
						Free
					</Badge>
				</DropdownCheckboxItem>
				<DropdownCheckboxItem
					checked={isWorkspaceChecked("personal")}
					onCheckedChange={(checked) =>
						setWorkspaceChecked("personal", checked === true)
					}
					onSelect={(event) => event.preventDefault()}>
					<Avatar size="32" rounded="square">
						<AvatarImage src="/media/personal.png" alt="personal" />
						<AvatarFallback>AB</AvatarFallback>
					</Avatar>
					<div className="flex flex-1 flex-col gap-0.5">
						<span className="text-sm font-medium">Personal</span>
						<span className="text-fg-secondary text-xs">Just You</span>
					</div>
					<Badge variant="outline" color="neutral">
						Free
					</Badge>
				</DropdownCheckboxItem>
				<DropdownDivider />
				<DropdownItem>
					<Plus />
					Create Workspace
				</DropdownItem>
				<DropdownItem>
					<Link2 />
					Join with invite link
				</DropdownItem>
			</DropdownContent>
		</Dropdown>
	)
}

export default DropdownWithCheckboxExample
