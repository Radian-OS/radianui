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
				className="bg-elevation-level1/20 dark:hover:bg-fill2/40 hover:bg-fill2/40 w-full backdrop-blur-md sm:w-fit"
				variant="outline"
				color="neutral">
				<Link href="/docs/getting-started/resources">Explore Resources</Link>
			</Button>
			<EmojiPickerPopover />
		</>
	)
}
