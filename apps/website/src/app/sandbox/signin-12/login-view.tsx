"use client"

import React from "react"
import { LeftShowcase } from "./left-showcase"
import { LoginHeader } from "./login-header"
import { SocialButtons } from "./social-buttons"
import { LoginForm } from "./login-form"
import { Divider } from "@/styles/default/ui/divider"

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
					<div className="flex w-full items-center gap-3">
						<Divider className="flex-1" />
						<span className="text-fg-secondary text-sm">or sign in with</span>
						<Divider className="flex-1" />
					</div>

					{/* Credentials Form */}
					<LoginForm />
				</div>
			</div>
		</div>
	)
}
