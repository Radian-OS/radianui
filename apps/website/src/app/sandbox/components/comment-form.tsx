"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Send, User, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/styles/default/ui/button"
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

const commentFormSchema = z.object({
	authorName: z
		.string()
		.min(1, "Name is required")
		.max(50, "Name must be under 50 characters"),
	content: z
		.string()
		.min(2, "Comment must be at least 2 characters")
		.max(500, "Comment must be under 500 characters"),
})

export type CommentFormValues = z.infer<typeof commentFormSchema>

interface CommentFormProps {
	elementTag: string
	elementSelector: string
	onSubmit: (values: CommentFormValues) => Promise<void> | void
	onCancel: () => void
	isSubmitting?: boolean
}

export function CommentForm({
	elementTag,
	elementSelector,
	onSubmit,
	onCancel,
	isSubmitting = false,
}: CommentFormProps) {
	const form = useForm<CommentFormValues>({
		resolver: zodResolver(commentFormSchema),
		defaultValues: {
			authorName: "Reviewer",
			content: "",
		},
	})

	const handleSubmit = form.handleSubmit(async (data) => {
		await onSubmit(data)
		form.reset()
	})

	return (
		<div className="border-border bg-background animate-in fade-in zoom-in-95 w-[320px] rounded-xl border p-4 shadow-xl backdrop-blur-md duration-150">
			{/* Header info */}
			<div className="border-border/60 mb-3 flex items-center justify-between border-b pb-2">
				<div className="flex items-center gap-1.5 overflow-hidden">
					<span className="bg-fill3 text-primary rounded-md px-1.5 py-0.5 font-mono text-[11px] font-bold">
						&lt;{elementTag}&gt;
					</span>
					{elementSelector && (
						<span
							className="text-fg-tertiary truncate text-xs"
							title={elementSelector}>
							{elementSelector}
						</span>
					)}
				</div>
				<Button
					type="button"
					variant="ghost"
					color="neutral"
					size="28"
					onClick={onCancel}
					className="text-fg-tertiary hover:text-foreground size-6 p-0">
					<X className="size-3.5" />
				</Button>
			</div>

			<Form {...form}>
				<form onSubmit={handleSubmit} className="space-y-3">
					{/* Author name field */}
					<FormField
						control={form.control}
						name="authorName"
						render={({ field }) => (
							<FormItem className="space-y-1">
								<FormLabel className="text-fg-secondary flex items-center gap-1 text-[11px] font-medium">
									<User className="size-3" />
									<span>Your Name</span>
								</FormLabel>
								<FormControl>
									<Input
										placeholder="e.g. Alex"
										size="32"
										className="text-xs"
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-[11px]" />
							</FormItem>
						)}
					/>

					{/* Comment content field */}
					<FormField
						control={form.control}
						name="content"
						render={({ field }) => (
							<FormItem className="space-y-1">
								<FormLabel className="text-fg-secondary text-[11px] font-medium">
									Comment
								</FormLabel>
								<FormControl>
									<TextArea
										placeholder="Write your feedback..."
										rows={3}
										className="resize-none text-xs"
										autoFocus
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-[11px]" />
							</FormItem>
						)}
					/>

					{/* Action Buttons */}
					<div className="flex items-center justify-end gap-2 pt-1">
						<Button
							type="button"
							variant="outline"
							color="neutral"
							size="32"
							onClick={onCancel}
							disabled={isSubmitting}
							className="text-xs">
							Cancel
						</Button>
						<Button
							type="submit"
							variant="strong"
							color="primary"
							size="32"
							loading={isSubmitting}
							className="text-xs font-semibold">
							<Send className="size-3.5" />
							<span>Post</span>
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}
