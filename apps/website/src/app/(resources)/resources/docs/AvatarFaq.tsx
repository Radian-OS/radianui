import React from "react"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/ui/accordion"

const contents = [
	{
		id: 1,
		trigger: "Are these avatars free to use commercially ?",
		content:
			"Yes. Every avatar in this pack is free for personal and commercial projects. No attribution required, no licensing fees, no usage cap. Use them in a client project, a paid product, or an open-source repo, same terms apply.",
	},
	{
		id: 2,
		trigger: "What file formats are available ?",
		content:
			"Five ways to use each avatar: copy the HTML <img> tag, copy a ready-to-use Next.js <Image> tag (with width and height already set), download as SVG for full color and scale control, download as PNG, or grab the matching Figma frame for design work so that your mockups and your shipped product use the exact same asset.",
	},
	{
		id: 3,
		trigger: "How do I add one of these avatars to my React project ?",
		content:
			"Click Copy on any avatar to grab either a plain HTML <img> tag or a pre-formatted Next.js <Image> tag, the Next.js version already has width and height set, so you skip the usual 'Image requires width and height' error. Drop either straight into your JSX, or swap the URL into your existing Avatar component's src prop if you already have one.",
	},
	{
		id: 4,
		trigger: "Why are SVG avatars popular ?",
		content:
			"SVGs are vector, so they stay sharp at any size. The same file works as a 24px icon in a table and a 96px image on a profile page without pixelating. They're also lightweight for illustrated or icon-style avatars, and you can recolor or restyle them with CSS instead of exporting new files for each variant.",
	},
	{
		id: 5,
		trigger:
			"What is the standard fallback logic if a user profile image fails to load ?",
		content:
			"Try the actual photo first. If the image URL is broken or missing, fall back to the user's initials on a colored background. If there's no name to generate initials from either, fall back again to a generic icon. Chaining these three levels means there's always something reasonable on screen, never a broken image.",
	},
	{
		id: 6,
		trigger: "What avatar size should I use ?",
		content:
			"It depends on where it's placed, but a scale that covers most products: 24–32px for tables and compact lists, 40px for nav bars and comment threads, 64–96px for profile headers, and 128px or larger for a full profile page. Pick 3–4 fixed sizes and reuse them everywhere instead of sizing per screen.",
	},
	{
		id: 7,
		trigger: "Where should status badges be positioned on an avatar ?",
		content:
			"Bottom-right is the standard convention. It's where people expect an online/offline or verified indicator, and it doesn't cover the face. Keep the badge to roughly a quarter of the avatar's total size, with a thin border so it stays visible against both light and dark backgrounds.",
	},
	{
		id: 8,
		trigger: "How do I make avatars accessible ?",
		content:
			"Give every avatar real alt text, the person's actual name, not generic text like 'avatar' or 'user photo.' If the name is already visible in text right next to the avatar, use alt=' ' so screen readers don't announce it twice. If the avatar is clickable, make it an actual button or link element, not a styled div with an onClick.",
	},
	{
		id: 9,
		trigger: "Should images within an avatar component use lazy-loading ?",
		content:
			"Yes, for anything below the fold. Long member lists, comment threads, or large avatar groups. Skip lazy-loading for avatars visible immediately on page load, like the current user in a nav bar, so they don't pop in late and shift the layout.",
	},
]

const AvatarFaq = () => {
	return (
		<section
			aria-labelledby="avatar-faq-heading"
			className="lg:w-200 mx-auto flex w-full flex-col gap-6">
			<div className="flex flex-col gap-8 md:gap-16">
				<div className="flex flex-col items-center gap-4">
					<p className="text-primary-text text-center text-sm font-medium">
						FAQ
					</p>
					<h2 id="avatar-faq-heading" className="heading-4 text-center">
						Frequently Asked Questions
					</h2>
					<p className="text-fg-secondary text-center text-base font-normal md:w-[590px]">
						Have a question or need clarification? Our team is here to help and
						we&apos;re ready to provide all the answers you need.
					</p>
				</div>
				<div className="flex gap-1">
					<Accordion
						type="single"
						indicator={"plus-minus"}
						className="w-full"
						collapsible>
						{contents.map((item) => (
							<AccordionItem value={item.id.toString()} key={item.id}>
								<AccordionTrigger className="data-[state=closed]:bg-fill1 data-[state=open]:bg-bg">
									{item.trigger}
								</AccordionTrigger>
								<AccordionContent className="group-data-[state=closed]:bg-fill1 group-data-[state=open]:bg-bg">
									{item.content}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</section>
	)
}

export default AvatarFaq
