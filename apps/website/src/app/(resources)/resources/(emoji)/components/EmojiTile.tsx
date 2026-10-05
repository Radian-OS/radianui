import { type MouseEvent, memo } from "react"
import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"
import type { EmojiData } from "./emoji-data"
import { formatEmojiName, getEmojiPagePath } from "./emoji-data"
import styles from "./emoji-font.module.css"

export const EmojiTile = memo(function EmojiTile({
	emoji,
	onSelect,
}: {
	emoji: EmojiData
	onSelect: (emoji: EmojiData) => void
}) {
	const displayName = formatEmojiName(emoji.name)

	const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

		event.preventDefault()
		onSelect(emoji)
	}

	return (
		<li className="size-[100px] min-w-0">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						asChild
						size="32"
						color="neutral"
						variant="outline"
						className="bg-bg hover:bg-bg size-full rounded-xl p-0">
						<Link
							href={getEmojiPagePath(emoji)}
							prefetch={false}
							onClick={handleClick}
							aria-label={`View ${displayName} emoji details`}>
							<span className="sr-only">{displayName} emoji</span>
							<span
								className={`${styles.emojiFont} flex h-12 w-8 items-center justify-center text-[32px] leading-[48px]`}
								aria-hidden="true">
								{emoji.emoji}
							</span>
						</Link>
					</Button>
				</TooltipTrigger>
				<TooltipContent
					theme="light"
					side="top"
					className="z-110 text-xs whitespace-nowrap">
					{displayName}
				</TooltipContent>
			</Tooltip>
		</li>
	)
})
