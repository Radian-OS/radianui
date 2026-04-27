import React from "react"
import { ChevronDown } from "lucide-react"
import { Button, ButtonGroup, IconButton } from "@/styles/default/ui/button"
import {
	Dropdown,
	DropdownContent,
	DropdownGroup,
	DropdownItem,
	DropdownTrigger,
} from "@/styles/default/ui/dropdown"

function ButtonSplitExample() {
	return (
		<div className="flex items-center justify-center gap-4">
			<Dropdown>
				<ButtonGroup>
					<Button>Download File</Button>
					<DropdownTrigger asChild>
						<IconButton aria-label="Button With Dropdown">
							<ChevronDown />
						</IconButton>
					</DropdownTrigger>
				</ButtonGroup>
				<DropdownContent>
					<DropdownGroup title="Actions">
						<DropdownItem>Create a merge commit</DropdownItem>
						<DropdownItem>Squash and merge</DropdownItem>
						<DropdownItem disabled>Rebase and merge</DropdownItem>
					</DropdownGroup>
				</DropdownContent>
			</Dropdown>
		</div>
	)
}

export default ButtonSplitExample
