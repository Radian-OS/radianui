"use client"

import { useState } from "react"
import {
	BookOpen,
	Briefcase,
	Ellipsis,
	Lightbulb,
	Pencil,
	User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

const useCaseOptions = [
	{
		id: "personal",
		label: "Personal Project",
		description: "For hobbies & creations.",
		icon: User,
	},
	{
		id: "work",
		label: "Work",
		description: "For business collaboration.",
		icon: Briefcase,
	},
	{
		id: "learning",
		label: "Learning Designing",
		description: "For building & creative skills.",
		icon: BookOpen,
	},
	{
		id: "school",
		label: "School",
		description: "For academic assignments",
		icon: Pencil,
	},
	{
		id: "explore",
		label: "Exploring tool",
		description: "For a casual tour",
		icon: Lightbulb,
	},
	{
		id: "other",
		label: "Other",
		description: "For any other purpose",
		icon: Ellipsis,
	},
]

export default function UseCaseStep({
	onNext,
	onSkip,
}: {
	onNext: () => void
	onSkip: () => void
}) {
	const [selected, setSelected] = useState<string | null>(null)
	const [error, setError] = useState("")

	function handleContinue() {
		if (!selected) {
			setError("Please select an option")
			return
		}
		setError("")
		onNext()
	}

	return (
		<div className="flex w-full max-w-[480px] flex-col gap-8">
			{/* Header */}
			<div className="flex flex-col gap-2">
				<h1 className="heading-5">How do you plan to use Radian?</h1>
				<p className="text-fg-secondary text-sm">
					If you have multiple reasons for using Radian, pick the key ones.
				</p>
			</div>

			{/* Options Grid */}
			<div className="flex flex-col gap-3">
				<div className="grid grid-cols-2 gap-3">
					{useCaseOptions.map((option) => {
						const Icon = option.icon
						const isSelected = selected === option.id
						return (
							<button
								key={option.id}
								type="button"
								onClick={() => {
									setSelected(option.id)
									setError("")
								}}
								className={cn(
									"shadow-xs flex flex-col gap-5 rounded-lg border p-4 text-left transition-all",
									isSelected
										? "border-primary"
										: "border-soft bg-elevation-level1 hover:border-alpha"
								)}>
								<div className="flex w-full items-start justify-between">
									<Icon className="text-fg size-5" />
									<div
										className={cn(
											"flex size-5 items-center justify-center rounded-full border transition-all",
											isSelected
												? "bg-primary border-none"
												: "border-alpha bg-white"
										)}>
										{isSelected && (
											<div className="size-2.5 rounded-full bg-white" />
										)}
									</div>
								</div>
								<div className="flex flex-col gap-0.5">
									<span className="text-fg text-sm font-medium">
										{option.label}
									</span>
									<span className="text-fg-secondary text-[13px]">
										{option.description}
									</span>
								</div>
							</button>
						)
					})}
				</div>

				{error && <p className="text-error-text text-xs">{error}</p>}
			</div>

			{/* Actions */}
			<div className="flex gap-3">
				<Button
					type="button"
					variant="outline"
					color="neutral"
					size="36"
					className="flex-1"
					onClick={onSkip}>
					Skip
				</Button>
				<Button
					type="button"
					variant="strong"
					color="primary"
					size="36"
					className="flex-1"
					onClick={handleContinue}>
					Continue
				</Button>
			</div>
		</div>
	)
}
