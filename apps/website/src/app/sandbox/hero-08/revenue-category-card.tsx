"use client"

import React, { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Info } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { Card, CardContent } from "@/styles/default/ui/card"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/styles/default/ui/tooltip"

import { Button } from "@/styles/default/ui/button"

interface CategoryMetric {
	id: string
	name: string
	percentage: number
	weeklyChange: string
	totalRevenue: string
	totalChange: string
}

const CATEGORIES: CategoryMetric[] = [
	{
		id: "services",
		name: "Services",
		percentage: 58,
		weeklyChange: "+2.1%",
		totalRevenue: "$12.4K total",
		totalChange: "+3.2%",
	},
	{
		id: "subscriptions",
		name: "Subscriptions",
		percentage: 74,
		weeklyChange: "+4.5%",
		totalRevenue: "$24.8K total",
		totalChange: "+5.1%",
	},
	{
		id: "licensing",
		name: "Licensing",
		percentage: 42,
		weeklyChange: "-1.4%",
		totalRevenue: "$9.6K total",
		totalChange: "+1.8%",
	},
]

// Exactly 37 vertical bars matching the reference design
const TOTAL_BARS = 37

export function RevenueCategoryCard({
	className = "",
	delay = 1.1,
}: {
	className?: string
	delay?: number
}) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		// Delay bar fill slightly so the card entrance settles first
		const timer = setTimeout(
			() => {
				setIsLoaded(true)
			},
			Math.round((delay + 0.15) * 1000)
		)
		return () => clearTimeout(timer)
	}, [delay])

	const currentCategory = CATEGORIES[currentIndex]
	const activeBarsCount = Math.round(
		(currentCategory.percentage / 100) * TOTAL_BARS
	)

	const handlePrev = (e: React.MouseEvent) => {
		e.stopPropagation()
		setCurrentIndex((prev) => (prev === 0 ? CATEGORIES.length - 1 : prev - 1))
	}

	const handleNext = (e: React.MouseEvent) => {
		e.stopPropagation()
		setCurrentIndex((prev) => (prev === CATEGORIES.length - 1 ? 0 : prev + 1))
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 14 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.5,
				delay,
				ease: [0.16, 1, 0.3, 1],
			}}
			className={`w-[336px] select-none sm:w-[346px] ${className}`}>
			<Card className="gap-0 rounded-[20px] border border-neutral-200/90 bg-white p-4.5 shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-shadow sm:p-5 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
				<CardContent className="flex flex-col gap-2.5 p-0">
					{/* Header Row */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-1.5">
							<span className="text-[13.5px] leading-none font-medium text-neutral-700 dark:text-neutral-300">
								Revenue by Category
							</span>
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										type="button"
										aria-label="Revenue category details"
										className="flex size-3.5 cursor-pointer items-center justify-center rounded-full bg-neutral-300 transition-colors hover:bg-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-600">
										<Info
											className="size-2 text-white dark:text-neutral-200"
											strokeWidth={2.5}
										/>
									</button>
								</TooltipTrigger>
								<TooltipContent side="top" className="text-xs">
									Net revenue distribution by active category
								</TooltipContent>
							</Tooltip>
						</div>

						<Button
							variant="outline"
							color="neutral"
							size="28"
							className="h-[24px] rounded-[7px] px-2 text-[11px] font-medium">
							Details
						</Button>
					</div>

					{/* Metrics Stat Row */}
					<div className="flex items-baseline gap-2 pt-0.5">
						<AnimatePresence mode="wait" initial={false}>
							<motion.span
								key={`stat-${currentCategory.id}`}
								initial={{ opacity: 0, y: 3 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -3 }}
								transition={{ duration: 0.15 }}
								className="text-[28px] leading-none font-bold tracking-tight text-neutral-950 sm:text-[30px] dark:text-white">
								{currentCategory.percentage}%
							</motion.span>
						</AnimatePresence>

						<AnimatePresence mode="wait" initial={false}>
							<motion.span
								key={`delta-${currentCategory.id}`}
								initial={{ opacity: 0, x: -2 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 2 }}
								transition={{ duration: 0.15 }}
								className="text-primary text-[13px] leading-none font-medium">
								{currentCategory.weeklyChange}
							</motion.span>
						</AnimatePresence>

						<span className="text-[13px] leading-none font-normal text-neutral-500 dark:text-neutral-400">
							from last week
						</span>
					</div>

					{/* Thin Vertical Segmented Progress Bars (37 Bars stretching edge-to-edge) */}
					<div
						className="my-0.5 flex h-[26px] w-full items-end gap-[2px] py-1 sm:gap-[2.5px]"
						role="meter"
						aria-valuenow={currentCategory.percentage}
						aria-valuemin={0}
						aria-valuemax={100}
						aria-label={`${currentCategory.name} revenue share`}>
						{Array.from({ length: TOTAL_BARS }).map((_, idx) => {
							const isActive = idx < activeBarsCount

							return (
								<motion.div
									key={`bar-${currentCategory.id}-${idx}`}
									initial={{ scaleY: 0 }}
									animate={{ scaleY: isLoaded ? 1 : 0 }}
									whileHover={{
										y: -3.5,
										transition: { duration: 0.12, ease: "easeOut" },
									}}
									whileTap={{ scaleY: 0.95 }}
									transition={{
										duration: 0.35,
										delay: idx * 0.008,
										ease: [0.16, 1, 0.3, 1],
									}}
									style={{ originY: 1 }}
									className={`h-[22px] min-w-0 flex-1 cursor-pointer rounded-[1.5px] transition-colors sm:h-[24px] ${
										isActive
											? "bg-primary hover:bg-primary/90"
											: "bg-neutral-200/90 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700"
									}`}
								/>
							)
						})}
					</div>

					{/* Bottom Footer Row */}
					<div className="flex items-center justify-between pt-0.5">
						{/* Category Selector with Chevrons */}
						<div className="flex items-center gap-2">
							<AnimatePresence mode="wait" initial={false}>
								<motion.span
									key={`cat-name-${currentCategory.id}`}
									initial={{ opacity: 0, x: -3 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: 3 }}
									transition={{ duration: 0.15 }}
									className="text-[13px] leading-none font-medium text-neutral-700 dark:text-neutral-300">
									{currentCategory.name}
								</motion.span>
							</AnimatePresence>

							{/* Segmented Switcher Pill */}
							<div className="flex h-[20px] w-[38px] items-center rounded-[5px] border border-neutral-200 bg-neutral-50/50 dark:border-neutral-700 dark:bg-neutral-800/50">
								<button
									type="button"
									onClick={handlePrev}
									aria-label="Previous category"
									className="flex h-full flex-1 cursor-pointer items-center justify-center rounded-l-[4px] text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-white">
									<ChevronLeft className="size-2.5" strokeWidth={2.5} />
								</button>
								<div className="h-2.5 w-px bg-neutral-200 dark:bg-neutral-700" />
								<button
									type="button"
									onClick={handleNext}
									aria-label="Next category"
									className="flex h-full flex-1 cursor-pointer items-center justify-center rounded-r-[4px] text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-white">
									<ChevronRight className="size-2.5" strokeWidth={2.5} />
								</button>
							</div>
						</div>

						{/* Total Revenue & Change */}
						<div className="flex items-center gap-1.5 text-[12.5px] font-medium">
							<AnimatePresence mode="wait" initial={false}>
								<motion.span
									key={`tot-rev-${currentCategory.id}`}
									initial={{ opacity: 0, y: 2 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -2 }}
									transition={{ duration: 0.15 }}
									className="text-neutral-700 dark:text-neutral-300">
									{currentCategory.totalRevenue}
								</motion.span>
							</AnimatePresence>
							<span className="text-neutral-400 dark:text-neutral-600">·</span>
							<AnimatePresence mode="wait" initial={false}>
								<motion.span
									key={`tot-chg-${currentCategory.id}`}
									initial={{ opacity: 0, y: 2 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -2 }}
									transition={{ duration: 0.15 }}
									className="text-primary">
									{currentCategory.totalChange}
								</motion.span>
							</AnimatePresence>
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	)
}
