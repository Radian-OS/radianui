"use client"

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { Search, SearchX } from "lucide-react"
import { cn } from "@/lib/utils"
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/registry/ui/empty"
import { Input, InputWrapper } from "@/registry/ui/input"
import { EmojiCategoryDropdown } from "./EmojiCategoryDropdown"
import { EmojiTile } from "./EmojiTile"
import { emojiGroups } from "./emoji-data"

export default function EmojiPlayground() {
	const [query, setQuery] = useState("")
	const [category, setCategory] = useState(emojiGroups[0]?.name ?? "")
	const [isSticky, setIsSticky] = useState(false)
	const sentinelRef = useRef<HTMLDivElement>(null)
	const bottomSentinelRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const topSentinel = sentinelRef.current
		const bottomSentinel = bottomSentinelRef.current
		if (!topSentinel || !bottomSentinel) return

		let topScrolledPast = false
		let bottomStillVisible = true

		const dispatchSticky = () => {
			const nextIsSticky = topScrolledPast && bottomStillVisible
			setIsSticky(nextIsSticky)
			window.dispatchEvent(
				new CustomEvent("resource-filter-sticky", {
					detail: { isSticky: nextIsSticky },
				})
			)
		}

		const topObserver = new IntersectionObserver(
			([entry]) => {
				topScrolledPast =
					!entry.isIntersecting && entry.boundingClientRect.top < 50
				dispatchSticky()
			},
			{ threshold: 0, rootMargin: "-50px 0px 0px 0px" }
		)

		const bottomObserver = new IntersectionObserver(
			([entry]) => {
				bottomStillVisible =
					entry.isIntersecting || entry.boundingClientRect.top > 1000
				dispatchSticky()
			},
			{ threshold: 0 }
		)

		topObserver.observe(topSentinel)
		bottomObserver.observe(bottomSentinel)

		return () => {
			topObserver.disconnect()
			bottomObserver.disconnect()
			setIsSticky(false)
			window.dispatchEvent(
				new CustomEvent("resource-filter-sticky", {
					detail: { isSticky: false },
				})
			)
		}
	}, [])

	const visibleGroup = useMemo(() => {
		const normalizedQuery = query.trim().toLocaleLowerCase("en")
		const group =
			emojiGroups.find((item) => item.name === category) ?? emojiGroups[0]

		if (!group) return null

		return {
			...group,
			emojis: normalizedQuery
				? group.emojis.filter((emoji) =>
						emoji.name.toLocaleLowerCase("en").includes(normalizedQuery)
					)
				: group.emojis,
		}
	}, [category, query])

	useLayoutEffect(() => {
		const topSentinel = sentinelRef.current
		const playground = topSentinel?.parentElement
		if (!topSentinel || !playground) return

		const sentinelRect = topSentinel.getBoundingClientRect()
		const rowGap = Number.parseFloat(getComputedStyle(playground).rowGap) || 0
		const pinnedSentinelTop = -(sentinelRect.height + rowGap)

		if (sentinelRect.top < pinnedSentinelTop) {
			window.scrollBy({ top: sentinelRect.top - pinnedSentinelTop })
		}
	}, [category, query])

	return (
		<div id="emoji-collection" className="flex w-full flex-col gap-8 py-2">
			<div ref={sentinelRef} className="pointer-events-none h-px w-full" />
			<div
				className={cn(
					"bg-bg/95 sticky top-0 z-100 border-b border-transparent py-3 backdrop-blur-sm",
					isSticky && "border-soft"
				)}>
				<InputWrapper className="bg-fill1 focus-within:bg-bg h-13 w-full">
					<EmojiCategoryDropdown value={category} onValueChange={setCategory} />
					<Search aria-hidden="true" />
					<Input
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Search emojis by name (e.g. grinning face, rocket)..."
						aria-label="Search emojis by name"
					/>
				</InputWrapper>
			</div>

			{visibleGroup?.emojis.length ? (
				<section aria-label={`${visibleGroup.name} emojis`}>
					<ul className="grid list-none grid-cols-[repeat(auto-fill,100px)] justify-center gap-3 sm:justify-between">
						{visibleGroup.emojis.map((emoji) => (
							<EmojiTile key={emoji.slug} emoji={emoji} />
						))}
					</ul>
				</section>
			) : (
				<div className="flex min-h-64 items-center justify-center">
					<Empty>
						<EmptyMedia variant="icon">
							<SearchX />
						</EmptyMedia>
						<EmptyHeader>
							<EmptyTitle>No emojis found</EmptyTitle>
							<EmptyDescription>
								Try a different name or choose another category.
							</EmptyDescription>
						</EmptyHeader>
					</Empty>
				</div>
			)}

			<div
				ref={bottomSentinelRef}
				className="pointer-events-none h-px w-full"
			/>
		</div>
	)
}
