"use client"

import React from "react"
import { ArrowUpRight, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { motion } from "motion/react"
import { Button } from "@/styles/default/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import { RevenueCategoryCard } from "./revenue-category-card"

function getInitials(name: string) {
	const parts = name.trim().split(" ")
	if (parts.length === 1) {
		return parts[0][0]?.toUpperCase() ?? ""
	}
	return (
		(parts[0][0]?.toUpperCase() ?? "") +
		(parts[parts.length - 1][0]?.toUpperCase() ?? "")
	)
}

const featureBulletPoints = [
	"View real-time cash flow",
	"Compare monthly expenses",
	"Identify high-risk categories",
]

const socialProofAvatars = [
	{
		id: "1",
		src: "/sandbox/hero-founder-1.png",
		alt: "Founder 1",
	},
	{
		id: "2",
		src: "/sandbox/hero-founder-2.png",
		alt: "Founder 2",
	},
	{
		id: "3",
		src: "/sandbox/hero-founder-3.png",
		alt: "Founder 3",
	},
	{
		id: "4",
		src: "/sandbox/hero-founder-4.png",
		alt: "Founder 4",
	},
	{
		id: "5",
		src: "/sandbox/hero-founder-5.png",
		alt: "Founder 5",
	},
	{
		id: "6",
		src: "/sandbox/hero-founder-6.png",
		alt: "Founder 6",
	},
]

export function HeroSection() {
	return (
		<section className="relative overflow-hidden py-12 md:py-16 lg:py-20">
			<div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-10">
					{/* Left Column: Hero Content */}
					<div className="border-border/60 relative flex flex-col justify-center lg:col-span-6 lg:border-l lg:pl-10 xl:col-span-6 xl:pl-14">
						{/* Vertical Accent Line */}
						<motion.div
							aria-hidden="true"
							initial={{ scaleY: 0, opacity: 0 }}
							animate={{ scaleY: 1, opacity: 1 }}
							transition={{
								duration: 0.45,
								delay: 0.05,
								ease: [0.16, 1, 0.3, 1],
							}}
							style={{ originY: 0 }}
							className="bg-primary absolute top-1 -left-[1.25px] hidden h-[175px] w-[2.5px] rounded-full sm:h-[180px] lg:block lg:h-[185px]"
						/>

						{/* 1. Badge — Blur fade-up from down */}
						<motion.div
							initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
							animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
							transition={{
								duration: 0.55,
								delay: 0.08,
								ease: [0.16, 1, 0.3, 1],
							}}>
							<div className="border-border/40 mb-5 flex w-fit items-center gap-2 rounded-full border bg-neutral-100/90 py-1 pr-3.5 pl-1.5 transition-colors dark:bg-neutral-800/80">
								<span className="text-primary rounded-full bg-white px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase shadow-xs dark:bg-neutral-900">
									NEW
								</span>
								<span className="text-xs font-medium text-neutral-600 sm:text-[13px] dark:text-neutral-300">
									All-in-one analytics for growth
								</span>
							</div>
						</motion.div>

						{/* 2. Headline — Blur fade-up from down */}
						<motion.div
							initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
							animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
							transition={{
								duration: 0.55,
								delay: 0.12,
								ease: [0.16, 1, 0.3, 1],
							}}>
							<h1
								style={{ fontWeight: 550 }}
								className="text-fg mb-5 max-w-[530px] text-4xl leading-[1.1] font-[550] tracking-[-0.03em] sm:text-5xl lg:text-[56px] xl:max-w-[560px]">
								Track your finances with live analytics in one place
							</h1>
						</motion.div>

						{/* 3. Description — Blur fade-up from down */}
						<motion.div
							initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
							animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
							transition={{
								duration: 0.55,
								delay: 0.16,
								ease: [0.16, 1, 0.3, 1],
							}}>
							<p className="mb-7 max-w-[480px] text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-400">
								Monitor income, forecast trends, and categorize expenses across
								every account — all in real time.
							</p>
						</motion.div>

						{/* 4. Feature List — Blur fade-up from down */}
						<motion.div
							initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
							animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
							transition={{
								duration: 0.55,
								delay: 0.2,
								ease: [0.16, 1, 0.3, 1],
							}}>
							<div className="mb-8 flex flex-col gap-3.5">
								{featureBulletPoints.map((text) => (
									<div key={text} className="flex items-center gap-3">
										<CheckCircle2
											className="fill-primary text-primary-fg size-5 shrink-0"
											strokeWidth={2.5}
										/>
										<span className="text-sm font-normal text-neutral-700 sm:text-base dark:text-neutral-300">
											{text}
										</span>
									</div>
								))}
							</div>
						</motion.div>

						{/* 5. Buttons — Blur fade-up from down */}
						<motion.div
							initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
							animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
							transition={{
								duration: 0.55,
								delay: 0.24,
								ease: [0.16, 1, 0.3, 1],
							}}>
							<div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
								<Button
									variant="strong"
									color="primary"
									size="40"
									className="h-10 w-full gap-2 rounded-xl px-4.5 font-medium sm:w-auto">
									<span>Start tracking free</span>
									<ArrowUpRight className="size-4" />
								</Button>
								<Button
									variant="soft"
									color="neutral"
									size="40"
									className="h-10 w-full rounded-xl px-4.5 font-medium sm:w-auto">
									Talk to finance team
								</Button>
							</div>
						</motion.div>

						{/* 6. Social Proof Section — Blur fade-up from down */}
						<motion.div
							initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
							animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
							transition={{
								duration: 0.55,
								delay: 0.28,
								ease: [0.16, 1, 0.3, 1],
							}}>
							<div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
								{socialProofAvatars.map((avatar) => (
									<Avatar
										key={avatar.id}
										size="32"
										rounded="circle"
										className="border-bg bg-bg shrink-0 border-2 contrast-110 grayscale">
										<AvatarImage src={avatar.src} alt={avatar.alt} />
										<AvatarFallback className="text-xs font-semibold">
											{getInitials(avatar.alt)}
										</AvatarFallback>
									</Avatar>
								))}
								<Avatar
									size="32"
									rounded="circle"
									className="border-bg shrink-0 border-4 hover:z-10">
									<AvatarFallback className="text-xs font-semibold">
										+9
									</AvatarFallback>
								</Avatar>
								<p className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
									— rated 4.8/5 by 200+ SMB founders
								</p>
							</div>
						</motion.div>
					</div>

					{/* Right Column: Hero Visual Graphic with Hero Image & Floating Analytics Card */}
					<div className="flex items-center justify-center self-center lg:col-span-6 xl:col-span-6">
						<div className="relative w-full max-w-[480px] sm:max-w-[500px] xl:max-w-[530px]">
							{/* Hero Image — Blur fade-up from down together with hero content */}
							<motion.div
								initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
								animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
								transition={{
									duration: 0.55,
									delay: 0.16,
									ease: [0.16, 1, 0.3, 1],
								}}>
								<Image
									src="/sandbox/hero-04-woman-clean-v2.png"
									alt="Hero analytics dashboard preview with live revenue metrics"
									width={620}
									height={640}
									priority
									className="h-auto w-full object-contain"
								/>
							</motion.div>

							{/* Floating Analytics Card — Slides in from right ONLY after all hero content and logos have revealed */}
							<div className="absolute -right-2 bottom-10 z-20 sm:-right-4 sm:bottom-14 md:-right-6 md:bottom-16 lg:-right-8 lg:bottom-20">
								<RevenueCategoryCard cardEntranceDelay={0.8} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
