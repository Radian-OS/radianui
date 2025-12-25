import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const DEFAULT_SPOTLIGHT_RADIUS = 300

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

	useEffect(() => {
		if (disableAnimations || !gridRef?.current || !enabled) return

		const cards = gridRef.current.querySelectorAll(".card")
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
				z-index: 1;
				opacity: 0;
				transform: translate(-50%, -50%);
				mix-blend-mode: screen;
			`

			// Make card relative and hide overflow to contain spotlight
			cardElement.style.position = "relative"
			cardElement.style.overflow = "hidden"

			cardElement.appendChild(spotlight)
			spotlights.push(spotlight)
		})

		spotlightsRef.current = spotlights

		const handleMouseMove = (e: MouseEvent) => {
			if (!gridRef.current) return

			const section = gridRef.current.closest(".bento-section")
			const rect = section?.getBoundingClientRect()
			const mouseInside = rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom

			isInsideSection.current = mouseInside || false
			const cards = gridRef.current.querySelectorAll(".card")

			if (!mouseInside) {
				spotlightsRef.current.forEach((spotlight) => {
					gsap.to(spotlight, {
						opacity: 0,
						duration: 0.3,
						ease: "power2.out",
					})
				})
				cards.forEach((card) => {
					;(card as HTMLElement).style.setProperty("--glow-intensity", "0")
				})
				return
			}

			const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius)
			let minDistance = Infinity

			cards.forEach((card, index) => {
				const cardElement = card as HTMLElement
				const cardRect = cardElement.getBoundingClientRect()
				const centerX = cardRect.left + cardRect.width / 2
				const centerY = cardRect.top + cardRect.height / 2
				const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2
				const effectiveDistance = Math.max(0, distance)

				minDistance = Math.min(minDistance, effectiveDistance)

				let glowIntensity = 0
				if (effectiveDistance <= proximity) {
					glowIntensity = 1
				} else if (effectiveDistance <= fadeDistance) {
					glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity)
				}

				updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius)

				// Update spotlight position relative to card
				const spotlight = spotlightsRef.current[index]
				if (spotlight) {
					const relativeX = e.clientX - cardRect.left
					const relativeY = e.clientY - cardRect.top

					gsap.to(spotlight, {
						left: relativeX,
						top: relativeY,
						duration: 0.1,
						ease: "power2.out",
					})

					const targetOpacity = glowIntensity * 0.8

					gsap.to(spotlight, {
						opacity: targetOpacity,
						duration: targetOpacity > 0 ? 0.2 : 0.5,
						ease: "power2.out",
					})
				}
			})
		}

		const handleMouseLeave = () => {
			isInsideSection.current = false
			gridRef.current?.querySelectorAll(".card").forEach((card) => {
				;(card as HTMLElement).style.setProperty("--glow-intensity", "0")
			})
			spotlightsRef.current.forEach((spotlight) => {
				gsap.to(spotlight, {
					opacity: 0,
					duration: 0.3,
					ease: "power2.out",
				})
			})
		}

		document.addEventListener("mousemove", handleMouseMove)
		document.addEventListener("mouseleave", handleMouseLeave)

		return () => {
			document.removeEventListener("mousemove", handleMouseMove)
			document.removeEventListener("mouseleave", handleMouseLeave)
			spotlightsRef.current.forEach((spotlight) => {
				spotlight.parentNode?.removeChild(spotlight)
			})
		}
	}, [gridRef, disableAnimations, enabled, spotlightRadius])

	return null
}
