"use client"

import type { ReactNode } from "react"
import { toast } from "sonner"

interface ShowResourceToastProps {
	preview: ReactNode
	description: string
	title?: string
}

export function showResourceToast({
	preview,
	description,
	title = "Added to Clipboard",
}: ShowResourceToastProps) {
	toast.custom(() => (
		<div className="bg-black-inverse text-fg-inverse flex w-full items-center gap-2 rounded-[10px] p-2 sm:w-78.5">
			{preview}
			<div className="text-fg-inverse space-y-0.5 text-sm">
				<p className="font-medium">{title}</p>
				<p className="text-fg-tertiary font-normal">{description}</p>
			</div>
		</div>
	))
}

export function ResourceToastPreview({ children }: { children: ReactNode }) {
	return (
		<div className="bg-bg relative isolate flex aspect-square size-15 shrink-0 items-center justify-center overflow-hidden rounded-lg">
			{children}
		</div>
	)
}
