"use client"

import { useState } from "react"
import { BellIcon, BellOffIcon } from "lucide-react"
import { Toggle } from "@/registry/ui/toggle"

export default function ToggleNotification() {
	const [muted, setMuted] = useState(false)
	const Icon = muted ? BellOffIcon : BellIcon

	return (
		<Toggle
			pressed={muted}
			onPressedChange={setMuted}
			aria-label="Toggle notifications">
			<Icon className="text-fg-secondary" />
			{muted ? "Muted" : "Notify"}
		</Toggle>
	)
}
