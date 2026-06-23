"use client"

import { CheckIcon } from "lucide-react"
import {
	Stepper,
	StepperContent,
	StepperIndicator,
	StepperItem,
	StepperNav,
	StepperPanel,
	StepperSeparator,
	StepperTitle,
	StepperTrigger,
} from "@/registry/ui/stepper"

const steps = [
	{ title: "Step 1" },
	{ title: "Step 2" },
	{ title: "Step 3" },
	{ title: "Step 4" },
]

export default function StepperTitleExample() {
	return (
		<Stepper
			className="w-full max-w-md space-y-8"
			defaultValue={2}
			indicators={{
				completed: <CheckIcon className="size-4" />,
			}}>
			<StepperNav>
				{steps.map((step, index) => (
					<StepperItem
						key={index}
						step={index + 1}
						className="relative flex-1 items-start">
						<StepperTrigger className="flex flex-col gap-2.5">
							<StepperIndicator>{index + 1}</StepperIndicator>
							<StepperTitle>{step.title}</StepperTitle>
						</StepperTrigger>

						{steps.length > index + 1 && (
							<StepperSeparator className="group-data-[state=completed]/step:bg-primary absolute inset-x-0 left-[calc(50%+0.875rem)] top-3 m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none" />
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
