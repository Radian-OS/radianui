import React from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import { CompactButton } from "@/registry/ui/button"

function CompactButtonExample() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-3">
			<CompactButton
				aria-label="Button with Down Arrow"
				size="20"
				variant="outline"
				color="neutral">
				<IconSlot slot="down" size={16} />
			</CompactButton>
			<CompactButton
				aria-label="Close Button"
				size="20"
				variant="soft"
				color="neutral">
				<IconSlot slot="cross" size={16} />
			</CompactButton>
			<CompactButton size="24" variant="outline" color="neutral">
				<IconSlot slot="down" size={16} />
			</CompactButton>
			<CompactButton
				aria-label="Close Button"
				size="24"
				variant="soft"
				color="neutral">
				<IconSlot slot="cross" size={16} />
			</CompactButton>
		</div>
	)
}

export default CompactButtonExample
