import React from "react"
import { ChevronDown, X } from "lucide-react"
import { CompactButton } from "@/registry/ui/button"

function CompactButtonExample() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-3">
			<CompactButton
				aria-label="Button with Down Arrow"
				size="sm"
				variant="outline"
				color="neutral">
				<ChevronDown className="text-fg-secondary" />
			</CompactButton>
			<CompactButton
				aria-label="Close Button"
				size="sm"
				variant="soft"
				color="neutral">
				<X />
			</CompactButton>
			<CompactButton size="md" variant="outline" color="neutral">
				<ChevronDown className="text-fg-secondary" />
			</CompactButton>
			<CompactButton
				aria-label="Close Button"
				size="md"
				variant="soft"
				color="neutral">
				<X />
			</CompactButton>
		</div>
	)
}

export default CompactButtonExample
