import { useThemerPickerPlacement } from "./themer-picker-placement"
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
	HeroiconsIcon,
	HugeIcon,
	LucideIcon,
	PhosphorIcon,
	TablerIcon,
} from "./icons"
import { ICON_LIBRARIES, IconLibrary } from "@/registry/icon/icon-libraries"

const ICONS = [
	{ icon: LucideIcon, label: "Lucide", value: "lucide" },
	{ icon: HugeIcon, label: "Hugeicons", value: "hugeicons" },
	{ icon: PhosphorIcon, label: "Phosphor", value: "phosphor" },
	{ icon: TablerIcon, label: "Tabler", value: "tabler" },
	{ icon: HeroiconsIcon, label: "Heroicons", value: "heroicons" },
	// { icon: MageIcon, label: "Mage Icons", value: 'mageicons' },
]

export default function IconLibraryPicker({
	value,
	onValueChange,
}: {
	value: IconLibrary
	onValueChange: (value: IconLibrary) => void
}) {
	const placement = useThemerPickerPlacement("end", 12)
	const selectedIcon = ICONS.find((icon) => icon.value === value) ?? ICONS[0]

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className="bg-fill1-alpha w-full justify-between text-[13px] select-none"
					variant="soft"
					color="neutral">
					<span>Library</span>{" "}
					<span className="text-fg-tertiary font-medium">
						{selectedIcon.label}
					</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				{...placement}
				className="w-70 max-w-[calc(100vw-1.5rem)] shadow-sm">
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
								value={iconLibrary.value}
								onSelect={(e) => e.preventDefault()}>
								<iconLibrary.icon /> {iconLibrary.label}
							</DropdownMenuRadioItem>
						)
					})}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
