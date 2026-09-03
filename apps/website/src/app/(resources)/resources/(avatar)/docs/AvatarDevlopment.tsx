import React from "react"

const developmentPoints = [
	{
		title: "Build a composable component API",
		description:
			"Separate the avatar container, image, fallback, and status indicator into independent subcomponents that can be composed together.",
	},
	{
		title: "Support controlled and uncontrolled fallbacks",
		description:
			"Automatically switch between profile images, initials, placeholder icons, or custom fallback content without additional application logic.",
	},
	{
		title: "Expose styling through props and class names",
		description:
			"Allow developers to customize size, shape, borders, colors, and variants while still supporting utility classes and design tokens.",
	},
	{
		title: "Optimize image rendering",
		description:
			"Lazy-load avatar images, serve responsive image sizes, cache remote assets, and prevent layout shifts during loading.",
	},
	{
		title: "Handle loading and error states gracefully",
		description:
			"Detect failed image requests, retry when appropriate, and seamlessly render fallback content instead of broken images.",
	},
	{
		title: "Design for composition",
		description:
			"Make it easy to attach tooltips, dropdown menus, badges, notifications, presence indicators, or context menus without modifying the core avatar component.",
	},
	{
		title: "Support avatar groups natively",
		description:
			"Provide APIs for overlapping layouts, configurable spacing, stacking order, overflow counters, and maximum visible avatars.",
	},
	{
		title: "Keep the component framework-agnostic where possible",
		description:
			"Separate business logic from styling so the avatar can integrate with React, Vue, Angular, or other component systems.",
	},
	{
		title: "Integrate with design tokens",
		description:
			"Use semantic tokens for spacing, colors, border radius, shadows, and sizing to ensure consistency across themes.",
	},
]

const AvatarDevlopment = () => {
	return (
		<section
			aria-labelledby="avatar-development-heading"
			className="mx-auto flex w-full flex-col gap-6 lg:w-200">
			<div className="flex flex-col gap-4">
				<p className="text-primary-text text-sm font-medium">Development</p>
				<h2 id="avatar-development-heading" className="heading-4">
					<a href="#avatar-development-heading">
						Avatar Development Best Practices
					</a>
				</h2>
				<div className="flex flex-col gap-8">
					<p>
						A production-ready avatar component should be built for flexibility,
						performance, and maintainability. Rather than focusing solely on
						appearance, developers should design avatar components that handle
						image loading, fallback states, customization, accessibility, and
						composition in a predictable way. A well-architected component
						becomes a reusable building block that can be used consistently
						across navigation, messaging, tables, user profiles, and
						collaborative interfaces. Here are some good development practices
						for Avatars.
					</p>
					<ul className="flex list-disc flex-col gap-4 pl-5">
						{developmentPoints.map((point) => (
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

export default AvatarDevlopment
