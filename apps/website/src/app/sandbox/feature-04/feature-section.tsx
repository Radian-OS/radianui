import { Badge } from "@/styles/default/ui/badge"

const features = [
	{
		title: "Seamless Integration",
		description:
			"Blend seamlessly with the tools you already use, allowing for a smooth development process",
		image: "/sandbox/placeholder.svg",
		colSpan: "lg:col-span-2 sm:col-span-2",
	},
	{
		title: "Ready-to-use Components",
		description:
			"Comprehensive library of UI components that are ready to be implemented",
		image: "/sandbox/placeholder.svg",
		colSpan: "lg:col-span-2 sm:col-span-2",
	},
	{
		title: "Advanced Component Version Control",
		description:
			"Maintain control over component updates with Radian's version control system",
		image: "/sandbox/placeholder.svg",
		colSpan: "lg:col-span-2 sm:col-span-2",
	},
	{
		title: "Customizable Themes",
		description:
			"Easily customize themes to match your brand and make your product stands out visually",
		image: "/sandbox/placeholder.svg",
		colSpan: "lg:col-span-3 sm:col-span-2",
	},
	{
		title: "Collaborative Design Libraries",
		description:
			"Blend seamlessly with the tools you already use, allowing for a smooth development process",
		image: "/sandbox/placeholder.svg",
		colSpan: "lg:col-span-3 sm:col-span-4",
	},
]

export function FeatureSection() {
	return (
		<div className="mx-auto flex max-w-screen-xl flex-col gap-10 px-5 py-8 sm:px-6 sm:py-15">
			<div className="flex flex-col items-center gap-5 lg:gap-6">
				<div className="flex flex-col items-center gap-3">
					<Badge variant="outline">Features</Badge>
					<h2 className="heading-2 max-w-3xl text-center">
						Turn ideas into projects
					</h2>
				</div>
				<p className="text-fg-secondary max-w-screen-sm text-center">
					Get the best assets for your next project. Focus more on building your
					product than fixing boring responsive designs and pixel peeping
				</p>
			</div>
			<div className="grid grid-cols-1 gap-5 sm:grid-cols-4 lg:grid-cols-6">
				{features.map((feature, index) => (
					<div
						key={index}
						className={`h-100 rounded-xl border p-5 ${feature.colSpan}`}>
						<div className="to-bg relative size-full bg-gradient-to-b from-transparent">
							<img
								src={feature.image}
								alt="no-image"
								className="absolute -z-10 size-full rounded-lg object-cover"
							/>
							<div className="absolute bottom-0 flex max-w-90 flex-col gap-2">
								<h3 className="text-lg font-semibold">{feature.title}</h3>
								<p className="text-fg-secondary text-sm">
									{feature.description}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default FeatureSection
