import React from "react"
import ComponentCard from "@/components/home/component-card"

type ComponentListItem = React.ComponentPropsWithoutRef<typeof ComponentCard>

const componentsList: ComponentListItem[] = [
	{
		title: "Color styles",
		description: "156 colors, 70 color tokens",
		svgUrl: "/landing-svg/color-styles.svg",
		darkModeSvgUrl: "/landing-svg/color-styles-dark.svg",
		href: "documentation/colors",
	},
	{
		title: "Typography",
		description: "17 Styles",
		href: "documentation/typography",
		svgUrl: "/landing-svg/typography.svg",
		darkModeSvgUrl: "/landing-svg/typography-dark.svg",
	},
	{
		title: "Icons",
		description: "1,200 Components",
		href: "documentation/iconography",
		svgUrl: "/landing-svg/icons.svg",
		darkModeSvgUrl: "/landing-svg/icons-dark.svg",
	},
	{
		title: "Corner Radius",
		description: "7 styles",
		svgUrl: "/landing-svg/corner-radius.svg",
		darkModeSvgUrl: "/landing-svg/corner-radius-dark.svg",
		href: "#",
	},
	{
		title: "Grids",
		description: "8 Types",
		svgUrl: "/landing-svg/grids.svg",
		darkModeSvgUrl: "/landing-svg/grids-dark.svg",
		href: "#",
	},
	{
		title: "Elevation Levels",
		description: "16 styles",
		svgUrl: "/landing-svg/elevation-levels.svg",
		darkModeSvgUrl: "/landing-svg/elevation-levels-dark.svg",
		href: "#",
	},
	{
		title: "Spacing",
		description: "62 Values",
		svgUrl: "/landing-svg/spacing.svg",
		darkModeSvgUrl: "/landing-svg/spacing-dark.svg",
		href: "#",
	},
	{
		title: "Color / Theme",
		description: "8 Types",
		svgUrl: "/landing-svg/color-theme.svg",
		darkModeSvgUrl: "/landing-svg/color-theme-dark.svg",
		href: "#",
	},
	{
		title: "Logo",
		description: "--",
		svgUrl: "/landing-svg/coming-soon.svg",
		darkModeSvgUrl: "/landing-svg/coming-soon-dark.svg",
		href: "#",
	},
]

export default function FundamentalSection() {
	return (
		<React.Fragment>
			<div className="mx-auto max-w-310">
				<div id="header" className="flex flex-col gap-1 px-4 py-6 md:p-6 lg:px-10 lg:py-7.5">
					<h6 className="heading-6 text-fg0">Fundamentals</h6>
					<p className="body-15 text-fg1 font-normal">Universal settings for building a strong foundation for a digital product</p>
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

			<div className="bg-stroke-decorative -ml-396 h-[0.5px] w-[calc(100%+999rem)]" />
		</React.Fragment>
	)
}
