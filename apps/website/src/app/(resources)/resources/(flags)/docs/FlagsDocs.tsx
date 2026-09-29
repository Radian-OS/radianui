import Image from "next/image"
import { ResourceLibraryCTA } from "../../components/ResourceCTA"
import {
	ResourceDocs,
	ResourceFaq,
	ResourceTextSection,
} from "../../components/ResourceDocs"
import FlagUseCasesMarquee from "./FlagUseCasesMarquee"

const useCasePoints = [
	{
		title: "Country selectors",
		description:
			"Help users choose their country in forms, onboarding, shipping addresses, and phone number inputs.",
	},
	{
		title: "Regional Settings",
		description:
			"Represent countries or locales in region-specific settings and preferences.",
	},
	{
		title: "Travel & Booking",
		description:
			"Display destinations, routes, and participating countries in travel experiences.",
	},
	{
		title: "International Commerce",
		description:
			"Indicate shipping destinations, supported markets, or country-specific storefronts.",
	},
	{
		title: "Maps & Analytics",
		description:
			"Use flags for maps, dashboards, rankings, and country-based analytics without making users decode location data.",
	},
	{
		title: "Sports & Global Events",
		description:
			"Help users quickly identify countries competing in global sports events and tournaments.",
	},
	{
		title: "User Profiles",
		description:
			"Show a user's country or region in profiles, directories, and member lists.",
	},
	{
		title: "International Payments",
		description:
			"Display supported countries for currencies, payment methods, or banking services.",
	},
	{
		title: "VPN & Server Selection",
		description:
			"Help users choose server locations for faster and more reliable connections.",
	},
	{
		title: "Language & Localization",
		description:
			"Help users choose the language or region that best matches their location.",
	},
]

const designPoints = [
	{
		title: "Choose one flag style",
		description:
			"Stick to a consistent flag style, such as flat, rounded, or square, throughout your interface.",
	},
	{
		title: "Keep flags recognizable",
		description:
			"Avoid cropping, stretching, or applying heavy effects that make flags difficult to identify.",
	},
	{
		title: "Use appropriate sizes",
		description:
			"Select flag sizes that remain clear without overpowering surrounding content in lists, cards, or tables.",
	},
	{
		title: "Maintain equal visual weight",
		description:
			"Display flags within consistent dimensions and spacing so every country appears balanced, regardless of its aspect ratio.",
	},
	{
		title: "Respect official designs",
		description:
			"Use accurate and up-to-date flag designs to ensure they correctly represent each country.",
	},
	{
		title: "Consider accessibility",
		description:
			"Don't rely on flags alone; include country names or labels so everyone can easily identify the intended country.",
	},
	{
		title: "Handle special territories thoughtfully",
		description:
			"Decide how you'll represent territories and disputed regions, and apply the same approach consistently across your product.",
	},
]

const developmentPoints = [
	{
		title: "Map flags from standardized country codes",
		description:
			"Use ISO 3166-1 alpha-2 codes as the single source of truth to avoid mismatched assets and inconsistent mappings.",
	},
	{
		title: "Keep flag assets independent from business logic",
		description:
			"Store and manage flag resources separately so updates to assets don't require changes to application logic",
	},
	{
		title: "Load only what you need",
		description:
			"Avoid bundling every flag into the initial build by loading assets on demand or importing only the countries your application requires.",
	},
	{
		title: "Support multiple asset formats",
		description:
			"Allow the component to work with SVG, PNG, or CDN-hosted assets so it can adapt to different project requirements.",
	},
	{
		title: "Account for geopolitical updates",
		description:
			"Design the component so flag assets and country metadata can be updated without changing the component API.",
	},
	{
		title: "Make asset sources configurable",
		description:
			"Allow developers to swap between local assets, external CDNs, or custom flag libraries without modifying the component itself.",
	},
	{
		title: "Separate country metadata from presentation",
		description:
			"Keep country names, ISO codes, dialing codes, and regions in structured data rather than hardcoding them into the component.",
	},
	{
		title: "Validate country inputs",
		description:
			"Verify incoming country codes before rendering to prevent broken images and unexpected UI states.",
	},
	{
		title: "Minimize duplicate assets",
		description:
			"Reuse a single source of flag assets across the application to reduce bundle size and simplify maintenance.",
	},
]

const faqItems = [
	{
		question: "Does this collection include all country flags with names?",
		answer:
			"The library includes more than 250 country and regional flags. You can search the world flags by country name, ISO code, or international calling code, then open any result to copy or download it.",
	},
	{
		question: "Can developers and designers both use this flag library?",
		answer:
			"Yes. React developers can install the npm package, while designers can download SVG or PNG assets for Figma and any other design tool that supports those formats. The npm package itself is specifically for React.",
	},
	{
		question: "Can I use these country flags in commercial products?",
		answer:
			"Yes. The flag assets can be used in personal and commercial interfaces. Check any jurisdiction-specific restrictions when a government emblem has regulated usage.",
	},
	{
		question: "Should I use country flag SVG or flag PNG files?",
		answer:
			"SVG is the best default for interfaces because it stays sharp at every size and is typically lightweight. Flag PNG images are useful for presentations, static exports, and platforms that cannot render SVG files.",
	},
	{
		question: "Are these flag icons the same as flag emojis?",
		answer:
			"No. Flag emojis are Unicode characters whose appearance changes by platform. These flag icons are consistent SVG and PNG assets that give you control over shape, size, and rendering.",
	},
	{
		question: "Can I find Nordic, African, and Spanish-speaking country flags?",
		answer:
			"Yes. The collection includes Nordic flags, African country flags, and flags for Spanish-speaking countries. Search by a country name or ISO code to find each regional set.",
	},
	{
		question: "Should flags be used for language selection?",
		answer:
			"A language can be spoken in several countries, so the language name should remain the primary label. A flag can be an additional regional cue when the locale is country-specific.",
	},
	{
		question: "How should circular flag variants be made?",
		answer:
			"Crop the rectangular asset inside a fixed square container with a circular mask. Keep the original centered and verify that important symbols remain visible.",
	},
	{
		question: "How do I make a flag selector accessible?",
		answer:
			"Give the control a visible country name, a programmatic label, keyboard navigation, and a selected state. Treat the flag itself as decorative when the name is already announced.",
	},
]

export default function FlagsDocs() {
	return (
		<ResourceDocs label="Country flag design and React development guide">
			<ResourceTextSection
				id="flag-introduction-heading"
				eyebrow="Introduction"
				title="Country and Nation Flags for Design and Development"
				visual={<FlagCollectionCard />}>
				<p>
					Country flag icons are scalable representations of national flags that
					help users identify countries in an interface. This collection brings
					together flags of the world with country names, ISO codes, and calling
					codes, making each flag image easier to find and use.
				</p>
				<p>
					The collection supports both design and development workflows.
					Designers can use the downloaded SVG and PNG flag images in Figma and
					any design tool that supports these formats. React developers can
					install the npm package and use the flag components directly in their
					applications.
				</p>
			</ResourceTextSection>

			<ResourceTextSection
				id="flag-use-cases-heading"
				eyebrow="Use cases"
				title="How to Use Country Flags in Maps, Selectors, and Apps"
				points={useCasePoints}
				visual={<FlagUseCasesMarquee />}>
				<p>
					Country flag icons are a familiar visual element in products that
					support users around the world. Whether they&apos;re used in country
					pickers, travel applications, global dashboards, or regional settings,
					they help users identify countries quickly while making international
					experiences feel more intuitive.
				</p>
			</ResourceTextSection>

			<ResourceTextSection
				id="flag-design-heading"
				eyebrow="Design"
				title="Best Design Practices for Country Flag Icons and Images"
				points={designPoints}>
				<p>
					For design work, the SVG and PNG country flag assets can be used in
					Figma, Sketch, Adobe tools, presentations, and other software that
					support common image formats. Keep the flag design recognizable,
					visually consistent, and paired with a country label when the context
					is not obvious.
				</p>
			</ResourceTextSection>

			<ResourceTextSection
				id="flag-development-heading"
				eyebrow="Development"
				title="Best Development Practices for Country Flag Components and Assets"
				points={developmentPoints}>
				<p>
					For React development, install the @radianui/flags npm package and use
					the components directly in your application. The npm package is built
					for React; developers using other frameworks can download and use the
					SVG or PNG assets instead. Standardized country codes, optimized
					files, localization, and accessible labels keep implementations
					reliable.
				</p>
			</ResourceTextSection>

			<ResourceFaq id="flag-faq-heading" items={faqItems} />

			<ResourceLibraryCTA id="flag-cta-heading" />
		</ResourceDocs>
	)
}

function FlagCollectionCard() {
	return (
		<div className="border-soft bg-fill2 relative mx-auto h-100 w-full overflow-hidden rounded-2xl border lg:w-200">
			<Image
				src="/flags/cover/flag-cover-image.png"
				alt="Country flag selector and currency picker interface"
				fill
				sizes="(min-width: 1024px) 800px, 100vw"
				className="object-cover dark:hidden"
				unoptimized
			/>
			<Image
				src="/flags/cover/flag-cover-image-dark.png"
				alt="Country flag selector and currency picker interface in dark mode"
				fill
				sizes="(min-width: 1024px) 800px, 100vw"
				className="hidden object-cover dark:block"
				unoptimized
			/>
		</div>
	)
}
