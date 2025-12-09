"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { CircleGauge, Component, FolderGit, LayoutDashboard, ScanEye, SquareTerminal, SwatchBook } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { CodeSync } from "./homepagesvg/code-sync"
import { ComponentFlowCard } from "./homepagesvg/component-flow"

export interface BentoCardProps {
	color?: string
	title?: string
	description?: string
	label?: string
	textAutoHide?: boolean
	disableAnimations?: boolean
}

export interface BentoProps {
	textAutoHide?: boolean
	enableSpotlight?: boolean
	enableBorderGlow?: boolean
	disableAnimations?: boolean
	spotlightRadius?: number
	enableTilt?: boolean
	clickEffect?: boolean
	enableMagnetism?: boolean
	alwaysShowParticles?: boolean
}

const DEFAULT_SPOTLIGHT_RADIUS = 300
const MOBILE_BREAKPOINT = 768

const cardStyle = {
	backgroundColor: "var(--color-bg)",
	borderColor: "var(--color-soft)",
	color: "var(--color-fg)",
	"--glow-x": "50%",
	"--glow-y": "50%",
	"--glow-intensity": "0",
	"--glow-radius": "200px",
} as React.CSSProperties

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

const ParticleCard = React.forwardRef<
	HTMLDivElement,
	{
		children: React.ReactNode
		className?: string
		disableAnimations?: boolean
		style?: React.CSSProperties
		particleCount?: number
		enableTilt?: boolean
		clickEffect?: boolean
		enableMagnetism?: boolean
		alwaysShowParticles?: boolean
		isDarkMode?: boolean
	}
>(
	(
		{
			children,
			className = "",
			disableAnimations = false,
			style,
			enableTilt = true,
			clickEffect = false,
			enableMagnetism = false,
			alwaysShowParticles = false,
			isDarkMode = false,
		},
		forwardedRef
	) => {
		const cardRef = useRef<HTMLDivElement>(null)
		const particlesRef = useRef<HTMLDivElement[]>([])
		const blinkAnimationsRef = useRef<gsap.core.Tween[]>([])
		const moveAnimationsRef = useRef<gsap.core.Tween[]>([])
		const returnAnimationsRef = useRef<gsap.core.Tween[]>([])
		const timeoutsRef = useRef<NodeJS.Timeout[]>([])
		const isHoveredRef = useRef(false)
		const memoizedParticles = useRef<HTMLDivElement[]>([])
		const particlesInitialized = useRef(false)
		const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null)

		// Combine the forwarded ref with internal ref
		React.useEffect(() => {
			if (typeof forwardedRef === "function") {
				forwardedRef(cardRef.current)
			} else if (forwardedRef) {
				forwardedRef.current = cardRef.current
			}
		}, [forwardedRef])

		const initializeParticles = useCallback(() => {
			if (particlesInitialized.current || !cardRef.current) return

			// const { width, height } = cardRef.current.getBoundingClientRect()
			// memoizedParticles.current = Array.from({ length: 12 }, () => createParticleElement(Math.random() * width, Math.random() * height))
			particlesInitialized.current = true
		}, [])

		const clearAllParticles = useCallback(() => {
			timeoutsRef.current.forEach(clearTimeout)
			timeoutsRef.current = []
			magnetismAnimationRef.current?.kill()

			// Kill all animations
			blinkAnimationsRef.current.forEach((animation) => animation.kill())
			blinkAnimationsRef.current = []
			moveAnimationsRef.current.forEach((animation) => animation.kill())
			moveAnimationsRef.current = []
			returnAnimationsRef.current.forEach((animation) => animation.kill())
			returnAnimationsRef.current = []

			particlesRef.current.forEach((particle) => {
				gsap.to(particle, {
					scale: 0,
					opacity: 0,
					duration: 0.3,
					ease: "back.in(1.7)",
					onComplete: () => {
						particle.parentNode?.removeChild(particle)
					},
				})
			})
			particlesRef.current = []
		}, [])

		const startBlinkAnimations = useCallback(() => {
			if (!cardRef.current || !isDarkMode) return

			// Clear existing blink animations
			blinkAnimationsRef.current.forEach((animation) => animation.kill())
			blinkAnimationsRef.current = []

			particlesRef.current.forEach((particle) => {
				// Continuous blinking animation
				const blinkAnimation = gsap.to(particle, {
					opacity: 0.3 + Math.random() * 0.4,
					duration: 2 + Math.random() * 2,
					ease: "sine.inOut",
					repeat: -1,
					yoyo: true,
				})

				blinkAnimationsRef.current.push(blinkAnimation)
			})
		}, [isDarkMode])

		const startMoveAnimations = useCallback(() => {
			if (!cardRef.current || !isDarkMode) return

			// Clear any return animations first
			returnAnimationsRef.current.forEach((animation) => animation.kill())
			returnAnimationsRef.current = []

			// Clear existing move animations
			moveAnimationsRef.current.forEach((animation) => animation.kill())
			moveAnimationsRef.current = []

			particlesRef.current.forEach((particle) => {
				// Floating movement animation
				const moveAnimation = gsap.to(particle, {
					x: (Math.random() - 0.5) * 20,
					y: (Math.random() - 0.5) * 20,
					rotation: Math.random() * 360,
					duration: 3 + Math.random() * 3,
					ease: "sine.inOut",
					repeat: -1,
					yoyo: true,
				})

				moveAnimationsRef.current.push(moveAnimation)
			})
		}, [isDarkMode])

		const stopMoveAnimations = useCallback(() => {
			// Kill all move animations
			moveAnimationsRef.current.forEach((animation) => animation.kill())
			moveAnimationsRef.current = []

			// Clear any existing return animations
			returnAnimationsRef.current.forEach((animation) => animation.kill())
			returnAnimationsRef.current = []

			// Smoothly animate particles back to their original positions
			particlesRef.current.forEach((particle) => {
				const returnAnimation = gsap.to(particle, {
					x: 0,
					y: 0,
					rotation: 0,
					duration: 1.5, // Longer duration for smooth return
					ease: "power2.out", // Smooth easing
					overwrite: true,
				})

				returnAnimationsRef.current.push(returnAnimation)
			})
		}, [])

		const createParticlesWithBlink = useCallback(() => {
			if (!cardRef.current || !isDarkMode) return

			if (!particlesInitialized.current) {
				initializeParticles()
			}

			// Clear existing particles first
			particlesRef.current.forEach((particle) => {
				particle.parentNode?.removeChild(particle)
			})
			particlesRef.current = []

			// Create particles with blinking only
			memoizedParticles.current.forEach((particle) => {
				if (!cardRef.current) return

				const clone = particle.cloneNode(true) as HTMLDivElement
				cardRef.current.appendChild(clone)
				particlesRef.current.push(clone)

				// Initial appearance animation
				gsap.fromTo(
					clone,
					{ scale: 0, opacity: 0 },
					{
						scale: 1,
						opacity: 1,
						duration: 0.5, // Slightly longer for smoother appearance
						ease: "back.out(1.7)",
					}
				)
			})

			// Start blinking animations
			startBlinkAnimations()
		}, [initializeParticles, isDarkMode, startBlinkAnimations])

		const animateParticlesOnHover = useCallback(() => {
			if (!cardRef.current || !isHoveredRef.current || !isDarkMode) return

			if (!particlesInitialized.current) {
				initializeParticles()
			}

			memoizedParticles.current.forEach((particle, index) => {
				const timeoutId = setTimeout(() => {
					if (!isHoveredRef.current || !cardRef.current) return

					const clone = particle.cloneNode(true) as HTMLDivElement
					cardRef.current.appendChild(clone)
					particlesRef.current.push(clone)

					gsap.fromTo(
						clone,
						{ scale: 0, opacity: 0 },
						{
							scale: 1,
							opacity: 1,
							duration: 0.5,
							ease: "back.out(1.7)",
						}
					)

					// Start blinking animation immediately
					const blinkAnimation = gsap.to(clone, {
						opacity: 0.3 + Math.random() * 0.4,
						duration: 2 + Math.random() * 2,
						ease: "sine.inOut",
						repeat: -1,
						yoyo: true,
					})

					blinkAnimationsRef.current.push(blinkAnimation)

					// Start movement animation on hover
					const moveAnimation = gsap.to(clone, {
						x: (Math.random() - 0.5) * 10,
						y: (Math.random() - 0.5) * 10,
						rotation: Math.random() * 360,
						duration: 2 + Math.random() * 2,
						ease: "sine.inOut",
						repeat: -1,
						yoyo: true,
					})

					moveAnimationsRef.current.push(moveAnimation)
				}, index * 150) // Slightly longer delay for smoother appearance

				timeoutsRef.current.push(timeoutId)
			})
		}, [initializeParticles, isDarkMode])

		useEffect(() => {
			if (disableAnimations || !cardRef.current) return

			const element = cardRef.current

			// Create particles based on alwaysShowParticles setting
			if (alwaysShowParticles && isDarkMode) {
				createParticlesWithBlink()
			}

			const handleMouseEnter = () => {
				isHoveredRef.current = true

				// Start movement animations when hovering
				if (isDarkMode) {
					if (alwaysShowParticles) {
						startMoveAnimations()
					} else {
						animateParticlesOnHover()
					}
				}

				if (enableTilt) {
					gsap.to(element, {
						rotateX: 5,
						rotateY: 5,
						duration: 0.3,
						ease: "power2.out",
						transformPerspective: 1000,
					})
				}
			}

			const handleMouseLeave = () => {
				isHoveredRef.current = false

				// Stop movement animations when not hovering (but keep blinking)
				if (isDarkMode) {
					if (alwaysShowParticles) {
						stopMoveAnimations()
					} else {
						// For non-alwaysShow particles, smoothly fade out instead of immediate removal
						particlesRef.current.forEach((particle) => {
							gsap.to(particle, {
								scale: 0,
								opacity: 0,
								duration: 0.8,
								ease: "power2.out",
								onComplete: () => {
									particle.parentNode?.removeChild(particle)
								},
							})
						})
						particlesRef.current = []
						blinkAnimationsRef.current = []
						moveAnimationsRef.current = []
					}
				}

				if (enableTilt) {
					gsap.to(element, {
						rotateX: 0,
						rotateY: 0,
						duration: 0.3,
						ease: "power2.out",
					})
				}

				if (enableMagnetism) {
					gsap.to(element, {
						x: 0,
						y: 0,
						duration: 0.3,
						ease: "power2.out",
					})
				}
			}

			const handleMouseMove = (e: MouseEvent) => {
				if (!enableTilt && !enableMagnetism) return

				const rect = element.getBoundingClientRect()
				const x = e.clientX - rect.left
				const y = e.clientY - rect.top
				const centerX = rect.width / 2
				const centerY = rect.height / 2

				if (enableTilt) {
					const rotateX = ((y - centerY) / centerY) * -10
					const rotateY = ((x - centerX) / centerX) * 10

					gsap.to(element, {
						rotateX,
						rotateY,
						duration: 0.1,
						ease: "power2.out",
						transformPerspective: 1000,
					})
				}

				if (enableMagnetism) {
					const magnetX = (x - centerX) * 0.05
					const magnetY = (y - centerY) * 0.05

					magnetismAnimationRef.current = gsap.to(element, {
						x: magnetX,
						y: magnetY,
						duration: 0.3,
						ease: "power2.out",
					})
				}
			}

			const handleClick = (e: MouseEvent) => {
				if (!clickEffect) return

				const rect = element.getBoundingClientRect()
				const x = e.clientX - rect.left
				const y = e.clientY - rect.top

				const maxDistance = Math.max(Math.hypot(x, y), Math.hypot(x - rect.width, y), Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height))

				const ripple = document.createElement("div")
				ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, color-mix(in oklch, var(--color-primary), transparent 60%) 0%, color-mix(in oklch, var(--color-primary), transparent 80%) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `

				element.appendChild(ripple)

				gsap.fromTo(
					ripple,
					{
						scale: 0,
						opacity: 1,
					},
					{
						scale: 1,
						opacity: 0,
						duration: 0.8,
						ease: "power2.out",
						onComplete: () => ripple.remove(),
					}
				)
			}

			element.addEventListener("mouseenter", handleMouseEnter)
			element.addEventListener("mouseleave", handleMouseLeave)
			element.addEventListener("mousemove", handleMouseMove)
			element.addEventListener("click", handleClick)

			return () => {
				isHoveredRef.current = false
				element.removeEventListener("mouseenter", handleMouseEnter)
				element.removeEventListener("mouseleave", handleMouseLeave)
				element.removeEventListener("mousemove", handleMouseMove)
				element.removeEventListener("click", handleClick)
				clearAllParticles()
			}
		}, [
			animateParticlesOnHover,
			createParticlesWithBlink,
			clearAllParticles,
			disableAnimations,
			enableTilt,
			enableMagnetism,
			clickEffect,
			alwaysShowParticles,
			isDarkMode,
			startMoveAnimations,
			stopMoveAnimations,
		])

		return (
			<div ref={cardRef} className={`${className} relative overflow-hidden`} style={{ ...style, position: "relative", overflow: "hidden" }}>
				{children}
			</div>
		)
	}
)

ParticleCard.displayName = "ParticleCard"

const GlobalSpotlight: React.FC<{
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

export const BentoCardGrid: React.FC<{
	children: React.ReactNode
	className: string
	gridRef?: React.RefObject<HTMLDivElement | null>
}> = ({ children, gridRef, className }) => (
	<div className={cn("bento-section", className)} style={{ fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.5rem)" }} ref={gridRef}>
		{children}
	</div>
)

const useMobileDetection = () => {
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)

		checkMobile()
		window.addEventListener("resize", checkMobile)

		return () => window.removeEventListener("resize", checkMobile)
	}, [])

	return isMobile
}

const FeaturesSection: React.FC<BentoProps> = ({
	enableSpotlight = true,
	disableAnimations = false,
	spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
	enableTilt = false,
	clickEffect = true,
	enableMagnetism = true,
	alwaysShowParticles = false,
}) => {
	const gridRef = useRef<HTMLDivElement>(null)
	const componentCardRef = useRef<HTMLDivElement>(null) // Add this new ref

	const isMobile = useMobileDetection()
	const shouldDisableAnimations = disableAnimations || isMobile
	const { theme } = useTheme()
	const isDarkMode = theme === "dark"

	return (
		<>
			<style>
				{`
  .bento-section {
    --glow-x: 50%;
    --glow-y: 50%;
    --glow-intensity: 0;
    --glow-radius: 200px;
    --glow-color: var(--color-primary);
    --white: hsl(0, 0%, 100%);
    --purple-primary: var(--color-primary);
    --purple-glow: color-mix(in oklch, var(--color-primary), transparent 80%);
    --purple-border: color-mix(in oklch, var(--color-primary), transparent 20%);
  }
  
  .card-responsive {
    grid-template-columns: 1fr;
    width: 90%;
    margin: 0 auto;
    padding: 0.5rem;
  }
  
  @media (min-width: 600px) {
    .card-responsive {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .card-responsive {
      grid-template-columns: repeat(4, 1fr);
    }
    
    .card-responsive .card:nth-child(3) {
      grid-column: span 2;
      grid-row: span 2;
    }
    
    .card-responsive .card:nth-child(4) {
      grid-column: 1 / span 2;
      grid-row: 2 / span 2;
    }
    
    .card-responsive .card:nth-child(6) {
      grid-column: 4;
      grid-row: 3;
    }
  }
  
  /* Firefox-compatible border glow */
  .card--border-glow {
    position: relative;
  }
  
  .card--border-glow::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 1px;
    background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
        color-mix(in oklch, var(--color-primary), transparent 20%) 0%,
        color-mix(in oklch, var(--color-primary), transparent 60%) 30%,
        transparent 70%);
    border-radius: inherit;
    pointer-events: none;
    z-index: 2;
    opacity: var(--glow-intensity);
    transition: opacity 0.3s ease;
  }
  
  /* Chrome/Safari specific - webkit mask */
  .card--border-glow::before {
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
  }
  
  /* Firefox specific - standard mask */
  @supports (mask-composite: subtract) {
    .card--border-glow::before {
      mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      mask-composite: subtract;
    }
  }
  
  /* Fallback for older Firefox versions */
  @supports not (mask-composite: subtract) {
    .card--border-glow::before {
      mask: 
        linear-gradient(#fff, #fff) content-box, 
        linear-gradient(#fff, #fff);
      mask-composite: subtract;
      -webkit-mask: none;
    }
  }
  
  .card--border-glow:hover::before {
    opacity: 1;
  }
  
  .particle::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: color-mix(in oklch, var(--color-primary), transparent 80%);
    border-radius: 50%;
    z-index: -1;
  }
  
  .particle-container:hover {
    box-shadow: 0 4px 20px color-mix(in oklch, var(--color-primary), transparent 80%), 0 0 30px color-mix(in oklch, var(--color-primary), transparent 80%);
  }

`}
			</style>

			{enableSpotlight && <GlobalSpotlight gridRef={gridRef} disableAnimations={shouldDisableAnimations} enabled={enableSpotlight} spotlightRadius={spotlightRadius} />}

			{/* Additional GlobalSpotlight specifically for the ComponentSvg card */}
			{enableSpotlight && <GlobalSpotlight gridRef={componentCardRef} disableAnimations={shouldDisableAnimations} enabled={enableSpotlight} spotlightRadius={spotlightRadius} />}

			<BentoCardGrid gridRef={gridRef} className="flex flex-col items-center gap-20 pb-40 pt-40">
				<div className="flex flex-col items-center gap-8 px-5">
					<div className="relative">
						<Badge className="z-1 relative" variant="soft" size="28">
							<Component className="text-primary" /> Rapid Development
						</Badge>

						<svg
							className="not-md:hidden absolute bottom-1/2 left-1/2 -translate-x-1/2"
							width="1095"
							height="350"
							viewBox="0 0 1095 350"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M0.433594 1.2504L70.1484 122C73.1494 127.198 78.6956 130.4 84.6976 130.4L177.71 130.4C184.379 130.4 190.417 134.346 193.095 140.454L280.203 339.097C282.882 345.205 288.886 349.15 295.555 349.15C444.741 349.15 649.277 349.15 798.467 349.15C805.147 349.15 811.159 345.193 813.831 339.071L900.956 139.479C903.629 133.358 909.674 129.4 916.353 129.4L1009.35 129.4C1015.35 129.4 1020.89 126.198 1023.89 121L1093.61 0.250397"
								strokeWidth="1"
								stroke="var(--color-soft)"
							/>
							<path
								id="beamPath"
								d="M0.433594 1.2504L70.1484 122C73.1494 127.198 78.6956 130.4 84.6976 130.4L177.71 130.4C184.379 130.4 190.417 134.346 193.095 140.454L280.203 339.097C282.882 345.205 288.886 349.15 295.555 349.15C444.741 349.15 649.277 349.15 798.467 349.15C805.147 349.15 811.159 345.193 813.831 339.071L900.956 139.479C903.629 133.358 909.674 129.4 916.353 129.4L1009.35 129.4C1015.35 129.4 1020.89 126.198 1023.89 121L1093.61 0.250397"
								fill="none"
								stroke="var(--color-primary)"
								strokeWidth="1"
								strokeLinecap="round"
								className="animate-[var(--animate-beam-flow2)] opacity-0 [stroke-dasharray:50_1000] [stroke-dashoffset:0]"
								vectorEffect="non-scaling-stroke"
								pathLength="1000"
							/>
						</svg>

						{/* Left side line */}
						<svg className="-left-180 -top-122 absolute" width="698" height="798" viewBox="0 0 698 798" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M245 609.5H205C191.745 609.5 181 598.755 181 585.5V475.441C181 469.076 178.471 462.971 173.971 458.471L8.52944 293.029C4.02856 288.529 1.5 282.424 1.5 276.059V0"
								stroke="url(#paint0_linear_1_26452)"
							/>
							<rect x="125.5" y="410" width="5" height="5" rx="2.5" fill="var(--color-soft)" />
							<rect x="127" y="411.5" width="2" height="2" rx="1" fill="var(--color-soft)" />
							<path d="M495 463L464.065 494.749C459.548 499.385 453.349 502 446.876 502H285C271.745 502 261 512.745 261 526V798" stroke="url(#paint1_linear_1_26452)" />
							<path d="M261 606V526C261 512.745 271.745 502 285 502H417" stroke="url(#paint2_linear_1_26452)" />
							<defs>
								<linearGradient id="paint0_linear_1_26452" x1="197" y1="-158" x2="196.66" y2="689.5" gradientUnits="userSpaceOnUse">
									<stop stopColor="var(--color-soft)" stopOpacity="0" />
									<stop offset="0.9" stopColor="var(--color-soft)" />
								</linearGradient>
								<linearGradient id="paint1_linear_1_26452" x1="277.326" y1="798" x2="474.726" y2="432.852" gradientUnits="userSpaceOnUse">
									<stop stopColor="var(--color-soft)" stopOpacity="0" />
									<stop offset="0.15" stopColor="var(--color-soft)" />
									<stop offset="0.85" stopColor="var(--color-soft)" />
									<stop offset="1" stopColor="var(--color-soft)" stopOpacity="0" />
								</linearGradient>
								<linearGradient id="paint2_linear_1_26452" x1="243.437" y1="627.677" x2="431.51" y2="475.893" gradientUnits="userSpaceOnUse">
									<stop offset="1" stopColor="var(--color-soft)" stopOpacity="0" />
								</linearGradient>
							</defs>
						</svg>

						{/* Right side line */}
						<svg className="-right-180 -top-122 absolute z-10 scale-x-[-1]" width="698" height="798" viewBox="0 0 698 798" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M245 609.5H205C191.745 609.5 181 598.755 181 585.5V475.441C181 469.076 178.471 462.971 173.971 458.471L8.52944 293.029C4.02856 288.529 1.5 282.424 1.5 276.059V0"
								stroke="url(#paint0_linear_1_26452)"
							/>
							<rect x="125.5" y="410" width="5" height="5" rx="2.5" fill="var(--color-soft)" />
							<rect x="127" y="411.5" width="2" height="2" rx="1" fill="var(--color-soft)" />
							<path d="M495 463L464.065 494.749C459.548 499.385 453.349 502 446.876 502H285C271.745 502 261 512.745 261 526V798" stroke="url(#paint1_linear_1_26452)" />
							<path d="M261 606V526C261 512.745 271.745 502 285 502H417" stroke="url(#paint2_linear_1_26452)" />
						</svg>
					</div>
					<div className="z-20 flex w-full max-w-[730px] flex-col gap-6 text-center">
						<span className="heading-2 max-w-[730px] text-center">
							<span className="from-fg to-fg-secondary bg-gradient-to-b bg-clip-text text-transparent">A design system built for speed, </span>
							<span className="bg-gradient-to-r from-[#7655F6] to-[#492EB8] bg-clip-text text-transparent">scale and simplicity.</span>
						</span>
						<p className="text-fg-secondary text-base font-normal">
							Get access to high quality components, animations and blocks. The default settings for Radian can be used for production ready applications
						</p>
					</div>
				</div>
				<div className="flex w-full max-w-[1400px] flex-col gap-6 px-5">
					<div className="flex w-full flex-col gap-6 rounded-[20px] lg:h-[600px] lg:flex-row">
						<ParticleCard
							disableAnimations={shouldDisableAnimations}
							style={cardStyle}
							enableTilt={enableTilt}
							clickEffect={clickEffect}
							enableMagnetism={enableMagnetism}
							isDarkMode={isDarkMode}
							className={`lg:flex-5 border-soft card card--border-glow flex h-[600px] flex-col gap-12 overflow-hidden rounded-[20px] border`}>
							{/* Add scoped style inside this card */}
							<style jsx>{`
								@keyframes component-beam-flow-reverse {
									0% {
										stroke-dashoffset: -1000;
										opacity: 0;
									}
									5% {
										opacity: 1;
									}
									95% {
										opacity: 1;
									}
									100% {
										stroke-dashoffset: 0;
										opacity: 0;
									}
								}
							`}</style>
							<div className="pt-15 flex flex-col gap-4 px-7 sm:px-12">
								<ScanEye size={28} className="stroke-primary-hover" />
								<span className="heading-6 font-medium">High Quality Base Components</span>
								<p className="text-fg-secondary w-full max-w-[380px] text-sm">
									From keyboard navigation to structural semantics, everything follows modern accessibility standards.
								</p>
							</div>
							<div className="h-full pl-0 pr-0">
								<ComponentFlowCard gridRef={gridRef} />
							</div>
						</ParticleCard>
						<ParticleCard
							alwaysShowParticles={alwaysShowParticles}
							disableAnimations={shouldDisableAnimations}
							particleCount={12}
							style={cardStyle}
							enableTilt={enableTilt}
							clickEffect={clickEffect}
							enableMagnetism={enableMagnetism}
							isDarkMode={isDarkMode}
							className="lg:flex-3 border-soft card card--border-glow relative flex h-[600px] flex-col gap-12 overflow-hidden rounded-[20px] border">
							<div className="pt-15 flex flex-col gap-4 px-7 sm:px-12">
								<SquareTerminal size={28} className="stroke-primary-hover" />
								<span className="heading-6 font-medium">Copy-paste or Install via CLI</span>
								<p className="text-fg-secondary w-full max-w-[420px] text-sm">Install with one command or copy the snippet. No configuration. No waiting. Just build.</p>
							</div>
							<div className="gap-12.25 bg-fill1 flex h-full flex-col"></div>
						</ParticleCard>
					</div>
					<div className="flex w-full flex-col gap-6 rounded-[20px] lg:h-[600px] lg:flex-row">
						<ParticleCard
							alwaysShowParticles={alwaysShowParticles}
							disableAnimations={shouldDisableAnimations}
							particleCount={12}
							style={cardStyle}
							enableTilt={enableTilt}
							clickEffect={clickEffect}
							enableMagnetism={enableMagnetism}
							isDarkMode={isDarkMode}
							className="border-soft card card--border-glow flex h-[600px] w-full flex-col gap-12 overflow-hidden rounded-[20px] border lg:flex-1">
							<div className="pt-15 flex flex-col gap-4 px-7 sm:px-12">
								<FolderGit size={28} className="stroke-primary-hover" />
								<span className="heading-6 font-medium">Seamless Design to Code Sync</span>
								<p className="text-fg-secondary max-w-[380px] text-sm">Changes made in Figma are easily replicable in the code, guaranteeing pixel-perfect consistency.</p>
							</div>
							<CodeSync />
							<div className="from-bg/0 to-bg h-100 absolute inset-x-0 bottom-0 flex rounded-b-lg bg-gradient-to-b"></div>
						</ParticleCard>

						<ParticleCard
							alwaysShowParticles={alwaysShowParticles}
							disableAnimations={shouldDisableAnimations}
							particleCount={12}
							style={cardStyle}
							enableTilt={enableTilt}
							clickEffect={clickEffect}
							enableMagnetism={enableMagnetism}
							isDarkMode={isDarkMode}
							className="border-soft card card--border-glow relative flex h-[600px] w-full flex-col gap-12 overflow-hidden rounded-[20px] border lg:flex-1">
							<div className="h-25 from-bg/5 to-bg z-1 absolute bottom-0 w-full bg-gradient-to-b" />
							<div className="pt-15 flex flex-col gap-4 px-7 sm:pl-12">
								<SwatchBook size={28} className="stroke-primary-hover" />
								<span className="heading-6 font-medium">Themeable System</span>
								<p className="text-fg-secondary lg:max-w-105 w-fit max-w-[380px] text-sm">Edit one token to restyle your entire design system light, dark, or custom themes.</p>
							</div>
							<div className="bg-fill1 flex h-full items-center justify-center gap-14 pl-10"></div>
						</ParticleCard>
					</div>
					<div className="relative flex w-full flex-col gap-6 rounded-[20px] lg:h-[600px] lg:flex-row">
						<ParticleCard
							alwaysShowParticles={alwaysShowParticles}
							disableAnimations={shouldDisableAnimations}
							particleCount={12}
							style={cardStyle}
							enableTilt={enableTilt}
							clickEffect={clickEffect}
							enableMagnetism={enableMagnetism}
							isDarkMode={isDarkMode}
							className="border-soft card card--border-glow lg:flex-3 relative flex h-[600px] w-full flex-col gap-12 overflow-hidden rounded-[20px] border">
							<div className="pt-15 flex flex-col gap-4 px-7 sm:px-12">
								<CircleGauge size={28} className="stroke-primary-hover" />
								<span className="heading-6 font-medium">Tree-Shakable Architecture</span>
								<p className="text-fg-secondary text-sm lg:max-w-[380px]">Only imports what you use ultra-light bundles for fast and improved performance.</p>
							</div>
							<div className="bg-fill1 flex h-full gap-[23px] pl-12"></div>
							<div className="h-30 from-bg/5 to-bg z-1 absolute bottom-0 w-full bg-gradient-to-b" />
						</ParticleCard>

						<div className="border-soft lg:flex-5 card card--border-glow relative flex h-[600px] w-full flex-col gap-12 overflow-hidden rounded-[20px] border">
							<div className="pt-15 flex flex-col gap-4 px-7 sm:px-12">
								<LayoutDashboard size={28} className="stroke-primary-hover" />
								<span className="heading-6 font-medium">Reusable UI Blocks</span>
								<p className="text-fg-secondary max-w-[380px] text-sm">
									Get access to high quality pre-built UI blocks, designed and developed to plug into any layout and ready for use
								</p>
							</div>

							<div className="bg-fill1 h-full w-full"></div>
						</div>
					</div>
				</div>
			</BentoCardGrid>
		</>
	)
}

export default FeaturesSection
