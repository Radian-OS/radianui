"use client"

import {
	Briefcase,
	ChevronDown,
	Mars,
	Palmtree,
	Star,
	User,
	Venus,
} from "lucide-react"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuDivider,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"

const CATEGORIES = [
	{ value: "all", label: "All", icon: User },
	{ value: "favorites", label: "Favorites", icon: Star },
	{ value: "professional", label: "Professional", icon: Briefcase },
	{ value: "casual", label: "Casual", icon: Palmtree },
	{ value: "male", label: "Male", icon: Mars },
	{ value: "female", label: "Female", icon: Venus },
]

const CategoryFilterDropdown = ({
	value,
	onChange,
	favoriteCount = 0,
}: {
	value: string
	onChange: (value: string) => void
	favoriteCount?: number
}) => {
	const activeCategory = CATEGORIES.find((c) => c.value === value)
	const activeLabel = activeCategory?.label ?? "All"
	const ActiveIcon = activeCategory?.icon ?? User

	return (
		<DropdownMenu indicatorPosition="right">
			<DropdownMenuTrigger asChild>
				<Button color="neutral" variant="outline">
					<ActiveIcon className="text-fg-secondary" />
					{activeLabel}
					{value === "favorites" && favoriteCount > 0 && (
						<span className="bg-primary/20 text-primary rounded-full px-1.5 py-0.5 text-xs font-semibold">
							{favoriteCount}
						</span>
					)}
					<ChevronDown className="text-fg-secondary" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-60">
				<DropdownMenuLabel>Categories</DropdownMenuLabel>
				<DropdownMenuDivider />
				<DropdownMenuRadioGroup value={value} onValueChange={onChange}>
					{CATEGORIES.map(({ value: v, label, icon: Icon }) => (
						<DropdownMenuRadioItem key={v} value={v}>
							<Icon className="text-fg-secondary size-4" />
							<span className="flex-1 text-sm font-medium">{label}</span>
							{v === "favorites" && favoriteCount > 0 && (
								<Badge size="20" variant="soft" color="neutral">
									{favoriteCount}
								</Badge>
							)}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default CategoryFilterDropdown
