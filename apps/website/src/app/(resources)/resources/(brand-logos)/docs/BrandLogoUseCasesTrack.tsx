import Image from "next/image"
import { InfiniteScroll } from "@/registry/animated/infinite-scroll"
import { Card } from "@/registry/ui/card"

import { brandLogoUseCasePreviews } from "../components/brand-logo-previews"

const previewClassName =
	"border-soft bg-fill1 relative aspect-4/3 h-auto w-[70vw] shrink-0 overflow-hidden rounded-[10px] border p-0 shadow-none sm:w-[45vw] sm:rounded-xl md:w-[35vw] md:rounded-[20px] lg:w-[28vw]"

export default function BrandLogoUseCasesTrack({
	paused,
}: {
	paused: boolean
}) {
	return (
		<div className="-mx-5 sm:-mx-6">
			<InfiniteScroll
				duration={60}
				paused={paused}
				repetitions={2}
				pauseOnHover={false}
				hideClonesFromAssistiveTechnology
				className="[--gap:2rem] motion-reduce:[&>div]:animate-none">
				{brandLogoUseCasePreviews.map((preview) => (
					<Card key={preview.light} className={previewClassName}>
						<Image
							src={preview.light}
							alt={preview.alt}
							fill
							sizes="(min-width: 1024px) 28vw, (min-width: 768px) 35vw, (min-width: 640px) 45vw, 70vw"
							className="object-cover dark:hidden"
						/>
						<Image
							src={preview.dark}
							alt={preview.alt}
							fill
							sizes="(min-width: 1024px) 28vw, (min-width: 768px) 35vw, (min-width: 640px) 45vw, 70vw"
							className="hidden object-cover dark:block"
						/>
					</Card>
				))}
			</InfiniteScroll>
		</div>
	)
}
