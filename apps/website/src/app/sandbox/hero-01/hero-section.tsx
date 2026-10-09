"use client"

import React, { useRef } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"
import { Button } from "@/styles/default/ui/button"
import { Badge } from "@/registry/ui/badge"
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
	badge = "Radian UI",
	description = "Plug in the models you already use. We handle the rest with smooth animations, intelligent components, and an interface that lets you build instantly.",
	primaryCta = { label: "Get Started", href: "#get-started" },
	secondaryCta = { label: "Watch demo" },
	videoUrl = "https://www.youtube.com/embed/XeYZ6IauaMc?controls=0",
	items = DEFAULT_MODELS,
}: Hero37Props) {
	const sectionRef = useRef<HTMLElement>(null)

	return (
		<section
			ref={sectionRef}
			id="hero"
			className="relative w-full overflow-x-hidden">
			{/* Ambient Top Light Gradient Tint - very light and subtle matching reference */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[600px] overflow-hidden [mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)] opacity-30 [-webkit-mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)] sm:h-[680px] dark:opacity-20">
				<div className="bg-warning/40 absolute -top-32 -left-[12%] h-96 w-[58%] origin-top rounded-[50%] blur-[100px]" />
				<div className="bg-danger/25 absolute -top-36 left-[22%] h-96 w-[56%] origin-top rounded-[50%] blur-[100px]" />
				<div className="bg-info/35 absolute -top-32 -right-[12%] h-96 w-[58%] origin-top rounded-[50%] blur-[100px]" />
			</div>

			{/* Centered Content Container */}
			<motion.div
				initial="hidden"
				animate="show"
				variants={containerVariants}
				className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 pt-32 pb-8 text-center sm:px-8 sm:pt-40 lg:px-16">
				{/* Transparent Badge */}
				<motion.div variants={itemVariants}>
					<Badge>{badge}</Badge>
				</motion.div>

				{/* 2-Line Headline matching reference: 60px and 500 weight */}
				<motion.h1 variants={itemVariants} className="heading-2 max-w-4xl">
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
					<Button asChild className="group cursor-pointer">
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
