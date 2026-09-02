import {
	startTransition,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react"
import {
	BACKGROUNDS,
	GRADIENT_IMAGES,
} from "@/app/(resources)/resources/(avatar)/components/ToneFilterDropdown"
import {
	AVATARS,
	CATEGORY_AVATAR_MAP,
	SOLID_COLOR_MAP,
} from "@/constants/avatar-playground-utils"

const FAVORITES_STORAGE_KEY = "radian-avatar-favorites"
const TONE_STORAGE_KEY = "radian-avatar-tone"
const SHADOW_STORAGE_KEY = "radian-avatar-shadow"

export type ColorMode = "static" | "radian"

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

export const useAvatarPlayground = () => {
	const [category, setCategory] = useState("all")
	const [tone, setTone] = useState("pick-color")
	const [randomTrigger, setRandomTrigger] = useState(0)
	const [configOpen, setConfigOpen] = useState(false)
	const [copyFormat, setCopyFormat] = useState("image")
	const [colorMode, setColorMode] = useState<ColorMode>("static")
	const [showShadow, setShowShadow] = useState(true)
	const [favorites, setFavorites] = useState<Set<string>>(() => new Set())
	const [isBlocked, setIsBlocked] = useState(false)
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
		const savedTone = getSavedTone()
		if (savedTone && savedTone !== "pick-color") {
			setTone(savedTone)
		}
		const savedFavs = getSavedFavorites()
		if (savedFavs.size > 0) {
			setFavorites(savedFavs)
		}
		const savedShadow = localStorage.getItem(SHADOW_STORAGE_KEY)
		if (savedShadow !== null) {
			setShowShadow(savedShadow === "true")
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
		setIsBlocked(true)
		setTimeout(() => {
			setIsBlocked(false)
		}, 300)

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

	const handleShowShadowChange = useCallback((value: boolean) => {
		localStorage.setItem(SHADOW_STORAGE_KEY, String(value))
		startTransition(() => {
			setShowShadow(value)
		})
	}, [])

	const handleToneChange = useCallback((value: string) => {
		localStorage.setItem(TONE_STORAGE_KEY, value)

		if (value === "none") {
			localStorage.setItem(SHADOW_STORAGE_KEY, "false")
			setShowShadow(false)
		}

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

	const favoritesArray = useMemo(() => Array.from(favorites), [favorites])

	const displayedAvatars = useMemo(
		() =>
			AVATARS.map((src, index) => ({ src, index }))
				.filter(({ src, index }) => {
					if (category === "favorites") {
						return favorites.has(src)
					}
					const avatarNumber = index + 1
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
					if (isAFav && isBFav) {
						return favoritesArray.indexOf(b.src) - favoritesArray.indexOf(a.src)
					}
					return a.index - b.index
				}),
		[category, favorites, favoritesArray]
	)

	return {
		category,
		setCategory,
		tone,
		handleToneChange,
		configOpen,
		setConfigOpen,
		copyFormat,
		setCopyFormat,
		colorMode,
		setColorMode,
		showShadow,
		handleShowShadowChange,
		favorites,
		toggleFavorite,
		isBlocked,
		isHydrated,
		sentinelRef,
		bottomSentinelRef,
		resolvedTones,
		displayedAvatars,
	}
}
