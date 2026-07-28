import React from "react"
import Image from "next/image"
import { Badge, BadgeDot } from "@/registry/ui/badge"
import DiagonalDivider from "./SvgDivider"

const RapidDev = () => {
	return (
		<section className="mx-auto flex max-w-[1440px] flex-col">
			<div className="md:px-15 md:py-30 flex flex-col gap-4 px-5 py-16 sm:gap-6 sm:px-10">
				<Badge color="primary" size="28" variant="soft">
					<BadgeDot className="bg-primary" />
					Rapid Development
				</Badge>
				<div className="w-full md:w-[1012px]">
					<h2 className="heading-3">
						Everything you need to ship polished interfaces
					</h2>
					<h2 className="heading-3 text-fg-secondary">
						Production ready React components,{" "}
						<span className="bg-[linear-gradient(90deg,var(--primary-border,#9981F8)_72.12%,var(--utility-Fuchsia-border,#F881F8)_88.94%)] bg-clip-text text-transparent">
							Figma UI Kit
						</span>
						, and reusable UI blocks.
					</h2>
				</div>
			</div>

			<div className="border-soft flex flex-col overflow-hidden border md:flex-row">
				<div className="md:flex-2 border-soft border-b md:border-r">
					<div className="md:px-15 flex w-full flex-col px-5 py-8 sm:px-10 sm:py-12 md:w-[520px] md:py-20">
						<h3 className="heading-5 text-[18px]">
							Production-Ready Figma UI Kit.
						</h3>
						<p className="heading-5 text-fg-secondary text-[18px]">
							Get access to over 2000+ Components, 1000+ assets all built using
							smart auto layout and figma slots
						</p>
					</div>
					<div className="relative h-[430px] overflow-hidden">
						<div className="absolute bottom-[10rem] left-1/2 top-1/2 -translate-x-1/2 scale-150 md:bottom-[-20rem]">
							<Image
								width={800}
								height={1000}
								alt=""
								src="/newhome/OverviewContainer.png"
							/>
						</div>
						<div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[120px] bg-[linear-gradient(0deg,#FFF_0%,rgba(255,255,255,0)_100%)] dark:bg-[linear-gradient(0deg,oklch(0.144_0.003_264.025)_0%,oklch(0.144_0.003_264.025/0)_100%)]" />
					</div>
				</div>
				<div className="md:flex-1">
					<div className="md:px-15 flex w-full flex-col px-5 py-8 sm:px-10 sm:py-12 md:w-[520px] md:py-20">
						<h3 className="heading-5 text-[18px]">
							A Complete Library of UI Primitives.
						</h3>
						<p className="heading-5 text-fg-secondary text-[18px]">
							Pre-styled 50+ React components built with Tailwind CSS to copy
							and paste
						</p>
					</div>
					<div className="relative h-[430px]">
						<div className="absolute bottom-[-3rem] right-0">
							<Image
								width={450}
								height={600}
								alt=""
								src="/newhome/UIPreview.png"
							/>
						</div>
						<div className="pointer-events-none absolute bottom-[-3rem] left-0 right-0 h-[120px] bg-[linear-gradient(0deg,#FFF_0%,rgba(255,255,255,0)_100%)] dark:bg-[linear-gradient(0deg,oklch(0.144_0.003_264.025)_0%,oklch(0.144_0.003_264.025/0)_100%)]" />
					</div>
				</div>
			</div>

			<DiagonalDivider />

			<div className="bg-fill1 border-soft flex flex-col border md:flex-row">
				<div className="border-soft border-b md:flex-1 md:border-r">
					<div className="md:px-15 flex w-full flex-col px-5 py-8 sm:px-10 sm:py-12 md:w-[520px] md:py-20">
						<h3 className="heading-5 text-[18px]">
							Customize without compromise
						</h3>
						<p className="heading-5 text-fg-secondary text-[18px]">
							The Radian library extends the primitive component with meaningful
							properties for easier customization
						</p>
					</div>
					<div className="relative h-[430px] overflow-hidden">
						<div className="scale-120 absolute bottom-[10rem] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:bottom-0">
							<Image
								width={600}
								height={800}
								alt=""
								src="/newhome/credit.png"
							/>
						</div>
						<div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[180px] bg-[linear-gradient(0deg,#FFF_0%,rgba(255,255,255,0)_100%)] dark:bg-[linear-gradient(0deg,oklch(0.144_0.003_264.025)_0%,oklch(0.144_0.003_264.025/0)_100%)]" />
					</div>
				</div>
				<div className="md:flex-1">
					<div className="md:px-15 flex w-full flex-col px-5 py-8 sm:px-10 sm:py-12 md:w-[520px] md:py-20">
						<h3 className="heading-5 text-[18px]">Built for the AI era</h3>
						<p className="heading-5 text-fg-secondary text-[18px]">
							Give your AI coding assistant a prompt and let it build with
							Radian&apos;s components, blocks, and design system
						</p>
					</div>

					<div className="relative h-[430px] overflow-hidden">
						<div className="absolute bottom-[10rem] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:bottom-0">
							<Image width={400} height={800} alt="" src="/newhome/app.png" />
						</div>
					</div>
				</div>
			</div>

			<div>
				<div className="px-15 py-25 flex flex-col justify-between gap-3 md:flex-row">
					<h3 className="heading-5 w-full md:w-[612px]">
						Seamless Design-to-Code Sync.{" "}
						<span className="text-fg-secondary">
							Variables and tokens in Figma Design File and Code use the same
							semantic for smooth development experience
						</span>
					</h3>

					<p className="">Designer . Developer</p>
				</div>
				<div className="bg-fill1 relative h-[430px] overflow-hidden md:h-[720px]">
					<div className="absolute bottom-[-5rem] left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 md:bottom-[-7rem]">
						<Image
							width={1120}
							height={768}
							alt=""
							src="/newhome/Content.png"
						/>
					</div>
					<div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[200px] bg-[linear-gradient(0deg,#FFF_0%,rgba(255,255,255,0)_100%)] dark:bg-[linear-gradient(0deg,oklch(0.144_0.003_264.025)_0%,oklch(0.144_0.003_264.025/0)_100%)]" />
				</div>
			</div>

			<DiagonalDivider />

			<div className="border-soft flex flex-col border md:flex-row">
				<div className="border-soft overflow-hidden border-b md:flex-1 md:border-r">
					<div className="md:px-15 flex w-full flex-col px-5 py-8 sm:px-10 sm:py-12 md:w-[520px] md:py-20">
						<h3 className="heading-5 text-[18px]">
							Scalable Variable-first design system
						</h3>
						<p className="heading-5 text-fg-secondary text-[18px]">
							Fully designed for dark modes, typography, color, spacings & more
						</p>
					</div>
					<div className="relative h-[430px]">
						<div className="scale-120 absolute bottom-[-9rem] left-1/2 -translate-x-1/2 -translate-y-1/2">
							<Image
								width={600}
								height={800}
								alt=""
								src="/newhome/sidebar.png"
							/>
						</div>
						<div className="pointer-events-none absolute bottom-[-2rem] left-0 right-0 h-[120px] bg-[linear-gradient(0deg,#FFF_0%,rgba(255,255,255,0)_100%)] dark:bg-[linear-gradient(0deg,oklch(0.144_0.003_264.025)_0%,oklch(0.144_0.003_264.025/0)_100%)]" />
					</div>
				</div>
				<div className="md:flex-2">
					<div className="md:px-15 flex w-full flex-col px-5 py-8 sm:px-10 sm:py-12 md:w-[520px] md:py-20">
						<h3 className="heading-5 text-[18px]">
							Copy-Paste Landing Page Blocks
						</h3>
						<p className="heading-5 text-fg-secondary text-[18px]">
							Growing Library of Pre-made responsive sections designed to snap
							together into full pages
						</p>
					</div>
					<div className="relative h-[430px] overflow-hidden">
						<Image
							width={300}
							height={700}
							alt=""
							src="/newhome/vertical.png"
							className="absolute bottom-[-10rem] right-10"
						/>
						<Image
							width={600}
							height={1000}
							alt=""
							src="/newhome/Container.png"
							className="md:-translate-y-50 absolute left-1/2 top-1/2 z-10 -translate-x-1/2"
						/>
						<div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-[120px] bg-[linear-gradient(0deg,#FFF_0%,rgba(255,255,255,0)_100%)] dark:bg-[linear-gradient(0deg,oklch(0.144_0.003_264.025)_0%,oklch(0.144_0.003_264.025/0)_100%)]" />
					</div>
				</div>
			</div>

			<DiagonalDivider />
		</section>
	)
}

export default RapidDev
