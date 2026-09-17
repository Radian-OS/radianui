import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"
import type { EmojiData } from "./emoji-data"
import { formatEmojiName, getEmojiPagePath } from "./emoji-data"

export function EmojiTile({ emoji }: { emoji: EmojiData }) {
	const displayName = formatEmojiName(emoji.name)

	return (
		<li className="size-[100px]">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						asChild
						size="32"
						color="neutral"
						variant="outline"
						className="bg-bg hover:bg-bg size-[100px] rounded-xl p-0">
						<Link
							href={getEmojiPagePath(emoji)}
							aria-label={`View ${displayName} emoji details`}>
							<span
								className="flex h-12 w-8 items-center justify-center text-[32px] leading-[48px]"
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
}
