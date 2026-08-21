"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

const ComponentSection = dynamic(() => import("./component-section"), {
	ssr: false,
})
const RapidDev = dynamic(() => import("./RapidDev"), {
	ssr: false,
})
const CarouselSection = dynamic(() => import("./new/carousel-section"), {
	ssr: false,
})
const PlaygroundSection = dynamic(
	() => import("./playground-section-wrapper"),
	{ ssr: false }
)
const UIBlocksSection = dynamic(() => import("./ui-blocks-section"), {
	ssr: false,
})

type DeferredHomeSectionProps = {
	section: "rapid-dev" | "components" | "carousel" | "playground" | "ui-blocks"
	minHeight: number
}

export default function DeferredHomeSection({
	section,
	minHeight,
}: DeferredHomeSectionProps) {
	const boundaryRef = useRef<HTMLDivElement>(null)
	const [shouldRender, setShouldRender] = useState(false)

	useEffect(() => {
		const boundary = boundaryRef.current
		if (!boundary || shouldRender) return

		if (!("IntersectionObserver" in window)) {
			setShouldRender(true)
			return
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return
				setShouldRender(true)
				observer.disconnect()
			},
			{ rootMargin: section === "rapid-dev" ? "0px" : "1200px 0px" }
		)

		observer.observe(boundary)
		return () => observer.disconnect()
	}, [section, shouldRender])

	return (
		<div
			ref={boundaryRef}
			data-deferred-home-section={section}
			style={{ minHeight }}>
			{shouldRender ? <DeferredSection section={section} /> : null}
		</div>
	)
}

function DeferredSection({
	section,
}: Pick<DeferredHomeSectionProps, "section">) {
	switch (section) {
		case "rapid-dev":
			return <RapidDev />
		case "components":
			return <ComponentSection />
		case "carousel":
			return <CarouselSection />
		case "playground":
			return <PlaygroundSection renderBeforeMount />
		case "ui-blocks":
			return <UIBlocksSection />
	}
}
