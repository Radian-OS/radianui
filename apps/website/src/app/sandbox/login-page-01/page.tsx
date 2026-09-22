"use client"

import React from "react"
import { LoginCard } from "./login-card"
import { LoginOrbitalBackground } from "./login-orbital-background"

export default function LoginPage01Page() {
	return (
		<main className="bg-background text-foreground relative flex min-h-screen w-full items-center justify-center overflow-hidden p-4 sm:p-6 lg:p-8">
			<LoginOrbitalBackground />
			<LoginCard />
		</main>
	)
}
