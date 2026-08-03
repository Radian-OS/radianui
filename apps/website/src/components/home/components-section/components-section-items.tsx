"use client"

import { useEffect, useState } from "react"
import { HOMEPAGE_COMPONENTS_LIST } from "@/config/homepage-components-config"
import { useBreakpoint } from "@/hooks/use-breakpoint"
import ComponentCard from "../component-card"

type Props = {
	offset?: number
	visibleCount?: number
}

export default function ComponentSectionItems({
	offset = 0,
	visibleCount: visibleCountProp,
}: Props) {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const breakpointItems = useBreakpoint()
	const visibleCount = visibleCountProp ?? breakpointItems

	if (!mounted) return undefined

	const visibleItems = HOMEPAGE_COMPONENTS_LIST.slice(
		offset,
		offset + visibleCount
	)

	return visibleItems.map((item, idx) => (
		<ComponentCard
			alt={item.alt!}
			key={item.title + offset + idx}
			url={item.url}
			title={item.title}
			description={item.description!}
			thumbnail={item.thumbnail!}
		/>
	))
}

export function useMaxOffset(visibleCount: number) {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return 0

	const totalItems = HOMEPAGE_COMPONENTS_LIST.length
	return Math.max(0, totalItems - visibleCount)
}
