"use client"

import { useState } from "react"
import AuthLayout from "./auth-layout"
import GettingStartedStep from "./getting-started-step"
import SignupStep from "./signup-step"
import UseCaseStep from "./use-case-step"
import VerifyStep from "./verify-step"

export default function Flow6Page() {
	const [step, setStep] = useState(1)

	return (
		<AuthLayout>
			{step === 1 && <SignupStep onNext={() => setStep(2)} />}
			{step === 2 && <VerifyStep onNext={() => setStep(3)} />}
			{step === 3 && <UseCaseStep onNext={() => setStep(4)} />}
			{step === 4 && (
				<GettingStartedStep onNext={() => alert("Onboarding complete!")} />
			)}
		</AuthLayout>
	)
}
