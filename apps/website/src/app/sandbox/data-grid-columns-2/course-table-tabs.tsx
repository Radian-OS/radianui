"use client"

import React from "react"
import { cn } from "@/lib/utils"
import type { CourseStatus } from "./types"

export type TabKey = "all" | CourseStatus

interface CourseTableTabsProps {
	activeTab: TabKey
	onTabChange: (tab: TabKey) => void
	counts: {
		all: number
		published: number
		draft: number
		archived: number
	}
}

export function CourseTableTabs({
	activeTab,
	onTabChange,
	counts,
}: CourseTableTabsProps) {
	const tabs: { key: TabKey; label: string; count: number }[] = [
		{ key: "all", label: "All", count: counts.all },
		{ key: "published", label: "Published", count: counts.published },
		{ key: "draft", label: "Draft", count: counts.draft },
		{ key: "archived", label: "Archived", count: counts.archived },
	]

	return (
		<div className="border-border/60 flex items-center gap-1 overflow-x-auto border-b pb-3">
			{tabs.map((tab) => {
				const isActive = activeTab === tab.key
				return (
					<button
						key={tab.key}
						type="button"
						onClick={() => onTabChange(tab.key)}
						className={cn(
							"flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150",
							isActive
								? "bg-elevation-level1/60 text-fg border-border/80 border shadow-xs"
								: "text-fg-secondary hover:text-fg hover:bg-elevation-level1/20"
						)}>
						<span>{tab.label}</span>
						<span
							className={cn(
								"py-0.2 rounded-full px-1.5 text-[10px] font-semibold",
								isActive
									? "bg-elevation-level1 text-fg"
									: "bg-elevation-level1/40 text-fg-tertiary"
							)}>
							{tab.count}
						</span>
					</button>
				)
			})}
		</div>
	)
}
