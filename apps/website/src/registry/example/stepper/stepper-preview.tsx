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
		title: "Cart",
		description: "Review items",
		content: "Confirm the quantity, delivery window, and gift options.",
	},
	{
		step: 2,
		title: "Shipping",
		description: "Address details",
		content: "Ship to 24 Market Street with standard weekday delivery.",
	},
	{
		step: 3,
		title: "Payment",
		description: "Billing method",
		content: "Use the saved business card ending in 4242 for this order.",
	},
	{
		step: 4,
		title: "Review",
		description: "Place order",
		content: "Review taxes, shipping, and discounts before submitting.",
	},
]

export default function StepperPreview() {
	return (
		<Stepper defaultValue={2} className="w-full max-w-xl space-y-6">
			<StepperNav>
				{steps.map((item, index) => (
					<StepperItem key={item.step} step={item.step}>
						<StepperTrigger className="items-start">
							<StepperIndicator>{item.step}</StepperIndicator>
							<span className="hidden min-w-0 text-left sm:block">
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
