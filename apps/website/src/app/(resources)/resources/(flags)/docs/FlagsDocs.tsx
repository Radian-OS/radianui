import { type CountryCode, Flag } from "@radianui/flags"
import { Check } from "lucide-react"
import { Card } from "@/registry/ui/card"
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

interface CurrencyOption {
	country?: CountryCode
	emoji?: string
	code: string
	name: string
	symbol: string
	selected?: boolean
}

const countryOptions = [
	{ country: "CA", name: "Canada", dialCode: "+1" },
	{ country: "CN", name: "China", dialCode: "+86", selected: true },
	{ country: "ID", name: "Indonesia", dialCode: "+62" },
	{ country: "SE", name: "Sweden", dialCode: "+46" },
	{ country: "GB", name: "United Kingdom", dialCode: "+44" },
	{ country: "US", name: "United States", dialCode: "+1" },
	{ country: "DE", name: "Germany", dialCode: "+00" },
] as const satisfies ReadonlyArray<{
	country: CountryCode
	name: string
	dialCode: string
	selected?: boolean
}>

const popularCurrencies = [
	{ country: "US", code: "USD", name: "US Dollar", symbol: "$" },
	{ emoji: "🇪🇺", code: "EUR", name: "Euro", symbol: "€", selected: true },
	{ country: "GB", code: "GBP", name: "British Pound", symbol: "£" },
	{ country: "JP", code: "JPY", name: "Japanese Yen", symbol: "¥" },
] as const satisfies readonly CurrencyOption[]

const asiaPacificCurrencies = [
	{ country: "IN", code: "INR", name: "Indian Rupee", symbol: "₹" },
	{ country: "NP", code: "NPR", name: "Nepalese Rupee", symbol: "रू" },
] as const satisfies readonly CurrencyOption[]

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
				visual={<FlagCollectionCard />}>
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

			<ResourceLibraryCTA id="flag-cta-heading" />
		</ResourceDocs>
	)
}

function FlagCollectionCard() {
	return (
		<div className="border-soft bg-fill2 mx-auto flex h-100 w-full items-end justify-end gap-4 overflow-hidden rounded-2xl border pl-4 sm:gap-8 sm:pl-8 lg:w-200 lg:gap-14">
			<Card className="border-soft w-[284px] shrink-0 translate-y-4 gap-0 rounded-lg py-0 shadow-sm">
				<div className="border-soft text-fg-tertiary flex h-10 items-center border-b px-3 text-xs">
					Search
				</div>
				<p className="text-fg-tertiary px-3 pt-3 pb-2 text-[11px] font-medium tracking-wide uppercase">
					All country
				</p>
				<ul className="pb-3">
					{countryOptions.map((country) => (
						<li
							key={country.country}
							className="flex h-7.5 items-center gap-2 px-3 text-xs">
							<Flag country={country.country} size={20} />
							<span>{country.name}</span>
							<span className="text-fg-secondary">{country.dialCode}</span>
							{"selected" in country && country.selected ? (
								<Check className="text-fg-tertiary ml-auto size-4" />
							) : null}
						</li>
					))}
				</ul>
			</Card>

			<Card className="border-soft w-[310px] shrink-0 translate-y-4 gap-0 rounded-lg border-r-0 py-0 shadow-sm">
				<CurrencyGroup label="Popular" currencies={popularCurrencies} />
				<CurrencyGroup
					label="Asia Pacific"
					currencies={asiaPacificCurrencies}
					bordered
				/>
			</Card>
		</div>
	)
}

function CurrencyGroup({
	label,
	currencies,
	bordered = false,
}: {
	label: string
	currencies: readonly CurrencyOption[]
	bordered?: boolean
}) {
	return (
		<div className={bordered ? "border-soft border-t" : undefined}>
			<p className="text-fg-tertiary px-3 pt-3 pb-2 text-[11px] font-medium tracking-wide uppercase">
				{label}
			</p>
			<ul>
				{currencies.map((currency) => (
					<li
						key={currency.code}
						className={
							currency.selected
								? "bg-fill1 flex h-12 items-center gap-2 px-3"
								: "flex h-12 items-center gap-2 px-3"
						}>
						{currency.country ? (
							<Flag country={currency.country} size={28} />
						) : (
							<span
								aria-hidden="true"
								className="flex size-7 items-center justify-center text-xl leading-none">
								{currency.emoji}
							</span>
						)}
						<span className="flex min-w-0 flex-col">
							<span className="text-xs font-medium">{currency.code}</span>
							<span className="text-fg-secondary truncate text-[11px]">
								{currency.name} ({currency.symbol})
							</span>
						</span>
						{currency.selected ? (
							<Check className="text-fg-tertiary ml-auto size-4" />
						) : null}
					</li>
				))}
			</ul>
		</div>
	)
}
