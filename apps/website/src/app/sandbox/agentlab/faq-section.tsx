"use client"

import React, { useState } from "react"
import { Minus, Plus } from "lucide-react"

interface FaqItem {
	question: string
	answer: string
}

const faqs: FaqItem[] = [
	{
		question: "What Exactly Is an AI Agent?",
		answer:
			"An AI Agent is more than just a chatbot; it is a system designed to perform tasks autonomously. While a chatbot answers questions, an agent can use tools, browse the web, and execute multi-step workflows (like booking a meeting, qualifying a lead, or updating a CRM) to achieve a specific goal.",
	},
	{
		question: "How Does AgentLab Protect My Proprietary Data?",
		answer:
			"We employ strict zero-data-retention agreements with underlying model providers. All customer data in transit is encrypted using TLS 1.3 and at rest with AES-256. For sensitive workloads, our private VPC deployments ensure data never leaves your perimeter.",
	},
	{
		question: "Can We Integrate AgentLab with Our Existing Software Stack?",
		answer:
			"Yes. AgentLab offers native connectors for over 50+ enterprise systems including Salesforce, HubSpot, Zendesk, Slack, Linear, PostgreSQL, Snowflake, and custom REST/GraphQL endpoints.",
	},
	{
		question: "How Does Multi-Model Routing Work?",
		answer:
			"AgentLab automatically routes prompts to the optimal model (such as GPT-4o, Claude 3.5 Sonnet, or fine-tuned open models) based on task complexity, budget parameters, and target latency SLAs.",
	},
	{
		question: "What Kind of Uptime and Support Do You Provide?",
		answer:
			"We guarantee 99.9% uptime for enterprise plans with dedicated 24/7 technical support, assigned solutions architects, and rapid SLA escalation channels.",
	},
]

export function AgentlabFaqSection() {
	const [openIdx, setOpenIdx] = useState<number | null>(0)

	function toggle(idx: number) {
		setOpenIdx(openIdx === idx ? null : idx)
	}

	return (
		<section
			id="faq"
			className="border-border/60 bg-fill1/30 border-t py-24 md:py-32">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
					{/* Left Title Column */}
					<div className="lg:col-span-5">
						<div className="border-border/80 bg-fill2/70 text-fg-secondary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider">
							<span className="text-primary font-bold">—</span>
							<span>FAQS</span>
						</div>
						<h2 className="heading-2 text-fg mt-4 font-serif text-3xl font-normal leading-[1.2] tracking-tight sm:text-4xl md:text-5xl">
							Have questions?
							<br />
							Find answers
						</h2>
						<p className="text-fg-secondary mt-4 text-sm leading-relaxed sm:text-base">
							Everything you need to know about the AgentLab platform, security
							protocols, integrations, and deployment options.
						</p>
					</div>

					{/* Right Accordion List (Rule 18: mapped array) */}
					<div className="divide-border/60 border-border/60 divide-y border-y lg:col-span-7">
						{faqs.map((faq, idx) => {
							const isOpen = openIdx === idx
							return (
								<div key={faq.question} className="py-6 transition-colors">
									<button
										type="button"
										onClick={() => toggle(idx)}
										className="text-fg hover:text-primary flex w-full items-start justify-between gap-4 text-left transition-colors">
										<span className="heading-4 font-serif text-lg font-normal sm:text-xl">
											{faq.question}
										</span>
										<div className="border-border bg-fill2 text-fg flex size-7 shrink-0 items-center justify-center rounded-full border">
											{isOpen ? (
												<Minus className="size-3.5" />
											) : (
												<Plus className="size-3.5" />
											)}
										</div>
									</button>

									{isOpen && (
										<p className="text-fg-secondary mt-4 text-xs leading-relaxed sm:text-sm">
											{faq.answer}
										</p>
									)}
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}
