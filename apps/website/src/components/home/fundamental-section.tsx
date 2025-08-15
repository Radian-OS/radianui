import React from "react"

import ComponentCard from "@/components/home/component-card"
import { navigationItems } from "@/config/navigation-config"

const fundamentals = navigationItems.find((section) => section.title === "Fundamentals")!

export default function FundamentalSection() {
	return (
		<>
			<div className="max-w-310 mx-auto">
				<div id="header" className="lg:py-7.5 flex flex-col gap-1 px-4 py-6 md:p-6 lg:px-10">
					<h2 className="heading-6 text-fg">{fundamentals.title}</h2>
					<p className="body-15 text-fg-secondary font-normal">{fundamentals.description}</p>
				</div>
				<div className="bg-border -ml-396 h-[0.5px] w-[calc(100%+999rem)]" />
			</div>
			<div className="max-w-310 mx-auto">
				<div id="body" className="lg:pb-15 grid grid-cols-1 gap-4 px-4 pb-8 pt-6 sm:grid-cols-2 md:grid-cols-3 md:gap-6 md:px-6 lg:grid-cols-4 lg:p-10">
					{fundamentals.items.map((item, idx) => (
						<ComponentCard
							alt={item.alt!}
							key={item.title + idx}
							url={item.url!}
							title={item.title}
							description={item.description!}
							thumbnail={item.thumbnail!}
							thumbnailDark={item.thumbnailDark!}
						/>
					))}
				</div>
			</div>

			<div className="bg-border -ml-396 h-[0.5px] w-[calc(100%+999rem)]" />
		</>
	)
}
