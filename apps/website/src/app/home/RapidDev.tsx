import React from "react"
import { Dot } from "lucide-react"
import Image from "next/image"
import { CreditCardUsageAnimation } from "@/components/effects/credit-card-usage-animation"
import { LibraryComponentsCard } from "@/components/effects/library-primitives-card-animation"
import { Badge, BadgeDot } from "@/registry/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import DiagonalDivider from "./SvgDivider"

const data = [
	{ label: "Designer", value: "designer", content: "Inbox Content" },
	{ label: "Developer", value: "developer", content: "Projects Content" },
]

const RapidDev = () => {
	return (
		<section
			aria-labelledby="rapid-development-title"
			className="bg-bg relative z-30 mx-auto w-full max-w-[1440px]">
			<div className="max-w-360 border-soft mx-auto flex w-full flex-col overflow-hidden border border-t-0">
				<div className="lg:px-15 lg:py-30 flex flex-col gap-4 px-5 py-16 sm:gap-6 sm:px-10">
					<Badge color="primary" size="28" variant="soft">
						<BadgeDot className="bg-primary" />
						Rapid Development
					</Badge>
					<div className="w-full lg:w-[950px]">
						<h2 className="heading-3 text-[24px] font-medium leading-[36px] md:text-[36px] md:leading-[44px] lg:text-[40px] lg:leading-[52px]">
							Everything you need to ship polished interfaces{" "}
							<span className="heading-3 text-fg-secondary text-[24px] font-medium leading-[36px] md:text-[36px] md:leading-[44px] lg:text-[40px] lg:leading-[52px]">
								Production ready React components,{" "}
								<span className="bg-[linear-gradient(90deg,var(--primary-border,#9981F8)_72.12%,var(--utility-Fuchsia-border,#F881F8)_88.94%)] bg-clip-text text-transparent">
									Figma UI Kit
								</span>
								, and reusable UI blocks.
							</span>
						</h2>
					</div>
				</div>

				<div className="border-soft flex flex-col overflow-hidden border-y lg:flex-row">
					<div className="lg:flex-2 border-soft border-b lg:border-b-0 lg:border-r">
						<div className="lg:px-15 flex w-full flex-col px-5 py-8 sm:px-10 sm:py-12 lg:w-[520px] lg:py-20">
							<h3 className="heading-5 text-[18px] font-medium leading-8 tracking-[-0.18px]">
								Production-Ready Figma UI Kit.
							</h3>
							<p className="heading-5 text-fg-secondary text-[18px] font-medium leading-8 tracking-[-0.18px]">
								Get access to over 2000+ Components, 1000+ assets all built
								using smart auto layout and figma slots
							</p>
						</div>
						<div className="relative h-[214px] overflow-hidden md:h-[414px] lg:h-[430px]">
							<div className="absolute bottom-[10rem] left-1/2 top-1/2 -translate-x-1/2 scale-150 lg:bottom-[-20rem]">
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
					<div className="lg:flex-1">
						<div className="lg:px-15 flex w-full flex-col px-5 py-8 sm:px-10 sm:py-12 lg:w-[520px] lg:py-20">
							<h3 className="heading-5 text-[18px] font-medium leading-8 tracking-[-0.18px]">
								A Complete Library of UI Primitives.
							</h3>
							<p className="heading-5 text-fg-secondary text-[18px] font-medium leading-8 tracking-[-0.18px]">
								Pre-styled 50+ React components built with Tailwind CSS to copy
								and paste
							</p>
						</div>
						<div className="relative h-[214px] md:h-[414px] lg:h-[430px]">
							<div className="absolute bottom-[-10rem] right-0">
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

				<DiagonalDivider className="hidden sm:block" />
				<DiagonalDivider
					className="block sm:hidden"
					height={32}
					viewBox="0 0 1440 32"
				/>

				<div className="bg-fill1 border-soft flex flex-col border-t lg:flex-row">
					<div className="border-soft border-b lg:flex-1 lg:border-b-0 lg:border-r">
						<div className="lg:px-15 flex w-full flex-col px-5 py-8 sm:px-10 sm:py-12 lg:w-[520px] lg:py-20">
							<h3 className="heading-5 text-[18px] font-medium leading-8 tracking-[-0.18px]">
								Customize without compromise
							</h3>
							<p className="heading-5 text-fg-secondary text-[18px] font-medium leading-8 tracking-[-0.18px]">
								The Radian library extends the primitive component with
								meaningful properties for easier customization
							</p>
						</div>
						<div className="relative flex h-[260px] justify-center overflow-hidden md:h-[414px] lg:h-[430px]">
							<div className="shrink-0 origin-top scale-75 pt-2 focus:outline-none focus:ring-0 sm:scale-90 sm:pt-4 md:scale-100">
								<CreditCardUsageAnimation />
							</div>
							<div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[180px] bg-[linear-gradient(0deg,#FFF_0%,rgba(255,255,255,0)_100%)] dark:bg-[linear-gradient(0deg,oklch(0.144_0.003_264.025)_0%,oklch(0.144_0.003_264.025/0)_100%)]" />
						</div>
					</div>
					<div className="lg:flex-1">
						<div className="lg:px-15 flex w-full flex-col px-5 py-8 sm:px-10 sm:py-12 lg:w-[520px] lg:py-20">
							<h3 className="heading-5 text-[18px] font-medium leading-8 tracking-[-0.18px]">
								Built for the AI era
							</h3>
							<p className="heading-5 text-fg-secondary text-[18px] font-medium leading-8 tracking-[-0.18px]">
								Give your AI coding assistant a prompt and let it build with
								Radian&apos;s components, blocks, and design system
							</p>
						</div>

						<div className="relative flex h-[260px] justify-center overflow-hidden focus:outline-none focus:ring-0 md:h-[420px] lg:h-[430px]">
							<LibraryComponentsCard className="shrink-0 origin-top scale-75 sm:scale-90 md:scale-100" />
						</div>
					</div>
				</div>

				<div className="border-soft border-y">
					<div className="lg:px-15 lg:py-25 flex flex-col justify-between gap-3 px-5 py-12 sm:px-10 sm:py-16 lg:flex-row">
						<h3 className="heading-5 w-full text-[20px] font-medium leading-9 tracking-[-0.24px] sm:text-[24px] lg:w-[612px]">
							Seamless Design-to-Code Sync.{" "}
							<span className="text-fg-secondary">
								Variables and tokens in Figma Design File and Code use the same
								semantic for smooth development experience
							</span>
						</h3>

						<div className="hidden items-center gap-1 lg:flex lg:self-end">
							<p className="text-fg-tertiary text-base">Designer </p>
							<Dot size={24} />
							<p className="text-fg text-base">Developer</p>
						</div>
					</div>
					<div className="flex lg:hidden">
						<Tabs className="w-full gap-0" defaultValue={data[0].value}>
							<TabsList width="full" className="rounded-none p-0">
								{data.map((item) => (
									<TabsTrigger
										className="rounded-none"
										key={item.value}
										value={item.value}>
										{item.label}
									</TabsTrigger>
								))}
							</TabsList>
							{data.map(({ value }) => (
								<TabsContent className="rounded-none" key={value} value={value}>
									<div className="bg-fill1 relative h-[240px] overflow-hidden md:h-[430px] lg:h-[720px]">
										<div className="absolute bottom-[-5rem] left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 lg:bottom-[-7rem]">
											<Image
												width={1120}
												height={768}
												alt=""
												src="/newhome/Content.png"
											/>
										</div>
										<div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[48px] bg-[linear-gradient(0deg,#FFF_0%,rgba(255,255,255,0)_100%)] md:h-[100px] lg:h-[200px] dark:bg-[linear-gradient(0deg,oklch(0.144_0.003_264.025)_0%,oklch(0.144_0.003_264.025/0)_100%)]" />
									</div>
								</TabsContent>
							))}
						</Tabs>
					</div>
					<div className="bg-fill1 relative hidden h-[240px] overflow-hidden md:h-[430px] lg:flex lg:h-[720px]">
						<div className="absolute bottom-[-5rem] left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 lg:bottom-[-7rem]">
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

				<DiagonalDivider className="hidden sm:block" />
				<DiagonalDivider
					className="block sm:hidden"
					height={32}
					viewBox="0 0 1440 32"
				/>

				<div className="border-soft flex flex-col border-y lg:flex-row">
					<div className="border-soft overflow-hidden border-b lg:flex-1 lg:border-b-0 lg:border-r">
						<div className="lg:px-15 flex w-full flex-col px-5 py-8 sm:px-10 sm:py-12 lg:w-[520px] lg:py-20">
							<h3 className="heading-5 text-[18px] font-medium leading-8 tracking-[-0.18px]">
								Scalable Variable-first design system
							</h3>
							<p className="heading-5 text-fg-secondary text-[18px] font-medium leading-8 tracking-[-0.18px]">
								Fully designed for dark modes, typography, color, spacings &
								more
							</p>
						</div>
						<div className="relative h-[214px] md:h-[414px] lg:h-[430px]">
							<div className="scale-120 absolute bottom-[-20rem] left-1/2 -translate-x-1/2 -translate-y-1/2 md:bottom-[-9rem]">
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
					<div className="lg:flex-2">
						<div className="lg:px-15 flex w-full flex-col px-5 py-8 sm:px-10 sm:py-12 lg:w-[520px] lg:py-20">
							<h3 className="heading-5 text-[18px] font-medium leading-8 tracking-[-0.18px]">
								Copy-Paste Landing Page Blocks
							</h3>
							<p className="heading-5 text-fg-secondary text-[18px] font-medium leading-8 tracking-[-0.18px]">
								Growing Library of Pre-made responsive sections designed to snap
								together into full pages
							</p>
						</div>
						<div className="relative h-[214px] overflow-hidden md:h-[414px] lg:h-[430px]">
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
								className="lg:-translate-y-50 absolute left-1/2 top-1/2 z-10 -translate-x-1/2"
							/>
							<div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-[120px] bg-[linear-gradient(0deg,#FFF_0%,rgba(255,255,255,0)_100%)] dark:bg-[linear-gradient(0deg,oklch(0.144_0.003_264.025)_0%,oklch(0.144_0.003_264.025/0)_100%)]" />
						</div>
					</div>
				</div>

				<DiagonalDivider className="hidden sm:block" />
				<DiagonalDivider
					className="block sm:hidden"
					height={32}
					viewBox="0 0 1440 32"
				/>
			</div>
		</section>
	)
}

export default RapidDev
