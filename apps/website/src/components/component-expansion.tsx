import * as React from "react"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/registry/ui/button"

function Card({
	title,
	variants,
	children,
	href,
}: {
	title: string
	variants: string
	children: React.ReactNode
	href: string
}) {
	return (
		<div className="border-soft bg-bg flex flex-col rounded-xl border p-5 shadow-sm">
			<div className="mb-6 flex items-center justify-between">
				<span className="text-fg text-sm font-semibold">{title}</span>
				<span className="text-fg-secondary text-xs">{variants}</span>
			</div>
			<div className="relative mb-6 flex min-h-[140px] flex-1 items-center justify-center overflow-hidden">
				<div className="relative z-10 flex w-full items-center justify-center">
					{children}
				</div>
			</div>
			<Button
				variant="soft"
				size="36"
				color="neutral"
				className="w-full"
				asChild>
				<Link href={href}>
					<ExternalLink className="text-fg-tertiary" /> View page
				</Link>
			</Button>
		</div>
	)
}

export function ComponentExpansionGrid() {
	return (
		<div className="my-10 grid grid-cols-1 gap-5 md:grid-cols-2">
			<Card title="Stepper" variants="" href="/docs/components/stepper">
				<Image
					className="object-cover dark:hidden"
					src="/changelog/v0-3/stepper-light.png"
					alt="Stepper"
					width={500}
					height={500}
				/>
				<Image
					className="hidden object-cover dark:block"
					src="/changelog/v0-3/stepper-dark.png"
					alt="Stepper"
					width={500}
					height={500}
				/>
			</Card>

			<Card title="Menu Bar" variants="" href="/docs/components/menubar">
				<Image
					className="object-cover dark:hidden"
					src="/changelog/v0-3/menubar-light.png"
					alt="Menu Bar"
					width={500}
					height={500}
				/>
				<Image
					className="hidden object-cover dark:block"
					src="/changelog/v0-3/menubar-dark.png"
					alt="Menu Bar"
					width={500}
					height={500}
				/>
			</Card>

			<Card
				title="Context Menu"
				variants=""
				href="/docs/components/context-menu">
				<Image
					className="object-cover dark:hidden"
					src="/changelog/v0-3/context-menu-light.png"
					alt="Context Menu"
					width={500}
					height={500}
				/>
				<Image
					className="hidden object-cover dark:block"
					src="/changelog/v0-3/context-menu-dark.png"
					alt="Context Menu"
					width={500}
					height={500}
				/>
			</Card>

			<Card title="Toggle" variants="" href="/docs/components/toggle">
				<Image
					className="object-cover dark:hidden"
					src="/changelog/v0-3/toggle-light.png"
					alt="Toggle"
					width={500}
					height={500}
				/>
				<Image
					className="hidden object-cover dark:block"
					src="/changelog/v0-3/toggle-dark.png"
					alt="Toggle"
					width={500}
					height={500}
				/>
			</Card>

			<Card
				title="Toggle Group"
				variants=""
				href="/docs/components/toggle-group">
				<Image
					className="object-cover dark:hidden"
					src="/changelog/v0-3/toggle-group-light.png"
					alt="Toggle Group"
					width={500}
					height={500}
				/>
				<Image
					className="hidden object-cover dark:block"
					src="/changelog/v0-3/toggle-group-dark.png"
					alt="Toggle Group"
					width={500}
					height={500}
				/>
			</Card>

			<Card
				title="Navigation Menu"
				variants=""
				href="/docs/components/navigation-menu">
				<Image
					className="object-cover dark:hidden"
					src="/changelog/v0-3/navigation-menu-light.png"
					alt="Navigation Menu"
					width={500}
					height={500}
				/>
				<Image
					className="hidden object-cover dark:block"
					src="/changelog/v0-3/navigation-menu-dark.png"
					alt="Navigation Menu"
					width={500}
					height={500}
				/>
			</Card>
		</div>
	)
}
