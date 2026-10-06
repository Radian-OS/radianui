"use client"

import React from "react"
import { LoginDashboardCard } from "./login-dashboard-card"
import { LoginForm } from "./login-form"

export function LoginPageView() {
	return (
		<div className="bg-bg flex min-h-screen w-full flex-col lg:flex-row">
			{/* Left Column: Dark Dashboard Showcase */}
			<div className="flex w-full p-4 sm:p-6 lg:w-1/2 lg:p-0">
				<LoginDashboardCard />
			</div>

			{/* Right Column: Centered Login Form */}
			<div className="flex w-full items-center justify-center p-6 sm:p-10 lg:w-1/2 lg:p-16">
				<LoginForm />
			</div>
		</div>
	)
}
