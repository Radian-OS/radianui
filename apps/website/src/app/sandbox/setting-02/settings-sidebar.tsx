"use client"

import React from "react"
import {
	BarChart3,
	Bell,
	Blocks,
	CircleUser,
	CreditCard,
	Database,
	HardDrive,
	HeartHandshake,
	LineChart,
	Lock,
	Mic,
	Search,
	Settings,
	SlidersHorizontal,
	Users,
	X,
} from "lucide-react"
import { IconButton } from "@/styles/default/ui/button"
import { Input, InputWrapper } from "@/styles/default/ui/input"
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/styles/default/ui/sidebar"
import { SETTINGS_NAV_ITEMS } from "./types"

interface SettingsSidebarProps {
	activeTab: string
	onSelectTab: (tabId: string) => void
	searchQuery: string
	onSearchChange: (query: string) => void
	onClose?: () => void
}

const TAB_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
	general: Settings,
	notifications: Bell,
	personalization: SlidersHorizontal,
	plugins: Blocks,
	voice: Mic,
	billing: CreditCard,
	usage: BarChart3,
	analytics: LineChart,
	"data-controls": Database,
	storage: HardDrive,
	"safety-wellbeing": HeartHandshake,
	"security-login": Lock,
	"parental-controls": Users,
	account: CircleUser,
}

export function SettingsSidebar({
	activeTab,
	onSelectTab,
	searchQuery,
	onSearchChange,
	onClose,
}: SettingsSidebarProps) {
	const filteredItems = SETTINGS_NAV_ITEMS.filter((item) =>
		item.label.toLowerCase().includes(searchQuery.toLowerCase())
	)

	return (
		<Sidebar
			collapsible="none"
			className="border-border bg-sidebar h-full w-60 shrink-0 border-r">
			<SidebarHeader className="gap-2.5 p-3">
				<div className="flex items-center">
					<IconButton
						variant="ghost"
						color="neutral"
						size="32"
						aria-label="Close"
						onClick={onClose}>
						<X className="text-sidebar-fg size-4" />
					</IconButton>
				</div>
				<InputWrapper size="32">
					<Search className="text-sidebar-fg/60 size-4" />
					<Input
						placeholder="Search settings"
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
					/>
				</InputWrapper>
			</SidebarHeader>

			<SidebarContent className="px-2 py-1">
				<SidebarGroup className="p-0">
					<SidebarGroupContent>
						<SidebarMenu>
							{filteredItems.map((item) => {
								const Icon = TAB_ICONS[item.id] || Settings
								const isActive = activeTab === item.id

								return (
									<SidebarMenuItem key={item.id}>
										<SidebarMenuButton
											size="32"
											variant="neutral"
											isActive={isActive}
											onClick={() => onSelectTab(item.id)}>
											<Icon className="text-sidebar-fg size-4 shrink-0" />
											<span className="text-sidebar-fg text-sm font-medium">
												{item.label}
											</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}
