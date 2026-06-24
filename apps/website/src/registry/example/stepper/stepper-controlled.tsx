"use client"

import { useState } from "react"
import { Button } from "@/registry/ui/button"
import {
	Stepper,
	StepperContent,
	StepperIndicator,
	StepperItem,
	StepperNav,
	StepperPanel,
	StepperSeparator,
	StepperTrigger,
} from "@/registry/ui/stepper"

const steps = [1, 2, 3, 4]

export default function StepperControlled() {
	const [currentStep, setCurrentStep] = useState(2)

	return (
		<Stepper
			value={currentStep}
			onValueChange={setCurrentStep}
			className="w-full max-w-md space-y-8">
			<StepperNav>
				{steps.map((step) => (
					<StepperItem key={step} step={step}>
						<StepperTrigger>
							<StepperIndicator className="data-[state=active]:bg-primary data-[state=completed]:bg-success data-[state=inactive]:text-fg-tertiary data-[state=active]:text-white data-[state=completed]:text-white">
								{step}
							</StepperIndicator>
						</StepperTrigger>
						{steps.length > step && (
							<StepperSeparator className="group-data-[state=completed]/step:bg-success" />
						)}
					</StepperItem>
				))}
			</StepperNav>

			<StepperPanel className="text-sm">
				{steps.map((step) => (
					<StepperContent
						className="bg-fill1 text-fg-tertiary flex items-center justify-center rounded-xl px-2.5 py-10 text-sm"
						key={step}
						value={step}>
						Step {step} content
					</StepperContent>
				))}
			</StepperPanel>

			{/* Buttons */}
			<div className="flex items-center justify-between gap-2.5">
				<Button
					variant="outline"
					color="neutral"
					onClick={() => setCurrentStep((prev) => prev - 1)}
					disabled={currentStep === 1}>
					Previous
				</Button>
				<Button
					variant="outline"
					color="neutral"
					onClick={() => setCurrentStep((prev) => prev + 1)}
					disabled={currentStep === steps.length}>
					Next
				</Button>
			</div>
		</Stepper>
	)
}
