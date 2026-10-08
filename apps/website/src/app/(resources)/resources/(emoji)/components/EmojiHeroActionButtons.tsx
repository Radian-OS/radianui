"use client"

import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { EmojiPickerPopover } from "./EmojiPickerPopover"

export function EmojiHeroActionButtons() {
	return (
		<>
			<Button
				asChild
				size="40"
				className="bg-elevation-level1/20 dark:hover:bg-fill2/40 hover:bg-fill2/40 order-2 w-full backdrop-blur-md sm:order-1 sm:w-fit"
				variant="outline"
				color="neutral">
				<Link href="/docs/getting-started/resources">Explore Resources</Link>
			</Button>
			<div className="order-1 flex justify-center sm:order-2">
				<EmojiPickerPopover />
			</div>
			<Button
				asChild
				size="40"
				variant="glossy"
				color="primary"
				className="order-3 w-full sm:w-fit">
				<Link href="/docs/components/popover#emoji-reaction-picker">
					Get Code
				</Link>
			</Button>
		</>
	)
}
