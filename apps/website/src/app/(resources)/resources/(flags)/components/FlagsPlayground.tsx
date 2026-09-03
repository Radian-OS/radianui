"use client"

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { Search } from "lucide-react"
import { Input, InputWrapper } from "@/registry/ui/input"
import { FlagShapeDropdown } from "./FlagShapeDropdown"
import { FlagTile } from "./FlagTile"
import type { FlagShape } from "./flags-data"
import { flagNames, getFlagDisplayName } from "./flags-data"

const FLAG_SHAPE_STORAGE_KEY = "radian-flags-shape"

export default function FlagsPlayground() {
	const [query, setQuery] = useState("")
	const [shape, setShape] = useState<FlagShape>("flat")
	const sentinelRef = useRef<HTMLDivElement>(null)
	const bottomSentinelRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const topSentinel = sentinelRef.current
		const bottomSentinel = bottomSentinelRef.current
		if (!topSentinel || !bottomSentinel) return

		let topScrolledPast = false
		let bottomStillVisible = true

		const dispatchSticky = () => {
			const isSticky = topScrolledPast && bottomStillVisible
			window.dispatchEvent(
				new CustomEvent("resource-filter-sticky", { detail: { isSticky } })
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
			window.dispatchEvent(
				new CustomEvent("resource-filter-sticky", {
					detail: { isSticky: false },
				})
			)
		}
	}, [])

	useEffect(() => {
		const savedShape = window.localStorage.getItem(FLAG_SHAPE_STORAGE_KEY)
		if (savedShape === "flat" || savedShape === "round") {
			setShape(savedShape)
		}
	}, [])

	const handleShapeChange = (nextShape: FlagShape) => {
		setShape(nextShape)
		window.localStorage.setItem(FLAG_SHAPE_STORAGE_KEY, nextShape)
	}

	const visibleFlags = useMemo(() => {
		const normalizedQuery = query.toLowerCase().replace(/[^a-z0-9]/g, "")
		if (!normalizedQuery) return flagNames

		return flagNames.filter((name) =>
			getFlagDisplayName(name)
				.toLowerCase()
				.replace(/[^a-z0-9]/g, "")
				.includes(normalizedQuery)
		)
	}, [query])

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
	}, [query])

	return (
		<div className="flex w-full flex-col gap-5 py-2">
			<div ref={sentinelRef} className="pointer-events-none h-px w-full" />
			<div className="bg-bg/95 sticky top-0 z-100 py-3 backdrop-blur-sm">
				<InputWrapper className="bg-fill1 h-13 w-full">
					<FlagShapeDropdown value={shape} onValueChange={handleShapeChange} />
					<Search aria-hidden="true" />
					<Input
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Search e.g. United States, Japan, Canada..."
						aria-label="Search country flags"
					/>
				</InputWrapper>
			</div>

			{visibleFlags.length ? (
				<ul className="grid list-none grid-cols-[repeat(auto-fill,142px)] justify-center gap-x-3 gap-y-5 sm:justify-between">
					{visibleFlags.map((name, index) => (
						<FlagTile
							key={name}
							name={name}
							shape={shape}
							priority={index < 18}
						/>
					))}
				</ul>
			) : (
				<div className="border-soft bg-fill1 flex min-h-40 items-center justify-center rounded-lg border border-dashed text-center">
					<p className="text-fg-secondary text-sm">No flags match “{query}”.</p>
				</div>
			)}

			<div
				ref={bottomSentinelRef}
				className="pointer-events-none h-px w-full"
			/>
		</div>
	)
}
