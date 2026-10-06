"use client"

import React from "react"
import { Search } from "lucide-react"
import { Badge } from "@/styles/default/ui/badge"
import { Button } from "@/styles/default/ui/button"
import { Input, InputAddon, InputGroup } from "@/styles/default/ui/input"
import type { FilterCategory } from "./types"

const categories: FilterCategory[] = [
	"All",
	"Product Updates",
	"Personal Finance",
	"Industry News",
	"Case Studies",
]

interface CategoryFilterProps {
	activeCategory: FilterCategory
	onSelectCategory: (category: FilterCategory) => void
	searchQuery: string
	onSearchChange: (query: string) => void
}

export function CategoryFilter({
	activeCategory,
	onSelectCategory,
	searchQuery,
	onSearchChange,
}: CategoryFilterProps) {
	return (
		<div className="flex flex-col gap-6 pt-16 pb-8">
			{/* Top Eyebrow and Heading */}
			<div className="flex flex-col items-center text-center">
				<Badge
					variant="outline"
					color="neutral"
					className="border-border bg-fill1-alpha text-fg-secondary mb-4 rounded-full px-3.5 py-1 text-xs font-medium">
					Articles
				</Badge>
				<h2 className="heading-2 text-fg">Check out our newest articles</h2>
			</div>

			{/* Filter Tabs & Search Bar */}
			<div className="mt-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
				{/* Category Pills (Rule: render via .map) */}
				<div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
					{categories.map((cat) => {
						const isActive = activeCategory === cat
						return (
							<Button
								key={cat}
								variant={isActive ? "strong" : "ghost"}
								color="neutral"
								size="32"
								onClick={() => onSelectCategory(cat)}
								className={`rounded-full px-4 text-xs font-medium transition-colors ${
									isActive
										? "bg-fg text-bg hover:bg-fg/90"
										: "text-fg-secondary hover:text-fg hover:bg-fill1-alpha"
								}`}>
								{cat}
							</Button>
						)
					})}
				</div>

				{/* Search Input Bar */}
				<div className="w-full md:w-72">
					<InputGroup className="w-full">
						<InputAddon
							size="36"
							className="text-fg-tertiary border-e-0 bg-transparent ps-3 pe-0">
							<Search className="size-4" />
						</InputAddon>
						<Input
							size="36"
							type="text"
							placeholder="Search articles, keyword..."
							value={searchQuery}
							onChange={(e) => onSearchChange(e.target.value)}
							className="placeholder:text-fg-tertiary border-s-0 bg-transparent text-sm"
						/>
					</InputGroup>
				</div>
			</div>
		</div>
	)
}
