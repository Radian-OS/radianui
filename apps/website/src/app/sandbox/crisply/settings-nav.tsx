"use client"

import React, { useState } from "react"
import {
	Bell,
	CreditCard,
	Globe,
	SlidersHorizontal,
	Target,
	UserCheck,
	Users,
	Wrench,
} from "lucide-react"

interface SettingsNavItem {
	id: string
	label: string
	icon: React.ComponentType<{ className?: string }>
}

const generalSettings: SettingsNavItem[] = [
	{ id: "apps", label: "Apps", icon: Wrench },
	{ id: "account", label: "Account", icon: Target },
	{ id: "notification", label: "Notification", icon: Bell },
	{ id: "language", label: "Language & Region", icon: Globe },
]

const workspaceSettings: SettingsNavItem[] = [
	{ id: "general", label: "General", icon: SlidersHorizontal },
	{ id: "members", label: "Members", icon: Users },
	{ id: "billing", label: "Billing", icon: CreditCard },
]

export function CrisplySettingsNav() {
	const [activeTab, setActiveTab] = useState("account")

	return (
		<aside className="border-border/70 bg-bg w-full shrink-0 border-r p-6 md:w-60 lg:w-64">
			{/* Settings Heading (Rule 13: heading-2) */}
			<h2 className="heading-2 text-fg text-xl font-bold tracking-tight">
				Account Settings
			</h2>

			{/* General Settings Group */}
			<div className="mt-8">
				<p className="text-fg-tertiary text-[10px] font-bold uppercase tracking-wider">
					GENERAL SETTINGS
				</p>
				<nav className="mt-3 space-y-1">
					{generalSettings.map((item) => {
						const Icon = item.icon
						const isSelected = activeTab === item.id
						return (
							<button
								key={item.id}
								type="button"
								onClick={() => setActiveTab(item.id)}
								className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
									isSelected
										? "bg-fill2 text-fg shadow-2xs font-semibold"
										: "text-fg-secondary hover:bg-fill1 hover:text-fg"
								}`}>
								<Icon
									className={`size-4 shrink-0 ${
										isSelected ? "text-fg" : "text-fg-tertiary"
									}`}
								/>
								<span>{item.label}</span>
							</button>
						)
					})}
				</nav>
			</div>

			{/* Workspace Settings Group */}
			<div className="mt-8">
				<p className="text-fg-tertiary text-[10px] font-bold uppercase tracking-wider">
					WORKSPACE SETTINGS
				</p>
				<nav className="mt-3 space-y-1">
					{workspaceSettings.map((item) => {
						const Icon = item.icon
						const isSelected = activeTab === item.id
						return (
							<button
								key={item.id}
								type="button"
								onClick={() => setActiveTab(item.id)}
								className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
									isSelected
										? "bg-fill2 text-fg shadow-2xs font-semibold"
										: "text-fg-secondary hover:bg-fill1 hover:text-fg"
								}`}>
								<Icon
									className={`size-4 shrink-0 ${
										isSelected ? "text-fg" : "text-fg-tertiary"
									}`}
								/>
								<span>{item.label}</span>
							</button>
						)
					})}
				</nav>
			</div>
		</aside>
	)
}
