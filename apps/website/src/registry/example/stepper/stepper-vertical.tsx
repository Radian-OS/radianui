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
		title: "Workspace",
		description: "Name and region",
		content: "The workspace is provisioned in the selected region.",
	},
	{
		step: 2,
		title: "Members",
		description: "Invite teammates",
		content: "Invite designers, engineers, and operators with the right role.",
	},
	{
		step: 3,
		title: "Security",
		description: "Configure SSO",
		content: "Connect your identity provider and enforce domain restrictions.",
	},
	{
		step: 4,
		title: "Launch",
		description: "Go live",
		content: "Run the final checks and open the workspace to the team.",
	},
]

export default function StepperVertical() {
	return (
		<Stepper
			defaultValue={2}
			orientation="vertical"
			className="w-full max-w-2xl gap-6 sm:grid sm:grid-cols-[240px_1fr]">
			<StepperNav className="w-full">
				{steps.map((item, index) => (
					<StepperItem key={item.step} step={item.step} className="items-start">
						<StepperTrigger className="items-start rounded-md p-1 text-left">
							<StepperIndicator className="mt-0.5">
								{item.step}
							</StepperIndicator>
							<span>
								<StepperTitle>{item.title}</StepperTitle>
								<StepperDescription className="mt-1 text-xs">
									{item.description}
								</StepperDescription>
							</span>
						</StepperTrigger>
						{index < steps.length - 1 && (
							<StepperSeparator className="group-data-[state=completed]/step:bg-primary ml-3 h-10" />
						)}
					</StepperItem>
				))}
			</StepperNav>

			<StepperPanel className="border-border bg-fill1 rounded-lg border p-4 text-sm">
				{steps.map((item) => (
					<StepperContent key={item.step} value={item.step}>
						<h3 className="font-medium">{item.title}</h3>
						<p className="text-fg-secondary mt-1">{item.content}</p>
					</StepperContent>
				))}
			</StepperPanel>
		</Stepper>
	)
}
