"use client"

import React, { useState } from "react"
import {
	BarChart2,
	BookOpen,
	Inbox,
	Radio,
	Search,
	Send,
	Settings,
	Sparkles,
	Users,
} from "lucide-react"
import Image from "next/image"
import { IconButton } from "@/styles/default/ui/button"

export function IconRail() {
	const [activeTab, setActiveTab] = useState("inbox")

	const topNavItems = [
		{ id: "inbox", icon: Inbox, label: "Inbox", badge: 5 },
		{ id: "fin-ai", icon: Sparkles, label: "Fin AI Agent" },
		{ id: "articles", icon: BookOpen, label: "Help Center" },
		{ id: "reports", icon: BarChart2, label: "Reports" },
		{ id: "outbound", icon: Send, label: "Outbound" },
		{ id: "contacts", icon: Users, label: "Contacts" },
	]

	return (
		<nav
			aria-label="Global Navigation"
			className="border-border/60 bg-elevation-level1/50 flex w-12 shrink-0 flex-col items-center justify-between border-r py-3 transition-colors select-none">
			{/* Top: Intercom Logo + Nav Items */}
			<div className="flex flex-col items-center gap-4">
				{/* Brand Logo (Rule 5: Image from public domain / favicon service) */}
				<div className="flex size-8 items-center justify-center rounded-lg bg-black p-1 shadow-xs dark:bg-white/10">
					<Image
						src="https://www.google.com/s2/favicons?sz=64&domain=intercom.com"
						alt="Intercom Logo"
						width={20}
						height={20}
						className="size-5 rounded-sm object-contain"
					/>
				</div>

				{/* Primary Icons */}
				<div className="flex flex-col items-center gap-1">
					{topNavItems.map((item) => {
						const Icon = item.icon
						const isActive = activeTab === item.id
						return (
							<div key={item.id} className="relative">
								<IconButton
									type="button"
									variant="ghost"
									color={isActive ? "primary" : "neutral"}
									size="36"
									aria-label={item.label}
									onClick={() => setActiveTab(item.id)}
									className={`rounded-lg transition-colors ${
										isActive
											? "bg-elevation-level2 text-fg"
											: "text-fg-muted hover:bg-elevation-level2/60 hover:text-fg"
									}`}>
									<Icon className="size-4.5" />
								</IconButton>

								{/* Red Badge Indicator */}
								{item.badge !== undefined && (
									<span className="absolute top-1.5 right-1.5 flex size-3.5 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-white shadow-xs">
										{item.badge}
									</span>
								)}
							</div>
						)
					})}
				</div>
			</div>

			{/* Bottom: Status, Search, Settings, Profile */}
			<div className="flex flex-col items-center gap-1.5">
				{/* Agent online radio badge */}
				<IconButton
					type="button"
					variant="ghost"
					color="neutral"
					size="32"
					aria-label="Agent status: Active"
					className="text-emerald-500 hover:text-emerald-600">
					<Radio className="size-4" />
				</IconButton>

				<IconButton
					type="button"
					variant="ghost"
					color="neutral"
					size="32"
					aria-label="Global search"
					className="text-fg-muted hover:text-fg">
					<Search className="size-4" />
				</IconButton>

				<IconButton
					type="button"
					variant="ghost"
					color="neutral"
					size="32"
					aria-label="App settings"
					className="text-fg-muted hover:text-fg">
					<Settings className="size-4" />
				</IconButton>

				{/* User Avatar */}
				<div className="mt-1 flex size-7 cursor-pointer items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-700 dark:text-amber-300">
					AS
				</div>
			</div>
		</nav>
	)
}
