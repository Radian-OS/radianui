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
	UserPlus,
	Workflow,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { IconButton } from "@/styles/default/ui/button"

interface SidebarProps {
	onOpenNewIssue?: () => void
	onCloseMobile?: () => void
}

export function Sidebar({ onOpenNewIssue, onCloseMobile }: SidebarProps) {
	const [activeNav, setActiveNav] = useState("issues")

	const mainLinks = [
		{ id: "inbox", label: "Inbox", icon: Inbox, badge: undefined },
		{ id: "my-issues", label: "My issues", icon: Workflow, badge: undefined },
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

	return (
		<aside className="border-border/60 bg-bg flex h-full w-60 shrink-0 flex-col border-r text-sm transition-colors select-none">
			{/* Workspace Switcher & Top Actions */}
			<div className="border-border/40 flex h-12 items-center justify-between border-b px-3">
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
			</div>

			{/* Nav Items Scrollable Body */}
			<div className="flex-1 space-y-4 overflow-y-auto px-2 py-3">
				{/* Inbox / My issues */}
				<div className="space-y-0.5">
					{mainLinks.map((item) => {
						const Icon = item.icon
						const isActive = activeNav === item.id
						return (
							<button
								key={item.id}
								type="button"
								onClick={() => {
									setActiveNav(item.id)
									onCloseMobile?.()
								}}
								className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
									isActive
										? "bg-elevation-level1 text-fg font-semibold"
										: "text-fg-muted hover:bg-elevation-level1/60 hover:text-fg"
								}`}>
								<Icon className="size-3.5 shrink-0" />
								<span>{item.label}</span>
							</button>
						)
					})}
				</div>

				{/* Workspace Section */}
				<div>
					<div className="text-fg-muted flex items-center justify-between px-2.5 py-1 text-[11px] font-medium">
						<span>Workspace</span>
						<ChevronDown className="size-3 opacity-60" />
					</div>
					<div className="mt-0.5 space-y-0.5">
						{workspaceLinks.map((item) => {
							const Icon = item.icon
							const isActive = activeNav === item.id
							return (
								<button
									key={item.id}
									type="button"
									onClick={() => {
										setActiveNav(item.id)
										onCloseMobile?.()
									}}
									className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
										isActive
											? "bg-elevation-level1 text-fg font-semibold"
											: "text-fg-muted hover:bg-elevation-level1/60 hover:text-fg"
									}`}>
									<Icon className="size-3.5 shrink-0" />
									<span>{item.label}</span>
								</button>
							)
						})}
					</div>
				</div>

				{/* Your teams Section */}
				<div>
					<div className="text-fg-muted flex items-center justify-between px-2.5 py-1 text-[11px] font-medium">
						<span>Your teams</span>
						<ChevronDown className="size-3 opacity-60" />
					</div>
					<div className="mt-0.5 space-y-0.5">
						<div className="text-fg flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold">
							<Globe className="size-3.5 text-blue-500 dark:text-blue-400" />
							<span>AS Mobbin</span>
							<ChevronDown className="text-fg-muted ml-auto size-3 opacity-60" />
						</div>

						<div className="space-y-0.5 pl-2">
							{teamLinks.map((item) => {
								const Icon = item.icon
								const isActive = activeNav === item.id
								return (
									<button
										key={item.id}
										type="button"
										onClick={() => {
											setActiveNav(item.id)
											onCloseMobile?.()
										}}
										className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
											isActive
												? "bg-elevation-level1 text-fg font-semibold"
												: "text-fg-muted hover:bg-elevation-level1/60 hover:text-fg"
										}`}>
										<Icon className="size-3.5 shrink-0" />
										<span>{item.label}</span>
									</button>
								)
							})}
						</div>
					</div>
				</div>

				{/* Try Section */}
				<div className="pt-2">
					<div className="text-fg-muted flex items-center justify-between px-2.5 py-1 text-[11px] font-medium">
						<span>Try</span>
						<ChevronDown className="size-3 opacity-60" />
					</div>
					<div className="mt-0.5 space-y-0.5">
						<Link
							href="#import"
							className="text-fg-muted hover:bg-elevation-level1/60 hover:text-fg flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors hover:underline">
							<FolderKanban className="size-3.5 shrink-0" />
							<span>Import issues</span>
						</Link>

						<button
							type="button"
							className="text-fg-muted hover:bg-elevation-level1/60 hover:text-fg flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors">
							<Plus className="size-3.5 shrink-0" />
							<span>Invite people</span>
						</button>

						{/* Brand/Logo Icons: rule 5 Next.js Image from CDN */}
						<Link
							href="https://github.com"
							target="_blank"
							rel="noreferrer"
							className="text-fg-muted hover:bg-elevation-level1/60 hover:text-fg flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors hover:underline">
							<Image
								src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
								alt="GitHub Logo"
								width={14}
								height={14}
								className="size-3.5 shrink-0 dark:invert"
							/>
							<span>Connect GitHub</span>
						</Link>
					</div>
				</div>
			</div>
		</aside>
	)
}
