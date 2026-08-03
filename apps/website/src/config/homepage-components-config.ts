import type React from "react"
import {
	ButtonThumbnail,
	CheckboxThumbnail,
	DialogThumbnail,
	DropdownThumbnail,
	InputThumbnail,
	SonnerThumbnail,
	TableThumbnail,
	TabsThumbnail,
} from "@/components/home/component-thumbnails"

export const HOMEPAGE_COMPONENTS_LIST: {
	title: string
	description: string
	url: string
	thumbnail: React.ComponentType<React.SVGProps<SVGSVGElement>>
	alt: string
}[] = [
	{
		title: "Button",
		description: "12 Components",
		url: "/docs/components/button",
		thumbnail: ButtonThumbnail,
		alt: "Button UI component illustration",
	},
	{
		title: "Input",
		description: "15 Components",
		url: "/docs/components/input",
		thumbnail: InputThumbnail,
		alt: "Input UI component illustration",
	},
	{
		title: "Check Box",
		description: "2 Components",
		url: "/docs/components/checkbox",
		thumbnail: CheckboxThumbnail,
		alt: "Check Box UI component illustration",
	},

	{
		title: "Dialog",
		description: "2 Components",
		url: "/docs/components/dialog",
		thumbnail: DialogThumbnail,
		alt: "Dialog UI component illustration",
	},
	{
		title: "Dropdown",
		description: "7 Components",
		url: "/docs/components/dropdown",
		thumbnail: DropdownThumbnail,
		alt: "Dropdown UI component illustration",
	},
	{
		title: "Sonner",
		description: "8 Components",
		url: "/docs/components/sonner",
		thumbnail: SonnerThumbnail,
		alt: "Toast UI component illustration",
	},
	{
		title: "Tabs",
		description: "3 Components",
		url: "/docs/components/tabs",
		thumbnail: TabsThumbnail,
		alt: "Tabs UI component illustration",
	},
	{
		title: "Table",
		description: "2 Components",
		url: "/docs/components/table",
		thumbnail: TableThumbnail,
		alt: "Table UI component illustration",
	},
]
