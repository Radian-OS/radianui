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
	const spotlightRef = useRef<HTMLDivElement | null>(null)
	const isInsideSection = useRef(false)

	useEffect(() => {
		if (disableAnimations || !gridRef?.current || !enabled) return

		// Create spotlight element (for both light and dark modes)
		const spotlight = document.createElement("div")
		spotlight.className = "global-spotlight"
		spotlight.style.cssText = `
      position: fixed;
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
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `
		document.body.appendChild(spotlight)
		spotlightRef.current = spotlight

		const handleMouseMove = (e: MouseEvent) => {
			if (!spotlightRef.current || !gridRef.current) return

			const section = gridRef.current.closest(".bento-section")
			const rect = section?.getBoundingClientRect()
			const mouseInside = rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom

			isInsideSection.current = mouseInside || false
			const cards = gridRef.current.querySelectorAll(".card")

			if (!mouseInside) {
				gsap.to(spotlightRef.current, {
					opacity: 0,
					duration: 0.3,
					ease: "power2.out",
				})
				cards.forEach((card) => {
					;(card as HTMLElement).style.setProperty("--glow-intensity", "0")
				})
				return
			}

			const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius)
			let minDistance = Infinity

			cards.forEach((card) => {
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
			})

			gsap.to(spotlightRef.current, {
				left: e.clientX,
				top: e.clientY,
				duration: 0.1,
				ease: "power2.out",
			})

			const targetOpacity = minDistance <= proximity ? 0.8 : minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8 : 0

			gsap.to(spotlightRef.current, {
				opacity: targetOpacity,
				duration: targetOpacity > 0 ? 0.2 : 0.5,
				ease: "power2.out",
			})
		}

		const handleMouseLeave = () => {
			isInsideSection.current = false
			gridRef.current?.querySelectorAll(".card").forEach((card) => {
				;(card as HTMLElement).style.setProperty("--glow-intensity", "0")
			})
			if (spotlightRef.current) {
				gsap.to(spotlightRef.current, {
					opacity: 0,
					duration: 0.3,
					ease: "power2.out",
				})
			}
		}

		document.addEventListener("mousemove", handleMouseMove)
		document.addEventListener("mouseleave", handleMouseLeave)

		return () => {
			document.removeEventListener("mousemove", handleMouseMove)
			document.removeEventListener("mouseleave", handleMouseLeave)
			spotlightRef.current?.parentNode?.removeChild(spotlightRef.current)
		}
	}, [gridRef, disableAnimations, enabled, spotlightRadius])

	return null
}
