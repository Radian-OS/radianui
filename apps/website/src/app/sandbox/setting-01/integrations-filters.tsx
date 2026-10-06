"use client"

import React from "react"
import { Search } from "lucide-react"
import { Input, InputWrapper } from "@/styles/default/ui/input"
import { INTEGRATION_CATEGORIES, type CategoryTab } from "./types"

interface IntegrationsFiltersProps {
	activeCategory: string
	onSelectCategory: (category: string) => void
	searchQuery: string
	onSearchChange: (query: string) => void
}

export function IntegrationsFilters({
	activeCategory,
	onSelectCategory,
	searchQuery,
	onSearchChange,
}: IntegrationsFiltersProps) {
	return (
		<div className="border-border/40 flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
			{/* Horizontal Tab Links */}
			<div className="no-scrollbar flex items-center gap-6 overflow-x-auto">
				{INTEGRATION_CATEGORIES.map((tab: CategoryTab) => {
					const isActive = activeCategory === tab.id

					return (
						<button
							key={tab.id}
							type="button"
							onClick={() => onSelectCategory(tab.id)}
							className={`relative pb-2 text-sm whitespace-nowrap transition-colors ${
								isActive
									? "text-primary font-semibold"
									: "text-fg-secondary hover:text-fg font-medium"
							}`}>
							{tab.label}
							{isActive && (
								<span className="bg-primary absolute inset-x-0 bottom-0 h-0.5 rounded-full" />
							)}
						</button>
					)
				})}
			</div>

			{/* Search Input */}
			<div className="w-full sm:w-64">
				<InputWrapper size="32">
					<Search className="text-fg-secondary size-4" />
					<Input
						placeholder="Search"
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
					/>
				</InputWrapper>
			</div>
		</div>
	)
}
