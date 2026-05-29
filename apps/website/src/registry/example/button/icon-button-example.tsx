import React from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import { IconButton } from "@/registry/ui/button"

function ButtonIconOnlyExample() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-3">
			<IconButton
				aria-label="Settings Button"
				color="neutral"
				variant="outline">
				<IconSlot slot="cog" size={16} />
			</IconButton>
			<IconButton aria-label="Trash Button" variant="soft" color="error">
				<IconSlot slot="trash" size={16} />
			</IconButton>
			<IconButton aria-label="Bookmark Button" variant="soft" color="primary">
				<IconSlot slot="bookmark" size={16} />
			</IconButton>
			<IconButton aria-label="Plus Button">
				<IconSlot slot="plus" size={16} />
			</IconButton>
			<IconButton
				aria-label="Rounded Plus Button"
				className="rounded-full"
				variant="outline"
				color="neutral">
				<IconSlot slot="plus" size={16} />
			</IconButton>
		</div>
	)
}

export default ButtonIconOnlyExample
