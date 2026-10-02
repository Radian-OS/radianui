"use client"

import React from "react"
import Image from "next/image"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/styles/default/ui/carousel"
import type { ServiceItem } from "./types"

const DEFAULT_SERVICES: ServiceItem[] = [
	{
		id: "service-1",
		title: "Kitchen Cleaning",
		imageSrc: "/sandbox/placeholder.svg",
		alt: "Kitchen cleaning service with spray bottle",
	},
	{
		id: "service-2",
		title: "Floor Cleaning",
		imageSrc: "/sandbox/placeholder.svg",
		alt: "Robot vacuum cleaner cleaning carpet",
	},
	{
		id: "service-3",
		title: "Upholstery Cleaning",
		imageSrc: "/sandbox/placeholder.svg",
		alt: "Upholstery and sofa deep cleaning service",
	},
]

interface ServiceGalleryProps {
	services?: ServiceItem[]
}

export function ServiceGallery({
	services = DEFAULT_SERVICES,
}: ServiceGalleryProps) {
	return (
		<div className="w-full">
			{/* Mobile / Tablet Carousel View */}
			<div className="-mr-4 sm:-mr-6 md:-mr-8 lg:hidden">
				<Carousel
					opts={{
						align: "start",
						dragFree: true,
					}}
					className="w-full">
					<CarouselContent className="-ml-4">
						{services.map((service) => (
							<CarouselItem
								key={service.id}
								className="basis-[85%] pl-4 sm:basis-[60%]">
								<div className="border-border/60 bg-fill2 relative aspect-4/3 w-full overflow-hidden rounded-2xl sm:rounded-3xl">
									<Image
										src={service.imageSrc}
										alt={service.alt}
										fill
										sizes="(max-width: 640px) 85vw, (max-width: 1024px) 60vw, 33vw"
										className="object-cover transition-transform duration-300 hover:scale-105"
									/>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>

			{/* Desktop 3-Column Grid View */}
			<div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
				{services.map((service) => (
					<div
						key={service.id}
						className="border-border/60 bg-fill2 relative aspect-4/3 w-full overflow-hidden rounded-2xl lg:rounded-3xl">
						<Image
							src={service.imageSrc}
							alt={service.alt}
							fill
							sizes="(max-width: 1280px) 33vw, 420px"
							className="object-cover transition-transform duration-300 hover:scale-105"
						/>
					</div>
				))}
			</div>
		</div>
	)
}
