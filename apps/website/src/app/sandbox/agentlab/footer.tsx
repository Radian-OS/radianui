"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"

interface FooterColumn {
	title: string
	links: { label: string; href: string }[]
}

const footerColumns: FooterColumn[] = [
	{
		title: "MAIN",
		links: [
			{ label: "Product", href: "#product" },
			{ label: "About", href: "#about" },
			{ label: "Pricing", href: "#pricing" },
			{ label: "Case Study", href: "#case-study" },
			{ label: "Blog", href: "#blog" },
			{ label: "Contact", href: "#contact" },
		],
	},
	{
		title: "USEFUL",
		links: [
			{ label: "Industry", href: "#industry" },
			{ label: "Teams", href: "#teams" },
			{ label: "Career", href: "#career" },
			{ label: "Changelog", href: "#changelog" },
			{ label: "FAQ", href: "#faq" },
		],
	},
	{
		title: "OTHERS",
		links: [
			{ label: "Privacy Policy", href: "#privacy" },
			{ label: "Terms & Conditions", href: "#terms" },
			{ label: "Cookie Policy", href: "#cookies" },
			{ label: "Waitlist", href: "#waitlist" },
			{ label: "404", href: "/404" },
		],
	},
	{
		title: "SOCIAL",
		links: [
			{ label: "Facebook", href: "https://facebook.com" },
			{ label: "LinkedIn", href: "https://linkedin.com" },
			{ label: "X", href: "https://x.com" },
			{ label: "Instagram", href: "https://instagram.com" },
		],
	},
]

export function AgentlabFooter() {
	return (
		<footer className="bg-black-inverse text-white-inverse border-t border-white/10 py-16 md:py-24">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
					{/* Brand Column */}
					<div className="flex flex-col justify-between lg:col-span-4">
						<div>
							<Link
								href="/sandbox/agentlab"
								className="flex items-center gap-2.5 transition-opacity hover:underline hover:opacity-90">
								<div className="relative flex size-6 items-center justify-center">
									<Image
										src="https://framerusercontent.com/images/D2lhgnJj2kr5EiY0FgikXyptXco.svg"
										alt="AgentLab White Logo"
										width={24}
										height={24}
										className="size-6 object-contain brightness-0 invert"
									/>
								</div>
								<span className="font-heading text-xl font-bold tracking-tight text-white">
									AgentLab
								</span>
							</Link>

							<p className="mt-4 max-w-xs text-xs leading-relaxed text-white/60 sm:text-sm">
								Building the future of intelligent automation with AI agents
								that think, act, and deliver across enterprise operations.
							</p>
						</div>

						<p className="mt-8 text-xs text-white/40 sm:mt-12">
							&copy; {new Date().getFullYear()} Design &amp; Developed by{" "}
							<span className="font-medium text-white/70">Amani Design</span>
						</p>
					</div>

					{/* 4 Link Columns (Rule 18: mapped array) */}
					<div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
						{footerColumns.map((col) => (
							<div key={col.title}>
								<p className="text-xs font-bold uppercase tracking-wider text-white">
									{col.title}
								</p>
								<ul className="mt-4 space-y-2.5">
									{col.links.map((link) => (
										<li key={link.label}>
											<Link
												href={link.href}
												className="text-xs text-white/60 transition-colors hover:text-white hover:underline">
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			</div>
		</footer>
	)
}
