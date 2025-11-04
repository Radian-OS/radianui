import React from "react"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/registry/ui/badge"

function BadgeAsChild() {
	return (
		<div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
			<Badge asChild color="neutral" variant="strong" className="gap-2 rounded-full p-1">
				<a href="#custom-badge---wchild-badge" className="cursor-pointer no-underline">
					<span className="bg-primary rounded-full px-2 py-0.5 text-[13px] font-semibold text-white">New</span>
					Patch 0.2.1 is now online
					<ArrowRight className="size-4" />
				</a>
			</Badge>
		</div>
	)
}

export default BadgeAsChild
