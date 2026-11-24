"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import RadianLogo from "@/registry/blocks-example/signup/components/radian-logo"
import { IconSlot } from "@/registry/icon/icon-library"
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	AvatarIndicator,
} from "@/registry/ui/avatar"
import { IconButton } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"
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
} from "@/registry/ui/sidebar"

interface DashboardSidebarProps {
	activeNav: string
	onSelectNav: (nav: string) => void
}

export function DashboardSidebar({
	activeNav,
	onSelectNav,
}: DashboardSidebarProps) {
	return (
		<Sidebar
			collapsible="none"
			className="bg-fill2 dark:bg-fill1 sticky top-0 flex h-screen w-60 shrink-0 flex-col justify-between border-0 p-3 select-none"
			style={
				{
					"--color-sidebar": "var(--color-fill2)",
				} as React.CSSProperties
			}>
			{/* Top Brand Header Card */}
			<SidebarHeader className="p-0">
				<Card className="border-border/70 bg-elevation-level1 flex flex-row items-center justify-between gap-0 p-2.5 shadow-2xs">
					<div className="flex min-w-0 items-center gap-2.5">
						<div className="flex size-8 shrink-0 items-center justify-center">
							<RadianLogo width={30} height={30} />
						</div>
						<div className="flex flex-col truncate text-left">
							<span className="text-fg-tertiary text-xs leading-tight font-medium">
								Agency
							</span>
							<span className="font-heading text-fg truncate text-sm leading-tight font-semibold">
								Spark Pixel Team
							</span>
						</div>
					</div>

					<IconButton
						variant="ghost"
						color="neutral"
						size="xs"
						className="text-fg-secondary shrink-0"
						aria-label="Switch organization">
						<IconSlot slot="chevrons-up-down" className="size-3.5" />
					</IconButton>
				</Card>
			</SidebarHeader>

			{/* Sidebar Navigation */}
			<SidebarContent className="[scrollbar-width:none] space-y-4 overflow-y-auto px-0 py-3 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
				{/* Main Menu */}
				<SidebarGroup className="p-0">
					<SidebarGroupLabel className="font-heading text-fg-tertiary px-2.5 py-1 text-xs font-semibold">
						Main Menu
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu className="gap-0.5">
							<SidebarMenuItem>
								<SidebarMenuButton
									size="sm"
									isActive={activeNav === "Dashboard"}
									onClick={() => onSelectNav("Dashboard")}
									className={cn(
										"h-8.5 px-2.5 text-sm font-medium transition-colors",
										activeNav === "Dashboard"
											? "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary data-[active=true]:bg-primary/10 data-[active=true]:text-primary [&>svg]:text-primary font-semibold"
											: "text-fg-secondary hover:text-fg"
									)}>
									<IconSlot slot="home" className="size-4" />
									<span>Dashboard</span>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton
									size="sm"
									isActive={activeNav === "Products"}
									onClick={() => onSelectNav("Products")}
									className="text-fg-secondary hover:text-fg h-8.5 px-2.5 text-sm font-medium">
									<IconSlot slot="store" className="size-4" />
									<span>Products</span>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton
									size="sm"
									isActive={activeNav === "Transactions"}
									onClick={() => onSelectNav("Transactions")}
									className="text-fg-secondary hover:text-fg h-8.5 px-2.5 text-sm font-medium">
									<IconSlot slot="card" className="size-4" />
									<span>Transactions</span>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton
									size="sm"
									isActive={activeNav === "Reports"}
									onClick={() => onSelectNav("Reports")}
									className="text-fg-secondary hover:text-fg h-8.5 px-2.5 text-sm font-medium">
									<IconSlot slot="file-text" className="size-4" />
									<span>Reports & Analytics</span>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton
									size="sm"
									isActive={activeNav === "Messages"}
									onClick={() => onSelectNav("Messages")}
									className="text-fg-secondary hover:text-fg h-8.5 px-2.5 text-sm font-medium">
									<IconSlot slot="messages-square" className="size-4" />
									<span>Messages</span>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton
									size="sm"
									isActive={activeNav === "Team"}
									onClick={() => onSelectNav("Team")}
									className="text-fg-secondary hover:text-fg h-8.5 px-2.5 text-sm font-medium">
									<IconSlot slot="badge-check" className="size-4" />
									<span>Team Performance</span>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton
									size="sm"
									isActive={activeNav === "Campaigns"}
									onClick={() => onSelectNav("Campaigns")}
									className="text-fg-secondary hover:text-fg h-8.5 px-2.5 text-sm font-medium">
									<IconSlot slot="megaphone" className="size-4" />
									<span>Campaigns</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{/* Customers Group */}
				<SidebarGroup className="p-0">
					<SidebarGroupLabel className="font-heading text-fg-tertiary px-2.5 py-1 text-xs font-semibold">
						Customers
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu className="gap-0.5">
							<SidebarMenuItem>
								<SidebarMenuButton
									size="sm"
									isActive={activeNav === "CustomerList"}
									onClick={() => onSelectNav("CustomerList")}
									className="text-fg-secondary hover:text-fg h-8.5 px-2.5 text-sm font-medium">
									<IconSlot slot="users" className="size-4" />
									<span>Customer List</span>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton
									size="sm"
									isActive={activeNav === "Channels"}
									onClick={() => onSelectNav("Channels")}
									className="text-fg-secondary hover:text-fg h-8.5 px-2.5 text-sm font-medium">
									<IconSlot slot="tv" className="size-4" />
									<span>Channels</span>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton
									size="sm"
									isActive={activeNav === "OrderManagement"}
									onClick={() => onSelectNav("OrderManagement")}
									className="text-fg-secondary hover:text-fg h-8.5 px-2.5 text-sm font-medium">
									<IconSlot slot="shopping-bag" className="size-4" />
									<span>Order Management</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{/* Management Group */}
				<SidebarGroup className="p-0">
					<SidebarGroupLabel className="font-heading text-fg-tertiary px-2.5 py-1 text-xs font-semibold">
						Management
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu className="gap-0.5">
							<SidebarMenuItem>
								<SidebarMenuButton
									size="sm"
									isActive={activeNav === "Roles"}
									onClick={() => onSelectNav("Roles")}
									className="text-fg-secondary hover:text-fg h-8.5 px-2.5 text-sm font-medium">
									<IconSlot slot="user" className="size-4" />
									<span>Roles & Permissions</span>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton
									size="sm"
									isActive={activeNav === "Billing"}
									onClick={() => onSelectNav("Billing")}
									className="text-fg-secondary hover:text-fg h-8.5 px-2.5 text-sm font-medium">
									<IconSlot slot="receipt" className="size-4" />
									<span>Billing & Subscription</span>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton
									size="sm"
									isActive={activeNav === "Integrations"}
									onClick={() => onSelectNav("Integrations")}
									className="text-fg-secondary hover:text-fg h-8.5 px-2.5 text-sm font-medium">
									<IconSlot slot="blocks" className="size-4" />
									<span>Integrations</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{/* Settings Group */}
				<SidebarGroup className="p-0">
					<SidebarGroupLabel className="font-heading text-fg-tertiary px-2.5 py-1 text-xs font-semibold">
						Settings
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu className="gap-0.5">
							<SidebarMenuItem>
								<SidebarMenuButton
									size="sm"
									isActive={activeNav === "Support"}
									onClick={() => onSelectNav("Support")}
									className="text-fg-secondary hover:text-fg h-8.5 px-2.5 text-sm font-medium">
									<IconSlot slot="headset" className="size-4" />
									<span>Customer Support</span>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton
									size="sm"
									isActive={activeNav === "Help"}
									onClick={() => onSelectNav("Help")}
									className="text-fg-secondary hover:text-fg h-8.5 px-2.5 text-sm font-medium">
									<IconSlot slot="help-circle" className="size-4" />
									<span>Help Center</span>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton
									size="sm"
									isActive={activeNav === "Settings"}
									onClick={() => onSelectNav("Settings")}
									className="text-fg-secondary hover:text-fg h-8.5 px-2.5 text-sm font-medium">
									<IconSlot slot="setting" className="size-4" />
									<span>System Settings</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			{/* Sidebar Footer User Profile */}
			<SidebarFooter className="p-0 pt-2">
				<Card className="border-border/70 bg-elevation-level1 flex flex-row items-center justify-between gap-0 p-2.5 shadow-2xs">
					<div className="flex min-w-0 items-center gap-2.5">
						<Avatar
							size="sm"
							rounded="square"
							className="border-border/60 shrink-0 border">
							<AvatarImage
								src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/2.png"
								alt="Ari"
							/>
							<AvatarFallback className="text-xs font-semibold">
								AR
							</AvatarFallback>
							<AvatarIndicator className="bg-success ring-bg -right-0.5 -bottom-0.5 size-2 rounded-full ring-2" />
						</Avatar>
						<div className="flex flex-col truncate text-left">
							<span className="font-heading text-fg truncate text-sm leading-tight font-semibold">
								Ari
							</span>
							<span className="text-fg-secondary truncate text-xs leading-tight">
								Pro Plan
							</span>
						</div>
					</div>
					<IconButton
						variant="ghost"
						color="neutral"
						size="xs"
						className="text-fg-secondary shrink-0"
						aria-label="User switch">
						<IconSlot slot="down" className="size-3.5" />
					</IconButton>
				</Card>
			</SidebarFooter>
		</Sidebar>
	)
}
