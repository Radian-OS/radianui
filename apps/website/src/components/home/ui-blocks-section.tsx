import { ArrowUpRight, Layers } from "lucide-react"
import Link from "next/link"
import HomeInteractive from "@/components/home/home-interactive"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import FigmaPreviewButton from "../navbar/figma-preview-button"

export default function UIBlocksSection() {
	return (
		<section
			aria-label="UI Blocks"
			className="lg:py-15 border-soft lg:px-15 mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 border-l border-r px-5 py-12">
			<header className="flex w-full justify-between">
				<div className="flex flex-col justify-start gap-6">
					<Badge size="28" variant="soft" color="primary">
						<Layers className="text-primary" aria-hidden="true" />
						UI Blocks
					</Badge>
					<h2 className="heading-4 max-w-200 text-start text-2xl sm:text-[32px]">
						<span>Multiple Pre-made UI blocks </span>
						<span className="text-fg-secondary">
							built to simplify your design process and accelerate your{" "}
						</span>
						<span className="from-primary-border to-fuchsia-border bg-gradient-to-l bg-clip-text text-transparent">
							idea-to-implementation{" "}
						</span>
						<span className="text-fg-secondary">workflow.</span>
					</h2>
				</div>
				<nav
					aria-label="UI Blocks actions"
					className="hidden flex-col items-end justify-center gap-3 lg:flex">
					<FigmaPreviewButton text="Figma Community File" />
					<Button variant="smooth" asChild>
						<Link
							target="_blank"
							rel="noopener noreferrer"
							href={process.env.NEXT_PUBLIC_BLOCKS_URL!}>
							Explore UI Blocks <ArrowUpRight aria-hidden="true" />
						</Link>
					</Button>
				</nav>
			</header>
			<figure className="relative h-[760px] w-full max-w-[1400px] sm:h-[860px]">
				<HomeInteractive />
			</figure>
			<nav
				aria-label="UI Blocks mobile actions"
				className="flex flex-col items-center justify-center gap-3 lg:hidden">
				<FigmaPreviewButton text="Figma Community File" />
				<Button variant="smooth" asChild>
					<Link
						target="_blank"
						rel="noopener noreferrer"
						href={process.env.NEXT_PUBLIC_BLOCKS_URL!}>
						Explore UI Blocks <ArrowUpRight aria-hidden="true" />
					</Link>
				</Button>
			</nav>
		</section>
	)
}
