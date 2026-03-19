"use client"

import { useState } from "react"
import PersonalInfoStep from "./personal-info-step"
import SignupStep from "./signup-step"
import ThemeStep from "./theme-step"
import UsageStep from "./usage-step"
import VerifyStep from "./verify-step"

export default function OnboardingPage() {
	const [step, setStep] = useState(1)

	const nextStep = () => setStep((prev) => Math.min(prev + 1, 5))

	switch (step) {
		case 1:
			return <SignupStep onNext={nextStep} />
		case 2:
			return <VerifyStep onNext={nextStep} />
		case 3:
			return <PersonalInfoStep onNext={nextStep} />
		case 4:
			return <UsageStep onNext={nextStep} onSkip={nextStep} />
		case 5:
			return <ThemeStep onNext={nextStep} onSkip={nextStep} />
		default:
			return <SignupStep onNext={nextStep} />
	}
}
