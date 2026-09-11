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
				<Link href="/docs/packages/flags">Documentation</Link>
			</Button>
			<Button asChild variant="glossy" className="w-full sm:w-fit" size="40">
				<Link
					href="https://www.npmjs.com/package/@radianui/flags"
					target="_blank"
					rel="noreferrer">
					npm package
				</Link>
			</Button>
		</>
	)
}
