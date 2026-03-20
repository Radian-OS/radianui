"use client"

import { useState } from "react"
import {
	Globe,
	LayoutDashboard,
	Monitor,
	Scroll,
	Smartphone,
	User,
} from "lucide-react"
import { Button } from "@/registry/ui/button"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"
import AuthHeader from "./auth-header"

const designOptions = [
	{
		value: "mobile",
		icon: Smartphone,
		title: "Mobile App",
		dimensions: "430 x 932",
	},
	{
		value: "desktop",
		icon: Monitor,
		title: "Desktop App",
		dimensions: "1920 x 1024",
	},
	{
		value: "dashboard",
		icon: LayoutDashboard,
		title: "Dashboard",
		dimensions: "1440 × 900",
	},
	{
		value: "landing",
		icon: Scroll,
		title: "Landing page",
		dimensions: "1440 × 1800",
	},
	{
		value: "marketing",
		icon: Globe,
		title: "Marketing Website",
		dimensions: "1440 × 2000",
	},
	{
		value: "portfolio",
		icon: User,
		title: "Personal Portfolio",
		dimensions: "1440 × 1600",
	},
]

export default function GettingStartedStep({ onNext }: { onNext: () => void }) {
	const [selected, setSelected] = useState("mobile")

	return (
		<div className="flex w-full max-w-[400px] flex-col gap-8">
			<AuthHeader title="Let's create your first Design!">
				<p className="text-fg-secondary text-sm">
					Select a topic to get started.
				</p>
			</AuthHeader>

			<div className="flex flex-col gap-5">
				<RadioGroup
					value={selected}
					onValueChange={setSelected}
					className="grid grid-cols-2 gap-3">
					{designOptions.map((option) => {
						const isSelected = selected === option.value
						return (
							<label
								key={option.value}
								className={`shadow-xs flex cursor-pointer flex-col gap-5 rounded-lg border p-4 transition-colors ${
									isSelected
										? "border-primary-border bg-primary-accent text-primary-text"
										: "border-soft bg-bg"
								}`}>
								<div className="flex items-start justify-between">
									<option.icon
										className={`size-6 ${
											isSelected ? "text-primary-text" : "text-fg-secondary"
										}`}
									/>
									<RadioGroupItem value={option.value} className="shrink-0" />
								</div>
								<div className="flex flex-col gap-0.5 px-0.5">
									<span
										className={`text-sm font-medium ${
											isSelected ? "text-primary-text" : "text-fg"
										}`}>
										{option.title}
									</span>
									<span
										className={`text-xs ${
											isSelected ? "text-primary-text" : "text-fg-secondary"
										}`}>
										{option.dimensions}
									</span>
								</div>
							</label>
						)
					})}
				</RadioGroup>

				<Button
					type="button"
					color="primary"
					className="w-full"
					onClick={onNext}>
					Start Creating
				</Button>
			</div>
		</div>
	)
}
