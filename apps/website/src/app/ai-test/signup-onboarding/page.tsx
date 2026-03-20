"use client"

import { useState } from "react"
import { InviteStep } from "./invite-step"
import { ProfileStep } from "./profile-step"
import { ProjectStep } from "./project-step"
import { SignupStep } from "./signup-step"
import { VerifyStep } from "./verify-step"

export default function SignupOnboardingPage() {
	const [step, setStep] = useState(0)

	const nextStep = () => setStep((s) => Math.min(s + 1, 4))

	switch (step) {
		case 0:
			return <SignupStep onNext={nextStep} />
		case 1:
			return <VerifyStep onNext={nextStep} />
		case 2:
			return <ProfileStep onNext={nextStep} />
		case 3:
			return <ProjectStep onNext={nextStep} />
		case 4:
			return <InviteStep onNext={nextStep} />
		default:
			return <SignupStep onNext={nextStep} />
	}
}
