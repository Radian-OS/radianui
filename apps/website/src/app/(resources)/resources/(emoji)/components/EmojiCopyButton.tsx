"use client"

import type { ComponentProps } from "react"
import { toast } from "sonner"
import { Button } from "@/registry/ui/button"

interface EmojiCopyButtonProps extends Omit<
	ComponentProps<typeof Button>,
	"onClick"
> {
	value: string
	successLabel: string
}

export function EmojiCopyButton({
	value,
	successLabel,
	children,
	...props
}: EmojiCopyButtonProps) {
	const copy = async () => {
		try {
			await navigator.clipboard.writeText(value)
			toast.success(`${successLabel} copied to clipboard`)
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
