"use client"

import React from "react"
import { LoginForm } from "./login-form"
import { LoginFeatureCard } from "./login-feature-card"

export function LoginPageView() {
	return (
		<div className="dark:bg-bg min-h-screen w-full bg-white lg:grid lg:grid-cols-2">
			{/* Left Form Column */}
			<div className="flex min-h-screen w-full items-center justify-center p-6 sm:px-8 md:px-12 lg:p-12">
				<LoginForm />
			</div>

			{/* Right Showcase Card Column */}
			<div className="hidden h-screen bg-neutral-100 p-6 lg:flex lg:flex-col dark:bg-neutral-900">
				<LoginFeatureCard />
			</div>
		</div>
	)
}
