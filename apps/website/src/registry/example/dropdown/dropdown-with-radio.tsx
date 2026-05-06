"use client"

import { useState } from "react"
import { Button } from "@/styles/default/ui/button"
import {
	Dropdown,
	DropdownContent,
	DropdownRadioGroup,
	DropdownRadioItem,
	DropdownTrigger,
} from "@/styles/default/ui/dropdown"

export default function DropdownWithRadioExample() {
	const [theme, setTheme] = useState("system")

	return (
		<Dropdown indicatorPosition="left">
			<DropdownTrigger asChild>
				<Button variant="outline" color="neutral">
					Theme
				</Button>
			</DropdownTrigger>
			<DropdownContent>
				<DropdownRadioGroup value={theme} onValueChange={setTheme}>
					<DropdownRadioItem value="light">Light</DropdownRadioItem>
					<DropdownRadioItem value="dark">Dark</DropdownRadioItem>
					<DropdownRadioItem value="system">System</DropdownRadioItem>
				</DropdownRadioGroup>
			</DropdownContent>
		</Dropdown>
	)
}
