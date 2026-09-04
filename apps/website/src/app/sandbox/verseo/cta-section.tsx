"use client"

import React from "react"
import { ArrowRight, CheckCircle2, Sparkles, Terminal } from "lucide-react"
import { Button } from "@/styles/default/ui/button"

export function VerseoCtaSection() {
	return (
		<section className="border-border/40 bg-fill1/30 relative overflow-hidden border-t py-20 md:py-28">
			{/* Ambient background glow */}
			<div className="bg-primary/10 pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />

			<div className="mx-auto max-w-5xl px-4">
				<div className="border-border/80 bg-background/95 overflow-hidden rounded-3xl border p-8 shadow-2xl backdrop-blur-xl md:p-14">
					<div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
						{/* Left: Text & CTAs */}
						<div className="space-y-5">
							<div className="border-border/70 bg-fill1 text-fg-secondary inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold">
								<span>[</span>
								<span className="text-foreground">ready to start?</span>
								<span>]</span>
							</div>

							{/* Rule 13: heading-2 */}
							<h2 className="heading-2 text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
								Start creating better content today
							</h2>

							<p className="text-fg-secondary text-sm leading-relaxed sm:text-base">
								Turn ideas into polished content in seconds. Generate, refine,
								and publish faster with AI-powered workflows designed for modern
								teams.
							</p>

							{/* Dual CTA Buttons (Rule 15: explicit color prop) */}
							<div className="flex flex-wrap items-center gap-3 pt-2">
								<Button
									variant="strong"
									color="primary"
									size="40"
									className="gap-2 rounded-xl px-6 text-sm font-semibold shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]">
									<span>Get Started Free</span>
									<ArrowRight className="size-4" />
								</Button>
								<Button
									variant="outline"
									color="neutral"
									size="40"
									className="rounded-xl px-6 text-sm font-semibold">
									<span>Contact Sales</span>
								</Button>
							</div>
						</div>

						{/* Right: Interactive Terminal / Workflow Execution Card */}
						<div className="border-border/80 bg-fill1/60 overflow-hidden rounded-2xl border p-4 font-mono text-xs shadow-inner sm:p-5">
							<div className="border-border/40 text-fg-tertiary flex items-center justify-between border-b pb-3">
								<div className="flex items-center gap-1.5">
									<Terminal className="size-3.5" />
									<span>verseo_engine.sh</span>
								</div>
								<span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
									<Sparkles className="size-3" />
									<span>ACTIVE</span>
								</span>
							</div>

							<div className="text-fg-secondary mt-4 space-y-2.5">
								<div className="text-foreground">
									<span className="text-primary font-bold">
										content_request:
									</span>{" "}
									&gt; Create a high-converting landing page
								</div>

								<div className="text-fg-tertiary space-y-1 pl-3 text-[11px]">
									<div>processing…</div>
									<div>→ analyzing target audience</div>
									<div>→ structuring content hierarchy</div>
									<div>→ optimizing messaging clarity</div>
								</div>

								<div className="border-border/30 text-foreground border-t pt-2">
									<span className="font-bold text-emerald-600 dark:text-emerald-400">
										output:
									</span>
									<div className="text-fg-secondary space-y-0.5 pl-3 text-[11px]">
										<div>+ compelling value proposition headline</div>
										<div>+ benefit-driven modular features</div>
										<div>+ conversion-focused social proof copy</div>
									</div>
								</div>

								<div className="mt-3 flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-2 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
									<CheckCircle2 className="size-3.5" />
									<span>status: ready to publish ✓</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
