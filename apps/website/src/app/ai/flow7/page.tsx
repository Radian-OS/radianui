"use client"

import { useState } from "react"
import ChoosePlanStep from "./_components/choose-plan-step"
import GetStartedStep from "./_components/get-started-step"
import HearAboutUsStep from "./_components/hear-about-us-step"
import PaymentStep from "./_components/payment-step"
import PersonalInfoStep from "./_components/personal-info-step"
import SetupLayout from "./_components/setup-layout"
import SignupStep from "./_components/signup-step"
import VerifyStep from "./_components/verify-step"

export default function SignupFullFlowPage() {
	const [step, setStep] = useState(1)
	const [selectedPlanId, setSelectedPlanId] = useState("standard")

	function nextStep() {
		setStep((prev) => Math.min(prev + 1, 7))
	}

	function handlePlanSelect(planId: string) {
		setSelectedPlanId(planId)
		setStep(7)
	}

	return (
		<SetupLayout>
			{step === 1 && <SignupStep onNext={nextStep} />}
			{step === 2 && <VerifyStep onNext={nextStep} />}
			{step === 3 && <PersonalInfoStep onNext={nextStep} />}
			{step === 4 && <HearAboutUsStep onNext={nextStep} onSkip={nextStep} />}
			{step === 5 && <GetStartedStep onNext={nextStep} />}
			{step === 6 && <ChoosePlanStep onNext={handlePlanSelect} />}
			{step === 7 && <PaymentStep selectedPlanId={selectedPlanId} />}
		</SetupLayout>
	)
}
