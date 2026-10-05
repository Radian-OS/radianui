import {
	ResourceToastPreview,
	showResourceToast,
} from "../../components/ResourceToast"
import styles from "./emoji-font.module.css"

export function showEmojiToast({
	emoji,
	description,
	title,
}: {
	emoji: string
	description: string
	title?: string
}) {
	showResourceToast({
		title,
		description,
		preview: (
			<ResourceToastPreview>
				<span
					className={`${styles.emojiFont} text-[32px] leading-none`}
					aria-hidden="true">
					{emoji}
				</span>
			</ResourceToastPreview>
		),
	})
}
