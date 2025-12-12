import React from "react"
import { motion } from "motion/react"
import { FlickeringGrid } from "@/components/effects/flickering"
import { InfiniteScroll } from "@/registry/animated/infinite-scroll"
import { Badge } from "@/registry/ui/badge"
import { ComponentSvg } from "./component-svg"

const componentStyle = ["Button", " Input", "Card", "Tooltip", "Dropdown", "Avatar", "Badge", "Tabs", "Accordion", "Slider", "Progress Bar", "Switch", "Checkbox"]

export const Marquee = () => {
	const [showGrid, setShowGrid] = React.useState(false)

	const handleClick = () => {
		setShowGrid(true)
		setTimeout(() => {
			setShowGrid(false)
		}, 1000)
	}

	return (
		<div className="flex w-full flex-col items-center gap-4">
			<InfiniteScroll>
				<div className="relative flex items-center justify-center gap-3">
					{componentStyle.map((component, index) => (
						<Badge key={index} variant="soft" size="28" color="primary" className="border-primary rounded-full border text-sm">
							{component}
						</Badge>
					))}
				</div>
			</InfiniteScroll>

			<div onClick={handleClick} className="z-1 relative flex min-h-[400px] w-full cursor-pointer items-center justify-center">
				<div className="z-1 from-bg/0 to-bg absolute left-0 top-0 h-20 w-full bg-gradient-to-t" />

				<motion.div initial={{ opacity: 0 }} animate={{ opacity: showGrid ? 1 : 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="absolute inset-0">
					<FlickeringGrid squareSize={4} gridGap={6} color="#6B7280" maxOpacity={0.4} flickerChance={0.3} />
				</motion.div>
				<ComponentSvg />
			</div>
		</div>
	)
}
