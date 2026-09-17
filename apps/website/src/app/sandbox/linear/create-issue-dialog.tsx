"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button, IconButton } from "@/styles/default/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/styles/default/ui/form"
import { Input } from "@/styles/default/ui/input"
import { TextArea } from "@/styles/default/ui/text-area"
import type { Issue, IssuePriority, IssueStatus } from "./types"

const issueSchema = z.object({
	title: z.string().min(2, "Issue title must be at least 2 characters"),
	description: z.string().optional(),
	status: z.enum([
		"todo",
		"in_progress",
		"done",
		"backlog",
		"canceled",
		"duplicate",
	]),
	priority: z.enum(["urgent", "high", "medium", "low", "none"]),
	tag: z.string().min(1, "Please enter a tag (e.g. UX, Research)"),
})

type IssueFormValues = z.infer<typeof issueSchema>

interface CreateIssueDialogProps {
	isOpen: boolean
	onClose: () => void
	onAddIssue: (newIssue: Issue) => void
	defaultStatus?: IssueStatus
}

export function CreateIssueDialog({
	isOpen,
	onClose,
	onAddIssue,
	defaultStatus = "todo",
}: CreateIssueDialogProps) {
	const form = useForm<IssueFormValues>({
		resolver: zodResolver(issueSchema),
		defaultValues: {
			title: "",
			description: "",
			status: defaultStatus,
			priority: "medium",
			tag: "UX",
		},
	})

	if (!isOpen) return null

	const onSubmit = (data: IssueFormValues) => {
		const newId = `AS-${Math.floor(Math.random() * 90 + 21)}`
		const newIssue: Issue = {
			id: newId,
			title: data.title,
			status: data.status,
			priority: data.priority,
			createdDate: "Just now",
			tags: [
				{
					label: data.tag,
					dotColorClass:
						data.tag.toLowerCase() === "research"
							? "bg-emerald-500"
							: data.tag.toLowerCase() === "documentation"
								? "bg-amber-500"
								: data.tag.toLowerCase() === "feature"
									? "bg-purple-500"
									: "bg-cyan-500",
				},
			],
		}
		onAddIssue(newIssue)
		form.reset()
		onClose()
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
			<div className="bg-bg border-border flex w-full max-w-lg flex-col rounded-xl border p-5 shadow-xl">
				{/* Dialog Header */}
				<div className="border-border/40 flex items-center justify-between border-b pb-3">
					<h3 className="text-fg text-sm font-semibold">Create new issue</h3>
					<IconButton
						type="button"
						variant="ghost"
						color="neutral"
						size="28"
						aria-label="Close dialog"
						onClick={onClose}
						className="text-fg-muted hover:text-fg">
						<X className="size-4" />
					</IconButton>
				</div>

				{/* Validated Form */}
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="mt-4 space-y-4">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-fg text-xs font-medium">
										Issue title
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="e.g. Conduct user feedback session"
											className="bg-elevation-level1/60 text-sm"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="tag"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-fg text-xs font-medium">
										Primary Tag
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="e.g. UX, Research, Feature"
											className="bg-elevation-level1/60 text-sm"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-fg text-xs font-medium">
										Description (optional)
									</FormLabel>
									<FormControl>
										<TextArea
											{...field}
											placeholder="Add any additional details or requirements..."
											rows={3}
											className="bg-elevation-level1/60 text-sm"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Action Buttons */}
						<div className="flex items-center justify-end gap-2 pt-2">
							<Button
								type="button"
								variant="outline"
								color="neutral"
								size="32"
								onClick={onClose}>
								Cancel
							</Button>
							<Button type="submit" variant="strong" color="primary" size="32">
								Create Issue
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	)
}
