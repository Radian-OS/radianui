"use client"

import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react"
import { Search, SearchX } from "lucide-react"
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/registry/ui/empty"
import { Input, InputGroup, InputWrapper } from "@/registry/ui/input"
import { Button } from "@/registry/ui/button"
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
import { getSupportedEmojis } from "./emoji-support"

const INITIAL_EMOJI_LIMIT = 120
const EMOJI_BATCH_SIZE = 120

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
	const [query, setQuery] = useState("")
	const [category, setCategory] = useState(
		initialSelectedEmoji?.group ?? ALL_EMOJI_CATEGORY
	)
	const [selectedEmoji, setSelectedEmoji] = useState<EmojiData | null>(
		initialSelectedEmoji
	)
	const [displayLimit, setDisplayLimit] = useState(INITIAL_EMOJI_LIMIT)
	const [supportedEmojiSlugs, setSupportedEmojiSlugs] =
		useState<Set<string> | null>(null)
	const [, setIsSticky] = useState(false)
	const ownsDrawerHistoryEntryRef = useRef(false)
	const sentinelRef = useRef<HTMLDivElement>(null)
	const bottomSentinelRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		let isCurrent = true

		getSupportedEmojis().then((supportedEmojis) => {
			if (!isCurrent) return
			setSupportedEmojiSlugs(
				new Set(supportedEmojis.map((emoji) => emoji.slug))
			)
		})

		return () => {
			isCurrent = false
		}
	}, [])

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
		const handlePopState = () => {
			setSelectedEmoji(getEmojiFromPathname(window.location.pathname))
			ownsDrawerHistoryEntryRef.current = Boolean(
				window.history.state?.radianEmojiDialog
			)
		}

		window.addEventListener("popstate", handlePopState)
		return () => window.removeEventListener("popstate", handlePopState)
	}, [])

	const handleSelectEmoji = useCallback(
		(emoji: EmojiData) => {
			const nextPath = getEmojiPagePath(emoji)
			const nextState = {
				...window.history.state,
				radianEmojiDialog: true,
			}

			if (selectedEmoji) {
				window.history.replaceState(nextState, "", nextPath)
			} else {
				window.history.pushState(nextState, "", nextPath)
				ownsDrawerHistoryEntryRef.current = true
			}

			setSelectedEmoji(emoji)
		},
		[selectedEmoji]
	)

	const handleCategoryChange = useCallback((nextCategory: string) => {
		setCategory(nextCategory)
		setDisplayLimit(INITIAL_EMOJI_LIMIT)
	}, [])

	const handleDrawerOpenChange = (open: boolean) => {
		if (open) return

		setSelectedEmoji(null)
		if (ownsDrawerHistoryEntryRef.current) {
			ownsDrawerHistoryEntryRef.current = false
			window.history.back()
			return
		}

		window.history.replaceState(
			{ ...window.history.state, radianEmojiDialog: false },
			"",
			EMOJI_PAGE_PATH
		)
	}

	const visibleEmojis = useMemo(() => {
		const normalizedQuery = query.trim().toLocaleLowerCase("en")
		const group = emojiGroups.find((item) => item.name === category)
		const source =
			category === ALL_EMOJI_CATEGORY ? emojis : (group?.emojis ?? [])

		return source.filter(
			(emoji) =>
				(!supportedEmojiSlugs || supportedEmojiSlugs.has(emoji.slug)) &&
				(!normalizedQuery ||
					emoji.name.toLocaleLowerCase("en").includes(normalizedQuery))
		)
	}, [category, query, supportedEmojiSlugs])

	const renderedEmojis = useMemo(
		() => visibleEmojis.slice(0, displayLimit),
		[visibleEmojis, displayLimit]
	)

	useEffect(() => {
		const bottomSentinel = bottomSentinelRef.current
		if (!bottomSentinel) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setDisplayLimit((prev) => {
						if (prev >= visibleEmojis.length) return prev
						return Math.min(prev + EMOJI_BATCH_SIZE, visibleEmojis.length)
					})
				}
			},
			{ rootMargin: "600px 0px" }
		)

		observer.observe(bottomSentinel)
		return () => observer.disconnect()
	}, [visibleEmojis.length])

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
			<p className="sr-only" aria-live="polite">
				{supportedEmojiSlugs
					? `${supportedEmojiSlugs.size} emojis available in this browser.`
					: `${emojis.length} emojis in the collection.`}
			</p>
			<div ref={sentinelRef} className="pointer-events-none h-px w-full" />
			<div className="bg-bg/95 sticky top-0 z-100 py-3 backdrop-blur-sm">
				<InputGroup className="w-full">
					<EmojiCategoryDropdown
						value={category}
						supportedEmojiSlugs={supportedEmojiSlugs}
						onValueChange={handleCategoryChange}
						className="rounded-r-none border-r-0"
					/>
					<InputWrapper
						size="44"
						className="bg-bg focus-within:bg-bg min-w-0 flex-1 rounded-l-none shadow-none">
						<Search aria-hidden="true" />
						<Input
							value={query}
							onChange={(event) => {
								setQuery(event.target.value)
								setDisplayLimit(INITIAL_EMOJI_LIMIT)
							}}
							placeholder="Search emojis by name (e.g. grinning face, rocket)..."
							aria-label="Search emojis by name"
						/>
					</InputWrapper>
				</InputGroup>
			</div>

			{visibleEmojis.length ? (
				<section aria-label={`${category} emojis`}>
					<ul className="grid w-full list-none grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-3">
						{renderedEmojis.map((emoji) => (
							<EmojiTile
								key={emoji.slug}
								emoji={emoji}
								onSelect={handleSelectEmoji}
							/>
						))}
					</ul>
					{renderedEmojis.length < visibleEmojis.length ? (
						<Button
							color="neutral"
							variant="outline"
							className="mt-5"
							onClick={() =>
								setDisplayLimit((limit) => limit + EMOJI_BATCH_SIZE)
							}>
							Load more emojis
						</Button>
					) : null}
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
				supportedEmojiSlugs={supportedEmojiSlugs}
			/>
		</div>
	)
}
