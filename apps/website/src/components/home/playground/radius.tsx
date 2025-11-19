import React from "react"
import { CircleDashed } from "lucide-react"
import { RadiusOption, usePlayground } from "@/contexts/playground"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownTrigger } from "@/registry/ui/dropdown"

export default function Radius() {
	const { radius, setRadius } = usePlayground()
	return (
		<Dropdown indicatorPosition="right">
			<DropdownTrigger>
				<div className="hover:bg-fill2 flex size-8 cursor-pointer items-center justify-center rounded-md">
					<CircleDashed size={18} />
				</div>
			</DropdownTrigger>
			<DropdownContent sideOffset={10}>
				<DropdownRadioGroup value={radius} onValueChange={(value) => setRadius(value as RadiusOption)}>
					<DropdownRadioItem value="default">Default</DropdownRadioItem>
					<DropdownRadioItem value="rounded">Rounded</DropdownRadioItem>
					<DropdownRadioItem value="flat">Flat</DropdownRadioItem>
					<DropdownRadioItem value="fun">Fun</DropdownRadioItem>
				</DropdownRadioGroup>
			</DropdownContent>
		</Dropdown>
	)
}
