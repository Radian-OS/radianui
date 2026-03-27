"use client"

import { useState } from "react"
import AppsStep from "./apps-step"
import InviteStep from "./invite-step"
import OnboardingHeader from "./onboarding-header"
import PersonalInfoStep from "./personal-info-step"
import SignupStep from "./signup-step"
import VerifyStep from "./verify-step"
import WorkspaceStep from "./workspace-step"

export default function Flow4Page() {
	const [step, setStep] = useState(1)

	const showHeader = step >= 3

	return (
		<div className="bg-bg relative flex min-h-screen flex-col">
			{showHeader && <OnboardingHeader />}

			<div className="flex flex-1 items-center justify-center px-4 py-10">
				{step === 1 && <SignupStep onNext={() => setStep(2)} />}
				{step === 2 && <VerifyStep onNext={() => setStep(3)} />}
				{step === 3 && <PersonalInfoStep onNext={() => setStep(4)} />}
				{step === 4 && (
					<AppsStep onNext={() => setStep(5)} onSkip={() => setStep(5)} />
				)}
				{step === 5 && (
					<WorkspaceStep onNext={() => setStep(6)} onBack={() => setStep(4)} />
				)}
				{step === 6 && (
					<InviteStep
						onNext={() => alert("Onboarding complete!")}
						onSkip={() => alert("Onboarding complete!")}
					/>
				)}
			</div>
		</div>
	)
}
