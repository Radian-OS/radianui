import Image from "next/image"
import { InfiniteScroll } from "@/registry/animated/infinite-scroll"
import { Card } from "@/registry/ui/card"

const useCasePreviews = [
	{
		light: "/emoji/scroll-section/asset-1.png",
		dark: "/emoji/scroll-section/dark-asset-1.png",
		alt: "Feedback UI popover with emoji rating selection and a 'Tell us more' comment box.",
	},
	{
		light: "/emoji/scroll-section/asset-2.png",
		dark: "/emoji/scroll-section/dark-asset-2.png",
		alt: "FAQ list accordion component with an expanded shipping carrier row",
	},
	{
		light: "/emoji/scroll-section/asset-3.png",
		dark: "/emoji/scroll-section/dark-asset-3.png",
		alt: "A workspace navigation sidebar showing a list of project spaces and boards organized with distinct emoji icons",
	},
	{
		light: "/emoji/scroll-section/asset-4.png",
		dark: "/emoji/scroll-section/dark-asset-4.png",
		alt: "A chat bubble component with an open emoji reaction picker popover tool.",
	},
	{
		light: "/emoji/scroll-section/asset-5.png",
		dark: "/emoji/scroll-section/dark-asset-5.png",
		alt: "A threaded UI comment card component featuring multi-user replies and accumulated emoji reaction badges.",
	},
	{
		light: "/emoji/scroll-section/asset-6.png",
		dark: "/emoji/scroll-section/dark-asset-6.png",
		alt: "A feedback questionnaire UI component with a labeled five-star emoji sentiment scale ranging from Awful to Excellent.",
	},
	{
		light: "/emoji/scroll-section/asset-7.png",
		dark: "/emoji/scroll-section/dark-asset-7.png",
		alt: "A threaded UI chat messaging component featuring short conversational text bubbles integrated with emoji expressions.",
	},
	{
		light: "/emoji/scroll-section/asset-8.png",
		dark: "/emoji/scroll-section/dark-asset-8.png",
		alt: "A feedback confirmation card UI component featuring a thumb-up graphic and a success message with an inline rocket emoji",
	},
] as const

const previewClassName =
	"border-soft bg-fill1 relative aspect-4/3 h-auto w-[70vw] shrink-0 overflow-hidden rounded-[10px] border p-0 shadow-none sm:w-[45vw] sm:rounded-xl md:w-[35vw] md:rounded-[20px] lg:w-[28vw]"

export default function EmojiUseCasesMarquee() {
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
