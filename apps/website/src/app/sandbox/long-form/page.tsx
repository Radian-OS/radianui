"use client"

import React from "react"
import { Card } from "@/styles/default/ui/card"
import { RegistrationHeader } from "./registration-header"
import { LongForm } from "./long-form"

export default function LongFormPage() {
	return (
		<div className="bg-background flex min-h-screen w-full items-center justify-center p-4 sm:p-6 md:p-10">
			<Card className="border-border bg-card w-full max-w-md rounded-2xl border p-6 shadow-xl sm:p-8">
				<div className="flex flex-col gap-6">
					<RegistrationHeader />
					<LongForm />
				</div>
			</Card>
		</div>
	)
}
