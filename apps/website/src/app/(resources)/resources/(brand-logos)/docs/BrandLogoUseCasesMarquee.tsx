"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

const Track = dynamic(() => import("./BrandLogoUseCasesTrack"))

export default function BrandLogoUseCasesMarquee() {
	const ref = useRef<HTMLDivElement>(null)
	const [loaded, setLoaded] = useState(false)
	const [visible, setVisible] = useState(false)
	useEffect(() => {
		const target = ref.current
		if (!target) return
		const observer = new IntersectionObserver(
			([entry]) => {
				setVisible(entry.isIntersecting)
				if (entry.isIntersecting) setLoaded(true)
			},
			{ rootMargin: "300px" }
		)
		observer.observe(target)
		return () => observer.disconnect()
	}, [])
	return (
		<div
			ref={ref}
			className="min-h-[52.5vw] sm:min-h-[33.75vw] md:min-h-[26.25vw] lg:min-h-[21vw]">
			{loaded ? <Track paused={!visible} /> : null}
		</div>
	)
}
