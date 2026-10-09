import { Button } from "@/styles/default/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"
import {
	HugeIcon,
	LucideIcon,
	MageIcon,
	PhosphorIcon,
	TablerIcon,
} from "./icons"

const ICONS = [
	{ icon: LucideIcon, label: "Lucide" },
	{ icon: HugeIcon, label: "Hugeicons" },
	{ icon: PhosphorIcon, label: "Phosphor" },
	{ icon: TablerIcon, label: "Tabler Icons" },
	{ icon: MageIcon, label: "Mage Icons" },
]

export default function IconLibraryPicker() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className="bg-fill1-alpha w-full justify-between text-[13px]"
					variant="soft"
					color="neutral">
					<span>Library</span>{" "}
					<span className="text-fg-tertiary font-medium">Lucide</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				side="right"
				align="end"
				sideOffset={20}
				className="min-w-[280px] shadow-sm">
				<DropdownMenuLabel className="text-fg-tertiary">
					Icons
				</DropdownMenuLabel>
				<DropdownMenuRadioGroup>
					{ICONS.map((item) => (
						<DropdownMenuRadioItem key={item.label} value={item.label}>
							<item.icon /> {item.label}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
