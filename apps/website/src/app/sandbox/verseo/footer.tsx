"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	CheckCircle2,
	Instagram,
	Linkedin,
	Mail,
	Sparkles,
	Twitter,
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

// Rule 6 & 7: Form validation with Zod + react-hook-form
const newsletterSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
})

type NewsletterFormValues = z.infer<typeof newsletterSchema>

const navigationLinks = [
	{ label: "Product", href: "#product" },
	{ label: "Use Cases", href: "#use-cases" },
	{ label: "Examples", href: "#examples" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "Contact Us", href: "#contact" },
]

const resourceLinks = [
	{ label: "Privacy Policy", href: "#privacy" },
	{ label: "Terms of Service", href: "#terms" },
	{ label: "404 Page", href: "#404" },
]

const socialLinks = [
	{ label: "X (Twitter)", href: "https://x.com", icon: Twitter },
	{ label: "Instagram", href: "https://instagram.com", icon: Instagram },
	{ label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
]

export function VerseoFooter() {
	const [subscribed, setSubscribed] = useState(false)

	const form = useForm<NewsletterFormValues>({
		resolver: zodResolver(newsletterSchema),
		defaultValues: { email: "" },
	})

	const onSubmit = (data: NewsletterFormValues) => {
		console.log("Newsletter subscribed:", data.email)
		setSubscribed(true)
		form.reset()
	}

	return (
		<footer className="border-border/40 bg-background border-t pb-12 pt-16">
			<div className="mx-auto max-w-5xl px-4">
				{/* Top Grid: Brand & Newsletter & Links Columns */}
				<div className="grid grid-cols-1 gap-10 md:grid-cols-5">
					{/* Brand & Contact Column (2 cols wide on desktop) */}
					<div className="space-y-4 md:col-span-2">
						<Link
							href="/sandbox/verseo"
							className="text-foreground flex items-center gap-2 text-base font-black uppercase tracking-wider">
							<div className="bg-foreground text-background flex size-7 items-center justify-center rounded-lg">
								<Sparkles className="fill-background text-background size-4" />
							</div>
							<span>VERSEO</span>
						</Link>

						<p className="text-fg-secondary max-w-sm text-xs leading-relaxed">
							Verseo helps teams create, refine, and publish high-quality
							content faster — without complicated workflows or endless
							revisions.
						</p>

						<div className="pt-2">
							<span className="text-fg-tertiary text-[11px] font-semibold uppercase tracking-wider">
								[ Contact us through e-mail ]
							</span>
							<div className="text-foreground mt-1 flex items-center gap-2 text-sm font-medium">
								<Mail className="text-primary size-4" />
								<a
									href="mailto:verseo@gmail.com"
									className="hover:text-primary hover:underline">
									verseo@gmail.com
								</a>
							</div>
						</div>

						{/* Newsletter Form (Rule 6 & 7: <Form> + Zod validation) */}
						<div className="pt-4">
							<span className="text-fg-tertiary text-[11px] font-semibold uppercase tracking-wider">
								[ Newsletter ]
							</span>
							<p className="text-fg-secondary mt-1 text-xs">
								Stay connected with updates &amp; content tips.
							</p>

							{subscribed ? (
								<div className="mt-3 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
									<CheckCircle2 className="size-4" />
									<span>Thank you for subscribing!</span>
								</div>
							) : (
								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(onSubmit)}
										className="mt-3 space-y-2">
										<div className="flex gap-2">
											<FormField
												control={form.control}
												name="email"
												render={({ field }) => (
													<FormItem className="flex-1">
														<FormControl>
															<Input
																placeholder="Enter your email"
																type="email"
																className="bg-fill1 h-9 rounded-xl text-xs"
																{...field}
															/>
														</FormControl>
														<FormMessage className="text-destructive text-[11px]" />
													</FormItem>
												)}
											/>
											{/* Rule 15: explicit color prop on Button */}
											<Button
												type="submit"
												variant="strong"
												color="primary"
												size="36"
												className="shrink-0 rounded-xl px-4 text-xs font-bold">
												<span>Join</span>
											</Button>
										</div>
									</form>
								</Form>
							)}
						</div>
					</div>

					{/* Navigation Links Column (Rule 11: hover:underline, Rule 18: map) */}
					<div className="space-y-3">
						<span className="text-foreground text-[11px] font-bold uppercase tracking-wider">
							[ Navigation ]
						</span>
						<ul className="space-y-2 pt-1">
							{navigationLinks.map((item) => (
								<li key={item.label}>
									<Link
										href={item.href}
										className="text-fg-secondary hover:text-foreground text-xs transition-colors hover:underline">
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Resources Links Column */}
					<div className="space-y-3">
						<span className="text-foreground text-[11px] font-bold uppercase tracking-wider">
							[ Resources ]
						</span>
						<ul className="space-y-2 pt-1">
							{resourceLinks.map((item) => (
								<li key={item.label}>
									<Link
										href={item.href}
										className="text-fg-secondary hover:text-foreground text-xs transition-colors hover:underline">
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Social Links Column */}
					<div className="space-y-3">
						<span className="text-foreground text-[11px] font-bold uppercase tracking-wider">
							[ Social ]
						</span>
						<ul className="space-y-2 pt-1">
							{socialLinks.map((item) => {
								const Icon = item.icon
								return (
									<li key={item.label}>
										<a
											href={item.href}
											target="_blank"
											rel="noopener noreferrer"
											className="text-fg-secondary hover:text-foreground inline-flex items-center gap-2 text-xs transition-colors hover:underline">
											<Icon className="size-3.5" />
											<span>{item.label}</span>
										</a>
									</li>
								)
							})}
						</ul>
					</div>
				</div>

				{/* Bottom Copyright & Built With Credit */}
				<div className="border-border/40 text-fg-tertiary mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 text-center text-xs sm:flex-row sm:text-left">
					<p>© 2026 Verseo | All Rights Reserved</p>
					<p className="text-[11px]">
						Designed with visual fidelity for the Radian OS sandbox environment.
					</p>
				</div>
			</div>
		</footer>
	)
}
