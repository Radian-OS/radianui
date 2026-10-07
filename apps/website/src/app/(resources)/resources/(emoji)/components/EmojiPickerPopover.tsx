"use client"

import PopoverEmojiPicker from "@/registry/example/popover/popover-emoji-picker"
import { showEmojiToast } from "./EmojiToast"

export function EmojiPickerPopover() {
	return (
		<PopoverEmojiPicker
			onCopied={(emoji) =>
				showEmojiToast({
					emoji,
					description: `${emoji} has been copied to your clipboard.`,
				})
			}
		/>
	)
}
