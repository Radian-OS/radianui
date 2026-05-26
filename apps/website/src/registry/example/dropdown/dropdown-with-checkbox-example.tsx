"use client"

import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import {
	Dropdown,
	DropdownContent,
	DropdownItem,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import { Label } from "@/registry/ui/label"

const DropdownWithCheckboxExample = () => {
	return (
		<Dropdown>
			<DropdownTrigger asChild>
				<Button variant="outline" color="neutral">
					Open
				</Button>
			</DropdownTrigger>
			<DropdownContent align="center" className="w-80 space-y-0.5">
				<DropdownItem
					className="px-2 py-1.5"
					onClick={(e) => e.preventDefault()}>
					<Checkbox className="[&_svg]:text-white" id="checkbox-a" />
					<Label htmlFor="checkbox-a">Checkbox A</Label>
				</DropdownItem>
				<DropdownItem
					className="px-2 py-1.5"
					onClick={(e) => e.preventDefault()}>
					<Checkbox id="checkbox-b" className="[&_svg]:text-white" />
					<Label htmlFor="checkbox-b">Checkbox B</Label>
				</DropdownItem>
				<DropdownItem
					className="px-2 py-1.5"
					onClick={(e) => e.preventDefault()}>
					<Checkbox id="checkbox-c" className="[&_svg]:text-white" />
					<Label htmlFor="checkbox-c">Checkbox C</Label>
				</DropdownItem>
				<DropdownItem
					className="px-2 py-1.5"
					onClick={(e) => e.preventDefault()}>
					<Checkbox id="checkbox-d" className="[&_svg]:text-white" />
					<Label htmlFor="checkbox-d">Checkbox D</Label>
				</DropdownItem>
			</DropdownContent>
		</Dropdown>
	)
}

export default DropdownWithCheckboxExample
