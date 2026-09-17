"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	Archive,
	ChevronDown,
	Moon,
	MoreHorizontal,
	Send,
	Sparkles,
	Star,
	UserCheck,
	Zap,
} from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button, IconButton } from "@/styles/default/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/styles/default/ui/form"
import type { Conversation, Message } from "./types"

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
		<div className="bg-bg flex h-full flex-1 flex-col overflow-hidden text-xs transition-colors">
			{/* Top Conversation Header */}
			<div className="border-border/60 flex h-12 shrink-0 items-center justify-between border-b px-4">
				<h3 className="heading-5 text-fg text-base font-bold">
					{conversation.name}
				</h3>

				<div className="flex items-center gap-1">
					<IconButton
						type="button"
						variant="ghost"
						color="neutral"
						size="28"
						aria-label="Star conversation"
						onClick={() => setIsStarred(!isStarred)}
						className="text-fg-muted hover:text-fg">
						<Star
							className={`size-4 ${
								isStarred ? "fill-amber-400 text-amber-400" : "text-fg-muted"
							}`}
						/>
					</IconButton>

					<IconButton
						type="button"
						variant="ghost"
						color="neutral"
						size="28"
						aria-label="More options"
						className="text-fg-muted hover:text-fg">
						<MoreHorizontal className="size-4" />
					</IconButton>

					<IconButton
						type="button"
						variant="ghost"
						color="neutral"
						size="28"
						aria-label="Archive conversation"
						className="text-fg-muted hover:text-fg">
						<Archive className="size-4" />
					</IconButton>

					<IconButton
						type="button"
						variant="ghost"
						color="neutral"
						size="28"
						aria-label="Snooze"
						className="text-fg-muted hover:text-fg">
						<Moon className="size-4" />
					</IconButton>

					<IconButton
						type="button"
						variant="ghost"
						color="neutral"
						size="28"
						aria-label="Assign / Close"
						className="text-fg-muted hover:text-fg">
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
							<div
								className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-xs ${
									msg.avatarBgClass || "bg-rose-400"
								}`}>
								{msg.avatarText || "-"}
							</div>
						)}

						{/* Message bubble */}
						<div
							className={`flex max-w-md flex-col gap-1.5 ${
								msg.isUser ? "items-start" : "items-end"
							}`}>
							<div
								className={`rounded-2xl px-4 py-2.5 text-xs leading-relaxed sm:text-sm ${
									msg.isUser
										? "bg-elevation-level1 border-border/60 text-fg rounded-tl-sm border shadow-xs"
										: "rounded-tr-sm bg-blue-100 text-blue-950 dark:bg-blue-950/70 dark:text-blue-100"
								}`}>
								{msg.content}
							</div>

							<div className="text-fg-muted flex items-center gap-1.5 text-[11px]">
								<span>{msg.time}</span>
								{!msg.isUser && (
									<div className="text-fg-muted/80 flex items-center gap-1">
										<span>•</span>
										<Sparkles className="size-3 text-blue-500" />
									</div>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Bottom Message Composer (Rule 2 & 3: Form with Zod validation) */}
			<div className="border-border/60 border-t p-4">
				<div className="border-border/60 bg-bg focus-within:border-border rounded-xl border p-3 shadow-xs">
					{/* Composer Channel dropdown */}
					<div className="border-border/40 flex items-center justify-between border-b pb-2">
						<button
							type="button"
							className="hover:bg-elevation-level1 text-fg -ml-1 flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold transition-colors">
							<span>Facebook</span>
							<ChevronDown className="text-fg-muted size-3.5" />
						</button>
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
											<textarea
												{...field}
												rows={3}
												placeholder="Use ⌘K for shortcuts"
												className="placeholder:text-fg-muted/60 text-fg w-full resize-none bg-transparent text-xs outline-none sm:text-sm"
												onKeyDown={(e) => {
													if (e.key === "Enter" && !e.shiftKey) {
														e.preventDefault()
														form.handleSubmit(onSubmit)()
													}
												}}
											/>
										</FormControl>
										<FormMessage className="text-[11px]" />
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
									aria-label="Macros and saved replies"
									className="text-fg-muted hover:text-fg">
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
