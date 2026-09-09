"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, Code, Send, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/styles/default/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/styles/default/ui/form"
import { TextArea } from "@/styles/default/ui/text-area"
import { useAuth } from "../auth/auth-context"
import type { SourceLocation } from "./types"

const commentFormSchema = z.object({
	content: z
		.string()
		.min(2, "Comment must be at least 2 characters")
		.max(500, "Comment must be under 500 characters"),
})

export type CommentFormValues = {
	content: string
	authorName?: string
	file?: string
	lineNumber?: number
}

interface CommentFormProps {
	elementTag: string
	elementSelector: string
	sourceLocation?: SourceLocation | null
	onNavigateToCode?: (file: string, lineNumber: number) => void
	onSubmit: (values: CommentFormValues) => Promise<void> | void
	onCancel: () => void
	isSubmitting?: boolean
}

export function CommentForm({
	elementTag,
	elementSelector,
	sourceLocation,
	onNavigateToCode,
	onSubmit,
	onCancel,
	isSubmitting = false,
}: CommentFormProps) {
	const { user } = useAuth()

	const form = useForm<z.infer<typeof commentFormSchema>>({
		resolver: zodResolver(commentFormSchema),
		defaultValues: {
			content: "",
		},
	})

	const handleSubmit = form.handleSubmit(async (data) => {
		await onSubmit({
			content: data.content,
			authorName: user?.firstName || "",
			file: sourceLocation?.file,
			lineNumber: sourceLocation?.lineNumber,
		})
		form.reset({
			content: "",
		})
	})

	return (
		<div className="border-border bg-bg animate-in fade-in zoom-in-95 w-80 rounded-xl border p-3 shadow-xl duration-150">
			{/* Header info */}
			<div className="mb-2 flex items-center justify-between gap-2">
				<div className="flex min-w-0 items-center gap-1.5 overflow-hidden">
					<span className="bg-fill3 text-primary shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold">
						&lt;{elementTag}&gt;
					</span>
					{elementSelector && (
						<span
							className="text-fg-tertiary truncate font-mono text-[11px]"
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
					className="shrink-0">
					<X className="size-3.5" />
				</Button>
			</div>

			{/* Source Code Navigation Button */}
			{sourceLocation && onNavigateToCode && (
				<button
					type="button"
					onClick={() =>
						onNavigateToCode(sourceLocation.file, sourceLocation.lineNumber)
					}
					title={`Go to ${sourceLocation.file}:${sourceLocation.lineNumber} in code editor`}
					className="border-border bg-fill2/70 hover:bg-fill3 hover:border-primary/40 group mb-2.5 flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 text-left transition-all duration-150 active:scale-[0.98]">
					<div className="flex min-w-0 items-center gap-2">
						<div className="bg-primary/15 text-primary group-hover:bg-primary group-hover:text-primary-fg flex size-6 shrink-0 items-center justify-center rounded-md transition-colors">
							<Code className="size-3.5" />
						</div>
						<div className="flex min-w-0 flex-col">
							<span className="text-fg-tertiary text-[10px] font-medium uppercase tracking-wider">
								Source File
							</span>
							<span className="text-fg group-hover:text-primary truncate font-mono text-xs font-semibold">
								{sourceLocation.file}
								<span className="text-primary font-bold">
									:{sourceLocation.lineNumber}
								</span>
							</span>
						</div>
					</div>
					<div className="text-primary flex shrink-0 items-center gap-1 font-sans text-[11px] font-semibold">
						<span>View in Code</span>
						<ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
					</div>
				</button>
			)}

			<Form {...form}>
				<form onSubmit={handleSubmit} className="space-y-2.5">
					{/* Comment content */}
					<FormField
						control={form.control}
						name="content"
						render={({ field }) => (
							<FormItem className="space-y-1">
								<FormControl>
									<TextArea
										placeholder="Add a comment..."
										rows={2}
										className="resize-none text-xs leading-relaxed"
										autoFocus
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-[10px]" />
							</FormItem>
						)}
					/>

					{/* Actions */}
					<div className="flex items-center justify-end gap-1 pt-0.5">
						<Button
							type="button"
							variant="ghost"
							color="neutral"
							size="28"
							onClick={onCancel}
							disabled={isSubmitting}
							className="h-7 text-xs">
							Cancel
						</Button>
						<Button
							type="submit"
							variant="strong"
							color="primary"
							size="28"
							loading={isSubmitting}
							className="h-7 gap-1 text-xs font-semibold">
							<Send className="size-3" />
							<span>Post</span>
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}
