"use client"

import { useState } from "react"
import {
	Dropdown,
	DropdownContent,
	DropdownDivider,
	DropdownGroup,
	DropdownItem,
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
							<DropdownSubContent className="max-w-[8rem]">
								<DropdownGroup selectionMode="single" selectedValues={selectedValues} onSelectedChange={setselectedValues} minSelectionCount={2}>
									<DropdownItem value="bookmarks">Show Bookmarks show bookmarks</DropdownItem>
									<DropdownItem value="urls">Show Urls</DropdownItem>
									<DropdownItem value="icons">Show Icons</DropdownItem>
								</DropdownGroup>
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
						<DropdownSubContent>
							<DropdownGroup selectionMode="single" selectedValues={selectedValues2} onSelectedChange={setselectedValues2} minSelectionCount={1}>
								<DropdownItem value="loc1">Location1</DropdownItem>
								<DropdownItem value="loc2">Location2</DropdownItem>
							</DropdownGroup>
						</DropdownSubContent>
					</DropdownSub>
				</DropdownContent>
			</Dropdown>
		</div>
	)
}

export default DropdownExample
