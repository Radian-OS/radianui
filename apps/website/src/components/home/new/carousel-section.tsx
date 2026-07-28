import React from "react"
import {
	LayoutGrid,
	MonitorSmartphone,
	Sparkles,
	SunMoon,
	SwatchBook,
} from "lucide-react"
import Image from "next/image"
import { darkThemeVars } from "@/components/theme/theme-vars"
import { Badge, BadgeDot } from "@/registry/ui/badge"

const CarouselSection = () => {
	return (
		<section
			className="bg-bg text-fg dark relative z-20 w-full"
			style={darkThemeVars}>
			<div className="max-w-360 lg:pt-30 mx-auto flex w-full flex-col gap-12 pt-12 sm:gap-16 sm:pt-14 lg:gap-20">
				<div className="flex w-full flex-col items-center justify-center gap-8 px-5 sm:px-8 lg:px-0">
					<Badge color="violet-blue" size="28" variant="soft">
						<BadgeDot className="text-violet-blue-text" />
						Design at Scale
					</Badge>
					<h3 className="heading-3 max-w-212.5 text-center max-sm:text-2xl max-sm:leading-9">
						More than just a component library.{" "}
						<span className="text-fg-secondary">
							A complete collection of design foundations, blocks, and assets
							built to work together.
						</span>
					</h3>
				</div>
				{/* Numbers Section */}
				<div className="border-soft flex w-full flex-wrap border-y">
					<div className="border-soft flex w-1/2 flex-col items-center justify-center gap-3 border-b border-r px-4 py-8 text-center lg:w-1/4 lg:border-b-0">
						<h4 className="heading-4">2000+</h4>
						<span className="text-fg-secondary text-sm sm:text-base">
							Variables & Design Tokens
						</span>
					</div>
					<div className="border-soft flex w-1/2 flex-col items-center justify-center gap-3 border-b px-4 py-8 text-center lg:w-1/4 lg:border-b-0 lg:border-r">
						<h4 className="heading-4">4500+</h4>
						<span className="text-fg-secondary text-sm sm:text-base">
							Components & Variants
						</span>
					</div>
					<div className="border-soft flex w-1/2 flex-col items-center justify-center gap-3 border-r px-4 py-8 text-center lg:w-1/4">
						<h4 className="heading-4">100+</h4>
						<span className="text-fg-secondary text-sm sm:text-base">
							UI Blocks & Templates
						</span>
					</div>
					<div className="border-soft flex w-1/2 flex-col items-center justify-center gap-3 px-4 py-8 text-center lg:w-1/4">
						<h4 className="heading-4">2,000+</h4>
						<span className="text-fg-secondary text-sm sm:text-base">
							Icons & Assets
						</span>
					</div>
				</div>
				{/* Numbers Section */}
				<div>Animation Section</div>
				<svg
					width="1442"
					height="50"
					viewBox="0 0 1442 50"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink">
					<rect
						x="0.5"
						y="0.5"
						width="1441"
						height="49"
						fill="url(#pattern0_3005_20615)"
						fillOpacity="0.1"
						stroke="#1C1E21"
					/>
					<defs>
						<pattern
							id="pattern0_3005_20615"
							patternUnits="userSpaceOnUse"
							patternTransform="matrix(8.60365 0 0 12.2873 0.180664 0.426441)"
							preserveAspectRatio="none"
							viewBox="-0.819336 -0.573559 8.60365 12.2873"
							width="1"
							height="1">
							<use
								xlinkHref="#pattern0_3005_20615_inner"
								transform="translate(-8.60365 -12.2873)"
							/>
							<use
								xlinkHref="#pattern0_3005_20615_inner"
								transform="translate(0 -12.2873)"
							/>
							<use
								xlinkHref="#pattern0_3005_20615_inner"
								transform="translate(-8.60365 0)"
							/>
							<g id="pattern0_3005_20615_inner">
								<line
									opacity="0.8"
									x1="-0.409576"
									y1="12.0005"
									x2="8.19407"
									y2="-0.286788"
									stroke="#E9EAEC"
								/>
							</g>
						</pattern>
					</defs>
				</svg>
			</div>

			<div className="max-w-360 pt-30 px-15 mx-auto flex w-full flex-col gap-20 pb-20">
				<div className="flex flex-col gap-6 pb-5">
					<Badge size="28" color="violet-blue" variant="soft">
						<Sparkles />
						Extended Build Experience
					</Badge>
					<h3 className="heading-3 max-w-225">
						Built for modern product teams{" "}
						<span className="text-fg-tertiary">
							Extend your experience with more features to help you build better
							apps and products
						</span>
					</h3>
				</div>
				<Image
					src="/carousel-home.png"
					width={2640}
					height={1948}
					alt="image-carousel"
					className="max-w-330 max-h-160 size-full"
				/>
				<div className="flex w-full items-center justify-center gap-5">
					<div className="flex flex-col gap-8 pr-8">
						<SwatchBook className="text-fg-tertiary size-6" />
						<div className="flex flex-col gap-3">
							<h4 className="font-medium">Figma variable system</h4>
							<p className="text-fg-secondary">
								Organized variable collections to edit colors, spacing, radius &
								typography.
							</p>
						</div>
					</div>
					<div className="flex flex-col gap-8 pr-8">
						<LayoutGrid className="text-fg-tertiary size-6" />
						<div className="flex flex-col gap-3">
							<h4 className="font-medium">Auto Layout</h4>
							<p className="text-fg-secondary">
								Fully Built using Auto layout, from small components to UI
								Blocks.
							</p>
						</div>
					</div>
					<div className="flex flex-col gap-8 pr-8">
						<SunMoon className="text-fg-tertiary size-6" />
						<div className="flex flex-col gap-3">
							<h4 className="font-medium">Theme Modes</h4>
							<p className="text-fg-secondary">
								Easily switch multiple color themes, with full light/dark mode
								support.
							</p>
						</div>
					</div>
					<div className="flex flex-col gap-8 pr-8">
						<MonitorSmartphone className="text-fg-tertiary size-6" />
						<div className="flex flex-col gap-3">
							<h4 className="font-medium">Resoponsive by Default</h4>
							<p className="text-fg-secondary">
								Different frame designs ensuring they look great on any screen
								size.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="max-w-360 mx-auto w-full">
				<svg
					width="1442"
					height="50"
					viewBox="0 0 1442 50"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink">
					<rect
						x="0.5"
						y="0.5"
						width="1441"
						height="49"
						fill="url(#pattern0_3005_20615)"
						fillOpacity="0.1"
						stroke="#1C1E21"
					/>
					<defs>
						<pattern
							id="pattern0_3005_20615"
							patternUnits="userSpaceOnUse"
							patternTransform="matrix(8.60365 0 0 12.2873 0.180664 0.426441)"
							preserveAspectRatio="none"
							viewBox="-0.819336 -0.573559 8.60365 12.2873"
							width="1"
							height="1">
							<use
								xlinkHref="#pattern0_3005_20615_inner"
								transform="translate(-8.60365 -12.2873)"
							/>
							<use
								xlinkHref="#pattern0_3005_20615_inner"
								transform="translate(0 -12.2873)"
							/>
							<use
								xlinkHref="#pattern0_3005_20615_inner"
								transform="translate(-8.60365 0)"
							/>
							<g id="pattern0_3005_20615_inner">
								<line
									opacity="0.8"
									x1="-0.409576"
									y1="12.0005"
									x2="8.19407"
									y2="-0.286788"
									stroke="#E9EAEC"
								/>
							</g>
						</pattern>
					</defs>
				</svg>
			</div>
		</section>
	)
}

export default CarouselSection
