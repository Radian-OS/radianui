import type React from "react"
import {
	AccordionThumbnail,
	// BadgeThumbnail,
	BreadcrumbThumbnail,
	ButtonThumbnail,
	CheckboxThumbnail,
	// DialogThumbnail,
	DropdownThumbnail,
	// FileUploadThumbnail,
	InputThumbnail,
	SliderThumbnail,
	SonnerThumbnail,
	TableThumbnail,
	TabsThumbnail,
	// TooltipThumbnail,
} from "@/components/home/component-thumbnails"
import CarouselThumbnail from "@/components/home/component-thumbnails/carousel-thumbnail"

export const HOMEPAGE_COMPONENTS_LIST: {
	title: string
	description: string
	url: string
	thumbnail: React.ComponentType<React.SVGProps<SVGSVGElement>>
	alt: string
}[] = [
	{
		title: "Accordion",
		description: "2 Components",
		url: "/docs/components/accordion",
		thumbnail: AccordionThumbnail,
		alt: "Accordion UI component illustration",
	},
	// {
	// 	title: "Badge",
	// 	description: "2 Components",
	// 	url: "/docs/components/badge",
	// 	thumbnail: BadgeThumbnail,
	// 	alt: "Badge UI component illustration",
	// },
	{
		title: "Breadcrumb",
		description: "2 Components",
		url: "/docs/components/breadcrumb",
		thumbnail: BreadcrumbThumbnail,
		alt: "Breadcrumb UI component illustration",
	},
	{
		title: "Button",
		description: "12 Components",
		url: "/docs/components/button",
		thumbnail: ButtonThumbnail,
		alt: "Button UI component illustration",
	},
	{
		title: "Carousel",
		description: "2 Components",
		url: "/docs/components/carousel",
		thumbnail: CarouselThumbnail,
		alt: "Carousel UI component illustration",
	},
	{
		title: "Check Box",
		description: "2 Components",
		url: "/docs/components/checkbox",
		thumbnail: CheckboxThumbnail,
		alt: "Check Box UI component illustration",
	},
	// {
	// 	title: "Dialog",
	// 	description: "2 Components",
	// 	url: "/docs/components/dialog",
	// 	thumbnail: DialogThumbnail,
	// 	alt: "Dialog UI component illustration",
	// },
	{
		title: "Dropdown",
		description: "7 Components",
		url: "/docs/components/dropdown",
		thumbnail: DropdownThumbnail,
		alt: "Dropdown UI component illustration",
	},
	// {
	// 	title: "File Upload",
	// 	description: "2 Components",
	// 	url: "/docs/components/file-upload",
	// 	thumbnail: FileUploadThumbnail,
	// 	alt: "File Upload UI component illustration",
	// },
	{
		title: "Input",
		description: "15 Components",
		url: "/docs/components/input",
		thumbnail: InputThumbnail,
		alt: "Input UI component illustration",
	},
	{
		title: "Slider",
		description: "2 Components",
		url: "/docs/components/slider",
		thumbnail: SliderThumbnail,
		alt: "Slider UI component illustration",
	},
	// {
	// 	title: "Sonner",
	// 	description: "8 Components",
	// 	url: "/docs/components/sonner",
	// 	thumbnail: SonnerThumbnail,
	// 	alt: "Toast UI component illustration",
	// },
	{
		title: "Switch",
		description: "8 Components",
		url: "/docs/components/switch",
		thumbnail: SonnerThumbnail,
		alt: "Switch UI component illustration",
	},
	{
		title: "Table",
		description: "2 Components",
		url: "/docs/components/table",
		thumbnail: TableThumbnail,
		alt: "Table UI component illustration",
	},
	{
		title: "Tabs",
		description: "3 Components",
		url: "/docs/components/tabs",
		thumbnail: TabsThumbnail,
		alt: "Tabs UI component illustration",
	},
	// {
	// 	title: "Tooltip",
	// 	description: "2 Components",
	// 	url: "/docs/components/tooltip",
	// 	thumbnail: TooltipThumbnail,
	// 	alt: "Tooltip UI component illustration",
	// },
]
