"use client"

import React, { useState } from "react"
import { Minus, Plus } from "lucide-react"

interface FaqItem {
	question: string
	answer: string
}

const faqs: FaqItem[] = [
	{
		question: "Do I need technical skills to set this up?",
		answer:
			"No technical background or coding is required. By managing repetitive duties such as load dispatch, document parsing, and driver chats, our pre-built agents can be configured through a simple visual interface in minutes.",
	},
	{
		question: "What can your AI agents automate?",
		answer:
			"AIwork automates load dispatching, rate confirmation parsing, BOL verification, driver check-in messaging, ETA tracking, and freight status reporting with zero manual data entry.",
	},
	{
		question: "How secure is my data?",
		answer:
			"We enforce enterprise-grade 256-bit AES encryption at rest and in transit, strict SOC2 compliance standards, and isolated tenant environments so your rates, shipper data, and freight documents remain completely secure.",
	},
	{
		question: "Can I test agents before going live?",
		answer:
			"Yes! Every plan includes an unlimited simulation sandbox mode where you can test document parsing, automated responses, and dispatch triggers before going live with actual carriers.",
	},
	{
		question: "What tools can I integrate with?",
		answer:
			"AIwork connects out-of-the-box with leading TMS platforms, Slack, Dropbox, HubSpot, Trello, Zoom, Google Workspace, and any custom API via secure webhooks.",
	},
	{
		question: "What if I need a custom AI workflow?",
		answer:
			"Our visual agent builder allows you to configure proprietary dispatch rules, multi-step approvals, custom OCR extraction schemas, and branch logic tailored directly to your operations.",
	},
]

export function AiworkFaqSection() {
	const [openIndex, setOpenIndex] = useState<number | null>(0)

	const toggleFaq = (index: number) => {
		setOpenIndex(openIndex === index ? null : index)
	}

	return (
		<section className="bg-fill1/20 border-border/60 border-t py-20 md:py-28">
			<div className="mx-auto max-w-5xl px-4">
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
					{/* Left Title & Description */}
					<div className="space-y-4 lg:col-span-5">
						<div className="border-primary/20 bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold">
							<span className="bg-primary size-1.5 rounded-full" />
							<span>Help &amp; Support</span>
						</div>

						{/* Rule 13: heading-2 */}
						<h2 className="heading-2 text-foreground text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
							Frequently asked
							<br />
							questions?
						</h2>

						<p className="text-fg-secondary text-sm leading-relaxed md:text-base">
							Helping you understand how AIwork delivers security, compliance,
							and smarter automated trucking operations.
						</p>
					</div>

					{/* Right Accordion List */}
					<div className="space-y-3 lg:col-span-7">
						{faqs.map((faq, idx) => {
							const isOpen = openIndex === idx
							return (
								<div
									key={faq.question}
									className="border-border/70 bg-fill1/40 hover:border-primary/40 rounded-2xl border transition-all duration-200">
									<button
										type="button"
										onClick={() => toggleFaq(idx)}
										aria-expanded={isOpen}
										className="text-foreground hover:text-primary flex w-full items-center justify-between p-5 text-left text-sm font-semibold transition-colors">
										<span>{faq.question}</span>
										<div className="bg-fill2 text-fg-tertiary flex size-6 shrink-0 items-center justify-center rounded-full transition-transform">
											{isOpen ? (
												<Minus className="size-3.5" />
											) : (
												<Plus className="size-3.5" />
											)}
										</div>
									</button>

									{isOpen && (
										<div className="border-border/40 text-fg-secondary border-t px-5 pb-5 pt-3 text-xs leading-relaxed">
											{faq.answer}
										</div>
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
