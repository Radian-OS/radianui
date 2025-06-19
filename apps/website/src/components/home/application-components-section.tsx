import React from "react"
import ComponentCard from "@/components/home/component-card"

type ComponentListItem = React.ComponentPropsWithoutRef<typeof ComponentCard>
const componentsList: ComponentListItem[] = [
	{
		title: "User Authentication",
		description: "12 Sections",
		href: "#",
		svgUrl: "/landing-svg/coming-soon.svg",
		darkModeSvgUrl: "/landing-svg/coming-soon-dark.svg",
		alt: "Illustration representing user authentication component",
	},
	{
		title: "Left Navigation Bar",
		description: "3 Sections",
		href: "#",
		svgUrl: "/landing-svg/coming-soon.svg",
		darkModeSvgUrl: "/landing-svg/coming-soon-dark.svg",
		alt: "Left navigation bar UI element",
	},
	{
		title: "Top Navigation Bar",
		description: "8 Sections",
		href: "#",
		svgUrl: "/landing-svg/coming-soon.svg",
		darkModeSvgUrl: "/landing-svg/coming-soon-dark.svg",
		alt: "Top navigation bar UI element",
	},
	{
		title: "Application Settings",
		description: "12 Sections",
		href: "#",
		svgUrl: "/landing-svg/coming-soon.svg",
		darkModeSvgUrl: "/landing-svg/coming-soon-dark.svg",
		alt: "Settings icon representing application configuration",
	},
	{
		title: "Onboarding",
		description: "8 Types",
		href: "#",
		svgUrl: "/landing-svg/coming-soon.svg",
		darkModeSvgUrl: "/landing-svg/coming-soon-dark.svg",
		alt: "Illustration of onboarding process for new users",
	},
	{
		title: "Profile",
		description: "8 Sections",
		href: "#",
		svgUrl: "/landing-svg/coming-soon.svg",
		darkModeSvgUrl: "/landing-svg/coming-soon-dark.svg",
		alt: "User profile icon",
	},
	{
		title: "Settings",
		description: "3 Sections",
		href: "#",
		svgUrl: "/landing-svg/coming-soon.svg",
		darkModeSvgUrl: "/landing-svg/coming-soon-dark.svg",
		alt: "Cogwheel icon representing settings section",
	},
	{
		title: "More under development",
		description: "Stay Tuned",
		href: "#",
		svgUrl: "/landing-svg/coming-soon.svg",
		darkModeSvgUrl: "/landing-svg/coming-soon-dark.svg",
		alt: "Placeholder illustration for upcoming components",
	},
]

const ApplicationComponent = () => {
	return (
		<React.Fragment>
			<div className="max-w-310 mx-auto">
				<div id="header" className="lg:py-7.5 flex flex-col gap-1 px-4 py-6 md:p-6 lg:px-10">
					<h2 className="heading-6 text-text">Application Components</h2>
					<p className="body-15 text-text-secondary font-normal">Fundamentals & building blocks of Websites</p>
				</div>

				<div className="bg-border -ml-[99rem] h-[1px] w-[calc(100%+999rem)]"></div>
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
		</React.Fragment>
	)
}
export default ApplicationComponent
