"use client"

import React, { useState } from "react"
import {
	AtSign,
	BarChart2,
	ChevronDown,
	ChevronRight,
	ChevronUp,
	CornerDownRight,
	HelpCircle,
	Inbox,
	Mail,
	MessageCircle,
	MessageSquare,
	PenSquare,
	Plus,
	Search,
	Shield,
	Sliders,
	ThumbsUp,
	User,
	Users,
	UserX,
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
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/styles/default/ui/sidebar"

export function InboxNav() {
	const [activeFolder, setActiveFolder] = useState("your-inbox")
	const [finOpen, setFinOpen] = useState(true)
	const [teamsOpen, setTeamsOpen] = useState(true)
	const [viewsOpen, setViewsOpen] = useState(true)

	const primaryFolders = [
		{ id: "your-inbox", label: "Your inbox", icon: User, count: 5 },
		{ id: "mentions", label: "Mentions", icon: AtSign, count: 0 },
		{
			id: "created-by-you",
			label: "Created by you",
			icon: PenSquare,
			count: 0,
		},
		{ id: "all", label: "All", icon: Users, count: 5 },
		{ id: "unassigned", label: "Unassigned", icon: UserX, count: 0 },
		{ id: "spam", label: "Spam", icon: Shield, count: 0 },
		{ id: "dashboard", label: "Dashboard", icon: BarChart2 },
	]

	const finAiFolders = [
		{ id: "fin-all", label: "All conversations", icon: MessageSquare },
		{ id: "fin-resolved", label: "Resolved", icon: ThumbsUp },
		{ id: "fin-routed", label: "Routed", icon: CornerDownRight },
		{ id: "fin-abandoned", label: "Abandoned", icon: HelpCircle },
	]

	const viewsFolders = [
		{ id: "view-messenger", label: "Messenger", icon: MessageCircle, count: 1 },
		{ id: "view-email", label: "Email", icon: Mail, count: 1 },
	]

	return (
		<Sidebar
			collapsible="none"
			style={
				{
					"--color-sidebar-accent": "var(--color-fill2)",
				} as React.CSSProperties
			}
			className="border-border/60 bg-bg text-sidebar-fg flex h-full w-56 shrink-0 flex-col justify-between border-r select-none">
			{/* Sidebar Header: Title, Search, and New Conversation */}
			<SidebarHeader className="border-border/40 flex h-12 flex-row items-center justify-between border-b px-3">
				<h2 className="heading-6 text-fg">Inbox</h2>
				<div className="flex items-center gap-0.5">
					<IconButton
						type="button"
						variant="ghost"
						color="neutral"
						size="28"
						aria-label="Search inbox"
						className="text-fg-secondary hover:text-fg">
						<Search className="size-4" />
					</IconButton>
					<IconButton
						type="button"
						variant="ghost"
						color="neutral"
						size="28"
						aria-label="New conversation"
						className="text-fg-secondary hover:text-fg">
						<Plus className="size-4" />
					</IconButton>
				</div>
			</SidebarHeader>

			{/* Sidebar Scrollable Body with Groups and Menus */}
			<SidebarContent className="flex-1 space-y-3 overflow-y-auto p-2">
				{/* Primary Folders Menu */}
				<SidebarGroup className="p-0">
					<SidebarGroupContent>
						<SidebarMenu className="space-y-0.5">
							{primaryFolders.map((item) => {
								const Icon = item.icon
								const isSelected = activeFolder === item.id
								return (
									<SidebarMenuItem key={item.id}>
										<SidebarMenuButton
											size="32"
											isActive={isSelected}
											tooltip={item.label}
											onClick={() => setActiveFolder(item.id)}>
											<Icon className="size-4" />
											<span className="truncate">{item.label}</span>
										</SidebarMenuButton>
										{item.count !== undefined && (
											<SidebarMenuBadge
												variant="outline"
												color="neutral"
												className="bg-bg text-fg-tertiary">
												{item.count}
											</SidebarMenuBadge>
										)}
									</SidebarMenuItem>
								)
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{/* Fin AI Agent Section */}
				<SidebarGroup className="p-0">
					<SidebarGroupLabel
						onClick={() => setFinOpen(!finOpen)}
						className="text-fg-secondary hover:text-fg flex w-full cursor-pointer items-center justify-between px-2 text-xs font-semibold tracking-wider uppercase transition-colors">
						<span>Fin AI Agent</span>
						<div className="flex items-center gap-1">
							<Plus className="size-3.5 opacity-60 hover:opacity-100" />
							{finOpen ? (
								<ChevronDown className="size-3.5" />
							) : (
								<ChevronRight className="size-3.5" />
							)}
						</div>
					</SidebarGroupLabel>

					{finOpen && (
						<SidebarGroupContent className="mt-0.5">
							<SidebarMenu className="space-y-0.5">
								{finAiFolders.map((item) => {
									const Icon = item.icon
									const isSelected = activeFolder === item.id
									return (
										<SidebarMenuItem key={item.id}>
											<SidebarMenuButton
												size="32"
												isActive={isSelected}
												tooltip={item.label}
												onClick={() => setActiveFolder(item.id)}>
												<Icon className="size-4" />
												<span className="truncate">{item.label}</span>
											</SidebarMenuButton>
										</SidebarMenuItem>
									)
								})}
							</SidebarMenu>
						</SidebarGroupContent>
					)}
				</SidebarGroup>

				{/* Team Inboxes Section */}
				<SidebarGroup className="p-0">
					<SidebarGroupLabel
						onClick={() => setTeamsOpen(!teamsOpen)}
						className="text-fg-secondary hover:text-fg flex w-full cursor-pointer items-center justify-between px-2 text-xs font-semibold tracking-wider uppercase transition-colors">
						<span>Team inboxes</span>
						{teamsOpen ? (
							<ChevronDown className="size-3.5" />
						) : (
							<ChevronRight className="size-3.5" />
						)}
					</SidebarGroupLabel>

					{teamsOpen && (
						<SidebarGroupContent className="mt-0.5">
							<SidebarMenu className="space-y-0.5">
								<SidebarMenuItem>
									<SidebarMenuButton
										size="32"
										isActive={activeFolder === "team-admin"}
										tooltip="Admin Support"
										onClick={() => setActiveFolder("team-admin")}>
										<Inbox className="size-4" />
										<span className="truncate">Admin Support</span>
									</SidebarMenuButton>
									<SidebarMenuBadge
										variant="outline"
										color="neutral"
										className="bg-bg text-fg-tertiary">
										0
									</SidebarMenuBadge>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					)}
				</SidebarGroup>

				{/* Teammates Section */}
				<SidebarGroup className="p-0">
					<SidebarGroupLabel className="text-fg-secondary flex w-full items-center justify-between px-2 text-xs font-semibold tracking-wider uppercase">
						<span>Teammates</span>
						<div className="flex items-center gap-1">
							<Plus className="size-3.5 cursor-pointer opacity-60 hover:opacity-100" />
							<ChevronRight className="size-3.5 cursor-pointer opacity-60 hover:opacity-100" />
						</div>
					</SidebarGroupLabel>
				</SidebarGroup>

				{/* Views Section */}
				<SidebarGroup className="p-0">
					<SidebarGroupLabel
						onClick={() => setViewsOpen(!viewsOpen)}
						className="text-fg-secondary hover:text-fg flex w-full cursor-pointer items-center justify-between px-2 text-xs font-semibold tracking-wider uppercase transition-colors">
						<span>Views</span>
						{viewsOpen ? (
							<ChevronDown className="size-3.5" />
						) : (
							<ChevronRight className="size-3.5" />
						)}
					</SidebarGroupLabel>

					{viewsOpen && (
						<SidebarGroupContent className="mt-0.5">
							<SidebarMenu className="space-y-0.5">
								{viewsFolders.map((item) => {
									const Icon = item.icon
									const isSelected = activeFolder === item.id
									return (
										<SidebarMenuItem key={item.id}>
											<SidebarMenuButton
												size="32"
												isActive={isSelected}
												tooltip={item.label}
												onClick={() => setActiveFolder(item.id)}>
												<Icon className="size-4" />
												<span className="truncate">{item.label}</span>
											</SidebarMenuButton>
											{item.count !== undefined && (
												<SidebarMenuBadge
													variant="outline"
													color="neutral"
													className="bg-bg text-fg-tertiary">
													{item.count}
												</SidebarMenuBadge>
											)}
										</SidebarMenuItem>
									)
								})}
							</SidebarMenu>
						</SidebarGroupContent>
					)}
				</SidebarGroup>
			</SidebarContent>

			{/* Sidebar Footer: Onboarding Card & Manage */}
			<SidebarFooter className="border-border/40 space-y-2 border-t p-2">
				{/* Onboarding card */}
				<div className="border-border/60 bg-elevation-level1 text-fg rounded-xl border p-3 shadow-md">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="bg-success size-2 rounded-full" />
							<span className="text-xs font-semibold">Get set up</span>
						</div>
						<ChevronUp className="text-fg-secondary size-3.5" />
					</div>
					<p className="text-fg-secondary mt-1.5 text-[11px] leading-snug">
						Add content to power your AI and Help Center
					</p>
				</div>

				{/* Manage Action */}
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="32"
							tooltip="Manage settings"
							onClick={() => setActiveFolder("manage")}>
							<Sliders className="size-4" />
							<span>Manage</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	)
}
