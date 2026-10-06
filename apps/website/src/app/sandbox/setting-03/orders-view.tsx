"use client"

import React, { useMemo, useState } from "react"
import { SidebarProvider } from "@/styles/default/ui/sidebar"
import { OrdersSidebar } from "./orders-sidebar"
import { OrdersHeader } from "./orders-header"
import { OrdersMetrics } from "./orders-metrics"
import { OrdersFilters } from "./orders-filters"
import { OrdersTable } from "./orders-table"
import { OrdersPagination } from "./orders-pagination"
import { SAMPLE_ORDERS } from "./types"

export function OrdersView() {
	const [searchQuery, setSearchQuery] = useState("")

	const filteredOrders = useMemo(() => {
		if (!searchQuery.trim()) return SAMPLE_ORDERS
		const q = searchQuery.toLowerCase()
		return SAMPLE_ORDERS.filter(
			(order) =>
				order.id.toLowerCase().includes(q) ||
				order.customer.name.toLowerCase().includes(q) ||
				order.purchased.toLowerCase().includes(q)
		)
	}, [searchQuery])

	return (
		<SidebarProvider defaultOpen className="bg-bg min-h-screen w-full">
			<div className="flex w-full">
				{/* Sidebar */}
				<OrdersSidebar />

				{/* Main Content Area */}
				<main className="bg-bg flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
					<div className="mx-auto flex max-w-7xl flex-col gap-6">
						<OrdersHeader />
						<OrdersMetrics />
						<OrdersFilters
							searchQuery={searchQuery}
							onSearchChange={setSearchQuery}
						/>
						<OrdersTable orders={filteredOrders} />
						<OrdersPagination />
					</div>
				</main>
			</div>
		</SidebarProvider>
	)
}
