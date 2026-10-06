"use client"

import React, { useState } from "react"
import {
	AlertTriangle,
	ArrowLeft,
	Boxes,
	ChevronsLeft,
	CircleUser,
	Code2,
	CreditCard,
	KeyRound,
	Minus,
	Search,
	Settings,
	ShieldCheck,
	SlidersHorizontal,
	User,
	Users,
} from "lucide-react"
import { IconButton } from "@/styles/default/ui/button"
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/styles/default/ui/sidebar"
import { SETTINGS_SIDEBAR_GROUPS } from "./types"

interface SettingsSidebarProps {
	activeItem: string
	onSelectItem: (id: string) => void
	isOpen: boolean
	onToggleCollapse: () => void
}

const ITEM_ICONS: Record<
	string,
	React.ComponentType<{ className?: string }>
> = {
	general: Settings,
	members: User,
	teams: Users,
	"custom-fields": SlidersHorizontal,
	"plans-billing": CreditCard,
	security: ShieldCheck,
	integrations: Boxes,
	profile: CircleUser,
	password: KeyRound,
	apis: Code2,
	"danger-zone": AlertTriangle,
}

export function SettingsSidebar({
	activeItem,
	onSelectItem,
	isOpen,
	onToggleCollapse,
}: SettingsSidebarProps) {
	const [collapsedGroups, setCollapsedGroups] = useState<
		Record<string, boolean>
	>({})

	const toggleGroup = (groupId: string) => {
		setCollapsedGroups((prev) => ({
			...prev,
			[groupId]: !prev[groupId],
		}))
	}

	if (!isOpen) {
		return null
	}

	return (
		<Sidebar
			collapsible="none"
			className="border-border bg-sidebar h-full w-60 shrink-0 border-r transition-all duration-300">
			{/* Top Header */}
			<SidebarHeader className="border-sidebar-border border-b px-3 py-3">
				<div className="flex items-center justify-between">
					<button
						type="button"
						onClick={onToggleCollapse}
						className="text-sidebar-fg hover:text-fg flex items-center gap-1.5 text-sm font-semibold transition-colors">
						<ArrowLeft className="size-4" />
						<span>Settings</span>
					</button>

					<div className="flex items-center gap-1">
						<IconButton
							variant="ghost"
							color="neutral"
							size="28"
							aria-label="Search settings">
							<Search className="text-sidebar-fg/70 size-3.5" />
						</IconButton>
						<IconButton
							variant="ghost"
							color="neutral"
							size="28"
							aria-label="Collapse sidebar"
							onClick={onToggleCollapse}>
							<ChevronsLeft className="text-sidebar-fg/70 size-4" />
						</IconButton>
					</div>
				</div>
			</SidebarHeader>

			{/* Groups Content */}
			<SidebarContent className="px-2 py-3">
				{SETTINGS_SIDEBAR_GROUPS.map((group) => {
					const isGroupCollapsed = collapsedGroups[group.id]

					return (
						<SidebarGroup key={group.id} className="py-1">
							<div className="flex items-center justify-between px-2 py-1">
								<SidebarGroupLabel className="text-sidebar-fg/60 h-auto p-0 text-[11px] font-semibold tracking-wider uppercase">
									{group.label}
								</SidebarGroupLabel>
								<button
									type="button"
									onClick={() => toggleGroup(group.id)}
									className="text-sidebar-fg/40 hover:text-sidebar-fg"
									aria-label={`Toggle ${group.label}`}>
									<Minus className="size-3" />
								</button>
							</div>

							{!isGroupCollapsed && (
								<SidebarGroupContent className="mt-1">
									<SidebarMenu>
										{group.items.map((item) => {
											const Icon = ITEM_ICONS[item.id] || Settings
											const isActive = activeItem === item.id

											return (
												<SidebarMenuItem key={item.id}>
													<SidebarMenuButton
														size="32"
														variant={isActive ? "soft" : "neutral"}
														isActive={isActive}
														onClick={() => onSelectItem(item.id)}
														className={
															isActive
																? "text-primary [&>svg]:stroke-primary font-medium"
																: ""
														}>
														<Icon className="text-sidebar-fg size-4 shrink-0" />
														<span className="text-sm">{item.label}</span>
													</SidebarMenuButton>

													{item.badge !== undefined && (
														<SidebarMenuBadge
															variant="outline"
															color="neutral"
															size="20"
															className="text-fg-secondary text-[11px] font-semibold">
															{item.badge}
														</SidebarMenuBadge>
													)}
												</SidebarMenuItem>
											)
										})}
									</SidebarMenu>
								</SidebarGroupContent>
							)}
						</SidebarGroup>
					)
				})}
			</SidebarContent>
		</Sidebar>
	)
}
