import React from "react"
import Link from "next/link"
import { LeftPanel } from "./left-panel"
import { LoginForm } from "./login-form"

export default function Login07Page() {
	return (
		<main className="bg-bg min-h-screen w-full">
			<div className="bg-bg flex min-h-screen w-full flex-col lg:flex-row">
				{/* Left Visual & Testimonial Showcase */}
				<LeftPanel />

				{/* Right Authentication Form */}
				<div className="flex min-h-screen w-full flex-1 flex-col items-center justify-between p-6 sm:p-8 lg:p-10">
					{/* Top Spacer for vertical balance */}
					<div className="hidden h-4 lg:block" />

					{/* Center Form Container */}
					<div className="my-auto w-full max-w-[400px] py-8">
						<LoginForm />
					</div>

					{/* Bottom Terms & Privacy pinned lower to the bottom */}
					<div className="text-fg-secondary flex items-center justify-center gap-5 py-2 text-xs">
						<Link href="#terms" className="hover:text-fg transition-colors">
							Terms
						</Link>
						<Link href="#privacy" className="hover:text-fg transition-colors">
							Privacy
						</Link>
						<Link href="#support" className="hover:text-fg transition-colors">
							Support
						</Link>
					</div>
				</div>
			</div>
		</main>
	)
}
