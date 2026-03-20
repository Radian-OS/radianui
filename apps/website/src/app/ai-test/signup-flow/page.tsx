"use client"

import { useState } from "react"
import { InviteStep } from "./invite-step"
import { PersonalInfoStep } from "./personal-info-step"
import { SignupStep } from "./signup-step"
import { UsageStep } from "./usage-step"
import { VerifyStep } from "./verify-step"

export default function SignupFlowPage() {
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
			return <UsageStep onNext={nextStep} />
		case 5:
			return <InviteStep onNext={() => alert("Onboarding complete!")} />
		default:
			return <SignupStep onNext={nextStep} />
	}
}
