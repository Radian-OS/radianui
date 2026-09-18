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
			className="border-border/60 bg-bg flex w-14 shrink-0 flex-col items-center justify-between border-r py-3 transition-colors select-none">
			{/* Top: Intercom Logo + Nav Items */}
			<div className="flex flex-col items-center gap-4">
				{/* Brand Logo */}
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
				<div className="flex flex-col items-center gap-1.5">
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
											? "bg-fill2 text-fg shadow-xs"
											: "text-fg-secondary hover:bg-fill2 hover:text-fg"
									}`}>
									<Icon className="size-5" />
								</IconButton>

								{/* Red Badge Indicator */}
								{item.badge !== undefined && (
									<span className="bg-amber absolute top-1 right-1 flex size-3.5 items-center justify-center rounded-full text-[9px] font-bold text-white shadow-xs">
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
					className="text-emerald hover:bg-fill2">
					<Radio className="size-4.5" />
				</IconButton>

				<IconButton
					type="button"
					variant="ghost"
					color="neutral"
					size="32"
					aria-label="Global search"
					className="text-fg-secondary hover:bg-fill2 hover:text-fg">
					<Search className="size-4.5" />
				</IconButton>

				<IconButton
					type="button"
					variant="ghost"
					color="neutral"
					size="32"
					aria-label="App settings"
					className="text-fg-secondary hover:bg-fill2 hover:text-fg">
					<Settings className="size-4.5" />
				</IconButton>

				{/* User Avatar */}
				<div className="bg-amber-accent text-amber-text mt-1 flex size-7 cursor-pointer items-center justify-center rounded-full text-xs font-bold">
					AS
				</div>
			</div>
		</nav>
	)
}
