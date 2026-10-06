"use client"

import React, { useState } from "react"
import { X } from "lucide-react"
import { Badge } from "@/styles/default/ui/badge"

export function AnnouncementBanner() {
	const [isVisible, setIsVisible] = useState(true)

	if (!isVisible) return null

	return (
		<div className="border-border/50 bg-elevation-level1 relative flex h-10 w-full items-center justify-center gap-2 border-b px-4 py-2.5 transition-colors">
			<div className="flex min-w-0 items-center gap-2">
				<Badge
					variant="soft"
					color="info"
					size="20"
					className="shrink-0 text-[10px] font-semibold tracking-wider uppercase">
					NEW
				</Badge>
				<span className="text-fg-secondary truncate text-xs font-normal">
					Promote a live event, webinar, or demo in this area
				</span>
			</div>
			<div className="flex md:absolute md:top-1/2 md:right-4 md:-translate-y-1/2">
				<button
					type="button"
					onClick={() => setIsVisible(false)}
					aria-label="Dismiss banner"
					className="text-fg-secondary hover:text-fg flex size-5 cursor-pointer items-center justify-center rounded-md transition-colors">
					<X className="size-3.5" />
				</button>
			</div>
		</div>
	)
}
