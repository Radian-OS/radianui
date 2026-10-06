"use client"

import React, { useState } from "react"
import { Card } from "@/styles/default/ui/card"
import { SidebarProvider } from "@/styles/default/ui/sidebar"
import { SettingsSidebar } from "./settings-sidebar"
import { SettingsGeneral } from "./settings-general"
import { SETTINGS_NAV_ITEMS } from "./types"

export function ChatgptSettings() {
	const [activeTab, setActiveTab] = useState("general")
	const [searchQuery, setSearchQuery] = useState("")

	const currentTabItem = SETTINGS_NAV_ITEMS.find(
		(item) => item.id === activeTab
	)

	return (
		<div className="flex min-h-[680px] w-full items-center justify-center p-4 sm:p-6 lg:p-8">
			<Card className="border-border bg-card h-[600px] w-full max-w-[840px] gap-0 overflow-hidden rounded-2xl border p-0 shadow-2xl">
				<SidebarProvider
					defaultOpen
					className="flex h-full min-h-0 w-full flex-row">
					<SettingsSidebar
						activeTab={activeTab}
						onSelectTab={setActiveTab}
						searchQuery={searchQuery}
						onSearchChange={setSearchQuery}
					/>

					{activeTab === "general" ? (
						<SettingsGeneral />
					) : (
						<div className="bg-card flex flex-1 flex-col overflow-y-auto">
							<div className="border-border/40 flex items-center justify-between border-b px-6 py-4">
								<h2 className="heading-4 text-fg">
									{currentTabItem?.label || "Settings"}
								</h2>
							</div>
							<div className="flex flex-1 items-center justify-center p-8">
								<p className="text-fg-secondary text-sm">
									Settings for {currentTabItem?.label} are managed here.
								</p>
							</div>
						</div>
					)}
				</SidebarProvider>
			</Card>
		</div>
	)
}
