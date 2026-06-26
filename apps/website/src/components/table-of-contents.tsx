"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { MdxHeading } from "@/lib/get-mdx-headings"
import { cn } from "@/lib/utils"

type TableOfContentsProps = {
	headings: MdxHeading[]
}

export default function TableOfContent({ headings }: TableOfContentsProps) {
	const [activeHeadingId, setActiveHeadingId] = useState<string>("")
	const itemsRef = useRef<Map<string, HTMLAnchorElement>>(new Map())
	const containerRef = useRef<HTMLDivElement>(null)
	const isScrollingRef = useRef(false)
	const scrollTimeoutRef = useRef<number | null>(null)
	const userClickedRef = useRef(false)
	const userClickTargetRef = useRef<string>("")

	// Track which heading is currently visible in the viewport
	useEffect(() => {
		if (!headings.length) return

		const handleScroll = () => {
			// Don't update active heading if user just clicked on a TOC item
			if (isScrollingRef.current || userClickedRef.current) return

			// Find which heading is currently in view
			const headingElements = headings
				.map((heading) => ({
					id: heading.id,
					element: document.getElementById(heading.id),
				}))
				.filter((h) => h.element) as { id: string; element: HTMLElement }[]

			if (headingElements.length === 0) return

			// Get viewport measurements
			const navbar = document.querySelector("header, nav") as HTMLElement
			const navbarHeight = navbar ? navbar.offsetHeight : 69
			const offset = navbarHeight + 35

			// Find the heading that's just passed the top of viewport
			let activeHeading = headingElements[0].id

			for (let i = headingElements.length - 1; i >= 0; i--) {
				const { id, element } = headingElements[i]
				const rect = element.getBoundingClientRect()

				if (rect.top <= offset) {
					activeHeading = id
					break
				}
			}

			if (activeHeading !== activeHeadingId) {
				setActiveHeadingId(activeHeading)
			}
		}

		// Throttle scroll handler
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
		handleScroll() // Initial check

		return () => {
			window.removeEventListener("scroll", throttledScroll)
		}
	}, [headings, activeHeadingId])

	// Scroll TOC container when active heading changes (but not when user clicked)
	useEffect(() => {
		if (!activeHeadingId || !containerRef.current) return

		// Don't auto-scroll TOC if user just clicked on it
		if (
			userClickedRef.current &&
			activeHeadingId === userClickTargetRef.current
		) {
			// Reset the flag after a delay
			setTimeout(() => {
				userClickedRef.current = false
				userClickTargetRef.current = ""
			}, 1000)
			return
		}

		// Small delay to ensure DOM is updated
		const timeoutId = setTimeout(() => {
			const activeElement = itemsRef.current.get(activeHeadingId)
			const container = containerRef.current

			if (!activeElement || !container) return

			// Get container measurements
			const containerRect = container.getBoundingClientRect()
			const containerTop = containerRect.top + window.scrollY
			const containerHeight = containerRect.height

			// Get active element measurements
			const elementRect = activeElement.getBoundingClientRect()
			const elementTop = elementRect.top + window.scrollY
			const elementHeight = elementRect.height

			// Calculate scroll position to center the active element
			const elementCenter = elementTop + elementHeight / 2
			const containerCenter = containerTop + containerHeight / 2
			const scrollDelta = elementCenter - containerCenter

			// Calculate new scroll position
			const newScrollTop = container.scrollTop + scrollDelta

			// Apply boundaries
			const maxScroll = container.scrollHeight - containerHeight
			const boundedScrollTop = Math.max(0, Math.min(newScrollTop, maxScroll))

			// Smooth scroll to position
			container.scrollTo({
				top: boundedScrollTop,
				behavior: "smooth",
			})
		}, 150)

		return () => clearTimeout(timeoutId)
	}, [activeHeadingId])

	// Handle heading click
	const handleHeadingClick = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>, headingId: string) => {
			e.preventDefault()

			// Set flags to prevent auto-scrolling TOC
			userClickedRef.current = true
			userClickTargetRef.current = headingId
			isScrollingRef.current = true

			// Set active heading immediately
			setActiveHeadingId(headingId)

			const element = document.getElementById(headingId)
			if (element) {
				// Get navbar height
				const navbar = document.querySelector("header, nav") as HTMLElement
				const navbarHeight = navbar ? navbar.offsetHeight : 69

				// Calculate scroll position
				const elementTop =
					element.getBoundingClientRect().top + window.pageYOffset
				const scrollPosition = elementTop - navbarHeight - 35

				// Scroll the page
				window.scrollTo({
					top: scrollPosition,
					behavior: "smooth",
				})

				// Update URL
				window.history.replaceState(null, "", `#${headingId}`)
			}

			// Reset scrolling flag after scroll completes
			setTimeout(() => {
				isScrollingRef.current = false
			}, 1000) // Increased timeout for longer scrolls
		},
		[]
	)

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (scrollTimeoutRef.current) {
				clearTimeout(scrollTimeoutRef.current)
			}
		}
	}, [])

	if (!headings.length) return null

	return (
		<nav className="flex h-full flex-col text-sm font-medium">
			{/* Fixed title */}
			<span className="text-fg-secondary mb-1 block py-2 pl-3 text-[13px] font-medium">
				On This Page
			</span>

			{/* Scrollable content container */}
			<div
				ref={containerRef}
				className="no-scrollbar relative flex-1 overflow-y-auto"
				style={{ maxHeight: "calc(100vh - 200px)" }}>
				<div className="relative">
					{/* Background line */}

					<ul className="flex flex-col gap-0.5">
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
											"text-fg-secondary hover:text-fg group relative block py-1.5 text-[13px] transition-colors",
											heading.level <= 2 ? "pl-3" : "pl-6",
											isActive && "text-fg font-medium"
										)}
										href={`#${heading.id}`}
										onClick={(e) => handleHeadingClick(e, heading.id)}
										title={heading.text}>
										{/* Active indicator - positioned absolutely within the link */}
										{isActive && (
											<div className="bg-primary absolute -left-0 bottom-0 top-0 w-0.5" />
										)}

										{/* Hover indicator - only show when not active */}
										{!isActive && (
											<div className="bg-border absolute -left-4 bottom-0 top-0 w-px opacity-0 transition-opacity group-hover:opacity-100" />
										)}

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
