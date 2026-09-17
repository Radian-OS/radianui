"use client"

import type { LucideIcon } from "lucide-react"
import {
	ChevronDown,
	Flag,
	LayoutGrid,
	Lightbulb,
	PawPrint,
	Plane,
	Shapes,
	Smile,
	Trophy,
	Users,
	Utensils,
} from "lucide-react"
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

const groupIcons: Record<string, LucideIcon> = {
	"Smileys & Emotion": Smile,
	"People & Body": Users,
	"Animals & Nature": PawPrint,
	"Food & Drink": Utensils,
	"Travel & Places": Plane,
	Activities: Trophy,
	Objects: Lightbulb,
	Symbols: Shapes,
	Flags: Flag,
}

interface EmojiCategoryDropdownProps {
	value: string
	onValueChange: (value: string) => void
}

export function EmojiCategoryDropdown({
	value,
	onValueChange,
}: EmojiCategoryDropdownProps) {
	const activeGroup =
		value === ALL_EMOJI_CATEGORY
			? null
			: (emojiGroups.find((group) => group.name === value) ?? emojiGroups[0])
	const label = activeGroup?.name ?? ALL_EMOJI_CATEGORY
	const ActiveIcon = activeGroup
		? (groupIcons[activeGroup.name] ?? Smile)
		: LayoutGrid

	return (
		<DropdownMenu indicatorPosition="right">
			<DropdownMenuTrigger asChild>
				<Button
					color="neutral"
					variant="outline"
					className="shrink-0"
					aria-label={`Emoji category: ${label}`}>
					<ActiveIcon className="text-fg-secondary" />
					<span className="hidden sm:inline">{label}</span>
					<ChevronDown className="text-fg-secondary" aria-hidden="true" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-64">
				<DropdownMenuLabel>Categories</DropdownMenuLabel>
				<DropdownMenuDivider />
				<DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
					<DropdownMenuRadioItem value={ALL_EMOJI_CATEGORY}>
						<LayoutGrid className="text-fg-secondary size-4" />
						<span className="flex-1 text-sm font-medium">
							{ALL_EMOJI_CATEGORY}
						</span>
						<span className="text-fg-tertiary text-xs">{emojis.length}</span>
					</DropdownMenuRadioItem>
					<DropdownMenuDivider />
					{emojiGroups.map((group) => {
						const Icon = groupIcons[group.name] ?? Smile

						return (
							<DropdownMenuRadioItem key={group.slug} value={group.name}>
								<Icon className="text-fg-secondary size-4" />
								<span className="flex-1 text-sm font-medium">{group.name}</span>
								<span className="text-fg-tertiary text-xs">
									{group.emojis.length}
								</span>
							</DropdownMenuRadioItem>
						)
					})}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
