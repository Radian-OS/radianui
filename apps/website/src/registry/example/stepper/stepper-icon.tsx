"use client"

import { Box } from "lucide-react"
import {
	Stepper,
	StepperContent,
	// StepperDescription,
	StepperIndicator,
	StepperItem,
	StepperNav,
	StepperPanel,
	StepperSeparator,
	// StepperTitle,
	StepperTrigger,
} from "@/registry/ui/stepper"

const steps = [
	{
		step: 1,
		title: "Step 1",
		description: "Insert description here",
		content: "This step has been completed successfully.",
		icon: Box,
	},
	{
		step: 2,
		title: "Step 2",
		description: "Insert description here",
		content: "This step has been completed successfully.",
		icon: Box,
	},
	{
		step: 3,
		title: "Step 3",
		description: "Insert description here",
		content:
			"You are currently on this step. Complete the required actions to proceed.",
		icon: Box,
	},
	{
		step: 4,
		title: "Step 4",
		description: "Insert description here",
		content: "This step will be available after completing the current step.",
		icon: Box,
	},
]

export default function StepperIcon() {
	return (
		<Stepper defaultValue={3} className="w-full max-w-2xl space-y-6">
			<StepperNav>
				{steps.map((item, index) => (
					<StepperItem key={item.step} step={item.step}>
						<StepperTrigger className="items-start">
							<StepperIndicator className="data-[state=completed]:bg-bg data-[state=active]:bg-bg data-[state=active]:text-fg border-border size-10 rounded-lg border">
								<item.icon className="data-[state=active]:text-fg text-fg-tertiary size-5" />
							</StepperIndicator>
							{/* <span className="hidden min-w-0 text-left sm:block">
								<StepperTitle>{item.title}</StepperTitle> 
								<StepperDescription className="mt-1 text-xs">
									{item.description}
								</StepperDescription>
							</span> */}
						</StepperTrigger>
						{index < steps.length - 1 && (
							<StepperSeparator className="group-data-[state=completed]/step:bg-primary" />
						)}
					</StepperItem>
				))}
			</StepperNav>

			<StepperPanel className="border-border bg-fill1 rounded-lg border p-4 text-sm">
				{steps.map((item) => (
					<StepperContent
						key={item.step}
						value={item.step}
						className="space-y-2">
						<div className="flex items-center justify-between gap-4">
							<h3 className="font-medium">{item.title}</h3>
							<span className="bg-bg text-fg-secondary rounded-md px-2 py-1 text-xs">
								Step {item.step} of {steps.length}
							</span>
						</div>
						<p className="text-fg-secondary">{item.content}</p>
					</StepperContent>
				))}
			</StepperPanel>
		</Stepper>
	)
}
