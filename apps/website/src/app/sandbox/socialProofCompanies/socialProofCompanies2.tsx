"use client"

import React, { useRef } from "react"
import { motion, useAnimationFrame, useMotionValue } from "motion/react"
import data from "./data.json"

export function SocialProofCompanies2() {
	const x = useMotionValue(0)
	const isHovered = useRef(false)
	const trackRef = useRef<HTMLDivElement>(null)

	useAnimationFrame((_, delta) => {
		if (isHovered.current || !trackRef.current) return
		const halfWidth = trackRef.current.scrollWidth / 2
		if (halfWidth <= 0) return

		const current = x.get()
		let next = current - (32 * delta) / 1000
		if (Math.abs(next) >= halfWidth) {
			next += halfWidth
		}
		x.set(next)
	})

	return (
		<div className="bg-bg w-full py-12 sm:py-16">
			<div className="mx-auto flex max-w-screen-xl flex-col items-center gap-8 px-6">
				<p className="text-fg-secondary max-w-screen-lg text-center text-base font-medium sm:text-lg">
					Thousands of businesses trust Radian to build their products
				</p>

				{/* Continuous Infinite Scrolling Colored Logo Marquee */}
				<div
					className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_128px,black_calc(100%-128px),transparent)]"
					onMouseEnter={() => {
						isHovered.current = true
					}}
					onMouseLeave={() => {
						isHovered.current = false
					}}>
					<motion.div
						ref={trackRef}
						style={{ x }}
						className="flex w-max will-change-transform">
						{/* First Track Copy */}
						<div className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14">
							{data.coloredLogos.map((logo, index) => (
								<div
									key={`track1-${logo.name}-${index}`}
									className="flex h-10 items-center justify-center transition-transform duration-200 hover:scale-110">
									<img
										src={logo.src}
										alt={logo.name}
										className="h-7 w-auto object-contain transition-opacity duration-200 sm:h-8"
									/>
								</div>
							))}
						</div>

						{/* Duplicate Track for Seamless Looping */}
						<div className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14">
							{data.coloredLogos.map((logo, index) => (
								<div
									key={`track2-${logo.name}-${index}`}
									className="flex h-10 items-center justify-center transition-transform duration-200 hover:scale-110">
									<img
										src={logo.src}
										alt={logo.name}
										className="h-7 w-auto object-contain transition-opacity duration-200 sm:h-8"
									/>
								</div>
							))}
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	)
}

export default SocialProofCompanies2
