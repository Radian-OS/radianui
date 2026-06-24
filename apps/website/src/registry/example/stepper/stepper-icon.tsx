"use client"

import { useState } from "react"
import { Box, CheckIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
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
	{
		title: "Step 1",
		icon: <Box className="size-4" />,
	},
	{
		title: "Step 2",
		icon: <Box className="size-4" />,
	},
	{
		title: "Step 3",
		icon: <Box className="size-4" />,
	},
	{
		title: "Step 4",
		icon: <Box className="size-4" />,
	},
]

export default function StepperIcon() {
	const [currentStep, setCurrentStep] = useState(2)

	return (
		<Stepper
			value={currentStep}
			onValueChange={setCurrentStep}
			indicators={{
				completed: <CheckIcon className="size-4" />,
			}}
			className="w-full max-w-md space-y-8">
			<StepperNav className="gap-3">
				{steps.map((step, index) => (
					<StepperItem
						key={index}
						step={index + 1}
						className="relative flex-1 items-center justify-center">
						<StepperTrigger className="flex flex-col items-center gap-2">
							<StepperIndicator className="data-[state=inactive]:border-border data-[state=active]:border-primary-border data-[state=inactive]:text-fg-tertiary data-[state=completed]:bg-success data-[state=completed]:border-success-border size-8 border-2 data-[state=inactive]:bg-transparent data-[state=completed]:text-white">
								{step.icon}
							</StepperIndicator>
							<div className="flex flex-col items-center gap-1">
								<StepperTitle className="group-data-[state=inactive]/step:text-fg-tertiary">
									{step.title}
								</StepperTitle>
							</div>
						</StepperTrigger>

						{steps.length > index + 1 && (
							<StepperSeparator className="group-data-[state=completed]/step:bg-success absolute left-[calc(50%+1.25rem)] right-[calc(-60%+1.25rem)] top-4 m-0 group-data-[orientation=horizontal]/stepper-nav:flex-none" />
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
