"use client"

import { CheckIcon } from "lucide-react"
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
	{ title: "Step 1", description: "First step description" },
	{ title: "Step 2", description: "Second step description" },
	{ title: "Step 3", description: "Third step description" },
	{ title: "Step 4", description: "Fourth step description" },
]

export default function StepperDescriptionExample() {
	return (
		<Stepper
			defaultValue={2}
			indicators={{
				completed: <CheckIcon className="size-4" />,
			}}
			className="w-full space-y-8">
			<StepperNav>
				{steps.map((step, index) => (
					<StepperItem
						key={index}
						step={index + 1}
						className="relative flex-1 items-start">
						<StepperTrigger className="flex flex-col gap-2">
							<StepperIndicator>{index + 1}</StepperIndicator>
							<div className="flex flex-col gap-1">
								<StepperTitle>{step.title}</StepperTitle>
								<StepperDescription>{step.description}</StepperDescription>
							</div>
						</StepperTrigger>

						{steps.length > index + 1 && (
							<StepperSeparator className="group-data-[state=completed]/step:bg-primary absolute inset-x-0 left-[calc(50%+0.875rem)] top-2.5 m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none" />
						)}
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
		</Stepper>
	)
}
