import React from "react"
import { Bookmark, Plus, Settings, Trash2 } from "lucide-react"
import { IconButton } from "@/registry/ui/button"

function ButtonIconOnlyExample() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-3">
			<IconButton color="neutral" variant="outline">
				<Settings />
			</IconButton>
			<IconButton variant="soft" color="error">
				<Trash2 />
			</IconButton>
			<IconButton variant="soft" color="primary">
				<Bookmark />
			</IconButton>
			<IconButton variant="soft" color="success">
				<Bookmark />
			</IconButton>
			<IconButton>
				<Plus />
			</IconButton>
			<IconButton className="rounded-full" variant="outline" color="neutral">
				<Plus />
			</IconButton>
		</div>
	)
}

export default ButtonIconOnlyExample
