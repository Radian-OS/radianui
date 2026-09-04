"use client"

import React from "react"
import {
	Activity,
	BarChart2,
	CreditCard,
	GitBranch,
	LayoutDashboard,
	Plug,
	Sparkles,
	Star,
	Users,
} from "lucide-react"

interface NavGroupItem {
	label: string
	icon: React.ComponentType<{ className?: string }>
	isActive?: boolean
}

interface NavSection {
	title: string
	items: NavGroupItem[]
}

const navSections: NavSection[] = [
	{
		title: "Overview",
		items: [
			{ label: "Dashboard", icon: LayoutDashboard, isActive: true },
			{ label: "Analytics", icon: BarChart2 },
			{ label: "Activity Log", icon: Activity },
		],
	},
	{
		title: "Automation & Processes",
		items: [
			{ label: "Workflows", icon: GitBranch },
			{ label: "Automations", icon: Sparkles },
		],
	},
	{
		title: "Connections",
		items: [{ label: "Integrations", icon: Plug }],
	},
	{
		title: "Team & Management",
		items: [{ label: "Team", icon: Users }],
	},
	{
		title: "Account & Finance",
		items: [{ label: "Billing", icon: CreditCard }],
	},
]

export function OmrixDashboardSidebar() {
	return (
		<aside className="border-border/60 bg-fill1/30 flex w-full flex-col justify-between border-r p-4 md:w-56 md:shrink-0">
			<div>
				{/* Sidebar Logo */}
				<div className="mb-6 flex items-center gap-2.5 px-2">
					<div className="bg-neutral shadow-2xs flex size-7 items-center justify-center rounded-md">
						<Star className="fill-neutral-fg text-neutral-fg size-3.5" />
					</div>
					<span className="text-foreground text-sm font-bold tracking-tight">
						OMRIX
					</span>
				</div>

				{/* Nav Groups */}
				<div className="space-y-5">
					{navSections.map((section) => (
						<div key={section.title}>
							<p className="text-fg-tertiary mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider">
								{section.title}
							</p>
							<div className="space-y-0.5">
								{section.items.map((item) => {
									const Icon = item.icon
									return (
										<button
											key={item.label}
											type="button"
											className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition-colors ${
												item.isActive
													? "bg-fill2 text-foreground shadow-2xs font-semibold"
													: "text-fg-secondary hover:bg-fill2/70 hover:text-foreground"
											}`}>
											<Icon className="size-3.5 shrink-0 opacity-80" />
											<span className="truncate">{item.label}</span>
										</button>
									)
								})}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* User Profile Footer */}
			<div className="border-border/60 mt-6 flex items-center gap-2.5 border-t px-1 pt-4">
				<div className="bg-fill3 text-fg-secondary flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
					JM
				</div>
				<div className="flex flex-col overflow-hidden text-left">
					<span className="text-foreground truncate text-xs font-medium">
						Jordan M
					</span>
					<span className="text-fg-tertiary text-[10px]">Admin</span>
				</div>
			</div>
		</aside>
	)
}
