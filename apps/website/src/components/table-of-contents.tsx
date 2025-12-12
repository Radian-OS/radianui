"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { MdxHeading } from "@/lib/get-mdx-headings"
import { cn } from "@/lib/utils"

type TableOfContentsProps = {
	headings: MdxHeading[]
}

export default function TableOfContent({ headings }: TableOfContentsProps) {
	const [activeHeadingId, setActiveHeadingId] = useState<string>("")
	const [indicatorStyle, setIndicatorStyle] = useState({
		transform: "translateY(0px)",
		height: "0px",
	})
	const activeRef = useRef<HTMLAnchorElement | null>(null)
	const containerRef = useRef<HTMLDivElement | null>(null)

	// Track which heading is currently visible
	useEffect(() => {
		if (!headings.length) return

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveHeadingId(entry.target.id)
					}
				})
			},
			{
				rootMargin: "-80px 0px -80% 0px",
				threshold: 0,
			}
		)

		// Observe all headings
		headings.forEach((heading) => {
			const element = document.getElementById(heading.id)
			if (element) observer.observe(element)
		})

		return () => observer.disconnect()
	}, [headings])

	// Animate indicator position when active heading changes
	useEffect(() => {
		if (activeRef.current && containerRef.current) {
			const activeElement = activeRef.current
			const containerElement = containerRef.current

			// Get the position of the active element relative to the container
			const activeRect = activeElement.getBoundingClientRect()
			const containerRect = containerElement.getBoundingClientRect()

			// Calculate the scroll position of the container
			const scrollTop = containerElement.scrollTop

			// Calculate relative position including scroll
			const relativeTop = activeRect.top - containerRect.top + scrollTop

			// Get the height of the active element
			const activeHeight = activeRect.height

			// Set indicator style with exact positioning
			setIndicatorStyle({
				transform: `translateY(${relativeTop}px)`,
				height: `${activeHeight}px`,
			})

			// Scroll the active item into view with better calculation
			const containerHeight = containerRect.height
			const activeElementTop = activeElement.offsetTop

			// Calculate if the active element is outside the visible area
			if (activeElementTop < containerElement.scrollTop || activeElementTop + activeHeight > containerElement.scrollTop + containerHeight) {
				activeElement.scrollIntoView({
					block: "nearest",
					behavior: "smooth",
				})
			}
		}
	}, [activeHeadingId])

	// Smooth scroll to heading when clicked
	const handleHeadingClick = (e: React.MouseEvent<HTMLAnchorElement>, headingId: string) => {
		e.preventDefault()

		const element = document.getElementById(headingId)
		if (element) {
			// Get navbar height and add offset
			const navbar = document.querySelector("header, nav") as HTMLElement
			const navbarHeight = navbar ? navbar.offsetHeight : 69

			// Calculate position with navbar offset
			const elementTop = element.offsetTop
			const scrollPosition = elementTop - navbarHeight - 35

			window.scrollTo({
				top: scrollPosition,
				behavior: "smooth",
			})
			window.history.replaceState(null, "", `#${headingId}`)

			// Also update the active heading immediately
			setActiveHeadingId(headingId)
		}
	}

	if (!headings.length) return null

	return (
		<nav className="flex max-h-full flex-col text-sm font-medium">
			{/* Fixed title */}
			<span className="mb-1 block py-2">On This Page</span>

			{/* Scrollable content container */}
			<div ref={containerRef} className="no-scrollbar min-h-0 flex-1 overflow-y-auto">
				<ul className="relative flex h-full flex-col gap-1">
					{/* Background line */}
					<div className="bg-soft absolute bottom-0 left-0 top-0 w-px" />

					{/* Animated active indicator */}
					<div className="bg-primary absolute left-0 w-px transition-all duration-200 ease-out" style={indicatorStyle} />

					{headings.map((heading) => {
						const isActive = activeHeadingId === heading.id
						return (
							<li key={heading.id} className="relative">
								<Link
									ref={isActive ? activeRef : null}
									className={cn("text-fg-secondary group relative block py-1 pl-4 text-sm transition-colors", isActive && "text-fg")}
									href={`#${heading.id}`}
									onClick={(e) => handleHeadingClick(e, heading.id)}
									style={{
										// Force consistent line height and padding
										lineHeight: "1.25rem",
										minHeight: "1.5rem",
										display: "flex",
										alignItems: "center",
									}}>
									{/* Hover indicator - only show when not active */}
									{!isActive && <div className="bg-alpha absolute bottom-0 left-0 top-0 w-px opacity-0 transition-opacity group-hover:opacity-100" />}
									{heading.text}
								</Link>
							</li>
						)
					})}
				</ul>
			</div>
		</nav>
	)
}
