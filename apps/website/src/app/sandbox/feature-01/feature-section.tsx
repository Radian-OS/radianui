import { ChevronRight } from "lucide-react"
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
			<div className="flex flex-col">
				{features.map((feature, index) => (
					<div
						key={index}
						className="flex flex-col gap-8 py-8 sm:py-10 lg:flex-row lg:gap-36 lg:py-12">
						<div
							className={`flex flex-col justify-center ${index % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}>
							<div className="flex flex-col gap-5 sm:w-120 lg:gap-6 lg:pl-6">
								<h3 className="heading-3">{feature.title}</h3>
								<p className="text-fg-secondary">{feature.description}</p>
								<a
									className="text-primary inline-flex items-center gap-1"
									href={feature.url}>
									<span className="inline-block">Get Started</span>
									<ChevronRight className="size-5" />
								</a>
							</div>
						</div>
						<div
							className={`h-80 w-full sm:h-100 ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}>
							<img
								src={feature.image}
								alt="Website Creative"
								className="size-full rounded-xl object-cover"
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default FeatureSection
