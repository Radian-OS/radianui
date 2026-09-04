"use client"

import React from "react"
import { OmrixDashboardActivity } from "./dashboard-activity"
import { OmrixDashboardChart } from "./dashboard-chart"
import { OmrixDashboardHeader } from "./dashboard-header"
import { OmrixDashboardMetrics } from "./dashboard-metrics"
import { OmrixDashboardSidebar } from "./dashboard-sidebar"
import { OmrixDashboardTable } from "./dashboard-table"

export function OmrixDashboardMockup() {
	return (
		<div className="border-border/80 bg-background relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border shadow-2xl">
			{/* Main Layout Flex Container */}
			<div className="flex flex-col md:flex-row">
				{/* Sidebar */}
				<OmrixDashboardSidebar />

				{/* Main Content Area */}
				<div className="flex min-w-0 flex-1 flex-col">
					{/* Header */}
					<OmrixDashboardHeader />

					{/* Body Content */}
					<div className="space-y-4.5 p-4 sm:p-6">
						{/* 3 Metric Cards */}
						<OmrixDashboardMetrics />

						{/* Middle Row: Chart & Live Activity */}
						<div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
							<div className="lg:col-span-3">
								<OmrixDashboardChart />
							</div>
							<div className="lg:col-span-2">
								<OmrixDashboardActivity />
							</div>
						</div>

						{/* Active Workflows Table */}
						<OmrixDashboardTable />
					</div>
				</div>
			</div>

			{/* Soft Atmosphere Bottom Fade */}
			<div className="from-background via-background/60 pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t to-transparent" />
		</div>
	)
}
