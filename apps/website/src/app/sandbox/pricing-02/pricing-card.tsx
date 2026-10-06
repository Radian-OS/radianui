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
			className={`flex flex-col rounded-3xl border p-6 transition-all duration-300 sm:p-8 ${
				isFeatured
					? "border-primary-border bg-elevation-level1 shadow-primary/5 shadow-xl"
					: "border-border bg-elevation-level1 shadow-sm"
			} hover:shadow-md`}>
			{/* Header */}
			<div className="mb-6">
				<h3 className="heading-3 text-fg flex items-center gap-1.5">
					{name}
					{isFeatured && <span className="text-orange-text font-bold">+</span>}
				</h3>
				<p className="text-fg-tertiary mt-1.5 text-sm">{subtitle}</p>
			</div>

			{/* Price Box */}
			<div
				className={`mb-8 flex items-center justify-between rounded-2xl p-4 sm:p-5 ${
					isFeatured
						? "bg-orange-accent/40 dark:bg-orange-accent/10"
						: "bg-fill2"
				}`}>
				<div className="flex items-baseline gap-2">
					<span
						className={`text-4xl font-extrabold tracking-tight ${
							isFeatured ? "text-orange-text" : "text-fg"
						}`}>
						{price}
					</span>
					<span className="text-fg-secondary text-xs font-medium">
						{periodText}
					</span>
				</div>
				<Button
					color={isFeatured ? "neutral" : "neutral"}
					variant={isFeatured ? "strong" : "outline"}
					size="40"
					onClick={onButtonClick}
					className={`rounded-full px-5 text-sm font-semibold transition-transform duration-200 active:scale-95 ${
						isFeatured
							? "bg-black-inverse text-white-inverse hover:bg-fg-secondary"
							: ""
					}`}>
					{buttonLabel}
				</Button>
			</div>

			{/* Features List */}
			<div className="mb-8 flex-1">
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
										<span className="text-orange-text font-bold">
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
			<div className="border-border mt-6 border-t pt-6">
				<p className="text-fg text-xs font-bold">More description here</p>
				<p className="text-fg-tertiary mt-1 text-xs">
					Lorem ipsum aliquam erat volutpat – cras dapibus.
				</p>
			</div>
		</div>
	)
}
