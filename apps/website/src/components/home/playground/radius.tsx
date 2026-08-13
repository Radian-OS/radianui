import React from "react"
import { CircleDashed } from "lucide-react"
import { RadiusOption, usePlayground } from "@/contexts/playground"
import { IconButton } from "@/styles/default/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"

export default function Radius() {
	const { radius, setRadius } = usePlayground()
	return (
		<DropdownMenu indicatorPosition="right">
			<DropdownMenuTrigger asChild>
				<IconButton
					variant="ghost"
					color="neutral"
					aria-label="Change Radius"
					className="hover:bg-fill2 text-fg flex size-8 cursor-pointer items-center justify-center rounded-md">
					<CircleDashed size={18} />
				</IconButton>
			</DropdownMenuTrigger>
			<DropdownMenuPortal>
				<DropdownMenuContent sideOffset={10}>
					<DropdownMenuRadioGroup
						value={radius}
						onValueChange={(value) => setRadius(value as RadiusOption)}>
						<DropdownMenuRadioItem value="default">
							Default
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="rounded">
							Rounded
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="flat">Flat</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="fun">Fun</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenuPortal>
		</DropdownMenu>
	)
}
