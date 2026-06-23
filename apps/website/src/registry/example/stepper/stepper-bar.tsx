"use client"

import { Progress } from "@/registry/ui/progress"
import {
	Stepper,
	StepperContent,
	StepperDescription,
	StepperItem,
	StepperNav,
	StepperPanel,
	StepperTitle,
	StepperTrigger,
	useStepItem,
} from "@/registry/ui/stepper"

const steps = [
	{
		step: 1,
		title: "Step 1",
		description: "Insert description here",
		content: "This step has been completed successfully.",
	},
	{
		step: 2,
		title: "Step 2",
		description: "Insert description here",
		content: "This step has been completed successfully.",
	},
	{
		step: 3,
		title: "Step 3",
		description: "Insert description here",
		content:
			"You are currently on this step. Complete the required actions to proceed.",
	},
	{
		step: 4,
		title: "Step 4",
		description: "Insert description here",
		content: "This step will be available after completing the current step.",
	},
]

function StepProgress() {
	const { state } = useStepItem()

	const value = state === "completed" ? 100 : state === "active" ? 50 : 0

	return <Progress value={value} className="h-1.5 rounded-sm" />
}

export default function StepperBar() {
	return (
		<Stepper defaultValue={3} className="w-full max-w-2xl space-y-6">
			<StepperNav>
				{steps.map((item) => (
					<StepperItem key={item.step} step={item.step}>
						<StepperTrigger asChild>
							<span className="flex w-full flex-col gap-2">
								<StepProgress />
								<span className="text-left">
									<StepperTitle className="data-[state=active]:font-semibold">
										{item.title}
									</StepperTitle>
									<StepperDescription className="mt-1 text-xs">
										{item.description}
									</StepperDescription>
								</span>
							</span>
						</StepperTrigger>
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
