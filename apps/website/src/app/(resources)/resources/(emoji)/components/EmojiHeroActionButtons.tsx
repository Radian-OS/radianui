"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { showEmojiToast } from "./EmojiToast"
import type { EmojiData } from "./emoji-data"
import { getSupportedEmojis } from "./emoji-support"

export function EmojiHeroActionButtons() {
	const [supportedEmojis, setSupportedEmojis] = useState<EmojiData[] | null>(
		null
	)

	useEffect(() => {
		let isCurrent = true

		getSupportedEmojis().then((nextEmojis) => {
			if (isCurrent) setSupportedEmojis(nextEmojis)
		})

		return () => {
			isCurrent = false
		}
	}, [])

	const handleCopyRandom = () => {
		if (!supportedEmojis?.length) return

		const randomEmoji =
			supportedEmojis[Math.floor(Math.random() * supportedEmojis.length)]
		if (!randomEmoji) return

		navigator.clipboard.writeText(randomEmoji.emoji)
		showEmojiToast({
			emoji: randomEmoji.emoji,
			description: `${randomEmoji.emoji} has been copied to your clipboard.`,
		})
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
				disabled={!supportedEmojis?.length}
				variant="glossy"
				className="w-full sm:w-fit"
				size="40">
				Copy Random Emoji
			</Button>
		</>
	)
}
