"use client"

import { useState } from "react"
import { Building2, User, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Label } from "@/registry/ui/label"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"

const preferenceOptions = [
	{
		id: "myself",
		label: "For myself",
		description: "Set up a personal workspace to explore on your own.",
		icon: User,
	},
	{
		id: "team",
		label: "For my team",
		description: "Collaborate with teammates and manage projects together.",
		icon: Users,
	},
	{
		id: "company",
		label: "For my company",
		description: "Create a shared space for your organization.",
		icon: Building2,
	},
]

const Preference = ({ onNext }: { onNext: () => void }) => {
	const [selected, setSelected] = useState("myself")
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
		<div className="flex flex-col gap-5">
			<RadioGroup
				value={selected}
				onValueChange={(value) => {
					setSelected(value)
					setError("")
				}}
				className="flex flex-col gap-4">
				{preferenceOptions.map((option) => {
					const Icon = option.icon
					const isSelected = selected === option.id
					return (
						<Label
							key={option.id}
							htmlFor={option.id}
							className={cn(
								"flex cursor-pointer items-start gap-2 rounded-lg border p-3 text-left transition-all",
								isSelected
									? "border-primary-border"
									: "border-alpha bg-bg hover:border-fg-tertiary"
							)}>
							<Icon className="text-fg-secondary mt-0.5 size-5 shrink-0" />
							<div className="flex flex-1 flex-col gap-1">
								<span className="text-fg text-sm font-medium">
									{option.label}
								</span>
								<span className="text-fg-secondary text-xs">
									{option.description}
								</span>
							</div>
							<RadioGroupItem
								value={option.id}
								id={option.id}
								className="mt-0.5 shrink-0"
							/>
						</Label>
					)
				})}
			</RadioGroup>

			{error && <p className="text-error-text text-xs">{error}</p>}

			<Button
				type="button"
				variant="strong"
				color="primary"
				size="36"
				className="w-full"
				onClick={handleContinue}>
				Continue
			</Button>
		</div>
	)
}

export default Preference
