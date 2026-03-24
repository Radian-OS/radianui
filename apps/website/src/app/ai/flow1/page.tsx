"use client"

import { useState } from "react"
import Link from "next/link"
import PersonalInfoStep from "./personal-info-step"
import SignupStep from "./signup-step"
import ThemeStep from "./theme-step"
import UseCaseStep from "./use-case-step"
import VerifyStep from "./verify-step"

export default function SignupPage() {
	const [step, setStep] = useState(1)

	return (
		<div className="bg-bg relative flex min-h-screen items-center justify-center px-4 py-10">
			{step === 1 && <SignupStep onNext={() => setStep(2)} />}
			{step === 2 && <VerifyStep onNext={() => setStep(3)} />}
			{step === 3 && <PersonalInfoStep onNext={() => setStep(4)} />}
			{step === 4 && (
				<UseCaseStep onNext={() => setStep(5)} onSkip={() => setStep(5)} />
			)}
			{step === 5 && (
				<ThemeStep
					onNext={() => alert("Onboarding complete!")}
					onSkip={() => alert("Onboarding complete!")}
				/>
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
