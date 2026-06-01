import React from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import { Badge } from "@/registry/ui/badge"

function BadgeNested() {
	return (
		<div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
			<Badge
				size="28"
				variant="strong"
				className="h-8 gap-2 rounded-full py-1 pl-1 pr-[10px]"
				color="neutral">
				<Badge className="rounded-full" variant="strong" color="primary">
					New
				</Badge>
				<span className="text-sm">Patch 0.2.1 is now online</span>
				<IconSlot slot="arrow-right" />
			</Badge>
			<Badge
				size="28"
				variant="soft"
				className="h-8 gap-2 rounded-full py-1.5 pl-2.5 pr-1.5">
				<span className="text-sm">Save 17% off</span>
				<Badge
					size="20"
					className="rounded-full"
					variant="strong"
					color="primary">
					Annual
				</Badge>
			</Badge>
		</div>
	)
}

export default BadgeNested
