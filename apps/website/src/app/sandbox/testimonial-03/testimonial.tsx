"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import data from "./data.json"

export function TestimonialSection() {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [pauseOnHover, setPauseOnHover] = useState(false)
	const [startX, setStartX] = useState(0)
	const [endX, setEndX] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			if (pauseOnHover) return
			setCurrentIndex((prev) => (prev + 1) % data.testimonials.length)
		}, 8000)

		return () => clearInterval(interval)
	}, [pauseOnHover])

	const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
		setStartX(e.targetTouches[0].clientX)
	}

	const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
		setEndX(e.targetTouches[0].clientX)
	}

	const handleTouchEnd = () => {
		handleSwipe()
	}

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		setStartX(e.clientX)
	}

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (startX !== 0) {
			setEndX(e.clientX)
		}
	}

	const handleMouseUp = () => {
		handleSwipe()
		setStartX(0)
	}

	const handleSwipe = () => {
		if (startX - endX > 80) {
			setCurrentIndex((prev) => (prev + 1) % data.testimonials.length)
		} else if (endX - startX > 80) {
			setCurrentIndex((prev) =>
				prev === 0 ? data.testimonials.length - 1 : prev - 1
			)
		}
	}

	const current = data.testimonials[currentIndex]

	return (
		<div className="mx-auto max-w-screen-xl px-5 py-8 sm:px-6 md:py-15">
			<div
				onMouseEnter={() => setPauseOnHover(true)}
				onMouseLeave={() => setPauseOnHover(false)}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				className="border-border bg-bg relative flex flex-col-reverse overflow-hidden rounded-2xl border select-none lg:flex-row">
				{/* Content Panel */}
				<div className="flex flex-col items-start justify-center gap-6 p-6 sm:gap-8 sm:p-10 lg:w-3/5 lg:p-16">
					<div className="h-8">
						<img
							className="h-full w-auto object-contain dark:brightness-200"
							src={current.logo}
							alt="Company Logo"
						/>
					</div>

					<AnimatePresence mode="wait">
						<motion.div
							key={currentIndex}
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -12 }}
							transition={{ duration: 0.35, ease: "easeOut" }}
							className="flex flex-col gap-6">
							<p className="text-fg text-lg font-medium sm:text-xl md:text-2xl">
								{current.text}
							</p>

							<div className="flex flex-col gap-1">
								<h3 className="text-fg text-base font-semibold">
									{current.author}
								</h3>
								<p className="text-fg-secondary text-sm">{current.position}</p>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>

				{/* Featured Image Panel */}
				<div className="relative h-72 w-full overflow-hidden sm:h-96 lg:h-135 lg:w-2/5">
					<AnimatePresence mode="wait">
						<motion.img
							key={current.heroImage}
							src={current.heroImage}
							alt={current.author}
							initial={{ opacity: 0, scale: 1.04 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.98 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
							className="size-full object-cover"
						/>
					</AnimatePresence>
				</div>
			</div>

			{/* Navigation Dots */}
			<div className="mt-5 flex justify-center gap-2.5">
				{data.testimonials.map((_, index) => (
					<button
						key={index}
						type="button"
						aria-label={`Go to slide ${index + 1}`}
						onClick={() => setCurrentIndex(index)}
						className={`size-2.5 rounded-full transition-all duration-200 ${
							currentIndex === index
								? "bg-primary w-6"
								: "bg-border hover:bg-fg-secondary/50"
						}`}
					/>
				))}
			</div>
		</div>
	)
}

export default TestimonialSection
