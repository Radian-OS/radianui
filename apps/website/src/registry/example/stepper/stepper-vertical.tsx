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

export default function StepperVertical() {
	return (
		<Stepper
			className="flex items-stretch justify-center gap-10"
			defaultValue={2}
			orientation="vertical"
			indicators={{
				completed: <CheckIcon className="size-4" />,
			}}>
			<StepperNav>
				{steps.map((step, index) => (
					<StepperItem
						key={index}
						step={index + 1}
						className="relative items-start not-last:flex-1">
						<StepperTrigger className="items-start gap-2 pb-12 last:pb-0">
							<StepperIndicator className="data-[state=completed]:bg-success data-[state=completed]:text-white">
								{index + 1}
							</StepperIndicator>
							<div className="flex flex-col gap-1 text-left">
								<StepperTitle>{step.title}</StepperTitle>
								<StepperDescription>{step.description}</StepperDescription>
							</div>
						</StepperTrigger>
						{index < steps.length - 1 && (
							<StepperSeparator className="group-data-[state=completed]/step:bg-success absolute inset-y-0 top-7 left-3 -order-1 m-0 -translate-x-1/2 group-data-[orientation=vertical]/stepper-nav:h-[calc(100%-2rem)]" />
						)}
					</StepperItem>
				))}
			</StepperNav>

			<StepperPanel className="bg-fill1 text-fg-tertiary flex flex-1 flex-col items-center justify-center self-stretch rounded-xl px-2.5 py-10 text-sm">
				{steps.map((step, index) => (
					<StepperContent
						className="flex h-full w-full items-center justify-center text-center"
						key={index}
						value={index + 1}>
						{step.title} content
					</StepperContent>
				))}
			</StepperPanel>
		</Stepper>
	)
}
