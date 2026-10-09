"use client"

import React, { useState, useEffect, useRef } from "react"
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

function useAnimatedCounter(
	target: number,
	isStarted: boolean,
	isFullyInitialized: boolean
) {
	const [value, setValue] = useState(0)
	const prevValRef = useRef(0)

	useEffect(() => {
		if (!isStarted) return

		const startVal = isFullyInitialized ? prevValRef.current : 0
		const endVal = target
		const duration = isFullyInitialized ? 200 : 380
		let startTime: number | null = null
		let animId: number

		const step = (timestamp: number) => {
			if (!startTime) startTime = timestamp
			const elapsed = timestamp - startTime
			const progress = Math.min(elapsed / duration, 1)
			// Smooth ease-out quad for brisk, lively count-up
			const ease = 1 - Math.pow(1 - progress, 2.5)
			const current = Math.round(startVal + (endVal - startVal) * ease)
			setValue(current)

			if (progress < 1) {
				animId = requestAnimationFrame(step)
			} else {
				prevValRef.current = endVal
			}
		}

		animId = requestAnimationFrame(step)
		return () => cancelAnimationFrame(animId)
	}, [target, isStarted, isFullyInitialized])

	return isStarted ? value : 0
}

export function RevenueCategoryCard({
	className = "",
	cardEntranceDelay = 0.8,
}: {
	className?: string
	cardEntranceDelay?: number
}) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [cardSettled, setCardSettled] = useState(false)
	const [chartActive, setChartActive] = useState(false)
	const [footerActive, setFooterActive] = useState(false)
	const [isFullyInitialized, setIsFullyInitialized] = useState(false)

	useEffect(() => {
		// 1. As the card lands, immediately start counter and bar fill with zero pause at 0%
		const startTimer = setTimeout(
			() => {
				setCardSettled(true)
				setChartActive(true)
			},
			Math.round((cardEntranceDelay + 0.28) * 1000)
		)

		// 2. Revenue numbers highlight as bars and counter finish
		const footerTimer = setTimeout(
			() => {
				setFooterActive(true)
			},
			Math.round((cardEntranceDelay + 0.68) * 1000)
		)

		// 3. Mark full initial sequence as complete
		const initTimer = setTimeout(
			() => {
				setIsFullyInitialized(true)
			},
			Math.round((cardEntranceDelay + 0.85) * 1000)
		)

		return () => {
			clearTimeout(startTimer)
			clearTimeout(footerTimer)
			clearTimeout(initTimer)
		}
	}, [cardEntranceDelay])

	const currentCategory = CATEGORIES[currentIndex]
	const activeBarsCount = Math.round(
		(currentCategory.percentage / 100) * TOTAL_BARS
	)

	// Animated count-up for percentage
	const displayedPercentage = useAnimatedCounter(
		currentCategory.percentage,
		cardSettled,
		isFullyInitialized
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
			initial={{ opacity: 0, x: 60 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{
				duration: 0.42,
				delay: cardEntranceDelay,
				ease: [0.16, 1, 0.3, 1],
			}}
			className={`w-[336px] select-none sm:w-[346px] ${className}`}>
			<Card className="gap-0 rounded-[20px] border border-neutral-200/90 bg-white p-4.5 shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-shadow sm:p-5 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
				<CardContent className="flex flex-col gap-2.5 p-0">
					{/* Header Row — Visible with card content */}
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

					{/* Metrics Stat Row — Visible with card, counter counts up briskly without pause */}
					<div className="flex items-baseline gap-2 pt-0.5">
						<span className="text-[28px] leading-none font-bold tracking-tight text-neutral-950 sm:text-[30px] dark:text-white">
							{displayedPercentage}%
						</span>

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

					{/* 37 Segmented Bar Slots — Visible tracks, purple bars fill from left to right */}
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
								<div
									key={`bar-${currentCategory.id}-${idx}`}
									className="relative h-[22px] min-w-0 flex-1 overflow-hidden rounded-[1.5px] bg-neutral-200/80 sm:h-[24px] dark:bg-neutral-800">
									{isActive && (
										<motion.div
											initial={{ scaleY: 0 }}
											animate={{ scaleY: chartActive ? 1 : 0 }}
											style={{ originY: 1 }}
											transition={{
												duration: 0.25,
												delay: isFullyInitialized ? 0 : idx * 0.011,
												ease: [0.16, 1, 0.3, 1],
											}}
											className="bg-primary hover:bg-primary/90 size-full rounded-[1.5px] transition-colors"
										/>
									)}
								</div>
							)
						})}
					</div>

					{/* Bottom Footer Row — Visible with card, revenue numbers highlight after bars fill */}
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

						{/* Total Revenue & Change Numbers */}
						<motion.div
							animate={footerActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
							transition={{ duration: 0.35, ease: "easeOut" }}
							className="flex items-center gap-1.5 text-[12.5px] font-medium">
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
						</motion.div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	)
}
