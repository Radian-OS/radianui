"use client"

import React from "react"
import { LeftShowcase } from "./left-showcase"
import { LoginHeader } from "./login-header"
import { SocialButtons } from "./social-buttons"
import { LoginForm } from "./login-form"

export function LoginView() {
	return (
		<div className="bg-bg text-fg flex min-h-screen w-full items-stretch overflow-hidden">
			{/* Left Column: Visual Showcase with Video */}
			<LeftShowcase />

			{/* Right Column: Centered Authentication Form */}
			<div className="flex min-h-screen flex-1 flex-col items-center justify-center p-6 sm:p-10 lg:p-16">
				<div className="flex w-full max-w-md flex-col gap-6">
					{/* Logo, Title & Subtitle */}
					<LoginHeader />

					{/* Google & GitHub OAuth Buttons */}
					<SocialButtons />

					{/* Divider */}
					<div className="text-fg-secondary before:bg-border after:bg-border flex w-full items-center gap-3 text-sm before:h-px before:flex-1 before:content-[''] after:h-px after:flex-1 after:content-['']">
						or sign in with
					</div>

					{/* Credentials Form */}
					<LoginForm />
				</div>
			</div>
		</div>
	)
}
