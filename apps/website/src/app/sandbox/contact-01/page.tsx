import React from "react"
import type { Metadata } from "next"
import { InfoPanel } from "./info-panel"
import { InquiryForm } from "./inquiry-form"

export const metadata: Metadata = {
	title: "Contact-01 — Start the project | Shadcn Space",
	description:
		"Let’s discuss about your project and take it the next level. Submit your project inquiry with Shadcn Space.",
}

export default function Contact01Page() {
	return (
		<div className="bg-bg text-fg flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-12">
			{/* Main 2-Column Content Container */}
			<div className="mx-auto w-full max-w-7xl">
				<div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
					{/* Left Column: Heading, Contact Info & Trusted By */}
					<div className="lg:col-span-6">
						<InfoPanel />
					</div>

					{/* Right Column: Inquiry Form Card */}
					<div className="lg:col-span-6">
						<InquiryForm />
					</div>
				</div>
			</div>
		</div>
	)
}
