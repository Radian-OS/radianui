"use client"

import React from "react"
import {
	ArrowRight,
	Bot,
	CheckCircle2,
	Clock,
	Sparkles,
	TrendingUp,
} from "lucide-react"
import Image from "next/image"

export function AgentlabSolutionSection() {
	return (
		<section id="product" className="relative overflow-hidden py-24 md:py-32">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Top Section Headline (Rule 13: heading-2) */}
				<div className="text-center">
					<h2 className="heading-2 text-fg mx-auto max-w-4xl font-serif text-3xl font-normal leading-[1.18] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
						Eliminate Operational Friction, Cut Manual Errors, and Increase
						Deployment Speed by 10x with Enterprise-Grade AI Agent
						Infrastructure
					</h2>
				</div>

				{/* Feature 1: Agent Builder */}
				<div className="mt-20 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
					{/* Left Text */}
					<div className="lg:col-span-5">
						<div className="border-border/80 bg-fill2/70 text-fg-secondary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider">
							<span className="text-primary font-bold">—</span>
							<span>AGENT BUILDER</span>
						</div>
						<h3 className="heading-3 text-fg mt-4 font-serif text-2xl font-normal tracking-tight sm:text-3xl md:text-4xl">
							Build and Deploy Agents in Minutes
						</h3>
						<p className="text-fg-secondary mt-4 text-sm leading-relaxed sm:text-base">
							Design intelligent agents with a visual builder — no coding
							required. Define triggers, actions, and logic with an intuitive
							drag-and-drop interface.
						</p>

						<div className="mt-6 space-y-3">
							{[
								"Natural language prompt-to-agent generation",
								"Pre-configured logic templates for sales and support",
								"One-click deployment to cloud infrastructure",
							].map((item) => (
								<div
									key={item}
									className="text-fg-secondary flex items-center gap-2.5 text-xs sm:text-sm">
									<CheckCircle2 className="text-primary size-4 shrink-0" />
									<span>{item}</span>
								</div>
							))}
						</div>
					</div>

					{/* Right Interactive Mockup Graphic */}
					<div className="border-border/60 bg-fill2 relative min-h-[420px] overflow-hidden rounded-2xl border p-6 shadow-xl sm:p-8 lg:col-span-7">
						<div className="absolute inset-0 -z-10">
							<Image
								src="https://framerusercontent.com/images/i6BW3QgDJgD0jVkXifqeODXE59c.png"
								alt="Agent Builder Preview Graphic"
								fill
								sizes="(max-width: 1024px) 100vw, 58vw"
								className="object-cover object-center"
							/>
						</div>

						{/* Support Agent Card Overlay */}
						<div className="relative mx-auto mt-4 w-full max-w-md rounded-xl border border-white/40 bg-white/95 p-5 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-black/90">
							<div className="border-border/60 flex items-center justify-between border-b pb-3">
								<span className="text-fg-secondary text-xs font-bold uppercase tracking-wider">
									SUPPORT AGENT
								</span>
								<span className="flex size-2 animate-pulse rounded-full bg-emerald-500" />
							</div>

							<div className="mt-4 space-y-3">
								{/* Bot Message */}
								<div className="flex items-start gap-2.5">
									<div className="bg-primary flex size-6 shrink-0 items-center justify-center rounded-sm text-white">
										<Sparkles className="size-3.5" />
									</div>
									<div className="border-border/60 bg-fill2 text-fg rounded-lg rounded-tl-none border p-3 text-xs">
										Hello! Describe the agent you want to build.
									</div>
								</div>

								{/* User Message */}
								<div className="flex items-end justify-end gap-2.5">
									<div className="bg-black-inverse text-white-inverse rounded-lg rounded-tr-none p-3 text-xs shadow-sm">
										Handle customer order updates and returns
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Feature 2: Workflow Automation */}
				<div className="mt-28 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
					{/* Left Mockup Graphic */}
					<div className="border-border/60 bg-fill2 relative order-2 min-h-[420px] overflow-hidden rounded-2xl border p-6 shadow-xl sm:p-8 lg:order-1 lg:col-span-7">
						<div className="absolute inset-0 -z-10">
							<Image
								src="https://framerusercontent.com/images/xQagQ8uubfx7UqGyS04prpQ8IEE.png"
								alt="Workflow Automation Preview"
								fill
								sizes="(max-width: 1024px) 100vw, 58vw"
								className="object-cover object-center"
							/>
						</div>

						{/* Workflow Execution Card Overlay */}
						<div className="relative mx-auto mt-4 w-full max-w-md rounded-xl border border-white/40 bg-white/95 p-5 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-black/90">
							<div className="border-border/60 flex items-center justify-between border-b pb-3">
								<span className="text-fg text-xs font-bold uppercase tracking-wider">
									WORKFLOW - RUNNING
								</span>
								<span className="text-primary text-xs font-medium">
									Lead Enrichment
								</span>
							</div>

							<div className="mt-4 space-y-2.5">
								{[
									{ label: "Trigger: New Lead", done: true },
									{ label: "Enrich lead data via API", done: true },
									{ label: "Score & qualify lead", done: true },
									{ label: "Route to sales team", done: false },
									{ label: "Log activity to CRM", done: false },
								].map((step) => (
									<div
										key={step.label}
										className={`flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-medium ${
											step.done
												? "bg-fill2 text-fg"
												: "text-fg-tertiary opacity-70"
										}`}>
										<div
											className={`flex size-4 items-center justify-center rounded-full ${
												step.done
													? "bg-black-inverse text-white-inverse"
													: "border-border border"
											}`}>
											{step.done && <CheckCircle2 className="size-3" />}
										</div>
										<span>{step.label}</span>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Right Text */}
					<div className="order-1 lg:order-2 lg:col-span-5">
						<div className="border-border/80 bg-fill2/70 text-fg-secondary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider">
							<span className="text-primary font-bold">—</span>
							<span>WORKFLOW AUTOMATION</span>
						</div>
						<h3 className="heading-3 text-fg mt-4 font-serif text-2xl font-normal tracking-tight sm:text-3xl md:text-4xl">
							Automate Complex Multi-Step Workflows
						</h3>
						<p className="text-fg-secondary mt-4 text-sm leading-relaxed sm:text-base">
							Deploy intelligent AI agents that understand your business
							context, coordinate complex workflows, and execute tasks with
							unprecedented precision.
						</p>

						<div className="text-fg hover:text-primary mt-6 flex items-center gap-2 text-xs font-semibold transition-colors sm:text-sm">
							<ArrowRight className="text-primary size-4" />
							<span>Automated workflow orchestration with error fallback</span>
						</div>
					</div>
				</div>

				{/* Feature 3: Analytics & Insights */}
				<div className="mt-28 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
					{/* Left Text */}
					<div className="lg:col-span-5">
						<div className="border-border/80 bg-fill2/70 text-fg-secondary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider">
							<span className="text-primary font-bold">—</span>
							<span>ANALYTICS &amp; INSIGHTS</span>
						</div>
						<h3 className="heading-3 text-fg mt-4 font-serif text-2xl font-normal tracking-tight sm:text-3xl md:text-4xl">
							Monitor Agent Performance in Real Time
						</h3>
						<p className="text-fg-secondary mt-4 text-sm leading-relaxed sm:text-base">
							Track performance metrics, identify bottlenecks, and optimize
							agent efficiency with real-time analytics.
						</p>

						<div className="text-fg hover:text-primary mt-6 flex items-center gap-2 text-xs font-semibold transition-colors sm:text-sm">
							<ArrowRight className="text-primary size-4" />
							<span>Real-time performance monitoring and latency alerts</span>
						</div>
					</div>

					{/* Right Graphic */}
					<div className="border-border/60 bg-fill2 relative min-h-[420px] overflow-hidden rounded-2xl border p-6 shadow-xl sm:p-8 lg:col-span-7">
						<div className="absolute inset-0 -z-10">
							<Image
								src="https://framerusercontent.com/images/CXipLKeSIdL0cDkxv4uZJivb2E.png"
								alt="Analytics Background Graphic"
								fill
								sizes="(max-width: 1024px) 100vw, 58vw"
								className="object-cover object-center"
							/>
						</div>

						{/* Analytics Card Overlay */}
						<div className="relative mx-auto mt-4 w-full max-w-md rounded-xl border border-white/40 bg-white/95 p-5 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-black/90">
							<p className="text-fg-secondary text-xs font-bold uppercase tracking-wider">
								ANALYTICS OVERVIEW
							</p>

							{/* Key Numbers Grid */}
							<div className="border-border/60 mt-4 grid grid-cols-3 gap-2 border-b pb-4 text-center">
								<div>
									<div className="text-fg text-lg font-bold">1,247</div>
									<div className="text-fg-tertiary text-[10px]">
										Tasks Today
									</div>
								</div>
								<div>
									<div className="text-fg text-lg font-bold">98.4%</div>
									<div className="text-fg-tertiary text-[10px]">
										Success Rate
									</div>
								</div>
								<div>
									<div className="text-fg text-lg font-bold">1.2s</div>
									<div className="text-fg-tertiary text-[10px]">
										Avg Duration
									</div>
								</div>
							</div>

							{/* Simulated Activity Bar Chart (Rule 18: mapped array) */}
							<div className="mt-4">
								<p className="text-fg-tertiary text-[11px] font-medium">
									Task volume — last 12 hours
								</p>
								<div className="mt-2.5 flex h-14 items-end gap-1.5">
									{[35, 60, 45, 80, 50, 90, 70, 95, 65, 85, 75, 100].map(
										(height, idx) => (
											<div
												key={idx}
												className="rounded-xs bg-black-inverse hover:bg-primary w-full transition-all duration-300"
												style={{ height: `${height}%` }}
											/>
										)
									)}
								</div>
							</div>

							<div className="border-border/60 mt-4 flex items-center justify-between border-t pt-3 text-xs">
								<div className="flex items-center gap-2">
									<span className="size-2 rounded-full bg-emerald-500" />
									<span className="text-fg font-medium">Research Agent</span>
								</div>
								<span className="text-fg font-bold">342 tasks</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
