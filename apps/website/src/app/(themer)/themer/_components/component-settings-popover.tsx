"use client"

import { type ReactNode } from "react"
import { Globe, Shuffle } from "lucide-react"
import { IconButton } from "@/styles/default/ui/button"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/styles/default/ui/popover"

export function ComponentSettingsPopover({
	name,
	children,
	content,
	onReset,
	onShuffle,
}: {
	name: string
	children: ReactNode
	content?: ReactNode
	onReset?: () => void
	onShuffle?: () => void
}) {
	return (
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent
				side="right"
				align="start"
				alignOffset={-16}
				sideOffset={20}
				collisionPadding={12}
				aria-label={`${name} settings`}
				className="border-border bg-bg w-[280px] max-w-[calc(100vw-24px)] rounded-xl p-0 shadow-lg">
				<div className="border-border flex h-9 items-center justify-between border-b px-3">
					<span className="text-fg text-[13px] font-medium">{name}</span>
					<div className="flex items-center">
						<IconButton
							variant="ghost"
							color="neutral"
							size="xs"
							aria-label={`Reset ${name} to theme defaults`}
							title="Use theme defaults"
							onClick={onReset}
							disabled={!onReset}>
							<Globe />
						</IconButton>
						<IconButton
							variant="ghost"
							color="neutral"
							size="xs"
							aria-label={`Shuffle ${name} settings`}
							onClick={onShuffle}
							disabled={!onShuffle}>
							<Shuffle />
						</IconButton>
					</div>
				</div>
				{content ?? (
					<p className="text-fg-secondary p-3 text-[13px] leading-5">
						Use Fundamentals to customize shared colors, typography, and
						spacing.
					</p>
				)}
			</PopoverContent>
		</Popover>
	)
}
