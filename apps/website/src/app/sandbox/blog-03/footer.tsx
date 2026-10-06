import React from "react"
import Image from "next/image"
import Link from "next/link"
import type { FooterColumn } from "./types"

const footerColumns: FooterColumn[] = [
	{
		title: "Features",
		links: [
			{ label: "Payment Link", href: "#payment-link" },
			{ label: "Recurring Billing", href: "#recurring-billing" },
			{ label: "Invoicing", href: "#invoicing" },
			{ label: "Checkout", href: "#checkout" },
			{ label: "Integrations", href: "#integrations" },
			{ label: "Pricing", href: "#pricing" },
		],
	},
	{
		title: "Solutions",
		links: [
			{ label: "eCommerce", href: "#ecommerce" },
			{ label: "Finance Automation", href: "#finance-automation" },
			{ label: "Crypto", href: "#crypto" },
			{ label: "Global Business", href: "#global-business" },
			{ label: "Marketplaces", href: "#marketplaces" },
		],
	},
	{
		title: "Resources",
		links: [
			{ label: "Tutorials", href: "#tutorials" },
			{ label: "Blog", href: "#blog" },
			{ label: "Community", href: "#community" },
			{ label: "Privacy Policy", href: "#privacy-policy" },
		],
	},
	{
		title: "About",
		links: [
			{ label: "Company", href: "#company" },
			{ label: "Careers", href: "#careers" },
			{ label: "FAQ", href: "#faq" },
			{ label: "Contact Us", href: "#contact-us" },
		],
	},
]

export function Footer() {
	return (
		<footer className="border-border/40 bg-elevation-level1 text-fg-secondary mt-20 border-t">
			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
				{/* Top Grid: Brand on Left, 4 Link Columns on Right */}
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
					{/* Brand Column */}
					<div className="lg:col-span-4">
						<Link
							href="/sandbox/zentra"
							className="text-fg inline-flex items-center gap-2.5 font-bold tracking-tight transition-opacity hover:opacity-90">
							<div className="bg-primary/20 flex size-9 items-center justify-center overflow-hidden rounded-lg">
								<Image
									src="/sandbox/placeholder.svg"
									alt="Zentra"
									width={32}
									height={32}
									className="size-7 object-contain"
								/>
							</div>
							<span className="text-fg text-xl font-bold tracking-tight">
								Zentra
							</span>
						</Link>
						<p className="text-fg-secondary mt-4 max-w-xs text-xs leading-relaxed">
							Smarter financial tools and transparent insights designed for
							modern businesses and individuals worldwide.
						</p>
					</div>

					{/* 4 Link Columns (Rule: rendered via .map) */}
					<div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
						{footerColumns.map((col) => (
							<div key={col.title} className="flex flex-col gap-4">
								<span className="text-fg text-xs font-semibold tracking-wider uppercase">
									{col.title}
								</span>
								<ul className="flex flex-col gap-3">
									{col.links.map((link) => (
										<li key={link.label}>
											<Link
												href={link.href}
												className="text-fg-secondary hover:text-fg text-xs transition-colors">
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>

				{/* Bottom Copyright */}
				<div className="border-border/80 mt-16 border-t pt-8">
					<p className="text-fg-tertiary text-xs">
						© 2025 Zentra. All right reserved
					</p>
				</div>
			</div>
		</footer>
	)
}
