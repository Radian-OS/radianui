"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { MdxHeading } from "@/lib/get-mdx-headings"
import { cn } from "@/lib/utils"

interface BlogTableOfContentsProps {
	headings: MdxHeading[]
}

export function BlogTableOfContents({ headings }: BlogTableOfContentsProps) {
	const [activeHeadingId, setActiveHeadingId] = useState<string>("")
	const isUserScrollingRef = useRef(false)
	const userScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
		null
	)

	useEffect(() => {
		if (!headings.length) return

		const handleScroll = () => {
			if (isUserScrollingRef.current) return

			const headingElements = headings
				.map((heading) => ({
					id: heading.id,
					element: document.getElementById(heading.id),
				}))
				.filter((h) => h.element) as { id: string; element: HTMLElement }[]

			if (headingElements.length === 0) return

			const offset = 100
			let activeHeading = headingElements[0].id

			for (let i = headingElements.length - 1; i >= 0; i--) {
				const { id, element } = headingElements[i]
				const rect = element.getBoundingClientRect()
				if (rect.top <= offset) {
					activeHeading = id
					break
				}
			}

			setActiveHeadingId((prev) =>
				prev !== activeHeading ? activeHeading : prev
			)
		}

		let ticking = false
		const throttledScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					handleScroll()
					ticking = false
				})
				ticking = true
			}
		}

		window.addEventListener("scroll", throttledScroll, { passive: true })
		handleScroll()

		return () => {
			window.removeEventListener("scroll", throttledScroll)
		}
	}, [headings])

	const handleHeadingClick = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>, headingId: string) => {
			e.preventDefault()

			isUserScrollingRef.current = true
			if (userScrollTimeoutRef.current) {
				clearTimeout(userScrollTimeoutRef.current)
			}

			setActiveHeadingId(headingId)

			const element = document.getElementById(headingId)
			if (element) {
				const elementTop = element.getBoundingClientRect().top + window.scrollY
				const scrollPosition = elementTop - 90

				window.scrollTo({ top: scrollPosition, behavior: "smooth" })
				window.history.replaceState(null, "", `#${headingId}`)
			}

			userScrollTimeoutRef.current = setTimeout(() => {
				isUserScrollingRef.current = false
			}, 800)
		},
		[]
	)

	useEffect(() => {
		return () => {
			if (userScrollTimeoutRef.current) {
				clearTimeout(userScrollTimeoutRef.current)
			}
		}
	}, [])

	if (!headings.length) return null

	return (
		<nav aria-label="Table of Contents" className="flex flex-col gap-1 text-sm">
			<span className="text-fg py-2 text-[18px] font-semibold tracking-tight">
				In this Article
			</span>

			<ul className="flex flex-col">
				{headings.map((heading) => {
					const isActive = activeHeadingId === heading.id
					return (
						<li key={heading.id}>
							<Link
								href={`#${heading.id}`}
								onClick={(e) => handleHeadingClick(e, heading.id)}
								title={heading.text}
								className={cn(
									"block py-2 text-sm transition-colors",
									isActive
										? "font-medium text-indigo-600 dark:text-indigo-400"
										: "text-fg-secondary hover:text-fg"
								)}>
								<span className="block truncate">{heading.text}</span>
							</Link>
						</li>
					)
				})}
			</ul>
		</nav>
	)
}
