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

type UsecaseOption = {
	id: string
	icon: React.ReactNode
	title: string
	description: string
}

const usecaseOptions: UsecaseOption[] = [
	{
		id: "personal",
		icon: <User className="size-5" />,
		title: "Personal Project",
		description: "For hobbies & creations.",
	},
	{
		id: "work",
		icon: <Briefcase className="size-5" />,
		title: "Work",
		description: "For business collaboration.",
	},
	{
		id: "learning",
		icon: <BookOpen className="size-5" />,
		title: "Learning Designing",
		description: "For building & creative skills.",
	},
	{
		id: "school",
		icon: <Pencil className="size-5" />,
		title: "School",
		description: "For academic assignments",
	},
	{
		id: "exploring",
		icon: <Lightbulb className="size-5" />,
		title: "Exploring tool",
		description: "For a casual tour",
	},
	{
		id: "other",
		icon: <Ellipsis className="size-5" />,
		title: "Other",
		description: "For any other purpose",
	},
]

export default function UsecaseStep({ onNext }: { onNext: () => void }) {
	const [selected, setSelected] = useState<string[]>([])

	function toggleOption(id: string) {
		setSelected((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
		)
	}

	return (
		<div className="flex w-full max-w-[480px] flex-col gap-8">
			<div className="flex flex-col gap-2">
				<h2 className="heading-5">How do you plan to use Radian?</h2>
				<p className="text-fg-secondary text-sm">
					If you have multiple reasons for using Radian, pick the key ones.
				</p>
			</div>

			<div className="flex flex-col gap-3">
				<div className="grid grid-cols-2 gap-3">
					{usecaseOptions.map((option) => (
						<button
							key={option.id}
							type="button"
							onClick={() => toggleOption(option.id)}
							className={cn(
								"shadow-xs flex flex-col gap-5 rounded-lg border p-4 text-left transition-colors",
								selected.includes(option.id)
									? "border-primary-border bg-bg"
									: "border-soft bg-elevation-level1 hover:border-alpha"
							)}>
							<div className="flex w-full items-start justify-between">
								<span className="text-fg-secondary">{option.icon}</span>
								<div
									className={cn(
										"flex size-5 items-center justify-center rounded-full border transition-colors",
										selected.includes(option.id)
											? "bg-primary border-none"
											: "border-alpha bg-bg"
									)}>
									{selected.includes(option.id) && (
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
					))}
				</div>

				<div className="flex gap-3">
					<Button
						type="button"
						variant="outline"
						color="neutral"
						className="flex-1"
						onClick={onNext}>
						Skip
					</Button>
					<Button
						type="button"
						color="primary"
						className="flex-1"
						onClick={onNext}>
						Continue
					</Button>
				</div>
			</div>
		</div>
	)
}
