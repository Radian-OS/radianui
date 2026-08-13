import React from "react"
import { ChevronDown } from "lucide-react"
import { Button, ButtonGroup, IconButton } from "@/registry/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"

function ButtonSplitExample() {
	return (
		<div className="flex items-center justify-center gap-4">
			<DropdownMenu>
				<ButtonGroup>
					<Button>Download File</Button>
					<DropdownMenuTrigger asChild>
						<IconButton aria-label="Button With DropdownMenu">
							<ChevronDown />
						</IconButton>
					</DropdownMenuTrigger>
				</ButtonGroup>
				<DropdownMenuContent>
					<DropdownMenuGroup title="Actions">
						<DropdownMenuItem>Create a merge commit</DropdownMenuItem>
						<DropdownMenuItem>Squash and merge</DropdownMenuItem>
						<DropdownMenuItem disabled>Rebase and merge</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

export default ButtonSplitExample
