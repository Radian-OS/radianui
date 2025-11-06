import React from "react"
import { Component, ScanEye } from "lucide-react"
import { useTheme } from "next-themes"
import { Badge } from "@/registry/ui/badge"
import { FlickeringGrid } from "../effects/flickering"

const FeaturesSectionNew = () => {
	const { resolvedTheme } = useTheme()
	return (
		<div className="flex flex-col items-center gap-20 pb-40 pt-40">
			<div className="flex flex-col items-center gap-8">
				<div className="relative">
					<Badge className="relative z-10" variant="soft" color="neutral" size="28">
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
							stroke="var(--color-fg-disabled)"
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
					<svg className="-right-180 -top-122 absolute scale-x-[-1]" width="698" height="798" viewBox="0 0 698 798" fill="none" xmlns="http://www.w3.org/2000/svg">
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
				<div className="flex w-full max-w-[730px] flex-col gap-6 text-center">
					<h2 className="heading-2 text-center">
						<span className="from-fg to-fg-secondary bg-gradient-to-b bg-clip-text text-transparent">A design system built for speed,</span>
						<br />
						<span className="bg-gradient-to-r from-[#7655F6] to-[#492EB8] bg-clip-text text-transparent">scale and simplicity.</span>
					</h2>
					<p className="text-fg-secondary text-base font-normal">
						Get from design file to production-ready web application. Radian gives you everything you need to design and build faster.
					</p>
				</div>
			</div>
			<div className="border-soft flex h-full max-h-[600px] w-full max-w-[1400px] rounded-xl border">
				<div className="flex-2/3 pt-15 bg flex flex-col gap-12 pl-12">
					<div className="flex items-center justify-between">
						<div className="flex w-1/2 flex-col gap-4">
							<span className="pb-2">
								<ScanEye size={28} className="stroke-primary-hover" />
							</span>
							<h6 className="heading-6">High Quality Base Components</h6>
							<p className="text-fg-secondary text-sm">From keyboard navigation to structural semantics, everything follows modern accessibility standards.</p>
						</div>
						<div className="flex h-full w-1/2 items-end justify-center px-12">
							<div>
								<FlickeringGrid
									shape="square"
									className="inset-0 z-10 max-h-[48px] max-w-[188.8px] self-end"
									squareSize={3.2}
									gridGap={3}
									color={resolvedTheme === "light" ? "#E5DFFB" : "#211452"}
									maxOpacity={0.4}
									flickerChance={0.1}
								/>
							</div>
						</div>
					</div>
					<div>table</div>
				</div>
				<div className="flex-1/3">2</div>
			</div>
		</div>
	)
}

export default FeaturesSectionNew
