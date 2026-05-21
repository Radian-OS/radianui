"use client"

import { BookmarkIcon } from "lucide-react"
import { Toggle } from "@/registry/ui/toggle"

export default function TogglePreview() {
	return (
		<Toggle aria-label="Toggle bookmark">
			<BookmarkIcon className="group-data-[state=on]/toggle:fill-fg" />
			Bookmark
		</Toggle>
	)
}
