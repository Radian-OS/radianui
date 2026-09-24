import React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import { InfoPanel } from "./info-panel"
import { QuoteForm } from "./quote-form"

export const metadata: Metadata = {
	title: "Contact-06 — Request a Free Quote | Shadcn Space",
	description:
		"Tell us about your project and we'll provide a customized estimate within 24 hours. No hidden fees or obligations.",
}

export default function Contact06Page() {
	return (
		<div className="bg-bg text-fg relative flex min-h-screen w-full items-center justify-center overflow-hidden">
			{/* Scenic Landscape Backdrop with Next.js Image */}
			<div className="absolute inset-0 -z-10">
				<Image
					src="/sandbox/placeholder.svg"
					alt="Scenic Mountains Landscape"
					fill
					priority
					className="object-cover opacity-25"
				/>
				{/* Dark vignette gradients */}
				<div className="from-bg via-bg/80 to-bg/60 absolute inset-0 bg-gradient-to-t" />
				<div className="from-bg/90 to-bg/90 absolute inset-0 bg-gradient-to-r via-transparent" />
			</div>

			{/* Main 2-Column Content Container */}
			<div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
					{/* Left Column: Request a Free Quote & Highlights */}
					<div className="lg:col-span-5">
						<InfoPanel />
					</div>

					{/* Right Column: Quote Form & File Dropzone */}
					<div className="lg:col-span-7">
						<QuoteForm />
					</div>
				</div>
			</div>
		</div>
	)
}
