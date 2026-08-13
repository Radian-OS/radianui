"use client"

import {
	Briefcase,
	ChevronDown,
	Mars,
	Palmtree,
	User,
	Venus,
} from "lucide-react"
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
	{ value: "professional", label: "Professional", icon: Briefcase },
	{ value: "casual", label: "Casual", icon: Palmtree },
	{ value: "male", label: "Male", icon: Mars },
	{ value: "female", label: "Female", icon: Venus },
]

const CategoryFilterDropdown = ({
	value,
	onChange,
}: {
	value: string
	onChange: (value: string) => void
}) => {
	const activeLabel = CATEGORIES.find((c) => c.value === value)?.label ?? "All"

	return (
		<DropdownMenu indicatorPosition="right">
			<DropdownMenuTrigger asChild>
				<Button color="neutral" variant="outline">
					<User className="text-fg-secondary" />
					{activeLabel}
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
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default CategoryFilterDropdown
