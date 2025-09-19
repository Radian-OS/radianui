"use client"

import * as React from "react"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownCheckboxItem, DropdownContent, DropdownTrigger } from "@/registry/ui/dropdown"

export default function DropdownWithDropdownCheckbox() {
	const [email, setEmail] = React.useState(true)
	const [sms, setSms] = React.useState(false)
	const [push, setPush] = React.useState(true)

	return (
		<Dropdown indicatorPosition="left">
			<DropdownTrigger asChild>
				<Button variant="outline" color="neutral">
					Notifications
				</Button>
			</DropdownTrigger>
			<DropdownContent>
				<DropdownCheckboxItem onSelect={(e) => e.preventDefault()} checked={email} onCheckedChange={(checked) => setEmail(checked)}>
					Email
				</DropdownCheckboxItem>
				<DropdownCheckboxItem onSelect={(e) => e.preventDefault()} checked={sms} onCheckedChange={(checked) => setSms(checked)}>
					SMS
				</DropdownCheckboxItem>
				<DropdownCheckboxItem onSelect={(e) => e.preventDefault()} checked={push} onCheckedChange={(checked) => setPush(checked)}>
					Push Notifications
				</DropdownCheckboxItem>
			</DropdownContent>
		</Dropdown>
	)
}
