"use client"

import React, { useState } from "react"
import { SidebarProvider } from "@/styles/default/ui/sidebar"
import { ChatArea } from "./chat-area"
import { ConversationList } from "./conversation-list"
import { DetailsSidebar } from "./details-sidebar"
import { IconRail } from "./icon-rail"
import { InboxNav } from "./inbox-nav"
import { TrialBanner } from "./trial-banner"
import type { Conversation } from "./types"

const initialConversations: Conversation[] = [
	{
		id: "brook-taylor",
		name: "Brook Taylor",
		avatarText: "-",
		avatarBgClass: "bg-error",
		preview: "Hi there, i just came accross SLMobbin. What do you guys do?",
		time: "1m",
		channel: "facebook",
		status: "open",
		messages: [
			{
				id: "msg-1",
				sender: "Brook Taylor",
				isUser: true,
				avatarText: "-",
				avatarBgClass: "bg-error",
				content: "Hi there, i just came accross SLMobbin. What do you guys do?",
				time: "1m",
			},
			{
				id: "msg-2",
				sender: "Fin AI Agent",
				isUser: false,
				isAgentFin: true,
				content: "SL Mobbin will be back tomorrow.",
				time: "1m",
			},
			{
				id: "msg-3",
				sender: "Fin AI Agent",
				isUser: false,
				isAgentFin: true,
				content: "You'll get a notification when they reply.",
				time: "Sent • 1m",
			},
		],
	},
	{
		id: "john-doe",
		name: "john doe",
		avatarText: "M",
		avatarBgClass: "bg-primary",
		preview: "Install Messenger",
		time: "1h",
		channel: "messenger",
		status: "open",
		messages: [
			{
				id: "jd-1",
				sender: "john doe",
				isUser: true,
				avatarText: "M",
				avatarBgClass: "bg-primary",
				content: "How do I install Messenger on my website?",
				time: "1h",
			},
		],
	},
	{
		id: "email-demo",
		name: "Email · [Demo]",
		avatarText: "E",
		avatarBgClass: "bg-info",
		preview: "This is a demo email. It s...",
		time: "6d",
		channel: "email",
		status: "open",
		messages: [
			{
				id: "em-1",
				sender: "Customer",
				isUser: true,
				avatarText: "E",
				avatarBgClass: "bg-info",
				content: "This is a demo email to test inbound ticketing.",
				time: "6d",
			},
		],
	},
	{
		id: "whatsapp-demo",
		name: "WhatsApp · [Demo]",
		avatarText: "W",
		avatarBgClass: "bg-success",
		preview: "Set up WhatsApp or soci...",
		time: "6d",
		channel: "whatsapp",
		status: "open",
		messages: [
			{
				id: "wa-1",
				sender: "Customer",
				isUser: true,
				avatarText: "W",
				avatarBgClass: "bg-success",
				content: "Set up WhatsApp or social messaging channels.",
				time: "6d",
			},
		],
	},
	{
		id: "phone-demo",
		name: "Phone · [Demo]",
		avatarText: "P",
		avatarBgClass: "bg-warning",
		preview: "Set up phone or SMS",
		time: "6d",
		channel: "phone",
		status: "open",
		messages: [
			{
				id: "ph-1",
				sender: "Customer",
				isUser: true,
				avatarText: "P",
				avatarBgClass: "bg-warning",
				content: "Set up phone or SMS voice integration.",
				time: "6d",
			},
		],
	},
]

export default function IntercomPage() {
	const [conversations, setConversations] =
		useState<Conversation[]>(initialConversations)
	const [activeConversationId, setActiveConversationId] =
		useState<string>("brook-taylor")

	const activeConversation =
		conversations.find((c) => c.id === activeConversationId) || conversations[0]

	const handleSendMessage = (text: string) => {
		const newMsg = {
			id: `msg-${Date.now()}`,
			sender: "Alex Smith",
			isUser: false,
			content: text,
			time: "Just now",
		}

		setConversations((prev) =>
			prev.map((c) => {
				if (c.id === activeConversationId) {
					return {
						...c,
						messages: [...c.messages, newMsg],
						preview: text,
						time: "Just now",
					}
				}
				return c
			})
		)
	}

	return (
		<div className="bg-bg text-fg flex h-screen w-full flex-col overflow-hidden antialiased">
			{/* Top Trial Banner */}
			<TrialBanner />

			{/* Main Multi-Pane Workspace Container */}
			<div className="flex flex-1 overflow-hidden">
				{/* Far Left Navigation Icon Rail */}
				<IconRail />

				{/* Inbox Folders Sidebar (native Radian OS Sidebar) */}
				<div className="hidden h-full md:flex">
					<SidebarProvider
						defaultWidth="14rem"
						className="h-full min-h-0 w-auto">
						<InboxNav />
					</SidebarProvider>
				</div>

				{/* Conversation List */}
				<div className="hidden sm:flex">
					<ConversationList
						conversations={conversations}
						activeId={activeConversationId}
						onSelectConversation={setActiveConversationId}
					/>
				</div>

				{/* Active Chat Conversation Area */}
				<main className="flex flex-1 flex-col overflow-hidden">
					<ChatArea
						conversation={activeConversation}
						onSendMessage={handleSendMessage}
					/>
				</main>

				{/* Right Details / Copilot Sidebar */}
				<div className="hidden xl:flex">
					<DetailsSidebar />
				</div>
			</div>
		</div>
	)
}
