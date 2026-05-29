"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { IconSlot } from "@/registry/icon/icon-library"
import { IconButton } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code-area"

export function useCopyPaste(code: string) {
	const [copied, setCopied] = useState(false)

	const copy = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		navigator.clipboard.writeText(code)
		setCopied(true)

		setTimeout(() => {
			setCopied(false)
		}, 1500)
	}

	return { copied, copy }
}

const code = `
function foobar() {
    console.log('Foo Bar');
}`

export default function CodeWithCopyExample() {
	const { copied, copy } = useCopyPaste(code)

	return (
		<div className={cn("bg-fill2 flex w-full flex-col gap-2 rounded-xl p-1.5")}>
			<div className="inline-flex items-center gap-3 px-1 py-0.5">
				<span className="bg-bg text-fg-tertiary rounded-md p-1">
					<IconSlot slot="terminal" className="size-4" />
				</span>
				<span className="text-fg-secondary flex-1 text-sm">
					Code area with copy button
				</span>
				<IconButton
					variant="ghost"
					color="neutral"
					size={"28"}
					aria-label="Copy command"
					onClick={copy}>
					{copied ? (
						<IconSlot slot="check" size={20} />
					) : (
						<IconSlot slot="clipboard" size={20} />
					)}
				</IconButton>
			</div>
			<CodeArea
				language="tsx"
				theme="github-dark-high-contrast"
				code={code}
				className={cn("border-soft flex-1 rounded-[10px] border")}
			/>
		</div>
	)
}
