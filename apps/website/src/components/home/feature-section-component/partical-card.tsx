import React, { useCallback, useEffect, useRef } from "react"
import { gsap } from "gsap"

export const ParticleCard = React.forwardRef<
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
