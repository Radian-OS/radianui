import {
	ResourceToastPreview,
	showResourceToast,
} from "../../components/ResourceToast"

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
					className={`font-emoji text-[32px] leading-none`}
					aria-hidden="true">
					{emoji}
				</span>
			</ResourceToastPreview>
		),
	})
}
