import { Button, CompactButton } from "@/styles/default/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/styles/default/ui/tooltip"
import { Info } from "lucide-react"

export default function DensityPicker() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className="bg-fill1-alpha w-full justify-between p-3 text-[13px]"
					variant="soft"
					color="neutral">
					<span>Spacing</span>{" "}
					<span className="text-fg-tertiary font-medium">Default</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent side="right" align="start" sideOffset={20}>
				<div className="flex items-center justify-between">
					<DropdownMenuLabel className="text-fg-tertiary">
						Density
					</DropdownMenuLabel>
					<Tooltip>
						<TooltipTrigger asChild>
							<CompactButton variant="ghost" color="neutral" size="20">
								<Info />
							</CompactButton>
						</TooltipTrigger>
						<TooltipContent>
							Changes the spacing scale across your interface
						</TooltipContent>
					</Tooltip>
				</div>
				<DropdownMenuRadioGroup>
					<DropdownMenuRadioItem value="default">Default</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="spacious">
						Spacious
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
