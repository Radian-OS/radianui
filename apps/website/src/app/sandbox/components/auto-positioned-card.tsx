"use client"

import React, { useLayoutEffect, useMemo, useRef, useState } from "react"

export interface AutoPositionedCardProps {
	positionX: number // percentage (0-100)
	positionY: number // percentage (0-100)
	dimensions: { width: number; height: number }
	scrollOffset: { x: number; y: number }
	containerSize: { width: number; height: number }
	children: React.ReactNode
	className?: string
	defaultCardWidth?: number
}

export function AutoPositionedCard({
	positionX,
	positionY,
	dimensions,
	scrollOffset,
	containerSize,
	children,
	className,
	defaultCardWidth = 352,
}: AutoPositionedCardProps) {
	const cardRef = useRef<HTMLDivElement>(null)
	const [cardDimensions, setCardDimensions] = useState({
		width: defaultCardWidth,
		height: 320,
	})

	useLayoutEffect(() => {
		if (!cardRef.current) return
		const rect = cardRef.current.getBoundingClientRect()
		if (rect.width > 0 && rect.height > 0) {
			setCardDimensions({ width: rect.width, height: rect.height })
		}
		const ro = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const cr = entry.contentRect
				if (cr.width > 0 && cr.height > 0) {
					setCardDimensions({ width: cr.width, height: cr.height })
				}
			}
		})
		ro.observe(cardRef.current)
		return () => ro.disconnect()
	}, [])

	const positionStyle = useMemo(() => {
		const cWidth =
			containerSize.width > 0
				? containerSize.width
				: typeof window !== "undefined"
					? window.innerWidth
					: 1200
		const cHeight =
			containerSize.height > 0
				? containerSize.height
				: typeof window !== "undefined"
					? window.innerHeight
					: 800

		const layerW = dimensions.width > 0 ? dimensions.width : cWidth
		const layerH = dimensions.height > 0 ? dimensions.height : cHeight

		// Pin position in pixels on content layer
		const pinContentX = (positionX / 100) * layerW
		const pinContentY = (positionY / 100) * layerH

		// Pin position in visible screen pixels
		const pinScreenX = pinContentX - scrollOffset.x
		const pinScreenY = pinContentY - scrollOffset.y

		const padding = 16
		const cardW = Math.min(cardDimensions.width, cWidth - padding * 2)
		const cardH = cardDimensions.height

		// Horizontal collision handling:
		// Attempt to center or offset from pin (-cardW / 4)
		const idealLeft = pinScreenX - cardW / 4
		const minAllowedLeft = padding
		const maxAllowedLeft = Math.max(padding, cWidth - cardW - padding)

		// Clamp screen X so card NEVER extends outside visible screen/preview
		const clampedScreenLeft = Math.max(
			minAllowedLeft,
			Math.min(idealLeft, maxAllowedLeft)
		)
		const offsetFromPinX = clampedScreenLeft - pinScreenX

		// Vertical collision handling:
		const spaceBelow = cHeight - (pinScreenY + 24)
		const spaceAbove = pinScreenY - 24

		const minAllowedTop = padding
		const maxAllowedTop = Math.max(minAllowedTop, cHeight - cardH - padding)
		let clampedScreenTop: number

		if (spaceBelow < cardH + padding && spaceAbove > spaceBelow) {
			// Flip ABOVE the pin
			const idealTop = pinScreenY - cardH - 14
			clampedScreenTop = Math.max(
				minAllowedTop,
				Math.min(idealTop, maxAllowedTop)
			)
		} else {
			// Position BELOW the pin
			const idealTop = pinScreenY + 20
			clampedScreenTop = Math.max(
				minAllowedTop,
				Math.min(idealTop, maxAllowedTop)
			)
		}
		const offsetFromPinY = clampedScreenTop - pinScreenY

		return {
			transform: `translate3d(${Math.round(offsetFromPinX)}px, ${Math.round(offsetFromPinY)}px, 0)`,
			maxWidth: `min(${defaultCardWidth}px, calc(100vw - 32px), ${cWidth - padding * 2}px)`,
			maxHeight: `min(540px, calc(100vh - 48px), ${cHeight - padding * 2}px)`,
		}
	}, [
		positionX,
		positionY,
		dimensions,
		scrollOffset,
		containerSize,
		cardDimensions,
		defaultCardWidth,
	])

	return (
		<div ref={cardRef} style={positionStyle} className={className}>
			{children}
		</div>
	)
}
