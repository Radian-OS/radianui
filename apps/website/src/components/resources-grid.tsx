"use client"

import Link from "next/link"
import { Badge } from "@/registry/ui/badge"

import { resources } from "@/config/resource-previews"

export function ResourcesGrid() {
	return (
		<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
			{resources.map((resource) => {
				const card = (
					<div
						className={`bg-bg border-soft flex flex-col gap-2 rounded-xl border p-2 ${resource.link ? "cursor-pointer hover:shadow-sm" : ""}`}>
						<div className="border-soft h-52 w-full overflow-clip rounded-lg border">
							<img
								alt={`${resource.title} — ${resource.description}`}
								src={resource.lightUrl}
								loading="lazy"
								decoding="async"
								width={664}
								height={418}
								className="h-full w-full scale-[1.02] object-cover dark:hidden"
							/>
							<img
								alt={`${resource.title} — ${resource.description}`}
								src={resource.darkUrl}
								loading="lazy"
								decoding="async"
								width={664}
								height={418}
								className="hidden h-full w-full scale-[1.02] object-cover dark:block"
							/>
						</div>
						<div className="flex flex-col gap-1 p-2">
							<div className="flex items-center gap-2">
								<span className="text-fg text-sm font-medium">
									{resource.title}
								</span>
								{resource.comingSoon && (
									<Badge variant="soft" color="amber" size="20">
										Coming Soon
									</Badge>
								)}
							</div>
							<p className="text-fg-secondary text-sm font-normal">
								{resource.description}
							</p>
						</div>
					</div>
				)

				return resource.link ? (
					<Link href={`/resources/${resource.link}`} key={resource.title}>
						{card}
					</Link>
				) : (
					<div key={resource.title}>{card}</div>
				)
			})}
		</div>
	)
}
