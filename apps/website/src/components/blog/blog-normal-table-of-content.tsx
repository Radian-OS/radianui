"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { MdxHeading } from "@/lib/get-mdx-headings"
import { cn } from "@/lib/utils"

interface BlogTableOfContentsProps {
	headings: MdxHeading[]
	title?: string
}

export function NormalBlogTableOfContents({
	headings,
	title = "In this Article",
}: BlogTableOfContentsProps) {
	const [activeHeadingId, setActiveHeadingId] = useState<string>("")
	const itemsRef = useRef<Map<string, HTMLAnchorElement>>(new Map())
	const containerRef = useRef<HTMLDivElement>(null)
	// Single flag: true while the page is smoothly scrolling after a TOC click
	const isUserScrollingRef = useRef(false)
	const userScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
		null
	)

	// Track which heading is currently visible in the viewport.
	// NOTE: activeHeadingId is intentionally NOT in the deps array —
	// using functional setState avoids stale closures and prevents
	// re-creating the scroll listener on every active-heading change.
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

			const navbar = document.querySelector("header, nav") as HTMLElement
			const navbarHeight = navbar ? navbar.offsetHeight : 69
			const offset = navbarHeight + 35

			let activeHeading = headingElements[0].id

			for (let i = headingElements.length - 1; i >= 0; i--) {
				const { id, element } = headingElements[i]
				const rect = element.getBoundingClientRect()
				if (rect.top <= offset) {
					activeHeading = id
					break
				}
			}

			// Functional update avoids stale closure without adding to deps
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

	// Auto-scroll the TOC sidebar to keep the active link visible.
	// Skipped if the user just clicked (they already know where it is).
	useEffect(() => {
		if (!activeHeadingId || !containerRef.current || isUserScrollingRef.current)
			return

		const activeElement = itemsRef.current.get(activeHeadingId)
		const container = containerRef.current
		if (!activeElement || !container) return

		const containerRect = container.getBoundingClientRect()
		const elementRect = activeElement.getBoundingClientRect()

		// Only scroll the sidebar if the active link is out of view
		const isAbove = elementRect.top < containerRect.top
		const isBelow = elementRect.bottom > containerRect.bottom
		if (!isAbove && !isBelow) return

		const scrollDelta =
			elementRect.top -
			containerRect.top -
			containerRect.height / 2 +
			elementRect.height / 2

		container.scrollTo({
			top: container.scrollTop + scrollDelta,
			behavior: "smooth",
		})
	}, [activeHeadingId])

	const handleHeadingClick = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>, headingId: string) => {
			e.preventDefault()

			// Block the scroll listener from overriding our chosen heading
			isUserScrollingRef.current = true
			if (userScrollTimeoutRef.current)
				clearTimeout(userScrollTimeoutRef.current)

			setActiveHeadingId(headingId)

			const element = document.getElementById(headingId)
			if (element) {
				const navbar = document.querySelector("header, nav") as HTMLElement
				const navbarHeight = navbar ? navbar.offsetHeight : 69
				const elementTop = element.getBoundingClientRect().top + window.scrollY
				const scrollPosition = elementTop - navbarHeight - 35

				window.scrollTo({ top: scrollPosition, behavior: "smooth" })
				window.history.replaceState(null, "", `#${headingId}`)
			}

			// Re-enable passive scroll tracking after the smooth scroll finishes
			userScrollTimeoutRef.current = setTimeout(() => {
				isUserScrollingRef.current = false
			}, 800)
		},
		[]
	)

	useEffect(() => {
		return () => {
			if (userScrollTimeoutRef.current)
				clearTimeout(userScrollTimeoutRef.current)
		}
	}, [])

	if (!headings.length) return null

	return (
		<nav
			aria-label="Table of Contents"
			className="border-soft flex h-full flex-col border-b p-5 text-sm font-medium md:py-10 lg:hidden">
			<span className="text-fg-secondary block py-2 text-sm text-[18px] font-semibold">
				{title}
			</span>

			<div
				ref={containerRef}
				className="no-scrollbar relative flex-1 overflow-y-auto">
				<div className="relative">
					<ul className="flex flex-col">
						{headings.map((heading) => {
							const isActive = activeHeadingId === heading.id
							return (
								<li key={heading.id} className="relative">
									<Link
										ref={(el) => {
											if (el) {
												itemsRef.current.set(heading.id, el)
											} else {
												itemsRef.current.delete(heading.id)
											}
										}}
										className={cn(
											"text-fg-secondary hover:text-fg group relative block py-2 text-sm font-medium transition-colors",
											isActive && "text-primary font-medium"
										)}
										href={`#${heading.id}`}
										onClick={(e) => handleHeadingClick(e, heading.id)}
										title={heading.text}>
										<span className="block truncate">{heading.text}</span>
									</Link>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		</nav>
	)
}
