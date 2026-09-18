"use client"

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { Search, SearchX } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
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
import { EmojiDetailsDrawer } from "./EmojiDetailsDrawer"
import { EmojiTile } from "./EmojiTile"
import type { EmojiData } from "./emoji-data"
import {
	ALL_EMOJI_CATEGORY,
	EMOJI_PAGE_PATH,
	emojiGroups,
	emojis,
	getEmojiBySlug,
	getEmojiPagePath,
} from "./emoji-data"

function getEmojiFromPathname(pathname: string) {
	if (!pathname.startsWith(`${EMOJI_PAGE_PATH}/`)) return null

	const slug = pathname.split("/").filter(Boolean).at(-1)
	return slug ? getEmojiBySlug(decodeURIComponent(slug)) : null
}

export default function EmojiPlayground({
	initialSelectedEmoji = null,
}: {
	initialSelectedEmoji?: EmojiData | null
}) {
	const router = useRouter()
	const pathname = usePathname()
	const [query, setQuery] = useState("")
	const [category, setCategory] = useState(
		initialSelectedEmoji?.group ?? emojiGroups[0]?.name ?? ALL_EMOJI_CATEGORY
	)
	const [selectedEmoji, setSelectedEmoji] = useState<EmojiData | null>(
		initialSelectedEmoji
	)
	const [isSticky, setIsSticky] = useState(false)
	const ownsDrawerHistoryEntryRef = useRef(false)
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

	useEffect(() => {
		const emojiFromPathname = getEmojiFromPathname(pathname)
		setSelectedEmoji(emojiFromPathname)

		if (!emojiFromPathname) {
			ownsDrawerHistoryEntryRef.current = false
		}
	}, [pathname])

	const handleSelectEmoji = (emoji: EmojiData) => {
		const nextPath = getEmojiPagePath(emoji)

		if (selectedEmoji) {
			router.replace(nextPath, { scroll: false })
		} else {
			ownsDrawerHistoryEntryRef.current = true
			router.push(nextPath, { scroll: false })
		}
	}

	const handleDrawerOpenChange = (open: boolean) => {
		if (open) return

		setSelectedEmoji(null)
		if (ownsDrawerHistoryEntryRef.current) {
			ownsDrawerHistoryEntryRef.current = false
			window.history.back()
			return
		}

		router.replace(EMOJI_PAGE_PATH, { scroll: false })
	}

	const visibleEmojis = useMemo(() => {
		const normalizedQuery = query.trim().toLocaleLowerCase("en")
		const group = emojiGroups.find((item) => item.name === category)
		const source =
			category === ALL_EMOJI_CATEGORY ? emojis : (group?.emojis ?? [])

		return normalizedQuery
			? source.filter((emoji) =>
					emoji.name.toLocaleLowerCase("en").includes(normalizedQuery)
				)
			: source
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

			{visibleEmojis.length ? (
				<section aria-label={`${category} emojis`}>
					<ul className="grid list-none grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-3">
						{visibleEmojis.map((emoji) => (
							<EmojiTile
								key={emoji.slug}
								emoji={emoji}
								onSelect={handleSelectEmoji}
							/>
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

			<EmojiDetailsDrawer
				emoji={selectedEmoji}
				open={selectedEmoji !== null}
				onOpenChange={handleDrawerOpenChange}
				onSelectEmoji={handleSelectEmoji}
			/>
		</div>
	)
}
