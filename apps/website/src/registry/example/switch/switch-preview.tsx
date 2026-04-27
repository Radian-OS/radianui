"use client"

import { Label } from "@/styles/default/ui/label"
import { Switch } from "@/styles/default/ui/switch"

export default function SwitchPreview() {
	return (
		<div className="flex items-center gap-2">
			<Switch id="enable-notifications" />
			<Label htmlFor="enable-notifications">Enable Notifications</Label>
		</div>
	)
}
