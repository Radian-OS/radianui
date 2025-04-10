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
	},
	{
		title: "Hero Section",
		description: "3 Sections",
		href: "#",
		svgUrl: "/landing-svg/coming-soon.svg",
		darkModeSvgUrl: "/landing-svg/coming-soon-dark.svg",
	},
	{
		title: "Trusted Companies",
		description: "8 Sections",
		href: "#",
		svgUrl: "/landing-svg/coming-soon.svg",
		darkModeSvgUrl: "/landing-svg/coming-soon-dark.svg",
	},
	{
		title: "Product Features",
		description: "12 Sections",
		href: "#",
		svgUrl: "/landing-svg/coming-soon.svg",
		darkModeSvgUrl: "/landing-svg/coming-soon-dark.svg",
	},
	{
		title: "User Testimonials",
		description: "8 Types",
		href: "#",
		svgUrl: "/landing-svg/coming-soon.svg",
		darkModeSvgUrl: "/landing-svg/coming-soon-dark.svg",
	},
	{
		title: "Frequently Asked Questions",
		description: "8 Sections",
		href: "#",
		svgUrl: "/landing-svg/coming-soon.svg",
		darkModeSvgUrl: "/landing-svg/coming-soon-dark.svg",
	},
	{
		title: "Pricing Section",
		description: "3 Sections",
		href: "#",
		svgUrl: "/landing-svg/coming-soon.svg",
		darkModeSvgUrl: "/landing-svg/coming-soon-dark.svg",
	},
	{
		title: "More under development",
		description: "Stay Tuned",
		href: "#",
		svgUrl: "/landing-svg/coming-soon.svg",
		darkModeSvgUrl: "/landing-svg/coming-soon-dark.svg",
	},
]

export default function WebsiteComponent() {
	return (
		<>
			<div className="mx-auto max-w-310">
				<div className="bg-stroke-decorative -ml-396 h-[0.5px] w-[calc(100%+999rem)]" />

				<div id="header" className="flex flex-col gap-1 px-4 py-6 md:p-6 lg:px-10 lg:py-7.5">
					<h6 className="heading-6 text-fg0">Website Components</h6>
					<p className="body-15 text-fg1 font-normal">Fundamentals & building blocks of Websites</p>
				</div>

				<div className="bg-stroke-decorative -ml-396 h-[0.5px] w-[calc(100%+999rem)]" />
			</div>
			<div className="mx-auto max-w-310">
				<div
					id="body"
					className="grid grid-cols-1 gap-4 px-4 pt-6 pb-8 sm:grid-cols-2 md:grid-cols-3 md:gap-6 md:px-6 lg:grid-cols-4 lg:p-10 lg:pb-15">
					{componentsList.map((item, idx) => (
						<ComponentCard
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
