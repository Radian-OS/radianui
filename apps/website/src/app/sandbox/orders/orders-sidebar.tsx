"use client"

import React from "react"
import Link from "next/link"
import {
	BarChart3,
	CheckCircle2,
	ChevronRight,
	ChevronsUpDown,
	Headphones,
	LayoutGrid,
	Package,
	Percent,
	Settings,
	ShoppingBag,
	Sparkles,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"

export function OrdersSidebar() {
	return (
		<Sidebar collapsible="none" className="border-border bg-sidebar border-r">
			{/* Workspace / Brand Header */}
			<SidebarHeader className="border-sidebar-border border-b p-4">
				<button
					type="button"
					className="hover:bg-sidebar-accent flex w-full cursor-pointer items-center justify-between rounded-lg p-1 transition-colors">
					<div className="flex items-center gap-3">
						<div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 text-sm font-bold text-white shadow-xs">
							C
						</div>
						<div className="flex flex-col text-left">
							<span className="text-sidebar-fg text-sm font-semibold">
								Catalyst
							</span>
							<span className="text-sidebar-fg/70 text-xs">
								Marketing & Sales
							</span>
						</div>
					</div>
					<ChevronsUpDown className="text-sidebar-fg/60 size-4" />
				</button>
			</SidebarHeader>

			{/* Sidebar Navigation Items */}
			<SidebarContent className="px-2 py-4">
				{/* MAIN GROUP */}
				<SidebarGroup>
					<SidebarGroupLabel className="text-sidebar-fg/50 px-3 text-[11px] font-medium tracking-wider uppercase">
						MAIN
					</SidebarGroupLabel>
					<SidebarGroupContent className="mt-1">
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild size="36">
									<Link href="#">
										<LayoutGrid className="text-sidebar-fg/70 size-4" />
										<span className="text-sm">Overview</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton asChild size="36">
									<Link href="#">
										<BarChart3 className="text-sidebar-fg/70 size-4" />
										<span className="text-sm">Analytics</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton asChild size="36">
									<Link href="#">
										<Package className="text-sidebar-fg/70 size-4" />
										<span className="text-sm">Products</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
									isActive
									size="36"
									className="relative font-medium text-orange-400 data-[active=true]:bg-orange-500/10 data-[active=true]:text-orange-400">
									<Link href="#" className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<ShoppingBag className="size-4 text-orange-400" />
											<span className="text-sm">Orders</span>
										</div>
										<ChevronRight className="size-3.5 text-orange-400" />
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton asChild size="36">
									<Link href="#">
										<Percent className="text-sidebar-fg/70 size-4" />
										<span className="text-sm">Discounts</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton asChild size="36">
									<Link href="#">
										<Sparkles className="text-sidebar-fg/70 size-4" />
										<span className="text-sm">Apps</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{/* OTHERS GROUP */}
				<SidebarGroup className="mt-4">
					<SidebarGroupLabel className="text-sidebar-fg/50 px-3 text-[11px] font-medium tracking-wider uppercase">
						OTHERS
					</SidebarGroupLabel>
					<SidebarGroupContent className="mt-1">
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild size="36">
									<Link href="#">
										<Settings className="text-sidebar-fg/70 size-4" />
										<span className="text-sm">Settings</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton asChild size="36">
									<Link href="#">
										<Headphones className="text-sidebar-fg/70 size-4" />
										<span className="text-sm">Support</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			{/* User Profile Footer */}
			<SidebarFooter className="border-sidebar-border border-t p-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Avatar size="36" rounded="circle" className="border-border border">
							<AvatarImage
								src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop"
								alt="James Brown"
							/>
							<AvatarFallback className="text-xs font-semibold">
								JB
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col">
							<div className="flex items-center gap-1">
								<span className="text-sidebar-fg text-xs font-semibold">
									James Brown
								</span>
								<CheckCircle2 className="text-sidebar size-3.5 fill-blue-500" />
							</div>
							<span className="text-sidebar-fg/60 text-[11px]">
								james@alignui.com
							</span>
						</div>
					</div>
					<ChevronRight className="text-sidebar-fg/40 size-4" />
				</div>
			</SidebarFooter>
		</Sidebar>
	)
}
