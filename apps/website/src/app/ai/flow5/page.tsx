"use client"

import { useState } from "react"
import PersonalInfoStep from "./_components/personal-info-step"
import PreferencesStep from "./_components/preferences-step"
import SetupLayout from "./_components/setup-layout"
import SignupStep from "./_components/signup-step"
import VerifyStep from "./_components/verify-step"

export default function AccountSetupPage() {
	const [step, setStep] = useState(1)

	function nextStep() {
		setStep((prev) => Math.min(prev + 1, 4))
	}

	return (
		<SetupLayout>
			{step === 1 && <SignupStep onNext={nextStep} />}
			{step === 2 && <VerifyStep onNext={nextStep} />}
			{step === 3 && <PersonalInfoStep onNext={nextStep} />}
			{step === 4 && (
				<PreferencesStep onNext={() => console.log("Setup complete!")} />
			)}
		</SetupLayout>
	)
}
