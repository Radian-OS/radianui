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
import Image from "next/image"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"

const usageOptions = [
	{ id: "personal", label: "Personal Project", icon: User },
	{ id: "work", label: "Work", icon: Briefcase },
	{ id: "learning", label: "Learning Designing", icon: BookOpen },
	{ id: "school", label: "School", icon: Pencil },
	{ id: "explore", label: "Explore the tool", icon: Lightbulb },
	{ id: "other", label: "Other", icon: Ellipsis },
]

export default function UsageStep({
	onNext,
	onSkip,
}: {
	onNext: () => void
	onSkip: () => void
}) {
	const [selected, setSelected] = useState<string[]>([])
	const [otherText, setOtherText] = useState("")

	const toggleOption = (id: string) => {
		setSelected((prev) =>
			prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
		)
	}

	const showOtherInput = selected.includes("other")

	return (
		<div className="flex w-full max-w-[480px] flex-col gap-8">
			{/* Header */}
			<div className="flex flex-col gap-6">
				<Image
					src="https://radianos.com/favicon.ico"
					alt="Radian Logo"
					width={32}
					height={32}
					className="rounded-md"
				/>
				<div className="flex flex-col gap-2">
					<h1 className="heading-5">What will you use Radian for?</h1>
					<p className="text-fg-secondary text-sm">
						If you have multiple reasons for using Radian, pick the key ones.
					</p>
				</div>
			</div>

			{/* Options Grid */}
			<div className="flex flex-col gap-3">
				<div className="grid grid-cols-2 gap-3">
					{usageOptions.map((option) => {
						const isSelected = selected.includes(option.id)
						const Icon = option.icon
						return (
							<button
								key={option.id}
								type="button"
								onClick={() => toggleOption(option.id)}
								className={`shadow-xs flex flex-col gap-5 rounded-lg border p-4 text-left transition-colors ${
									isSelected
										? "border-primary bg-elevation-level1"
										: "border-soft bg-elevation-level1"
								}`}>
								<div className="flex w-full items-start justify-between">
									<div className="bg-primary-accent flex size-10 items-center justify-center rounded-lg">
										<Icon className="text-primary size-6" />
									</div>
									<div
										className={`flex size-5 items-center justify-center rounded-full border ${
											isSelected
												? "bg-primary border-none"
												: "border-alpha bg-bg"
										}`}>
										{isSelected && (
											<div className="bg-bg size-2.5 rounded-full" />
										)}
									</div>
								</div>
								<p className="text-fg text-sm font-medium">{option.label}</p>
							</button>
						)
					})}
				</div>

				{/* Other Input */}
				{showOtherInput && (
					<Input
						placeholder="Tell us more"
						value={otherText}
						onChange={(e) => setOtherText(e.target.value)}
					/>
				)}
			</div>

			{/* Action Buttons */}
			<div className="flex gap-3">
				<Button
					variant="outline"
					color="neutral"
					className="flex-1"
					type="button"
					onClick={onSkip}>
					Skip
				</Button>
				<Button
					variant="strong"
					color="primary"
					className="flex-1"
					type="button"
					onClick={onNext}>
					Continue
				</Button>
			</div>
		</div>
	)
}
