import { Badge } from "@/styles/default/ui/badge"
import features from "./features-content.json"

export function FeatureSection() {
	return (
		<div className="mx-auto flex max-w-screen-xl flex-col gap-10 px-5 py-8 sm:px-6 sm:py-15">
			<div className="flex flex-col gap-5 lg:items-center lg:gap-6">
				<div className="flex flex-col gap-3 lg:items-center">
					<Badge variant="outline">Features</Badge>
					<h2 className="heading-2 max-w-3xl lg:text-center">
						Turn ideas into projects
					</h2>
				</div>
				<p className="text-fg-secondary max-w-screen-sm lg:text-center">
					Get the best assets for your next project. Focus more on building your
					product than fixing boring responsive designs and pixel peeping
				</p>
			</div>
			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{features.map((feature, index) => (
					<div key={index} className="h-100 rounded-xl border p-5">
						<div className="to-bg relative size-full rounded-lg bg-gradient-to-b from-transparent">
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
