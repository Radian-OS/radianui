"use client"

import React from "react"
import { LoginDashboardCard } from "./login-dashboard-card"
import { LoginForm } from "./login-form"

export function LoginPageView() {
	return (
		<div className="h-dvh w-full lg:grid lg:grid-cols-2">
			{/* Left Column: Workforce Showcase */}
			<LoginDashboardCard />

			{/* Right Column: Existing Signup Form */}
			<div className="bg-bg text-fg flex h-full flex-col items-center justify-center overflow-y-auto py-10 sm:px-5">
				<LoginForm />
			</div>
		</div>
	)
}
