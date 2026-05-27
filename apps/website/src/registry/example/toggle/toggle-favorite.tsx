"use client"

import { StarIcon } from "lucide-react"
import { Toggle } from "@/registry/ui/toggle"

export default function ToggleFavorite() {
	return (
		<Toggle defaultPressed aria-label="Toggle favorite project">
			<StarIcon className="group-data-[state=on]/toggle:fill-current" />
			Favorite
		</Toggle>
	)
}
