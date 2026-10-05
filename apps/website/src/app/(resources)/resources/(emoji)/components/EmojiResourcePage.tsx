import "noto-color-emoji-flags"
import { ResourcePage } from "../../components/ResourcePage"
import EmojiDocs from "../docs/EmojiDocs"
import { EmojiHeroActionButtons } from "./EmojiHeroActionButtons"
import EmojiPlayground from "./EmojiPlayground"
import { EmojiText } from "./EmojiText"
import type { EmojiData } from "./emoji-data"
import { emojis, formatEmojiName, getEmojiDescription } from "./emoji-data"
import styles from "./emoji-font.module.css"

const heroEmojis = ["🤩", "👻", "🔥"]

export function EmojiResourcePage({
	initialSelectedEmoji = null,
}: {
	initialSelectedEmoji?: EmojiData | null
}) {
	const selectedName = initialSelectedEmoji
		? formatEmojiName(initialSelectedEmoji.name)
		: null

	return (
		<ResourcePage
			badge={{
				count: `${emojis.length.toLocaleString("en-US")} Emojis`,
				label: "Unicode Emoji Collection",
				href: "/docs/getting-started/changelog",
			}}
			heroVisual={
				<div className="flex items-center justify-center" aria-hidden="true">
					{heroEmojis.map((emoji, index) => (
						<span
							key={emoji}
							className={`relative block shrink-0 ${
								index === 1
									? "z-10 text-[80px] leading-[80px]"
									: "z-0 -mx-1 text-[48px] leading-[48px]"
							}`}>
							{emoji}
						</span>
					))}
				</div>
			}
			title={
				initialSelectedEmoji && selectedName ? (
					<>
						{selectedName} Emoji{" "}
						<span className={styles.emojiFont}>
							{initialSelectedEmoji.emoji}
						</span>
					</>
				) : (
					"Find, Copy, and Use Every Unicode Emoji"
				)
			}
			description={
				initialSelectedEmoji ? (
					<EmojiText
						emoji={initialSelectedEmoji}
						text={getEmojiDescription(initialSelectedEmoji)}
					/>
				) : (
					"Browse emojis by Unicode category, copy them as text, and grab Unicode, HTML, SVG, and PNG formats."
				)
			}
			actions={<EmojiHeroActionButtons />}
			showcaseLabel={`Browse ${emojis.length.toLocaleString("en-US")} Unicode emojis`}
			showcase={<EmojiPlayground initialSelectedEmoji={initialSelectedEmoji} />}
			documentation={<EmojiDocs />}
		/>
	)
}
