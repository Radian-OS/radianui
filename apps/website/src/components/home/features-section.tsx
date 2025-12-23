"use client"

import React, { useEffect, useRef, useState } from "react"
import { CircleGauge, FolderGit, LayoutDashboard, ScanEye, SquareTerminal, SwatchBook } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { CliCard } from "./feature-section-component/cli-card"
import { CodeSync } from "./feature-section-component/code-sync"
import { ComponentFlowCard } from "./feature-section-component/component-flow"
import { FeatureHeader } from "./feature-section-component/feature-header"
import { GlobalSpotlight } from "./feature-section-component/global-spotlight"
import { Marquee } from "./feature-section-component/marquee"
import { ParticleCard } from "./feature-section-component/partical-card"
import { ReuseComponent } from "./feature-section-component/reuse-component"
import { ThemeableSystem } from "./feature-section-component/themeable-system-card"

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
			{enableSpotlight && <GlobalSpotlight gridRef={gridRef} disableAnimations={shouldDisableAnimations} enabled={enableSpotlight} spotlightRadius={spotlightRadius} />}

			{/* Additional GlobalSpotlight specifically for the ComponentSvg card */}
			{enableSpotlight && <GlobalSpotlight gridRef={componentCardRef} disableAnimations={shouldDisableAnimations} enabled={enableSpotlight} spotlightRadius={spotlightRadius} />}

			<BentoCardGrid gridRef={gridRef} className="flex flex-col items-center gap-20 pb-40 pt-40">
				<FeatureHeader />
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
								<p className="text-fg-secondary max-w-[380px] text-sm">Install with one command or copy the snippet. No configuration. No waiting. Just build.</p>
							</div>
							<CliCard />
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
							<div className="h-50 from-bg/0 to-bg absolute inset-x-0 bottom-0 flex bg-gradient-to-b"></div>
							<div className="top-58 h-30 from-bg/0 to-bg absolute inset-x-0 flex bg-gradient-to-t"></div>
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
							className="border-soft card card--border-glow z-3 relative flex h-[600px] w-full flex-col gap-12 overflow-hidden rounded-[20px] border lg:flex-1">
							<div className="pt-15 flex flex-col gap-4 px-7 sm:pl-12">
								<SwatchBook size={28} className="stroke-primary-hover" />
								<span className="heading-6 font-medium">Themeable System</span>
								<p className="text-fg-secondary lg:max-w-105 w-fit max-w-[380px] text-sm">Edit one token to restyle your entire design system light, dark, or custom themes.</p>
							</div>
							<ThemeableSystem />
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
							className="border-soft z-5 card card--border-glow lg:flex-3 relative flex h-[600px] w-full flex-col gap-12 overflow-hidden rounded-[20px] border">
							<div className="pt-15 flex flex-col gap-4 px-7 sm:px-12">
								<CircleGauge size={28} className="stroke-primary-hover" />
								<span className="heading-6 font-medium">Tree-Shakable Architecture</span>
								<p className="text-fg-secondary text-sm lg:max-w-[380px]">Only imports what you use ultra-light bundles for fast and improved performance.</p>
							</div>
							<div className="relative flex h-full">
								<Marquee />
								<div className="from-bg/0 to-bg z-1 absolute left-0 top-1 h-full w-20 bg-gradient-to-l" />
								<div className="from-bg/0 to-bg z-1 absolute right-0 top-1 h-full w-20 bg-gradient-to-r" />
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
							className="border-soft lg:flex-5 card z-1 card card--border-glow relative flex h-[600px] w-full flex-col gap-12 overflow-hidden rounded-[20px] border">
							<div className="pt-15 flex flex-col gap-4 px-7 sm:px-12">
								<LayoutDashboard size={28} className="stroke-primary-hover" />
								<span className="heading-6 font-medium">Reusable UI Blocks</span>
								<p className="text-fg-secondary max-w-[380px] text-sm">
									Get access to high quality pre-built UI blocks, designed and developed to plug into any layout and ready for use
								</p>
							</div>
							<div className="relative h-full w-full">
								<div className="z-1 from-bg/0 to-bg absolute left-0 top-0 h-14 w-full bg-gradient-to-t" />

								<ReuseComponent />
							</div>
						</ParticleCard>
					</div>
				</div>
			</BentoCardGrid>
		</>
	)
}

export default FeaturesSection
