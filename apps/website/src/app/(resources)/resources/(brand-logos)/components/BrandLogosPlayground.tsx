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
import { BrandLogoCategoryDropdown } from "./BrandLogoCategoryDropdown"
import { BrandLogoDetailsDialog } from "./BrandLogoDetailsDialog"
import { BrandLogoOptions } from "./BrandLogoOptions"
import { BrandLogoTile } from "./BrandLogoTile"
import type { BrandLogoId, BrandLogoVariant } from "./brand-logos-data"
import {
	ALL_BRAND_LOGO_CATEGORY,
	BRAND_LOGOS_PAGE_PATH,
	brandLogos,
	getBrandLogo,
	getBrandLogoFromSlug,
	getBrandLogoPagePath,
	getBrandLogoSearchTerms,
} from "./brand-logos-data"

const BRAND_LOGO_VARIANT_STORAGE_KEY = "radian-brand-logos-variant"

interface BrandLogosPlaygroundProps {
	initialSelectedBrand?: BrandLogoId | null
}

function getBrandFromPathname(pathname: string) {
	const slug = pathname.split("/").filter(Boolean).at(-1)
	return slug && pathname.startsWith(`${BRAND_LOGOS_PAGE_PATH}/`)
		? (getBrandLogoFromSlug(slug)?.id ?? null)
		: null
}

export default function BrandLogosPlayground({
	initialSelectedBrand = null,
}: BrandLogosPlaygroundProps) {
	const [query, setQuery] = useState("")
	const [category, setCategory] = useState(
		initialSelectedBrand
			? getBrandLogo(initialSelectedBrand).category
			: ALL_BRAND_LOGO_CATEGORY
	)
	const [variant, setVariant] = useState<BrandLogoVariant>("icon")
	const [selectedBrand, setSelectedBrand] = useState<BrandLogoId | null>(
		initialSelectedBrand
	)
	const [isSticky, setIsSticky] = useState(false)
	const ownsDialogHistoryEntryRef = useRef(false)
	const sentinelRef = useRef<HTMLDivElement>(null)
	const bottomSentinelRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const savedVariant = window.localStorage.getItem(
			BRAND_LOGO_VARIANT_STORAGE_KEY
		)
		if (savedVariant === "icon" || savedVariant === "wordmark") {
			setVariant(savedVariant)
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
			setSelectedBrand(getBrandFromPathname(window.location.pathname))
			ownsDialogHistoryEntryRef.current = Boolean(
				window.history.state?.radianBrandLogoDialog
			)
		}

		window.addEventListener("popstate", handlePopState)
		return () => window.removeEventListener("popstate", handlePopState)
	}, [])

	const handleVariantChange = (nextVariant: BrandLogoVariant) => {
		setVariant(nextVariant)
		window.localStorage.setItem(BRAND_LOGO_VARIANT_STORAGE_KEY, nextVariant)
	}

	const handleSelectBrand = (id: BrandLogoId) => {
		const nextState = {
			...window.history.state,
			radianBrandLogoDialog: true,
		}
		if (selectedBrand) {
			window.history.replaceState(nextState, "", getBrandLogoPagePath(id))
		} else {
			window.history.pushState(nextState, "", getBrandLogoPagePath(id))
			ownsDialogHistoryEntryRef.current = true
		}
		setSelectedBrand(id)
	}

	const handleDialogOpenChange = (open: boolean) => {
		if (open) return
		setSelectedBrand(null)
		if (ownsDialogHistoryEntryRef.current) {
			ownsDialogHistoryEntryRef.current = false
			window.history.back()
			return
		}
		window.history.replaceState(
			{ ...window.history.state, radianBrandLogoDialog: false },
			"",
			BRAND_LOGOS_PAGE_PATH
		)
	}

	const visibleLogos = useMemo(() => {
		const source =
			category === ALL_BRAND_LOGO_CATEGORY
				? brandLogos
				: brandLogos.filter((brand) => brand.category === category)
		const normalizedQuery = query.toLowerCase().replace(/[^a-z0-9]/g, "")
		if (!normalizedQuery) return source

		return source.filter((brand) =>
			getBrandLogoSearchTerms(brand.id).some((term) =>
				term
					.toLowerCase()
					.replace(/[^a-z0-9]/g, "")
					.includes(normalizedQuery)
			)
		)
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
	}, [category, query, variant])

	return (
		<div id="brand-logo-collection" className="flex w-full flex-col gap-8 py-2">
			<div ref={sentinelRef} className="pointer-events-none h-px w-full" />
			<div
				className={cn(
					"bg-bg/95 sticky top-0 z-100 border-b border-transparent py-3 backdrop-blur-sm",
					isSticky && "border-soft"
				)}>
				<InputWrapper className="bg-bg h-13 w-full">
					<BrandLogoCategoryDropdown
						value={category}
						onValueChange={setCategory}
					/>
					<BrandLogoOptions
						variant={variant}
						onVariantChange={handleVariantChange}
					/>
					<Search aria-hidden="true" />
					<Input
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Search brand logos (e.g. OpenAI, React, design)..."
						aria-label="Search brand logos"
					/>
				</InputWrapper>
			</div>

			{visibleLogos.length ? (
				<ul className="grid list-none grid-cols-[repeat(auto-fill,142px)] justify-center gap-x-3 gap-y-5 sm:justify-between">
					{visibleLogos.map((brand, index) => (
						<BrandLogoTile
							key={brand.id}
							id={brand.id}
							variant={variant}
							priority={index < 12}
							onSelect={handleSelectBrand}
						/>
					))}
				</ul>
			) : (
				<div className="flex min-h-48 items-center justify-center">
					<Empty>
						<EmptyMedia variant="icon">
							<SearchX />
						</EmptyMedia>
						<EmptyHeader>
							<EmptyTitle>No brand logos found</EmptyTitle>
							<EmptyDescription>
								Try another name or choose a different category.
							</EmptyDescription>
						</EmptyHeader>
					</Empty>
				</div>
			)}

			<div
				ref={bottomSentinelRef}
				className="pointer-events-none h-px w-full"
			/>

			<BrandLogoDetailsDialog
				id={selectedBrand}
				variant={variant}
				open={selectedBrand !== null}
				onOpenChange={handleDialogOpenChange}
				onSelectBrand={handleSelectBrand}
			/>
		</div>
	)
}
