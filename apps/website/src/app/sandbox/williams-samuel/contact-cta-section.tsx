"use client"

import React from "react"
import { Button } from "@/styles/default/ui/button"

export function ContactCtaSection() {
	return (
		<section id="contact" className="flex flex-col items-start gap-6 py-24">
			<span className="text-success font-mono text-xs font-bold tracking-widest uppercase">
				HAVE A PROJECT? OR JUST LOOKING TO HIRE?
			</span>

			<h2 className="heading-2 text-fg">Let&apos;s Work Together</h2>

			<p className="text-fg-secondary max-w-xl text-sm leading-relaxed sm:text-base">
				Feel free to reach out if you&apos;re looking to hire, just want to
				connect or see if we can build something amazing together.
			</p>

			<div className="pt-4">
				<Button
					asChild
					color="neutral"
					variant="ghost"
					size="40"
					className="hover:text-success text-fg p-0 font-mono text-sm font-bold tracking-wider transition-colors hover:bg-transparent">
					<a href="mailto:hello@williamssamuel.dev">GET IN TOUCH &rarr;</a>
				</Button>
			</div>
		</section>
	)
}
