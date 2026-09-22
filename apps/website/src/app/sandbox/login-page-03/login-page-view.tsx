"use client"

import React from "react"
import { LoginForm } from "./login-form"
import { LoginFeatureCard } from "./login-feature-card"

export function LoginPageView() {
	return (
		<div className="bg-background flex min-h-screen w-full items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
			<div className="grid w-full max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
				{/* Left Form Column */}
				<div className="flex w-full items-center justify-center py-4">
					<LoginForm />
				</div>

				{/* Right Showcase Card Column */}
				<div className="flex w-full items-center justify-center">
					<LoginFeatureCard />
				</div>
			</div>
		</div>
	)
}
