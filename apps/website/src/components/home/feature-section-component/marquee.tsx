import React from "react"
import { InfiniteScroll } from "@/registry/animated/infinite-scroll"
import { Badge } from "@/registry/ui/badge"
import AnimatedPurpleGrid from "./animated-purple-grid"

const componentStyle = ["Button", " Input", "Card", "Tooltip", "Dropdown", "Avatar", "Badge", "Tabs", "Accordion", "Slider", "Progress Bar", "Switch", "Checkbox"]

export const Marquee = () => {
	return (
		<div className="flex w-full flex-col items-center gap-12">
			<InfiniteScroll>
				<div className="relative flex items-center justify-center gap-3">
					{componentStyle.map((component, index) => (
						<Badge key={index} variant="soft" size="28" color="primary" className="border-primary rounded-full border text-sm">
							{component}
						</Badge>
					))}
				</div>
			</InfiniteScroll>

			<AnimatedPurpleGrid />
		</div>
	)
}
