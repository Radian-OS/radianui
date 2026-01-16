import { useEffect, useRef } from "react"

const DEFAULT_SPOTLIGHT_RADIUS = 300

const EASE_OUT_POWER2 = "cubic-bezier(0.22, 1, 0.36, 1)"

const calculateSpotlightValues = (radius: number) => ({
	proximity: radius * 0.5,
	fadeDistance: radius * 0.75,
})

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
	const rect = card.getBoundingClientRect()
	const relativeX = ((mouseX - rect.left) / rect.width) * 100
	const relativeY = ((mouseY - rect.top) / rect.height) * 100

	card.style.setProperty("--glow-x", `${relativeX}%`)
	card.style.setProperty("--glow-y", `${relativeY}%`)
	card.style.setProperty("--glow-intensity", glow.toString())
	card.style.setProperty("--glow-radius", `${radius}px`)
}

export const GlobalSpotlight: React.FC<{
	gridRef: React.RefObject<HTMLDivElement | null>
	disableAnimations?: boolean
	enabled?: boolean
	spotlightRadius?: number
	isDarkMode?: boolean
}> = ({ gridRef, disableAnimations = false, enabled = true, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS }) => {
	const spotlightsRef = useRef<HTMLDivElement[]>([])
	const isInsideSection = useRef(false)

	// rAF throttle for mousemove work
	const rafIdRef = useRef<number | null>(null)
	const lastMouseRef = useRef<{ x: number; y: number } | null>(null)

	useEffect(() => {
		if (disableAnimations || !gridRef?.current || !enabled) return

		const gridEl = gridRef.current
		const cards = gridEl.querySelectorAll(".card")
		const spotlights: HTMLDivElement[] = []

		// Create spotlight element for each card
		cards.forEach((card) => {
			const cardElement = card as HTMLElement
			const spotlight = document.createElement("div")

			spotlight.className = "card-spotlight"
			spotlight.style.cssText = `
				position: absolute;
				width: 800px;
				height: 800px;
				border-radius: 50%;
				pointer-events: none;
				background: radial-gradient(circle,
					color-mix(in oklch, var(--color-primary), transparent 85%) 0%,
					color-mix(in oklch, var(--color-primary), transparent 92%) 15%,
					color-mix(in oklch, var(--color-primary), transparent 96%) 25%,
					color-mix(in oklch, var(--color-primary), transparent 98%) 40%,
					color-mix(in oklch, var(--color-primary), transparent 99%) 65%,
					transparent 70%
				);
				z-index: 200;
				opacity: 0;
				left: 0px;
				top: 0px;
				transform: translate(-50%, -50%);
				mix-blend-mode: screen;
				will-change: left, top, opacity;
				transition-property: left, top, opacity;
				transition-timing-function: ${EASE_OUT_POWER2}, ${EASE_OUT_POWER2}, ${EASE_OUT_POWER2};
				transition-duration: 0.1s, 0.1s, 0.3s;
			`

			// Make card relative and hide overflow to contain spotlight
			cardElement.style.position = "relative"
			cardElement.style.overflow = "hidden"

			cardElement.appendChild(spotlight)
			spotlights.push(spotlight)
		})

		spotlightsRef.current = spotlights

		const fadeAllOut = (durationSeconds: number) => {
			spotlightsRef.current.forEach((spotlight) => {
				// keep same movement smoothing; only change opacity duration here
				spotlight.style.transitionDuration = `0.1s, 0.1s, ${durationSeconds}s`
				spotlight.style.opacity = "0"
			})
			gridEl.querySelectorAll(".card").forEach((card) => {
				;(card as HTMLElement).style.setProperty("--glow-intensity", "0")
			})
		}

		const applyUpdate = (x: number, y: number) => {
			const section = gridEl.closest(".bento-section")
			const rect = section?.getBoundingClientRect()
			const mouseInside = !!rect && x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom

			isInsideSection.current = mouseInside

			const cardsNow = gridEl.querySelectorAll(".card")

			if (!mouseInside) {
				fadeAllOut(0.3)
				return
			}

			const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius)

			cardsNow.forEach((card, index) => {
				const cardElement = card as HTMLElement
				const cardRect = cardElement.getBoundingClientRect()
				const centerX = cardRect.left + cardRect.width / 2
				const centerY = cardRect.top + cardRect.height / 2

				const distance = Math.hypot(x - centerX, y - centerY) - Math.max(cardRect.width, cardRect.height) / 2
				const effectiveDistance = Math.max(0, distance)

				let glowIntensity = 0
				if (effectiveDistance <= proximity) {
					glowIntensity = 1
				} else if (effectiveDistance <= fadeDistance) {
					glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity)
				}

				updateCardGlowProperties(cardElement, x, y, glowIntensity, spotlightRadius)

				const spotlight = spotlightsRef.current[index]
				if (!spotlight) return

				const relativeX = x - cardRect.left
				const relativeY = y - cardRect.top

				spotlight.style.transitionDuration = `0.1s, 0.1s, ${glowIntensity * 0.8 > 0 ? 0.2 : 0.5}s`

				spotlight.style.left = `${relativeX}px`
				spotlight.style.top = `${relativeY}px`

				const targetOpacity = glowIntensity * 0.8
				spotlight.style.opacity = `${targetOpacity}`
			})
		}

		const handleMouseMove = (e: MouseEvent) => {
			lastMouseRef.current = { x: e.clientX, y: e.clientY }

			if (rafIdRef.current != null) return
			rafIdRef.current = window.requestAnimationFrame(() => {
				rafIdRef.current = null
				const last = lastMouseRef.current
				if (!last) return
				applyUpdate(last.x, last.y)
			})
		}

		const handleMouseLeave = () => {
			isInsideSection.current = false
			fadeAllOut(0.3)
		}

		document.addEventListener("mousemove", handleMouseMove, { passive: true })
		document.addEventListener("mouseleave", handleMouseLeave)

		return () => {
			document.removeEventListener("mousemove", handleMouseMove)
			document.removeEventListener("mouseleave", handleMouseLeave)

			if (rafIdRef.current != null) {
				cancelAnimationFrame(rafIdRef.current)
				rafIdRef.current = null
			}

			spotlightsRef.current.forEach((spotlight) => {
				spotlight.parentNode?.removeChild(spotlight)
			})
			spotlightsRef.current = []
		}
	}, [gridRef, disableAnimations, enabled, spotlightRadius])

	return null
}
