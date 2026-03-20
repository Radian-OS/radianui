"use client"

import { useState } from "react"
import AppsStep from "./_components/apps-step"
import CreateWorkspaceStep from "./_components/create-workspace-step"
import InviteStep from "./_components/invite-step"
import PersonalInfoStep from "./_components/personal-info-step"
import SignupStep from "./_components/signup-step"
import VerifyStep from "./_components/verify-step"

export default function SignupCompleteFlowPage() {
	const [step, setStep] = useState(1)

	function nextStep() {
		setStep((prev) => Math.min(prev + 1, 6))
	}

	function prevStep() {
		setStep((prev) => Math.max(prev - 1, 1))
	}

	return (
		<>
			{step === 1 && <SignupStep onNext={nextStep} />}
			{step === 2 && <VerifyStep onNext={nextStep} />}
			{step === 3 && <PersonalInfoStep onNext={nextStep} />}
			{step === 4 && <AppsStep onNext={nextStep} onSkip={nextStep} />}
			{step === 5 && (
				<CreateWorkspaceStep onNext={nextStep} onBack={prevStep} />
			)}
			{step === 6 && (
				<InviteStep
					onNext={() => console.log("Onboarding complete!")}
					onSkip={() => console.log("Skipped invite")}
				/>
			)}
		</>
	)
}
