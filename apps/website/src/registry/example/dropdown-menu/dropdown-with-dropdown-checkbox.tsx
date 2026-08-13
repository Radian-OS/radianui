"use client"

import * as React from "react"
import { Button } from "@/registry/ui/button"
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"

export default function DropdownWithDropdownCheckbox() {
	const [email, setEmail] = React.useState(true)
	const [sms, setSms] = React.useState(false)
	const [push, setPush] = React.useState(true)

	return (
		<DropdownMenu indicatorPosition="left">
			<DropdownMenuTrigger asChild>
				<Button variant="outline" color="neutral">
					Notifications
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuCheckboxItem
					onSelect={(e) => e.preventDefault()}
					checked={email}
					onCheckedChange={(checked) => setEmail(checked)}>
					Email
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					onSelect={(e) => e.preventDefault()}
					checked={sms}
					onCheckedChange={(checked) => setSms(checked)}>
					SMS
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					onSelect={(e) => e.preventDefault()}
					checked={push}
					onCheckedChange={(checked) => setPush(checked)}>
					Push Notifications
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
