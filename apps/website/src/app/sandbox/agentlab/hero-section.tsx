"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	ArrowRight,
	Database,
	Headphones,
	Mail,
	Send,
	Sparkles,
} from "lucide-react"
import Image from "next/image"
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
import { TextArea } from "@/styles/default/ui/text-area"

const promptFormSchema = z.object({
	prompt: z.string().min(2, "Please enter at least 2 characters."),
})

type PromptFormValues = z.infer<typeof promptFormSchema>

interface AgentActionItem {
	id: string
	label: string
	icon: React.ComponentType<{ className?: string }>
}

const agentActions: AgentActionItem[] = [
	{ id: "sales", label: "SALES LEAD QUALIFIER", icon: Sparkles },
	{ id: "data", label: "DATA ANALYSIS AGENT", icon: Database },
	{ id: "email", label: "EMAIL RESPONDER", icon: Mail },
	{ id: "support", label: "CUSTOMER SUPPORT AGENT", icon: Headphones },
]

export function AgentlabHeroSection() {
	const [activeAction, setActiveAction] = useState("sales")
	const [submittedPrompt, setSubmittedPrompt] = useState<string | null>(null)

	const form = useForm<PromptFormValues>({
		resolver: zodResolver(promptFormSchema),
		defaultValues: {
			prompt: "",
		},
	})

	function onSubmit(values: PromptFormValues) {
		setSubmittedPrompt(values.prompt)
		form.reset()
	}

	return (
		<section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24">
			<div className="mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8">
				{/* Y Combinator Badge */}
				<div className="border-border/80 bg-fill2/70 mb-6 inline-flex items-center gap-2 rounded-md border px-3 py-1.5 backdrop-blur-xs">
					<div className="bg-orange flex size-4 items-center justify-center rounded-xs font-mono text-[10px] font-black text-white">
						Y
					</div>
					<span className="text-fg-secondary text-xs font-semibold tracking-wider uppercase">
						BACKED BY Y COMBINATOR
					</span>
				</div>

				{/* Headline (Rule 13: heading-1) */}
				<h1 className="heading-1 max-w-4xl text-center font-serif">
					Turn Your AI Product Into a
					<br className="hidden sm:inline" /> Website That Sells
				</h1>

				{/* Subtitle */}
				<p className="text-fg-secondary mt-5 max-w-2xl text-center text-sm leading-relaxed sm:text-base md:text-lg">
					Create intelligent agents that understand context, automate workflows,
					and execute tasks reliably across your operations.
				</p>

				{/* CTA Buttons (Rule 15: color prop on every Button) */}
				<div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
					<Button variant="outline" color="neutral" size="40">
						<span>TALK TO SALES</span>
					</Button>
					<Button variant="strong" color="neutral" size="40">
						<ArrowRight className="size-4" />
						<span>START FOR FREE</span>
					</Button>
				</div>

				{/* Hero Visuals Grid */}
				<div className="mt-12 grid w-full grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
					{/* Left Visual: 3D Cubes + Floating Agent Card */}
					<div className="border-border/60 bg-fill2 relative flex min-h-[460px] flex-col justify-center overflow-hidden rounded-2xl border p-6 shadow-xl sm:p-8 lg:col-span-8">
						{/* Background 3D isometric mockup */}
						<div className="absolute inset-0 -z-10">
							<Image
								src="https://framerusercontent.com/images/uJE8NQyYXC4kBsQ6uhdSVoUQPzM.png"
								alt="3D Crystal AI Agent Foundation"
								fill
								sizes="(max-width: 1024px) 100vw, 66vw"
								className="object-cover object-center"
								priority
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
						</div>

						{/* Floating Automation Card */}
						<div className="relative mx-auto w-full max-w-md rounded-xl border border-white/40 bg-white/95 p-5 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-black/90">
							<p className="text-fg-secondary text-xs font-bold tracking-wider uppercase">
								AUTOMATE TASKS WITH AI AGENT
							</p>

							{/* Interactive Prompt Form (Rules 2 & 3: Form with Zod validation) */}
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="relative mt-3">
									<FormField
										control={form.control}
										name="prompt"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<div className="relative">
														<TextArea
															{...field}
															rows={3}
															placeholder="How can I help you today?"
														/>
														<Button
															type="submit"
															variant="strong"
															color="neutral"
															size="28"
															className="absolute right-2.5 bottom-2.5 size-7 rounded-md p-0">
															<Send className="size-3.5" />
															<span className="sr-only">Send prompt</span>
														</Button>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</form>
							</Form>

							{submittedPrompt && (
								<p className="text-primary mt-2 text-xs font-medium">
									Agent queued: &quot;{submittedPrompt}&quot;
								</p>
							)}

							{/* Actions List (Rule 18: mapped array) */}
							<div className="mt-4">
								<p className="text-fg-tertiary text-[11px] font-semibold tracking-wider uppercase">
									ACTIONS
								</p>
								<div className="mt-2 space-y-1.5">
									{agentActions.map((action) => {
										const Icon = action.icon
										const isSelected = activeAction === action.id
										return (
											<button
												key={action.id}
												type="button"
												onClick={() => setActiveAction(action.id)}
												className={`flex w-full items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-xs font-semibold tracking-wide transition-all ${
													isSelected
														? "border-border bg-fill2 text-fg shadow-xs"
														: "bg-fill1/60 text-fg-secondary hover:bg-fill2 border-transparent"
												}`}>
												<div className="bg-black-inverse text-white-inverse flex size-5 shrink-0 items-center justify-center rounded-sm">
													<Icon className="size-3" />
												</div>
												<span>{action.label}</span>
											</button>
										)
									})}
								</div>
							</div>
						</div>
					</div>

					{/* Right Visual: Portrait Image */}
					<div className="border-border/60 bg-fill2 relative min-h-[460px] overflow-hidden rounded-2xl border shadow-xl lg:col-span-4">
						<Image
							src="https://framerusercontent.com/images/wJo5NFOD9xOtFS68OXbtzXivQ0.png"
							alt="Engineer monitoring AI agents"
							fill
							sizes="(max-width: 1024px) 100vw, 33vw"
							className="object-cover object-center"
							priority
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
					</div>
				</div>
			</div>
		</section>
	)
}
