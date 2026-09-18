import Link from "next/link"
import { Button } from "@/registry/ui/button"

export function EmojiHeroActionButtons() {
	return (
		<>
			<Button
				asChild
				size="40"
				className="bg-elevation-level1/20 dark:hover:bg-fill2/40 hover:bg-fill2/40 w-full backdrop-blur-md sm:w-fit"
				variant="outline"
				color="neutral">
				<Link href="#emoji-guide">Emoji guide</Link>
			</Button>
			<Button asChild variant="glossy" className="w-full sm:w-fit" size="40">
				<Link href="#emoji-collection">Browse emojis</Link>
			</Button>
		</>
	)
}
