"use client"

import React from "react"
import {
	ArrowDownUp,
	Columns2,
	Columns3,
	CreditCard,
	MoreHorizontal,
} from "lucide-react"
import { IconButton } from "@/styles/default/ui/button"
import type { Conversation } from "./types"

interface ConversationListProps {
	conversations: Conversation[]
	activeId: string
	onSelectConversation: (id: string) => void
}

export function ConversationList({
	conversations,
	activeId,
	onSelectConversation,
}: ConversationListProps) {
	return (
		<div className="border-border/60 bg-bg flex h-full w-72 shrink-0 flex-col justify-between border-r text-xs transition-colors select-none">
			{/* Top Bar: Assignee Name, 5 Open, Sort */}
			<div className="border-border/40 flex h-12 items-center justify-between border-b px-3">
				<div className="flex items-center gap-2">
					<CreditCard className="text-fg-secondary size-4" />
					<h3 className="heading-6 text-fg text-sm font-semibold">
						Alex Smith
					</h3>
				</div>

				<div className="flex items-center gap-1.5">
					<span className="bg-fill1 border-border text-fg rounded-full border px-2 py-0.5 text-[11px] font-medium">
						5 Open
					</span>
					<button
						type="button"
						className="text-fg-secondary hover:text-fg flex cursor-pointer items-center gap-1 text-[11px] font-medium transition-colors">
						<span>Last activity</span>
						<ArrowDownUp className="size-3" />
					</button>
				</div>
			</div>

			{/* Conversations List */}
			<div className="flex-1 space-y-1 overflow-y-auto p-2">
				{conversations.map((item) => {
					const isActive = item.id === activeId
					return (
						<div
							key={item.id}
							onClick={() => onSelectConversation(item.id)}
							className={`relative flex cursor-pointer flex-col gap-1 rounded-xl p-3 transition-all ${
								isActive
									? "bg-fill2 border-border border shadow-xs"
									: "text-fg-secondary hover:bg-fill1 hover:text-fg border border-transparent"
							}`}>
							{/* Card header row */}
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2.5">
									<div
										className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-xs ${item.avatarBgClass}`}>
										{item.avatarText}
									</div>
									<span
										className={`text-xs font-semibold ${
											isActive ? "text-fg" : "text-fg/85"
										}`}>
										{item.name}
									</span>
								</div>

								<div className="flex items-center gap-1">
									{isActive && (
										<IconButton
											type="button"
											variant="ghost"
											color="neutral"
											size="28"
											aria-label="Conversation options"
											className="text-fg-secondary hover:text-fg -mr-1">
											<MoreHorizontal className="size-3.5" />
										</IconButton>
									)}
									<span className="text-fg-tertiary text-[11px]">
										{item.time}
									</span>
								</div>
							</div>

							{/* Preview snippet */}
							<p className="text-fg-secondary line-clamp-2 pl-8.5 text-xs">
								{item.preview}
							</p>
						</div>
					)
				})}
			</div>

			{/* Bottom layout switchers */}
			<div className="border-border/40 flex h-10 items-center justify-center border-t px-3">
				<div className="bg-fill1 border-border flex items-center rounded-full border p-0.5 shadow-xs">
					<button
						type="button"
						aria-label="Two pane view"
						className="text-fg-secondary hover:text-fg cursor-pointer rounded-full px-2 py-0.5 transition-colors">
						<Columns2 className="size-3.5" />
					</button>
					<button
						type="button"
						aria-label="Three pane view"
						className="bg-bg text-fg cursor-pointer rounded-full px-2 py-0.5 shadow-xs transition-colors">
						<Columns3 className="size-3.5" />
					</button>
				</div>
			</div>
		</div>
	)
}
