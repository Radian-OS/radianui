"use client"

import dynamic from "next/dynamic"

export const LibraryDocsVisual = dynamic(
	() =>
		import("@/components/home/rapid-dev/library-docs-card").then(
			(module) => module.LibraryDocsCard
		),
	{ ssr: false }
)

export const CreditCardUsageVisual = dynamic(
	() =>
		import("@/components/effects/credit-card-usage-animation").then(
			(module) => module.CreditCardUsageAnimation
		),
	{ ssr: false }
)

export const Card7Visual = dynamic(
	() =>
		import("@/components/home/rapid-dev/card-7-canvas").then(
			(module) => module.Card7Canvas
		),
	{ ssr: false }
)

export const DesignCodeVisual = dynamic(
	() =>
		import("@/components/home/rapid-dev/rapid-dev-animation").then(
			(module) => module.RapidDevAnimation
		),
	{ ssr: false }
)
