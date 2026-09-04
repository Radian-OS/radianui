"use client"

import React from "react"
import { AlertTriangle, FileCheck, PhoneCall, Settings } from "lucide-react"

interface ActivityEventItem {
	title: string
	description: string
	icon: React.ComponentType<{ className?: string }>
	iconContainerClass: string
	iconClass: string
}

const activityEvents: ActivityEventItem[] = [
	{
		title: "Lead Nurture",
		description: "Successfully processed 24 contacts",
		icon: PhoneCall,
		iconContainerClass: "bg-amber-accent border-amber-border/30",
		iconClass: "text-amber-text",
	},
	{
		title: "Invoice Sync",
		description: "Rate limit approaching threshold",
		icon: AlertTriangle,
		iconContainerClass: "bg-warning-accent border-warning-border/30",
		iconClass: "text-warning-text",
	},
	{
		title: "Client Onboarding",
		description: "New automation triggered",
		icon: Settings,
		iconContainerClass: "bg-cyan-accent border-cyan-border/30",
		iconClass: "text-cyan-text",
	},
	{
		title: "Weekly Report",
		description: "Analytics summary ready",
		icon: FileCheck,
		iconContainerClass: "bg-purple-accent border-purple-border/30",
		iconClass: "text-purple-text",
	},
]

export function OmrixDashboardActivity() {
	return (
		<div className="border-border/60 bg-fill1/20 p-4.5 flex flex-col justify-between rounded-xl border">
			{/* Header */}
			<div className="mb-4">
				<h3 className="text-foreground text-sm font-semibold">Live Activity</h3>
				<p className="text-fg-tertiary text-[11px]">Recent events</p>
			</div>

			{/* Events list */}
			<div className="space-y-3">
				{activityEvents.map((item) => {
					const Icon = item.icon
					return (
						<div key={item.title} className="flex items-center gap-3">
							<div
								className={`shadow-2xs flex size-8 shrink-0 items-center justify-center rounded-lg border ${item.iconContainerClass}`}>
								<Icon className={`size-4 ${item.iconClass}`} />
							</div>
							<div className="flex flex-col overflow-hidden text-left">
								<span className="text-foreground truncate text-xs font-semibold">
									{item.title}
								</span>
								<span className="text-fg-tertiary truncate text-[11px]">
									{item.description}
								</span>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
