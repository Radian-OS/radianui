import { ResourcePage } from "../../components/ResourcePage"
import EmojiDocs from "../docs/EmojiDocs"
import { EmojiHeroActionButtons } from "./EmojiHeroActionButtons"
import EmojiPlayground from "./EmojiPlayground"
import { EmojiReference } from "./EmojiReference"
import { EmojiText } from "./EmojiText"
import type { EmojiData } from "./emoji-data"
import {
	emojis,
	formatEmojiName,
	getEmojiMetadataDescription,
} from "./emoji-data"

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
						<span className="font-emoji">{initialSelectedEmoji.emoji}</span>
					</>
				) : (
					"Copy and paste your favorite emojis"
				)
			}
			description={
				initialSelectedEmoji ? (
					<EmojiText
						emoji={initialSelectedEmoji}
						text={getEmojiMetadataDescription(initialSelectedEmoji)}
					/>
				) : (
					"Browse our free emoji list for smiley faces, hearts, and symbols. Search by name or category, select an emoji, and choose Copy as Text."
				)
			}
			headerClassName="max-sm:gap-6"
			actions={<EmojiHeroActionButtons />}
			showcaseLabel={`Browse ${emojis.length.toLocaleString("en-US")} Unicode emojis`}
			showcase={<EmojiPlayground initialSelectedEmoji={initialSelectedEmoji} />}
			documentation={
				initialSelectedEmoji ? (
					<EmojiReference emoji={initialSelectedEmoji} />
				) : (
					<EmojiDocs />
				)
			}
		/>
	)
}
