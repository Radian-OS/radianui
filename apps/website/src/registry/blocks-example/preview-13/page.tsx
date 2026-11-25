"use client"

import * as React from "react"
import { useState } from "react"

import { SidebarInset, SidebarProvider } from "@/registry/ui/sidebar"

import { DashboardHeader } from "./components/dashboard-header"
import { DashboardSidebar } from "./components/dashboard-sidebar"
import { RecentTransactionsTable } from "./components/recent-transactions-table"
import { RevenueBreakdownCard } from "./components/revenue-breakdown-card"
import { SalesTrendChart } from "./components/sales-trend-chart"
import { StatMetrics } from "./components/stat-metrics"
import { WelcomeHeader } from "./components/welcome-header"

export default function Preview13Page() {
	const [activeNav, setActiveNav] = useState("Dashboard")

	return (
		<div className="text-fg font-body bg-fill1 h-screen w-full overflow-hidden">
			<SidebarProvider
				defaultOpen
				defaultWidth="15rem"
				className="flex h-screen w-full overflow-hidden bg-transparent">
				{/* Left Sidebar Navigation */}
				<DashboardSidebar activeNav={activeNav} onSelectNav={setActiveNav} />

				{/* Main Dashboard Panel */}
				<SidebarInset className="bg-bg flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
					{/* Top Breadcrumb & Search Header */}
					<DashboardHeader />

					{/* Main Scrollable Dashboard Content - Dedicated vertical scroll container */}
					<main className="bg-bg flex-1 overflow-y-auto px-4 pt-4 pb-20 md:px-6 md:pt-5 md:pb-24">
						<div className="flex w-full flex-col gap-5">
							{/* Greeting & Timeframe Controls */}
							<WelcomeHeader />

							{/* Top Metric Stats (4 Cards) */}
							<StatMetrics />

							{/* Middle Analytics Section (Sales Trend & Revenue Breakdown) */}
							<div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12">
								<div className="flex flex-col lg:col-span-8">
									<SalesTrendChart />
								</div>
								<div className="flex flex-col lg:col-span-4">
									<RevenueBreakdownCard />
								</div>
							</div>

							{/* Recent Transactions Table */}
							<RecentTransactionsTable />
						</div>
					</main>
				</SidebarInset>
			</SidebarProvider>
		</div>
	)
}
