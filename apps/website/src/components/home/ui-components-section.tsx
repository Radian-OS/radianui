import React from "react"
import ComponentCard from "@/components/home/component-card"

type ComponentListItem = React.ComponentPropsWithoutRef<typeof ComponentCard>
const componentsList: ComponentListItem[] = [
	{
		title: "Accordion",
		description: "13 Components",
		href: "/documentation/components/accordion",
		svgUrl: "/landing-svg/accordion.svg",
		darkModeSvgUrl: "landing-svg/accordion-dark.svg",
		alt: "Accordion",
	},
	{
		title: "Alert",
		description: "12 Components",
		href: "/documentation/components/alert",
		svgUrl: "/landing-svg/alert.svg",
		darkModeSvgUrl: "/landing-svg/alert-dark.svg",
		alt: "Alert",
	},
	{
		title: "Avatar",
		description: "28 Components",
		href: "/documentation/components/avatars",
		svgUrl: "/landing-svg/avatar.svg",
		darkModeSvgUrl: "/landing-svg/avatar-dark.svg",
		alt: "Avatar",
	},
	{
		title: "Avatar Group",
		description: "28 Components",
		href: "/documentation/components/avatars",
		svgUrl: "/landing-svg/avatar-group.svg",
		darkModeSvgUrl: "/landing-svg/avatar-group-dark.svg",
		alt: "Avatar Group",
	},
	{
		title: "Badge",
		description: "7 Components",
		href: "/documentation/components/badge",
		svgUrl: "/landing-svg/badge.svg",
		darkModeSvgUrl: "/landing-svg/badge-dark.svg",
		alt: "Badge",
	},
	{
		title: "Banner",
		description: "12 Components",
		href: "/documentation/components/banner",
		svgUrl: "/landing-svg/banner.svg",
		darkModeSvgUrl: "/landing-svg/banner-dark.svg",
		alt: "Banner",
	},
	{
		title: "Breadcrumb",
		description: "12 Components",
		href: "/documentation/components/breadcrumb",
		svgUrl: "/landing-svg/breadcrumb.svg",
		darkModeSvgUrl: "/landing-svg/breadcrumb-dark.svg",
		alt: "Breadcrumb",
	},
	{
		title: "Button",
		description: "60 Components",
		href: "/documentation/components/buttons",
		svgUrl: "/landing-svg/button.svg",
		darkModeSvgUrl: "/landing-svg/button-dark.svg",
		alt: "Button",
	},
	{
		title: "Button Groups",
		description: "60 Components",
		href: "/documentation/components/button-group",
		svgUrl: "/landing-svg/button-group.svg",
		darkModeSvgUrl: "/landing-svg/button-group-dark.svg",
		alt: "Button Groups",
	},
	{
		title: "Calendar",
		description: "4 Components",
		href: "/documentation/components/calendar",
		svgUrl: "/landing-svg/calendar.svg",
		darkModeSvgUrl: "/landing-svg/calendar-dark.svg",
		alt: "Calendar",
	},
	{
		title: "Checkbox",
		description: "6 Components",
		href: "/documentation/components/checkbox",
		svgUrl: "/landing-svg/checkbox.svg",
		darkModeSvgUrl: "/landing-svg/checkbox-dark.svg",
		alt: "Checkbox",
	},
	{
		title: "Code Area",
		description: "49 Components",
		href: "/documentation/components/code-area",
		svgUrl: "/landing-svg/code-area.svg",
		darkModeSvgUrl: "/landing-svg/code-area-dark.svg",
		alt: "Code Area",
	},
	{
		title: "Command / Global Search",
		description: "2 Components",
		href: "/documentation/components/command",
		svgUrl: "/landing-svg/command.svg",
		darkModeSvgUrl: "/landing-svg/command-dark.svg",
		alt: "Command / Global Search",
	},
	{
		title: "Divider",
		description: "17 Components",
		href: "/documentation/components/divider",
		svgUrl: "/landing-svg/divider.svg",
		darkModeSvgUrl: "/landing-svg/divider-dark.svg",
		alt: "Divider",
	},
	{
		title: "Dropdown",
		description: "8 Components",
		href: "/documentation/components/dropdown",
		svgUrl: "/landing-svg/dropdown.svg",
		darkModeSvgUrl: "/landing-svg/dropdown-dark.svg",
		alt: "Dropdown",
	},
	{
		title: "File Upload",
		description: "17 Components",
		href: "/documentation/components/file-upload",
		svgUrl: "/landing-svg/file-upload.svg",
		darkModeSvgUrl: "/landing-svg/file-upload-dark.svg",
		alt: "File Upload",
	},
	{
		title: "Hover Cards",
		description: "21 Components",
		href: "/documentation/components/hover-cards",
		svgUrl: "/landing-svg/hover-cards.svg",
		darkModeSvgUrl: "/landing-svg/hover-cards-dark.svg",
		alt: "Hover Cards",
	},
	{
		title: "Inputs",
		description: "49 Components",
		href: "/documentation/components/inputs",
		svgUrl: "/landing-svg/inputs.svg",
		darkModeSvgUrl: "/landing-svg/inputs-dark.svg",
		alt: "Inputs",
	},
	{
		title: "Modal",
		description: "13 Components",
		href: "/documentation/components/modals",
		svgUrl: "/landing-svg/modal.svg",
		darkModeSvgUrl: "/landing-svg/modal-dark.svg",
		alt: "Modal",
	},
	{
		title: "Pagination",
		description: "31 Components",
		href: "/documentation/components/pagination",
		svgUrl: "/landing-svg/pagination.svg",
		darkModeSvgUrl: "/landing-svg/pagination-dark.svg",
		alt: "Pagination",
	},
	{
		title: "Popover",
		description: "31 Components",
		href: "/documentation/components/popover",
		svgUrl: "/landing-svg/popover.svg",
		darkModeSvgUrl: "/landing-svg/popover-dark.svg",
		alt: "Popover",
	},
	{
		title: "Progress Bar",
		description: "2 Components",
		href: "/documentation/components/progress-bar",
		svgUrl: "/landing-svg/progress-bar.svg",
		darkModeSvgUrl: "/landing-svg/progress-bar-dark.svg",
		alt: "Progress Bar",
	},
	{
		title: "Radio Buttons",
		description: "6 Components",
		href: "/documentation/components/radio-buttons",
		svgUrl: "/landing-svg/radio-buttons.svg",
		darkModeSvgUrl: "/landing-svg/radio-buttons-dark.svg",
		alt: "Radio Buttons",
	},
	{
		title: "Skeleton",
		description: "31 Components",
		href: "/documentation/components/skeleton",
		svgUrl: "/landing-svg/skeleton.svg",
		darkModeSvgUrl: "/landing-svg/skeleton-dark.svg",
		alt: "Skeleton",
	},
	{
		title: "Slider",
		description: "17 Components",
		href: "/documentation/components/slider",
		svgUrl: "/landing-svg/slider.svg",
		darkModeSvgUrl: "/landing-svg/slider-dark.svg",
		alt: "Slider",
	},
	{
		title: "Sooner / Toast",
		description: "49 Components",
		href: "/documentation/components/sonner",
		svgUrl: "/landing-svg/sonner.svg",
		darkModeSvgUrl: "/landing-svg/sonner-dark.svg",
		alt: "Sooner / Toast",
	},
	{
		title: "Switch",
		description: "6 Components",
		href: "/documentation/components/switch",
		svgUrl: "/landing-svg/switch.svg",
		darkModeSvgUrl: "/landing-svg/switch-dark.svg",
		alt: "Switch",
	},
	{
		title: "Table",
		description: "17 Components",
		href: "/documentation/components/table",
		svgUrl: "/landing-svg/table.svg",
		darkModeSvgUrl: "/landing-svg/table-dark.svg",
		alt: "Table",
	},
	{
		title: "Tabs",
		description: "12 Components",
		href: "/documentation/components/tabs",
		svgUrl: "/landing-svg/tabs.svg",
		darkModeSvgUrl: "/landing-svg/tabs-dark.svg",
		alt: "Tabs",
	},
	{
		title: "Tooltip",
		description: "31 Components",
		href: "/documentation/components/tooltip",
		svgUrl: "/landing-svg/tooltip.svg",
		darkModeSvgUrl: "/landing-svg/tooltip-dark.svg",
		alt: "Tooltip",
	},
]

export default function UiComponentsSection() {
	return (
		<React.Fragment>
			<div className="max-w-310 mx-auto">
				<div id="header" className="lg:py-7.5 flex flex-col gap-1 px-4 py-6 md:p-6 lg:px-10">
					<h6 className="heading-6 text-text">UI Components</h6>
					<p className="body-15 text-text-secondary font-normal">Building blocks of an application or website</p>
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

			<div className="bg-border -ml-396 h-[0.5px] w-[calc(100%+999rem)]" />
		</React.Fragment>
	)
}
