"use client"

import { useState } from "react"
import Link from "next/link"
import { Radian } from "../icon/radian"
import PersonalInfoStep from "./personal-info-step"
import SetupPreferencesStep from "./setup-preferences-step"
import SignupStep from "./signup-step"
import VerifyStep from "./verify-step"

export default function Flow5Page() {
	const [step, setStep] = useState(1)

	return (
		<div className="bg-fill1 relative flex min-h-screen items-center justify-center px-4 py-10">
			{/* Logo */}
			<div className="absolute left-6 top-6 flex items-center gap-2.5">
				<Radian />
				<span className="text-fg font-heading text-lg font-semibold">
					Radian
				</span>
			</div>

			{step === 1 && <SignupStep onNext={() => setStep(2)} />}
			{step === 2 && <VerifyStep onNext={() => setStep(3)} />}
			{step === 3 && <PersonalInfoStep onNext={() => setStep(4)} />}
			{step === 4 && (
				<SetupPreferencesStep onNext={() => alert("Onboarding complete!")} />
			)}

			<p className="text-fg-tertiary absolute bottom-8 left-1/2 -translate-x-1/2 text-sm">
				Having trouble? Contact our team at{" "}
				<Link
					href="mailto:support@radian.os"
					className="text-primary font-medium hover:underline">
					support@radian.os
				</Link>
			</p>
		</div>
	)
}
