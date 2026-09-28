"use client"

import Link from "next/link"
import { toast } from "sonner"
import { Button } from "@/registry/ui/button"
import { emojis } from "./emoji-data"

export function EmojiHeroActionButtons() {
	const handleCopyRandom = () => {
		const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]
		if (!randomEmoji) return

		navigator.clipboard.writeText(randomEmoji.emoji)
		toast.success(`Copied ${randomEmoji.emoji} to clipboard`)
	}

	return (
		<>
			<Button
				asChild
				size="40"
				className="bg-elevation-level1/20 dark:hover:bg-fill2/40 hover:bg-fill2/40 w-full backdrop-blur-md sm:w-fit"
				variant="outline"
				color="neutral">
				<Link href="/docs/getting-started/resources">Explore Resources</Link>
			</Button>
			<Button
				onClick={handleCopyRandom}
				variant="glossy"
				className="w-full sm:w-fit"
				size="40">
				Copy Random Emoji
			</Button>
		</>
	)
}
