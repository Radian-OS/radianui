import Link from "next/link"
import { Button } from "@/registry/ui/button"

export default function FlagsHeroActionButtons() {
	return (
		<>
			<Button
				asChild
				size="40"
				className="bg-elevation-level1/20 dark:hover:bg-fill2/40 hover:bg-fill2/40 w-full backdrop-blur-md sm:w-fit"
				variant="outline"
				color="neutral">
				<Link href="/docs/getting-started/resources">Explore Resources</Link>
			</Button>
			<Button variant="glossy" className="w-full sm:w-fit" size="40">
				Developer API
			</Button>
		</>
	)
}
