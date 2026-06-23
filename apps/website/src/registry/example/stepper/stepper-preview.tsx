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

export default function StepperPreview() {
	return (
		<Stepper defaultValue={2} className="w-full max-w-md space-y-8">
			<StepperNav>
				{steps.map((step) => (
					<StepperItem key={step} step={step}>
						<StepperTrigger>
							<StepperIndicator>{step}</StepperIndicator>
						</StepperTrigger>
						{steps.length > step && (
							<StepperSeparator className="group-data-[state=completed]/step:bg-primary" />
						)}
					</StepperItem>
				))}
			</StepperNav>

			<StepperPanel>
				{steps.map((step) => (
					<StepperContent
						key={step}
						value={step}
						className="bg-fill1 text-fg-tertiary flex items-center justify-center rounded-xl px-2.5 py-10 text-sm">
						Step {step} content
					</StepperContent>
				))}
			</StepperPanel>
		</Stepper>
	)
}
