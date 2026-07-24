"use client"

import type { ReactNode } from "react"
import { useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

export function NavigationMenuViewportPortal({
	children,
}: {
	children: ReactNode
}) {
	const markerRef = useRef<HTMLSpanElement>(null)
	const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null)
	const [position, setPosition] = useState<{
		left: number
		top: number
		width: number
	} | null>(null)

	useLayoutEffect(() => {
		const anchor = markerRef.current?.closest<HTMLElement>(
			'[data-slot="navigation-menu"]'
		)

		if (!anchor) return

		setPortalTarget(document.body)

		const updatePosition = () => {
			const rect = anchor.getBoundingClientRect()
			setPosition({
				left: rect.left,
				top: rect.bottom,
				width: rect.width,
			})
		}

		updatePosition()

		const resizeObserver = new ResizeObserver(updatePosition)
		resizeObserver.observe(anchor)
		window.addEventListener("resize", updatePosition)
		window.addEventListener("scroll", updatePosition, true)

		return () => {
			resizeObserver.disconnect()
			window.removeEventListener("resize", updatePosition)
			window.removeEventListener("scroll", updatePosition, true)
		}
	}, [])

	return (
		<>
			<span ref={markerRef} className="hidden" aria-hidden="true" />
			{portalTarget
				? createPortal(
						<div
							data-slot="navigation-menu-viewport-positioner"
							className="z-60 fixed isolate flex justify-center"
							style={
								position
									? {
											left: position.left,
											top: position.top,
											width: position.width,
										}
									: { visibility: "hidden" }
							}>
							{children}
						</div>,
						portalTarget
					)
				: null}
		</>
	)
}
