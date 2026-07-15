"use client"

import { DATA } from "./inverted-section-config"

export default function InvertedSectionItems() {
	return DATA.map(({ icon: Icon, title, description }, i) => (
		<div
			key={i}
			className="div-hover group relative flex w-full gap-6 border-b border-r border-[#1c1d21] p-5 transition-colors duration-300 md:flex-col md:px-8 md:py-10 lg:[&:nth-child(-n+4)]:border-t-0 lg:[&:nth-child(4n+1)]:border-l-0 lg:[&:nth-child(4n+4)]:border-r-0 lg:[&:nth-child(n+9)]:border-b-0"
			onMouseMove={(e) => {
				const rect = e.currentTarget.getBoundingClientRect()
				const x = e.clientX - rect.left
				const y = e.clientY - rect.top
				e.currentTarget.style.setProperty("--x", `${x}px`)
				e.currentTarget.style.setProperty("--y", `${y}px`)
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.removeProperty("--x")
				e.currentTarget.style.removeProperty("--y")
			}}>
			{/* Styling line for the div */}
			<div className="duration-400 not-xl:hidden absolute left-0 top-1/2 h-8 w-[1px] -translate-y-1/2 bg-[#545463] transition-all group-hover:top-1/4" />

			<Icon
				size={24}
				className="shrink-0 text-[#545463] transition-colors duration-300 group-hover:text-[#C8C8D0]"
			/>
			<div className="flex flex-col gap-2">
				<h3 className="text-base font-medium text-[#C8C8D0]">{title}</h3>
				<p className="text-sm font-normal text-[#868698]">{description}</p>
			</div>
		</div>
	))
}
