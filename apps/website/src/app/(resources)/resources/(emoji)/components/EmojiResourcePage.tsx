import { ResourcePage } from "../../components/ResourcePage"
import EmojiDocs from "../docs/EmojiDocs"
import { EmojiHeroActionButtons } from "./EmojiHeroActionButtons"
import EmojiPlayground from "./EmojiPlayground"
import { emojis } from "./emoji-data"

const heroEmojis = ["🤩", "👻", "🔥"]

export function EmojiResourcePage() {
	return (
		<ResourcePage
			badge={{
				count: `${emojis.length.toLocaleString("en-US")} Emojis`,
				label: "Unicode Emoji Collection",
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
			title="Find, Copy, and Use Every Unicode Emoji"
			description="Browse emojis by Unicode category, copy them as text, and grab ready-to-use Unicode, HTML, and Next.js snippets."
			actions={<EmojiHeroActionButtons />}
			showcaseLabel={`Browse ${emojis.length.toLocaleString("en-US")} Unicode emojis`}
			showcase={<EmojiPlayground />}
			documentation={<EmojiDocs />}
		/>
	)
}
