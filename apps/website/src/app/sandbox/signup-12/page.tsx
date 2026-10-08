import React from "react"
import type { Metadata } from "next"
import { AnimatedGridBackground } from "./animated-grid-background"
import { AuthForm } from "./auth-form"
import { AuthHeader } from "./auth-header"
import { EditorialPanel } from "./editorial-panel"
import { SocialButtons } from "./social-buttons"
import { ThemeToggle } from "./theme-toggle"

export const metadata: Metadata = {
	title: "Sign up to ReUI — Auth 1 Sandbox",
	description:
		"ReUI base auth-1 sign-up pattern featuring an animated background grid with floating boxes and an editorial visual panel.",
}

export default function Auth1Page() {
	return (
		<div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
			{/* Theme Toggle Button for quick light/dark testing */}
			<ThemeToggle />

			{/* Animated Grid with Subtle Floating Boxes in Background */}
			<AnimatedGridBackground />

			{/* Centered Split Layout Container */}
			<main className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
				<div
					data-auth-surface
					className="mx-auto grid w-full max-w-[76rem] items-center justify-center gap-8 lg:grid-cols-[minmax(0,400px)_minmax(0,450px)] lg:gap-24 xl:grid-cols-[minmax(0,420px)_minmax(0,490px)] xl:gap-28">
					{/* Left Column: Sign-up Credentials Form */}
					<div
						data-auth-form
						className="mx-auto w-full max-w-[360px] shrink-0 sm:max-w-[380px] lg:mx-0">
						<AuthHeader />
						<AuthForm />
						<SocialButtons />
					</div>

					{/* Right Column: Editorial Visual Card */}
					<EditorialPanel />
				</div>
			</main>
		</div>
	)
}
