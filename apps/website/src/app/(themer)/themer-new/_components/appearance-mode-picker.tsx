import { Button } from "@/styles/default/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"

export default function AppearanceModePicker() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className="bg-fill1-alpha w-full justify-between text-[13px]"
					variant="soft"
					color="neutral">
					<span>Default Mode</span>{" "}
					<span className="text-fg-tertiary font-medium">Light</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				side="right"
				align="end"
				sideOffset={20}
				className="min-w-[280px] shadow-sm">
				<DropdownMenuLabel className="text-fg-tertiary">
					Appearance Mode
				</DropdownMenuLabel>
				<DropdownMenuRadioGroup>
					<DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
