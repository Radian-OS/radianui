import React from "react"
import { Sparkle } from "lucide-react"
import { WebsiteLogo } from "./navbar/website-logo"

interface ChangelogCardProps {
	title: string
	children: React.ReactNode
}

export default function ChangelogCard({ title, children }: ChangelogCardProps) {
	return (
		<div className="border-border bg-fill1 my-8 overflow-hidden rounded-[32px] border">
			<div className="border-border flex flex-col justify-between gap-4 border-b px-20 pt-10 pb-8 sm:flex-row sm:items-center">
				<div className="flex items-center gap-3">
					<div className="flex items-center gap-2">
						{/* <Image
							src="/radian-24x24.svg"
							alt="Radian logo"
							width={24}
							height={24}
							className="h-6 w-6"
						/>
						<span className="text-lg font-semibold text-fg">
							Radian
						</span> */}
						<WebsiteLogo className="pointer-events-none" />
					</div>
					<Sparkle className="fill-fg-tertiary text-fg-tertiary size-4" />
					<span className="text-fg-secondary text-lg font-normal">
						Design System & Development Library
					</span>
				</div>
				<span className="text-fg-tertiary text-lg font-normal">
					www.radianui.com
				</span>
			</div>

			<div className="px-20 pt-8 pb-20">
				<h2 className="mt-0 mb-4 border-none pb-0 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
					{title}
				</h2>
				<div className="m-0 max-w-4xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
					{children}
				</div>
			</div>
		</div>
	)
}
