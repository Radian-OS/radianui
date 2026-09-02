import { ResourceFaq } from "../../components/ResourceDocs"

const items = [
	{
		question: "Are these avatars free to use commercially?",
		answer:
			"Yes. Every avatar in this pack is free for personal and commercial projects. No attribution, licensing fees, or usage cap is required.",
	},
	{
		question: "What file formats are available?",
		answer:
			"You can copy an HTML image tag or a ready-to-use Next.js Image tag, download SVG or PNG, or use the matching Figma frame.",
	},
	{
		question: "How do I add an avatar to a React project?",
		answer:
			"Copy the plain HTML or Next.js markup from any avatar. You can place it directly in JSX or use its URL as the src value in an existing Avatar component.",
	},
	{
		question: "Why are SVG avatars popular?",
		answer:
			"SVG files stay sharp at every size, are lightweight for illustrations, and can be restyled without exporting another raster image.",
	},
	{
		question: "What fallback should I use when an image fails?",
		answer:
			"Try the profile image first, then show the user's initials, and finally fall back to a generic icon when no name is available.",
	},
	{
		question: "What avatar size should I use?",
		answer:
			"Use 24–32px for compact lists, 40px for navigation and comments, 64–96px for profile headers, and larger sizes for full profile views.",
	},
	{
		question: "Where should status badges be positioned?",
		answer:
			"Bottom-right is the standard position. Keep the badge subtle and add a thin boundary so it remains visible against the avatar and surrounding surface.",
	},
	{
		question: "How do I make avatars accessible?",
		answer:
			"Use meaningful alt text when the avatar conveys identity. When the same name is already visible beside it, use empty alt text to avoid duplicate announcements.",
	},
	{
		question: "Should avatar images use lazy loading?",
		answer:
			"Lazy-load avatars below the fold in long lists and activity feeds. Load immediately visible avatars normally so they do not appear late or shift the layout.",
	},
]

export default function AvatarFaq() {
	return <ResourceFaq id="avatar-faq-heading" items={items} />
}
