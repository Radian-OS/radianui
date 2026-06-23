"use client"

import { useEffect, useState } from "react"
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
	const [progressValues, setProgressValues] = useState<number[]>(
		steps.map((_, i) => (i + 1 <= 2 ? 100 : 0))
	)

	useEffect(() => {
		setProgressValues(
			steps.map((_, i) => {
				if (i + 1 < currentStep) return 100
				if (i + 1 === currentStep) return 100
				return 0
			})
		)
	}, [currentStep])

	return (
		<Stepper
			value={currentStep}
			onValueChange={setCurrentStep}
			className="w-full space-y-8">
			<StepperNav className="mb-10 gap-5">
				{steps.map((step, index) => (
					<StepperItem
						key={index}
						step={index + 1}
						className="relative flex-1 items-start">
						<StepperTrigger className="flex grow flex-col items-start justify-center gap-3.5">
							<Progress
								value={progressValues[index]}
								className="h-1 w-full"
								indicatorClassName="transition-transform duration-700 ease-out"
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
				{" "}
				{/* added */}
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
