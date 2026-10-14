import { ResourceLibraryCTA } from "../../components/ResourceCTA"
import {
	ResourceDocs,
	ResourceFaq,
	ResourceTextSection,
} from "../../components/ResourceDocs"
import {
	getBrandLogo,
	getBrandLogoSvgUrl,
} from "../components/brand-logos-data"

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
		title: "Tech stack logos for websites",
		description:
			"Show React, Next.js, Tailwind CSS, GitHub, and other tools in a tech stack section, portfolio, documentation site, or developer portal.",
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
		title: "Download brand logos as SVG or PNG",
		description:
			"Download SVG files for scalable website graphics. Export PNG files for slide decks, mockups, or tools that need a raster image.",
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
		title: "Use stable asset URLs in production",
		description:
			"The supplied CDN URLs follow the main branch. For a fixed version, save the SVG locally or pin the URL to a specific commit from the source repository.",
	},
	{
		title: "Keep brand names alongside asset IDs",
		description:
			"Store human-readable labels separately from URL-safe IDs such as google-deepmind and tailwind-css.",
	},
]

const faqItems = [
	{
		question: "How do I download free brand logos?",
		answer:
			"Search for a brand or filter by category, then open a logo to choose an icon or wordmark, background theme, and colorway. Use Download SVG for a vector file or Download PNG for a raster image. You can also copy SVG code, copy a PNG, or use the direct CDN URL.",
	},
	{
		question: "Can I use these brand logos in React or Next.js?",
		answer:
			"Yes. Download an SVG into your public folder and reference it with an image element, or use the supplied CDN URL as the image source. Set dimensions and descriptive alt text. The resource provides SVG assets rather than a React component package; raw SVG markup needs JSX attribute conversion before you paste it inline into a component.",
	},
	{
		question: "What does this free brand logo library include?",
		answer:
			"Browse 244 brands across 12 categories, including AI, development, design, social platforms, and payments. Each brand has SVG icons and wordmarks in light, dark, colored, and neutral variants: eight assets per brand. You can also export PNGs in your browser.",
	},
	{
		question: "When should I use the light or dark option?",
		answer:
			"Use the light option on light backgrounds and the dark option on dark backgrounds. These labels describe the intended surface contrast, not necessarily the dominant color in every logo.",
	},
	{
		question: "Should I download brand logos in SVG or PNG?",
		answer:
			"Use SVG as the primary source of truth for scalable, vector-sharp graphics across any screen density. When your workflow requires raster files (such as presentations or image pipelines), you can copy or download PNGs rendered directly from the vector SVG.",
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
				title="A free brand logo library for websites and apps"
				visual={<BrandLogoCollection />}>
				<p>
					Find free brand logos for the services your product uses. Radian
					Resources brings together 244 brands across 12 categories, from AI and
					developer tools to social platforms and payment providers. Search by
					brand name or browse a category to find the right mark.
				</p>
				<p>
					Choose a compact brand icon for a button or list, or a wordmark when
					you want the name visible. Each brand includes eight SVG assets: icons
					and wordmarks in colored and neutral versions for light and dark
					backgrounds. Preview the variant before adding it to your design.
				</p>
				<p>
					Download brand logos in SVG or PNG, copy SVG code, or use a direct CDN
					URL. SVG stays sharp when resized; PNG works well in presentations and
					image editors. The files are free to access, while each brand owner's
					usage guidelines still apply to its marks.
				</p>
			</ResourceTextSection>

			<ResourceTextSection
				id="brand-logo-use-cases-heading"
				eyebrow="Use cases"
				title="Brand icons for integrations, sign-in, and tech stacks"
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
				title="Using SVG brand logos in React and Next.js"
				points={developmentPoints}>
				<p>
					For brand logos in React or Next.js, download an SVG into your public
					folder and use its path in an image element, or copy the CDN URL from
					the logo details. Add the brand name as alt text and set a size that
					preserves the original proportions. If you paste raw SVG code into
					JSX, convert attributes such as class to className first.
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
							src={getBrandLogoSvgUrl(id, "light", "colored", "wordmark")}
							alt={`${brand.name} wordmark`}
							width={180}
							height={48}
							className="h-12 w-full max-w-45 object-contain dark:hidden"
						/>
						<img
							src={getBrandLogoSvgUrl(id, "dark", "colored", "wordmark")}
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
