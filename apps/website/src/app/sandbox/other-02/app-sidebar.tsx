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
import { IconButton } from "@/styles/default/ui/button"
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
			style={
				{
					"--color-sidebar-accent": "var(--color-fill2)",
				} as React.CSSProperties
			}
			className="border-border/80 bg-bg text-sidebar-fg border-r select-none">
			{/* Brand Header */}
			<SidebarHeader className="border-border/60 flex flex-row items-center justify-between border-b px-4 py-3.5">
				<div className="flex items-center gap-2.5">
					<div className="bg-black-inverse text-white-inverse flex size-7 items-center justify-center rounded-lg shadow-xs">
						<Waves className="size-4" />
					</div>
					<span className="font-heading text-fg text-base font-bold tracking-tight group-data-[state=collapsed]:hidden">
						Crisply
					</span>
				</div>

				{/* History Navigation Buttons */}
				<div className="flex items-center gap-0.5 group-data-[state=collapsed]:hidden">
					<IconButton
						type="button"
						variant="ghost"
						color="neutral"
						size="28"
						aria-label="Previous page"
						className="text-fg-secondary hover:text-fg">
						<ChevronLeft className="size-3.5" />
					</IconButton>
					<IconButton
						type="button"
						variant="ghost"
						color="neutral"
						size="28"
						aria-label="Next page"
						className="text-fg-secondary hover:text-fg">
						<ChevronRight className="size-3.5" />
					</IconButton>
				</div>
			</SidebarHeader>

			{/* Main Navigation Content */}
			<SidebarContent className="space-y-4 px-2 py-3">
				{/* Top Menu Items */}
				<SidebarGroup className="p-0">
					<SidebarGroupContent>
						<SidebarMenu className="space-y-0.5">
							{mainNavItems.map((item) => {
								const Icon = item.icon
								const isSelected = activeItem === item.label
								return (
									<SidebarMenuItem key={item.label}>
										<SidebarMenuButton
											size="32"
											isActive={isSelected}
											tooltip={item.label}
											onClick={() => setActiveItem(item.label)}>
											<Icon className="size-4" />
											<span className="truncate">{item.label}</span>
											{item.hasSubmenu && (
												<ChevronDown className="text-fg-tertiary ml-auto size-3.5" />
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
					<SidebarGroupLabel className="text-fg-secondary px-2 text-xs font-semibold tracking-wider uppercase group-data-[state=collapsed]:hidden">
						Database
					</SidebarGroupLabel>
					<SidebarGroupContent className="mt-1">
						<SidebarMenu className="space-y-0.5">
							{databaseNavItems.map((item) => {
								const Icon = item.icon
								const isSelected = activeItem === item.label
								return (
									<SidebarMenuItem key={item.label}>
										<SidebarMenuButton
											size="32"
											isActive={isSelected}
											tooltip={item.label}
											onClick={() => setActiveItem(item.label)}>
											<Icon className="size-4" />
											<span className="truncate">{item.label}</span>
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
											size="32"
											isActive={isSelected}
											tooltip={item.label}
											onClick={() => setActiveItem(item.label)}>
											<Icon className="size-4" />
											<span className="truncate">{item.label}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			{/* Footer: Workspace Selector */}
			<SidebarFooter className="border-border/60 border-t p-2.5">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="36"
							className="hover:bg-fill2 w-full justify-between">
							<div className="flex items-center gap-2 truncate">
								<div className="bg-fill3 text-fg flex size-6 shrink-0 items-center justify-center rounded-sm font-mono text-xs font-bold">
									M
								</div>
								<span className="text-fg truncate text-xs font-semibold group-data-[state=collapsed]:hidden">
									Marketing Team&apos;s
								</span>
							</div>
							<ChevronsUpDown className="text-fg-tertiary ml-auto size-3.5 shrink-0 group-data-[state=collapsed]:hidden" />
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	)
}
