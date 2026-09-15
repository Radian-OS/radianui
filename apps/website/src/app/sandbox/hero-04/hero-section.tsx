"use client"

import React from "react"
import { ArrowUpRight, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/styles/default/ui/badge"
import { Button } from "@/styles/default/ui/button"

const featureBulletPoints = [
	"View real-time cash flow",
	"Compare monthly expenses",
	"Identify high-risk categories",
]

const socialProofAvatars = [
	{
		id: "1",
		src: "https://alignui.com/images/blocks/hero-3-avatar-1.png",
		alt: "Founder 1",
	},
	{
		id: "2",
		src: "https://alignui.com/images/blocks/hero-3-avatar-2.png",
		alt: "Founder 2",
	},
	{
		id: "3",
		src: "https://alignui.com/images/blocks/hero-3-avatar-3.png",
		alt: "Founder 3",
	},
	{
		id: "4",
		src: "https://alignui.com/images/blocks/hero-3-avatar-4.png",
		alt: "Founder 4",
	},
	{
		id: "5",
		src: "https://alignui.com/images/blocks/hero-3-avatar-5.png",
		alt: "Founder 5",
	},
	{
		id: "6",
		src: "https://alignui.com/images/blocks/hero-3-avatar-6.png",
		alt: "Founder 6",
	},
]

export function HeroSection() {
	return (
		<section className="relative overflow-hidden py-12 md:py-16 lg:py-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-14">
					{/* Left Column: Hero Content */}
					<div className="lg:border-border/60 relative flex flex-col justify-center lg:col-span-6 lg:border-l lg:pl-10 xl:col-span-6 xl:pl-14">
						{/* Vertical Blue Accent Line */}
						<div
							aria-hidden="true"
							className="bg-primary absolute -left-[1.5px] top-10 hidden h-32 w-1 rounded-full lg:block"
						/>

						{/* Tag Pill Badge */}
						<div className="bg-elevation-level1 border-border/60 mb-5 flex w-fit items-center gap-2 rounded-full border py-1 pl-1.5 pr-3 transition-colors">
							<Badge
								variant="strong"
								color="primary"
								size="20"
								className="rounded-full px-2 text-[10px] font-semibold uppercase tracking-wider">
								NEW
							</Badge>
							<span className="text-fg-muted text-xs font-medium">
								All-in-one analytics for growth
							</span>
						</div>

						{/* Main Heading (Rule 9: heading-1) */}
						<h1 className="heading-1 text-fg mb-4 tracking-tight">
							Track your finances with live analytics in one place
						</h1>

						{/* Subheading */}
						<p className="text-fg-muted mb-6 text-base leading-relaxed sm:text-lg">
							Monitor income, forecast trends, and categorize expenses{" "}
							<span className="text-fg font-medium">
								across every account — all in real time.
							</span>
						</p>

						{/* Bullet Points List */}
						<div className="mb-8 flex flex-col gap-3.5">
							{featureBulletPoints.map((text) => (
								<div key={text} className="flex items-center gap-3">
									<CheckCircle2 className="text-primary size-5 shrink-0" />
									<span className="text-fg-muted text-sm font-normal sm:text-base">
										{text}
									</span>
								</div>
							))}
						</div>

						{/* CTA Buttons */}
						<div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
							<Button
								variant="strong"
								color="primary"
								size="44"
								className="w-full gap-2 rounded-xl px-5 text-sm font-semibold sm:w-auto">
								<span>Start tracking free</span>
								<ArrowUpRight className="size-4" />
							</Button>
							<Button
								variant="outline"
								color="neutral"
								size="44"
								className="w-full rounded-xl px-5 text-sm font-semibold sm:w-auto">
								Talk to finance team
							</Button>
						</div>

						{/* Social Proof Row */}
						<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
							<div className="flex items-center">
								{socialProofAvatars.map((avatar, idx) => (
									<div
										key={avatar.id}
										className={`border-bg relative size-6 shrink-0 overflow-hidden rounded-full border-2 ${
											idx > 0 ? "-ml-2" : ""
										}`}>
										<Image
											src={avatar.src}
											alt={avatar.alt}
											width={24}
											height={24}
											className="size-full object-cover"
										/>
									</div>
								))}
							</div>
							<div className="text-fg-muted text-xs sm:text-sm">
								<span className="text-fg-muted/60 hidden sm:inline">— </span>
								rated <span className="text-fg font-medium">4.8/5</span> by 200+
								SMB founders
							</div>
						</div>
					</div>

					{/* Right Column: Hero Visual Mockup Image */}
					<div className="flex justify-center lg:col-span-6 xl:col-span-6">
						<div className="relative w-full max-w-[560px]">
							{/* Desktop Image */}
							<Image
								src="https://alignui.com/images/blocks/hero-4-image-1.png"
								alt="Hero analytics dashboard preview with live revenue metrics"
								width={560}
								height={600}
								priority
								className="hidden h-auto w-full object-contain md:block"
							/>
							{/* Mobile Image */}
							<Image
								src="https://alignui.com/images/blocks/hero-4-image-1-mobile.png"
								alt="Hero analytics dashboard preview with live revenue metrics"
								width={358}
								height={448}
								priority
								className="mx-auto block h-auto w-full max-w-[400px] object-contain md:hidden"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
