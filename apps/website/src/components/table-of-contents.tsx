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
	const [indicatorStyle, setIndicatorStyle] = useState({
		top: "8px",
		height: "24px",
	})
	const itemsRef = useRef<Map<string, HTMLAnchorElement>>(new Map())
	const containerRef = useRef<HTMLDivElement>(null)
	const isScrollingRef = useRef(false)
	const scrollTimeoutRef = useRef<number | null>(null)

	// Track which heading is currently visible in the viewport
	useEffect(() => {
		if (!headings.length) return

		const handleScroll = () => {
			if (isScrollingRef.current) return

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
			const offset = navbarHeight + 20

			// Find the heading closest to the top of the viewport
			let closestHeading = headingElements[0]
			let minDistance = Infinity

			headingElements.forEach(({ id, element }) => {
				const rect = element.getBoundingClientRect()
				const distance = Math.abs(rect.top - offset)

				if (distance < minDistance) {
					minDistance = distance
					closestHeading = { id, element }
				}
			})

			setActiveHeadingId(closestHeading.id)
		}

		// Debounced scroll handler
		const debouncedScroll = () => {
			if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current)
			scrollTimeoutRef.current = window.setTimeout(handleScroll, 100)
		}

		window.addEventListener("scroll", debouncedScroll, { passive: true })
		handleScroll() // Initial check

		return () => {
			window.removeEventListener("scroll", debouncedScroll)
			if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current)
		}
	}, [headings])

	// Update indicator position when active heading changes
	useEffect(() => {
		if (!activeHeadingId) return

		const updateIndicator = () => {
			const activeElement = itemsRef.current.get(activeHeadingId)
			const container = containerRef.current

			if (activeElement && container) {
				// Calculate position of active element relative to container
				const containerRect = container.getBoundingClientRect()
				const elementRect = activeElement.getBoundingClientRect()

				// Calculate position for indicator
				const top = elementRect.top - containerRect.top + container.scrollTop
				const height = elementRect.height

				setIndicatorStyle({
					top: `${top}px`,
					height: `${height}px`,
				})

				// Scroll container to show active element
				const elementTop = activeElement.offsetTop
				const elementBottom = elementTop + activeElement.offsetHeight
				const containerTop = container.scrollTop
				const containerBottom = containerTop + container.clientHeight

				if (elementTop < containerTop || elementBottom > containerBottom) {
					container.scrollTo({
						top: elementTop - container.clientHeight / 2 + height / 2,
						behavior: "smooth",
					})
				}
			}
		}

		// Use requestAnimationFrame to ensure DOM is ready
		requestAnimationFrame(() => {
			updateIndicator()
		})
	}, [activeHeadingId])

	// Handle heading click
	const handleHeadingClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, headingId: string) => {
		e.preventDefault()

		isScrollingRef.current = true
		setActiveHeadingId(headingId)

		const element = document.getElementById(headingId)
		if (element) {
			// Get navbar height
			const navbar = document.querySelector("header, nav") as HTMLElement
			const navbarHeight = navbar ? navbar.offsetHeight : 69

			// Calculate scroll position
			const elementTop = element.getBoundingClientRect().top + window.pageYOffset
			const scrollPosition = elementTop - navbarHeight - 20

			window.scrollTo({
				top: scrollPosition,
				behavior: "smooth",
			})

			// Update URL
			window.history.replaceState(null, "", `#${headingId}`)
		}

		// Reset scrolling flag
		setTimeout(() => {
			isScrollingRef.current = false
		}, 500)
	}, [])

	if (!headings.length) return null

	return (
		<nav className="flex max-h-full flex-col text-sm font-medium">
			{/* Fixed title */}
			<span className="mb-1 block py-2">On This Page</span>

			{/* Scrollable content container */}
			<div ref={containerRef} className="no-scrollbar min-h-0 flex-1 overflow-y-auto">
				<div className="relative">
					{/* Background line */}
					<div className="bg-soft absolute bottom-0 left-0 top-0 w-px" />

					{/* Animated active indicator */}
					<div
						className="bg-primary absolute left-0 w-px transition-all duration-200 ease-out"
						style={{
							top: indicatorStyle.top,
							height: indicatorStyle.height,
						}}
					/>

					<ul className="flex flex-col gap-1">
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
										className={cn("text-fg-secondary group relative block py-1 pl-4 text-sm transition-colors", isActive && "text-fg font-medium")}
										href={`#${heading.id}`}
										onClick={(e) => handleHeadingClick(e, heading.id)}>
										{/* Hover indicator - only show when not active */}
										{!isActive && <div className="bg-alpha absolute bottom-0 left-0 top-0 w-px opacity-0 transition-opacity group-hover:opacity-100" />}
										{heading.text}
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
