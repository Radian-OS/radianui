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
			"Help users pick their country in forms, onboarding, shipping addresses, and phone number inputs.",
	},
	{
		title: "Maps & analytics",
		description:
			"Use flags for maps, dashboards, rankings, and country-based analytics so users don't have to decode location data.",
	},
	{
		title: "E-commerce & payments",
		description:
			"Show shipping destinations, supported markets, currencies, and payment methods.",
	},
	{
		title: "Travel & booking",
		description:
			"Display destinations, routes, and participating countries in travel experiences.",
	},
	{
		title: "User profiles",
		description:
			"Show a user's country or region in profiles, directories, and member lists.",
	},
	{
		title: "Sports & global events",
		description:
			"Help users quickly identify countries competing in tournaments and global events.",
	},
	{
		title: "VPN & server selection",
		description:
			"Let users choose server locations for faster, more reliable connections.",
	},
	{
		title: "Regional settings",
		description:
			"Represent a user's country or region in locale, currency, and preference settings. Pair the flag with a language name if you're using it near language options, since a flag shows a country, not a language.",
	},
]

const designPoints = [
	{
		title: "Choose one flag style",
		description:
			"Stick to a consistent flag style, either flat or rounded across your interface.",
	},
	{
		title: "Keep flags recognizable",
		description:
			"Don't crop, stretch, or add heavy effects that hide a flag's colors and pattern.",
	},
	{
		title: "Use appropriate sizes",
		description:
			"Pick sizes that stay clear in lists, cards, and tables without overpowering the content around them.",
	},
	{
		title: "Maintain equal visual weight",
		description:
			"Use consistent dimensions and spacing so flags look balanced whatever their aspect ratio.",
	},
	{
		title: "Respect official designs",
		description:
			"Use accurate, up-to-date flag designs so each country is represented correctly.",
	},
	{
		title: "Consider accessibility",
		description:
			"Don't rely on flags alone. Add country names or labels, and set alt text or an aria-label on each flag.",
	},
	{
		title: "Handle special territories thoughtfully",
		description:
			"Decide how you'll represent territories and disputed regions, and apply that approach consistently across your product.",
	},
	{
		title: "Add a subtle border to light flags",
		description:
			"Flags with a lot of white, like Japan or Finland, can disappear on white backgrounds. A thin border keeps the edges visible in both light and dark mode.",
	},
]

const developmentPoints = [
	{
		title: "Map flags from ISO country codes",
		description:
			"Use ISO 3166-1 alpha-2 codes (like NP, IT, US) as the single source of truth so assets and mappings never drift apart.",
	},
	{
		title: "Load only what you need",
		description:
			"Import only the countries you use or lazy-load flags on demand, and reuse one shared set of assets to keep bundle size down.",
	},
	{
		title: "Support multiple formats and sources",
		description:
			"Work with SVG, PNG, or CDN-hosted assets, and let developers swap between local files, a CDN, or a custom flag library without changing the component.",
	},
	{
		title: "Separate data from presentation",
		description:
			"Keep country names, ISO codes, dialing codes, and regions in structured data instead of hardcoding them. That way geopolitical changes only touch the data, not the component API.",
	},
	{
		title: "Validate country inputs",
		description:
			"Check codes before rendering, and fall back to the country name or a placeholder for unknown codes so users never see a broken image.",
	},
	{
		title: "Label flags for screen readers",
		description: (
			<>
				Use <code>{'alt="Flag of Italy"'}</code> or an aria-label. If the
				country name is already shown next to the flag, use an empty alt so it
				isn't announced twice.
			</>
		),
	},
]

const faqItems = [
	{
		question: "Does this collection include all country flags and names?",
		answer:
			"Yes. The collection includes 250+ flags of the world, each with its country name, ISO code, and calling code. You can search by any of them in the grid above.",
	},
	{
		question: "Can developers and designers both use this flag library?",
		answer:
			"Yes. Developers can install the @radianui/flags npm package for React. Designers can download SVG and PNG flag images for Figma, Sketch, and other tools.",
	},
	{
		question: "Can I use these country flags in commercial products?",
		answer:
			"Yes. The flag assets can be used in personal and commercial interfaces. Check any jurisdiction-specific restrictions when a government emblem has regulated usage.",
	},
	{
		question: "Should I use country flag SVG or flag PNG files?",
		answer:
			"Use SVG in most cases, since it scales without losing quality and has small file sizes. Use PNG when your tool or platform doesn't support SVG, like some email clients, slides, or older design software.",
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
		question: "Are these national flags accurate and up to date?",
		answer:
			"The flags follow each country's official design, and we update the collection when a flag changes.",
	},
	{
		question: "Does the collection include the UN flag and territory flags?",
		answer:
			"Yes. Besides sovereign countries, the collection includes the United Nations and a range of territories and regions, like Wales and the Åland Islands. Check the flag grid for the full list.",
	},
	{
		question: "How should circular flag variants be made?",
		answer:
			"Crop the flag into a circle from the center and keep the most recognizable part of the design visible. Avoid stretching. Check flags with off-center details, and add a thin border to light flags so the edges don't disappear.",
	},
	{
		question: "How do I make a flag selector accessible?",
		answer:
			"Give the control a visible country name, a programmatic label, keyboard navigation, and a selected state. Treat the flag itself as decorative when the name is already announced.",
	},
	{
		question: "Should flags be used for language selection?",
		answer:
			"Usually not. A flag represents a country, not a language, and many languages are spoken in several countries. Use the language name (like 'Español') as the main label, and only add a flag as a supporting visual if it helps.",
	},
]

export default function FlagsDocs() {
	return (
		<ResourceDocs label="Country flag design and React development guide">
			<ResourceTextSection
				id="flag-introduction-heading"
				eyebrow="Introduction"
				title="National Flags and Country Flag Icons for Design and Development"
				visual={<FlagCollectionCard />}>
				<p>
					Country flag icons are scalable versions of national flags that help
					users recognize a country at a glance. This collection includes 250+
					flags of the world with country names, ISO codes, and calling codes,
					so every flag image is easy to search, find, and use.
				</p>
				<p>
					The collection works for both design and development. Designers can
					download SVG and PNG flag images for Figma or any design tool. React
					developers can install the npm package and drop the flag components
					straight into their apps.
				</p>
				<p>
					Unlike flag emojis, which look different across operating systems and
					don't render on some Windows browsers, these flag icons look identical
					everywhere.
				</p>
			</ResourceTextSection>

			<ResourceTextSection
				id="flag-use-cases-heading"
				eyebrow="Use cases"
				title="How to Use Country Flags in Maps, Selectors, and Apps"
				points={useCasePoints}
				pointSeparator="–"
				visual={<FlagUseCasesMarquee />}>
				<p>
					Country flag icons are a familiar visual in products with a global
					audience. Use them in country pickers, travel apps, dashboards, and
					regional settings to help users spot a country quickly and make
					international experiences feel more intuitive.
				</p>
			</ResourceTextSection>

			<ResourceTextSection
				id="flag-design-heading"
				eyebrow="Design"
				title="Best Design Practices for Country Flag Icons and Images"
				points={designPoints}
				pointSeparator="–">
				<p>
					Use the SVG and PNG flag assets in Figma, Sketch, Adobe tools, and
					presentations. Whatever tool you pick, keep the flag design
					recognizable, visually consistent, and paired with a country label
					when the context isn't obvious.
				</p>
			</ResourceTextSection>

			<ResourceTextSection
				id="flag-development-heading"
				eyebrow="Development"
				title="Best Development Practices for Country Flag Components and Assets"
				points={developmentPoints}
				pointSeparator="–">
				<p>
					For React, install the @radianui/flags npm package and use the flag
					components directly in your app. Using another framework? Download the
					SVG or PNG flag icons and use them as regular assets. Either way,
					standardized country codes, optimized files, and accessible labels
					keep your implementation reliable.
				</p>
			</ResourceTextSection>

			<ResourceFaq
				id="flag-faq-heading"
				title="Country Flags FAQ: Icons, SVG, PNG, and Emojis"
				items={faqItems}
			/>

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
