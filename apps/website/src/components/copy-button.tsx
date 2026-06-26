"use client"

import { Check, Clipboard } from "lucide-react"
import { useCopyPaste } from "@/hooks/use-copy-paste"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

export function CopyButton({
	value,
	className,
}: {
	value: string
	src?: string
	className?: string
}) {
	const { copied, copy } = useCopyPaste({
		code: value,
		eventName: "block_cli_copy",
		title: "Code",
		category: "CodeSnippet",
	})

	return (
		<Button
			className={cn("top-4.5 text-fg-secondary absolute right-3", className)}
			data-slot="copy-button"
			variant="ghost"
			color="neutral"
			size={"28"}
			aria-label="Copy command"
			onClick={copy}>
			{copied ? <Check size={20} /> : <Clipboard size={20} />}
		</Button>
	)
}
