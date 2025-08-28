"use client"

import { useState } from "react"
import {
	Dropdown,
	DropdownContent,
	DropdownDivider,
	DropdownGroup,
	DropdownItem,
	DropdownRadioGroup,
	DropdownRadioItem,
	DropdownSub,
	DropdownSubContent,
	DropdownSubTrigger,
	DropdownTrigger,
} from "@/registry/ui/dropdown"

const DropdownExample = () => {
	const [selectedValues, setselectedValues] = useState<string[]>([])
	const [selectedValues2, setselectedValues2] = useState<string[]>(["loc1"])
	return (
		<div className="mt-4 flex flex-col gap-6 md:flex-row">
			<Dropdown>
				<DropdownTrigger>Dropdown 1</DropdownTrigger>
				<DropdownContent className="max-h-[200px] max-w-[15rem]">
					<DropdownGroup title="date range">
						<DropdownItem disabled>Disabled</DropdownItem>
						<DropdownItem>This month</DropdownItem>
						<DropdownItem>This quarter</DropdownItem>
					</DropdownGroup>
					<DropdownDivider />
					<DropdownGroup title="date range">
						<DropdownItem>Last week Last week Last week Last week</DropdownItem>
						<DropdownItem>Last month </DropdownItem>
						<DropdownSub>
							<DropdownSubTrigger>Show submenu</DropdownSubTrigger>
							<DropdownSubContent className="min-w-[10rem]">
								<DropdownRadioGroup value={selectedValues[0] || ""} onValueChange={(value) => setselectedValues([value])}>
									<DropdownRadioItem value="bookmarks" onSelect={(e) => e.preventDefault()}>
										Show Bookmarks show bookmarks
									</DropdownRadioItem>
									<DropdownRadioItem value="urls" onSelect={(e) => e.preventDefault()}>
										Show Urls
									</DropdownRadioItem>
									<DropdownRadioItem value="icons" onSelect={(e) => e.preventDefault()}>
										Show Icons
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownItem>All time</DropdownItem>
					</DropdownGroup>
				</DropdownContent>
			</Dropdown>

			<Dropdown>
				<DropdownTrigger>Dropdown2</DropdownTrigger>
				<DropdownContent>
					<DropdownItem>Test</DropdownItem>
					<DropdownSub>
						<DropdownSubTrigger>Location</DropdownSubTrigger>
						<DropdownSubContent className="min-w-32">
							<DropdownRadioGroup value={selectedValues2[0] || ""} onValueChange={(value) => setselectedValues2([value])}>
								<DropdownRadioItem value="loc1" onSelect={(e) => e.preventDefault()}>
									Location1
								</DropdownRadioItem>
								<DropdownRadioItem value="loc2" onSelect={(e) => e.preventDefault()}>
									Location2
								</DropdownRadioItem>
							</DropdownRadioGroup>
						</DropdownSubContent>
					</DropdownSub>
				</DropdownContent>
			</Dropdown>
		</div>
	)
}

export default DropdownExample
