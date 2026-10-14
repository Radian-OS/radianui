"use client"

import React, { useRef } from "react"
import { motion, useAnimationFrame, useMotionValue } from "motion/react"
import { Badge } from "@/styles/default/ui/badge"
import { Card, CardContent } from "@/styles/default/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import data from "./data.json"

export function TestimonialSection() {
	const x = useMotionValue(0)
	const isHovered = useRef(false)
	const trackRef = useRef<HTMLDivElement>(null)

	useAnimationFrame((_, delta) => {
		if (isHovered.current || !trackRef.current) return
		const halfWidth = trackRef.current.scrollWidth / 2
		if (halfWidth <= 0) return

		const current = x.get()
		let next = current - (36 * delta) / 1000
		if (Math.abs(next) >= halfWidth) {
			next += halfWidth
		}
		x.set(next)
	})

	return (
		<div className="bg-bg w-full py-8 sm:py-15">
			<div className="mx-auto flex max-w-screen-xl flex-col items-center gap-10 px-6 sm:gap-12">
				{/* Section Header */}
				<div className="flex max-w-screen-sm flex-col items-center gap-5 text-center sm:gap-6">
					<Badge
						variant="outline"
						className="bg-bg max-w-fit rounded-full px-3 py-1">
						<span className="text-sm font-medium capitalize">Community</span>
					</Badge>
					<h2 className="heading-2">Loved by Builders and Creatives</h2>
					<p className="text-fg-secondary text-base">
						Thousands of developers and builders around the globe are using
						Radian to ship their next big idea and they love it.
					</p>
				</div>

				{/* Continuous Motion Marquee Track */}
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
						{/* First Track Set */}
						<div className="flex shrink-0 items-stretch gap-6 pr-6">
							{data.testimonials.map((item) => (
								<Card
									key={`track1-${item.id}`}
									className="bg-elevation-level1 border-border flex w-88 shrink-0 flex-col justify-between rounded-2xl p-6 sm:w-96">
									<CardContent className="flex flex-col justify-between gap-6 p-0">
										<p className="text-fg text-sm leading-relaxed sm:text-base">
											“{item.content}”
										</p>
										<div className="flex items-center gap-3 pt-2">
											<Avatar size="lg" rounded="circle">
												<AvatarImage src={item.avatar} alt={item.name} />
												<AvatarFallback className="text-xs font-semibold">
													{item.initials}
												</AvatarFallback>
											</Avatar>
											<div className="flex flex-col">
												<h3 className="text-fg text-sm font-semibold">
													{item.name}
												</h3>
												<p className="text-fg-secondary text-xs">
													{item.caption}
												</p>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>

						{/* Duplicate Track Set for Seamless Looping */}
						<div className="flex shrink-0 items-stretch gap-6 pr-6">
							{data.testimonials.map((item) => (
								<Card
									key={`track2-${item.id}`}
									className="bg-elevation-level1 border-border flex w-88 shrink-0 flex-col justify-between rounded-2xl p-6 sm:w-96">
									<CardContent className="flex flex-col justify-between gap-6 p-0">
										<p className="text-fg text-sm leading-relaxed sm:text-base">
											“{item.content}”
										</p>
										<div className="flex items-center gap-3 pt-2">
											<Avatar size="lg" rounded="circle">
												<AvatarImage src={item.avatar} alt={item.name} />
												<AvatarFallback className="text-xs font-semibold">
													{item.initials}
												</AvatarFallback>
											</Avatar>
											<div className="flex flex-col">
												<h3 className="text-fg text-sm font-semibold">
													{item.name}
												</h3>
												<p className="text-fg-secondary text-xs">
													{item.caption}
												</p>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	)
}

export default TestimonialSection
