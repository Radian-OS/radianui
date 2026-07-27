"use client"

import { Heart } from "lucide-react"
import { Toggle } from "@/registry/ui/toggle"

export default function ToggleHeart() {
	return (
		<Toggle aria-label="Toggle heart">
			<Heart className="group-data-[state=on]/toggle:fill-error group-data-[state=on]/toggle:stroke-error text-fg-secondary" />
			Heart
		</Toggle>
	)
}
