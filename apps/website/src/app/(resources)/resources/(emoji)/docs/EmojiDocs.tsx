import { ResourceLibraryCTA } from "../../components/ResourceCTA"
import {
	ResourceDocs,
	ResourceFaq,
	ResourceTextSection,
} from "../../components/ResourceDocs"

const usagePoints = [
	{
		title: "Product interfaces",
		description:
			"Add familiar visual cues to reactions, statuses, empty states, and compact controls.",
	},
	{
		title: "Messages and community",
		description:
			"Let people express tone and intent in comments, chat, and social features.",
	},
	{
		title: "Content and marketing",
		description:
			"Use a small number of relevant emojis to make headings and calls to action easier to scan.",
	},
]

const faqItems = [
	{
		question: "Can I copy these emojis for free?",
		answer:
			"Yes. Emojis are Unicode characters, so you can copy and paste them into websites, applications, documents, and messages.",
	},
	{
		question: "Why can the same emoji look different across platforms?",
		answer:
			"Unicode defines the character and meaning, while Apple, Google, Microsoft, and other platforms provide their own artwork for it.",
	},
	{
		question: "How do I use an emoji in code?",
		answer:
			"Open an emoji detail page to copy the character, Unicode values, HTML entity, URI-encoded value, or accessible HTML. You can also download SVG and high-resolution PNG exports.",
	},
]

export default function EmojiDocs() {
	return (
		<ResourceDocs label="Unicode emoji usage guide">
			<ResourceTextSection
				id="emoji-guide"
				eyebrow="Introduction"
				title="A practical Unicode emoji library">
				<p>
					Every item in this collection comes from the Unicode emoji dataset.
					Use the category filter to explore related characters, search by name,
					or open an emoji&apos;s detail page for its codepoints and version
					information.
				</p>
				<p>
					Because these are real text characters, they remain selectable,
					searchable, and easy to place in interfaces without downloading image
					assets.
				</p>
			</ResourceTextSection>

			<ResourceTextSection
				id="emoji-use-cases-heading"
				eyebrow="Use cases"
				title="Where emojis work well in product design"
				points={usagePoints}>
				<p>
					Emojis are most useful when they support clear language instead of
					replacing it. Pair important symbols with labels and keep their
					meaning consistent throughout your product.
				</p>
			</ResourceTextSection>

			<ResourceFaq id="emoji-faq-heading" items={faqItems} />
			<ResourceLibraryCTA id="emoji-cta-heading" />
		</ResourceDocs>
	)
}
