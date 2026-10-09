"use client"

import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { Button } from "@/registry/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuDivider,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import { ALL_EMOJI_CATEGORY, emojiGroups, emojis } from "./emoji-data"

const groupEmojis: Record<string, string> = {
	"Smileys & Emotion": "😁",
	"People & Body": "👋",
	"Animals & Nature": "🐶",
	"Food & Drink": "🍎",
	"Travel & Places": "🌍",
	Activities: "🎃",
	Objects: "👓",
	Symbols: "🔕",
	Flags: "🏁",
}

function CategoryEmoji({ emoji }: { emoji: string }) {
	return (
		<span
			className="flex size-5 shrink-0 items-center justify-center text-base leading-none"
			aria-hidden="true">
			{emoji}
		</span>
	)
}

interface EmojiCategoryDropdownProps {
	value: string
	onValueChange: (value: string) => void
	className?: string
	supportedEmojiSlugs?: Set<string> | null
}

export function EmojiCategoryDropdown({
	value,
	onValueChange,
	className,
	supportedEmojiSlugs = null,
}: EmojiCategoryDropdownProps) {
	const activeGroup =
		value === ALL_EMOJI_CATEGORY
			? null
			: (emojiGroups.find((group) => group.name === value) ?? emojiGroups[0])
	const label = activeGroup?.name ?? ALL_EMOJI_CATEGORY
	const activeEmoji = activeGroup
		? (groupEmojis[activeGroup.name] ?? "😁")
		: "📦"

	return (
		<DropdownMenu indicatorPosition="right">
			<DropdownMenuTrigger asChild>
				<Button
					size="44"
					color="neutral"
					variant="outline"
					className={cn(
						"bg-bg hover:bg-bg active:bg-bg data-[state=open]:bg-bg focus-visible:bg-bg shrink-0 text-[14px]",
						className
					)}
					aria-label={`Emoji category: ${label}`}>
					<CategoryEmoji emoji={activeEmoji} />
					<span className="hidden sm:inline">{label}</span>
					<ChevronDown className="text-fg-secondary" aria-hidden="true" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				className="w-64"
				onCloseAutoFocus={(event) => event.preventDefault()}>
				<DropdownMenuLabel>Categories</DropdownMenuLabel>
				<DropdownMenuDivider />
				<DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
					<DropdownMenuRadioItem value={ALL_EMOJI_CATEGORY}>
						<CategoryEmoji emoji="📦" />
						<span className="flex-1 text-sm font-medium">
							{ALL_EMOJI_CATEGORY}
						</span>
						<span className="text-fg-tertiary text-xs">
							{supportedEmojiSlugs?.size ?? emojis.length}
						</span>
					</DropdownMenuRadioItem>
					<DropdownMenuDivider />
					{emojiGroups.map((group) => {
						const categoryEmoji = groupEmojis[group.name] ?? "😁"

						return (
							<DropdownMenuRadioItem key={group.slug} value={group.name}>
								<CategoryEmoji emoji={categoryEmoji} />
								<span className="flex-1 text-sm font-medium">{group.name}</span>
								<span className="text-fg-tertiary text-xs">
									{supportedEmojiSlugs
										? group.emojis.filter((emoji) =>
												supportedEmojiSlugs.has(emoji.slug)
											).length
										: group.emojis.length}
								</span>
							</DropdownMenuRadioItem>
						)
					})}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
