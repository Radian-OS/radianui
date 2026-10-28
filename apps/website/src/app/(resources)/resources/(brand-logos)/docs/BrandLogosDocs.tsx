import Image from "next/image"
import BrandLogoUseCasesMarquee from "./BrandLogoUseCasesMarquee"
import { brandLogoCover } from "../components/brand-logo-previews"
import { ResourceLibraryCTA } from "../../components/ResourceCTA"
import {
	ResourceDocs,
	ResourceFaq,
	ResourceTextSection,
} from "../../components/ResourceDocs"
import { getBrandLogoCatalog } from "../components/brand-logos-server"

const featurePoints = [
	{
		title: "Search by name or category",
		description:
			"Find a specific company, such as Google or Microsoft, or browse groups including AI, cloud, development, design, and payments.",
	},
	{
		title: "Choose an icon or wordmark",
		description:
			"Use the compact symbol where space is limited, or the wordmark when you want the company name to appear in the artwork.",
	},
	{
		title: "Preview light and dark variants",
		description:
			"Choose artwork for your background, with colored and neutral options available for each brand.",
	},
	{
		title: "Download SVG or PNG",
		description:
			"Save a vector file for your website or a PNG for a mockup, slide deck, or image editor. PNG files are rendered from the SVG in your browser.",
	},
	{
		title: "Copy code and image links",
		description:
			"Copy SVG markup, a direct CDN URL, or an HTML or Next.js image snippet from the logo controls.",
	},
	{
		title: "Share a specific logo",
		description:
			"Opening a logo gives it its own page URL. Copy that address to send a teammate straight to the brand you are using.",
	},
]

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
		title: "Portfolios and tech stack sections",
		description:
			"Show React, Next.js, Tailwind CSS, GitHub, and other tools in a tech stack section, portfolio, documentation site, or developer portal.",
	},
	{
		title: "Connected accounts and reports",
		description:
			"Label the services behind a repository, traffic source, or connected account so people can tell which platform they are working with.",
	},
]

const designPoints = [
	{
		title: "Match the background",
		description:
			"Use light assets on light surfaces and dark assets on dark surfaces so monochrome details retain contrast.",
	},
	{
		title: "Preserve clear space",
		description:
			"Leave space around the logo so nearby labels, borders, and controls do not crowd the artwork.",
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
		title: "Use the supplied image snippets",
		description:
			"Copy the HTML or Next.js image snippet from the logo controls, then adjust its dimensions and styling for your layout.",
	},
]

const getFaqItems = (brandCount: number, categoryCount: number) => [
	{
		question: "How do I download free brand logos?",
		answer:
			"Search for a brand or filter by category, then open a logo to choose an icon or wordmark, background theme, and colorway. Use Download SVG for a vector file or Download PNG for a raster image. You can also copy SVG code, copy a PNG, or use the direct CDN URL.",
	},
	{
		question: "Can I use these brand logos in React or Next.js?",
		answer:
			"Yes. Copy an HTML or Next.js image snippet from the logo controls, or download the SVG into your public folder and use its path as an image source. If you paste raw SVG markup into a React component, convert SVG attributes to JSX syntax first.",
	},
	{
		question: "What does this free brand logo library include?",
		answer: `Browse ${brandCount} brands across ${categoryCount} categories, including AI, development, design, social platforms, and payments. Each brand has SVG icons and wordmarks in light, dark, colored, and neutral variants: eight assets per brand. You can also export PNGs in your browser.`,
	},
	{
		question: "When should I use the light or dark option?",
		answer:
			"Use the light option on light backgrounds and the dark option on dark backgrounds. These labels describe the intended surface contrast, not necessarily the dominant color in every logo.",
	},
	{
		question: "Should I download brand logos in SVG or PNG?",
		answer:
			"Choose SVG for websites and layouts where the logo needs to resize cleanly. Choose PNG for presentations, mockups, or editors that need an image file. PNG downloads are rendered from the selected SVG variant in your browser.",
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

export default async function BrandLogosDocs() {
	const { brandLogos, brandLogoCategories } = await getBrandLogoCatalog()
	const faqItems = getFaqItems(brandLogos.length, brandLogoCategories.length)
	return (
		<ResourceDocs label="Brand logo design and development guide">
			<ResourceTextSection
				id="brand-logo-introduction-heading"
				eyebrow="Introduction"
				title="Find the logo you need for your project"
				visual={<BrandLogoCollection />}>
				<p>
					Need a Google logo for a sign-in screen, a Microsoft wordmark for an
					integration page, or a React icon for your portfolio? Browse{" "}
					{brandLogos.length}
					brands in one place and choose the version that fits your layout.
				</p>
				<p>
					Search for a company or filter by category, then open its logo to
					preview the artwork and choose an export. Each brand has icons and
					wordmarks in colored and neutral versions for light and dark
					backgrounds.
				</p>
			</ResourceTextSection>

			<ResourceTextSection
				id="brand-logo-features-heading"
				eyebrow="Features"
				title="Browse, preview, and export"
				points={featurePoints}>
				<p>
					Take the file into your design tool, add it to your website, or share
					it with a teammate. The logo controls give you a choice of downloads,
					clipboard actions, and image links.
				</p>
			</ResourceTextSection>

			<ResourceTextSection
				id="brand-logo-use-cases-heading"
				eyebrow="Use cases"
				title="Where to use these logos"
				points={useCasePoints}
				visual={<BrandLogoUseCasesMarquee />}>
				<p>
					Use logos to identify the tools and services a page refers to. Keep
					the company name nearby when someone needs to choose a provider or
					understand which account they are connecting.
				</p>
			</ResourceTextSection>

			<ResourceTextSection
				id="brand-logo-design-heading"
				eyebrow="Design"
				title="Choose artwork that fits your layout"
				points={designPoints}>
				<p>
					An icon works well in a small button or table cell. A wordmark needs
					more horizontal space. Preview your choice against the background
					where it will appear, and keep the artwork's original proportions.
				</p>
			</ResourceTextSection>

			<ResourceTextSection
				id="brand-logo-development-heading"
				eyebrow="Development"
				title="Add a logo to your website or app"
				points={developmentPoints}>
				<p>
					Download an SVG to host with your project, or copy its CDN URL to use
					as an image source. The HTML and Next.js snippets provide a starting
					point for your markup. Set the display size for your layout and use
					alt text that names the brand when the image conveys information.
				</p>
			</ResourceTextSection>

			<ResourceFaq id="brand-logo-faq-heading" items={faqItems} />
			<ResourceLibraryCTA id="brand-logo-cta-heading" />
		</ResourceDocs>
	)
}

function BrandLogoCollection() {
	return (
		<div className="border-soft bg-fill2 relative mx-auto h-100 w-full overflow-hidden rounded-2xl border lg:w-200">
			<Image
				src={brandLogoCover.light}
				alt={brandLogoCover.alt}
				fill
				sizes="(min-width: 1024px) 800px, 100vw"
				className="object-cover dark:hidden"
			/>
			<Image
				src={brandLogoCover.dark}
				alt={`${brandLogoCover.alt} in dark mode`}
				fill
				sizes="(min-width: 1024px) 800px, 100vw"
				className="hidden object-cover dark:block"
			/>
		</div>
	)
}
