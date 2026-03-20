"use client"

import { useState } from "react"
import AuthLayout from "./_components/auth-layout"
import GettingStartedStep from "./_components/getting-started-step"
import SignupStep from "./_components/signup-step"
import UsecaseStep from "./_components/usecase-step"
import VerifyStep from "./_components/verify-step"

export default function SignupOnboardingPage() {
	const [step, setStep] = useState(1)

	function nextStep() {
		setStep((prev) => Math.min(prev + 1, 4))
	}

	return (
		<AuthLayout>
			{step === 1 && <SignupStep onNext={nextStep} />}
			{step === 2 && <VerifyStep onNext={nextStep} />}
			{step === 3 && <UsecaseStep onNext={nextStep} />}
			{step === 4 && (
				<GettingStartedStep
					onNext={() => console.log("Onboarding complete!")}
				/>
			)}
		</AuthLayout>
	)
}
