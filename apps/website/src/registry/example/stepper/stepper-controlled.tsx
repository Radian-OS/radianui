"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/registry/ui/button"
import {
	Stepper,
	StepperContent,
	StepperDescription,
	StepperIndicator,
	StepperItem,
	StepperNav,
	StepperPanel,
	StepperSeparator,
	StepperTitle,
	StepperTrigger,
} from "@/registry/ui/stepper"

const steps = [
	{
		step: 1,
		title: "Plan",
		description: "Choose seats",
		content: "Start with 12 editor seats and unlimited viewer access.",
	},
	{
		step: 2,
		title: "Team",
		description: "Invite admins",
		content: "Add account owners who can manage billing and permissions.",
	},
	{
		step: 3,
		title: "Confirm",
		description: "Review changes",
		content: "Confirm the subscription change before the next billing cycle.",
	},
]

export default function StepperControlled() {
	const [step, setStep] = useState(1)
	const isFirstStep = step === 1
	const isLastStep = step === steps.length

	return (
		<div className="w-full max-w-lg space-y-5">
			<Stepper value={step} onValueChange={setStep} className="space-y-6">
				<StepperNav>
					{steps.map((item, index) => (
						<StepperItem key={item.step} step={item.step}>
							<StepperTrigger className="items-start">
								<StepperIndicator>{item.step}</StepperIndicator>
								<span className="hidden text-left sm:block">
									<StepperTitle>{item.title}</StepperTitle>
									<StepperDescription className="mt-1 text-xs">
										{item.description}
									</StepperDescription>
								</span>
							</StepperTrigger>
							{index < steps.length - 1 && (
								<StepperSeparator className="group-data-[state=completed]/step:bg-primary" />
							)}
						</StepperItem>
					))}
				</StepperNav>

				<StepperPanel className="border-border rounded-lg border p-4 text-sm">
					{steps.map((item) => (
						<StepperContent
							key={item.step}
							value={item.step}
							forceMount
							className="space-y-2">
							<h3 className="font-medium">{item.title}</h3>
							<p className="text-fg-secondary">{item.content}</p>
						</StepperContent>
					))}
				</StepperPanel>
			</Stepper>

			<div className="flex justify-end gap-2">
				<Button
					type="button"
					variant="outline"
					color="neutral"
					size="32"
					disabled={isFirstStep}
					onClick={() => setStep((current) => Math.max(current - 1, 1))}>
					<ArrowLeft />
					Back
				</Button>
				<Button
					type="button"
					size="32"
					onClick={() =>
						setStep((current) => Math.min(current + 1, steps.length))
					}>
					{isLastStep ? "Finish" : "Next"}
					{!isLastStep && <ArrowRight />}
				</Button>
			</div>
		</div>
	)
}
