"use client"

import { useState } from "react"
import AuthLayout from "./auth-layout"
import InviteStep from "./invite-step"
import PersonalInfoStep from "./personal-info-step"
import SignupStep from "./signup-step"
import UseCaseStep from "./use-case-step"
import VerifyStep from "./verify-step"

export default function Flow2Page() {
	const [step, setStep] = useState(1)

	const showHeader = step >= 3

	return (
		<AuthLayout showHeader={showHeader}>
			{step === 1 && <SignupStep onNext={() => setStep(2)} />}
			{step === 2 && <VerifyStep onNext={() => setStep(3)} />}
			{step === 3 && <PersonalInfoStep onNext={() => setStep(4)} />}
			{step === 4 && (
				<UseCaseStep onNext={() => setStep(5)} onSkip={() => setStep(5)} />
			)}
			{step === 5 && (
				<InviteStep
					onNext={() => alert("Onboarding complete!")}
					onSkip={() => alert("Onboarding complete!")}
				/>
			)}
		</AuthLayout>
	)
}
