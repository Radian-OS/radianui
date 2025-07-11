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
	const activeRef = useRef<HTMLAnchorElement | null>(null)

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
				rootMargin: "-80px 0px -70% 0px",
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

	useEffect(() => {
		if (activeRef.current) {
			// Find the scrollable container (the ul element)
			const scrollContainer = activeRef.current.closest("ul")
			if (scrollContainer) {
				// Simply scroll the active item into view
				activeRef.current.scrollIntoView({
					block: "nearest",
					behavior: "smooth",
					inline: "nearest",
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
			const scrollPosition = elementTop - navbarHeight - 15

			window.scrollTo({
				top: scrollPosition,
				behavior: "smooth",
			})
			window.history.replaceState(null, "", `#${headingId}`)
		}
	}

	if (!headings.length) return null

	return (
		<nav className="flex max-h-full flex-col text-sm font-medium">
			{/* Fixed title */}
			<span className="mb-1 block py-2">On This Page</span>

			{/* Scrollable content container */}
			<div className="no-scrollbar min-h-0 flex-1 overflow-y-auto">
				<ul className="relative flex h-full flex-col gap-1">
					<div className="bg-soft absolute bottom-0 left-0 top-0 w-px" />
					{headings.map((heading) => (
						<li key={heading.id} className="relative">
							<Link
								ref={activeHeadingId === heading.id ? activeRef : null}
								className={cn("text-text-secondary group relative block py-1 pl-4 text-sm")}
								href={`#${heading.id}`}
								onClick={(e) => handleHeadingClick(e, heading.id)}>
								{/* Active indicator */}
								{activeHeadingId === heading.id && <div className="bg-primary absolute bottom-0 left-0 top-0 w-px" />}

								{/* Hover indicator */}
								{activeHeadingId !== heading.id && <div className="bg-border-alpha absolute bottom-0 left-0 top-0 w-px opacity-0 transition-opacity group-hover:opacity-100" />}
								{heading.text}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	)
}
