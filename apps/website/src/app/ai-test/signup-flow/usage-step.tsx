"use client"

import { useState } from "react"
import {
	BookOpen,
	Briefcase,
	Ellipsis,
	Lightbulb,
	LogOut,
	Pencil,
	User,
} from "lucide-react"
import { Button } from "@/registry/ui/button"
import { AuthLayout } from "./auth-layout"
import { RadianLogo } from "./radian-logo"

interface UsageStepProps {
	onNext: () => void
}

const usageOptions = [
	{
		id: "personal",
		icon: User,
		title: "Personal Project",
		description: "For hobbies & creations.",
	},
	{
		id: "work",
		icon: Briefcase,
		title: "Work",
		description: "For business collaboration.",
	},
	{
		id: "learning",
		icon: BookOpen,
		title: "Learning Designing",
		description: "For building & creative skills.",
	},
	{
		id: "school",
		icon: Pencil,
		title: "School",
		description: "For academic assignments",
	},
	{
		id: "exploring",
		icon: Lightbulb,
		title: "Exploring tool",
		description: "For a casual tour",
	},
	{
		id: "other",
		icon: Ellipsis,
		title: "Other",
		description: "For any other purpose",
	},
]

export function UsageStep({ onNext }: UsageStepProps) {
	const [selected, setSelected] = useState<string | null>(null)

	return (
		<AuthLayout
			showHeader
			header={
				<>
					<RadianLogo />
					<div className="flex items-center gap-1">
						<button className="text-fg-secondary hover:text-fg flex items-center gap-1 text-sm font-medium">
							<LogOut className="size-5" />
							Sign out
						</button>
						<span className="text-fg-tertiary text-sm">
							(design@radian.com)
						</span>
					</div>
				</>
			}>
			<div className="flex w-full max-w-[480px] flex-col gap-8">
				<div className="flex flex-col gap-2">
					<h1 className="heading-5">How do you plan to use Radian?</h1>
					<p className="text-fg-secondary text-sm">
						If you have multiple reasons for using Radian, pick the key ones.
					</p>
				</div>

				<div className="flex flex-col gap-3">
					<div className="grid grid-cols-2 gap-3">
						{usageOptions.map((option) => {
							const Icon = option.icon
							const isSelected = selected === option.id
							return (
								<button
									key={option.id}
									onClick={() => setSelected(option.id)}
									className={`shadow-xs flex flex-col gap-5 rounded-lg border p-4 text-left transition-colors ${
										isSelected
											? "border-primary-border bg-white"
											: "border-soft bg-elevation-level1 hover:border-alpha"
									}`}>
									<div className="flex w-full items-start justify-between">
										<Icon className="text-fg size-5" />
										<div
											className={`flex size-5 items-center justify-center rounded-full border transition-colors ${
												isSelected
													? "bg-primary border-none"
													: "border-alpha bg-bg"
											}`}>
											{isSelected && (
												<div className="size-2.5 rounded-full bg-white" />
											)}
										</div>
									</div>
									<div className="flex flex-col gap-0.5">
										<span className="text-fg text-sm font-medium">
											{option.title}
										</span>
										<span className="text-fg-secondary text-[13px]">
											{option.description}
										</span>
									</div>
								</button>
							)
						})}
					</div>

					<div className="flex gap-3">
						<Button
							variant="outline"
							size="36"
							className="flex-1"
							onClick={onNext}>
							Skip
						</Button>
						<Button
							variant="strong"
							color="primary"
							size="36"
							className="flex-1"
							onClick={onNext}>
							Continue
						</Button>
					</div>
				</div>
			</div>
		</AuthLayout>
	)
}
