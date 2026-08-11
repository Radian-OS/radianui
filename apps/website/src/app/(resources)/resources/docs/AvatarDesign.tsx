import React from "react"

const designPoints = [
	{
		title: "Support multiple sizes",
		description:
			"Provide consistent sizing options for various use cases such as navigation bars, tables, cards, profiles, and detailed views.",
	},
	{
		title: "Always include a fallback",
		description:
			"Display user initials, a generic icon, or a placeholder illustration whenever a profile image fails to load or hasn't been uploaded.",
	},
	{
		title: "Keep shapes consistent",
		description:
			"Use circular avatars for people and rounded square or square avatars for organizations or products to establish visual consistency.",
	},
	{
		title: "Use status indicators carefully",
		description:
			"Online, offline, busy, away, and verified badges should be subtle without distracting from the primary avatar.",
	},
	{
		title: "Optimize image quality",
		description:
			"Use appropriately sized images, lazy loading, and responsive assets to improve loading performance without sacrificing clarity.",
	},
	{
		title: "Design for accessibility",
		description:
			"Provide descriptive alt text, sufficient color contrast, keyboard support where applicable, and avoid relying solely on color to communicate status.",
	},
	{
		title: "Handle large groups gracefully",
		description:
			"Use overlapping avatar groups with overflow indicators such as +5 or +12 instead of displaying every participant.",
	},
	{
		title: "Respect privacy",
		description:
			"Provide placeholder avatars for anonymous users and avoid exposing profile images when privacy settings restrict visibility.",
	},
	{
		title: "Stay consistent across the product",
		description:
			"Reuse the same spacing, border radius, badge placement, and sizing scale throughout your design system.",
	},
]

const AvatarDesign = () => {
	return (
		<section
			aria-labelledby="avatar-design-heading"
			className="lg:w-200 mx-auto flex w-full flex-col gap-6">
			<div className="flex flex-col gap-4">
				<p className="text-primary-text text-sm font-medium">Design</p>
				<h2 id="avatar-design-heading" className="heading-4">
					Avatar UI Design Best Practices
				</h2>
				<div className="flex flex-col gap-8">
					<p>
						A good avatar component stays recognizable, accessible, and
						consistent no matter where it shows up in your product. Here&apos;s
						what to get right:
					</p>
					<ul className="flex list-disc flex-col gap-4 pl-5">
						{designPoints.map((point) => (
							<li key={point.title}>
								<span className="font-semibold">{point.title}</span> -{" "}
								{point.description}
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	)
}

export default AvatarDesign
