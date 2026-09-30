import Image from "next/image"
import { InfiniteScroll } from "@/registry/animated/infinite-scroll"
import { Card } from "@/registry/ui/card"

const useCasePreviews = [
	{
		light: "/flags/scroll-section/1.png",
		dark: "/flags/scroll-section/1dark.png",
		alt: "Country code selection dropdown component",
	},
	{
		light: "/flags/scroll-section/2.png",
		dark: "/flags/scroll-section/2dark.png",
		alt: "Currency exchange modal UI",
	},
	{
		light: "/flags/scroll-section/3.png",
		dark: "/flags/scroll-section/3dark.png",
		alt: "Workspace settings modal UI",
	},
	{
		light: "/flags/scroll-section/4.png",
		dark: "/flags/scroll-section/4dark.png",
		alt: "High-Density customer directory data table with filters and row checkboxes",
	},
	{
		light: "/flags/scroll-section/5.png",
		dark: "/flags/scroll-section/5dark.png",
		alt: "User profile Drawer UI component",
	},
	{
		light: "/flags/scroll-section/6.png",
		dark: "/flags/scroll-section/6dark.png",
		alt: "Searchable country code dropdown with national flags",
	},
	{
		light: "/flags/scroll-section/7.png",
		dark: "/flags/scroll-section/7dark.png",
		alt: "A collection of interactive country badge tags with flag icons",
	},
] as const

const previewClassName =
	"border-soft bg-fill1 relative aspect-4/3 h-auto w-[70vw] shrink-0 overflow-hidden rounded-[10px] border p-0 shadow-none sm:w-[45vw] sm:rounded-xl md:w-[35vw] md:rounded-[20px] lg:w-[28vw]"

export default function FlagUseCasesMarquee() {
	return (
		<div className="-mx-5 sm:-mx-6">
			<InfiniteScroll
				duration={60}
				pauseOnHover={false}
				hideClonesFromAssistiveTechnology
				className="[--gap:2rem]">
				{useCasePreviews.map((preview) => (
					<Card key={preview.light} className={previewClassName}>
						<Image
							src={preview.light}
							alt={preview.alt}
							fill
							sizes="(min-width: 1024px) 28vw, (min-width: 768px) 35vw, (min-width: 640px) 45vw, 70vw"
							className="object-cover dark:hidden"
							unoptimized
						/>
						<Image
							src={preview.dark}
							alt={preview.alt}
							fill
							sizes="(min-width: 1024px) 28vw, (min-width: 768px) 35vw, (min-width: 640px) 45vw, 70vw"
							className="hidden object-cover dark:block"
							unoptimized
						/>
					</Card>
				))}
			</InfiniteScroll>
		</div>
	)
}
