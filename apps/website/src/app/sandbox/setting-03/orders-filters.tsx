"use client"

import React, { useState } from "react"
import { Calendar, ChevronDown, Download, Filter, Search } from "lucide-react"
import { Button } from "@/styles/default/ui/button"

interface OrdersFiltersProps {
	searchQuery: string
	onSearchChange: (query: string) => void
}

export function OrdersFilters({
	searchQuery,
	onSearchChange,
}: OrdersFiltersProps) {
	const [status, setStatus] = useState("All Status")

	return (
		<div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
			{/* Left controls: Search & Date Pills */}
			<div className="flex flex-1 flex-wrap items-center gap-2.5">
				{/* Search Input Box */}
				<div className="relative min-w-[220px] flex-1 sm:max-w-xs">
					<Search className="text-fg-secondary absolute top-1/2 left-3 size-4 -translate-y-1/2" />
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
						placeholder="Search orders..."
						className="border-border bg-card text-fg placeholder:text-fg-secondary/60 focus:border-primary-border h-9 w-full rounded-lg border pr-3 pl-9 text-sm focus:outline-none"
					/>
				</div>

				{/* Range Dropdown 1 */}
				<Button
					variant="outline"
					color="neutral"
					size="36"
					className="gap-2 text-xs font-normal">
					<span>Last 7 days</span>
					<ChevronDown className="text-fg-secondary size-3.5" />
				</Button>

				{/* Range Dropdown 2 */}
				<Button
					variant="outline"
					color="neutral"
					size="36"
					className="gap-2 text-xs font-normal">
					<Calendar className="text-fg-secondary size-3.5" />
					<span>Feb 04 - Feb 11, 2024</span>
				</Button>
			</div>

			{/* Right controls: Status filter, Filter button, Export */}
			<div className="flex flex-wrap items-center gap-2">
				<Button
					variant="outline"
					color="neutral"
					size="36"
					className="gap-2 text-xs font-normal">
					<span>{status}</span>
					<ChevronDown className="text-fg-secondary size-3.5" />
				</Button>

				<Button
					variant="outline"
					color="neutral"
					size="36"
					className="gap-1.5 text-xs font-normal">
					<Filter className="text-fg-secondary size-3.5" />
					<span>Filter</span>
				</Button>

				<Button
					variant="outline"
					color="neutral"
					size="36"
					className="gap-1.5 text-xs font-normal">
					<Download className="text-fg-secondary size-3.5" />
					<span>Export</span>
				</Button>
			</div>
		</div>
	)
}
