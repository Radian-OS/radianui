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
			"A smiley face can make a short reply feel friendlier. Use a laughing emoji to share a joke or a heart emoji to show love, thanks, or support. Let the conversation guide your choice.",
	},
	{
		title: "Birthdays and celebrations",
		description:
			"Add a birthday emoji to a greeting, confetti to a milestone announcement, or a Christmas tree emoji to a holiday invitation. Keep the date, place, and other details in words.",
	},
	{
		title: "Posts, captions, and invitations",
		description:
			"A sushi emoji can set the scene for dinner plans, while a star can highlight a favorite moment in a caption. Choose a few that add something to the message, and leave enough room for the text.",
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
			"An iPhone emoji may look different on Android or Windows because each system supplies its own artwork. Preview the same character on the devices your audience uses, especially when a facial expression matters.",
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
		title: "Store emojis as text",
		description:
			"Save the selected Unicode character with the message, reaction, or label it belongs to. Use UTF-8 when storing or sending it, and preserve the full sequence: skin tone modifiers and joined characters are part of the emoji.",
	},
	{
		title: "Keep emoji data separate from the UI",
		description: (
			<>
				This collection uses <code>unicode-emoji-json</code> for emoji names,
				categories, version information, and skin tone support. Use those fields
				to power search and category filters in your own React emoji picker,
				while storing the selected character as its value.
			</>
		),
	},
	{
		title: "Connect the picker to an action",
		description: (
			<>
				Use a{" "}
				<Link href="/docs/components/popover" className={linkClassName}>
					popover
				</Link>{" "}
				for a compact reaction picker, with a labeled{" "}
				<Link href="/docs/components/input" className={linkClassName}>
					search input
				</Link>{" "}
				and emoji{" "}
				<Link href="/docs/components/button" className={linkClassName}>
					buttons
				</Link>
				. On selection, insert the character into a message or save it as a
				reaction. Give each button an accessible name and a visible focus state.
			</>
		),
	},
	{
		title: "Make copying reliable",
		description:
			"If your feature lets people copy and paste emojis, wait for the clipboard write to finish before showing success. Explain a failed copy and let them try again without losing their selection.",
	},
	{
		title: "Check rendering on your target devices",
		description:
			"Emoji fonts determine how the character looks, so preview messages and reactions on the phones and browsers your app supports. Keep names available for unsupported characters, and leave room for the glyph so it does not get clipped.",
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
		question: "Can I copy a heart or star emoji?",
		answer:
			"Yes. Search for heart or star, select the one you want, and choose Copy as Text. You can paste emoji symbols such as ❤️ or ⭐ into a message, caption, or project label. Their appearance depends on the app and device displaying them.",
	},
	{
		question: "How do I know what an emoji means?",
		answer:
			"The name helps identify the character, but emoji meanings depend on the conversation. A heart can express love or support, and a laughing face can signal amusement or a playful reply. Meanings also vary between people and cultures, so add words when you need to be precise.",
	},
	{
		question: "What is the difference between an emoji, emoticon, and kaomoji?",
		answer:
			"An emoji is a picture character, such as 😊. An emoticon builds a face from text, such as :-), while a kaomoji is usually read upright, like (^_^). This collection contains emojis rather than text faces.",
	},
	{
		question: "Why do emojis look different on iPhone and Android?",
		answer:
			"Apple, Google, Microsoft, and other providers draw their own versions. Copying keeps the character, but the receiving device or app chooses the artwork. Older software may also support fewer characters.",
	},
	{
		question: "Why does an emoji appear as a box or question mark?",
		answer:
			"The app or device may be missing the font support it needs, or the text may have been decoded incorrectly. Try updating your software, and check that the full character was copied. Some unsupported combinations appear as separate symbols instead.",
	},
	{
		question: "What are the emoji keyboard shortcuts?",
		answer:
			"Press Win + period on Windows or Control + Command + Space on Mac. On iPhone, tap the emoji or globe key. On Android, look for your keyboard’s emoji button; its position depends on the keyboard you use.",
	},
	{
		question: "Can I change the skin tone?",
		answer:
			"Yes, for characters that support it. Open the details and choose one of the skin tone options to copy that version. You’ll find these choices on eligible people and gestures.",
	},
	{
		question: "Is there a blue tick emoji for verification?",
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
				title="Find and Copy the Emoji You Need"
				visual={<EmojiCollectionCard />}>
				<p>
					This free emoji list helps you find a character for a message,
					caption, or app. Browse smiley faces and hearts for a reply, or find a
					star to mark a favorite. Search by name or category, select an emoji,
					and choose Copy as Text. Then paste it where you&apos;re writing.
				</p>
				<p>
					There are also hand gestures, animals, food, travel, and symbols. Open
					the details to see a character&apos;s name and code values, or choose
					a skin tone where supported. These are Unicode characters you can use
					alongside your text, with no account or image download needed.
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
					or express excitement, while a sad emoji can show sympathy as well as
					disappointment. A happy face in a casual chat may feel out of place in
					an error message. Match the expression to the situation, and keep
					important information clear in words.
				</p>
			</ResourceTextSection>

			<ResourceTextSection
				id="emoji-development-heading"
				eyebrow="Development"
				title="Use Emojis in Websites and React Apps"
				points={developmentPoints}
				pointSeparator="–">
				<p>
					Use Unicode emojis to add reactions to comments, expressions to chat
					messages, or recognizable labels to a workspace. Copy a character from
					this collection and use it as text in HTML or React. The details panel
					also provides Unicode code points, JavaScript escapes, and HTML
					entities when you need a code representation.
				</p>
				<p>
					For a React emoji picker, start with the interaction your app needs:
					inserting text at the cursor, adding a reaction, or choosing a project
					icon. Let users search by name and browse categories, then pass the
					selected emoji to that action. The Radian UI components below can help
					you build those controls around your own emoji data.
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
