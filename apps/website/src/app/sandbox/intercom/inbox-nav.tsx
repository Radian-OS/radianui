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
			className="border-border/60 bg-bg text-fg flex h-full w-56 shrink-0 flex-col justify-between border-r text-xs transition-colors select-none">
			{/* Sidebar Header: Title, Search, and New Conversation */}
			<SidebarHeader className="border-border/40 flex h-12 flex-row items-center justify-between border-b px-3">
				<h2 className="heading-6 text-fg text-sm font-bold">Inbox</h2>
				<div className="flex items-center gap-0.5">
					<IconButton
						type="button"
						variant="ghost"
						color="neutral"
						size="28"
						aria-label="Search inbox"
						className="text-fg-muted hover:text-fg">
						<Search className="size-3.5" />
					</IconButton>
					<IconButton
						type="button"
						variant="ghost"
						color="neutral"
						size="28"
						aria-label="New conversation"
						className="text-fg-muted hover:text-fg">
						<Plus className="size-3.5" />
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
											size="28"
											isActive={isSelected}
											tooltip={item.label}
											onClick={() => setActiveFolder(item.id)}
											className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
												isSelected
													? "bg-elevation-level1 text-fg font-semibold shadow-xs"
													: "text-fg-muted hover:bg-elevation-level1/60 hover:text-fg"
											}`}>
											<div className="flex items-center gap-2 truncate">
												<Icon className="size-3.5 shrink-0" />
												<span className="truncate">{item.label}</span>
											</div>
											{item.count !== undefined && (
												<span className="text-fg-muted/70 text-[11px]">
													{item.count}
												</span>
											)}
										</SidebarMenuButton>
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
						className="text-fg-muted hover:text-fg flex w-full cursor-pointer items-center justify-between px-2.5 py-1 text-[11px] font-semibold transition-colors">
						<span>Fin AI Agent</span>
						<div className="flex items-center gap-1">
							<Plus className="size-3 opacity-60 hover:opacity-100" />
							{finOpen ? (
								<ChevronDown className="size-3" />
							) : (
								<ChevronRight className="size-3" />
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
												size="28"
												isActive={isSelected}
												tooltip={item.label}
												onClick={() => setActiveFolder(item.id)}
												className={`flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
													isSelected
														? "bg-elevation-level1 text-fg font-semibold shadow-xs"
														: "text-fg-muted hover:bg-elevation-level1/60 hover:text-fg"
												}`}>
												<Icon className="size-3.5 shrink-0" />
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
						className="text-fg-muted hover:text-fg flex w-full cursor-pointer items-center justify-between px-2.5 py-1 text-[11px] font-semibold transition-colors">
						<span>Team inboxes</span>
						{teamsOpen ? (
							<ChevronDown className="size-3" />
						) : (
							<ChevronRight className="size-3" />
						)}
					</SidebarGroupLabel>

					{teamsOpen && (
						<SidebarGroupContent className="mt-0.5">
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton
										size="28"
										isActive={activeFolder === "team-admin"}
										tooltip="Admin Support"
										onClick={() => setActiveFolder("team-admin")}
										className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
											activeFolder === "team-admin"
												? "bg-elevation-level1 text-fg font-semibold shadow-xs"
												: "text-fg-muted hover:bg-elevation-level1/60 hover:text-fg"
										}`}>
										<div className="flex items-center gap-2">
											<Inbox className="size-3.5" />
											<span>Admin Support</span>
										</div>
										<span className="text-fg-muted/70 text-[11px]">0</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					)}
				</SidebarGroup>

				{/* Teammates Section */}
				<SidebarGroup className="p-0">
					<SidebarGroupLabel className="text-fg-muted flex w-full items-center justify-between px-2.5 py-1 text-[11px] font-semibold">
						<span>Teammates</span>
						<div className="flex items-center gap-1">
							<Plus className="size-3 cursor-pointer opacity-60 hover:opacity-100" />
							<ChevronRight className="size-3 cursor-pointer opacity-60 hover:opacity-100" />
						</div>
					</SidebarGroupLabel>
				</SidebarGroup>

				{/* Views Section */}
				<SidebarGroup className="p-0">
					<SidebarGroupLabel
						onClick={() => setViewsOpen(!viewsOpen)}
						className="text-fg-muted hover:text-fg flex w-full cursor-pointer items-center justify-between px-2.5 py-1 text-[11px] font-semibold transition-colors">
						<span>Views</span>
						{viewsOpen ? (
							<ChevronDown className="size-3" />
						) : (
							<ChevronRight className="size-3" />
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
												size="28"
												isActive={isSelected}
												tooltip={item.label}
												onClick={() => setActiveFolder(item.id)}
												className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
													isSelected
														? "bg-elevation-level1 text-fg font-semibold shadow-xs"
														: "text-fg-muted hover:bg-elevation-level1/60 hover:text-fg"
												}`}>
												<div className="flex items-center gap-2">
													<Icon className="size-3.5" />
													<span>{item.label}</span>
												</div>
												<span className="text-fg-muted/70 text-[11px]">
													{item.count}
												</span>
											</SidebarMenuButton>
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
				{/* Dark onboarding card */}
				<div className="rounded-xl bg-zinc-900 p-3 text-white shadow-md dark:bg-zinc-800">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="size-2 rounded-full bg-emerald-400" />
							<span className="text-xs font-semibold">Get set up</span>
						</div>
						<ChevronUp className="size-3.5 text-zinc-400" />
					</div>
					<p className="mt-1.5 text-[11px] leading-snug text-zinc-400">
						Add content to power your AI and Help Center
					</p>
				</div>

				{/* Manage Action */}
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="28"
							tooltip="Manage settings"
							className="text-fg-muted hover:bg-elevation-level1/60 hover:text-fg flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors">
							<Sliders className="size-3.5" />
							<span>Manage</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	)
}
