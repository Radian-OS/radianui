"use client"

import React from "react"
import { Check, Clipboard } from "lucide-react"
import { usePreferences } from "@/lib/preferences"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export function CodeBlockCommand({
	__npm__,
	__pnpm__,
	__bun__,
	__yarn__,
	className,
	highlightedBun,
	highlightedNpm,
	highlightedPnpm,
	highlightedYarn,
}: React.ComponentProps<"pre"> & {
	withIcon?: boolean
	__npm__?: string
	__yarn__?: string
	__pnpm__?: string
	__bun__?: string
	highlightedNpm: string
	highlightedPnpm: string
	highlightedBun: string
	highlightedYarn: string
}) {
	const { packageManager, setPackageManager } = usePreferences()
	const [copied, setCopied] = React.useState(false)

	const tabs = React.useMemo(() => {
		return {
			pnpm: highlightedPnpm,
			npm: highlightedNpm,
			yarn: highlightedYarn,
			bun: highlightedBun,
		}
	}, [highlightedBun, highlightedNpm, highlightedPnpm, highlightedYarn])

	const rawTabs = React.useMemo(() => {
		return {
			pnpm: __pnpm__,
			npm: __npm__,
			yarn: __yarn__,
			bun: __bun__,
		}
	}, [__pnpm__, __npm__, __yarn__, __bun__])

	const handleCopy = () => {
		const command = rawTabs[packageManager]

		if (!command) return

		navigator.clipboard.writeText(command)
		setCopied(true)
		setTimeout(() => setCopied(false), 1200)
	}

	return (
		<Tabs
			value={packageManager}
			onValueChange={(value) =>
				setPackageManager(value as typeof packageManager)
			}
			className={cn("bg-fill2 gap-2 overflow-hidden", className)}>
			<div className="flex items-center justify-between pr-1">
				<TabsList className="bg-transparent" variant="outline-ghost">
					{Object.entries(tabs).map(([key]) => (
						<TabsTrigger className="font-[Inter]" key={key} value={key}>
							{key}
						</TabsTrigger>
					))}
				</TabsList>
				<IconButton
					variant="ghost"
					color="neutral"
					size={"28"}
					aria-label="Copy command"
					onClick={handleCopy}>
					{copied ? <Check size={20} /> : <Clipboard size={20} />}
				</IconButton>
			</div>
			{Object.entries(tabs).map(([key, value]) => {
				return (
					<TabsContent
						key={key}
						value={key}
						className="bg-bg border-soft max-w-full rounded-[10px] border">
						<div dangerouslySetInnerHTML={{ __html: value! }} />
					</TabsContent>
				)
			})}
		</Tabs>
	)
}
