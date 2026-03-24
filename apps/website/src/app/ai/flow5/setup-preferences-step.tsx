"use client"

import { useState } from "react"
import { Building2, User, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

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

export default function SetupPreferencesStep({
	onNext,
}: {
	onNext: () => void
}) {
	const [selected, setSelected] = useState<string>("myself")
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
		<div className="border-soft bg-bg w-full max-w-[480px] rounded-2xl border p-6 md:p-8">
			<div className="flex flex-col gap-8">
				{/* Header */}
				<div className="flex flex-col gap-2 text-center">
					<h1 className="heading-5">Setup Preferences</h1>
					<p className="text-fg-secondary text-sm">
						Select options that match your workflow.
					</p>
				</div>

				{/* Options + Continue */}
				<div className="flex flex-col gap-5">
					<div className="flex flex-col gap-4">
						{preferenceOptions.map((option) => {
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
										"flex items-start gap-2 rounded-lg border p-3 text-left transition-all",
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
									<div
										className={cn(
											"mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-all",
											isSelected
												? "bg-primary border-none"
												: "border-alpha bg-bg"
										)}>
										{isSelected && (
											<div className="size-2.5 rounded-full bg-white" />
										)}
									</div>
								</button>
							)
						})}
					</div>

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
			</div>
		</div>
	)
}
