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
		</Stepper>
	)
}
