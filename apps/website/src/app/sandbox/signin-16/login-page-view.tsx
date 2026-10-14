"use client"

import React from "react"
import { LoginDashboardCard } from "./login-dashboard-card"
import { LoginForm } from "./login-form"

export function LoginPageView() {
	return (
		<div className="flex min-h-screen w-full flex-col lg:flex-row">
			{/* Left Column: Dark Dashboard Showcase */}
			<div className="hidden w-full items-center justify-center lg:flex lg:flex-1">
				<LoginDashboardCard />
			</div>

			{/* Right Column: Centered Login Form */}
			<div className="flex min-h-screen w-full items-center justify-center px-4 py-8 sm:px-6 lg:min-h-0 lg:flex-1 lg:px-8">
				<LoginForm />
			</div>
		</div>
	)
}
