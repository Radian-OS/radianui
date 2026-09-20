import { ResourceLibraryCTA } from "../../components/ResourceCTA"
import {
	ResourceDocs,
	ResourceFaq,
	ResourceTextSection,
} from "../../components/ResourceDocs"
import { getBrandLogo, getBrandLogoUrl } from "../components/brand-logos-data"

const useCasePoints = [
	{
		title: "Integration directories",
		description:
			"Help users recognize supported apps and services in connection pickers, marketplaces, and setup flows.",
	},
	{
		title: "Authentication screens",
		description:
			"Pair familiar provider marks with clear labels in social sign-in and account-linking experiences.",
	},
	{
		title: "Technology showcases",
		description:
			"Present the tools behind a product in landing pages, documentation, case studies, and developer portals.",
	},
	{
		title: "Dashboards and reports",
		description:
			"Identify traffic sources, repositories, platforms, and connected accounts without adding visual noise.",
	},
]

const designPoints = [
	{
		title: "Choose the correct surface variant",
		description:
			"Use light assets on light surfaces and dark assets on dark surfaces so monochrome details retain contrast.",
	},
	{
		title: "Preserve clear space",
		description:
			"Give every mark enough room to remain recognizable and avoid placing nearby text or controls inside its visual boundary.",
	},
	{
		title: "Keep original proportions",
		description:
			"Scale logos uniformly without stretching, cropping, recoloring, or recreating them with text.",
	},
	{
		title: "Use wordmarks selectively",
		description:
			"Choose icons for compact controls and dense lists, and wordmarks where the brand name needs to be immediately visible.",
	},
	{
		title: "Include accessible names",
		description:
			"Provide useful alt text when a logo communicates identity, or mark it decorative when adjacent text already names the brand.",
	},
]

const developmentPoints = [
	{
		title: "Prefer SVG for responsive interfaces",
		description:
			"SVG remains crisp at any density and is the best default for most web layouts. Use PNG for tools that cannot render SVG.",
	},
	{
		title: "Select variants from your theme state",
		description:
			"Map the active application theme to the light or dark asset path instead of applying CSS filters to a logo.",
	},
	{
		title: "Reserve stable dimensions",
		description:
			"Set explicit width and height values to prevent layout shifts while remote assets load.",
	},
	{
		title: "Pin CDN versions in production",
		description:
			"Replace the main branch in CDN URLs with a release tag when you need immutable, cache-stable assets.",
	},
	{
		title: "Keep brand names alongside asset IDs",
		description:
			"Store human-readable labels separately from URL-safe IDs such as google-deepmind and tailwind-css.",
	},
]

const faqItems = [
	{
		question: "What logo variants are included?",
		answer:
			"Every included brand has an icon and a wordmark for light and dark surfaces. Each combination is available as SVG and transparent PNG, for eight assets per brand.",
	},
	{
		question: "When should I use the light or dark option?",
		answer:
			"Use the light option on light backgrounds and the dark option on dark backgrounds. These labels describe the intended surface, not necessarily the dominant color in every logo.",
	},
	{
		question: "Should I use SVG or PNG?",
		answer:
			"Use SVG for most interfaces because it scales without losing quality. Use PNG when a platform or export workflow requires a raster image.",
	},
	{
		question: "Can I recolor or reshape a brand logo?",
		answer:
			"Avoid changing a logo's colors, proportions, spacing, or composition. Refer to the brand owner's current usage guidelines before publishing.",
	},
	{
		question: "Are these logos endorsed by their owners?",
		answer:
			"No. Brand names and logos are trademarks of their respective owners. Inclusion in this library does not imply endorsement, sponsorship, or affiliation.",
	},
]

export default function BrandLogosDocs() {
	return (
		<ResourceDocs label="Brand logo design and development guide">
			<ResourceTextSection
				id="brand-logo-introduction-heading"
				eyebrow="Introduction"
				title="A practical brand logo library"
				visual={<BrandLogoCollection />}>
				<p>
					Brand logos make products and integrations recognizable at a glance.
					This collection packages commonly used marks into predictable,
					URL-safe paths so designers and developers can use the same source
					assets.
				</p>
				<p>
					Each brand includes a compact icon and a full wordmark, tuned for
					light and dark interfaces. SVG and transparent PNG formats cover both
					responsive product UI and raster-only workflows.
				</p>
			</ResourceTextSection>

			<ResourceTextSection
				id="brand-logo-use-cases-heading"
				eyebrow="Use cases"
				title="Where brand logos help users"
				points={useCasePoints}>
				<p>
					Use a brand mark when recognition helps a user choose, connect, or
					understand a service. Pair it with text whenever the brand identity is
					important to the task.
				</p>
			</ResourceTextSection>

			<ResourceTextSection
				id="brand-logo-design-heading"
				eyebrow="Design"
				title="Brand logo design best practices"
				points={designPoints}>
				<p>
					Logos should remain accurate, legible, and visually balanced. Treat
					each asset as a complete mark and use the supplied variants instead of
					modifying the artwork.
				</p>
			</ResourceTextSection>

			<ResourceTextSection
				id="brand-logo-development-heading"
				eyebrow="Development"
				title="Reliable logo implementation"
				points={developmentPoints}>
				<p>
					The collection follows a consistent CDN path: theme, format, variant,
					and brand ID. Keeping these choices explicit makes logo rendering easy
					to test and maintain across a product.
				</p>
			</ResourceTextSection>

			<ResourceFaq id="brand-logo-faq-heading" items={faqItems} />
			<ResourceLibraryCTA id="brand-logo-cta-heading" />
		</ResourceDocs>
	)
}

const collectionIds = [
	"adobe",
	"figma",
	"github",
	"openai",
	"react",
	"tailwind-css",
] as const

function BrandLogoCollection() {
	return (
		<div className="mx-auto grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:w-200">
			{collectionIds.map((id) => {
				const brand = getBrandLogo(id)
				return (
					<div
						key={id}
						className="bg-bg border-soft flex h-36 items-center justify-center rounded-xl border p-5">
						<img
							src={getBrandLogoUrl(id, "light", "wordmark")}
							alt={`${brand.name} wordmark`}
							width={180}
							height={48}
							className="h-12 w-full max-w-45 object-contain dark:hidden"
						/>
						<img
							src={getBrandLogoUrl(id, "dark", "wordmark")}
							alt=""
							width={180}
							height={48}
							className="hidden h-12 w-full max-w-45 object-contain dark:block"
						/>
					</div>
				)
			})}
		</div>
	)
}
