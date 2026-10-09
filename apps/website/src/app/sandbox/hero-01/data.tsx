import React from "react"
import { cn } from "@/lib/utils"
import type { ModelItem, NavItem } from "./types"

export const DEFAULT_NAV_ITEMS: NavItem[] = [
	{ name: "Home", href: "#", isActive: true },
	{ name: "Top Picks", href: "#" },
	{ name: "Alternatives", href: "#" },
	{ name: "Trending", href: "#" },
]

export const DEFAULT_MODELS: ModelItem[] = [
	{
		id: "chatgpt",
		label: "ChatGPT",
		tag: "OpenAI",
		icon: ({ className }: { className?: string }) => (
			<>
				<img
					src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/ai/icon/chatgpt.svg"
					alt="ChatGPT"
					className={cn("hidden size-7 dark:block", className)}
				/>
				<img
					src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/ai/icon/chatgpt.svg"
					alt="ChatGPT"
					className={cn("block size-7 dark:hidden", className)}
				/>
			</>
		),
	},
	{
		id: "claude",
		label: "Claude",
		tag: "Anthropic",
		icon: ({ className }: { className?: string }) => (
			<img
				src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/ai/icon/claude.svg"
				alt="Claude"
				className={cn("size-7", className)}
			/>
		),
	},
	{
		id: "gemini",
		label: "Gemini",
		tag: "Google",
		icon: ({ className }: { className?: string }) => (
			<img
				src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/ai/icon/gemini.svg"
				alt="Gemini"
				className={cn("size-7", className)}
			/>
		),
	},
	{
		id: "ollama",
		label: "Ollama",
		tag: "Local AI",
		icon: ({ className }: { className?: string }) => (
			<>
				<img
					src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/ai/icon/ollama.svg"
					alt="Ollama"
					className={cn("hidden size-7 dark:block", className)}
				/>
				<img
					src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/ai/icon/ollama.svg"
					alt="Ollama"
					className={cn("block size-7 dark:hidden", className)}
				/>
			</>
		),
	},
	{
		id: "grok",
		label: "Grok",
		tag: "xAI",
		icon: ({ className }: { className?: string }) => (
			<>
				<img
					src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/ai/icon/grok.svg"
					alt="Grok"
					className={cn("hidden size-7 dark:block", className)}
				/>
				<img
					src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/ai/icon/grok.svg"
					alt="Grok"
					className={cn("block size-7 dark:hidden", className)}
				/>
			</>
		),
	},
]
