import React from "react"
import { Dot } from "lucide-react"
import { CreditCardUsageAnimation } from "@/components/effects/credit-card-usage-animation"
import { LibraryDocsCard } from "@/components/home/rapid-dev/library-docs-card"
import { RapidDevAnimation } from "@/components/home/rapid-dev/rapid-dev-animation"
import { Badge, BadgeDot } from "@/registry/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import DiagonalDivider from "./SvgDivider"
import { Card7Canvas } from "./rapid-dev/card-7-canvas"
import { Card8Canvas } from "./rapid-dev/card-8-canvas"

const data = [
	{ label: "Designer", value: "designer" },
	{ label: "Developer", value: "developer" },
] as const

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
							<h3 className="heading-5 text-[16px] font-medium leading-7 tracking-[-0.18px] sm:text-[18px] sm:leading-8">
								Production-Ready Figma UI Kit.
							</h3>
							<p className="heading-5 text-fg-secondary text-[16px] font-medium leading-7 tracking-[-0.18px] sm:text-[18px] sm:leading-8">
								Get access to over 2000+ Components, 1000+ assets all built
								using smart auto layout and figma slots
							</p>
						</div>
						<div className="relative h-[214px] overflow-hidden md:h-[414px] lg:h-[430px]">
							<div className="flex scale-100 justify-center focus:outline-none focus:ring-0">
								<Card8Canvas />
							</div>
							<div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[120px] bg-[linear-gradient(0deg,#FFF_0%,rgba(255,255,255,0)_100%)] dark:bg-[linear-gradient(0deg,oklch(0.144_0.003_264.025)_0%,oklch(0.144_0.003_264.025/0)_100%)]" />
						</div>
					</div>
					<div className="lg:flex-1">
						<div className="lg:px-15 flex w-full flex-col px-5 py-8 sm:px-10 sm:py-12 lg:w-[520px] lg:py-20">
							<h3 className="heading-5 text-[16px] font-medium leading-7 tracking-[-0.18px] sm:text-[18px] sm:leading-8">
								A Complete Library of UI Primitives.
							</h3>
							<p className="heading-5 text-fg-secondary text-[16px] font-medium leading-7 tracking-[-0.18px] sm:text-[18px] sm:leading-8">
								Pre-styled 50+ React components built with Tailwind CSS to copy
								and paste
							</p>
						</div>
						<div
							className="relative h-[260px] overflow-hidden md:h-[414px] lg:h-[449px]"
							data-nosnippet
							aria-hidden="true">
							<div className="sm:scale-120 lg:scale-140 shrink-0 origin-top-left scale-95 px-5 focus:outline-none focus:ring-0 sm:px-10 md:scale-150 md:px-7 lg:px-11">
								<LibraryDocsCard />
							</div>
							<div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[120px] bg-[linear-gradient(0deg,#FFF_0%,rgba(255,255,255,0)_100%)] dark:bg-[linear-gradient(0deg,oklch(0.144_0.003_264.025)_0%,oklch(0.144_0.003_264.025/0)_100%)]" />
							<div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[80px] bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,#FFF_100%)] sm:w-[150px] md:w-[400px] lg:w-[200px] dark:bg-[linear-gradient(90deg,oklch(0.144_0.003_264.025/0)_0%,oklch(0.144_0.003_264.025)_100%)]" />
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
							<h3 className="heading-5 text-[16px] font-medium leading-7 tracking-[-0.18px] sm:text-[18px] sm:leading-8">
								Customize without compromise
							</h3>
							<p className="heading-5 text-fg-secondary text-[16px] font-medium leading-7 tracking-[-0.18px] sm:text-[18px] sm:leading-8">
								The Radian library extends the primitive component with
								meaningful properties for easier customization
							</p>
						</div>
						<div
							className="relative flex h-[260px] justify-center overflow-hidden md:h-[414px] lg:h-[430px]"
							data-nosnippet
							aria-hidden="true">
							<div className="shrink-0 origin-top scale-75 pt-2 focus:outline-none focus:ring-0 sm:scale-90 sm:pt-4 md:scale-100">
								<CreditCardUsageAnimation />
							</div>
							<div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[180px] bg-[linear-gradient(0deg,#FFF_0%,rgba(255,255,255,0)_100%)] dark:bg-[linear-gradient(0deg,oklch(0.144_0.003_264.025)_0%,oklch(0.144_0.003_264.025/0)_100%)]" />
						</div>
					</div>
					<div className="lg:flex-1">
						<div className="lg:px-15 flex w-full flex-col px-5 py-8 sm:px-10 sm:py-12 lg:w-[520px] lg:py-20">
							<h3 className="heading-5 text-[16px] font-medium leading-7 tracking-[-0.18px] sm:text-[18px] sm:leading-8">
								Built for the AI era
							</h3>
							<p className="heading-5 text-fg-secondary text-[16px] font-medium leading-7 tracking-[-0.18px] sm:text-[18px] sm:leading-8">
								Give your AI coding assistant a prompt and let it build with
								Radian&apos;s components, blocks, and design system
							</p>
						</div>

						<div
							className="relative flex h-[260px] justify-center overflow-hidden focus:outline-none focus:ring-0 md:h-[420px] lg:h-[430px]"
							data-nosnippet
							aria-hidden="true">
							{/* <LibraryComponentsCard className="shrink-0 origin-top scale-75 sm:scale-90 md:scale-100" /> */}
							<Card7Canvas />
						</div>
					</div>
				</div>

				<Tabs
					aria-label="Design and development animations"
					className="border-soft gap-0 border-y"
					defaultValue={data[0].value}>
					<div className="lg:px-15 lg:py-25 flex flex-col justify-between gap-3 px-5 py-12 sm:px-10 sm:py-16 lg:flex-row">
						<h3 className="heading-5 w-full text-[20px] font-medium leading-7 tracking-[-0.24px] sm:text-[24px] sm:leading-9 lg:w-[612px]">
							Seamless Design-to-Code Sync.{" "}
							<span className="text-fg-secondary">
								Variables and tokens in Figma Design File and Code use the same
								semantic for smooth development experience
							</span>
						</h3>

						<TabsList
							aria-label="Select animation"
							className="hidden h-auto items-center gap-1 overflow-visible bg-transparent p-0 lg:flex lg:self-end"
							variant="ghost">
							<TabsTrigger
								className="text-fg-tertiary data-[state=active]:text-fg h-auto rounded-none p-0 text-base data-[state=active]:bg-transparent"
								value="designer">
								Designer
							</TabsTrigger>
							<Dot aria-hidden="true" size={24} />
							<TabsTrigger
								className="text-fg-tertiary data-[state=active]:text-fg h-auto rounded-none p-0 text-base data-[state=active]:bg-transparent"
								value="developer">
								Developer
							</TabsTrigger>
						</TabsList>
					</div>

					<TabsList
						aria-label="Select animation"
						className="rounded-none p-0 lg:hidden"
						width="full">
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
							<RapidDevAnimation type={value} />
						</TabsContent>
					))}
				</Tabs>

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
