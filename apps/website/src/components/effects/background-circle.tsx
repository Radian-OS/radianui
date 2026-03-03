"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface BackgroundCirclesProps {
	className?: string
	variant?: keyof typeof COLOR_VARIANTS
	children?: React.ReactNode
}

const COLOR_VARIANTS = {
	primary: {
		border: [
			"border-emerald-500/60",
			"border-cyan-400/50",
			"border-slate-600/30",
		],
		gradient: "from-emerald-500/30",
	},
	secondary: {
		border: [
			"border-violet-500/60",
			"border-fuchsia-400/50",
			"border-slate-600/30",
		],
		gradient: "from-violet-500/30",
	},
	tertiary: {
		border: [
			"border-orange-500/60",
			"border-yellow-400/50",
			"border-slate-600/30",
		],
		gradient: "from-orange-500/30",
	},
	quaternary: {
		border: [
			"border-purple-500/60",
			"border-pink-400/50",
			"border-slate-600/30",
		],
		gradient: "from-purple-500/30",
	},
	quinary: {
		border: ["border-red-500/60", "border-rose-400/50", "border-slate-600/30"],
		gradient: "from-red-500/30",
	},
	senary: {
		border: ["border-blue-500/60", "border-sky-400/50", "border-slate-600/30"],
		gradient: "from-blue-500/30",
	},
	septenary: {
		border: ["border-gray-500/60", "border-gray-400/50", "border-slate-600/30"],
		gradient: "from-gray-500/30",
	},
	octonary: {
		border: ["border-red-500/60", "border-rose-400/50", "border-slate-600/30"],
		gradient: "from-red-500/30",
	},
} as const

export function BackgroundCircles({
	className,
	variant = "octonary",
	children,
}: BackgroundCirclesProps) {
	const variantStyles = COLOR_VARIANTS[variant]

	return (
		<div
			className={cn(
				"relative flex h-screen w-full items-center justify-center overflow-hidden",
				"bg-white dark:bg-black/5",
				className
			)}>
			<motion.div className="absolute h-[400px] max-h-[80vh] w-[400px] max-w-[80vw] tracking-tight">
				{[0, 1, 2].map((i) => (
					<motion.div
						key={i}
						className={cn(
							"absolute inset-0 rounded-full",
							"border-2 bg-gradient-to-br to-transparent",
							variantStyles.border[i],
							variantStyles.gradient
						)}
						animate={{
							rotate: 360,
							scale: [1, 1.05 + i * 0.05, 1],
							opacity: [0.8, 1, 0.8],
						}}
						transition={{
							duration: 5,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}>
						<div
							className={cn(
								"absolute inset-0 rounded-full mix-blend-screen",
								`bg-[radial-gradient(ellipse_at_center,${variantStyles.gradient.replace("from-", "")}/10%,transparent_70%)]`
							)}
						/>
					</motion.div>
				))}
			</motion.div>

			<motion.div
				className="relative z-10 text-center"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}>
				{children}
				{/* <h1
					className={cn(
						"text-5xl font-bold tracking-tight md:text-7xl",
						"bg-gradient-to-b from-slate-950 to-slate-700 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-300",
						"drop-shadow-[0_0_32px_rgba(94,234,212,0.4)]"
					)}>
					{title}
				</h1>

				<motion.p className="mt-6 text-lg text-slate-950 md:text-xl dark:text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
					{description}
					<span className="mx-3 opacity-50">·</span>
					shadcn.io
				</motion.p> */}
			</motion.div>

			<div className="absolute inset-0 [mask-image:radial-gradient(90%_60%_at_50%_50%,#000_40%,transparent)]">
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0F766E/30%,transparent_70%)] blur-[120px]" />
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#2DD4BF/15%,transparent)] blur-[80px]" />
			</div>
		</div>
	)
}

export function DemoCircles() {
	const [currentVariant, setCurrentVariant] =
		useState<keyof typeof COLOR_VARIANTS>("octonary")

	const variants = Object.keys(
		COLOR_VARIANTS
	) as (keyof typeof COLOR_VARIANTS)[]

	function getNextVariant() {
		const currentIndex = variants.indexOf(currentVariant)
		const nextVariant = variants[(currentIndex + 1) % variants.length]
		return nextVariant
	}

	return (
		<>
			<BackgroundCircles variant={currentVariant} />
			<div className="absolute right-12 top-12">
				<button
					type="button"
					className="z-10 rounded-md bg-slate-950 px-4 py-1 text-sm font-medium text-white dark:bg-white dark:text-slate-950"
					onClick={() => {
						setCurrentVariant(getNextVariant())
					}}>
					Change Variant
				</button>
			</div>
		</>
	)
}

export type { BackgroundCirclesProps }
export { COLOR_VARIANTS }
