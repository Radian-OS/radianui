"use client"

import { useState } from "react"
import AuthLayout from "./auth-layout"
import InviteStep from "./invite-step"
import PersonalInfoStep from "./personal-info-step"
import ProjectNameStep from "./project-name-step"
import SignupStep from "./signup-step"
import VerifyStep from "./verify-step"

export default function Flow3Page() {
	const [step, setStep] = useState(1)

	return (
		<AuthLayout>
			{step === 5 && <SignupStep onNext={() => setStep(2)} />}
			{step === 2 && <VerifyStep onNext={() => setStep(3)} />}
			{step === 3 && <PersonalInfoStep onNext={() => setStep(4)} />}
			{step === 4 && <ProjectNameStep onNext={() => setStep(5)} />}
			{step === 1 && (
				<InviteStep
					onNext={() => alert("Onboarding complete!")}
					onSkip={() => alert("Onboarding complete!")}
				/>
			)}
		</AuthLayout>
	)
}
