"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { MdxHeading } from "@/lib/get-mdx-headings"

interface TableOfContentsProps {
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
			activeRef.current.scrollIntoView({ block: "nearest", behavior: "smooth" })
		}
	}, [activeHeadingId])

	// Smooth scroll to heading when clicked
	const handleHeadingClick = (e: React.MouseEvent<HTMLAnchorElement>, headingId: string) => {
		e.preventDefault()

		const element = document.getElementById(headingId)
		if (element) {
			// Get navbar height and add offset
			const navbar = document.querySelector("header, nav, [data-navbar]") as HTMLElement
			const navbarHeight = navbar ? navbar.offsetHeight : 80

			// Calculate position with navbar offset
			const elementTop = element.offsetTop
			const scrollPosition = elementTop - navbarHeight - 15 // 20px extra spacing

			window.scrollTo({
				top: scrollPosition,
				behavior: "smooth",
			})
			window.history.replaceState(null, "", `#${headingId}`)
		}
	}

	if (!headings.length) return null

	return (
		<div className="mb-10 flex flex-col gap-1 text-sm font-medium">
			<span className="block py-2">On This Page</span>
			<nav className="relative">
				<ul className="text-text-secondary flex flex-col gap-2 border-l">
					{headings.map((heading) => (
						<li key={heading.id}>
							<Link
								ref={activeHeadingId === heading.id ? activeRef : undefined}
								className={`block px-3 py-1 transition-colors duration-200 ${
									activeHeadingId === heading.id ? "text-primary border-primary -ml-0.5 border-l-2" : "text-text-secondary"
								}`}
								href={`#${heading.id}`}
								onClick={(e) => handleHeadingClick(e, heading.id)}>
								{heading.text}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	)
}
