"use client"

import React from "react"
import { OnboardingChecklistView } from "./onboarding-checklist-view"

export default function OnboardingChecklistPage() {
	return (
		<main className="bg-background text-foreground flex min-h-screen w-full items-center justify-center">
			<OnboardingChecklistView />
		</main>
	)
}
