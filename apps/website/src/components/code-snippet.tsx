import React from "react"
import { Check, CopyIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useCopyPaste } from "@/hooks/use-copy-paste"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code"

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
		<div className={cn("bg-fill-level2 mb-4 overflow-hidden rounded-xl", className)}>
			<div className="flex items-center justify-between px-4 pb-2 pt-3">
				<span className="text-text-secondary font-mono text-xs">{title}</span>
				<Button variant="ghost" color="neutral" size={"28"} isIcon aria-label="Copy command" onClick={copy}>
					{copied ? <Check /> : <CopyIcon />}
				</Button>
			</div>
			<CodeArea
				language="tsx"
				theme={theme === "dark" ? "github-dark-high-contrast" : "github-light"}
				code={code}
				copiable={false}
				showLineNumbers={showLineNumber}
				className={cn("border-soft rounded-[10px] border px-4 py-3", className)}
			/>
		</div>
	)
}
