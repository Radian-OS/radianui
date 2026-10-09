import React from "react"
import { Check } from "lucide-react"
import { Button } from "@/registry/ui/button"

export interface FeatureItem {
	title: string
	highlightTitleText?: string
	subtext: string
}

export interface PricingCardProps {
	name: string
	subtitle: string
	price: string
	periodText: string
	features: FeatureItem[]
	isFeatured?: boolean
	buttonLabel?: string
	onButtonClick?: () => void
}

export function PricingCard({
	name,
	subtitle,
	price,
	periodText,
	features,
	isFeatured = false,
	buttonLabel = "Try now",
	onButtonClick,
}: PricingCardProps) {
	return (
		<div
			className={`flex flex-col gap-8 rounded-3xl border p-6 transition-all duration-300 sm:p-8 ${
				isFeatured
					? "border-primary-border bg-elevation-level1"
					: "border-border bg-elevation-level1"
			} hover:shadow-md`}>
			{/* Header */}
			<div className="flex flex-col">
				<h3 className="heading-3 flex items-center gap-1.5">
					{name}
					{isFeatured && <span className="text-primary-text font-bold">+</span>}
				</h3>
				<p className="text-fg-tertiary text-sm">{subtitle}</p>
			</div>

			{/* Price Box */}
			<div
				className={`flex items-center justify-between rounded-2xl p-4 sm:p-5 ${
					isFeatured ? "bg-primary-accent" : "bg-fill2"
				}`}>
				<div className="flex items-baseline gap-2">
					<span
						className={`text-4xl font-extrabold tracking-tight ${
							isFeatured ? "text-primary-text" : "text-fg"
						}`}>
						{price}
					</span>
					<span className="text-fg-secondary text-xs font-medium">
						{periodText}
					</span>
				</div>
				<Button
					color={isFeatured ? "primary" : "neutral"}
					onClick={onButtonClick}>
					{buttonLabel}
				</Button>
			</div>

			{/* Features List */}
			<div className="flex-1">
				<ul className="flex flex-col gap-6">
					{features.map((feature, index) => (
						<li key={index} className="flex items-start gap-3.5">
							<div className="bg-success-accent text-success-text flex size-5 shrink-0 items-center justify-center rounded-full">
								<Check className="size-3 stroke-[3]" />
							</div>
							<div className="flex flex-col gap-0.5">
								<p className="text-fg text-sm font-bold">
									{feature.title}
									{feature.highlightTitleText && (
										<span className="text-primary-text font-bold">
											{" "}
											{feature.highlightTitleText}
										</span>
									)}
								</p>
								<p className="text-fg-secondary text-xs leading-normal">
									{feature.subtext}
								</p>
							</div>
						</li>
					))}
				</ul>
			</div>

			{/* Footer Description */}
			<div className="border-border flex flex-col gap-1 border-t pt-6">
				<p className="text-fg text-xs font-bold">More description here</p>
				<p className="text-fg-tertiary text-xs">
					Lorem ipsum aliquam erat volutpat – cras dapibus.
				</p>
			</div>
		</div>
	)
}
