import { Component } from "lucide-react"
import { Badge } from "@/styles/default/ui/badge"

const connectorPath =
	"M0.433594 1.2504L70.1484 122C73.1494 127.198 78.6956 130.4 84.6976 130.4L177.71 130.4C184.379 130.4 190.417 134.346 193.095 140.454L295.555 349.15H798.467L900.956 139.479C903.629 133.358 909.674 129.4 916.353 129.4L1009.35 129.4C1015.35 129.4 1020.89 126.198 1023.89 121L1093.61 0.250397"

const sideRailPath =
	"M92 0V376.5L173.971 458.471C178.471 462.971 181 469.076 181 475.441V585.5C181 598.755 191.745 609.5 205 609.5H245"

export const FeatureHeader = () => {
	return (
		<div className="flex flex-col items-center gap-8 px-5">
			<div className="relative">
				<Badge className="relative z-40" variant="soft" size="28">
					<Component className="text-primary" /> Rapid Development
				</Badge>

				<svg
					className="not-md:hidden pointer-events-none absolute bottom-1/2 left-1/2 -translate-x-1/2 overflow-hidden"
					width="1095"
					height="350"
					viewBox="0 0 1095 350"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path d={connectorPath} strokeWidth="1" stroke="var(--color-soft)" />
					<path
						id="beamPath"
						d={connectorPath}
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
				<svg
					className="-top-122 pointer-events-none absolute -left-[725.5px]"
					width="698"
					height="798"
					viewBox="0 0 698 798"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<g clipPath="url(#feature-left-side-line-clip)">
						<path d={sideRailPath} stroke="url(#paint0_linear_1_26452)" />
						<rect
							x="125.5"
							y="410"
							width="5"
							height="5"
							rx="2.5"
							fill="var(--color-soft)"
						/>
						<rect
							x="127"
							y="411.5"
							width="2"
							height="2"
							rx="1"
							fill="var(--color-soft)"
						/>
						<path
							d="M495 463L464.065 494.749C459.548 499.385 453.349 502 446.876 502H285C271.745 502 261 512.745 261 526V798"
							stroke="url(#paint1_linear_1_26452)"
						/>
						<path
							d="M261 606V526C261 512.745 271.745 502 285 502H417"
							stroke="url(#paint2_linear_1_26452)"
						/>
					</g>
					<defs>
						<clipPath
							id="feature-left-side-line-clip"
							clipPathUnits="userSpaceOnUse">
							<rect x="91.5" y="0" width="606.5" height="798" />
						</clipPath>
						<linearGradient
							id="paint0_linear_1_26452"
							x1="197"
							y1="-158"
							x2="196.66"
							y2="689.5"
							gradientUnits="userSpaceOnUse">
							<stop stopColor="var(--color-soft)" stopOpacity="0" />
							<stop offset="0.9" stopColor="var(--color-soft)" />
						</linearGradient>
						<linearGradient
							id="paint1_linear_1_26452"
							x1="277.326"
							y1="798"
							x2="474.726"
							y2="432.852"
							gradientUnits="userSpaceOnUse">
							<stop stopColor="var(--color-soft)" stopOpacity="0" />
							<stop offset="0.15" stopColor="var(--color-soft)" />
							<stop offset="0.85" stopColor="var(--color-soft)" />
							<stop offset="1" stopColor="var(--color-soft)" stopOpacity="0" />
						</linearGradient>
						<linearGradient
							id="paint2_linear_1_26452"
							x1="243.437"
							y1="627.677"
							x2="431.51"
							y2="475.893"
							gradientUnits="userSpaceOnUse">
							<stop offset="1" stopColor="var(--color-soft)" stopOpacity="0" />
						</linearGradient>
					</defs>
				</svg>

				{/* Right side line */}
				<svg
					className="-top-122 pointer-events-none absolute -right-[725.5px] z-10 scale-x-[-1]"
					width="698"
					height="798"
					viewBox="0 0 698 798"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<g clipPath="url(#feature-right-side-line-clip)">
						<path d={sideRailPath} stroke="url(#paint0_linear_1_26452)" />
						<rect
							x="125.5"
							y="410"
							width="5"
							height="5"
							rx="2.5"
							fill="var(--color-soft)"
						/>
						<rect
							x="127"
							y="411.5"
							width="2"
							height="2"
							rx="1"
							fill="var(--color-soft)"
						/>
						<path
							d="M495 463L464.065 494.749C459.548 499.385 453.349 502 446.876 502H285C271.745 502 261 512.745 261 526V798"
							stroke="url(#paint1_linear_1_26452)"
						/>
						<path
							d="M261 606V526C261 512.745 271.745 502 285 502H417"
							stroke="url(#paint2_linear_1_26452)"
						/>
					</g>
					<defs>
						<clipPath
							id="feature-right-side-line-clip"
							clipPathUnits="userSpaceOnUse">
							<rect x="91.5" y="0" width="606.5" height="798" />
						</clipPath>
					</defs>
				</svg>
			</div>
			<div className="z-20 flex w-full max-w-[730px] flex-col gap-6 text-center">
				<h2 className="heading-2 max-w-[730px] text-center">
					<span className="from-fg to-fg-secondary bg-gradient-to-b bg-clip-text text-transparent">
						A Unified Design System for,{" "}
					</span>
					<span className="bg-gradient-to-r from-[#7655F6] to-[#492EB8] bg-clip-text text-transparent">
						Figma and React.
					</span>
				</h2>
				<p className="text-fg-secondary text-base font-normal">
					Bridge the gap between design and production. Get a comprehensive
					Figma UI kit mapped perfectly to a beautiful, pre-styled React
					component library
				</p>
			</div>
		</div>
	)
}
