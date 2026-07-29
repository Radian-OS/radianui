"use client"

import { useState } from "react"
import Image from "next/image"
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
				className="border-soft bg-bg lg:h-26 flex h-auto min-w-0 flex-col overflow-hidden border-y lg:flex-row"
				onPointerEnter={() => setIsPaused(true)}
				onPointerLeave={() => setIsPaused(false)}>
				<h2
					id="brand-section-title"
					className="text-fg-secondary border-soft h-15 flex w-full shrink-0 items-center justify-center border-b px-4 text-center text-sm font-normal leading-5 lg:h-full lg:w-72 lg:border-b-0 lg:border-r lg:px-10 lg:py-8">
					Teams using Radian to Empower their Designs
				</h2>

				<div
					className="h-18 w-full min-w-0 flex-none lg:h-full lg:flex-1"
					aria-hidden="true">
					<InfiniteScroll
						duration={28}
						pauseOnHover={false}
						paused={isPaused}
						className="h-full p-0 [--gap:0px]">
						{brands.map((brand) => (
							<div
								key={brand.name}
								className="border-soft flex h-full w-36 shrink-0 items-center justify-center border-r px-6 py-4 lg:w-56 lg:px-10 lg:py-8">
								<span className="flex h-10 items-center justify-center">
									<Image
										src={brand.src}
										alt=""
										width={brand.width}
										height={brand.height}
										className="max-w-30 lg:max-w-35 max-h-9 object-contain"
									/>
								</span>
							</div>
						))}
					</InfiniteScroll>
				</div>
			</div>
		</section>
	)
}
