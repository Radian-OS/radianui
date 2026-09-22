"use client"

import React from "react"
import { Bell, History, Plus, Search } from "lucide-react"
import { Button } from "@/styles/default/ui/button"

export function OrdersHeader() {
	return (
		<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			{/* Title & History */}
			<div className="flex items-center gap-3">
				<Button
					variant="outline"
					color="neutral"
					size="36"
					className="text-fg-secondary hover:text-foreground size-9 p-0">
					<History className="size-4" />
				</Button>
				<div>
					<h1 className="heading-3 text-foreground">Orders</h1>
					<p className="text-fg-secondary text-xs sm:text-sm">
						Manage and track your orders
					</p>
				</div>
			</div>

			{/* Right Actions */}
			<div className="flex items-center gap-2">
				<Button
					variant="ghost"
					color="neutral"
					size="36"
					className="text-fg-secondary hover:text-foreground size-9 p-0">
					<Search className="size-4" />
				</Button>

				<Button
					variant="ghost"
					color="neutral"
					size="36"
					className="text-fg-secondary hover:text-foreground relative size-9 p-0">
					<Bell className="size-4" />
					<span className="absolute top-2 right-2 size-2 rounded-full bg-orange-500" />
				</Button>

				<Button
					variant="strong"
					color="primary"
					size="36"
					className="gap-1.5 bg-gradient-to-r from-amber-600 to-orange-500 font-medium text-white shadow-xs hover:from-amber-500 hover:to-orange-400">
					<Plus className="size-4" />
					<span>New Products</span>
				</Button>
			</div>
		</div>
	)
}
