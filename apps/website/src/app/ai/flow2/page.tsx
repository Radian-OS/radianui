"use client"

import { useState } from "react"
import AuthLayout from "./_components/auth-layout"
import InviteStep from "./_components/invite-step"
import PersonalInfoStep from "./_components/personal-info-step"
import SignupStep from "./_components/signup-step"
import UsecaseStep from "./_components/usecase-step"
import VerifyStep from "./_components/verify-step"

export default function Flow2Page() {
	const [step, setStep] = useState(1)

	function nextStep() {
		setStep((prev) => Math.min(prev + 1, 5))
	}

	const showHeader = step >= 3
	const email = showHeader ? "design@radian.com" : undefined

	return (
		<AuthLayout showHeader={showHeader} email={email}>
			{step === 1 && <SignupStep onNext={nextStep} />}
			{step === 2 && <VerifyStep onNext={nextStep} />}
			{step === 3 && <PersonalInfoStep onNext={nextStep} />}
			{step === 4 && <UsecaseStep onNext={nextStep} />}
			{step === 5 && (
				<InviteStep onNext={() => console.log("Onboarding complete!")} />
			)}
		</AuthLayout>
	)
}
