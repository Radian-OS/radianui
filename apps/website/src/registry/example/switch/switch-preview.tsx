"use client"

import { Label } from "@/registry/ui/label"
import { Switch } from "@/registry/ui/switch"

export default function SwitchPreview() {
	return (
		<div className="flex items-center space-x-2">
			<Switch id="enable-notifications" />
			<Label htmlFor="enable-notifications">Enable Notifications</Label>
		</div>
	)
}
