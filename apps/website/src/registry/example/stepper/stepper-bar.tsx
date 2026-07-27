"use client"

import { useState } from "react"
import { Button } from "@/registry/ui/button"
import { Progress } from "@/registry/ui/progress"
import {
	Stepper,
	StepperContent,
	StepperItem,
	StepperNav,
	StepperPanel,
	StepperTitle,
	StepperTrigger,
} from "@/registry/ui/stepper"

const steps = [
	{ title: "Step 1" },
	{ title: "Step 2" },
	{ title: "Step 3" },
	{ title: "Step 4" },
]

export default function StepperBar() {
	const [currentStep, setCurrentStep] = useState(2)

	return (
		<Stepper
			value={currentStep}
			onValueChange={setCurrentStep}
			className="w-full space-y-8">
			<StepperNav className="mb-10 gap-2">
				{steps.map((step, index) => (
					<StepperItem
						key={index}
						step={index + 1}
						className="relative flex-1 items-start">
						<StepperTrigger className="flex grow flex-col items-start justify-center gap-2">
							<Progress
								value={index + 1 <= currentStep ? 100 : 0}
								className="w-full"
								indicatorClassName="transition-none"
							/>
							<StepperTitle className="group-data-[state=inactive]/step:text-fg-secondary text-start">
								{step.title}
							</StepperTitle>
						</StepperTrigger>
					</StepperItem>
				))}
			</StepperNav>

			<StepperPanel className="text-sm">
				{steps.map((step, index) => (
					<StepperContent
						key={index}
						value={index + 1}
						className="bg-fill1 text-fg-tertiary flex items-center justify-center rounded-xl px-2.5 py-10 text-sm">
						{step.title} content
					</StepperContent>
				))}
			</StepperPanel>

			<div className="flex items-center justify-between gap-2.5">
				<Button
					variant="outline"
					color="neutral"
					onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
					disabled={currentStep === 1}>
					Previous
				</Button>
				<Button
					variant="outline"
					color="neutral"
					onClick={() =>
						setCurrentStep((prev) => Math.min(steps.length, prev + 1))
					}
					disabled={currentStep === steps.length}>
					Next
				</Button>
			</div>
		</Stepper>
	)
}
