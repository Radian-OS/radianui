"use client"

import React from "react"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/styles/default/ui/button"

interface IntegrationItem {
	name: string
	domain: string
	description: string
	url: string
}

const integrations: IntegrationItem[] = [
	{
		name: "Trello",
		domain: "trello.com",
		description:
			"Auto-assign cards, move tasks, and keep dispatch boards updated through autonomous AI agents.",
		url: "https://trello.com",
	},
	{
		name: "Dropbox",
		domain: "dropbox.com",
		description:
			"Sync contracts, compliance reports, and load paperwork from AI workflows instantly.",
		url: "https://dropbox.com",
	},
	{
		name: "Slack",
		domain: "slack.com",
		description:
			"Broadcast delivery alerts and driver status updates in real time for effortless team collaboration.",
		url: "https://slack.com",
	},
	{
		name: "HubSpot",
		domain: "hubspot.com",
		description:
			"Let AI agents trigger sales follow-ups and update shipper CRM contacts automatically.",
		url: "https://hubspot.com",
	},
	{
		name: "Mailchimp",
		domain: "mailchimp.com",
		description:
			"Trigger automated shipper notifications from agent dispatches or load completions.",
		url: "https://mailchimp.com",
	},
	{
		name: "Zoom",
		domain: "zoom.us",
		description:
			"Automate meeting transcripts, post-call action items, and driver onboarding briefs.",
		url: "https://zoom.us",
	},
]

export function AiworkIntegrationsSection() {
	return (
		<section className="bg-fill1/20 border-border/60 border-t py-20 md:py-28">
			<div className="mx-auto max-w-5xl px-4">
				{/* Section Header */}
				<div className="flex flex-col items-center text-center">
					<div className="border-primary/20 bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold">
						<span className="bg-primary size-1.5 rounded-full" />
						<span>Integrations</span>
					</div>

					{/* Rule 13: heading-2 */}
					<h2 className="heading-2 text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
						Instant Integrations
					</h2>

					<p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed md:text-base">
						Connect with the tools you already rely on to automate end-to-end
						operations across your entire logistics stack.
					</p>
				</div>

				{/* 3x2 Integrations Grid */}
				<div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{integrations.map((item) => (
						<div
							key={item.name}
							className="border-border/70 bg-fill1/50 hover:border-primary/40 hover:bg-fill1 flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 hover:shadow-md">
							<div>
								{/* Rule 9: Use Image with Google favicon service */}
								<div className="border-border/60 bg-background shadow-xs flex size-11 items-center justify-center rounded-xl border p-2">
									<Image
										src={`https://www.google.com/s2/favicons?sz=64&domain=${item.domain}`}
										alt={`${item.name} Logo`}
										width={24}
										height={24}
										className="size-6 object-contain"
										unoptimized
									/>
								</div>

								<h3 className="text-foreground mt-4 text-lg font-bold">
									{item.name}
								</h3>

								<p className="text-fg-secondary mt-2 text-xs leading-relaxed">
									{item.description}
								</p>
							</div>

							<div className="mt-6 pt-2">
								{/* Rule 15: explicit color prop on Button */}
								<Button
									variant="outline"
									color="neutral"
									size="32"
									asChild
									className="gap-1.5 rounded-full px-3.5 text-xs font-medium">
									<a href={item.url} target="_blank" rel="noopener noreferrer">
										<span>Connect</span>
										<ChevronRight className="size-3" />
									</a>
								</Button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
