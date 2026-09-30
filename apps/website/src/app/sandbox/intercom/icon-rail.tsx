"use client"

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
import { Avatar, AvatarFallback } from "@/styles/default/ui/avatar"
import { Badge } from "@/registry/ui/badge"

export function IconRail() {
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
			className="border-border flex w-14 shrink-0 flex-col items-center justify-between border-r py-3 transition-colors select-none">
			{/* Top: Intercom Logo + Nav Items */}
			<div className="flex flex-col items-center gap-4">
				{/* Brand Logo */}
				<div className="flex size-8 items-center justify-center rounded-lg p-1 shadow-xs">
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
						return (
							<div key={item.id} className="relative">
								<IconButton
									type="button"
									color="neutral"
									variant="ghost"
									aria-label={item.label}
									// onClick={() => setActiveTab(item.id)}
								>
									<Icon className="size-5" />
								</IconButton>

								{/* Red Badge Indicator */}
								{item.badge !== undefined && (
									<Badge
										color="warning"
										className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full text-[9px] font-bold">
										{item.badge}
									</Badge>
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
					aria-label="Agent status: Active">
					<Radio className="size-5" />
				</IconButton>

				<IconButton
					type="button"
					variant="ghost"
					color="neutral"
					aria-label="Global search">
					<Search className="size-5" />
				</IconButton>

				<IconButton
					type="button"
					variant="ghost"
					color="neutral"
					aria-label="App settings">
					<Settings className="size-5" />
				</IconButton>

				{/* User Avatar */}
				<Avatar size="32" rounded="circle" className="mt-1 cursor-pointer">
					<AvatarFallback>AS</AvatarFallback>
				</Avatar>
			</div>
		</nav>
	)
}
