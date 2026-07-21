"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button, CompactButton } from "@/registry/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

const steps = [
	{
		title: "Navigate between reports",
		description:
			"The workload report gives you an overview of your team's capacity and performance in Radian. Other reports offer deeper insights into specific areas.",
	},
	{
		title: "Filter and sort data",
		description:
			"Use filters to narrow down your view by team, date range, or project. Sorting helps you prioritize what matters most.",
	},
	{
		title: "Export and share",
		description:
			"Export any report as a PDF or CSV. Share links directly with teammates who have access to your workspace.",
	},
]

export default function PopoverGuide() {
	const [step, setStep] = useState(0)
	const [open, setOpen] = useState(false)

	const handleNext = () => {
		if (step < steps.length - 1) setStep(step + 1)
		else setOpen(false)
	}

	const handleSkip = () => {
		setOpen(false)
		setStep(0)
	}

	const handleOpen = (v: boolean) => {
		setOpen(v)
		if (v) setStep(0)
	}

	const current = steps[step]

	return (
		<Popover open={open} onOpenChange={handleOpen}>
			<PopoverTrigger asChild>
				<Button color="neutral" variant="outline">
					Open Tour
				</Button>
			</PopoverTrigger>
			<PopoverContent className="max-w-100 flex w-full flex-col gap-5">
				{/* Header */}
				<div className="flex flex-col gap-2">
					<div className="flex items-start justify-between gap-1">
						<span className="text-fg text-base font-semibold leading-snug">
							{current.title}
						</span>
						<CompactButton
							aria-label="Close Button"
							size="20"
							variant="ghost"
							color="neutral">
							<X />
						</CompactButton>
					</div>

					{/* Body */}
					<p className="text-fg-secondary text-sm font-normal leading-relaxed">
						{current.description}
					</p>
				</div>

				{/* Footer */}
				<div className="flex items-center justify-between gap-3">
					<span className="text-fg-tertiary text-sm">
						Step {step + 1} / {steps.length}
					</span>
					<div className="flex items-center gap-2.5">
						<Button
							onClick={handleSkip}
							variant="ghost"
							color="primary"
							size="32">
							Skip
						</Button>
						<Button
							onClick={handleNext}
							size="32"
							variant="strong"
							color="primary">
							{step < steps.length - 1 ? "Next" : "Done"}
						</Button>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
