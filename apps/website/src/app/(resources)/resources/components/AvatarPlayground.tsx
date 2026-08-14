"use client"

import {
	startTransition,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react"
import { Settings, Star } from "lucide-react"
import { toast } from "sonner"
import {
	AVATARS,
	CATEGORY_AVATAR_MAP,
	// randomSolidMapColor,
	SOLID_COLOR_MAP,
	copyRandomAvatar,
	getToneStyle,
} from "@/constants/avatar-playground-utils"
import { Button, IconButton } from "@/registry/ui/button"
import { Skeleton } from "@/registry/ui/skeleton"
import { AvatarTile } from "./AvatarTile"
import CategoryFilterDropdown from "./CategoryFilterDropdown"
import ConfigPreferencesDialog from "./ConfigPreferencesDialog"
import FigmaCustomIcon from "./FigmaCustomIcon"
import { BACKGROUNDS, GRADIENT_IMAGES } from "./ToneFilterDropdown"
import ToneFilterDropdown from "./ToneFilterDropdown"

const FAVORITES_STORAGE_KEY = "radian-avatar-favorites"
const TONE_STORAGE_KEY = "radian-avatar-tone"

const getSavedFavorites = () => {
	if (typeof window === "undefined") return new Set<string>()

	try {
		const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY)
		const parsedFavorites: unknown = savedFavorites
			? JSON.parse(savedFavorites)
			: []
		return new Set(
			Array.isArray(parsedFavorites)
				? parsedFavorites.filter(
						(item): item is string => typeof item === "string"
					)
				: []
		)
	} catch {
		localStorage.removeItem(FAVORITES_STORAGE_KEY)
		return new Set<string>()
	}
}

const getSavedTone = () => {
	if (typeof window === "undefined") return "pick-color"

	return localStorage.getItem(TONE_STORAGE_KEY) ?? "pick-color"
}

const AvatarPlayground = () => {
	type ColorMode = "static" | "radian"

	const [category, setCategory] = useState("all")
	const [tone, setTone] = useState("pick-color")
	const [randomTrigger, setRandomTrigger] = useState(0)
	const [configOpen, setConfigOpen] = useState(false)
	const [copyFormat, setCopyFormat] = useState("editable-bg")
	const [colorMode, setColorMode] = useState<ColorMode>("static")
	const [favorites, setFavorites] = useState<Set<string>>(() => new Set())
	const [isHydrated, setIsHydrated] = useState(false)
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
				new CustomEvent("avatar-filter-sticky", { detail: { isSticky } })
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
				new CustomEvent("avatar-filter-sticky", { detail: { isSticky: false } })
			)
		}
	}, [])

	useEffect(() => {
		const savedTone = getSavedTone()
		if (savedTone && savedTone !== "pick-color") {
			setTone(savedTone)
		}
		const savedFavs = getSavedFavorites()
		if (savedFavs.size > 0) {
			setFavorites(savedFavs)
		}
		setIsHydrated(true)
	}, [])

	useEffect(() => {
		if (isHydrated && typeof window !== "undefined") {
			localStorage.setItem(
				FAVORITES_STORAGE_KEY,
				JSON.stringify([...favorites])
			)
		}
	}, [favorites, isHydrated])

	const toggleFavorite = useCallback((src: string) => {
		startTransition(() => {
			setFavorites((currentFavorites) => {
				const nextFavorites = new Set(currentFavorites)
				if (nextFavorites.has(src)) {
					nextFavorites.delete(src)
				} else {
					nextFavorites.add(src)
				}
				return nextFavorites
			})
		})
	}, [])

	const handleToneChange = useCallback((value: string) => {
		localStorage.setItem(TONE_STORAGE_KEY, value)

		if (
			value === "pick-color" ||
			value === "pick-gradient" ||
			value === "pick-background"
		) {
			setTone(value)
			setRandomTrigger((prev) => prev + 1)
		} else {
			setTone(value)
		}
	}, [])

	const resolvedTones = useMemo(() => {
		const solidColorValues = Object.values(SOLID_COLOR_MAP)
		return AVATARS.map((_, index) => {
			if (tone === "pick-color") {
				const seed = index + randomTrigger * 19
				const hash = Math.abs((seed * 31 + 7) % solidColorValues.length)
				return solidColorValues[hash]
			}
			if (tone === "pick-gradient") {
				const seed = index + randomTrigger * 19
				const hash = Math.abs((seed * 31 + 7) % GRADIENT_IMAGES.length)
				return GRADIENT_IMAGES[hash]
			}
			if (tone === "pick-background") {
				const seed = index + randomTrigger * 19
				const hash = Math.abs((seed * 31 + 7) % BACKGROUNDS.length)
				return BACKGROUNDS[hash]
			}
			return tone
		})
	}, [tone, randomTrigger])

	const displayedAvatars = useMemo(
		() =>
			AVATARS.map((src, index) => ({ src, index }))
				.filter(({ src }) => {
					if (category === "favorites") {
						return favorites.has(src)
					}
					const avatarNumber = Number(src.match(/\d+/)?.[0])
					return (
						category === "all" ||
						CATEGORY_AVATAR_MAP[category]?.includes(avatarNumber)
					)
				})
				.sort((a, b) => {
					const isAFav = favorites.has(a.src)
					const isBFav = favorites.has(b.src)
					if (isAFav !== isBFav) {
						return isAFav ? -1 : 1
					}
					return a.index - b.index
				}),
		[category, favorites]
	)

	return (
		<div className="flex w-full flex-col gap-4 py-2">
			<div ref={sentinelRef} className="pointer-events-none h-px w-full" />
			<div className="bg-bg/95 z-100 sticky top-0 flex w-full items-center justify-between py-3 backdrop-blur-sm">
				<CategoryFilterDropdown
					value={category}
					onChange={setCategory}
					favoriteCount={favorites.size}
				/>

				<div className="flex items-center gap-2">
					<ToneFilterDropdown
						value={tone}
						onChange={handleToneChange}
						colorMode={colorMode}
					/>

					<Button
						color="neutral"
						variant="outline"
						className="hidden sm:flex"
						onClick={() => setConfigOpen(true)}>
						<Settings className="text-fg-secondary" />
						Config
					</Button>
					<IconButton
						color="neutral"
						variant="outline"
						className="block sm:hidden"
						onClick={() => setConfigOpen(true)}>
						<Settings className="text-fg-secondary" />
					</IconButton>

					<IconButton
						type="button"
						color="neutral"
						variant="outline"
						onClick={async () => {
							const randomIdx = Math.floor(Math.random() * AVATARS.length)
							const randomTone = resolvedTones[randomIdx]
							const avatarSrc = await copyRandomAvatar(randomTone)
							if (avatarSrc) {
								toast.custom(() => (
									<div className="bg-black-inverse text-fg-inverse sm:w-78.5 flex w-full items-center gap-2 rounded-[10px] p-2">
										<img
											src={avatarSrc}
											alt=""
											className="size-15 rounded-lg object-cover"
										/>
										<div className="text-fg-inverse space-y-0.5 text-sm">
											<p className="font-medium">Added to Clipboard</p>
											<p className="text-fg-secondary font-normal">
												Avatar has been copied to your clipboard.
											</p>
										</div>
									</div>
								))
							}
						}}>
						<FigmaCustomIcon />
					</IconButton>
				</div>
			</div>

			{!isHydrated ? (
				<div
					aria-label="Loading avatars"
					className="grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-7">
					{Array.from({ length: 14 }).map((_, i) => (
						<Skeleton key={i} className="aspect-square w-full rounded-xl" />
					))}
				</div>
			) : displayedAvatars.length === 0 ? (
				<div className="border-soft bg-bg/50 flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
					<Star className="text-fg-secondary mb-3 size-10" />
					<p className="text-sm font-medium">No favorite avatars yet</p>
					<p className="text-fg-secondary mt-1 text-xs">
						Click the 3 dots menu on any avatar tile to add it to your
						favorites.
					</p>
				</div>
			) : (
				<ul
					suppressHydrationWarning
					aria-label="Available UI avatar illustrations"
					className="grid list-none grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-7">
					{displayedAvatars.map(({ src, index }) => {
						const tileTone = resolvedTones[index]
						return (
							<AvatarTile
								key={src}
								src={src}
								index={index}
								toneStyle={getToneStyle(tileTone)}
								tone={tileTone}
								copyFormat={copyFormat}
								isFavorite={favorites.has(src)}
								onToggleFavorite={() => toggleFavorite(src)}
							/>
						)
					})}
				</ul>
			)}

			<div
				ref={bottomSentinelRef}
				className="pointer-events-none h-px w-full"
			/>

			<ConfigPreferencesDialog
				open={configOpen}
				onOpenChange={setConfigOpen}
				copyFormat={copyFormat}
				onCopyFormatChange={setCopyFormat}
				colorMode={colorMode}
				onColorModeChange={setColorMode}
			/>
		</div>
	)
}

export default AvatarPlayground
