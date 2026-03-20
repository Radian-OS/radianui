"use client"

import { useState } from "react"
import { Globe, Sparkles } from "lucide-react"
import Image from "next/image"
import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Input } from "@/registry/ui/input"

const sources = [
	{
		id: "dribbble",
		label: "Dribble",
		icon: (
			<Image
				src="https://www.google.com/s2/favicons?sz=32&domain=dribbble.com"
				alt="Dribbble"
				width={20}
				height={20}
			/>
		),
	},
	{
		id: "linkedin",
		label: "Linkedin",
		icon: (
			<Image
				src="https://www.google.com/s2/favicons?sz=32&domain=linkedin.com"
				alt="LinkedIn"
				width={20}
				height={20}
			/>
		),
	},
	{
		id: "twitter",
		label: "X (twitter)",
		icon: (
			<Image
				src="https://www.google.com/s2/favicons?sz=32&domain=x.com"
				alt="X"
				width={20}
				height={20}
			/>
		),
	},
	{
		id: "behance",
		label: "Behance",
		icon: (
			<Image
				src="https://www.google.com/s2/favicons?sz=32&domain=behance.net"
				alt="Behance"
				width={20}
				height={20}
			/>
		),
	},
	{
		id: "ai-suggestion",
		label: "AI suggestion",
		icon: <Sparkles className="text-fg-secondary size-5" />,
	},
	{
		id: "other",
		label: "Other Sources",
		icon: <Globe className="text-fg-secondary size-5" />,
	},
]

export default function HearAboutUsStep({
	onNext,
	onSkip,
}: {
	onNext: () => void
	onSkip: () => void
}) {
	const [selected, setSelected] = useState<string[]>([])
	const [otherText, setOtherText] = useState("")

	function toggleSource(id: string) {
		setSelected((prev) =>
			prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
		)
	}

	function handleContinue() {
		console.log("Selected sources:", selected, "Other:", otherText)
		onNext()
	}

	return (
		<div className="w-full max-w-[400px]">
			<div className="flex flex-col gap-2">
				<h2 className="heading-5">Where did you hear about us?</h2>
				<p className="text-fg-secondary text-sm">
					Tell us how you discovered Radian.
				</p>
			</div>

			<div className="mt-8 flex flex-col gap-5">
				<div className="flex flex-col gap-3">
					{sources.map((source) => {
						const isSelected = selected.includes(source.id)
						return (
							<div
								key={source.id}
								onClick={() => toggleSource(source.id)}
								className={`flex w-full items-center gap-2 rounded-lg border p-3 transition-colors ${
									isSelected
										? "border-primary-border bg-primary-accent"
										: "border-soft bg-bg hover:bg-fill1"
								}`}>
								{source.icon}
								<span
									className={`flex-1 text-left text-sm font-medium ${
										isSelected ? "text-primary" : "text-fg"
									}`}>
									{source.label}
								</span>
								<Checkbox
									checked={isSelected}
									onCheckedChange={() => toggleSource(source.id)}
									size="sm"
								/>
							</div>
						)
					})}

					<Input
						placeholder="Mention the source here..."
						size="36"
						value={otherText}
						onChange={(e) => setOtherText(e.target.value)}
					/>
				</div>

				<div className="flex gap-3">
					<Button
						type="button"
						variant="outline"
						color="neutral"
						className="flex-1"
						onClick={onSkip}>
						Skip
					</Button>
					<Button
						type="button"
						color="primary"
						className="flex-1"
						onClick={handleContinue}>
						Continue
					</Button>
				</div>
			</div>
		</div>
	)
}
