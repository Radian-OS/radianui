"use client"

import React, { useState } from "react"
import {
	ChevronDown,
	ChevronRight,
	ExternalLink,
	Inbox,
	Link2,
	MessageSquare,
	PanelRightClose,
	Plus,
	Tag,
	User,
	Users,
} from "lucide-react"
import Link from "next/link"
import { Button, IconButton } from "@/styles/default/ui/button"

export function DetailsSidebar() {
	const [activeTab, setActiveTab] = useState<"details" | "copilot">("details")
	const [linksOpen, setLinksOpen] = useState(true)
	const [attrsOpen, setAttrsOpen] = useState(true)

	// Collapsible sections
	const [sections, setSections] = useState({
		leadData: false,
		recentConversations: false,
		leadNotes: false,
		leadTags: false,
		leadSegments: false,
	})

	const toggleSection = (key: keyof typeof sections) => {
		setSections((prev) => ({ ...prev, [key]: !prev[key] }))
	}

	return (
		<aside className="border-border/60 bg-bg flex h-full w-72 shrink-0 flex-col border-l text-xs transition-colors select-none">
			{/* Top Header: Details vs Copilot Tabs + Panel Actions */}
			<div className="border-border/40 flex h-12 shrink-0 items-center justify-between border-b px-3">
				<div className="flex items-center gap-1">
					<Button
						type="button"
						variant="ghost"
						color={activeTab === "details" ? "primary" : "neutral"}
						size="28"
						onClick={() => setActiveTab("details")}
						className={`rounded-md px-2.5 font-medium transition-colors ${
							activeTab === "details"
								? "bg-elevation-level1 text-fg font-semibold shadow-xs"
								: "text-fg-muted hover:text-fg"
						}`}>
						Details
					</Button>
					<Button
						type="button"
						variant="ghost"
						color={activeTab === "copilot" ? "primary" : "neutral"}
						size="28"
						onClick={() => setActiveTab("copilot")}
						className={`rounded-md px-2.5 font-medium transition-colors ${
							activeTab === "copilot"
								? "bg-elevation-level1 text-fg font-semibold shadow-xs"
								: "text-fg-muted hover:text-fg"
						}`}>
						Copilot
					</Button>
				</div>

				<div className="flex items-center gap-0.5">
					<IconButton
						type="button"
						variant="ghost"
						color="neutral"
						size="28"
						aria-label="Open in new window"
						className="text-fg-muted hover:text-fg">
						<ExternalLink className="size-3.5" />
					</IconButton>
					<IconButton
						type="button"
						variant="ghost"
						color="neutral"
						size="28"
						aria-label="Close sidebar"
						className="text-fg-muted hover:text-fg">
						<PanelRightClose className="size-3.5" />
					</IconButton>
				</div>
			</div>

			{/* Scrollable details body */}
			<div className="flex-1 space-y-4 overflow-y-auto p-3">
				{/* Top Meta: Assignee & Team Inbox */}
				<div className="border-border/40 space-y-2 border-b pb-3">
					<div className="flex items-center justify-between">
						<span className="text-fg-muted font-normal">Assignee</span>
						<div className="text-fg flex items-center gap-1.5 font-medium">
							<div className="flex size-4.5 items-center justify-center rounded-full bg-amber-500/20 text-[10px] font-bold text-amber-700 dark:text-amber-300">
								AS
							</div>
							<span>Alex Smith</span>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<span className="text-fg-muted font-normal">Team Inbox</span>
						<div className="text-fg flex items-center gap-1.5 font-medium">
							<Inbox className="text-fg-muted size-3.5" />
							<span>Admin Support</span>
						</div>
					</div>
				</div>

				{/* Links Section */}
				<div className="border-border/40 space-y-2 border-b pb-3">
					<button
						type="button"
						onClick={() => setLinksOpen(!linksOpen)}
						className="text-fg flex w-full items-center justify-between font-semibold">
						<div className="flex items-center gap-2">
							<Link2 className="text-fg-muted size-3.5" />
							<span>Links</span>
						</div>
						{linksOpen ? (
							<ChevronDown className="text-fg-muted size-3.5" />
						) : (
							<ChevronRight className="text-fg-muted size-3.5" />
						)}
					</button>

					{linksOpen && (
						<div className="text-fg-muted space-y-2 pt-1">
							<div className="flex items-center justify-between">
								<span>Tracker ticket</span>
								<Plus className="hover:text-fg size-3.5 cursor-pointer" />
							</div>
							<div className="flex items-center justify-between">
								<span>Back-office tickets</span>
								<Plus className="hover:text-fg size-3.5 cursor-pointer" />
							</div>
							<div className="flex items-center justify-between">
								<span>Side conversations</span>
								<Plus className="hover:text-fg size-3.5 cursor-pointer" />
							</div>
						</div>
					)}
				</div>

				{/* Conversation Attributes Section */}
				<div className="border-border/40 space-y-2 border-b pb-3">
					<button
						type="button"
						onClick={() => setAttrsOpen(!attrsOpen)}
						className="text-fg flex w-full items-center justify-between font-semibold">
						<div className="flex items-center gap-2">
							<MessageSquare className="text-fg-muted size-3.5" />
							<span>Conversation attributes</span>
						</div>
						{attrsOpen ? (
							<ChevronDown className="text-fg-muted size-3.5" />
						) : (
							<ChevronRight className="text-fg-muted size-3.5" />
						)}
					</button>

					{attrsOpen && (
						<div className="space-y-2 pt-1">
							<div className="flex items-center justify-between">
								<span className="text-fg-muted">ID</span>
								<span className="text-fg font-mono text-[11px]">
									215471062845035
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-fg-muted">Company</span>
								<span className="text-fg-muted">—</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-fg-muted">Brand</span>
								<span className="text-fg font-medium">SL Mobbin</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-fg-muted">Subject</span>
								<button
									type="button"
									className="text-primary font-medium hover:underline">
									+ Add
								</button>
							</div>

							<div className="pt-1">
								<Link
									href="#see-all"
									className="text-fg-muted hover:text-fg text-[11px] font-medium hover:underline">
									See all
								</Link>
							</div>

							<div className="flex items-center justify-between pt-1">
								<span className="text-fg-muted font-normal">Topics</span>
								<Plus className="text-fg-muted hover:text-fg size-3.5 cursor-pointer" />
							</div>
						</div>
					)}
				</div>

				{/* Collapsible Lower Sections */}
				<div className="space-y-2 pt-1">
					<button
						type="button"
						onClick={() => toggleSection("leadData")}
						className="text-fg flex w-full items-center justify-between py-1 font-semibold">
						<div className="flex items-center gap-2">
							<User className="text-fg-muted size-3.5" />
							<span>Lead data</span>
						</div>
						{sections.leadData ? (
							<ChevronDown className="text-fg-muted size-3.5" />
						) : (
							<ChevronRight className="text-fg-muted size-3.5" />
						)}
					</button>

					<button
						type="button"
						onClick={() => toggleSection("recentConversations")}
						className="text-fg flex w-full items-center justify-between py-1 font-semibold">
						<div className="flex items-center gap-2">
							<MessageSquare className="text-fg-muted size-3.5" />
							<span>Recent conversations</span>
						</div>
						{sections.recentConversations ? (
							<ChevronDown className="text-fg-muted size-3.5" />
						) : (
							<ChevronRight className="text-fg-muted size-3.5" />
						)}
					</button>

					<button
						type="button"
						onClick={() => toggleSection("leadNotes")}
						className="text-fg flex w-full items-center justify-between py-1 font-semibold">
						<div className="flex items-center gap-2">
							<User className="text-fg-muted size-3.5" />
							<span>Lead notes</span>
						</div>
						{sections.leadNotes ? (
							<ChevronDown className="text-fg-muted size-3.5" />
						) : (
							<ChevronRight className="text-fg-muted size-3.5" />
						)}
					</button>

					<button
						type="button"
						onClick={() => toggleSection("leadTags")}
						className="text-fg flex w-full items-center justify-between py-1 font-semibold">
						<div className="flex items-center gap-2">
							<Tag className="text-fg-muted size-3.5" />
							<span>Lead tags</span>
						</div>
						{sections.leadTags ? (
							<ChevronDown className="text-fg-muted size-3.5" />
						) : (
							<ChevronRight className="text-fg-muted size-3.5" />
						)}
					</button>

					<button
						type="button"
						onClick={() => toggleSection("leadSegments")}
						className="text-fg flex w-full items-center justify-between py-1 font-semibold">
						<div className="flex items-center gap-2">
							<Users className="text-fg-muted size-3.5" />
							<span>Lead segments</span>
						</div>
						{sections.leadSegments ? (
							<ChevronDown className="text-fg-muted size-3.5" />
						) : (
							<ChevronRight className="text-fg-muted size-3.5" />
						)}
					</button>
				</div>
			</div>
		</aside>
	)
}
