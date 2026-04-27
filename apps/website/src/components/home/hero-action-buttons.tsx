"use client"

import { Check } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { useCopyPasteSimple } from "@/hooks/use-copy-paste-simple"
import { Button } from "@/styles/default/ui/button"

const TERMINAL_COMMAND = "pnpm dlx radianui@latest init"

export default function HeroActionButtons() {
	const { copy } = useCopyPasteSimple(TERMINAL_COMMAND)

	return (
		<>
			<Button
				variant="glossy"
				className="w-full sm:w-fit"
				size="40"
				onClick={(e) => {
					copy(e)

					toast.custom(() => (
						<div className="bg-black-inverse text-fg-inverse sm:w-75 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 shadow-[0_16px_24px_-4px_rgba(25,24,27,0.12)]">
							<Check size={20} className="text-success" />
							<div className="text-fg-inverse space-y-0.5 text-sm">
								<p className="font-semibold">Command copied to clipboard</p>
								<p>{TERMINAL_COMMAND}</p>
							</div>
						</div>
					))
				}}>
				Copy Terminal Command
			</Button>
			<Button
				asChild
				size="40"
				className="bg-elevation-level1/20 dark:hover:bg-fill2/40 hover:bg-fill2/40 w-full backdrop-blur-md sm:w-fit"
				variant="outline"
				color="neutral">
				<Link href="/docs/components/accordion" className="w-full sm:w-fit">
					Browse Components
				</Link>
			</Button>
		</>
	)
}
