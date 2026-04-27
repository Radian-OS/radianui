import React from "react"
import { Bookmark, Plus, Settings, Trash2 } from "lucide-react"
import { IconButton } from "@/styles/default/ui/button"

function ButtonIconOnlyExample() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-3">
			<IconButton
				aria-label="Settings Button"
				color="neutral"
				variant="outline">
				<Settings />
			</IconButton>
			<IconButton aria-label="Trash Button" variant="soft" color="error">
				<Trash2 />
			</IconButton>
			<IconButton aria-label="Bookmark Button" variant="soft" color="primary">
				<Bookmark />
			</IconButton>
			<IconButton aria-label="Plus Button">
				<Plus />
			</IconButton>
			<IconButton
				aria-label="Rounded Plus Button"
				className="rounded-full"
				variant="outline"
				color="neutral">
				<Plus />
			</IconButton>
		</div>
	)
}

export default ButtonIconOnlyExample
