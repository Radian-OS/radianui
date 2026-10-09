import { Button } from "@/styles/default/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"

export default function CornerPicker() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className="bg-fill1-alpha w-full justify-between text-[13px]"
					variant="soft"
					color="neutral">
					<span>Radius</span>{" "}
					<span className="text-fg-tertiary font-medium">Default</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent side="right" align="start" sideOffset={20}>
				<DropdownMenuLabel className="text-fg-tertiary">
					Radius
				</DropdownMenuLabel>
				<DropdownMenuRadioGroup>
					<DropdownMenuRadioItem value="default">Default</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="flat">Flat</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="fun">Fun</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="rounded">Rounded</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="custom">Custom</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
