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
		content: "You can download the avatars in JPG, PNG, SVG, and WebP formats.",
	},
	{
		id: 3,
		trigger: "How do I add one of these avatars to my React project ?",
		content:
			"Click Copy on any avatar to grab either a plain HTML <img> tag or a pre-formatted Next.js <Image> tag, the Next.js version already has width and height set, so you skip the usual 'Image requires width and height' error. Drop either straight into your JSX, or swap the URL into your existing Avatar component's src prop if you already have one.",
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
	{
		id: 10,
		trigger: "What makes a good avatar picture for linkedin?",
		content:
			"A good LinkedIn avatar is a high-quality, well-lit headshot or portrait with a clean background that presents you in a highly professional and approachable light.",
	},
	{
		id: 11,
		trigger: "Is this an avatar maker?",
		content: "No, but all images are high quality headshots.",
	},
	{
		id: 13,
		trigger: "Should I use a photo or an illustration for my profile picture?",
		content:
			"It depends on the context. For professional networks, a clear, high-quality photo of your face is best. For gaming, casual social media, or creative forums, an illustration or stylized avatar is completely fine.",
	},
]

const AvatarFaq = () => {
	return (
		<section
			aria-labelledby="avatar-faq-heading"
			className="mx-auto flex w-full flex-col gap-6 lg:w-200">
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
