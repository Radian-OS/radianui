import React from "react"
import ComponentCard from "@/components/home/component-card"

type ComponentListItem = React.ComponentPropsWithoutRef<typeof ComponentCard>
const componentsList: ComponentListItem[] = [
	{
		title: "Navigation Bar",
		description: "12 Sections",
		href: "#",
		svgUrl: "/landing-svg/coming-soon.svg",
		darkModeSvgUrl: "/landing-svg/coming-soon-dark.svg",
		alt: "Illustration of a website navigation bar component",
	},
	{
		title: "Hero Section",
		description: "3 Sections",
		href: "#",
		svgUrl: "/landing-svg/coming-soon.svg",
		darkModeSvgUrl: "/landing-svg/coming-soon-dark.svg",
		alt: "Graphic representing a website hero section",
	},
	{
		title: "Trusted Companies",
		description: "8 Sections",
		href: "#",
		svgUrl: "/landing-svg/coming-soon.svg",
		darkModeSvgUrl: "/landing-svg/coming-soon-dark.svg",
		alt: "Logos of trusted companies for website section",
	},
	{
		title: "Product Features",
		description: "12 Sections",
		href: "#",
		svgUrl: "/landing-svg/coming-soon.svg",
		darkModeSvgUrl: "/landing-svg/coming-soon-dark.svg",
		alt: "Icons and text describing product features",
	},
	{
		title: "User Testimonials",
		description: "8 Types",
		href: "#",
		svgUrl: "/landing-svg/coming-soon.svg",
		darkModeSvgUrl: "/landing-svg/coming-soon-dark.svg",
		alt: "Speech bubbles representing user testimonials",
	},
	{
		title: "Frequently Asked Questions",
		description: "8 Sections",
		href: "#",
		svgUrl: "/landing-svg/coming-soon.svg",
		darkModeSvgUrl: "/landing-svg/coming-soon-dark.svg",
		alt: "Question mark icon for FAQ section",
	},
	{
		title: "Pricing Section",
		description: "3 Sections",
		href: "#",
		svgUrl: "/landing-svg/coming-soon.svg",
		darkModeSvgUrl: "/landing-svg/coming-soon-dark.svg",
		alt: "Pricing table illustration for website",
	},
	{
		title: "More under development",
		description: "Stay Tuned",
		href: "#",
		svgUrl: "/landing-svg/coming-soon.svg",
		darkModeSvgUrl: "/landing-svg/coming-soon-dark.svg",
		alt: "Placeholder graphic for upcoming website components",
	},
]

export default function WebsiteComponent() {
	return (
		<>
			<div className="max-w-310 mx-auto">
				<div className="bg-border -ml-396 h-[0.5px] w-[calc(100%+999rem)]" />

				<div id="header" className="lg:py-7.5 flex flex-col gap-1 px-4 py-6 md:p-6 lg:px-10">
					<h2 className="heading-6 text-text">Website Components</h2>
					<p className="body-15 text-text-secondary font-normal">Fundamentals & building blocks of Websites</p>
				</div>

				<div className="bg-border -ml-396 h-[0.5px] w-[calc(100%+999rem)]" />
			</div>
			<div className="max-w-310 mx-auto">
				<div id="body" className="lg:pb-15 grid grid-cols-1 gap-4 px-4 pb-8 pt-6 sm:grid-cols-2 md:grid-cols-3 md:gap-6 md:px-6 lg:grid-cols-4 lg:p-10">
					{componentsList.map((item, idx) => (
						<ComponentCard
							alt={item.alt}
							key={item.title + idx}
							href={item.href}
							title={item.title}
							description={item.description}
							svgUrl={item.svgUrl}
							darkModeSvgUrl={item.darkModeSvgUrl}
						/>
					))}
				</div>
			</div>
		</>
	)
}
