"use client"

import React from "react"
import { Check, Clipboard, Terminal } from "lucide-react"
import { useTheme } from "next-themes"
import { useCopyPaste } from "@/hooks/use-copy-paste"
import { cn } from "@/lib/utils"
import { Button } from "@/styles/default/ui/button"
import { CodeArea } from "@/styles/default/ui/code-area"
import { CodeCollapsibleWrapper } from "./code-collapsible-wrapper"

interface CodeSnippetProps {
	code: string
	title: string
	collapsible?: boolean
	showLineNumber?: boolean
	className?: string
}

export default function CodeSnippet({
	code,
	title,
	collapsible = false,
	showLineNumber = false,
	className,
}: CodeSnippetProps) {
	const { theme } = useTheme()
	const { copied, copy } = useCopyPaste({
		code,
		eventName: "block_cli_copy",
		title: title || "CodeSnippet",
		category: "CodeSnippet",
	})

	return (
		<div
			className={cn(
				"bg-fill2 flex flex-col gap-2 rounded-xl p-1.5",
				className
			)}>
			<div className="inline-flex items-center gap-3 px-1 py-0.5">
				<span className="bg-bg text-fg-tertiary rounded-md p-1">
					<Terminal className="size-4" />
				</span>
				<span className="text-fg-secondary flex-1 text-sm">{title}</span>
				<Button
					className="text-fg-secondary"
					variant="ghost"
					color="neutral"
					size={"28"}
					aria-label="Copy command"
					onClick={copy}>
					{copied ? <Check size={20} /> : <Clipboard size={20} />}
				</Button>
			</div>
			{collapsible && (
				<CodeCollapsibleWrapper>
					<CodeArea
						language="tsx"
						theme={
							theme === "dark" ? "github-dark-high-contrast" : "github-light"
						}
						code={code}
						lineNumbers={showLineNumber}
						className={cn(
							"border-soft flex-1 rounded-[10px] border",
							className
						)}
					/>
				</CodeCollapsibleWrapper>
			)}
			{!collapsible && (
				<CodeArea
					language="tsx"
					theme={
						theme === "dark" ? "github-dark-high-contrast" : "github-light"
					}
					code={code}
					lineNumbers={showLineNumber}
					className={cn("border-soft flex-1 rounded-[10px] border", className)}
				/>
			)}
		</div>
	)
}
