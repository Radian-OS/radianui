import { BellOffIcon, BookmarkIcon } from "lucide-react"
import { Toggle } from "@/registry/ui/toggle"

export default function ToggleDisabled() {
	return (
		<div className="flex flex-wrap items-center gap-2">
			<Toggle disabled aria-label="Disabled bookmark">
				<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
				Bookmark
			</Toggle>
			<Toggle
				disabled
				defaultPressed
				variant="ghost"
				aria-label="Disabled mute">
				<BellOffIcon />
				Muted
			</Toggle>
		</div>
	)
}
