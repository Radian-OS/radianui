"use client"

import { useEffect, useRef, useState } from "react"
import { CursorIdeCard } from "./cursor-ide-card"
import { FigmaUiCard } from "./figma-ui-card"

const STAGE_WIDTH = 1440
const STAGE_HEIGHT = 720

type RapidDevAnimationProps = {
	type: "designer" | "developer"
}

export function RapidDevAnimation({ type }: RapidDevAnimationProps) {
	const viewportRef = useRef<HTMLDivElement>(null)
	const [layout, setLayout] = useState({ offsetX: 0, scale: 1 })

	useEffect(() => {
		const viewport = viewportRef.current

		if (!viewport) return

		const updateLayout = () => {
			const scale = Math.min(
				Math.max(
					viewport.clientWidth / STAGE_WIDTH,
					viewport.clientHeight / STAGE_HEIGHT
				),
				1
			)

			setLayout({
				offsetX: (viewport.clientWidth - STAGE_WIDTH * scale) / 2,
				scale,
			})
		}

		updateLayout()

		const observer = new ResizeObserver(updateLayout)
		observer.observe(viewport)

		return () => observer.disconnect()
	}, [])

	return (
		<div
			ref={viewportRef}
			className="rapid-animation-viewport bg-fill1 relative h-[240px] w-full max-w-[1440px] overflow-hidden md:h-[430px] lg:h-[720px]"
			aria-hidden="true"
			data-nosnippet="">
			<div
				className="absolute left-0 top-0 size-max origin-top-left"
				style={{
					transform: `translateX(${layout.offsetX}px) scale(${layout.scale})`,
				}}>
				{type === "designer" ? <FigmaUiCard /> : <CursorIdeCard />}
			</div>
		</div>
	)
}
