import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, StarHalf } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import { HERO_ACTIONS_DATA } from "./types"

export function HeroActions() {
	return (
		<div className="flex flex-col items-start gap-4 sm:items-end">
			{/* Star rating & reviews */}
			<div className="flex flex-col items-start gap-1 sm:items-end">
				<div className="flex items-center gap-1">
					<Star className="size-4 fill-amber-400 text-amber-400" />
					<Star className="size-4 fill-amber-400 text-amber-400" />
					<Star className="size-4 fill-amber-400 text-amber-400" />
					<Star className="size-4 fill-amber-400 text-amber-400" />
					<StarHalf className="size-4 fill-amber-400 text-amber-400" />
				</div>
				<div className="flex items-center gap-1.5 text-xs">
					<span className="text-foreground font-semibold">
						{HERO_ACTIONS_DATA.ratingText}
					</span>
					<span className="text-fg-secondary">
						{HERO_ACTIONS_DATA.reviewsCount} {HERO_ACTIONS_DATA.reviewsText}
					</span>
				</div>
			</div>

			{/* Action CTA buttons */}
			<div className="flex flex-wrap items-center gap-2.5">
				<Button
					asChild
					variant="strong"
					color="neutral"
					size="40"
					className="inline-flex items-center gap-2">
					<Link
						href={HERO_ACTIONS_DATA.cursorUrl}
						target="_blank"
						rel="noopener noreferrer">
						<Image
							src="https://www.google.com/s2/favicons?sz=32&domain=cursor.com"
							alt="Cursor"
							width={16}
							height={16}
							className="size-4 rounded-xs"
							unoptimized
						/>
						<span>Open in Cursor</span>
					</Link>
				</Button>

				<Button
					asChild
					variant="outline"
					color="neutral"
					size="40"
					className="inline-flex items-center gap-2">
					<Link
						href={HERO_ACTIONS_DATA.figmaUrl}
						target="_blank"
						rel="noopener noreferrer">
						<Image
							src="https://www.google.com/s2/favicons?sz=32&domain=figma.com"
							alt="Figma"
							width={16}
							height={16}
							className="size-4 rounded-xs"
							unoptimized
						/>
						<span>View in Figma</span>
					</Link>
				</Button>
			</div>
		</div>
	)
}
