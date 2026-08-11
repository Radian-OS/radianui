"use client"

import { useCallback, useState } from "react"
import { Check, ChevronDown, Copy } from "lucide-react"
import { Button } from "@/registry/ui/button"
import {
	Dropdown,
	DropdownContent,
	DropdownItem,
	DropdownTrigger,
} from "@/registry/ui/dropdown-menu"

interface DocPageActionsProps {
	slugAsParams: string
	title: string
}

async function fetchRawMarkdown(slugAsParams: string): Promise<string> {
	const res = await fetch(`/api/raw-docs/${slugAsParams}`)
	if (!res.ok) throw new Error("Failed to fetch markdown")
	return res.text()
}

function buildShortPrompt(title: string, pageUrl: string): string {
	return `I'm looking at this Radian documentation: ${pageUrl}.
Help me understand how to use the "${title}" component. Be ready to explain concepts, give examples, or help debug based on it.`
}

export function DocPageActions({ slugAsParams, title }: DocPageActionsProps) {
	const [open, setOpen] = useState(false)
	const [copied, setCopied] = useState(false)

	const handleCopyPage = useCallback(async () => {
		try {
			const markdown = await fetchRawMarkdown(slugAsParams)
			await navigator.clipboard.writeText(markdown)
			setCopied(true)
			setTimeout(() => setCopied(false), 5000)
		} catch (err) {
			console.error("Failed to copy markdown:", err)
		}
	}, [slugAsParams])

	const handleViewMarkdown = useCallback(() => {
		window.open(`/docs/${slugAsParams}.md`, "_blank")
		setOpen(false)
	}, [slugAsParams])

	const handleOpenInChatGPT = useCallback(() => {
		const pageUrl = `${window.location.origin}/docs/${slugAsParams}`
		const prompt = encodeURIComponent(buildShortPrompt(title, pageUrl))
		window.open(`https://chatgpt.com/?prompt=${prompt}`, "_blank")
		setOpen(false)
	}, [slugAsParams, title])

	const handleOpenInClaude = useCallback(async () => {
		try {
			const pageUrl = `${window.location.origin}/docs/${slugAsParams}`
			const prompt = encodeURIComponent(buildShortPrompt(title, pageUrl))
			window.open(`https://claude.ai/new?q=${prompt}`, "_blank")
		} catch (err) {
			console.error("Failed to open in Claude:", err)
		}
		setOpen(false)
	}, [slugAsParams, title])

	return (
		<div className="flex items-center">
			<Button
				variant="outline"
				color="neutral"
				size="28"
				onClick={handleCopyPage}
				className="rounded-r-none border-r-0">
				{copied ? (
					<Check className="text-fg-secondary size-3.5" />
				) : (
					<Copy className="text-fg-secondary size-3.5" />
				)}
				<p className="hidden sm:block">Copy Page</p>
			</Button>
			<Dropdown open={open} onOpenChange={setOpen}>
				<DropdownTrigger asChild>
					<Button
						color="neutral"
						variant="outline"
						size="28"
						className="rounded-l-none px-1">
						<ChevronDown className="text-fg-secondary size-3.5" />
					</Button>
				</DropdownTrigger>
				<DropdownContent align="end" className="w-56">
					<DropdownItem onSelect={handleViewMarkdown}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							viewBox="0 0 24 24">
							<title>Markdown</title>
							<path d="M22.27 19.385H1.73A1.73 1.73 0 010 17.655V6.345a1.73 1.73 0 011.73-1.73h20.54A1.73 1.73 0 0124 6.345v11.308a1.73 1.73 0 01-1.73 1.731zM5.769 15.923v-4.5l2.308 2.885 2.307-2.885v4.5h2.308V8.078h-2.308l-2.307 2.885-2.308-2.885H3.46v7.847zM21.232 12h-2.309V8.077h-2.307V12h-2.308l3.461 4.039z" />
						</svg>
						View as Markdown
					</DropdownItem>
					<DropdownItem onSelect={handleOpenInChatGPT}>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
							<title>ChatGPT</title>
							<path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
						</svg>
						Open in ChatGPT
					</DropdownItem>
					<DropdownItem onSelect={handleOpenInClaude}>
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="currentColor"
							role="img">
							<title>Anthropic</title>
							<path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
						</svg>
						Open in Claude
					</DropdownItem>
				</DropdownContent>
			</Dropdown>
		</div>
	)
}
