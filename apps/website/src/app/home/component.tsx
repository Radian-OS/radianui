"use client"

import React, { useCallback, useState } from "react"
import { ChevronLeft, ChevronRight, ComponentIcon } from "lucide-react"
import ComponentCard from "@/components/home/component-card"
import { HOMEPAGE_COMPONENTS_LIST } from "@/config/homepage-components-config"
import { Badge } from "@/registry/ui/badge"
import { Button, IconButton } from "@/registry/ui/button"
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/registry/ui/carousel"
import DiagonalDivider from "./SvgDivider"

const Component = () => {
	const [api, setApi] = useState<CarouselApi>()
	const [canScrollPrev, setCanScrollPrev] = useState(false)
	const [canScrollNext, setCanScrollNext] = useState(false)

	const onApiChange = useCallback((api: CarouselApi) => {
		if (!api) return
		setApi(api)

		const updateButtons = () => {
			setCanScrollPrev(api.canScrollPrev())
			setCanScrollNext(api.canScrollNext())
		}

		updateButtons()
		api.on("select", updateButtons)
		api.on("reInit", updateButtons)
	}, [])

	const handlePrev = useCallback(() => {
		api?.scrollPrev()
	}, [api])

	const handleNext = useCallback(() => {
		api?.scrollNext()
	}, [api])

	return (
		<section className="border-soft z-10 mx-auto flex max-w-[1440px] flex-col border">
			<div className="md:px-15 md:py-30 flex flex-col gap-8 px-5 py-16 sm:px-10">
				<div className="flex flex-col gap-4 sm:gap-6">
					<Badge color="primary" size="28" variant="soft">
						<ComponentIcon className="text-primary size-4" />
						Components
					</Badge>
					<div className="w-full md:w-[940px]">
						<h2 className="heading-4">
							<span className="text-[32px]">
								Production-ready React and Figma UI components.
							</span>{" "}
							<span className="text-fg-secondary text-[32px]">
								Build modern interfaces faster with customizable React
								components and Figma UI components.
							</span>
						</h2>
					</div>
				</div>

				<div className="flex justify-between">
					<Button>View all Components</Button>
					<div className="flex gap-2.5">
						<IconButton
							aria-label="ChevronLeft"
							color="neutral"
							size="32"
							variant="outline"
							onClick={handlePrev}
							disabled={!canScrollPrev}>
							<ChevronLeft className="text-fg-secondary" />
						</IconButton>
						<IconButton
							aria-label="ChevronRight"
							color="neutral"
							size="32"
							variant="outline"
							onClick={handleNext}
							disabled={!canScrollNext}>
							<ChevronRight className="text-fg-secondary" />
						</IconButton>
					</div>
				</div>
			</div>
			<div className="border-soft relative z-10 w-full border-y px-5">
				<Carousel
					setApi={onApiChange}
					opts={{
						align: "start",
						slidesToScroll: 1,
					}}>
					<CarouselContent>
						{HOMEPAGE_COMPONENTS_LIST.map((item, idx) => (
							<CarouselItem
								key={item.title + idx}
								className="basis-full sm:basis-1/2 lg:basis-1/4">
								<ComponentCard
									alt={item.alt!}
									url={item.url}
									title={item.title}
									description={item.description!}
									thumbnail={item.thumbnail!}
									thumbnailDark={item.thumbnailDark!}
								/>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
			<DiagonalDivider className="w-full" />
		</section>
	)
}

export default Component
