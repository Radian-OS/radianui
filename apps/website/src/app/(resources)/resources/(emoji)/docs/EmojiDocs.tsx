import Image from "next/image"
import Link from "next/link"
import { ResourceLibraryCTA } from "../../components/ResourceCTA"
import {
	ResourceDocs,
	ResourceFaq,
	ResourceTextSection,
} from "../../components/ResourceDocs"
import EmojiUseCasesMarquee from "./EmojiUseCasesMarquee"

const linkClassName = "font-medium underline underline-offset-4"

const useCasePoints = [
	{
		title: "Messages and reactions",
		description:
			"A smiley face can soften a short reply, a laughing emoji fits a joke, and a heart can show appreciation. Choose one that matches the conversation.",
	},
	{
		title: "Birthdays and celebrations",
		description:
			"Add a birthday emoji to a greeting or a little confetti when someone shares good news. A small detail can make a familiar message feel more personal.",
	},
	{
		title: "Posts, captions, and invitations",
		description:
			"Set the mood for dinner plans, a trip, or a holiday gathering. Keep the details in words so the invitation still makes sense without the emoji.",
	},
	{
		title: "Websites and apps",
		description:
			"Give people a way to react to a post or add a friendly touch to an empty state. Keep important actions and statuses clearly labeled.",
	},
]

const designPoints = [
	{
		title: "Keep the message clear",
		description:
			"Pair a check mark with Done, or a warning symbol with a clear explanation. People should be able to understand an instruction without having to interpret the symbol.",
	},
	{
		title: "Check how it looks on other devices",
		description:
			"The same character can have different artwork on a phone and a laptop. Preview it on the devices your audience uses, especially when the expression matters.",
	},
	{
		title: "Leave enough room",
		description:
			"Leave enough space above and below the character to avoid clipping it. In a row of reactions, use consistent button sizes and alignment.",
	},
	{
		title: "Offer skin tone choices",
		description:
			"Let people choose a skin tone where the character supports it. Leave the choice to them rather than guessing from their profile.",
	},
	{
		title: "Label controls for everyone",
		description:
			"Give an emoji-only button an accessible name that explains its action. If the character is decorative and repeats a nearby label, hide it from screen readers to avoid announcing the same thing twice.",
	},
]

const developmentPoints = [
	{
		title: "Keep the whole character together",
		description:
			"Use UTF-8 for HTML and data exchange. Some emojis contain several code points; slicing a JavaScript string at an arbitrary position can split one apart.",
	},
	{
		title: "Keep emoji data separate from the UI",
		description: (
			<>
				The collection uses <code>unicode-emoji-json</code> for character names,
				categories, and version information. Keeping that data separate makes it
				easier to update your picker without rewriting the interface.
			</>
		),
	},
	{
		title: "Build a picker with familiar controls",
		description: (
			<>
				Combine a labeled{" "}
				<Link href="/docs/components/input" className={linkClassName}>
					search input
				</Link>
				,{" "}
				<Link href="/docs/components/dropdown-menu" className={linkClassName}>
					category dropdown
				</Link>
				, and{" "}
				<Link href="/docs/components/button" className={linkClassName}>
					buttons
				</Link>
				. Give keyboard users a clear focus state and announce copy results.
			</>
		),
	},
	{
		title: "Handle copying and missing fonts",
		description:
			"Show a success message only after the clipboard write finishes, and explain when it fails. Keep text labels available when a device cannot display a character.",
	},
	{
		title: "Pick the format you need",
		description:
			"Use text for messages and editable content. A PNG captures the displayed artwork, while this tool’s SVG references a font and may look different elsewhere. Shortcodes work only if your app has a parser that recognizes them.",
	},
]

const faqItems = [
	{
		question: "How do I copy and paste an emoji?",
		answer:
			"Find one you like, select it, and choose Copy as Text. Paste it where you’re writing with Ctrl + V on Windows, Command + V on Mac, or the Paste command on your phone.",
	},
	{
		question: "Is this tool free to use?",
		answer:
			"Yes. You can browse and copy emojis without paying or creating an account. Copying as text also means there’s no image to download before you can paste it into a message.",
	},
	{
		question: "How do I know what an emoji means?",
		answer:
			"Look at the expression and the message around it. A heart might express love, thanks, or support, depending on the conversation. Emoji meanings can vary between people and cultures, so add words when your message needs to be precise.",
	},
	{
		question: "What is the difference between an emoji, emoticon, and kaomoji?",
		answer:
			"An emoji is a picture character, such as 😊. An emoticon builds a face from text, such as :-), while a kaomoji is usually read upright, like (^_^). This collection contains emojis rather than text faces.",
	},
	{
		question: "Why does the same emoji look different on another device?",
		answer:
			"Apple, Google, Microsoft, and other providers draw their own versions. Copying keeps the character, but the receiving device or app chooses the artwork. Older software may also support fewer characters.",
	},
	{
		question: "Why does an emoji appear as a box or question mark?",
		answer:
			"The app or device may be missing the font support it needs, or the text may have been decoded incorrectly. Try updating your software, and check that the full character was copied. Some unsupported combinations appear as separate symbols instead.",
	},
	{
		question: "How do I open the emoji keyboard on my device?",
		answer:
			"Press Win + period on Windows or Control + Command + Space on Mac. On iPhone, tap the emoji or globe key. On Android, look for your keyboard’s emoji button; its position depends on the keyboard you use.",
	},
	{
		question: "Can I change the skin tone?",
		answer:
			"Yes, for characters that support it. Open the details and choose one of the skin tone options to copy that version. You’ll find these choices on eligible people and gestures.",
	},
	{
		question: "Is there a blue verification tick I can copy?",
		answer:
			"There isn’t a dedicated Unicode emoji for a blue verification badge. You can use ✅ or ✔️ as a check mark, but copying either one does not verify an account. Each service issues its own verification badges.",
	},
	{
		question: "Can I use them on my website or in an app?",
		answer:
			"Yes. Paste the character into your HTML or React content and use UTF-8 when storing or sending the text. If you need code values or an HTML snippet, you can copy those from the details panel too.",
	},
	{
		question: "Are Emoji Kitchen, Genmoji, and Memoji included here?",
		answer:
			"Those are separate tools. Google’s Emoji Kitchen combines emojis into stickers, while Apple’s Genmoji creates custom emoji images with Apple Intelligence and Memoji lets you personalize an avatar. Here you can copy standard Unicode characters.",
	},
	{
		question: "When are new emojis added?",
		answer:
			"This collection changes when we update its emoji dataset. New characters may take longer to appear on some devices because operating systems and apps add support at different times. Browser support checks can also affect which ones appear here.",
	},
]

export default function EmojiDocs() {
	return (
		<ResourceDocs label="A guide to using emojis">
			<ResourceTextSection
				id="emoji-introduction-heading"
				eyebrow="Introduction"
				title="Find the Right Emoji"
				visual={<EmojiCollectionCard />}>
				<p>
					Sometimes a smile or a heart says what a few extra words would. Search
					our emoji list by name or browse a category to find one that fits.
					Open its details, choose Copy as Text, and paste it wherever
					you&apos;re writing.
				</p>
				<p>
					An emoji is a picture character used in text. The word comes from
					Japanese: <em>e</em> means picture and <em>moji</em> means character.
					You&apos;ll find familiar faces alongside food, animals, gestures,
					flags, and everyday objects. You can read more about how these
					characters work in the{" "}
					<a
						href="https://unicode.org/faq/emoji_dingbats.html"
						className={linkClassName}>
						Unicode emoji FAQ
					</a>
					.
				</p>
			</ResourceTextSection>

			<ResourceTextSection
				id="emoji-use-cases-heading"
				eyebrow="Use Cases"
				title="Everyday Ways to Use Emojis"
				points={useCasePoints}
				pointSeparator="–"
				visual={<EmojiUseCasesMarquee />}>
				<p>
					A well-chosen emoji can make a quick reply warmer or help someone
					recognize a reaction at a glance. Use a few that fit the moment and
					let the rest of the message do the explaining.
				</p>
			</ResourceTextSection>

			<ResourceTextSection
				id="emoji-design-heading"
				eyebrow="Design"
				title="Make Emojis Easy to Understand"
				points={designPoints}
				pointSeparator="–">
				<p>
					Emoji meanings depend on context: a fire emoji might refer to a flame
					or express excitement, while a sad face can show sympathy as well as
					disappointment. Think about who will see it, keep the tone
					appropriate, and make important information clear in words.
				</p>
			</ResourceTextSection>

			<ResourceTextSection
				id="emoji-development-heading"
				eyebrow="Development"
				title="Add Emojis to Your App"
				points={developmentPoints}
				pointSeparator="–">
				<p>
					You can paste Unicode emojis straight into HTML or React content. The
					device&apos;s font supplies the artwork, so you don&apos;t need an
					image file for every character. The details panel also offers code
					values, HTML snippets, and downloads when your project calls for them.
				</p>
				<p>
					If you&apos;re building your own picker, the Radian UI controls linked
					below give you a starting point. Follow the{" "}
					<Link
						href="/docs/getting-started/installation"
						className={linkClassName}>
						Radian UI installation guide
					</Link>
					. For country selectors, our{" "}
					<Link href="/resources/flags" className={linkClassName}>
						country flag icons
					</Link>{" "}
					are another option when you need the same artwork across devices.
				</p>
			</ResourceTextSection>

			<ResourceFaq
				id="emoji-faq-heading"
				title="Frequently Asked Questions About Emojis"
				description="Need a little help? Here are answers to common questions about choosing and using emojis."
				items={faqItems}
			/>
			<ResourceLibraryCTA id="emoji-cta-heading" />
		</ResourceDocs>
	)
}

function EmojiCollectionCard() {
	return (
		<div className="border-soft bg-fill2 relative mx-auto h-100 w-full overflow-hidden rounded-2xl border lg:w-200">
			<Image
				src="/emoji/cover/cover.png"
				alt="Emoji feedback rating popover surrounded by chat messages and comment reactions"
				fill
				sizes="(min-width: 1024px) 800px, 100vw"
				className="object-cover dark:hidden"
				unoptimized
			/>
			<Image
				src="/emoji/cover/cover-dark.png"
				alt="Emoji feedback rating popover surrounded by chat messages and comment reactions in dark mode"
				fill
				sizes="(min-width: 1024px) 800px, 100vw"
				className="hidden object-cover dark:block"
				unoptimized
			/>
		</div>
	)
}
