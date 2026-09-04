"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	ChevronRight,
	Facebook,
	Instagram,
	Linkedin,
	Send,
	Zap,
} from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/styles/default/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/styles/default/ui/form"
import { Input } from "@/styles/default/ui/input"

const newsletterSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
})

type NewsletterFormValues = z.infer<typeof newsletterSchema>

const companyLinks = [
	{ label: "Home", href: "/sandbox/aiwork" },
	{ label: "About us", href: "#about" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "Blog", href: "#blog" },
	{ label: "Blog Details", href: "#blog-details" },
]

const productLinks = [
	{ label: "Features", href: "#features" },
	{ label: "Careers", href: "#careers" },
	{ label: "Contact", href: "#contact" },
	{ label: "Privacy Policy", href: "#privacy" },
]

const socialIcons = [
	{ icon: Facebook, label: "Facebook", href: "https://facebook.com" },
	{ icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
	{ icon: Instagram, label: "Instagram", href: "https://instagram.com" },
	{ icon: Send, label: "Telegram", href: "https://telegram.org" },
]

export function AiworkFooter() {
	const [subscribed, setSubscribed] = useState(false)

	const form = useForm<NewsletterFormValues>({
		resolver: zodResolver(newsletterSchema),
		defaultValues: { email: "" },
	})

	const onSubmit = (data: NewsletterFormValues) => {
		console.log("Subscribed newsletter:", data.email)
		setSubscribed(true)
		form.reset()
	}

	return (
		<footer className="border-border/60 bg-fill1/40 border-t pb-12 pt-16">
			<div className="mx-auto max-w-5xl px-4">
				<div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
					{/* Brand Column */}
					<div className="space-y-4 lg:col-span-4">
						<Link
							href="/sandbox/aiwork"
							className="flex items-center gap-2.5 font-bold tracking-tight hover:underline">
							<div className="bg-primary flex size-8 items-center justify-center rounded-lg shadow-sm">
								<Zap className="size-4 text-white" />
							</div>
							<span className="text-foreground text-lg font-bold">AIwork</span>
						</Link>

						<p className="text-fg-secondary max-w-sm text-xs leading-relaxed">
							AI agents that automate work, scale operations, and give your
							trucking dispatch team valuable time back.
						</p>

						{/* Social Media Links */}
						<div className="flex items-center gap-2 pt-2">
							{socialIcons.map((soc) => {
								const Icon = soc.icon
								return (
									<a
										key={soc.label}
										href={soc.href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={soc.label}
										className="bg-fill2 hover:bg-fill3 text-fg-secondary hover:text-foreground flex size-8 items-center justify-center rounded-full transition-colors">
										<Icon className="size-3.5" />
									</a>
								)
							})}
						</div>
					</div>

					{/* Company Column */}
					<div className="space-y-3 lg:col-span-2">
						<div className="text-foreground text-sm font-bold">Company</div>
						<ul className="space-y-2">
							{companyLinks.map((item) => (
								<li key={item.label}>
									{/* Rule 11: Link with className="hover:underline" */}
									<Link
										href={item.href}
										className="text-fg-secondary hover:text-foreground text-xs transition-colors hover:underline">
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Product Column */}
					<div className="space-y-3 lg:col-span-2">
						<div className="text-foreground text-sm font-bold">Product</div>
						<ul className="space-y-2">
							{productLinks.map((item) => (
								<li key={item.label}>
									{/* Rule 11: Link with className="hover:underline" */}
									<Link
										href={item.href}
										className="text-fg-secondary hover:text-foreground text-xs transition-colors hover:underline">
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Newsletter Column */}
					<div className="space-y-3 lg:col-span-4">
						<div className="text-foreground text-sm font-bold">Newsletter</div>
						<p className="text-fg-secondary text-xs leading-relaxed">
							Get tips, product updates, and insights on working smarter with
							AI.
						</p>

						{/* Rule 6 & 7: Form with zod & react-hook-form */}
						{subscribed ? (
							<div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
								Thank you for subscribing!
							</div>
						) : (
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="flex items-start gap-2">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem className="flex-1 space-y-1">
												<FormControl>
													<Input
														placeholder="Email address"
														size="36"
														className="text-xs"
														{...field}
													/>
												</FormControl>
												<FormMessage className="text-[11px]" />
											</FormItem>
										)}
									/>

									{/* Rule 15: Explicit color prop on Button */}
									<Button
										type="submit"
										variant="strong"
										color="primary"
										size="36"
										className="gap-1 rounded-xl px-4 text-xs font-semibold">
										<span>Subscribe</span>
										<ChevronRight className="size-3.5" />
									</Button>
								</form>
							</Form>
						)}
					</div>
				</div>

				{/* Bottom Copyright Row */}
				<div className="border-border/60 text-fg-tertiary mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-xs sm:flex-row">
					<div>© 2025 AIwork. All rights reserved.</div>
					<div className="flex items-center gap-4">
						<Link href="#privacy" className="hover:underline">
							Privacy
						</Link>
						<Link href="#terms" className="hover:underline">
							Terms
						</Link>
						<span>Powered by Framer</span>
					</div>
				</div>
			</div>
		</footer>
	)
}
