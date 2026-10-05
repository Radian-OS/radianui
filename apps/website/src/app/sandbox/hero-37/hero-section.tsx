"use client"

import React, { useRef } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion, useInView } from "motion/react"
import { Button } from "@/styles/default/ui/button"
import { DEFAULT_MODELS } from "./data"
import { SwingLine } from "./swing-line"
import type { Hero37Props } from "./types"
import { VideoDialog } from "./video-dialog"

const itemVariants = {
	hidden: { opacity: 0, y: 16 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
	},
}

const containerVariants = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.05,
		},
	},
}

export function HeroSection({
	badge = "Open source",
	heading = "Choose your favorite AI models.\nWe have them on the same line.",
	description = "Plug in the models you already use. We handle the rest - with smooth physics, intelligent physics, and an interface that lets you play with them instantly.",
	primaryCta = { label: "Get Started", href: "#get-started" },
	secondaryCta = { label: "Watch demo" },
	videoUrl = "https://www.youtube.com/embed/ymTlzbkvvPk?controls=0",
	items = DEFAULT_MODELS,
}: Hero37Props) {
	const sectionRef = useRef<HTMLElement>(null)
	const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

	return (
		<section
			ref={sectionRef}
			id="hero"
			className="relative w-full overflow-x-hidden pt-24 pb-6 sm:pt-28 sm:pb-8">
			{/* Subtle warm cream-to-blue gradient fading into background */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[480px] overflow-hidden mask-[linear-gradient(to_bottom,black_40%,transparent_100%)] opacity-40">
				<div className="bg-warning/20 absolute -top-36 -left-[10%] h-[400px] w-[50%] rounded-[50%] blur-[95px]" />
				<div className="bg-warning-accent/15 absolute -top-36 left-[20%] h-[380px] w-[45%] rounded-[50%] blur-[95px]" />
				<div className="bg-primary/20 absolute -top-36 -right-[10%] h-[400px] w-[50%] rounded-[50%] blur-[95px]" />
			</div>

			<div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 text-center sm:px-8 lg:px-16">
				{/* Content Motion Container */}
				<motion.div
					initial="hidden"
					animate={isInView ? "show" : "hidden"}
					variants={containerVariants}
					className="flex max-w-4xl flex-col items-center gap-3.5 sm:gap-4">
					{/* Badge */}
					<motion.div variants={itemVariants}>
						<span className="border-border/80 bg-card/70 text-fg inline-flex items-center justify-center rounded-full border px-3.5 py-0.5 text-xs font-normal shadow-2xs backdrop-blur-xs sm:text-sm">
							{badge}
						</span>
					</motion.div>

					{/* 2-Line Headline matching reference proportions and medium weight */}
					<motion.h1
						variants={itemVariants}
						className="heading-2 text-fg max-w-4xl text-center whitespace-normal">
						Choose your favorite AI models.
						<br />
						We have them on the same line.
					</motion.h1>

					{/* 2-Line Description Paragraph */}
					<motion.p
						variants={itemVariants}
						className="text-fg-secondary max-w-xl text-sm leading-relaxed sm:text-base">
						{description}
					</motion.p>

					{/* Compact CTA Buttons */}
					<motion.div
						variants={itemVariants}
						className="mt-1 flex flex-wrap items-center justify-center gap-3.5">
						<Button
							variant="strong"
							color="primary"
							size="40"
							asChild
							className="group gap-1.5 rounded-lg px-5">
							<Link href={primaryCta.href}>
								<span>{primaryCta.label}</span>
								<ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
							</Link>
						</Button>

						<VideoDialog label={secondaryCta.label} videoUrl={videoUrl} />
					</motion.div>
				</motion.div>
			</div>

			{/* Interactive AI Model Cards Hanging Immediately Below CTAs */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
				transition={{ duration: 0.7, delay: 0.25 }}
				className="relative mt-4 w-full sm:mt-6">
				<SwingLine items={items} />
			</motion.div>
		</section>
	)
}
