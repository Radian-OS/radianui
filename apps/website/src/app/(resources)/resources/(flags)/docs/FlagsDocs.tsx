import { Figma, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { ResourceCTA } from "../../components/ResourceCTA"
import {
	ResourceDocs,
	ResourceFaq,
	ResourceTextSection,
} from "../../components/ResourceDocs"

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
			"Visualize country-based data, user distribution, rankings, and reports.",
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
		title: "Use Appropirate sizes",
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
		question: "Can I use these country flags in commercial products?",
		answer:
			"Yes. The flag assets can be used in personal and commercial interfaces. Check any jurisdiction-specific restrictions when a government emblem has regulated usage.",
	},
	{
		question: "Which format should I use in a web application?",
		answer:
			"SVG is the best default for interfaces because it stays sharp at every size and is typically lightweight. PNG is useful when a platform cannot render SVG files.",
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
		<ResourceDocs label="Country flag design and development guide">
			<ResourceTextSection
				id="flag-introduction-heading"
				eyebrow="Introduction"
				title="What are Country Flag Icons?"
				visual={<FlagCollectionImage />}>
				<p>
					Country flag icons are visual representations of national flags used
					to help users quickly identify countries in a user interface. Because
					they&apos;re instantly recognizable, they make it easier to navigate
					international features and understand location-based information at a
					glance.
				</p>
				<p>
					You&apos;ll commonly find country flag icons in websites, mobile apps,
					and global products such as country selectors, phone number inputs,
					shipping forms, travel platforms, and analytics dashboards. When used
					consistently and paired with clear text labels where needed, they
					improve recognition, reduce scanning time, and create a more intuitive
					user experience.
				</p>
			</ResourceTextSection>

			<ResourceTextSection
				id="flag-use-cases-heading"
				eyebrow="Use cases"
				title="Common Country flag icon UI layouts and patterns"
				points={useCasePoints}>
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
				title="Country Flag UI Design Best Practices"
				points={designPoints}>
				<p>
					Country flag icons should be easy to recognize, visually consistent,
					and used appropriately across your interface. Whether they appear in
					forms, navigation, dashboards, or international experiences, following
					these best practices helps create a clear and reliable user
					experience.
				</p>
			</ResourceTextSection>

			<ResourceTextSection
				id="flag-development-heading"
				eyebrow="Development"
				title="Country Flag Development Practices"
				points={developmentPoints}>
				<p>
					Country flag icons are used in many parts of modern applications, so
					it&apos;s important to build them with flexibility and reliability in
					mind. By handling standardized country codes, optimized assets,
					localization, and accessibility from the start, you can create a
					component that&apos;s easy to maintain and reuse throughout your
					product. Here are some development best practices for country flag
					icons:
				</p>
			</ResourceTextSection>

			<ResourceFaq id="flag-faq-heading" items={faqItems} />

			<ResourceCTA
				id="flag-cta-heading"
				badge="Open Source Library"
				title="Production-Ready UI Blocks for Designers and Developers"
				description="Radian UI bridges design and development with reusable components, developer documentation, and a synchronized Figma library."
				actions={
					<>
						<Button variant="glossy" className="w-full" asChild>
							<Link href={process.env.NEXT_PUBLIC_BLOCKS_URL!}>
								<Github />
								Documentation
							</Link>
						</Button>
						<Button
							variant="outline"
							className="w-full"
							color="neutral"
							asChild>
							<Link href="https://www.figma.com/community/file/1601125934366184350/radian-design-system-version-0-1-2">
								<Figma />
								View Figma Library
							</Link>
						</Button>
					</>
				}
				visual={
					<div className="pointer-events-none absolute top-1/2 -right-10 hidden w-[55%] -translate-y-1/2 lg:block">
						<Image
							src="/media/assets-page/flags-light.png"
							alt="Country flag collection in a light interface"
							width={664}
							height={418}
							className="border-soft rounded-xl border shadow-lg dark:hidden"
						/>
						<Image
							src="/media/assets-page/flags-dark.png"
							alt="Country flag collection in a dark interface"
							width={664}
							height={418}
							className="border-soft hidden rounded-xl border shadow-lg dark:block"
						/>
					</div>
				}
			/>
		</ResourceDocs>
	)
}

function FlagCollectionImage() {
	return (
		<div className="mx-auto w-full lg:w-200">
			<Image
				src="/media/assets-page/flags-light.png"
				alt="Grid of country flags in a light interface"
				width={800}
				height={504}
				className="border-soft w-full rounded-xl border md:rounded-[20px] dark:hidden"
			/>
			<Image
				src="/media/assets-page/flags-dark.png"
				alt="Grid of country flags in a dark interface"
				width={800}
				height={504}
				className="border-soft hidden w-full rounded-xl border md:rounded-[20px] dark:block"
			/>
		</div>
	)
}
