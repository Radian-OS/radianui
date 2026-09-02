import { Figma, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { ResourceCTA } from "../../components/ResourceCTA"

export default function AvatarCTA() {
	return (
		<ResourceCTA
			id="avatar-cta-heading"
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
			visual={<AvatarCtaVisual />}
		/>
	)
}

function AvatarCtaVisual() {
	return (
		<div className="pointer-events-none absolute top-0 right-0 hidden -translate-y-1/2 lg:block">
			<div className="absolute top-2 -right-70 h-[700px] w-[900px] dark:hidden">
				<Image
					src="/avatar/Table.png"
					alt="User management table demonstrating avatars in a Radian UI layout"
					fill
					className="object-contain"
				/>
			</div>
			<div className="absolute -top-2 right-51 h-[240px] w-[400px] dark:hidden">
				<Image
					src="/avatar/Dropdown.png"
					alt="Account navigation dropdown demonstrating a user avatar"
					fill
					className="object-contain"
				/>
			</div>
			<div className="absolute top-2 -right-70 hidden h-[700px] w-[900px] dark:block">
				<Image
					src="/avatar/Table-1.png"
					alt="User management table demonstrating avatars in a dark Radian UI layout"
					fill
					className="object-contain"
				/>
			</div>
			<div className="absolute -top-2 right-51 hidden h-[240px] w-[400px] dark:block">
				<Image
					src="/avatar/Dropdown-1.png"
					alt="Dark account navigation dropdown demonstrating a user avatar"
					fill
					className="object-contain"
				/>
			</div>
		</div>
	)
}
