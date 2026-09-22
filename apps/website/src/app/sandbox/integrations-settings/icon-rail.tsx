"use client"

import React from "react"
import {
	BarChart2,
	Bell,
	CheckSquare,
	Folder,
	Home,
	Send,
	Settings,
	Users,
	Zap,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import { Badge } from "@/styles/default/ui/badge"
import { IconButton } from "@/styles/default/ui/button"

interface IconRailProps {
	activeRailItem?: string
	onSelectRailItem?: (item: string) => void
	onToggleSidebar?: () => void
}

const RAIL_NAV_ITEMS = [
	{ id: "home", label: "Home", icon: Home },
	{ id: "analytics", label: "Analytics", icon: BarChart2 },
	{ id: "tasks", label: "Tasks", icon: CheckSquare },
	{ id: "messages", label: "Messages", icon: Send },
	{ id: "users", label: "Users", icon: Users },
	{ id: "folders", label: "Folders", icon: Folder },
	{ id: "settings", label: "Settings", icon: Settings },
]

export function IconRail({
	activeRailItem = "settings",
	onSelectRailItem,
	onToggleSidebar,
}: IconRailProps) {
	return (
		<aside className="border-border bg-card flex w-16 shrink-0 flex-col items-center justify-between border-r py-4">
			{/* Top Brand & Main Navigation */}
			<div className="flex flex-col items-center gap-6">
				{/* Brand Logo */}
				<div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-500 text-white shadow-sm">
					<Zap className="size-5 fill-white text-white" />
				</div>

				{/* Nav Icons */}
				<nav
					className="flex flex-col items-center gap-1.5"
					aria-label="Main Navigation">
					{RAIL_NAV_ITEMS.map((item) => {
						const Icon = item.icon
						const isActive = activeRailItem === item.id

						return (
							<IconButton
								key={item.id}
								variant={isActive ? "soft" : "ghost"}
								color={isActive ? "primary" : "neutral"}
								size="36"
								aria-label={item.label}
								onClick={() => {
									onSelectRailItem?.(item.id)
									if (item.id === "settings") {
										onToggleSidebar?.()
									}
								}}
								className={isActive ? "text-primary" : "text-fg-secondary"}>
								<Icon className="size-5" />
							</IconButton>
						)
					})}
				</nav>
			</div>

			{/* Bottom Controls: Notifications and Avatar */}
			<div className="flex flex-col items-center gap-4">
				{/* Notifications with badge */}
				<div className="relative">
					<IconButton
						variant="ghost"
						color="neutral"
						size="36"
						aria-label="Notifications">
						<Bell className="text-fg-secondary size-5" />
					</IconButton>
					<Badge
						color="primary"
						size="20"
						className="pointer-events-none absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full p-0 text-[10px] font-semibold text-white">
						2
					</Badge>
				</div>

				{/* User Avatar */}
				<Avatar size="36" rounded="circle" className="border-border border">
					<AvatarImage src="/sandbox/placeholder.svg" alt="User avatar" />
					<AvatarFallback className="text-xs font-semibold">OR</AvatarFallback>
				</Avatar>
			</div>
		</aside>
	)
}
