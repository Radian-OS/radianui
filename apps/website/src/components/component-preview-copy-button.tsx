"use client"

import React from "react"
import { Check, Clipboard } from "lucide-react"
import { useCopyPaste } from "@/hooks/use-copy-paste"
import { IconButton } from "@/registry/ui/button"

export function ComponentPreviewCopyButton({ value }: { value: string }) {
	const { copied, copy } = useCopyPaste({
		code: value,
		eventName: "block_copy",
		title: "Code",
		category: "ComponentPreview",
	})

	return (
		<IconButton
			variant="outline"
			color="neutral"
			data-slot="copy-button"
			onClick={copy}
			size={"28"}
			aria-label="Copy code"
			className="text-fg-secondary">
			{copied ? <Check size={16} /> : <Clipboard size={16} />}
		</IconButton>
	)
}
