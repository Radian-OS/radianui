"use client"

import React from "react"
import { Check } from "lucide-react"
import { FlagImage } from "react-international-phone"
import { Button } from "@/registry/ui/button"
import {
	Dropdown,
	DropdownContent,
	DropdownDivider,
	DropdownGroup,
	DropdownItem,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import { ScrollArea } from "@/registry/ui/scroll-area"

const timezoneGroups = [
	{
		label: "Asia / Pacific",
		timezones: [
			{ code: "NPT", utc: "UTC+5:45", city: "Kathmandu", flag: "np" },
			{ code: "IST", utc: "UTC+5:30", city: "Mumbai", flag: "in" },
			{ code: "JST", utc: "UTC+9", city: "Tokyo", flag: "jp" },
		],
	},
	{
		label: "Americas",
		timezones: [
			{ code: "EST", utc: "UTC-5", city: "New York", flag: "us" },
			{ code: "PST", utc: "UTC-8", city: "Los Angeles", flag: "us" },
		],
	},
	{
		label: "Europe",
		timezones: [
			{ code: "GMT", utc: "UTC+0", city: "London", flag: "gb" },
			{ code: "CET", utc: "UTC+1", city: "Berlin", flag: "de" },
		],
	},
]

export default function ScrollAreaDropdown() {
	const [selected, setSelected] = React.useState("NPT")

	return (
		<Dropdown>
			<DropdownTrigger asChild>
				<Button variant="outline" color="neutral">
					Scroll Area Dropdown
				</Button>
			</DropdownTrigger>
			<DropdownContent className="w-72 p-0">
				<ScrollArea className="h-80">
					<div className="p-1.5">
						{timezoneGroups.map((group, i) => (
							<React.Fragment key={group.label}>
								{i > 0 && <DropdownDivider />}
								<DropdownGroup title={group.label}>
									{group.timezones.map((tz) => (
										<DropdownItem
											key={tz.code}
											onClick={() => setSelected(tz.code)}
											className="flex items-center gap-2">
											<FlagImage iso2={tz.flag} className="size-5" />

											<span className="text-fg font-normal">
												{tz.code} ({tz.utc})
											</span>
											<span className="text-fg-secondary text-sm">
												{tz.city}
											</span>
											{selected === tz.code && (
												<Check className="text-fg-secondary ml-auto size-4" />
											)}
										</DropdownItem>
									))}
								</DropdownGroup>
							</React.Fragment>
						))}
					</div>
				</ScrollArea>
			</DropdownContent>
		</Dropdown>
	)
}
