"use client"

import React, { useState } from "react"
import {
	ChevronDown,
	FolderKanban,
	Globe,
	Inbox,
	Layers,
	MoreHorizontal,
	Plus,
	Search,
	SquarePen,
	Workflow,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { IconButton } from "@/styles/default/ui/button"
import {
	Sidebar as RadianSidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/styles/default/ui/sidebar"

interface SidebarProps {
	onOpenNewIssue?: () => void
	onCloseMobile?: () => void
}

export function Sidebar({ onOpenNewIssue, onCloseMobile }: SidebarProps) {
	const [activeNav, setActiveNav] = useState("issues")
	const { isMobile, setOpenMobile } = useSidebar()

	const handleItemClick = (id: string) => {
		setActiveNav(id)
		if (isMobile) {
			setOpenMobile(false)
		}
		onCloseMobile?.()
	}

	const mainLinks = [
		{ id: "inbox", label: "Inbox", icon: Inbox },
		{ id: "my-issues", label: "My issues", icon: Workflow },
	]

	const workspaceLinks = [
		{ id: "projects", label: "Projects", icon: FolderKanban },
		{ id: "views", label: "Views", icon: Layers },
		{ id: "more", label: "More", icon: MoreHorizontal },
	]

	const teamLinks = [
		{ id: "issues", label: "Issues", icon: Workflow },
		{ id: "team-projects", label: "Projects", icon: FolderKanban },
		{ id: "team-views", label: "Views", icon: Layers },
	]

	const tryActions = [
		{
			id: "import",
			label: "Import issues",
			icon: FolderKanban,
			href: "#import",
			isLink: true,
		},
		{
			id: "invite",
			label: "Invite people",
			icon: Plus,
			isLink: false,
		},
		{
			id: "github",
			label: "Connect GitHub",
			href: "https://github.com",
			isGitHub: true,
			isLink: true,
		},
	]

	return (
		<RadianSidebar className="border-border/60 bg-bg text-fg flex h-full w-60 shrink-0 flex-col border-r text-sm transition-colors select-none">
			{/* Workspace Switcher & Top Actions */}
			<SidebarHeader className="border-border/40 flex h-12 flex-row items-center justify-between border-b px-3">
				<button
					type="button"
					className="hover:bg-elevation-level1/70 -ml-1 flex items-center gap-2 rounded-lg px-2 py-1 text-left transition-colors">
					<div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
						AM
					</div>
					<span className="text-fg truncate text-xs font-semibold">
						AS Mobbin
					</span>
					<ChevronDown className="text-fg-muted size-3.5 opacity-60" />
				</button>

				<div className="flex items-center gap-0.5">
					<IconButton
						type="button"
						variant="ghost"
						color="neutral"
						size="28"
						aria-label="Search issues and projects"
						className="text-fg-muted hover:text-fg">
						<Search className="size-3.5" />
					</IconButton>
					<IconButton
						type="button"
						variant="ghost"
						color="neutral"
						size="28"
						aria-label="New issue"
						onClick={onOpenNewIssue}
						className="text-fg-muted hover:text-fg">
						<SquarePen className="size-3.5" />
					</IconButton>
				</div>
			</SidebarHeader>

			{/* Nav Items Scrollable Body */}
			<SidebarContent className="flex-1 space-y-4 overflow-y-auto px-2 py-3">
				{/* Primary Main Links */}
				<SidebarGroup className="p-0">
					<SidebarGroupContent>
						<SidebarMenu className="space-y-0.5">
							{mainLinks.map((item) => {
								const Icon = item.icon
								const isActive = activeNav === item.id
								return (
									<SidebarMenuItem key={item.id}>
										<SidebarMenuButton
											size="28"
											isActive={isActive}
											tooltip={item.label}
											onClick={() => handleItemClick(item.id)}
											className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
												isActive
													? "bg-elevation-level1 text-fg font-semibold"
													: "text-fg-muted hover:bg-elevation-level1/60 hover:text-fg"
											}`}>
											<Icon className="size-3.5 shrink-0" />
											<span>{item.label}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{/* Workspace Section */}
				<SidebarGroup className="p-0">
					<SidebarGroupLabel className="text-fg-muted flex w-full items-center justify-between px-2.5 py-1 text-[11px] font-medium">
						<span>Workspace</span>
						<ChevronDown className="size-3 opacity-60" />
					</SidebarGroupLabel>
					<SidebarGroupContent className="mt-0.5">
						<SidebarMenu className="space-y-0.5">
							{workspaceLinks.map((item) => {
								const Icon = item.icon
								const isActive = activeNav === item.id
								return (
									<SidebarMenuItem key={item.id}>
										<SidebarMenuButton
											size="28"
											isActive={isActive}
											tooltip={item.label}
											onClick={() => handleItemClick(item.id)}
											className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
												isActive
													? "bg-elevation-level1 text-fg font-semibold"
													: "text-fg-muted hover:bg-elevation-level1/60 hover:text-fg"
											}`}>
											<Icon className="size-3.5 shrink-0" />
											<span>{item.label}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{/* Your teams Section */}
				<SidebarGroup className="p-0">
					<SidebarGroupLabel className="text-fg-muted flex w-full items-center justify-between px-2.5 py-1 text-[11px] font-medium">
						<span>Your teams</span>
						<ChevronDown className="size-3 opacity-60" />
					</SidebarGroupLabel>
					<SidebarGroupContent className="mt-0.5 space-y-0.5">
						<div className="text-fg flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold">
							<Globe className="size-3.5 text-blue-500 dark:text-blue-400" />
							<span>AS Mobbin</span>
							<ChevronDown className="text-fg-muted ml-auto size-3 opacity-60" />
						</div>

						<SidebarMenu className="space-y-0.5 pl-2">
							{teamLinks.map((item) => {
								const Icon = item.icon
								const isActive = activeNav === item.id
								return (
									<SidebarMenuItem key={item.id}>
										<SidebarMenuButton
											size="28"
											isActive={isActive}
											tooltip={item.label}
											onClick={() => handleItemClick(item.id)}
											className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
												isActive
													? "bg-elevation-level1 text-fg font-semibold"
													: "text-fg-muted hover:bg-elevation-level1/60 hover:text-fg"
											}`}>
											<Icon className="size-3.5 shrink-0" />
											<span>{item.label}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{/* Try Section */}
				<SidebarGroup className="p-0 pt-1">
					<SidebarGroupLabel className="text-fg-muted flex w-full items-center justify-between px-2.5 py-1 text-[11px] font-medium">
						<span>Try</span>
						<ChevronDown className="size-3 opacity-60" />
					</SidebarGroupLabel>
					<SidebarGroupContent className="mt-0.5">
						<SidebarMenu className="space-y-0.5">
							{tryActions.map((item) => {
								if (item.isGitHub) {
									return (
										<SidebarMenuItem key={item.id}>
											<SidebarMenuButton
												size="28"
												asChild
												tooltip={item.label}
												className="text-fg-muted hover:bg-elevation-level1/60 hover:text-fg flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors">
												<Link
													href={item.href || "#"}
													target="_blank"
													rel="noreferrer"
													className="hover:underline">
													<Image
														src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
														alt="GitHub Logo"
														width={14}
														height={14}
														className="size-3.5 shrink-0 dark:invert"
													/>
													<span>{item.label}</span>
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									)
								}

								if (item.isLink) {
									const Icon = item.icon!
									return (
										<SidebarMenuItem key={item.id}>
											<SidebarMenuButton
												size="28"
												asChild
												tooltip={item.label}
												className="text-fg-muted hover:bg-elevation-level1/60 hover:text-fg flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors">
												<Link
													href={item.href || "#"}
													className="hover:underline">
													<Icon className="size-3.5 shrink-0" />
													<span>{item.label}</span>
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									)
								}

								const Icon = item.icon!
								return (
									<SidebarMenuItem key={item.id}>
										<SidebarMenuButton
											size="28"
											tooltip={item.label}
											onClick={() => handleItemClick(item.id)}
											className="text-fg-muted hover:bg-elevation-level1/60 hover:text-fg flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors">
											<Icon className="size-3.5 shrink-0" />
											<span>{item.label}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</RadianSidebar>
	)
}
