"use client"

import React, { useMemo, useState } from "react"
import { SidebarProvider } from "@/styles/default/ui/sidebar"
import { IconRail } from "./icon-rail"
import { SettingsSidebar } from "./settings-sidebar"
import { IntegrationsHeader } from "./integrations-header"
import { IntegrationsFilters } from "./integrations-filters"
import { IntegrationsList } from "./integrations-list"
import { SAMPLE_INTEGRATIONS, type IntegrationItem } from "./types"

export function IntegrationsView() {
	const [sidebarOpen, setSidebarOpen] = useState(true)
	const [activeSettingItem, setActiveSettingItem] = useState("integrations")
	const [activeCategory, setActiveCategory] = useState("all")
	const [searchQuery, setSearchQuery] = useState("")
	const [integrations, setIntegrations] =
		useState<IntegrationItem[]>(SAMPLE_INTEGRATIONS)

	const handleToggleIntegration = (id: string, enabled: boolean) => {
		setIntegrations((prev) =>
			prev.map((item) => (item.id === id ? { ...item, enabled } : item))
		)
	}

	const filteredIntegrations = useMemo(() => {
		return integrations.filter((item) => {
			const matchesCategory =
				activeCategory === "all" || item.category === activeCategory
			const query = searchQuery.trim().toLowerCase()
			const matchesSearch =
				!query ||
				item.name.toLowerCase().includes(query) ||
				item.domain.toLowerCase().includes(query) ||
				item.description.toLowerCase().includes(query)

			return matchesCategory && matchesSearch
		})
	}, [integrations, activeCategory, searchQuery])

	return (
		<SidebarProvider defaultOpen className="bg-bg min-h-screen w-full">
			<div className="flex min-h-screen w-full">
				{/* 1. Primary Left Icon Rail */}
				<IconRail
					activeRailItem="settings"
					onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
				/>

				{/* 2. Secondary Collapsible Settings Sidebar */}
				<SettingsSidebar
					isOpen={sidebarOpen}
					onToggleCollapse={() => setSidebarOpen(false)}
					activeItem={activeSettingItem}
					onSelectItem={setActiveSettingItem}
				/>

				{/* 3. Main Content Panel */}
				<main className="bg-bg flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10">
					<div className="mx-auto flex max-w-5xl flex-col gap-6">
						<IntegrationsHeader
							isSidebarOpen={sidebarOpen}
							onToggleSidebar={() => setSidebarOpen(true)}
						/>

						<IntegrationsFilters
							activeCategory={activeCategory}
							onSelectCategory={setActiveCategory}
							searchQuery={searchQuery}
							onSearchChange={setSearchQuery}
						/>

						<IntegrationsList
							integrations={filteredIntegrations}
							onToggleIntegration={handleToggleIntegration}
						/>
					</div>
				</main>
			</div>
		</SidebarProvider>
	)
}
