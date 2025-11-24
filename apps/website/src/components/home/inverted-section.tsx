"use client"

import { Blocks, Braces, CaseLower, CloudCog, Cuboid, FileCode, GalleryVertical, LayoutGrid, Palette, Rocket, SunMoon, SwatchBook, Users } from "lucide-react"
import { BorderBeam } from "@/registry/animated/border-beam"
import { Badge } from "@/registry/ui/badge"
import PlaygroundLogo from "./playground-logo"

const DATA = [
	{
		icon: SwatchBook,
		title: "Figma variable system",
		description: "Manage consistent design tokens across color, spacing, and typography",
	},
	{
		icon: LayoutGrid,
		title: "Auto layout",
		description: "Create scalable and flexible designs that adapt to any screen size automatically",
	},
	{
		icon: SunMoon,
		title: "Theme Modes",
		description: "Switch effortlessly between light and dark themes, or create custom themes",
	},
	{
		icon: CaseLower,
		title: "Responsive Typography",
		description: "Ensure consistent, legible text across devices with an adaptive type system",
	},
	{
		icon: Palette,
		title: "Color Presets",
		description: "Use predefined color palettes to maintain harmony and visual consistency",
	},
	{
		icon: GalleryVertical,
		title: "Motion Components",
		description: "Bring your interfaces to life with smooth, modern motion and interaction patterns",
	},
	{
		icon: Blocks,
		title: "Composable System",
		description: "Composable components allows you to easily tweak and adjust components",
	},
	{
		icon: FileCode,
		title: "Type safe Components",
		description: "Eliminate code errors with strongly typed UI components for developers",
	},
	{
		icon: Braces,
		title: "Simplified Global CSS",
		description: "Streamline your styles with a minimal global CSS layer for easy customization",
	},
	{
		icon: Users,
		title: "Open Source",
		description: "Being open source allows for teams to access full code and build on top of it",
	},
	{
		icon: Cuboid,
		title: "Growing Block Library",
		description: "Expanding collection of ready-to-use UI blocks to speed up your workflow.",
	},
	{ icon: CloudCog, title: "Minimal Dependencies", description: "Keep your stack lightweight and efficient with components built for minimal setup" },
]

export default function InvertedSection() {
	return (
		<div className="gap-15 relative flex w-full flex-col overflow-clip">
			<div className="relative flex w-full justify-center">
				<div className="bg-soft z-10 rounded-3xl p-2">
					<PlaygroundLogo className="z-10" width={64} height={64} />
				</div>
				<svg className="not-md:hidden absolute top-1/2" width="699" height="121" viewBox="0 0 699 121" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M696.603 252.38L584.265 10.23C581.513 4.29643 575.566 0.5 569.025 0.5H129.658C123.117 0.5 117.171 4.29642 114.418 10.23L2.08081 252.38C-3.08484 263.515 5.04596 276.25 17.3207 276.25H681.363C693.637 276.25 701.768 263.515 696.603 252.38Z"
						stroke="var(--color-soft)"
					/>
				</svg>
			</div>
			<div className="relative">
				<div className="absolute inset-x-0 -top-11 mt-[calc(-3/16*1rem)] flex items-end">
					<div className="bg-black-inverse mr-[calc(-1*(theme(spacing.8)-theme(spacing[1.5])))] h-11 flex-auto dark:bg-[#131316]"></div>
					<div className="mx-auto flex w-full justify-between px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
						<svg viewBox="0 0 56 48" aria-hidden="true" className="fill-black-inverse -ml-1.5 mb-[calc(-1/16*1rem)] w-14 flex-none overflow-visible dark:fill-[#131316]">
							<path d="M 2.686 3 H -4 V 48 H 56 V 47 H 53.314 A 8 8 0 0 1 47.657 44.657 L 8.343 5.343 A 8 8 0 0 0 2.686 3 Z"></path>
						</svg>
						<svg viewBox="0 0 56 48" aria-hidden="true" className="fill-black-inverse -mr-1.5 mb-[calc(-1/16*1rem)] w-14 flex-none overflow-visible dark:fill-[#131316]">
							<path d="M 53.314 3 H 60 V 48 H 0 V 47 H 2.686 A 8 8 0 0 0 8.343 44.657 L 47.657 5.343 A 8 8 0 0 1 53.314 3 Z"></path>
						</svg>
					</div>
					<div className="bg-black-inverse ml-[calc(-1*(theme(spacing.8)-theme(spacing[1.5])))] h-11 flex-auto dark:bg-[#131316]"></div>
				</div>

				<div className="inverted-shape pb-35 bg-black-inverse relative flex w-full flex-col items-center gap-20 overflow-clip px-5 pt-40 dark:bg-[#131316]">
					{/* Elliptical shaped gradient for bg */}
					<svg className="z-60 absolute -top-1/2 left-1/2 -translate-x-1/2" width="3272" height="2545" viewBox="0 0 3272 2545" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g opacity="0.34" filter="url(#filter0_f_1156_17761)">
							<path
								d="M1350.4 864.929C964.236 1135.32 648.845 1427.27 450.934 1680.09C351.878 1806.63 283.167 1922.21 249.23 2019.49C215.055 2117.45 217.866 2191.36 252.363 2240.62C286.861 2289.89 355.348 2317.81 459.088 2319.2C562.107 2320.58 694.218 2295.54 847.004 2245.74C1152.27 2146.23 1534.48 1949.72 1920.64 1679.32C2306.8 1408.93 2622.19 1116.98 2820.11 864.16C2919.16 737.622 2987.87 622.042 3021.81 524.763C3055.98 426.803 3053.17 352.898 3018.67 303.631C2984.18 254.364 2915.69 226.445 2811.95 225.054C2708.93 223.674 2576.82 248.709 2424.04 298.513C2118.77 398.02 1736.56 594.537 1350.4 864.929Z"
								stroke="url(#paint0_linear_1156_17761)"
								strokeWidth="50"
							/>
						</g>
						<defs>
							<filter id="filter0_f_1156_17761" x="0" y="7.62939e-06" width="3271.04" height="2544.25" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
								<feFlood floodOpacity="0" result="BackgroundImageFix" />
								<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
								<feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_1156_17761" />
							</filter>
							<linearGradient id="paint0_linear_1156_17761" x1="3039.15" y1="289.291" x2="231.885" y2="2254.96" gradientUnits="userSpaceOnUse">
								<stop stopColor="#545463" />
								<stop offset="1" stopColor="#868698" />
							</linearGradient>
						</defs>
					</svg>

					<div className="pt-15 relative z-30 flex w-full max-w-[977px] flex-col items-center justify-center gap-8 rounded-t-3xl border border-[#1c1d21]">
						<div className="bg-black-inverse absolute -bottom-1 z-10 h-2 w-full dark:bg-[#131316]"></div>

						<BorderBeam size={100} className="not-xl:hidden" />

						<div className="bg-black-inverse z-70 absolute top-0 flex -translate-y-1/2 items-center border-l border-r border-[#1c1d21] px-2 dark:bg-[#131316]">
							<Badge size="28" variant="outline" color="neutral" className="z-70 relative border-[#3A2593] bg-[#211452] text-[#ECE8FC]">
								<Rocket />
								Features inside Radian
							</Badge>
						</div>

						<div className="z-70 relative flex flex-col items-center gap-4">
							<h2 className="heading-2 to-fg-tertiary z-70 relative bg-gradient-to-b from-white bg-clip-text text-center text-transparent">Features to help you Build Quicker</h2>
							<p className="text-fg-tertiary z-70 relative w-full max-w-[480px] text-center text-base font-normal">
								Extend your Radian experience with more features to help you build better apps and products{" "}
							</p>
						</div>

						{/* Left line */}
						<svg className="not-xl:hidden absolute -top-36 right-[100%] z-0" width="260" height="1300" viewBox="0 0 260 1300" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M243.5 269.5H203.5C190.245 269.5 179.5 258.755 179.5 245.5V56.443C179.5 49.4919 176.486 42.8822 171.238 38.3239L111 -14" stroke="#1c1d21" />
							<path d="M179.5 91.5V195.5" stroke="#1c1d21" strokeLinecap="round" />
							<path d="M 162.5 113.5 H 26.5 C 13.2452 113.5 2.5 124.245 2.5 137.5 V 1300" stroke="#1c1d21" />
							<path d="M 162.5 113.5 H 26.5 C 13.2452 113.5 2.5 124.245 2.5 137.5 V 1300" stroke="#1c1d21" />
							<path
								id="beamPath"
								d="M 162.5 113.5 H 26.5 C 13.2452 113.5 2.5 124.245 2.5 137.5 V 1300"
								fill="none"
								stroke="var(--color-primary)"
								strokeWidth="1"
								strokeLinecap="round"
								className="animate-[var(--animate-beam-flow4)] [stroke-dasharray:50_1000] [stroke-dashoffset:0]"
								pathLength="1000"
							/>
							<path d="M695.5 143.5V175.5" stroke="#1c1d21" />
						</svg>

						{/* Right line */}
						<svg
							className="not-xl:hidden absolute -top-36 left-[100%] z-0 scale-x-[-1]"
							width="260"
							height="1196"
							viewBox="0 0 260 1196"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path d="M243.5 269.5H203.5C190.245 269.5 179.5 258.755 179.5 245.5V56.443C179.5 49.4919 176.486 42.8822 171.238 38.3239L111 -14" stroke="#1c1d21" />
							<path d="M179.5 91.5V195.5" stroke="#1c1d21" strokeLinecap="round" />
							<path d="M 162.5 113.5 H 26.5 C 13.2452 113.5 2.5 124.245 2.5 137.5 V 1300" stroke="#1c1d21" />
							<path
								id="beamPath"
								d="M 162.5 113.5 H 26.5 C 13.2452 113.5 2.5 124.245 2.5 137.5 V 1300"
								fill="none"
								stroke="var(--color-primary)"
								strokeWidth="1"
								strokeLinecap="round"
								className="animate-[var(--animate-beam-flow4)] [stroke-dasharray:50_1000] [stroke-dashoffset:0]"
								pathLength="1000"
							/>
						</svg>
					</div>

					<div className="z-70 grid w-full max-w-[1340px] grid-cols-1 overflow-clip rounded-3xl border border-[#1c1d21] md:grid-cols-2 lg:grid-cols-4">
						{DATA.map(({ icon: Icon, title, description }, i) => (
							<div
								key={i}
								className="div-hover group relative flex w-full gap-6 border-b border-r border-[#1c1d21] p-5 transition-colors duration-300 md:flex-col md:px-8 md:py-10 lg:[&:nth-child(-n+4)]:border-t-0 lg:[&:nth-child(4n+1)]:border-l-0 lg:[&:nth-child(4n+4)]:border-r-0 lg:[&:nth-child(n+9)]:border-b-0"
								onMouseMove={(e) => {
									const rect = e.currentTarget.getBoundingClientRect()
									const x = e.clientX - rect.left
									const y = e.clientY - rect.top
									e.currentTarget.style.setProperty("--x", `${x}px`)
									e.currentTarget.style.setProperty("--y", `${y}px`)
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.removeProperty("--x")
									e.currentTarget.style.removeProperty("--y")
								}}>
								{/* Styling line for the div */}
								<div className="duration-400 not-xl:hidden absolute left-0 top-1/2 h-8 w-[1px] -translate-y-1/2 bg-[#545463] transition-all group-hover:top-1/4" />

								<Icon size={24} className="shrink-0 text-[#545463] transition-colors duration-300 group-hover:text-[#C8C8D0]" />
								<div className="flex flex-col gap-2">
									<p className="text-base font-medium text-[#C8C8D0]">{title}</p>
									<p className="text-sm font-normal text-[#868698]">{description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
