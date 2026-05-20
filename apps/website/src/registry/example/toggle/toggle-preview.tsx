"use client"

import { BookmarkIcon } from "lucide-react"
import { Toggle } from "@/registry/ui/toggle"

export default function TogglePreview() {
	return (
		<Toggle
			aria-label="Toggle bookmark"
			size="28"
			color="neutral"
			variant="outline">
			<BookmarkIcon className="group-data-[state=on]/toggle:fill-fg" />
			Bookmark
		</Toggle>
	)
}
