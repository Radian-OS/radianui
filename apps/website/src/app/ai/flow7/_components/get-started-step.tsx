"use client"

import { useState } from "react"
import {
	Globe,
	LayoutDashboard,
	Monitor,
	PanelsTopLeft,
	Smartphone,
	User,
} from "lucide-react"
import { Button } from "@/registry/ui/button"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"

const designTopics = [
	{
		id: "mobile-app",
		title: "Mobile App",
		description:
			"Build a responsive mobile interface with screens designed for iOS and Android devices.",
		icon: Smartphone,
	},
	{
		id: "web-app",
		title: "Web App",
		description:
			"Start with a flexible web app layout optimized for dashboards, workflows, or interactive tools.",
		icon: Monitor,
	},
	{
		id: "dashboard",
		title: "Dashboard",
		description:
			"Get started with a structured layout for analytics, metrics, and data visualization.",
		icon: LayoutDashboard,
	},
	{
		id: "landing-page",
		title: "Landing Page",
		description:
			"Create a conversion-focused page with bold visuals, hero sections, and call-to-action elements.",
		icon: PanelsTopLeft,
	},
	{
		id: "marketing-website",
		title: "Marketing Website",
		description:
			"Design a multi-section website to showcase products, features, and drive engagement.",
		icon: Globe,
	},
	{
		id: "personal-portfolio",
		title: "Personal Portfolio",
		description:
			"Showcase your work, projects, and experience with a clean, modern portfolio template.",
		icon: User,
	},
]

export default function GetStartedStep({ onNext }: { onNext: () => void }) {
	const [selectedTopic, setSelectedTopic] = useState("mobile-app")

	function handleStart() {
		console.log("Selected topic:", selectedTopic)
		onNext()
	}

	return (
		<div className="w-full max-w-[480px]">
			<div className="flex flex-col gap-2">
				<h2 className="heading-5">Let&apos;s create your first Design!</h2>
				<p className="text-fg-secondary text-sm">
					Select a topic to get started.
				</p>
			</div>

			<div className="mt-8 flex flex-col gap-5">
				<RadioGroup
					value={selectedTopic}
					onValueChange={setSelectedTopic}
					className="grid grid-cols-2 gap-3">
					{designTopics.map((topic) => {
						const isSelected = selectedTopic === topic.id
						const Icon = topic.icon
						return (
							<label
								key={topic.id}
								className={`shadow-xs flex cursor-pointer flex-col gap-4 rounded-[10px] border p-4 transition-colors ${
									isSelected
										? "border-primary-border"
										: "border-soft bg-bg hover:bg-fill1"
								}`}>
								<div className="flex items-center justify-between">
									<Icon className="text-fg-secondary size-5" />
									<RadioGroupItem value={topic.id} />
								</div>
								<div className="flex flex-col gap-1">
									<p className="text-fg text-sm font-medium">{topic.title}</p>
									<p className="text-fg-secondary text-xs leading-4">
										{topic.description}
									</p>
								</div>
							</label>
						)
					})}
				</RadioGroup>

				<Button
					type="button"
					color="primary"
					className="w-full"
					onClick={handleStart}>
					Start Creating
				</Button>
			</div>
		</div>
	)
}
