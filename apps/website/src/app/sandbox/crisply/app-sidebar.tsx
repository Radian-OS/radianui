"use client"

import React, { useState } from "react"
import {
	BarChart3,
	Bell,
	Building2,
	Calendar,
	CheckSquare,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronsUpDown,
	Contact,
	FileText,
	LayoutDashboard,
	LayoutGrid,
	Mail,
	Settings,
	Waves,
} from "lucide-react"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/styles/default/ui/sidebar"

interface NavItem {
	label: string
	icon: React.ComponentType<{ className?: string }>
	hasSubmenu?: boolean
	isActive?: boolean
}

const mainNavItems: NavItem[] = [
	{ label: "Dashboard", icon: LayoutDashboard },
	{ label: "Notifications", icon: Bell },
	{ label: "Notes", icon: FileText },
	{ label: "Tasks", icon: CheckSquare },
	{ label: "Emails", icon: Mail, hasSubmenu: true },
	{ label: "Calendars", icon: Calendar },
]

const databaseNavItems: NavItem[] = [
	{ label: "Analytics", icon: BarChart3 },
	{ label: "Contacts", icon: Contact },
	{ label: "Companies", icon: Building2 },
]

const utilityNavItems: NavItem[] = [
	{ label: "Integrations", icon: LayoutGrid },
	{ label: "Settings", icon: Settings, isActive: true },
]

export function CrisplyAppSidebar() {
	const [activeItem, setActiveItem] = useState("Settings")

	return (
		<Sidebar
			theme="gray"
			collapsible="icon"
			className="border-border/80 bg-bg text-fg border-r">
			{/* Brand Header */}
			<SidebarHeader className="border-border/60 flex flex-row items-center justify-between border-b px-4 py-3.5">
				<div className="flex items-center gap-2.5">
					<div className="bg-black-inverse text-white-inverse shadow-xs flex size-7 items-center justify-center rounded-lg">
						<Waves className="size-4" />
					</div>
					<span className="font-heading text-fg text-base font-bold tracking-tight group-data-[state=collapsed]:hidden">
						Crisply
					</span>
				</div>

				{/* History Navigation Buttons */}
				<div className="text-fg-tertiary flex items-center gap-1 group-data-[state=collapsed]:hidden">
					<button
						type="button"
						aria-label="Previous page"
						className="hover:bg-fill2 hover:text-fg flex size-6 items-center justify-center rounded-sm">
						<ChevronLeft className="size-3.5" />
					</button>
					<button
						type="button"
						aria-label="Next page"
						className="hover:bg-fill2 hover:text-fg flex size-6 items-center justify-center rounded-sm">
						<ChevronRight className="size-3.5" />
					</button>
				</div>
			</SidebarHeader>

			{/* Main Navigation Content */}
			<SidebarContent className="space-y-4 px-2 py-3">
				{/* Top Menu Items (Rule 18: mapped array) */}
				<SidebarGroup className="p-0">
					<SidebarGroupContent>
						<SidebarMenu className="space-y-0.5">
							{mainNavItems.map((item) => {
								const Icon = item.icon
								const isSelected = activeItem === item.label
								return (
									<SidebarMenuItem key={item.label}>
										<SidebarMenuButton
											isActive={isSelected}
											tooltip={item.label}
											onClick={() => setActiveItem(item.label)}
											className="text-fg-secondary hover:bg-fill2 hover:text-fg flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-medium">
											<div className="flex items-center gap-2.5">
												<Icon className="text-fg-tertiary size-4 shrink-0" />
												<span>{item.label}</span>
											</div>
											{item.hasSubmenu && (
												<ChevronDown className="text-fg-tertiary size-3" />
											)}
										</SidebarMenuButton>
									</SidebarMenuItem>
								)
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{/* Database Section */}
				<SidebarGroup className="p-0">
					<SidebarGroupLabel className="text-fg-tertiary px-2.5 text-[10px] font-bold uppercase tracking-wider group-data-[state=collapsed]:hidden">
						DATABASE
					</SidebarGroupLabel>
					<SidebarGroupContent className="mt-1">
						<SidebarMenu className="space-y-0.5">
							{databaseNavItems.map((item) => {
								const Icon = item.icon
								const isSelected = activeItem === item.label
								return (
									<SidebarMenuItem key={item.label}>
										<SidebarMenuButton
											isActive={isSelected}
											tooltip={item.label}
											onClick={() => setActiveItem(item.label)}
											className="text-fg-secondary hover:bg-fill2 hover:text-fg flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-medium">
											<Icon className="text-fg-tertiary size-4 shrink-0" />
											<span>{item.label}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{/* Utility Items (Integrations & Settings) */}
				<SidebarGroup className="p-0">
					<SidebarGroupContent>
						<SidebarMenu className="space-y-0.5">
							{utilityNavItems.map((item) => {
								const Icon = item.icon
								const isSelected = activeItem === item.label
								return (
									<SidebarMenuItem key={item.label}>
										<SidebarMenuButton
											isActive={isSelected}
											tooltip={item.label}
											onClick={() => setActiveItem(item.label)}
											className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
												isSelected
													? "bg-fill2 text-fg shadow-2xs font-semibold"
													: "text-fg-secondary hover:bg-fill2 hover:text-fg"
											}`}>
											<Icon
												className={`size-4 shrink-0 ${
													isSelected ? "text-fg" : "text-fg-tertiary"
												}`}
											/>
											<span>{item.label}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			{/* Footer: Workspace Selector */}
			<SidebarFooter className="border-border/60 border-t p-3">
				<button
					type="button"
					className="border-border/70 bg-fill1 hover:bg-fill2 flex w-full items-center justify-between rounded-lg border p-2 text-left transition-colors">
					<div className="flex items-center gap-2">
						<div className="bg-fill3 text-fg flex size-6 shrink-0 items-center justify-center rounded-sm font-mono text-xs font-bold">
							M
						</div>
						<div className="text-fg truncate text-xs font-semibold group-data-[state=collapsed]:hidden">
							Marketing Team&apos;s
						</div>
					</div>
					<ChevronsUpDown className="text-fg-tertiary size-3.5 shrink-0 group-data-[state=collapsed]:hidden" />
				</button>
			</SidebarFooter>
		</Sidebar>
	)
}
