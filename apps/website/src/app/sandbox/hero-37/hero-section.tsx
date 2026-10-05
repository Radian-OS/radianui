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
			className="relative w-full overflow-x-hidden">
			{/* Ambient Top Light Gradient Tint - very light and subtle matching reference */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[600px] overflow-hidden [mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)] opacity-30 [-webkit-mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)] sm:h-[680px] dark:opacity-20">
				<div
					className="absolute -top-32 -left-[12%] h-96 w-[58%] origin-top rounded-[50%] blur-[100px]"
					style={{ backgroundColor: "rgba(252, 211, 77, 0.40)" }}
				/>
				<div
					className="absolute -top-36 left-[22%] h-96 w-[56%] origin-top rounded-[50%] blur-[100px]"
					style={{ backgroundColor: "rgba(251, 146, 60, 0.25)" }}
				/>
				<div
					className="absolute -top-32 -right-[12%] h-96 w-[58%] origin-top rounded-[50%] blur-[100px]"
					style={{ backgroundColor: "rgba(59, 130, 246, 0.35)" }}
				/>
			</div>

			{/* Centered Content Container */}
			<motion.div
				initial="hidden"
				animate="show"
				variants={containerVariants}
				className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 pt-32 pb-8 text-center sm:px-8 sm:pt-40 lg:px-16">
				{/* Transparent Badge */}
				<motion.div variants={itemVariants}>
					<span className="border-fg/10 text-fg inline-flex w-fit items-center justify-center rounded-full border bg-transparent px-3 py-1 text-sm font-normal">
						{badge}
					</span>
				</motion.div>

				{/* 2-Line Headline matching reference: 60px and 500 weight */}
				<motion.h1
					variants={itemVariants}
					className="text-fg max-w-4xl text-4xl leading-tight font-medium tracking-tight sm:text-5xl sm:leading-[1.1] lg:text-6xl">
					Choose your favorite AI models.
					<br className="hidden sm:inline" /> We have them on the same line.
				</motion.h1>

				{/* Description Paragraph */}
				<motion.p
					variants={itemVariants}
					className="text-fg-secondary max-w-xl text-base leading-relaxed">
					{description}
				</motion.p>

				{/* CTA Buttons */}
				<motion.div
					variants={itemVariants}
					className="flex flex-wrap items-center justify-center gap-4">
					<Button
						variant="strong"
						color="primary"
						size="40"
						asChild
						className="group cursor-pointer gap-1.5 rounded-lg bg-blue-500 px-5 font-medium text-white shadow-xs transition-colors hover:bg-blue-500/80 active:scale-98">
						<Link href={primaryCta.href}>
							<span>{primaryCta.label}</span>
							<ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
						</Link>
					</Button>

					<VideoDialog label={secondaryCta.label} videoUrl={videoUrl} />
				</motion.div>
			</motion.div>

			{/* Full Width Edge-to-Edge Swing Cards - Not trapped inside max-w-7xl */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, delay: 0.25 }}
				className="relative z-10 w-full overflow-hidden pb-8">
				<SwingLine items={items} />
			</motion.div>
		</section>
	)
}
