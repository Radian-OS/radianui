"use client"

import { useEffect, useState } from "react"
import { HOMEPAGE_COMPONENTS_LIST } from "@/config/homepage-components-config"
import { useBreakpoint } from "@/hooks/use-breakpoint"
import ComponentCard from "../component-card"

export default function ComponentSectionItems() {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const breakingPoint = useBreakpoint()

	if (!mounted) return undefined

	return HOMEPAGE_COMPONENTS_LIST.slice(0, breakingPoint).map((item, idx) => (
		<ComponentCard
			alt={item.alt!}
			key={item.title + idx}
			url={item.url}
			title={item.title}
			description={item.description!}
			thumbnail={item.thumbnail!}
			thumbnailDark={item.thumbnailDark!}
		/>
	))
}
