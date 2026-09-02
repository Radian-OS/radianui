import type { ReactNode } from "react"
import { Figma, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"

interface ResourceCTAProps {
	id: string
	badge: string
	title: string
	description: string
	actions: ReactNode
	visual?: ReactNode
}

export function ResourceCTA({
	id,
	badge,
	title,
	description,
	actions,
	visual,
}: ResourceCTAProps) {
	return (
		<section
			aria-labelledby={id}
			className="border-soft from-fill1 to-bg-fill2 relative max-w-[1430px] overflow-hidden rounded-[20px] border bg-linear-to-b 2xl:mx-auto">
			<div className="flex min-h-[360px] items-center overflow-hidden p-6 sm:p-10 lg:w-[1350px] lg:p-15">
				<div className="relative z-10 flex w-full flex-col gap-5 lg:max-w-md">
					<div className="flex w-full flex-col gap-8 lg:w-[532px]">
						<div className="flex flex-col gap-5">
							<Badge color="green" variant="soft" size="28">
								{badge}
							</Badge>
							<h2 id={id} className="heading-4">
								{title}
							</h2>
						</div>
						<p className="text-fg-secondary text-sm font-normal">
							{description}
						</p>
					</div>
					<div className="flex flex-col items-center gap-3 sm:flex-row">
						{actions}
					</div>
				</div>
				{visual}
			</div>
		</section>
	)
}

export function ResourceLibraryCTA({ id }: { id: string }) {
	return (
		<ResourceCTA
			id={id}
			badge="Open Source Library"
			title="Production-Ready UI Blocks for Designers and Developers"
			description="Radian UI bridges the gap between design and development. Access production-ready UI blocks, developer documentation, and a fully synced Figma UI kit to launch your next project in record time."
			actions={
				<>
					<Button variant="glossy" className="w-full" asChild>
						<Link href={process.env.NEXT_PUBLIC_BLOCKS_URL!}>
							<Github />
							Documentation
						</Link>
					</Button>
					<Button variant="outline" className="w-full" color="neutral" asChild>
						<Link href="https://www.figma.com/community/file/1601125934366184350/radian-design-system-version-0-1-2">
							<Figma />
							View Figma Library
						</Link>
					</Button>
				</>
			}
			visual={<ResourceLibraryVisual />}
		/>
	)
}

function ResourceLibraryVisual() {
	return (
		<div className="pointer-events-none absolute top-0 right-0 hidden -translate-y-1/2 lg:block">
			<div className="absolute top-2 -right-70 h-[700px] w-[900px] dark:hidden">
				<Image
					src="/avatar/Table.png"
					alt="User management table demonstrating Radian UI blocks"
					fill
					className="object-contain"
				/>
			</div>
			<div className="absolute -top-2 right-51 h-[240px] w-[400px] dark:hidden">
				<Image
					src="/avatar/Dropdown.png"
					alt="Account navigation dropdown demonstrating a Radian UI block"
					fill
					className="object-contain"
				/>
			</div>
			<div className="absolute top-2 -right-70 hidden h-[700px] w-[900px] dark:block">
				<Image
					src="/avatar/Table-1.png"
					alt="User management table demonstrating Radian UI blocks in dark mode"
					fill
					className="object-contain"
				/>
			</div>
			<div className="absolute -top-2 right-51 hidden h-[240px] w-[400px] dark:block">
				<Image
					src="/avatar/Dropdown-1.png"
					alt="Account navigation dropdown demonstrating a Radian UI block in dark mode"
					fill
					className="object-contain"
				/>
			</div>
		</div>
	)
}
