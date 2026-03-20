"use client"

import { useState } from "react"
import { Building2, User, Users } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Label } from "@/registry/ui/label"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"

const options = [
	{
		value: "myself",
		icon: User,
		title: "For myself",
		description: "Set up a personal workspace to explore on your own.",
	},
	{
		value: "team",
		icon: Users,
		title: "For my team",
		description: "Collaborate with teammates and manage projects together.",
	},
	{
		value: "company",
		icon: Building2,
		title: "For my company",
		description: "Create a shared space for your organization.",
	},
]

export default function PreferencesStep({ onNext }: { onNext: () => void }) {
	const [selected, setSelected] = useState("myself")

	function handleContinue() {
		console.log("Selected:", selected)
		onNext()
	}

	return (
		<div className="border-soft bg-bg w-full max-w-[480px] rounded-2xl border px-6 py-8">
			<div className="flex flex-col gap-2 text-center">
				<h2 className="heading-5">Setup Preferences</h2>
				<p className="text-fg-secondary text-sm">
					Select options that match your workflow.
				</p>
			</div>

			<div className="mt-8 flex flex-col gap-5">
				<RadioGroup
					value={selected}
					onValueChange={setSelected}
					className="gap-4">
					{options.map((option) => {
						const Icon = option.icon
						const isSelected = selected === option.value

						return (
							<Label
								key={option.value}
								htmlFor={option.value}
								className={`flex cursor-pointer items-start gap-2 rounded-lg border p-3 transition-colors ${
									isSelected ? "border-primary" : "border-alpha bg-bg"
								}`}>
								<Icon className="text-fg-secondary mt-0.5 size-5 shrink-0" />
								<div className="flex flex-1 flex-col gap-1">
									<span className="text-fg text-sm font-medium">
										{option.title}
									</span>
									<span className="text-fg-secondary text-xs">
										{option.description}
									</span>
								</div>
								<RadioGroupItem
									value={option.value}
									id={option.value}
									className="mt-0.5 shrink-0"
								/>
							</Label>
						)
					})}
				</RadioGroup>

				<Button
					type="button"
					color="primary"
					className="w-full"
					onClick={handleContinue}>
					Continue
				</Button>
			</div>
		</div>
	)
}
