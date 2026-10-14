"use client"

import React from "react"
import { LoginForm } from "./login-form"
import { LoginFeatureCard } from "./login-feature-card"

export function LoginPageView() {
	return (
		<div className="min-h-screen w-full lg:grid lg:grid-cols-2">
			{/* Left Form Column */}
			<div className="flex min-h-screen w-full items-center justify-center p-4 py-8 sm:p-8 md:p-12">
				<LoginForm />
			</div>

			{/* Right Showcase Card Column */}
			<div className="hidden h-screen p-6 lg:flex lg:flex-col">
				<LoginFeatureCard />
			</div>
		</div>
	)
}
