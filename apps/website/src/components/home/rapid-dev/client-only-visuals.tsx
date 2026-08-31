"use client"

import { type ReactNode, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

const LibraryDocs = dynamic(
	() =>
		import("@/components/home/rapid-dev/library-docs-card").then(
			(module) => module.LibraryDocsCard
		),
	{ ssr: false }
)

const CreditCardUsage = dynamic(
	() =>
		import("@/components/effects/credit-card-usage-animation").then(
			(module) => module.CreditCardUsageAnimation
		),
	{ ssr: false }
)

const Card7 = dynamic(
	() =>
		import("@/components/home/rapid-dev/card-7-canvas").then(
			(module) => module.Card7Canvas
		),
	{ ssr: false }
)

const DesignCode = dynamic(
	() =>
		import("@/components/home/rapid-dev/rapid-dev-animation").then(
			(module) => module.RapidDevAnimation
		),
	{ ssr: false }
)

function DeferredVisual({ children }: { children: ReactNode }) {
	const boundaryRef = useRef<HTMLDivElement>(null)
	const [shouldRender, setShouldRender] = useState(false)

	useEffect(() => {
		const boundary = boundaryRef.current
		if (!boundary || shouldRender) return

		if (!("IntersectionObserver" in window)) {
			setShouldRender(true)
			return
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return
				setShouldRender(true)
				observer.disconnect()
			},
			{ rootMargin: "300px 0px" }
		)

		observer.observe(boundary)
		return () => observer.disconnect()
	}, [shouldRender])

	return <div ref={boundaryRef}>{shouldRender ? children : null}</div>
}

export function LibraryDocsVisual() {
	return <LibraryDocs />
}

export function CreditCardUsageVisual() {
	return (
		<DeferredVisual>
			<CreditCardUsage />
		</DeferredVisual>
	)
}

export function Card7Visual() {
	return (
		<DeferredVisual>
			<Card7 />
		</DeferredVisual>
	)
}

export function DesignCodeVisual({ type }: { type: "designer" | "developer" }) {
	return (
		<DeferredVisual>
			<DesignCode type={type} />
		</DeferredVisual>
	)
}
