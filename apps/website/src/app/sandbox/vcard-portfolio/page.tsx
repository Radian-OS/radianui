"use client"

import React from "react"
import { VcardPortfolioView } from "./vcard-portfolio-view"

export default function VcardPortfolioPage() {
	return (
		<main className="bg-background text-foreground flex min-h-screen w-full items-start justify-center">
			<VcardPortfolioView />
		</main>
	)
}
