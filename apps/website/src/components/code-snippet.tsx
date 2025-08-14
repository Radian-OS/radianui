import React from "react"

import { Check, CopyIcon, Terminal } from "lucide-react"
import { useTheme } from "next-themes"

import { useCopyPaste } from "@/hooks/use-copy-paste"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code-area"

interface CodeSnippetProps {
	code: string
	title: string
	showLineNumber?: boolean
	className?: string
}

export default function CodeSnippet({ code, title, showLineNumber = false, className }: CodeSnippetProps) {
	const { theme } = useTheme()
	const { copied, copy } = useCopyPaste({
		code,
		eventName: "block_cli_copy",
		title: title || "CodeSnippet",
		category: "CodeSnippet",
	})

	return (
		<div className={cn("bg-fill2 flex flex-col gap-2 rounded-xl p-1.5", className)}>
			<div className="inline-flex items-center gap-3 px-1 py-0.5">
				<span className="bg-base text-fg-tertiary rounded-md p-1">
					<Terminal className="size-4" />
				</span>
				<span className="text-fg-secondary flex-1 text-sm">{title}</span>
				<Button variant="ghost" color="neutral" size={"28"} iconOnly aria-label="Copy command" onClick={copy}>
					{copied ? <Check /> : <CopyIcon />}
				</Button>
			</div>
			<CodeArea
				language="tsx"
				theme={theme === "dark" ? "github-dark-high-contrast" : "github-light"}
				code={code}
				copiable={false}
				showLineNumbers={showLineNumber}
				className={cn("border-soft flex-1 rounded-[10px] border", className)}
			/>
		</div>
	)
}
