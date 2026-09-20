import { Github } from "lucide-react"
import Link from "next/link"
import { Button } from "@/registry/ui/button"

export default function BrandLogosHeroActions() {
	return (
		<>
			<Button
				asChild
				size="40"
				className="bg-elevation-level1/20 dark:hover:bg-fill2/40 hover:bg-fill2/40 w-full backdrop-blur-md sm:w-fit"
				variant="outline"
				color="neutral">
				<Link href="#resource-showcase-heading">Browse logos</Link>
			</Button>
			<Button asChild variant="glossy" className="w-full sm:w-fit" size="40">
				<Link
					href="https://github.com/Radian-os/radian-resources/tree/main/packages/brand-logos"
					target="_blank"
					rel="noreferrer">
					<Github />
					View source
				</Link>
			</Button>
		</>
	)
}
