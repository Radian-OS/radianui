"use client"

import { Label } from "@/styles/default/ui/label"
import { Switch } from "@/styles/default/ui/switch"

export default function SwitchPreview() {
	return (
		<div className="flex items-center space-x-2">
			<Switch id="enable-notifications-disabled" disabled defaultChecked />
			<Label htmlFor="enable-notifications-disabled">
				Enable Notifications
			</Label>
		</div>
	)
}
