"use client"

import React from "react"
import { Card } from "@/styles/default/ui/card"
import { ProfileHeader } from "./profile-header"
import { ProfileForm } from "./profile-form"

export default function Form1Page() {
	return (
		<div className="bg-background flex min-h-screen w-full items-center justify-center p-4 sm:p-6 md:p-10">
			<Card className="border-border bg-card w-full max-w-2xl rounded-2xl border p-6 shadow-xl sm:p-8">
				<div className="flex flex-col gap-6">
					<ProfileHeader />
					<ProfileForm />
				</div>
			</Card>
		</div>
	)
}
