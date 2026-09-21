import React from "react"
import type { Metadata } from "next"
import { ContactForm } from "./contact-form"
import { ScopeDeskPanel } from "./scope-desk-panel"

export const metadata: Metadata = {
	title: "Contact-2 — Start A Project | ReUI Base",
	description:
		"Share your project essentials, request a brief, and connect with our team to launch your next project.",
}

export default function Contact2Page() {
	return (
		<div className="bg-bg flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-10">
			{/* Main 2-Column Contact Container */}
			<div className="border-border/80 bg-elevation-level1 w-full max-w-6xl overflow-hidden rounded-3xl border shadow-xl">
				<div className="grid grid-cols-1 lg:grid-cols-2">
					{/* Left: Contact Brief Form */}
					<ContactForm />

					{/* Right: Scope Desk Showcase Gradient Panel */}
					<div className="p-3 sm:p-4 lg:p-5">
						<ScopeDeskPanel />
					</div>
				</div>
			</div>
		</div>
	)
}
