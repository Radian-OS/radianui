import Link from "next/link"
import { FigmaIcon } from "@/components/custom/icon"
import { Button } from "@/registry/ui/button"

const flagsFigmaUrl =
	"https://www.figma.com/design/ZB8gTZwafZOYY7rdJjSRz6/%E2%9D%96-Preview-%E2%9D%96-Radian-Design-System-%E2%9D%96-Version-0.3?node-id=5562-7357&t=fMdhmpEw5UU3ReRn-4"

export default function FlagsHeroActionButtons() {
	return (
		<>
			<Button asChild variant="glossy" className="w-full sm:w-fit" size="40">
				<Link
					href="https://www.npmjs.com/package/@radianui/flags"
					target="_blank"
					rel="noreferrer">
					NPM Package
				</Link>
			</Button>
			<Button
				asChild
				size="40"
				className="bg-elevation-level1/20 dark:hover:bg-fill2/40 hover:bg-fill2/40 w-full backdrop-blur-md sm:w-fit"
				variant="outline"
				color="neutral">
				<Link href="/docs/miscellaneous/flags">Documentation</Link>
			</Button>
			<Button
				asChild
				size="40"
				className="bg-elevation-level1/20 dark:hover:bg-fill2/40 hover:bg-fill2/40 w-full backdrop-blur-md sm:w-fit"
				variant="outline"
				color="neutral">
				<Link href={flagsFigmaUrl} target="_blank" rel="noopener noreferrer">
					<FigmaIcon className="size-5" />
					Figma Preview
				</Link>
			</Button>
		</>
	)
}
