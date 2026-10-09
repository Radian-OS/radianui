"use client"

import {
	startTransition,
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
import { BrandLogoCategoryDropdown } from "./BrandLogoCategoryDropdown"
import { BrandLogoDetailsDialog } from "./BrandLogoDetailsDialog"
import { BrandLogoTile } from "./BrandLogoTile"
import type {
	BrandLogoColorway,
	BrandLogoId,
	BrandLogoVariant,
} from "./brand-logos-data"
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
const BRAND_LOGO_COLORWAY_STORAGE_KEY = "radian-brand-logos-colorway"
const INITIAL_LOGOS_LIMIT = 72
const LOGOS_BATCH_SIZE = 72

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
	const [category, setCategory] = useState(ALL_BRAND_LOGO_CATEGORY)
	const [variant, setVariant] = useState<BrandLogoVariant>("icon")
	const [colorway, setColorway] = useState<BrandLogoColorway>("colored")
	const [selectedBrand, setSelectedBrand] = useState<BrandLogoId | null>(
		initialSelectedBrand
	)
	const [displayLimit, setDisplayLimit] = useState(INITIAL_LOGOS_LIMIT)
	const [, setIsSticky] = useState(false)
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
		const savedColorway = window.localStorage.getItem(
			BRAND_LOGO_COLORWAY_STORAGE_KEY
		)
		if (savedColorway === "colored" || savedColorway === "neutral") {
			setColorway(savedColorway)
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

	const handleCategoryChange = useCallback((nextCategory: string) => {
		startTransition(() => {
			setCategory(nextCategory)
			setDisplayLimit(INITIAL_LOGOS_LIMIT)
		})
	}, [])

	const handleVariantChange = useCallback((nextVariant: BrandLogoVariant) => {
		startTransition(() => {
			setVariant(nextVariant)
			setDisplayLimit(INITIAL_LOGOS_LIMIT)
		})
		window.localStorage.setItem(BRAND_LOGO_VARIANT_STORAGE_KEY, nextVariant)
	}, [])

	const handleColorwayChange = useCallback(
		(nextColorway: BrandLogoColorway) => {
			startTransition(() => {
				setColorway(nextColorway)
				setDisplayLimit(INITIAL_LOGOS_LIMIT)
			})
			window.localStorage.setItem(BRAND_LOGO_COLORWAY_STORAGE_KEY, nextColorway)
		},
		[]
	)

	const handleSelectBrand = useCallback(
		(id: BrandLogoId) => {
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
		},
		[selectedBrand]
	)

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

	const renderedLogos = useMemo(
		() => visibleLogos.slice(0, displayLimit),
		[visibleLogos, displayLimit]
	)

	useEffect(() => {
		const bottomSentinel = bottomSentinelRef.current
		if (!bottomSentinel) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setDisplayLimit((prev) => {
						if (prev >= visibleLogos.length) return prev
						return Math.min(prev + LOGOS_BATCH_SIZE, visibleLogos.length)
					})
				}
			},
			{ rootMargin: "600px 0px" }
		)

		observer.observe(bottomSentinel)
		return () => observer.disconnect()
	}, [visibleLogos.length])

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
	}, [category, query, variant, colorway])

	return (
		<div id="brand-logo-collection" className="flex w-full flex-col gap-8 py-2">
			<div ref={sentinelRef} className="pointer-events-none h-px w-full" />
			<div className="bg-bg/95 sticky top-0 z-100 py-3 backdrop-blur-sm">
				<InputGroup className="w-full">
					<BrandLogoCategoryDropdown
						value={category}
						onValueChange={handleCategoryChange}
						variant={variant}
						onVariantChange={handleVariantChange}
						colorway={colorway}
						onColorwayChange={handleColorwayChange}
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
								setDisplayLimit(INITIAL_LOGOS_LIMIT)
							}}
							placeholder="Search brand logos (e.g. OpenAI, ChatGPT, React)..."
							aria-label="Search brand logos"
						/>
					</InputWrapper>
				</InputGroup>
			</div>

			{visibleLogos.length ? (
				<ul className="grid w-full list-none grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-5">
					{renderedLogos.map((brand, index) => (
						<BrandLogoTile
							key={brand.id}
							id={brand.id}
							variant={variant}
							colorway={colorway}
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
				colorway={colorway}
				open={selectedBrand !== null}
				onOpenChange={handleDialogOpenChange}
				onSelectBrand={handleSelectBrand}
			/>
		</div>
	)
}
