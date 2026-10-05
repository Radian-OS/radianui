import { Fragment } from "react"
import type { EmojiData } from "./emoji-data"
import styles from "./emoji-font.module.css"

export function EmojiText({ emoji, text }: { emoji: EmojiData; text: string }) {
	const parts = text.split(emoji.emoji)

	return parts.map((part, index) => (
		<Fragment key={`${index}-${part}`}>
			{part}
			{index < parts.length - 1 ? (
				<span className={styles.emojiFont}>{emoji.emoji}</span>
			) : null}
		</Fragment>
	))
}
