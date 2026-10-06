"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	Archive,
	Check,
	ChevronDown,
	Moon,
	MoreHorizontal,
	Star,
	UserCheck,
	Zap,
} from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button, IconButton } from "@/styles/default/ui/button"
import { Avatar, AvatarFallback } from "@/styles/default/ui/avatar"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/styles/default/ui/form"
import type { Conversation } from "./types"
import { TextArea } from "@/registry/ui/text-area"

const chatMessageSchema = z.object({
	messageText: z.string().min(1, "Message cannot be empty"),
})

type ChatMessageFormValues = z.infer<typeof chatMessageSchema>

interface ChatAreaProps {
	conversation: Conversation
	onSendMessage: (text: string) => void
}

export function ChatArea({ conversation, onSendMessage }: ChatAreaProps) {
	const [isStarred, setIsStarred] = useState(false)

	const form = useForm<ChatMessageFormValues>({
		resolver: zodResolver(chatMessageSchema),
		defaultValues: {
			messageText: "",
		},
	})

	const onSubmit = (data: ChatMessageFormValues) => {
		onSendMessage(data.messageText)
		form.reset()
	}

	return (
		<div className="flex h-full flex-1 flex-col overflow-hidden text-xs transition-colors">
			{/* Top Conversation Header */}
			<div className="border-border flex h-12 shrink-0 items-center justify-between border-b px-4">
				<h3 className="heading-6 text-base">{conversation.name}</h3>

				<div className="flex items-center gap-1">
					<IconButton
						type="button"
						variant="ghost"
						color="neutral"
						size="28"
						aria-label="Star conversation"
						onClick={() => setIsStarred(!isStarred)}>
						<Star
							className={`size-4 ${
								isStarred ? "fill-warning text-warning" : ""
							}`}
						/>
					</IconButton>

					<IconButton
						type="button"
						variant="ghost"
						color="neutral"
						size="28"
						aria-label="More options">
						<MoreHorizontal className="size-4" />
					</IconButton>

					<IconButton
						type="button"
						variant="ghost"
						color="neutral"
						size="28"
						aria-label="Archive conversation">
						<Archive className="size-4" />
					</IconButton>

					<IconButton
						type="button"
						variant="ghost"
						color="neutral"
						size="28"
						aria-label="Snooze">
						<Moon className="size-4" />
					</IconButton>

					<IconButton
						type="button"
						variant="ghost"
						color="neutral"
						size="28"
						aria-label="Assign / Close">
						<UserCheck className="size-4" />
					</IconButton>
				</div>
			</div>

			{/* Main Scrollable Messages Thread */}
			<div className="flex-1 space-y-6 overflow-y-auto p-4 sm:p-6">
				{conversation.messages.map((msg) => (
					<div
						key={msg.id}
						className={`flex items-start gap-3 ${
							msg.isUser ? "justify-start" : "justify-end"
						}`}>
						{/* Inbound user avatar */}
						{msg.isUser && (
							<Avatar size="24" rounded="circle">
								<AvatarFallback>{msg.avatarText}</AvatarFallback>
							</Avatar>
						)}

						{/* Message bubble */}
						<div
							className={`flex max-w-md flex-col gap-1.5 ${
								msg.isUser ? "items-start" : "items-end"
							}`}>
							<div
								className={`rounded-2xl px-4 py-2.5 text-xs leading-relaxed sm:text-sm ${
									msg.isUser
										? "bg-card border-border text-fg rounded-tl-sm border "
										: "bg-primary text-fg border-primary-border rounded-tr-sm border"
								}`}>
								{msg.content}
							</div>

							<div className="text-fg-secondary flex items-center gap-1.5 text-sm">
								<span>{msg.time}</span>
								{!msg.isUser && (
									<div className="text-fg-tertiary flex items-center gap-1">
										<span>•</span>
										<Check className="text-primary size-3" />
									</div>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Bottom Message Composer */}
			<div className="border-border border-t p-4">
				<div className="border-border bg-bg focus-within:border-border rounded-xl border p-3 shadow-xs">
					{/* Composer Channel dropdown */}
					<div className="border-border flex items-center justify-between border-b pb-2">
						<Button color="neutral" size="28" type="button">
							<span>Facebook</span>
							<ChevronDown className="text-fg-tertiary size-3.5" />
						</Button>
					</div>

					{/* Form with Textarea Input */}
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="mt-2">
							<FormField
								control={form.control}
								name="messageText"
								render={({ field }) => (
									<FormItem className="space-y-0">
										<FormControl>
											<TextArea
												{...field}
												rows={3}
												placeholder="Use ⌘K for shortcuts"
												onKeyDown={(e) => {
													if (e.key === "Enter" && !e.shiftKey) {
														e.preventDefault()
														form.handleSubmit(onSubmit)()
													}
												}}
											/>
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>

							{/* Composer Bottom Toolbar */}
							<div className="mt-2 flex items-center justify-between pt-1">
								<IconButton
									type="button"
									variant="ghost"
									color="neutral"
									size="28"
									aria-label="Macros and saved replies">
									<Zap className="size-4" />
								</IconButton>

								<div className="flex items-center">
									<Button
										type="submit"
										variant="strong"
										color="primary"
										size="32"
										className="gap-1 rounded-lg px-3 text-xs font-semibold">
										<span>Send</span>
										<ChevronDown className="size-3 opacity-80" />
									</Button>
								</div>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</div>
	)
}
