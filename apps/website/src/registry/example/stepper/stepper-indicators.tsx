"use client"

import { Check, Circle, LoaderCircle } from "lucide-react"
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
		title: "Queued",
		description: "Build request received",
		content: "The deployment was queued from the production branch.",
	},
	{
		step: 2,
		title: "Built",
		description: "Artifacts ready",
		content: "Static assets and server bundles were generated successfully.",
	},
	{
		step: 3,
		title: "Deploying",
		description: "In progress",
		content:
			"The release is being promoted across the production edge network.",
	},
	{
		step: 4,
		title: "Verified",
		description: "Waiting",
		content: "Health checks will run after the deployment finishes.",
	},
]

export default function StepperIndicators() {
	return (
		<Stepper
			defaultValue={3}
			className="w-full max-w-xl space-y-6"
			indicators={{
				completed: <Check className="size-3.5" />,
				active: <Circle className="size-2.5 fill-current" />,
				loading: <LoaderCircle className="size-3.5 animate-spin" />,
				inactive: <span className="size-1.5 rounded-full bg-current" />,
			}}>
			<StepperNav>
				{steps.map((item, index) => (
					<StepperItem
						key={item.step}
						step={item.step}
						loading={item.step === 3}>
						<StepperTrigger className="items-start">
							<StepperIndicator className="data-[state=active]:bg-info data-[state=completed]:bg-success data-[state=inactive]:bg-fill2 data-[state=inactive]:text-fg-tertiary" />
							<span className="hidden text-left sm:block">
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

			<StepperPanel className="bg-fill1 rounded-lg p-4 text-sm">
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
