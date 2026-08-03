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
			<header className="max-w-360 border-soft mx-auto flex w-full flex-col overflow-hidden border border-y-0">
				<div className="lg:px-15 lg:py-30 flex flex-col gap-4 px-5 py-16 sm:gap-6 sm:px-10">
					<Badge size="28" variant="soft" color="primary">
						<BadgeDot className="bg-primary" />
						UI Blocks
					</Badge>
					<h2
						id="ui-blocks-title"
						className="heading-3 font-heading w-full lg:w-[900px]">
						<span className="text-fg font-medium">
							Start with complete layouts, not blank pages.{" "}
						</span>
						<span className="text-fg-secondary font-medium">
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
