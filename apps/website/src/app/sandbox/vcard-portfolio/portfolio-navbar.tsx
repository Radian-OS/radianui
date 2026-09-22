"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { NAV_TABS, type NavTab } from "./types"

interface PortfolioNavbarProps {
	activeTab: NavTab
	onSelectTab: (tab: NavTab) => void
}

export function PortfolioNavbar({
	activeTab,
	onSelectTab,
}: PortfolioNavbarProps) {
	return (
		<nav className="border-border/60 bg-elevation-level1/60 flex items-center rounded-tr-3xl rounded-bl-2xl border-b border-l px-5 py-3 sm:px-7">
			<ul className="flex flex-wrap items-center gap-5 sm:gap-8">
				{NAV_TABS.map((tab) => {
					const isActive = tab.id === activeTab
					return (
						<li key={tab.id}>
							<button
								type="button"
								onClick={() => onSelectTab(tab.id)}
								className={cn(
									"cursor-pointer text-xs font-medium transition-colors hover:text-amber-400 sm:text-sm",
									isActive
										? "font-semibold text-amber-400"
										: "text-fg-secondary"
								)}>
								{tab.label}
							</button>
						</li>
					)
				})}
			</ul>
		</nav>
	)
}
