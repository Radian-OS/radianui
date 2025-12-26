"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { Button } from "@/registry/ui/button"

export function useCopyPaste(text: string) {
	const [copied, setCopied] = useState(false)

	const copy = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		navigator.clipboard.writeText(text)
		setCopied(true)

		setTimeout(() => {
			setCopied(false)
		}, 1500)
	}

	return { copied, copy }
}

export default function HeroActionButtons() {
	const { copy } = useCopyPaste("npx radianui@latest init")

	return (
		<>
			<Button
				variant="glossy"
				className="w-full sm:w-fit"
				size="40"
				onClick={(e) => {
					copy(e)
					toast.custom(() => (
						<div className="bg-elevation-level1 border-border flex w-[416px] items-center justify-between gap-2 rounded-lg border px-4 py-3">
							<p className="text-fg-secondary text-sm font-normal">Successfully Copied Terminal Command</p>
						</div>
					))
				}}>
				Copy Terminal Command
			</Button>
			<Button asChild size="40" className="bg-elevation-level1/20 dark:hover:bg-fill2/40 hover:bg-fill2/40 w-full backdrop-blur-md sm:w-fit" variant="outline" color="neutral">
				<Link href="/docs/components/accordion" className="w-full sm:w-fit">
					Browse Components
				</Link>
			</Button>
		</>
	)
}
