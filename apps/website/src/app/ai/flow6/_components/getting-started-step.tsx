"use client"

import { useState } from "react"
import {
	Globe,
	LayoutDashboard,
	Monitor,
	ScrollText,
	Smartphone,
	User,
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/registry/ui/button"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"

const designOptions = [
	{
		value: "mobile",
		icon: Smartphone,
		title: "Mobile App",
		size: "430 x 932",
	},
	{
		value: "desktop",
		icon: Monitor,
		title: "Desktop App",
		size: "1920 x 1024",
	},
	{
		value: "dashboard",
		icon: LayoutDashboard,
		title: "Dashboard",
		size: "1440 × 900",
	},
	{
		value: "landing",
		icon: ScrollText,
		title: "Landing page",
		size: "1440 × 1800",
	},
	{
		value: "marketing",
		icon: Globe,
		title: "Marketing Website",
		size: "1440 × 2000",
	},
	{
		value: "portfolio",
		icon: User,
		title: "Personal Portfolio",
		size: "1440 × 1600",
	},
]

export default function GettingStartedStep({ onNext }: { onNext: () => void }) {
	const [selected, setSelected] = useState("mobile")

	return (
		<div className="flex w-full max-w-[400px] flex-col gap-8">
			<div className="flex flex-col gap-6">
				<Image
					src="https://radianos.com/favicon.ico"
					alt="Radian Logo"
					width={32}
					height={32}
					className="rounded-md"
				/>
				<div className="flex flex-col gap-2">
					<h2 className="heading-5">Let&apos;s create your first Design!</h2>
					<p className="text-fg-secondary text-sm">
						Select a topic to get started.
					</p>
				</div>
			</div>

			<div className="flex flex-col gap-5">
				<RadioGroup
					value={selected}
					onValueChange={setSelected}
					className="grid grid-cols-2 gap-3">
					{designOptions.map((option) => {
						const Icon = option.icon
						const isSelected = selected === option.value
						return (
							<label
								key={option.value}
								className={`flex cursor-pointer flex-col gap-5 rounded-lg border p-4 transition-colors ${
									isSelected
										? "border-primary-border bg-primary-accent"
										: "border-soft bg-elevation-level1 shadow-xs"
								}`}>
								<div className="flex items-start justify-between">
									<Icon
										className={`size-6 ${
											isSelected ? "text-primary" : "text-fg-secondary"
										}`}
									/>
									<RadioGroupItem value={option.value} className="shrink-0" />
								</div>
								<div className="flex flex-col gap-0.5 px-0.5">
									<span
										className={`text-sm font-medium ${
											isSelected ? "text-primary" : "text-fg"
										}`}>
										{option.title}
									</span>
									<span
										className={`text-xs ${
											isSelected ? "text-primary" : "text-fg-secondary"
										}`}>
										{option.size}
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
