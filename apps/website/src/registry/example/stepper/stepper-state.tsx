"use client"

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
		title: "Draft",
		description: "Saved",
		content: "The launch notes are written and attached to the release.",
	},
	{
		step: 2,
		title: "Review",
		description: "Active",
		content: "Two reviewers are checking copy, pricing, and screenshots.",
	},
	{
		step: 3,
		title: "Schedule",
		description: "Next",
		content: "Pick the release window after the review is complete.",
	},
	{
		step: 4,
		title: "Publish",
		description: "Locked",
		content: "Publishing unlocks when every approval has been collected.",
		disabled: true,
	},
]

export default function StepperState() {
	return (
		<Stepper defaultValue={2} className="w-full max-w-xl space-y-6">
			<StepperNav>
				{steps.map((item, index) => (
					<StepperItem
						key={item.step}
						step={item.step}
						disabled={item.disabled}>
						<StepperTrigger className="items-start">
							<StepperIndicator className="data-[state=active]:bg-black-inverse data-[state=active]:text-fg-inverse data-[state=completed]:bg-success data-[state=inactive]:text-fg-secondary data-[state=completed]:text-white">
								{item.step}
							</StepperIndicator>
							<span className="hidden min-w-0 text-left sm:block">
								<StepperTitle>{item.title}</StepperTitle>
								<StepperDescription className="mt-1 text-xs">
									{item.description}
								</StepperDescription>
							</span>
						</StepperTrigger>
						{index < steps.length - 1 && (
							<StepperSeparator className="group-data-[state=completed]/step:bg-success" />
						)}
					</StepperItem>
				))}
			</StepperNav>
			<StepperPanel className="border-border rounded-lg border p-4 text-sm">
				{steps.map((item) => (
					<StepperContent
						className="space-y-2"
						key={item.step}
						value={item.step}>
						<h3 className="font-medium">{item.title}</h3>
						<p className="text-fg-secondary">{item.content}</p>
					</StepperContent>
				))}
			</StepperPanel>
		</Stepper>
	)
}
