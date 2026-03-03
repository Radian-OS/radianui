import React from "react"
import { ChevronDown, X } from "lucide-react"
import { CompactButton } from "@/registry/ui/button"

function CompactButtonExample() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-3">
			<CompactButton
				aria-label="Button with Down Arrow"
				size="20"
				variant="outline"
				color="neutral">
				<ChevronDown />
			</CompactButton>
			<CompactButton
				aria-label="Close Button"
				size="20"
				variant="soft"
				color="neutral">
				<X />
			</CompactButton>
			<CompactButton size="24" variant="outline" color="neutral">
				<ChevronDown />
			</CompactButton>
			<CompactButton
				aria-label="Close Button"
				size="24"
				variant="soft"
				color="neutral">
				<X />
			</CompactButton>
		</div>
	)
}

export default CompactButtonExample
