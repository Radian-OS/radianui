"use client"

import { EmojiCopyButton } from "./EmojiCopyButton"
import type { EmojiData } from "./emoji-data"
import { getEmojiSkinToneVariants } from "./emoji-data"

export function EmojiSkinToneVariants({ emoji }: { emoji: EmojiData }) {
	const variants = getEmojiSkinToneVariants(emoji)

	if (!variants.length) return null

	return (
		<div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
			{variants.map((variant) => (
				<EmojiCopyButton
					key={variant.label}
					value={variant.emoji}
					successLabel={variant.label}
					color="neutral"
					variant="outline"
					className="h-auto min-h-28 flex-col gap-3 rounded-xl px-3 py-4"
					aria-label={`Copy ${variant.label} variant`}>
					<span className="text-4xl" aria-hidden="true">
						{variant.emoji}
					</span>
					<span className="text-fg-secondary text-center text-xs font-medium whitespace-normal">
						{variant.label}
					</span>
				</EmojiCopyButton>
			))}
		</div>
	)
}
