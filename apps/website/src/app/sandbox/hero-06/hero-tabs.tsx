"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { HERO_TABS } from "./types"

interface HeroTabsProps {
	activeTab: string
	onTabChange: (tabId: string) => void
}

export function HeroTabs({ activeTab, onTabChange }: HeroTabsProps) {
	return (
		<div className="border-border bg-card/60 scrollbar-none flex w-full overflow-x-auto border-b">
			<div className="divide-border grid min-w-full grid-cols-6 divide-x">
				{HERO_TABS.map((tab) => {
					const isActive = tab.id === activeTab
					return (
						<button
							key={tab.id}
							type="button"
							onClick={() => onTabChange(tab.id)}
							className={cn(
								"cursor-pointer px-3 py-3 text-center text-xs font-medium transition-colors sm:px-6 sm:py-3.5 sm:text-sm",
								isActive
									? "bg-card text-fg font-semibold"
									: "bg-fill1/40 text-fg-secondary hover:bg-fill1/80 hover:text-fg"
							)}>
							{tab.label}
						</button>
					)
				})}
			</div>
		</div>
	)
}
