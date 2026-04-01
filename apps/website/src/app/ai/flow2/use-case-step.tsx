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
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"

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
	const [selected, setSelected] = useState<string>("")
	const [otherText, setOtherText] = useState("")
	const [error, setError] = useState("")

	function handleContinue() {
		if (!selected) {
			setError("Please select an option")
			return
		}
		if (selected === "other" && !otherText.trim()) {
			setError("Please tell us more")
			return
		}
		setError("")
		onNext()
	}

	return (
		<div className="flex w-full max-w-[480px] flex-col gap-8">
			{/* Header */}
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<h1 className="heading-5">What will you use Radian for?</h1>
					<p className="text-fg-secondary text-sm">
						If you have multiple reasons for using Radian, pick the key ones.
					</p>
				</div>
			</div>

			{/* Options Grid */}
			<div className="flex flex-col gap-3">
				<RadioGroup
					value={selected}
					onValueChange={(value) => {
						setSelected(value)
						setError("")
					}}
					className="grid grid-cols-2 gap-3">
					{useCaseOptions.map((option) => {
						const Icon = option.icon
						const isSelected = selected === option.id
						return (
							<Label
								key={option.id}
								className={cn(
									"shadow-xs flex cursor-pointer flex-col gap-5 rounded-lg border p-4 text-left transition-all",
									isSelected
										? "border-primary bg-bg"
										: "border-soft bg-elevation-level1 hover:border-alpha"
								)}>
								<div className="flex w-full items-start justify-between">
									<div className="flex items-center justify-center rounded-lg p-2">
										<Icon
											className={`size-5 ${isSelected ? "text-primary" : "text-fg-secondary"}`}
										/>
									</div>
									<RadioGroupItem value={option.id} />
								</div>
								<div className="flex flex-col gap-0.5">
									<span className="text-fg text-sm font-medium">
										{option.label}
									</span>
									<span className="text-fg-secondary text-[13px] font-normal">
										{option.description}
									</span>
								</div>
							</Label>
						)
					})}
				</RadioGroup>

				<div className="flex flex-col gap-1.5">
					{selected === "other" && (
						<Input
							placeholder="Tell us more"
							value={otherText}
							onChange={(e) => setOtherText(e.target.value)}
						/>
					)}

					{error && <p className="text-error-text text-xs">{error}</p>}
				</div>
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
