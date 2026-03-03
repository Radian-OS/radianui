"use client"

import { useEffect, useState } from "react"

export function useBreakpoint() {
	const [width, setWidth] = useState<number>(
		typeof window !== "undefined" ? window.innerWidth : 0
	)

	useEffect(() => {
		function handleResize() {
			setWidth(window.innerWidth)
		}
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	if (width < 640) return 3 // mobile
	if (width < 1280) return 6 // tablet
	return 8 // desktop and larger
}
