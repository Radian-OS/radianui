import { Button } from "@/styles/default/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"
import { HugeIcon, LucideIcon } from "./icons"
import { ICON_LIBRARIES, IconLibrary } from "@/registry/icon/icon-libraries"

const ICONS = [
	{ icon: LucideIcon, label: "Lucide", value: "lucide" },
	{ icon: HugeIcon, label: "Hugeicons", value: "hugeicons" },
	// { icon: PhosphorIcon, label: "Phosphor", value: 'phosphor' },
	// { icon: TablerIcon, label: "Tabler Icons", value: 'tablericons' },
	// { icon: MageIcon, label: "Mage Icons", value: 'mageicons' },
]

export default function IconLibraryPicker({
	value,
	onValueChange,
}: {
	value: IconLibrary
	onValueChange: (value: IconLibrary) => void
}) {
	const selectedIcon = ICONS.find((icon) => icon.value === value) ?? ICONS[0]

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className="bg-fill1-alpha w-full justify-between text-[13px]"
					variant="soft"
					color="neutral">
					<span>Library</span>{" "}
					<span className="text-fg-tertiary font-medium">
						{selectedIcon.label}
					</span>
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
				<DropdownMenuRadioGroup
					value={value}
					onValueChange={(value) => onValueChange(value as IconLibrary)}>
					{ICON_LIBRARIES.map((item) => {
						const iconLibrary =
							ICONS.find((icon) => icon.value === item) ?? ICONS[0]

						return (
							<DropdownMenuRadioItem
								key={iconLibrary.label}
								value={iconLibrary.value}>
								<iconLibrary.icon /> {iconLibrary.label}
							</DropdownMenuRadioItem>
						)
					})}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
