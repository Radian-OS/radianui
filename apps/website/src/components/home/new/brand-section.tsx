"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { InfiniteScroll } from "@/registry/animated/infinite-scroll"

const brands = [
	{
		name: "KrispCall",
		src: "/brands/krispcall.png",
		width: 110,
		height: 37,
	},
	{
		name: "RemitOS",
		src: "/brands/remitos.png",
		width: 110,
		height: 37,
	},
	{
		name: "airchannel.ai",
		src: "/brands/airchannel.png",
		width: 138,
		height: 24,
	},
	{
		name: "Tivazo",
		src: "/brands/tivazo.png",
		width: 110,
		height: 37,
	},
	{
		name: "Mage Icons",
		src: "/brands/mageicons.png",
		width: 130,
		height: 22,
	},
	{
		name: "Dialaxy",
		src: "/brands/dilaxy.png",
		width: 110,
		height: 37,
	},
] as const

export default function BrandSection() {
	const [isPaused, setIsPaused] = useState(false)
	const [hoveredBrand, setHoveredBrand] = useState<string | null>(null)

	return (
		<section
			aria-labelledby="brand-section-title"
			className="max-w-368 relative z-20 mx-auto w-full px-4 pt-[90px] md:px-5">
			<div
				aria-hidden="true"
				className="border-soft pointer-events-none absolute inset-y-0 left-4 z-20 border-l md:left-5"
			/>
			<div
				aria-hidden="true"
				className="border-soft pointer-events-none absolute inset-y-0 right-4 z-20 border-r md:right-5"
			/>

			<div
				className="border-soft bg-bg h-26 flex min-w-0 overflow-hidden border-y"
				onPointerEnter={() => setIsPaused(true)}
				onPointerLeave={() => {
					setIsPaused(false)
					setHoveredBrand(null)
				}}>
				<h2
					id="brand-section-title"
					className="text-fg-secondary border-soft flex h-full w-72 shrink-0 items-center border-r px-10 py-8 text-sm font-normal leading-5">
					Teams using Radian to Empower their Designs
				</h2>

				<div className="min-w-0 flex-1" aria-hidden="true">
					<InfiniteScroll
						duration={28}
						pauseOnHover={false}
						paused={isPaused}
						className="h-full p-0 [--gap:0px]">
						{brands.map((brand) => {
							const isHovered = hoveredBrand === brand.name

							return (
								<div
									key={brand.name}
									className="border-soft flex h-full w-56 shrink-0 items-center justify-center border-r px-10 py-8"
									onPointerEnter={() => setHoveredBrand(brand.name)}
									onPointerLeave={() => setHoveredBrand(null)}>
									<span
										className={cn(
											"flex h-10 items-center justify-center transition-[filter,opacity] duration-300",
											isHovered
												? "opacity-100 grayscale-0 dark:brightness-100 dark:invert-0"
												: "opacity-70 grayscale dark:brightness-0 dark:invert"
										)}>
										<Image
											src={brand.src}
											alt=""
											width={brand.width}
											height={brand.height}
											className="max-w-35 max-h-9 object-contain"
										/>
									</span>
								</div>
							)
						})}
					</InfiniteScroll>
				</div>
			</div>
		</section>
	)
}
