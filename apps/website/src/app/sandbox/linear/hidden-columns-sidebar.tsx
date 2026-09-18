"use client"

import React, { useState } from "react"
import {
	ChevronDown,
	ChevronRight,
	CircleDashed,
	Copy,
	XCircle,
} from "lucide-react"

const hiddenColumnsList = [
	{
		id: "backlog",
		label: "Backlog",
		icon: CircleDashed,
		count: 0,
	},
	{
		id: "canceled",
		label: "Canceled",
		icon: XCircle,
		count: 0,
	},
	{
		id: "duplicate",
		label: "Duplicate",
		icon: Copy,
		count: 0,
	},
]

export function HiddenColumnsSidebar() {
	const [isOpen, setIsOpen] = useState(true)

	return (
		<div className="flex w-64 shrink-0 flex-col gap-3 pt-0.5">
			{/* Header Toggle */}
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="text-fg-secondary hover:text-fg flex cursor-pointer items-center gap-1.5 text-xs font-medium transition-colors">
				{isOpen ? (
					<ChevronDown className="size-3.5" />
				) : (
					<ChevronRight className="size-3.5" />
				)}
				<span>Hidden columns</span>
			</button>

			{/* Column items */}
			{isOpen && (
				<div className="flex flex-col gap-2">
					{hiddenColumnsList.map((item) => {
						const Icon = item.icon
						return (
							<div
								key={item.id}
								className="border-border/60 hover:bg-fill1 text-fg-secondary flex items-center justify-between rounded-lg border border-dashed px-3 py-2.5 text-sm transition-colors">
								<div className="flex items-center gap-2.5">
									<Icon className="text-fg-tertiary size-4 shrink-0" />
									<span className="font-medium">{item.label}</span>
								</div>
								<span className="text-fg-tertiary text-xs">{item.count}</span>
							</div>
						)
					})}
				</div>
			)}
		</div>
	)
}
