// CodeBlockCommand.server.tsx (no 'use client')
import { highlightCode } from "@/lib/highligh-code"
import { CodeBlockCommand } from "./code-block-command"

export async function CodeBlockCommandServer({
	__npm__,
	__pnpm__,
	__bun__,
	__yarn__,
	className,
}: {
	__npm__?: string
	__pnpm__?: string
	__bun__?: string
	__yarn__?: string
	className?: string
}) {
	const [highlightedNpm, highlightedPnpm, highlightedBun, highlightedYarn] =
		await Promise.all([
			__npm__ ? highlightCode(__npm__, "bash") : Promise.resolve(""),
			__pnpm__ ? highlightCode(__pnpm__, "bash") : Promise.resolve(""),
			__bun__ ? highlightCode(__bun__, "bash") : Promise.resolve(""),
			__yarn__ ? highlightCode(__yarn__, "bash") : Promise.resolve(""),
		])

	return (
		<CodeBlockCommand
			__npm__={__npm__}
			__pnpm__={__pnpm__}
			__bun__={__bun__}
			__yarn__={__yarn__}
			highlightedNpm={highlightedNpm}
			highlightedPnpm={highlightedPnpm}
			highlightedBun={highlightedBun}
			highlightedYarn={highlightedYarn}
			className={className}
		/>
	)
}
