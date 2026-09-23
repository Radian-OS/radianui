"use client"

import React, { useState } from "react"
import {
	FileText,
	Globe,
	Link2,
	Menu,
	MoreHorizontal,
	Star,
} from "lucide-react"
import { IconButton } from "@/styles/default/ui/button"
import { SidebarTrigger } from "@/styles/default/ui/sidebar"

interface TopHeaderProps {
	onToggleSidebar?: () => void
}

export function TopHeader({ onToggleSidebar }: TopHeaderProps) {
	const [isStarred, setIsStarred] = useState(false)

	return (
		<header className="border-border/60 bg-bg sticky top-0 z-30 flex h-12 w-full items-center justify-between border-b px-4 transition-colors">
			{/* Left: Mobile Toggle & Breadcrumbs */}
			<div className="flex items-center gap-2 overflow-hidden text-sm">
				<SidebarTrigger
					type="button"
					variant="ghost"
					color="neutral"
					size="28"
					aria-label="Toggle sidebar"
					onClick={onToggleSidebar}
					className="text-fg-secondary hover:text-fg md:hidden">
					<Menu className="size-4" />
				</SidebarTrigger>

				<div className="flex items-center gap-1.5 truncate">
					<div className="text-fg-secondary flex items-center gap-1.5">
						<Globe className="size-4 text-blue-500 dark:text-blue-400" />
						<span className="hover:text-fg font-medium">AS Mobbin</span>
					</div>

					<span className="text-fg-tertiary">›</span>

					<div className="flex items-center gap-1.5 truncate">
						<FileText className="text-fg-tertiary size-4" />
						<span className="text-fg truncate font-semibold">
							User Insight &amp; Behavior Analytics Dashboard
						</span>
					</div>
				</div>

				<IconButton
					type="button"
					variant="ghost"
					color="neutral"
					size="28"
					aria-label="Star this project"
					onClick={() => setIsStarred(!isStarred)}
					className="text-fg-secondary hover:text-fg">
					<Star
						className={`size-4 ${
							isStarred ? "fill-warning text-warning" : "text-fg-tertiary"
						}`}
					/>
				</IconButton>

				<IconButton
					type="button"
					variant="ghost"
					color="neutral"
					size="28"
					aria-label="More project options"
					className="text-fg-secondary hover:text-fg">
					<MoreHorizontal className="size-4" />
				</IconButton>
			</div>

			{/* Right: Actions */}
			<div className="flex items-center gap-1">
				<IconButton
					type="button"
					variant="ghost"
					color="neutral"
					size="28"
					aria-label="Copy project link"
					className="text-fg-secondary hover:text-fg">
					<Link2 className="size-4" />
				</IconButton>
			</div>
		</header>
	)
}
