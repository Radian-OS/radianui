import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import HomeInteractive from "@/components/home/home-interactive"
import { Badge, BadgeDot } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"

export default function UIBlocksSection() {
	return (
		<section
			aria-labelledby="ui-blocks-title"
			className="bg-bg relative z-30 mx-auto w-full max-w-[1440px]">
			<header className="border-soft mx-auto flex w-full max-w-360 flex-col overflow-hidden border border-y-0">
				<div className="flex flex-col gap-4 px-5 py-16 sm:gap-6 sm:px-10 lg:px-15 lg:py-30">
					<Badge size="28" variant="soft" color="primary">
						<BadgeDot className="bg-primary" />
						UI Blocks
					</Badge>
					<h2
						id="ui-blocks-title"
						className="heading-3 font-heading w-full lg:w-[900px]">
						<span className="heading-3 text-fg text-[24px] leading-[36px] font-medium md:text-[36px] md:leading-[44px] lg:text-[40px] lg:leading-[52px]">
							Start with complete layouts, not blank pages.{" "}
						</span>
						<span className="heading-3 text-fg-secondary text-[24px] leading-[36px] font-medium md:text-[36px] md:leading-[44px] lg:text-[40px] lg:leading-[52px]">
							Landing pages, dashboards, auth flows, and settings screens ready
							to customize and ship.{" "}
						</span>
					</h2>
					<Button variant="smooth" asChild>
						<Link
							target="_blank"
							rel="noopener noreferrer"
							href={process.env.NEXT_PUBLIC_BLOCKS_URL!}>
							Explore UI Blocks <ArrowUpRight aria-hidden="true" />
						</Link>
					</Button>
				</div>
			</header>
			<figure
				aria-labelledby="ui-blocks-preview-caption"
				className="relative h-[760px] w-full sm:h-[860px]">
				<figcaption id="ui-blocks-preview-caption" className="sr-only">
					Interactive previews of Radian authentication and account UI blocks.
				</figcaption>
				<HomeInteractive />
			</figure>
		</section>
	)
}
