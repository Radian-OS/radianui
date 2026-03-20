"use client"

import { useState } from "react"
import InviteStep from "./_components/invite-step"
import PersonalInfoStep from "./_components/personal-info-step"
import ProjectNameStep from "./_components/project-name-step"
import SignupLayout from "./_components/signup-layout"
import SignupStep from "./_components/signup-step"
import VerifyStep from "./_components/verify-step"

export default function SignupFlowPage() {
	const [step, setStep] = useState(1)

	function nextStep() {
		setStep((prev) => Math.min(prev + 1, 5))
	}

	return (
		<SignupLayout>
			{step === 1 && <SignupStep onNext={nextStep} />}
			{step === 2 && <VerifyStep onNext={nextStep} />}
			{step === 3 && <PersonalInfoStep onNext={nextStep} />}
			{step === 4 && <ProjectNameStep onNext={nextStep} />}
			{step === 5 && (
				<InviteStep
					onNext={() => console.log("Onboarding complete!")}
					onSkip={() => console.log("Skipped invite")}
				/>
			)}
		</SignupLayout>
	)
}
