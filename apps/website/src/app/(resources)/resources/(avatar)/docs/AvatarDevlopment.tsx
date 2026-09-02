import React from "react"
import { ResourceTextSection } from "../../components/ResourceDocs"

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
	{
		title: "Provide TypeScript support",
		description:
			"Export strongly typed component props, variants, and events to improve the developer experience and reduce runtime errors.",
	},
]

const AvatarDevlopment = () => {
	return (
		<ResourceTextSection
			id="avatar-development-heading"
			eyebrow="Development"
			title="Avatar Component Architecture and Development"
			points={developmentPoints}>
			<p>
				A production-ready avatar needs predictable image loading, fallback
				states, accessibility, and composition across navigation, tables,
				profiles, and messaging.
			</p>
		</ResourceTextSection>
	)
}

export default AvatarDevlopment
