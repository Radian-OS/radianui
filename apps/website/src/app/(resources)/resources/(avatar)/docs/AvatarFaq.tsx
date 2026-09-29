import {
	ResourceFaq,
	type ResourceFaqItem,
} from "../../components/ResourceDocs"

const avatarFaqItems: ResourceFaqItem[] = [
	{
		question: "Are these avatars free to use commercially ?",
		answer:
			"Yes. Every avatar in this pack is free for personal and commercial projects. No attribution required, no licensing fees, no usage cap. Use them in a client project, a paid product, or an open-source repo, same terms apply. But the avatars cannot be sold and distributed under another name.",
	},
	{
		question: "What file formats are available ?",
		answer: "You can download the avatars in JPG, PNG, SVG, and WebP formats.",
	},
	{
		question: "How do I add one of these avatars to my React project ?",
		answer:
			"Click Copy on any avatar to grab either a plain HTML <img> tag or a pre-formatted Next.js <Image> tag, the Next.js version already has width and height set, so you skip the usual 'Image requires width and height' error. Drop either straight into your JSX, or swap the URL into your existing Avatar component's src prop if you already have one.",
	},
	{
		question:
			"What is the standard fallback logic if a user profile image fails to load ?",
		answer:
			"Try the actual photo first. If the image URL is broken or missing, fall back to the user's initials on a colored background. If there's no name to generate initials from either, fall back again to a generic icon. Chaining these three levels means there's always something reasonable on screen, never a broken image.",
	},
	{
		question: "What avatar size should I use ?",
		answer:
			"It depends on where it's placed, but a scale that covers most products: 24–32px for tables and compact lists, 40px for nav bars and comment threads, 64–96px for profile headers, and 128px or larger for a full profile page. Pick 3–4 fixed sizes and reuse them everywhere instead of sizing per screen.",
	},
	{
		question: "Where should status badges be positioned on an avatar ?",
		answer:
			"Bottom-right is the standard convention. It's where people expect an online/offline or verified indicator, and it doesn't cover the face. Keep the badge to roughly a quarter of the avatar's total size, with a thin border so it stays visible against both light and dark backgrounds.",
	},
	{
		question: "How do I make avatars accessible ?",
		answer:
			"Give every avatar real alt text, the person's actual name, not generic text like 'avatar' or 'user photo.' If the name is already visible in text right next to the avatar, use alt=' ' so screen readers don't announce it twice. If the avatar is clickable, make it an actual button or link element, not a styled div with an onClick.",
	},
	{
		question: "Should images within an avatar component use lazy-loading ?",
		answer:
			"Yes, for anything below the fold. Long member lists, comment threads, or large avatar groups. Skip lazy-loading for avatars visible immediately on page load, like the current user in a nav bar, so they don't pop in late and shift the layout.",
	},
	{
		question: "What makes a good avatar picture for linkedin?",
		answer:
			"A good LinkedIn avatar is a high-quality, well-lit headshot or portrait with a clean background that presents you in a highly professional and approachable light.",
	},
	{
		question: "Is this an avatar maker?",
		answer:
			"No, this is not an avatar maker. Instead, it's a curated library of AI-generated headshots that are handpicked and better quality, good for any avatar usage from UI design mockups and web apps to presentations and profile pictures.",
	},
	{
		question: "Should I use a photo or an illustration for my profile picture?",
		answer:
			"It depends on the context. For professional networks, a clear, high-quality photo of your face is best. For gaming, casual social media, or creative forums, an illustration or stylized avatar is completely fine.",
	},
]

export default function AvatarFaq() {
	return (
		<ResourceFaq
			id="avatar-faq-heading"
			items={avatarFaqItems}
			description="Have a question or need clarification? Our team is here to help and we’re ready to provide all the answers you need."
		/>
	)
}
