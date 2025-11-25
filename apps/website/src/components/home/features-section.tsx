"use client"

import React, { SVGProps, useCallback, useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ArrowDownRight, ArrowUpRight, ChevronRight, CircleGauge, Component, FolderGit, Grid, LayoutDashboard, ScanEye, SquareTerminal, SwatchBook } from "lucide-react"
import DecryptedText from "@/components/effects/decrypted-text"
import { cn } from "@/lib/utils"
import { InfiniteScroll } from "@/registry/animated/infinite-scroll"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { Skeleton } from "@/registry/ui/skeleton"
import { Spinner } from "@/registry/ui/spinner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/ui/table"

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
	enableStars?: boolean
	enableSpotlight?: boolean
	enableBorderGlow?: boolean
	disableAnimations?: boolean
	spotlightRadius?: number
	particleCount?: number
	enableTilt?: boolean
	clickEffect?: boolean
	enableMagnetism?: boolean
}

const DEFAULT_PARTICLE_COUNT = 12
const DEFAULT_SPOTLIGHT_RADIUS = 300
// Remove DEFAULT_GLOW_COLOR constant
const MOBILE_BREAKPOINT = 768

const profile = {
	name: "Zoya Petrova",
	description: "Engineering partner for @Radianos",
	address: "Berlin, Germany",
	followingInThousands: 1.4,
	followersInThousands: 412.4,
}

const datas = [
	{
		company: "PLTR",
		currency: "USD",
		FY1_growth: 7.54,
		daily_earning: 250.5,
		EBITDA: "1.5B",
		performance: "+35.14%",
	},
	{
		company: "AMZN",
		currency: "YEN",
		FY1_growth: -4.11,
		daily_earning: 95.0,
		EBITDA: "-285.45M",
		performance: "-14.14%",
	},
	{
		company: "UBER",
		currency: "JR",
		FY1_growth: -14.41,
		daily_earning: 275.25,
		EBITDA: "-120M",
		performance: "-2.14%",
	},
	{
		company: "NFLX",
		currency: "GE",
		FY1_growth: 0.73,
		daily_earning: 120.0,
		EBITDA: "215M",
		performance: "+9.8%",
	},
	{
		company: "GOOGL",
		currency: "CHF",
		FY1_growth: 28.6,
		daily_earning: 400.0,
		EBITDA: "-120M",
		performance: "+75.4%",
	},
]

const cardStyle = {
	backgroundColor: "var(--color-bg)",
	borderColor: "var(--color-soft)",
	color: "var(--color-fg)",
	"--glow-x": "50%",
	"--glow-y": "50%",
	"--glow-intensity": "0",
	"--glow-radius": "200px",
} as React.CSSProperties

const createParticleElement = (x: number, y: number): HTMLDivElement => {
	const el = document.createElement("div")
	el.className = "particle"
	el.style.cssText = `
    position: absolute;
    width: 2px;
    height: 2px;
    border-radius: 100%;
    background: var(--color-black-inverse);
    box-shadow: 0 0 6px color-mix(in oklch, var(--color-black-inverse), transparent 40%);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `
	return el
}

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

const ParticleCard: React.FC<{
	children: React.ReactNode
	className?: string
	disableAnimations?: boolean
	style?: React.CSSProperties
	particleCount?: number
	enableTilt?: boolean
	clickEffect?: boolean
	enableMagnetism?: boolean
}> = ({ children, className = "", disableAnimations = false, style, particleCount = DEFAULT_PARTICLE_COUNT, enableTilt = true, clickEffect = false, enableMagnetism = false }) => {
	const cardRef = useRef<HTMLDivElement>(null)
	const particlesRef = useRef<HTMLDivElement[]>([])
	const timeoutsRef = useRef<NodeJS.Timeout[]>([])
	const isHoveredRef = useRef(false)
	const memoizedParticles = useRef<HTMLDivElement[]>([])
	const particlesInitialized = useRef(false)
	const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null)

	const initializeParticles = useCallback(() => {
		if (particlesInitialized.current || !cardRef.current) return

		const { width, height } = cardRef.current.getBoundingClientRect()
		memoizedParticles.current = Array.from({ length: particleCount }, () => createParticleElement(Math.random() * width, Math.random() * height))
		particlesInitialized.current = true
	}, [particleCount])

	const clearAllParticles = useCallback(() => {
		timeoutsRef.current.forEach(clearTimeout)
		timeoutsRef.current = []
		magnetismAnimationRef.current?.kill()

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

	const animateParticles = useCallback(() => {
		if (!cardRef.current || !isHoveredRef.current) return

		if (!particlesInitialized.current) {
			initializeParticles()
		}

		memoizedParticles.current.forEach((particle, index) => {
			const timeoutId = setTimeout(() => {
				if (!isHoveredRef.current || !cardRef.current) return

				const clone = particle.cloneNode(true) as HTMLDivElement
				cardRef.current.appendChild(clone)
				particlesRef.current.push(clone)

				gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" })

				gsap.to(clone, {
					x: (Math.random() - 0.5) * 10,
					y: (Math.random() - 0.5) * 10,
					rotation: Math.random() * 360,
					duration: 2 + Math.random() * 2,
					ease: "none",
					repeat: -1,
					yoyo: true,
				})

				gsap.to(clone, {
					opacity: 0.3,
					duration: 1.5,
					ease: "power2.inOut",
					repeat: -1,
					yoyo: true,
				})
			}, index * 100)

			timeoutsRef.current.push(timeoutId)
		})
	}, [initializeParticles])

	useEffect(() => {
		if (disableAnimations || !cardRef.current) return

		const element = cardRef.current

		const handleMouseEnter = () => {
			isHoveredRef.current = true
			animateParticles()

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
			clearAllParticles()

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
	}, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect])

	return (
		<div ref={cardRef} className={`${className} relative overflow-hidden`} style={{ ...style, position: "relative", overflow: "hidden" }}>
			{children}
		</div>
	)
}

const GlobalSpotlight: React.FC<{
	gridRef: React.RefObject<HTMLDivElement | null>
	disableAnimations?: boolean
	enabled?: boolean
	spotlightRadius?: number
}> = ({ gridRef, disableAnimations = false, enabled = true, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS }) => {
	const spotlightRef = useRef<HTMLDivElement | null>(null)
	const isInsideSection = useRef(false)

	useEffect(() => {
		if (disableAnimations || !gridRef?.current || !enabled) return

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

const BentoCardGrid: React.FC<{
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
	particleCount = DEFAULT_PARTICLE_COUNT,
	enableTilt = false,
	clickEffect = true,
	enableMagnetism = true,
}) => {
	const gridRef = useRef<HTMLDivElement>(null)
	const isMobile = useMobileDetection()
	const shouldDisableAnimations = disableAnimations || isMobile
	const containerRef = useRef<HTMLDivElement>(null)
	const [pos, setPos] = useState({ x: 0, y: 150 })

	const [animated, setAnimated] = useState(false)

	function VerifiedSVGIcon(props: SVGProps<SVGSVGElement>) {
		return (
			<svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
				<mask id="a" maskUnits="userSpaceOnUse" x={-0.5} y={-0.5} width={21} height={21} fill="#000">
					<path className="fill-white" d="M-.5-.5h21v21h-21z" />
					<path d="M18.392 9.348a1.5 1.5 0 0 0-.476-.558l-1.108-.833a.3.3 0 0 1-.117-.167.3.3 0 0 1 0-.208l.459-1.359c.073-.243.09-.5.05-.75a1.5 1.5 0 0 0-.3-.7 1.55 1.55 0 0 0-.583-.475 1.46 1.46 0 0 0-.709-.141h-1.25a.34.34 0 0 1-.325-.25l-.358-1.25a1.6 1.6 0 0 0-.384-.675 1.7 1.7 0 0 0-.65-.409 1.7 1.7 0 0 0-.766-.05 1.6 1.6 0 0 0-.692.325l-.95.75a.3.3 0 0 1-.192.075.3.3 0 0 1-.183-.041l-.942-.75a1.54 1.54 0 0 0-.666-.317 1.56 1.56 0 0 0-.734 0c-.241.067-.464.19-.65.358-.19.184-.335.41-.424.659L6.083 3.84a.32.32 0 0 1-.125.183.34.34 0 0 1-.225.059H4.55a1.6 1.6 0 0 0-.742.15 1.5 1.5 0 0 0-.591.475c-.154.203-.257.44-.3.691a1.55 1.55 0 0 0 .05.734l.408 1.408q.03.104 0 .208a.34.34 0 0 1-.117.167l-1.108.833a1.66 1.66 0 0 0-.483.567 1.6 1.6 0 0 0 0 1.425c.116.223.281.417.483.567l1.108.833a.34.34 0 0 1 .117.375l-.458 1.358a1.7 1.7 0 0 0-.059.759c.042.249.145.483.3.683.153.209.357.375.592.483.22.105.464.154.708.142H5.7a.32.32 0 0 1 .208.067c.06.04.102.103.117.175l.358 1.258c.074.249.206.477.384.667a1.575 1.575 0 0 0 2.116.141l.958-.758a.325.325 0 0 1 .409 0l.941.75c.2.169.442.281.7.325q.143.012.284 0 .247 0 .483-.075a1.56 1.56 0 0 0 1.034-1.067l.366-1.266a.28.28 0 0 1 .117-.175.33.33 0 0 1 .225-.067h1.191c.255.01.51-.038.742-.142a1.59 1.59 0 0 0 .825-1.933l-.45-1.35a.3.3 0 0 1 0-.208.3.3 0 0 1 .117-.167l1.108-.833a1.56 1.56 0 0 0 .475-.567c.117-.22.177-.467.175-.717a1.6 1.6 0 0 0-.191-.65m-4.534-.633-3.683 3.683a1.7 1.7 0 0 1-.492.334 1.6 1.6 0 0 1-.583.116 1.4 1.4 0 0 1-.592-.125 1.6 1.6 0 0 1-.5-.333l-1.817-1.825A.834.834 0 0 1 7.366 9.39L9.1 11.123l3.583-3.591a.833.833 0 0 1 1.175 0 .833.833 0 0 1 0 1.216z" />
				</mask>
				<path
					d="M18.392 9.348a1.5 1.5 0 0 0-.476-.558l-1.108-.833a.3.3 0 0 1-.117-.167.3.3 0 0 1 0-.208l.459-1.359c.073-.243.09-.5.05-.75a1.5 1.5 0 0 0-.3-.7 1.55 1.55 0 0 0-.583-.475 1.46 1.46 0 0 0-.709-.141h-1.25a.34.34 0 0 1-.325-.25l-.358-1.25a1.6 1.6 0 0 0-.384-.675 1.7 1.7 0 0 0-.65-.409 1.7 1.7 0 0 0-.766-.05 1.6 1.6 0 0 0-.692.325l-.95.75a.3.3 0 0 1-.192.075.3.3 0 0 1-.183-.041l-.942-.75a1.54 1.54 0 0 0-.666-.317 1.56 1.56 0 0 0-.734 0c-.241.067-.464.19-.65.358-.19.184-.335.41-.424.659L6.083 3.84a.32.32 0 0 1-.125.183.34.34 0 0 1-.225.059H4.55a1.6 1.6 0 0 0-.742.15 1.5 1.5 0 0 0-.591.475c-.154.203-.257.44-.3.691a1.55 1.55 0 0 0 .05.734l.408 1.408q.03.104 0 .208a.34.34 0 0 1-.117.167l-1.108.833a1.66 1.66 0 0 0-.483.567 1.6 1.6 0 0 0 0 1.425c.116.223.281.417.483.567l1.108.833a.34.34 0 0 1 .117.375l-.458 1.358a1.7 1.7 0 0 0-.059.759c.042.249.145.483.3.683.153.209.357.375.592.483.22.105.464.154.708.142H5.7a.32.32 0 0 1 .208.067c.06.04.102.103.117.175l.358 1.258c.074.249.206.477.384.667a1.575 1.575 0 0 0 2.116.141l.958-.758a.325.325 0 0 1 .409 0l.941.75c.2.169.442.281.7.325q.143.012.284 0 .247 0 .483-.075a1.56 1.56 0 0 0 1.034-1.067l.366-1.266a.28.28 0 0 1 .117-.175.33.33 0 0 1 .225-.067h1.191c.255.01.51-.038.742-.142a1.59 1.59 0 0 0 .825-1.933l-.45-1.35a.3.3 0 0 1 0-.208.3.3 0 0 1 .117-.167l1.108-.833a1.56 1.56 0 0 0 .475-.567c.117-.22.177-.467.175-.717a1.6 1.6 0 0 0-.191-.65Zm-4.534-.633-3.683 3.683a1.7 1.7 0 0 1-.492.334 1.6 1.6 0 0 1-.583.116 1.4 1.4 0 0 1-.592-.125 1.6 1.6 0 0 1-.5-.333l-1.817-1.825A.834.834 0 0 1 7.366 9.39L9.1 11.123l3.583-3.591a.833.833 0 0 1 1.175 0 .833.833 0 0 1 0 1.216z"
					className="fill-info opacity-100"
				/>
				<path
					d="M18.392 9.348a1.5 1.5 0 0 0-.476-.558l-1.108-.833a.3.3 0 0 1-.117-.167.3.3 0 0 1 0-.208l.459-1.359c.073-.243.09-.5.05-.75a1.5 1.5 0 0 0-.3-.7 1.55 1.55 0 0 0-.583-.475 1.46 1.46 0 0 0-.709-.141h-1.25a.34.34 0 0 1-.325-.25l-.358-1.25a1.6 1.6 0 0 0-.384-.675 1.7 1.7 0 0 0-.65-.409 1.7 1.7 0 0 0-.766-.05 1.6 1.6 0 0 0-.692.325l-.95.75a.3.3 0 0 1-.192.075.3.3 0 0 1-.183-.041l-.942-.75a1.54 1.54 0 0 0-.666-.317 1.56 1.56 0 0 0-.734 0c-.241.067-.464.19-.65.358-.19.184-.335.41-.424.659L6.083 3.84a.32.32 0 0 1-.125.183.34.34 0 0 1-.225.059H4.55a1.6 1.6 0 0 0-.742.15 1.5 1.5 0 0 0-.591.475c-.154.203-.257.44-.3.691a1.55 1.55 0 0 0 .05.734l.408 1.408q.03.104 0 .208a.34.34 0 0 1-.117.167l-1.108.833a1.66 1.66 0 0 0-.483.567 1.6 1.6 0 0 0 0 1.425c.116.223.281.417.483.567l1.108.833a.34.34 0 0 1 .117.375l-.458 1.358a1.7 1.7 0 0 0-.059.759c.042.249.145.483.3.683.153.209.357.375.592.483.22.105.464.154.708.142H5.7a.32.32 0 0 1 .208.067c.06.04.102.103.117.175l.358 1.258c.074.249.206.477.384.667a1.575 1.575 0 0 0 2.116.141l.958-.758a.325.325 0 0 1 .409 0l.941.75c.2.169.442.281.7.325q.143.012.284 0 .247 0 .483-.075a1.56 1.56 0 0 0 1.034-1.067l.366-1.266a.28.28 0 0 1 .117-.175.33.33 0 0 1 .225-.067h1.191c.255.01.51-.038.742-.142a1.59 1.59 0 0 0 .825-1.933l-.45-1.35a.3.3 0 0 1 0-.208.3.3 0 0 1 .117-.167l1.108-.833a1.56 1.56 0 0 0 .475-.567c.117-.22.177-.467.175-.717a1.6 1.6 0 0 0-.191-.65Zm-4.534-.633-3.683 3.683a1.7 1.7 0 0 1-.492.334 1.6 1.6 0 0 1-.583.116 1.4 1.4 0 0 1-.592-.125 1.6 1.6 0 0 1-.5-.333l-1.817-1.825A.834.834 0 0 1 7.366 9.39L9.1 11.123l3.583-3.591a.833.833 0 0 1 1.175 0 .833.833 0 0 1 0 1.216z"
					className="stroke-bg stroke-3"
					mask="url(#a)"
				/>
			</svg>
		)
	}

	useEffect(() => {
		if (!containerRef.current) return
		const containerWidth = containerRef.current.offsetWidth
		let direction = 1
		let x = lensSize / 2

		const speed = 2 // pixels per frame
		const interval = setInterval(() => {
			x += direction * speed
			if (x + lensSize / 2 >= containerWidth || x - lensSize / 2 <= 0) {
				direction *= -1 // reverse when hitting edges
			}
			setPos((prev) => ({ ...prev, x }))
		}, 16) // ~60fps

		setAnimated(true)
		return () => clearInterval(interval)
	}, [])

	const lensSize = 144
	const zoom = 2

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
  
  .text-clamp-1 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .text-clamp-2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  @media (max-width: 599px) {
    .card-responsive {
      grid-template-columns: 1fr;
      width: 90%;
      margin: 0 auto;
      padding: 0.5rem;
    }
    
    .card-responsive .card {
      width: 100%;
      min-height: 180px;
    }
  }
`}
			</style>

			{enableSpotlight && <GlobalSpotlight gridRef={gridRef} disableAnimations={shouldDisableAnimations} enabled={enableSpotlight} spotlightRadius={spotlightRadius} />}

			<BentoCardGrid gridRef={gridRef} className="flex flex-col items-center gap-20 pb-40 pt-40">
				<div className="flex flex-col items-center gap-8 px-5">
					<div className="relative">
						<Badge className="z-1 relative" variant="soft" color="neutral" size="28">
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
					<div className="flex h-full w-full flex-col gap-6 rounded-xl lg:flex-row">
						<ParticleCard
							disableAnimations={shouldDisableAnimations}
							particleCount={particleCount}
							style={cardStyle}
							enableTilt={enableTilt}
							clickEffect={clickEffect}
							enableMagnetism={enableMagnetism}
							className={`lg:flex-2/3 pt-15 border-soft card card--border-glow relative flex flex-col gap-12 overflow-hidden rounded-xl border transition-all duration-300 ease-in-out`}>
							<div className="h-30 from-bg/5 to-bg z-1 absolute bottom-0 w-full bg-gradient-to-b" />
							<div className="flex items-center justify-between px-7 sm:pl-12">
								<div className="flex flex-col gap-4">
									<span className="pb-2">
										<ScanEye size={28} className="stroke-primary-hover" />
									</span>
									<span className="heading-6 font-medium">High Quality Base Components</span>
									<p className="text-fg-secondary w-full max-w-[420px] text-sm">
										From keyboard navigation to structural semantics, everything follows modern accessibility standards.
									</p>
								</div>
							</div>
							<div className="pl-0 pr-0 md:pl-12 lg:px-12">
								<div className="bg-fill1 rounded-b-none! w-full pt-5 md:rounded-l-2xl md:pl-5 lg:rounded-t-2xl lg:px-5">
									<div className="lg:border-r-1 md:border-l-1 rounded-b-none! overflow-hidden border border-b-0 border-l-0 border-r-0 md:rounded-l-2xl lg:rounded-t-2xl">
										<div ref={containerRef} className="relative overflow-hidden">
											{/* Base table */}
											<Table className="relative w-full select-none">
												<TableHeader>
													<TableRow>
														<TableHead>Company</TableHead>
														<TableHead>CCY</TableHead>
														<TableHead>FY1 growth</TableHead>
														<TableHead>Daily Earning</TableHead>
														<TableHead>EBITDA</TableHead>
														<TableHead>Performance</TableHead>
													</TableRow>
												</TableHeader>
												<TableBody>
													{datas.map((data) => (
														<TableRow key={data.company}>
															<TableCell className="flex items-center">{data.company}</TableCell>
															<TableCell>
																<Badge size="20" variant="soft" className="bg-primary-accent">
																	{data.currency}
																</Badge>
															</TableCell>
															<TableCell className={cn("flex items-center", data.FY1_growth > 0 ? "text-success-text" : "text-error-text")}>
																{data.FY1_growth > 0 ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
																{data.FY1_growth}%
															</TableCell>
															<TableCell className="text-fg-secondary">${data.daily_earning}</TableCell>
															<TableCell className="text-fg-secondary">{data.EBITDA}</TableCell>
															<TableCell>
																<Badge color="success" variant="outline">
																	{data.performance}
																</Badge>
															</TableCell>
														</TableRow>
													))}
												</TableBody>
											</Table>

											{/* Magnifier overlay */}
											{animated && (
												<div
													className="bg-fill2 pointer-events-none absolute rounded-full border"
													style={{
														width: lensSize,
														height: lensSize,
														top: pos.y - lensSize / 2,
														left: pos.x - lensSize / 2,
														overflow: "hidden",
														boxShadow: "0 4px 8px hsla(260, 6%, 10%, 0.08)",
													}}>
													{/* instead of just lens-size, make inner zoomed area cover full table */}
													<div
														className="absolute h-full w-full"
														style={{
															transform: `scale(${zoom})`,
															transformOrigin: `${pos.x}px ${pos.y}px`,
															top: -pos.y * (zoom - 1),
															left: -pos.x * (zoom - 1),
															width: containerRef.current?.offsetWidth ?? "100%",
															height: containerRef.current?.offsetHeight ?? "100%",
														}}>
														<div className="absolute left-0 top-0 w-full">
															{/* full cloned table */}
															<Table className="w-full select-none">
																<TableHeader>
																	<TableRow>
																		<TableHead>Company</TableHead>
																		<TableHead>CCY</TableHead>
																		<TableHead>FY1 growth</TableHead>
																		<TableHead>Daily Earning</TableHead>
																		<TableHead>EBITDA</TableHead>
																		<TableHead>Performance</TableHead>
																	</TableRow>
																</TableHeader>
																<TableBody>
																	{datas.map((data) => (
																		<TableRow key={data.company}>
																			<TableCell className="flex items-center">{data.company}</TableCell>
																			<TableCell>
																				<Badge size="20" variant="soft" className="bg-primary-accent">
																					{data.currency}
																				</Badge>
																			</TableCell>
																			<TableCell className={cn("flex items-center", data.FY1_growth > 0 ? "text-success-text" : "text-error-text")}>
																				{data.FY1_growth > 0 ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
																				{data.FY1_growth}%
																			</TableCell>
																			<TableCell className="text-fg-secondary">${data.daily_earning}</TableCell>
																			<TableCell className="text-fg-secondary">{data.EBITDA}</TableCell>
																			<TableCell>
																				<Badge color="success" variant="outline">
																					{data.performance}
																				</Badge>
																			</TableCell>
																		</TableRow>
																	))}
																</TableBody>
															</Table>
														</div>
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</ParticleCard>
						<ParticleCard
							disableAnimations={shouldDisableAnimations}
							particleCount={particleCount}
							style={cardStyle}
							enableTilt={enableTilt}
							clickEffect={clickEffect}
							enableMagnetism={enableMagnetism}
							className="lg:flex-1/3 border-soft card card--border-glow relative flex flex-col gap-12 overflow-hidden rounded-xl border">
							<div className="h-30 from-bg/5 to-bg z-1 absolute bottom-0 w-full bg-gradient-to-b" />
							<div className="pt-15 flex flex-col gap-4 px-7 sm:px-12">
								<span className="pb-2">
									<SquareTerminal size={28} className="stroke-primary-hover" />
								</span>
								<span className="heading-6 font-medium">Copy-paste or Install via CLI</span>
								<p className="text-fg-secondary w-full max-w-[420px] text-sm">Install with one command or copy the snippet. No configuration. No waiting. Just build.</p>
							</div>
							<div className="gap-12.25 flex flex-col">
								<div className="pr-11.5 pl-12">
									<div className="border-soft min-w-107.5 bg-fill1 flex flex-col items-start justify-center gap-3 rounded-xl border px-1.5 pb-1.5 pt-3 sm:min-w-fit">
										<div className="flex gap-1.5 pl-2">
											<Skeleton className="bg-fill4 size-1.5 rounded-full" />
											<Skeleton className="bg-fill4 size-1.5 rounded-full" />
											<Skeleton className="bg-fill4 size-1.5 rounded-full" />
										</div>
										<div className="bg-bg border-soft relative flex w-full items-center rounded-xl border px-3 py-4 text-sm">
											<div className="flex grow gap-2">
												<ChevronRight width={12} height={20} className="text-black-inverse" />
												<DecryptedText
													characters="npx radianui add [component]"
													text="npx radianui add"
													speed={150}
													maxIterations={500}
													className="text-fg truncate"
													parentClassName="inline-block truncate max-w-[200px] text-fg"
												/>
												<span className="w-2.25 bg-primary animate-caret-blink absolute left-[155px] h-5" />
											</div>
											<Spinner variant="activity" className="text-fg-secondary" size={20} />
										</div>
									</div>
								</div>

								<div className="pl-13.5 pr-11.5">
									<div className="border-soft bg-fill1 rounded-r-0 min-w-107.5 rounded-t-xl border border-b-0">
										<div className="flex rounded-t-xl px-4 py-3">
											<div className="gap-1.25 flex items-center">
												<Skeleton className="bg-fg-disabled size-2 rounded-full" />
												<Skeleton className="bg-fg-disabled size-2 rounded-full" />
												<Skeleton className="bg-fg-disabled size-2 rounded-full" />
											</div>
											<div className="text-fg-tertiary flex grow items-center justify-center text-xs">radianos.js</div>
										</div>
										<div className="bg-fill1 px-1.5">
											<pre className="bg-bg border-soft overflow-x-auto whitespace-pre-wrap rounded-lg border">
												<code className="p-1.5">
													{`
 <div className="example">
    <h1>Hello World</h1>
    <p>This is a JSX snippet shown as</p>
  </div>
`}
												</code>
											</pre>
										</div>
									</div>
								</div>
							</div>
						</ParticleCard>
					</div>
					<div className="flex h-full w-full flex-col gap-6 rounded-xl lg:flex-row">
						<ParticleCard
							disableAnimations={shouldDisableAnimations}
							particleCount={particleCount}
							style={cardStyle}
							enableTilt={enableTilt}
							clickEffect={clickEffect}
							enableMagnetism={enableMagnetism}
							className="border-soft pt-15 max-h-150 card card--border-glow flex w-full flex-col gap-12 overflow-hidden rounded-xl border lg:w-1/2">
							<div className="flex flex-col gap-4 px-7 sm:pl-12">
								<span className="pb-2">
									<FolderGit size={28} className="stroke-primary-hover" />
								</span>
								<span className="heading-6 font-medium">Seamless Design to Code Sync</span>
								<p className="text-fg-secondary text-sm">Changes made in Figma are easily replicable in the code, guaranteeing pixel-perfect consistency.</p>
							</div>
							<div className="sm:pl-13.5 gap-5.25 flex flex-col px-7 sm:pr-0">
								<div className="gap-9.75 flex flex-col items-center sm:flex-row">
									<div className="w-75.5 h-56.75 border-soft overflow-hidden rounded-lg border">
										<div className="border-soft flex w-full items-center border border-l-0 border-r-0 border-t-0 px-4 py-3">
											<div className="gap-1.25 flex items-center">
												<Skeleton className="bg-fg-disabled size-2 rounded-full" />
												<Skeleton className="bg-fg-disabled size-2 rounded-full" />
												<Skeleton className="bg-fg-disabled size-2 rounded-full" />
											</div>
											<div className="text-fg-tertiary flex grow items-center justify-center text-xs">Figma</div>
										</div>
										<div className="px-9.75 size-full">
											<Skeleton className="bg-fill1 size-full" />
										</div>
									</div>
									<div className="w-75.5 h-56.75 border-soft sm:translate-x-2.25 overflow-hidden rounded-lg border">
										<div className="border-soft flex w-full items-center border border-l-0 border-r-0 border-t-0 px-4 py-3">
											<div className="gap-1.25 flex items-center">
												<Skeleton className="bg-fg-disabled size-2 rounded-full" />
												<Skeleton className="bg-fg-disabled size-2 rounded-full" />
												<Skeleton className="bg-fg-disabled size-2 rounded-full" />
											</div>
											<div className="text-fg-tertiary flex grow items-center justify-center text-xs">Prod</div>
										</div>
										<div className="px-9.75 size-full">
											<Skeleton className="bg-fill1 size-full" />
										</div>
									</div>
								</div>
								<div className="gap-9.75 flex items-center">
									<div className="w-75.5 h-56.75 border-soft translate-x-2.25 overflow-hidden rounded-lg border">
										<div className="border-soft flex w-full items-center border border-l-0 border-r-0 border-t-0 px-4 py-3">
											<div className="gap-1.25 flex items-center">
												<Skeleton className="bg-fg-disabled size-2 rounded-full" />
												<Skeleton className="bg-fg-disabled size-2 rounded-full" />
												<Skeleton className="bg-fg-disabled size-2 rounded-full" />
											</div>
											<div className="text-fg-tertiary flex grow items-center justify-center text-xs">Dev</div>
										</div>
										<div className="px-9.75 size-full">
											<Skeleton className="bg-fill1 size-full" />
										</div>
									</div>
									<div className="w-75.5 h-56.75 rounded-lg"></div>
								</div>
							</div>
						</ParticleCard>

						<ParticleCard
							disableAnimations={shouldDisableAnimations}
							particleCount={particleCount}
							style={cardStyle}
							enableTilt={enableTilt}
							clickEffect={clickEffect}
							enableMagnetism={enableMagnetism}
							className="border-soft card card--border-glow relative flex w-full flex-col gap-12 overflow-hidden rounded-xl border lg:w-1/2">
							<div className="h-30 from-bg/5 to-bg z-1 absolute bottom-0 w-full bg-gradient-to-b" />
							<div className="pt-15 flex flex-col gap-4 px-7 sm:pl-12">
								<span className="pb-2">
									<SwatchBook size={28} className="stroke-primary-hover" />
								</span>
								<span className="heading-6 font-medium">Themeable System</span>
								<p className="text-fg-secondary lg:max-w-105 w-fit text-sm">Edit one token to restyle your entire design system — light, dark, or custom themes.</p>
							</div>
							<div className="flex items-center justify-center gap-14 pl-10">
								<div className="w-78.5 border-soft -rotate-30 skew-x-15 flex translate-y-10 flex-col overflow-hidden rounded-xl border p-0">
									<div className="bg-primary-focus relative h-16">
										<Avatar size="80" className="border-bg border-6 absolute bottom-0 left-4 translate-y-1/2">
											<AvatarFallback className="text-base">ZP</AvatarFallback>
										</Avatar>
									</div>

									<div className="bg-bg flex flex-col gap-4 px-4 pb-4 pt-14">
										<div className="flex flex-col gap-1">
											<div className="flex items-center gap-1">
												<p>{profile.name}</p>
												<VerifiedSVGIcon />
											</div>
											<p className="text-sm">{profile.description}</p>
											<p className="text-fg-tertiary text-[13px]">{profile.address}</p>
										</div>

										<div className="flex h-5 gap-3 text-sm">
											<p className="flex items-center gap-1">
												<span className="font-medium">{profile.followingInThousands}k</span>
												<span className="text-fg-secondary">Following</span>
											</p>
											<Divider orientation="vertical" className="bg-soft-alpha" />
											<p className="flex items-center gap-1">
												<span className="font-medium">{profile.followersInThousands}k</span>
												<span className="text-fg-secondary">Followers</span>
											</p>
										</div>

										<div className="flex gap-3">
											<Button className="flex-1 rounded-full">Message</Button>
											<Button variant="outline" color="primary" className="flex-1 rounded-full">
												Follow
											</Button>
										</div>
									</div>
								</div>
							</div>
						</ParticleCard>
					</div>
					<div className="relative flex h-full w-full flex-col gap-6 rounded-xl lg:flex-row">
						<div className="border-soft pt-15 card card--border-glow relative flex flex-col gap-12 rounded-xl border lg:w-[510px]">
							<div className="flex flex-col gap-4 px-7 sm:px-8 lg:px-12">
								<span className="pb-2">
									<LayoutDashboard size={28} className="stroke-primary-hover" />
								</span>
								<span className="heading-6 font-medium">Reusable UI Blocks</span>
								<p className="text-fg-secondary text-sm">Get access to high quality pre-built UI blocks, designed and developed to plug into any layout and ready for use</p>
							</div>
							<div className="h-30 from-bg/5 to-bg w-15 z-1 absolute top-[220px] bg-gradient-to-l" />
							<div className="h-30 from-bg/5 to-bg w-15 z-1 absolute right-0 top-[220px] bg-gradient-to-r" />

							<InfiniteScroll>
								<div className="relative flex items-center justify-center gap-2">
									<div className="py-1.75 border-soft w-45 flex h-9 items-center rounded-lg border px-2.5">
										<div className="bg-primary-border border-soft-alpha flex size-[21.6px] items-center justify-center rounded-[7.2px] border">
											<Grid className="text-white" size={14.4} />
										</div>
										<p className="text-fg-secondary flex grow items-center justify-center text-xs">Blogs Section / 01</p>
									</div>
									<div className="py-1.75 border-soft w-45 flex h-9 items-center rounded-lg border px-2.5">
										<div className="bg-primary-border border-soft-alpha flex size-[21.6px] items-center justify-center rounded-[7.2px] border">
											<Grid className="text-white" size={14.4} />
										</div>
										<p className="text-fg-secondary flex grow items-center justify-center text-xs">Blogs Section / 02</p>
									</div>
									<div className="py-1.75 border-soft w-45 flex h-9 items-center rounded-lg border px-2.5">
										<div className="bg-primary-border border-soft-alpha flex size-[21.6px] items-center justify-center rounded-[7.2px] border">
											<Grid className="text-white" size={14.4} />
										</div>
										<p className="text-fg-secondary flex grow items-center justify-center text-xs">Blogs Section / 03</p>
									</div>
									<div className="py-1.75 border-soft w-45 flex h-9 items-center rounded-lg border px-2.5">
										<div className="bg-primary-border border-soft-alpha flex size-[21.6px] items-center justify-center rounded-[7.2px] border">
											<Grid className="text-white" size={14.4} />
										</div>
										<p className="text-fg-secondary flex grow items-center justify-center text-xs">Blogs Section / 04</p>
									</div>
									<div className="py-1.75 border-soft w-45 flex h-9 items-center rounded-lg border px-2.5">
										<div className="bg-primary-border border-soft-alpha flex size-[21.6px] items-center justify-center rounded-[7.2px] border">
											<Grid className="text-white" size={14.4} />
										</div>
										<p className="text-fg-secondary flex grow items-center justify-center text-xs">Blogs Section / 05</p>
									</div>
								</div>
							</InfiniteScroll>

							<div className="flex items-center justify-center">
								<Skeleton className="bg-fill2 h-[359px] w-full max-w-[321px] rounded-xl rounded-b-none px-9 sm:max-w-[423px] sm:px-0" />
							</div>
						</div>
						<ParticleCard
							disableAnimations={shouldDisableAnimations}
							particleCount={particleCount}
							style={cardStyle}
							enableTilt={enableTilt}
							clickEffect={clickEffect}
							enableMagnetism={enableMagnetism}
							className="border-soft pt-15 card card--border-glow relative flex min-h-[488px] w-full flex-col gap-12 overflow-hidden rounded-xl border">
							<div className="flex flex-col gap-4 px-7 sm:px-8 lg:w-[510px] lg:pl-12">
								<span className="pb-2">
									<CircleGauge size={28} className="stroke-primary-hover" />
								</span>
								<span className="heading-6 font-medium">Tree-Shakable Architecture</span>
								<p className="text-fg-secondary text-sm">Only imports what you use ultra-light bundles for fast and improved performance.</p>
							</div>
							<div className="flex h-full gap-[23px] pl-12">
								<Skeleton className="bg-fill2 min-h-[359px] w-1/3 min-w-[140px] rounded-xl rounded-b-none" />
								<Skeleton className="bg-fill2 min-h-[359px] w-2/3 min-w-[421px] rounded-xl rounded-b-none" />
							</div>
							<div className="h-30 from-bg/5 to-bg z-1 absolute bottom-0 w-full bg-gradient-to-b" />
						</ParticleCard>
					</div>
				</div>
			</BentoCardGrid>
		</>
	)
}

export default FeaturesSection
