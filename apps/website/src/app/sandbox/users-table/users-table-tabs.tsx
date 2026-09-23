"use client"

import React from "react"
import { cn } from "@/lib/utils"
import type { AccountType } from "./types"

export type UserTab = "all" | AccountType

interface UsersTableTabsProps {
	activeTab: UserTab
	onTabChange: (tab: UserTab) => void
}

export function UsersTableTabs({
	activeTab,
	onTabChange,
}: UsersTableTabsProps) {
	const tabs: { key: UserTab; label: string }[] = [
		{ key: "all", label: "All" },
		{ key: "valid", label: "Valid accounts" },
		{ key: "fake", label: "Fake accounts" },
	]

	return (
		<div className="border-border/60 flex items-center gap-6 border-b">
			{tabs.map((tab) => {
				const isActive = activeTab === tab.key
				return (
					<button
						key={tab.key}
						type="button"
						onClick={() => onTabChange(tab.key)}
						className={cn(
							"relative pb-3 text-xs transition-colors",
							isActive
								? "text-foreground font-semibold"
								: "text-fg-secondary hover:text-foreground font-medium"
						)}>
						<span>{tab.label}</span>
						{isActive && (
							<span className="bg-foreground absolute right-0 bottom-0 left-0 h-0.5 rounded-full" />
						)}
					</button>
				)
			})}
		</div>
	)
}
