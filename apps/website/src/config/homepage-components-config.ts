import type React from "react"
import {
	AccordionThumbnail,
	BadgeThumbnail,
	BreadcrumbThumbnail,
	ButtonThumbnail,
	CarouselThumbnail,
	CheckboxThumbnail,
	DropdownThumbnail,
	FileUploadThumbnail,
	InputThumbnail,
	SliderThumbnail,
	SonnerThumbnail,
	SwitchThumbnail,
	TableThumbnail,
	TabsThumbnail,
	TooltipThumbnail,
} from "@/components/home/component-thumbnails"

export const HOMEPAGE_COMPONENTS_LIST: {
	title: string
	description: string
	url: string
	thumbnail: React.ComponentType<React.SVGProps<SVGSVGElement>>
	alt: string
}[] = [
	{
		title: "Check Box",
		description: "4 Components, 126 Variants",
		url: "/docs/components/checkbox",
		thumbnail: CheckboxThumbnail,
		alt: "Check Box UI component illustration",
	},
	{
		title: "Input",
		description: "17 Components, 134 Variants",
		url: "/docs/components/input",
		thumbnail: InputThumbnail,
		alt: "Input UI component illustration",
	},
	{
		title: "Button",
		description: "7 Components, 1350 Variants",
		url: "/docs/components/button",
		thumbnail: ButtonThumbnail,
		alt: "Button UI component illustration",
	},
	{
		title: "Dropdown",
		description: "2 Components, 67 Variants",
		url: "/docs/components/dropdown",
		thumbnail: DropdownThumbnail,
		alt: "Dropdown UI component illustration",
	},
	{
		title: "Tabs",
		description: "4 Components, 48 Variants",
		url: "/docs/components/tabs",
		thumbnail: TabsThumbnail,
		alt: "Tabs UI component illustration",
	},

	{
		title: "Badge",
		description: "3 Components, 303 Variants",
		url: "/docs/components/badge",
		thumbnail: BadgeThumbnail,
		alt: "Badge UI component illustration",
	},
	{
		title: "Switch",
		description: "3 Components, 100 Variants",
		url: "/docs/components/switch",
		thumbnail: SwitchThumbnail,
		alt: "Switch UI component illustration",
	},
	{
		title: "Breadcrumb",
		description: "2 Components, 26 Variants",
		url: "/docs/components/breadcrumb",
		thumbnail: BreadcrumbThumbnail,
		alt: "Breadcrumb UI component illustration",
	},
	{
		title: "Table",
		description: "3 Components, 93 Variants",
		url: "/docs/components/table",
		thumbnail: TableThumbnail,
		alt: "Table UI component illustration",
	},
	{
		title: "Sonner",
		description: "1 Components, 36 Variants",
		url: "/docs/components/sonner",
		thumbnail: SonnerThumbnail,
		alt: "Toast UI component illustration",
	},

	{
		title: "Accordion",
		description: "3 Components, 21 Variants",
		url: "/docs/components/accordion",
		thumbnail: AccordionThumbnail,
		alt: "Accordion UI component illustration",
	},

	{
		title: "File Upload",
		description: "4 Components, 22 Variants",
		url: "/docs/components/file-upload",
		thumbnail: FileUploadThumbnail,
		alt: "File Upload UI component illustration",
	},

	{
		title: "Slider",
		description: "6 Components, 56 Variants",
		url: "/docs/components/slider",
		thumbnail: SliderThumbnail,
		alt: "Slider UI component illustration",
	},

	{
		title: "Tooltip",
		description: "1 Components, 36 Variants",
		url: "/docs/components/tooltip",
		thumbnail: TooltipThumbnail,
		alt: "Tooltip UI component illustration",
	},
	{
		title: "Carousel",
		description: "1 Components, 8 Variants",
		url: "/docs/components/carousel",
		thumbnail: CarouselThumbnail,
		alt: "Carousel UI component illustration",
	},
]
