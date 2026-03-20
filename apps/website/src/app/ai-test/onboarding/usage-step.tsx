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
import RadianLogo from "./radian-logo"
import SupportFooter from "./support-footer"

type UsageStepProps = {
	onNext: () => void
	onSkip: () => void
}

const usageOptions = [
	{ id: "personal", label: "Personal Project", icon: User },
	{ id: "work", label: "Work", icon: Briefcase },
	{ id: "learning", label: "Learning Designing", icon: BookOpen },
	{ id: "school", label: "School", icon: Pencil },
	{ id: "explore", label: "Explore the tool", icon: Lightbulb },
	{ id: "other", label: "Other", icon: Ellipsis },
]

export default function UsageStep({ onNext, onSkip }: UsageStepProps) {
	const [selected, setSelected] = useState<string | null>(null)

	return (
		<div className="flex min-h-screen flex-col items-center justify-center px-4">
			<div className="flex w-full max-w-[480px] flex-col gap-8">
				<div className="flex flex-col gap-6">
					<RadianLogo />
					<div className="flex flex-col gap-2">
						<h1 className="heading-5">What will you use Radian for?</h1>
						<p className="text-fg-secondary text-sm">
							If you have multiple reasons for using Radian, pick the key ones.
						</p>
					</div>
				</div>

				<div className="flex flex-col gap-3">
					<div className="grid grid-cols-2 gap-3">
						{usageOptions.map((option) => {
							const Icon = option.icon
							const isSelected = selected === option.id
							return (
								<button
									key={option.id}
									type="button"
									onClick={() => setSelected(option.id)}
									className={cn(
										"flex flex-col gap-5 rounded-lg border p-4 text-left transition-colors",
										isSelected
											? "border-primary bg-elevation-level1 shadow-sm"
											: "border-soft bg-elevation-level1 hover:border-border shadow-sm"
									)}>
									<div className="flex w-full items-start justify-between">
										<div className="bg-primary-accent flex size-10 items-center justify-center rounded-lg">
											<Icon className="text-primary-text size-6" />
										</div>
										<div
											className={cn(
												"flex size-5 items-center justify-center rounded-full border",
												isSelected
													? "bg-primary border-none"
													: "border-alpha bg-bg"
											)}>
											{isSelected && (
												<div className="bg-bg size-2.5 rounded-full" />
											)}
										</div>
									</div>
									<span className="text-fg text-sm font-medium">
										{option.label}
									</span>
								</button>
							)
						})}
					</div>

					{selected === "other" && <Input placeholder="Tell us more" />}
				</div>

				<div className="flex gap-3">
					<Button
						variant="outline"
						color="neutral"
						className="flex-1"
						onClick={onSkip}>
						Skip
					</Button>
					<Button
						variant="strong"
						color="primary"
						className="flex-1"
						onClick={onNext}>
						Continue
					</Button>
				</div>
			</div>

			<div className="absolute bottom-10">
				<SupportFooter />
			</div>
		</div>
	)
}
