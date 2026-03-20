"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import FlowHeader from "./flow-header"

const apps = [
	{
		id: "linkedin",
		name: "Linkedin",
		icon: "https://www.google.com/s2/favicons?sz=32&domain=linkedin.com",
	},
	{
		id: "pinterest",
		name: "Pinterest",
		icon: "https://www.google.com/s2/favicons?sz=32&domain=pinterest.com",
	},
	{
		id: "github",
		name: "Github",
		icon: "https://www.google.com/s2/favicons?sz=32&domain=github.com",
	},
	{
		id: "behance",
		name: "Behance",
		icon: "https://www.google.com/s2/favicons?sz=32&domain=behance.net",
	},
	{
		id: "dribbble",
		name: "Dribble",
		icon: "https://www.google.com/s2/favicons?sz=32&domain=dribbble.com",
	},
	{
		id: "twitter",
		name: "X (twitter)",
		icon: "https://www.google.com/s2/favicons?sz=32&domain=x.com",
	},
]

export default function AppsStep({
	onNext,
	onSkip,
}: {
	onNext: () => void
	onSkip: () => void
}) {
	const [selected, setSelected] = useState<string[]>([])

	function toggleApp(appId: string) {
		setSelected((prev) =>
			prev.includes(appId)
				? prev.filter((id) => id !== appId)
				: [...prev, appId]
		)
	}

	return (
		<div className="bg-bg relative flex min-h-screen flex-col items-center justify-center p-4">
			<FlowHeader showSignOut />

			<div className="flex w-full max-w-[400px] flex-col gap-8">
				<div className="flex flex-col gap-2">
					<h2 className="heading-5">What other apps do you use?</h2>
					<p className="text-fg-secondary text-sm">
						Please answer few questions to help us improve your experience.
					</p>
				</div>

				<div className="flex flex-col gap-5">
					<div className="flex flex-col gap-3">
						{apps.map((app) => {
							const isSelected = selected.includes(app.id)
							return (
								<div
									key={app.id}
									onClick={() => toggleApp(app.id)}
									className={`flex w-full items-center gap-2 rounded-lg border p-3 transition-colors ${
										isSelected
											? "border-primary-border bg-primary-accent"
											: "border-soft bg-bg hover:bg-fill1"
									}`}>
									<Image
										src={app.icon}
										alt={app.name}
										width={20}
										height={20}
										className="shrink-0"
									/>
									<span className="text-fg flex-1 text-left text-sm">
										{app.name}
									</span>
									<Checkbox
										checked={isSelected}
										onCheckedChange={() => toggleApp(app.id)}
									/>
								</div>
							)
						})}
					</div>

					<div className="flex gap-3">
						<Button
							type="button"
							variant="outline"
							color="neutral"
							onClick={onSkip}
							className="flex-1">
							Skip
						</Button>
						<Button
							type="button"
							color="primary"
							onClick={onNext}
							className="flex-1">
							Continue
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
