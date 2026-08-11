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
	Dropdown,
	DropdownContent,
	DropdownDivider,
	DropdownLabel,
	DropdownRadioGroup,
	DropdownRadioItem,
	DropdownTrigger,
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
		<Dropdown indicatorPosition="right">
			<DropdownTrigger asChild>
				<Button color="neutral" variant="outline">
					<User className="text-fg-secondary" />
					{activeLabel}
					<ChevronDown className="text-fg-secondary" />
				</Button>
			</DropdownTrigger>

			<DropdownContent className="w-60">
				<DropdownLabel>Categories</DropdownLabel>
				<DropdownDivider />
				<DropdownRadioGroup value={value} onValueChange={onChange}>
					{CATEGORIES.map(({ value: v, label, icon: Icon }) => (
						<DropdownRadioItem key={v} value={v}>
							<Icon className="text-fg-secondary size-4" />
							<span className="flex-1 text-sm font-medium">{label}</span>
						</DropdownRadioItem>
					))}
				</DropdownRadioGroup>
			</DropdownContent>
		</Dropdown>
	)
}

export default CategoryFilterDropdown
