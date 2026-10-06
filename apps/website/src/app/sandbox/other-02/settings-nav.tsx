"use client"

import React, { useState } from "react"
import {
	Bell,
	CreditCard,
	Globe,
	SlidersHorizontal,
	Target,
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
		<aside className="border-border/70 bg-bg w-full shrink-0 border-r p-6 select-none md:w-60 lg:w-64">
			{/* Settings Heading */}
			<h2 className="heading-5 text-fg">Account Settings</h2>

			{/* General Settings Group */}
			<div className="mt-8">
				<p className="text-fg-secondary text-xs font-semibold tracking-wider uppercase">
					General Settings
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
								className={`flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
									isSelected
										? "bg-fill2 text-fg font-semibold shadow-xs"
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
				<p className="text-fg-secondary text-xs font-semibold tracking-wider uppercase">
					Workspace Settings
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
								className={`flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
									isSelected
										? "bg-fill2 text-fg font-semibold shadow-xs"
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
