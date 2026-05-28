"use client"

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

export default function StepperState() {
	return (
		<Stepper defaultValue={2} className="w-full max-w-md space-y-8">
			<StepperNav>
				{steps.map((step) => (
					<StepperItem key={step} step={step}>
						<StepperTrigger>
							<StepperIndicator>{step}</StepperIndicator>
						</StepperTrigger>
						{steps.length > step && <StepperSeparator />}
					</StepperItem>
				))}
			</StepperNav>
			<StepperPanel className="text-sm">
				{steps.map((step) => (
					<StepperContent
						className="flex w-full items-center justify-center"
						key={step}
						value={step}>
						Step {step} content
					</StepperContent>
				))}
			</StepperPanel>
		</Stepper>
	)
}
