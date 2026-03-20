"use client"

import { useState } from "react"
import { Building2, User, Users } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"
import AuthHeader from "./auth-header"

const useCaseOptions = [
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

export default function UsecaseStep({ onNext }: { onNext: () => void }) {
	const [selected, setSelected] = useState("myself")

	return (
		<div className="flex w-full max-w-[400px] flex-col gap-8">
			<AuthHeader title="How would you like to use Radian?">
				<p className="text-fg-secondary text-sm">
					Select the option that best fits your needs.
				</p>
			</AuthHeader>

			<div className="flex flex-col gap-5">
				<RadioGroup
					value={selected}
					onValueChange={setSelected}
					className="gap-4">
					{useCaseOptions.map((option) => {
						const isSelected = selected === option.value
						return (
							<label
								key={option.value}
								className={`flex cursor-pointer items-start gap-2 rounded-lg border p-3 transition-colors ${
									isSelected
										? "border-primary-border bg-bg"
										: "border-alpha bg-bg"
								}`}>
								<option.icon className="text-fg-secondary mt-0.5 size-5 shrink-0" />
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
									className="mt-0.5 shrink-0"
								/>
							</label>
						)
					})}
				</RadioGroup>

				<Button
					type="button"
					color="primary"
					className="w-full"
					onClick={onNext}>
					Continue
				</Button>
			</div>
		</div>
	)
}
