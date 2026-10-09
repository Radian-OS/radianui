"use client"

import React from "react"
import { LoginDashboardCard } from "./login-dashboard-card"
import { LoginForm } from "./login-form"

export function LoginPageView() {
	return (
		<div className="h-dvh w-full lg:grid lg:grid-cols-2">
			{/* Left Column: Dark Dashboard Showcase */}
			<LoginDashboardCard />

			{/* Right Column: Centered Signup Form */}
			<div className="flex h-full flex-col items-center justify-center overflow-y-auto bg-white py-10 text-neutral-900 sm:px-5">
				<LoginForm />
			</div>
		</div>
	)
}
