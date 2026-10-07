"use client"

import type { ComponentProps } from "react"
import { cacheCopiedEmojiSkinTone } from "@/lib/emoji/emoji-skin-tone"
import { toast } from "sonner"
import { Button } from "@/registry/ui/button"
import { showEmojiToast } from "./EmojiToast"

interface EmojiCopyButtonProps extends Omit<
	ComponentProps<typeof Button>,
	"onClick"
> {
	value: string
	emoji: string
	successLabel: string
}

export function EmojiCopyButton({
	value,
	emoji,
	successLabel,
	children,
	...props
}: EmojiCopyButtonProps) {
	const copy = async () => {
		try {
			await navigator.clipboard.writeText(value)
			if (value === emoji) cacheCopiedEmojiSkinTone(value)
			showEmojiToast({
				emoji,
				description: `${successLabel} has been copied to your clipboard.`,
			})
		} catch {
			toast.error(`Could not copy ${successLabel.toLowerCase()}`)
		}
	}

	return (
		<Button {...props} onClick={copy}>
			{children}
		</Button>
	)
}
