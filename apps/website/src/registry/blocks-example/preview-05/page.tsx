"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
	ArrowRight,
	ArrowUpRight,
	Bot,
	CheckCircle2,
	ChevronDown,
	Database,
	Headphones,
	Lock,
	Mail,
	Menu,
	Minus,
	Plus,
	Send,
	Server,
	Sparkles,
	TrendingUp,
	X,
} from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/styles/default/ui/form"
import { TextArea } from "@/styles/default/ui/text-area"
import { cn } from "@/lib/utils"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/registry/ui/navigation-menu"
import { Merriweather } from "next/font/google"
import {
	Banner,
	BannerDescription,
	BannerIcon,
} from "@/styles/default/ui/banner"

export function AgentlabAnnouncementBar() {
	return (
		<Banner
			id="announcement-bar"
			aria-label="Announcement"
			data-themer-id="auto-aside-1"
			variant="strong">
			<BannerIcon>
				<ArrowRight
					className="size-3.5 shrink-0"
					data-themer-id="auto-arrowright-4"
				/>
			</BannerIcon>
			<BannerDescription data-themer-id="auto-link-2">
				<span data-themer-id="auto-span-3">
					AgentLab Raises $5M+ Seed to Build the Future
				</span>
			</BannerDescription>
		</Banner>
	)
}

export function AgentlabCtaBanner() {
	return (
		<section
			id="cta-banner"
			className="bg-black-inverse text-white-inverse relative overflow-hidden py-24 md:py-32"
			data-themer-id="auto-section-5">
			{/* Subtle ambient glow */}
			<div
				className="bg-primary/20 pointer-events-none absolute top-1/2 left-1/2 -z-10 h-96 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
				data-themer-id="auto-div-6"
			/>

			<div
				className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
				data-themer-id="auto-div-7">
				<div
					className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16"
					data-themer-id="auto-div-8">
					{/* Left Title */}
					<div className="lg:col-span-6" data-themer-id="auto-div-9">
						<h2 className="heading-2" data-themer-id="auto-h2-10">
							Ready to Automate your Workflow?
						</h2>
					</div>

					{/* Right Content & Actions */}
					<div
						className="flex flex-col items-start lg:col-span-6"
						data-themer-id="auto-div-11">
						<p
							className="text-sm leading-relaxed text-white/70 sm:text-base"
							data-themer-id="auto-p-12">
							Deploy intelligent agents, eliminate repetitive manual steps,
							reduce operational costs, and deliver results faster than ever
							before.
						</p>

						<div
							className="mt-8 flex flex-wrap items-center gap-4"
							data-themer-id="auto-div-13">
							<Button
								variant="strong"
								color="neutral"
								size="40"
								className="gap-2 rounded-md bg-white font-bold uppercase shadow-lg active:scale-95"
								data-themer-id="auto-button-14">
								<ArrowRight
									className="size-4"
									data-themer-id="auto-arrowright-15"
								/>
								<span data-themer-id="auto-span-16">TALK TO SALES</span>
							</Button>

							<Button
								variant="outline"
								color="neutral"
								size="40"
								className="rounded-md border-white/30 bg-transparent text-xs font-bold tracking-wider text-white uppercase hover:bg-white/10"
								data-themer-id="auto-button-17">
								<span data-themer-id="auto-span-18">VIEW PRICING</span>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

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
			className="border-border/60 bg-fill1/30 border-t py-24 md:py-32"
			data-themer-id="auto-section-19">
			<div
				className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
				data-themer-id="auto-div-20">
				<div
					className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16"
					data-themer-id="auto-div-21">
					{/* Left Title Column */}
					<div className="lg:col-span-5" data-themer-id="auto-div-22">
						<div
							className="border-border/80 bg-fill2/70 text-fg-secondary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase"
							data-themer-id="auto-div-23">
							<span
								className="text-primary font-bold"
								data-themer-id="auto-span-24">
								—
							</span>
							<span data-themer-id="auto-span-25">FAQS</span>
						</div>
						<h2 className="heading-2" data-themer-id="auto-h2-26">
							Have questions?
							<br data-themer-id="auto-br-27" />
							Find answers
						</h2>
						<p
							className="text-fg-secondary mt-4 text-sm leading-relaxed sm:text-base"
							data-themer-id="auto-p-28">
							Everything you need to know about the AgentLab platform, security
							protocols, integrations, and deployment options.
						</p>
					</div>

					{/* Right Accordion List (Rule 18: mapped array) */}
					<div
						className="divide-border/60 border-border/60 divide-y border-y lg:col-span-7"
						data-themer-id="auto-div-29">
						{faqs.map((faq, idx) => {
							const isOpen = openIdx === idx
							return (
								<div
									key={faq.question}
									className="py-6 transition-colors"
									data-themer-id="auto-div-30">
									<button
										type="button"
										onClick={() => toggle(idx)}
										className="text-fg hover:text-primary flex w-full items-start justify-between gap-4 text-left transition-colors"
										data-themer-id="auto-button-31">
										<span
											className="heading-4 font-serif text-lg font-normal sm:text-xl"
											data-themer-id="auto-span-32">
											{faq.question}
										</span>
										<div
											className="border-border bg-fill2 text-fg flex size-7 shrink-0 items-center justify-center rounded-full border"
											data-themer-id="auto-div-33">
											{isOpen ? (
												<Minus
													className="size-3.5"
													data-themer-id="auto-minus-34"
												/>
											) : (
												<Plus
													className="size-3.5"
													data-themer-id="auto-plus-35"
												/>
											)}
										</div>
									</button>

									{isOpen && (
										<p
											className="text-fg-secondary mt-4 text-xs leading-relaxed sm:text-sm"
											data-themer-id="auto-p-36">
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
		<footer
			id="footer"
			className="bg-black-inverse text-white-inverse border-t border-white/10 py-16 md:py-24"
			data-themer-id="auto-footer-37">
			<div
				className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
				data-themer-id="auto-div-38">
				<div
					className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16"
					data-themer-id="auto-div-39">
					{/* Brand Column */}
					<div
						className="flex flex-col justify-between lg:col-span-4"
						data-themer-id="auto-div-40">
						<div data-themer-id="auto-div-41">
							<Link
								href="/sandbox/agentlab"
								className="flex items-center gap-2.5 transition-opacity hover:underline hover:opacity-90"
								data-themer-id="auto-link-42">
								<div
									className="relative flex size-6 items-center justify-center"
									data-themer-id="auto-div-43">
									<Image
										src="https://framerusercontent.com/images/D2lhgnJj2kr5EiY0FgikXyptXco.svg"
										alt="AgentLab White Logo"
										width={24}
										height={24}
										className="size-6 object-contain brightness-0 invert"
										data-themer-id="auto-image-44"
									/>
								</div>
								<span
									className="font-heading text-xl font-bold tracking-tight text-white"
									data-themer-id="auto-span-45">
									AgentLab
								</span>
							</Link>

							<p
								className="mt-4 max-w-xs text-xs leading-relaxed text-white/60 sm:text-sm"
								data-themer-id="auto-p-46">
								Building the future of intelligent automation with AI agents
								that think, act, and deliver across enterprise operations.
							</p>
						</div>

						<p
							className="mt-8 text-xs text-white/40 sm:mt-12"
							data-themer-id="auto-p-47">
							&copy; {new Date().getFullYear()} Design &amp; Developed by{" "}
							<span
								className="font-medium text-white/70"
								data-themer-id="auto-span-48">
								Amani Design
							</span>
						</p>
					</div>

					{/* 4 Link Columns (Rule 18: mapped array) */}
					<div
						className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8"
						data-themer-id="auto-div-49">
						{footerColumns.map((col) => (
							<div key={col.title} data-themer-id="auto-div-50">
								<p
									className="text-xs font-bold tracking-wider text-white uppercase"
									data-themer-id="auto-p-51">
									{col.title}
								</p>
								<ul className="mt-4 space-y-2.5" data-themer-id="auto-ul-52">
									{col.links.map((link) => (
										<li key={link.label} data-themer-id="auto-li-53">
											<Link
												href={link.href}
												className="text-xs text-white/60 transition-colors hover:text-white hover:underline"
												data-themer-id="auto-link-54">
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
		<section
			id="hero-section"
			className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24"
			data-themer-id="auto-section-55">
			<div
				className="mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8"
				data-themer-id="auto-div-56">
				{/* Y Combinator Badge */}
				<div
					className="border-border/80 bg-fill2/70 mb-6 inline-flex items-center gap-2 rounded-md border px-3 py-1.5 backdrop-blur-xs"
					data-themer-id="auto-div-57">
					<div
						className="bg-orange flex size-4 items-center justify-center rounded-xs font-mono text-[10px] font-black text-white"
						data-themer-id="auto-div-58">
						Y
					</div>
					<span
						className="text-fg-secondary text-xs font-semibold tracking-wider uppercase"
						data-themer-id="auto-span-59">
						BACKED BY Y COMBINATOR
					</span>
				</div>

				{/* Headline (Rule 13: heading-1) */}
				<h1
					className="heading-1 max-w-4xl text-center font-serif"
					data-themer-id="auto-h1-60">
					Turn Your AI Product Into a
					<br className="hidden sm:inline" data-themer-id="auto-br-61" />{" "}
					Website That Sells
				</h1>

				{/* Subtitle */}
				<p
					className="text-fg-secondary mt-5 max-w-2xl text-center text-sm leading-relaxed sm:text-base md:text-lg"
					data-themer-id="auto-p-62">
					Create intelligent agents that understand context, automate workflows,
					and execute tasks reliably across your operations.
				</p>

				{/* CTA Buttons (Rule 15: color prop on every Button) */}
				<div
					className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
					data-themer-id="auto-div-63">
					<Button
						variant="outline"
						color="neutral"
						size="40"
						data-themer-id="auto-button-64">
						<span data-themer-id="auto-span-65">TALK TO SALES</span>
					</Button>
					<Button
						variant="strong"
						color="neutral"
						size="40"
						data-themer-id="auto-button-66">
						<ArrowRight
							className="size-4"
							data-themer-id="auto-arrowright-67"
						/>
						<span data-themer-id="auto-span-68">START FOR FREE</span>
					</Button>
				</div>

				{/* Hero Visuals Grid */}
				<div
					className="mt-12 grid w-full grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8"
					data-themer-id="auto-div-69">
					{/* Left Visual: 3D Cubes + Floating Agent Card */}
					<div
						className="border-border/60 bg-fill2 relative flex min-h-[460px] flex-col justify-center overflow-hidden rounded-2xl border p-6 shadow-xl sm:p-8 lg:col-span-8"
						data-themer-id="auto-div-70">
						{/* Background 3D isometric mockup */}
						<div
							className="absolute inset-0 -z-10"
							data-themer-id="auto-div-71">
							<Image
								src="https://framerusercontent.com/images/uJE8NQyYXC4kBsQ6uhdSVoUQPzM.png"
								alt="3D Crystal AI Agent Foundation"
								fill
								sizes="(max-width: 1024px) 100vw, 66vw"
								className="object-cover object-center"
								priority
								data-themer-id="auto-image-72"
							/>
							<div
								className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
								data-themer-id="auto-div-73"
							/>
						</div>

						{/* Floating Automation Card */}
						<div
							className="relative mx-auto w-full max-w-md rounded-xl border border-white/40 bg-white/95 p-5 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-black/90"
							data-themer-id="auto-div-74">
							<p
								className="text-fg-secondary text-xs font-bold tracking-wider uppercase"
								data-themer-id="auto-p-75">
								AUTOMATE TASKS WITH AI AGENT
							</p>

							{/* Interactive Prompt Form (Rules 2 & 3: Form with Zod validation) */}
							<Form {...form} data-themer-id="auto-form-76">
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="relative mt-3"
									data-themer-id="auto-form-77">
									<FormField
										control={form.control}
										name="prompt"
										render={({ field }) => (
											<FormItem data-themer-id="auto-formitem-79">
												<FormControl data-themer-id="auto-formcontrol-80">
													<div
														className="relative"
														data-themer-id="auto-div-81">
														<TextArea
															{...field}
															rows={3}
															placeholder="How can I help you today?"
															data-themer-id="auto-textarea-82"
														/>
														<Button
															type="submit"
															variant="strong"
															color="neutral"
															size="28"
															className="absolute right-2.5 bottom-2.5 size-7 rounded-md p-0"
															data-themer-id="auto-button-83">
															<Send
																className="size-3.5"
																data-themer-id="auto-send-84"
															/>
															<span
																className="sr-only"
																data-themer-id="auto-span-85">
																Send prompt
															</span>
														</Button>
													</div>
												</FormControl>
												<FormMessage data-themer-id="auto-formmessage-86" />
											</FormItem>
										)}
										data-themer-id="auto-formfield-78"
									/>
								</form>
							</Form>

							{submittedPrompt && (
								<p
									className="text-primary mt-2 text-xs font-medium"
									data-themer-id="auto-p-87">
									Agent queued: &quot;{submittedPrompt}&quot;
								</p>
							)}

							{/* Actions List (Rule 18: mapped array) */}
							<div className="mt-4" data-themer-id="auto-div-88">
								<p
									className="text-fg-tertiary text-[11px] font-semibold tracking-wider uppercase"
									data-themer-id="auto-p-89">
									ACTIONS
								</p>
								<div className="mt-2 space-y-1.5" data-themer-id="auto-div-90">
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
												}`}
												data-themer-id="auto-button-91">
												<div
													className="bg-black-inverse text-white-inverse flex size-5 shrink-0 items-center justify-center rounded-sm"
													data-themer-id="auto-div-92">
													<Icon
														className="size-3"
														data-themer-id="auto-icon-93"
													/>
												</div>
												<span data-themer-id="auto-span-94">
													{action.label}
												</span>
											</button>
										)
									})}
								</div>
							</div>
						</div>
					</div>

					{/* Right Visual: Portrait Image */}
					<div
						className="border-border/60 bg-fill2 relative min-h-[460px] overflow-hidden rounded-2xl border shadow-xl lg:col-span-4"
						data-themer-id="auto-div-95">
						<Image
							src="https://framerusercontent.com/images/wJo5NFOD9xOtFS68OXbtzXivQ0.png"
							alt="Engineer monitoring AI agents"
							fill
							sizes="(max-width: 1024px) 100vw, 33vw"
							className="object-cover object-center"
							priority
							data-themer-id="auto-image-96"
						/>
						<div
							className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
							data-themer-id="auto-div-97"
						/>
					</div>
				</div>
			</div>
		</section>
	)
}

interface IndustryItem {
	title: string
	description: string
	imageUrl: string
}

const industries: IndustryItem[] = [
	{
		title: "Finance",
		description:
			"Automate account inquiries and fraud detection while maintaining SOC 2 compliance.",
		imageUrl:
			"https://framerusercontent.com/images/AQbPdqKasj6Mg3iV4jMK95WPRCM.png",
	},
	{
		title: "Healthcare",
		description:
			"Patient scheduling, prescription refills, and care coordination with full HIPAA compliance standards.",
		imageUrl:
			"https://framerusercontent.com/images/SmH4euiZ3JokwWRNyZrJQyLtlLY.png",
	},
	{
		title: "E-commerce",
		description:
			"Handle order tracking, returns processing, and product recommendations at scale during peak seasons.",
		imageUrl:
			"https://framerusercontent.com/images/wdhlHkmmD4nzkOj8GrECeEq108.png",
	},
	{
		title: "Education",
		description:
			"Student enrollment support and course recommendations for modern learning platforms.",
		imageUrl:
			"https://framerusercontent.com/images/JQzWA4NShfz9Wnr2WD5YRTj9A.png",
	},
	{
		title: "Enterprise",
		description:
			"IT helpdesk automation, employee onboarding workflows, and internal request management at scale.",
		imageUrl:
			"https://framerusercontent.com/images/pdhZaMaOSIzBG5FaYTQR034OyRk.png",
	},
	{
		title: "Insurance",
		description:
			"Claims status updates, policy inquiries, and document collection with secure data handling protocols.",
		imageUrl:
			"https://framerusercontent.com/images/sGnTnbdWuAoVaLMV90SkJYNLAWM.png",
	},
]

export function AgentlabIndustrySection() {
	return (
		<section
			id="industry-section"
			className="border-border/60 bg-bg border-t py-24 md:py-32"
			data-themer-id="auto-section-98">
			<div
				className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
				data-themer-id="auto-div-99">
				{/* Category Badge */}
				<div
					className="border-border/80 bg-fill2/70 text-fg-secondary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase"
					data-themer-id="auto-div-100">
					<span
						className="text-primary font-bold"
						data-themer-id="auto-span-101">
						—
					</span>
					<span data-themer-id="auto-span-102">INDUSTRY</span>
				</div>

				{/* Section Heading (Rule 13: heading-2) */}
				<h2
					className="heading-2 text-fg mt-4 font-serif"
					data-themer-id="auto-h2-103">
					Solutions Across Every Sector
				</h2>

				{/* 3x2 Grid (Rule 18: mapped array) */}
				<div
					className="divide-border/60 border-border/60 mt-14 grid grid-cols-1 divide-y border-y sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3"
					data-themer-id="auto-div-104">
					{industries.map((item, idx) => (
						<div
							key={item.title}
							className={`hover:bg-fill1/50 group p-8 transition-colors ${
								idx >= 3 ? "sm:border-border/60 sm:border-t" : ""
							}`}
							data-themer-id="auto-div-105">
							{/* Icon Square */}
							<div
								className="bg-primary/10 relative mb-6 size-20 overflow-hidden rounded-xl shadow-xs transition-transform duration-300 group-hover:scale-105"
								data-themer-id="auto-div-106">
								<Image
									src={item.imageUrl}
									alt={item.title}
									fill
									sizes="80px"
									className="object-contain p-2"
									data-themer-id="auto-image-107"
								/>
							</div>

							<h3
								className="heading-4 text-fg font-serif"
								data-themer-id="auto-h3-108">
								{item.title}
							</h3>
							<p
								className="text-fg-secondary mt-3 text-xs leading-relaxed sm:text-sm"
								data-themer-id="auto-p-109">
								{item.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

interface BrandLogo {
	name: string
	url: string
	width: number
	height: number
}

const brandLogos: BrandLogo[] = [
	{
		name: "Craftgram",
		url: "https://framerusercontent.com/images/0tQJ7SlKdpCZUVbUjxOEy57XRhA.svg",
		width: 96,
		height: 30,
	},
	{
		name: "Pulse",
		url: "https://framerusercontent.com/images/hsbt5NG4UUe3LO7ERSFGv8A0PrA.svg",
		width: 94,
		height: 27,
	},
	{
		name: "Swift",
		url: "https://framerusercontent.com/images/O7fimt1JVKhKUjjZOGgeAWTdLQ.svg",
		width: 120,
		height: 25,
	},
	{
		name: "ZenZap",
		url: "https://framerusercontent.com/images/yg73mxfKVqYxGdl9PXd5goIE.svg",
		width: 80,
		height: 21,
	},
	{
		name: "Sparkle",
		url: "https://framerusercontent.com/images/6Fbv7vEmmB0WPOWiVDEZNhoZ0.svg",
		width: 68,
		height: 19,
	},
	{
		name: "ZenZap Duplicate",
		url: "https://framerusercontent.com/images/yg73mxfKVqYxGdl9PXd5goIE.svg",
		width: 80,
		height: 21,
	},
]

export function AgentlabLogoMarquee() {
	return (
		<section
			id="logo-marquee"
			className="border-border/60 bg-bg/50 border-y py-10"
			data-themer-id="auto-section-110">
			<div
				className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
				data-themer-id="auto-div-111">
				<div
					className="flex flex-wrap items-center justify-around gap-8 sm:gap-12 md:gap-16"
					data-themer-id="auto-div-112">
					{brandLogos.map((logo, index) => (
						<div
							key={`${logo.name}-${index}`}
							className="flex items-center justify-center opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 dark:invert"
							data-themer-id="auto-div-113">
							<Image
								src={logo.url}
								alt={logo.name}
								width={logo.width}
								height={logo.height}
								className="h-7 w-auto object-contain"
								data-themer-id="auto-image-114"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

const tagRow1 = [
	"Analyze feedback",
	"Enhance experience",
	"Streamline processes",
	"Educate users",
	"Offer support",
	"Implement IT support",
	"Help customers",
	"Resolve issues",
]

const tagRow2 = [
	"Generate copy",
	"Streamline processes",
	"Summarize emails",
	"Prepare for calls",
	"Implement IT support",
	"Help customers",
	"Enhance experience",
	"Sync database",
]

export function AgentlabMultiModelSection() {
	return (
		<section
			id="multi-model-section"
			className="bg-black-inverse text-white-inverse relative overflow-hidden py-20 md:py-28"
			data-themer-id="auto-section-115">
			<div
				className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
				data-themer-id="auto-div-116">
				{/* Two Column Header */}
				<div
					className="grid grid-cols-1 gap-12 border-b border-white/10 pb-16 md:grid-cols-2 md:gap-16"
					data-themer-id="auto-div-117">
					<div data-themer-id="auto-div-118">
						<h3
							className="heading-3 font-serif text-white"
							data-themer-id="auto-h3-119">
							Multi Model AI
						</h3>
						<p
							className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base"
							data-themer-id="auto-p-120">
							Route tasks intelligently to the right AI model — GPT, Claude,
							DALL-E, or ElevenLabs — based on task type, latency targets, and
							performance goals.
						</p>
					</div>

					<div data-themer-id="auto-div-121">
						<h3
							className="heading-3 font-serif text-white"
							data-themer-id="auto-h3-122">
							Integration
						</h3>
						<p
							className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base"
							data-themer-id="auto-p-123">
							Connect AgentLab to the tools your team already uses — CRMs,
							support desks, communication hubs, and databases — with native
							integrations in just clicks.
						</p>
					</div>
				</div>

				{/* Animated / Styled Pill Marquee (Rule 18: mapped array) */}
				<div
					className="mt-14 flex flex-col gap-3.5 overflow-hidden"
					data-themer-id="auto-div-124">
					<div
						className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
						data-themer-id="auto-div-125">
						{tagRow1.map((tag, idx) => (
							<span
								key={`r1-${idx}`}
								className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 transition-colors hover:border-white/30 hover:bg-white/10"
								data-themer-id="auto-span-126">
								{tag}
							</span>
						))}
					</div>

					<div
						className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
						data-themer-id="auto-div-127">
						{tagRow2.map((tag, idx) => (
							<span
								key={`r2-${idx}`}
								className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 transition-colors hover:border-white/30 hover:bg-white/10"
								data-themer-id="auto-span-128">
								{tag}
							</span>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

interface NavLinkItem {
	label: string
	href: string
	hasDropdown?: boolean
}

const navLinks: NavLinkItem[] = [
	{ label: "Product", href: "#product" },
	{ label: "Case Study", href: "#case-study" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "Company", href: "#company", hasDropdown: true },
]

const companyLinks = [
	{
		label: "About Us",
		href: "#about",
		description: "Learn more about our mission and the team behind AgentLab.",
	},
	{
		label: "Security & Compliance",
		href: "#security",
		description: "SOC 2, GDPR, HIPAA enterprise-grade security standards.",
	},
	{
		label: "Industries",
		href: "#industry",
		description: "Explore AI agent solutions customized for your sector.",
	},
	{
		label: "Contact Sales",
		href: "#contact",
		description: "Speak with our enterprise AI solutions team.",
	},
]

export function AgentlabNavbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	return (
		<header
			id="navbar"
			className="border-border/60 bg-bg/95 sticky top-0 z-50 w-full border-b backdrop-blur-md transition-all"
			data-themer-id="auto-header-129">
			<div
				className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
				data-themer-id="auto-div-130">
				{/* Logo */}
				<Link
					href="/sandbox/agentlab"
					className="flex items-center gap-2.5 transition-opacity hover:underline hover:opacity-90"
					data-themer-id="auto-link-131">
					<div
						className="relative flex size-6 items-center justify-center"
						data-themer-id="auto-div-132">
						<Image
							src="https://framerusercontent.com/images/qHjpjWRtd4BPA2HhIAgyBH8pjA.svg"
							alt="AgentLab Logo"
							width={24}
							height={24}
							className="size-6 object-contain"
							priority
							data-themer-id="auto-image-133"
						/>
					</div>
					<span
						className="text-fg font-heading text-xl font-bold tracking-tight"
						data-themer-id="auto-span-134">
						AgentLab
					</span>
				</Link>

				{/* Desktop Navigation Menu (Rule: use @/registry/ui/navigation-menu) */}
				<NavigationMenu
					viewport={false}
					className="hidden md:flex"
					data-themer-id="auto-navigationmenu-135">
					<NavigationMenuList
						className="gap-1"
						data-themer-id="auto-navigationmenulist-136">
						{navLinks.map((item) =>
							item.hasDropdown ? (
								<NavigationMenuItem
									key={item.label}
									data-themer-id="auto-navigationmenuitem-137">
									<NavigationMenuTrigger
										className="hover:bg-fill1-alpha text-fg-secondary hover:text-fg bg-transparent text-sm font-medium transition-colors"
										data-themer-id="auto-navigationmenutrigger-138">
										{item.label}
									</NavigationMenuTrigger>
									<NavigationMenuContent
										align="center"
										className="border-border/70 bg-elevation-level1 min-w-64 rounded-xl border p-2 shadow-xl backdrop-blur-md"
										data-themer-id="auto-navigationmenucontent-139">
										<ul
											className="flex flex-col gap-1"
											data-themer-id="auto-ul-140">
											{companyLinks.map((sub) => (
												<li key={sub.label} data-themer-id="auto-li-141">
													<NavigationMenuLink
														asChild
														className="hover:bg-fill1-alpha flex flex-col gap-0.5 rounded-lg p-2.5 text-sm transition-colors"
														data-themer-id="auto-navigationmenulink-142">
														<Link
															href={sub.href}
															data-themer-id="auto-link-143">
															<span
																className="text-fg font-semibold"
																data-themer-id="auto-span-144">
																{sub.label}
															</span>
															<span
																className="text-fg-secondary text-xs"
																data-themer-id="auto-span-145">
																{sub.description}
															</span>
														</Link>
													</NavigationMenuLink>
												</li>
											))}
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
							) : (
								<NavigationMenuItem
									key={item.label}
									data-themer-id="auto-navigationmenuitem-146">
									<NavigationMenuLink
										asChild
										className={cn(
											navigationMenuTriggerStyle(),
											"hover:bg-fill1-alpha text-fg-secondary hover:text-fg bg-transparent text-sm font-medium transition-colors"
										)}
										data-themer-id="auto-navigationmenulink-147">
										<Link href={item.href} data-themer-id="auto-link-148">
											{item.label}
										</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
							)
						)}
					</NavigationMenuList>
				</NavigationMenu>

				{/* Right CTA */}
				<div
					className="hidden items-center gap-3 sm:flex"
					data-themer-id="auto-div-149">
					<Button
						variant="strong"
						color="neutral"
						size="36"
						className="rounded-md px-4 text-xs font-bold tracking-wider uppercase transition-transform active:scale-95"
						data-themer-id="auto-button-150">
						<span data-themer-id="auto-span-151">GET STARTED</span>
					</Button>
				</div>

				{/* Mobile Hamburger */}
				<button
					type="button"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
					className="text-fg-secondary hover:text-fg border-border flex size-9 items-center justify-center rounded-md border sm:hidden"
					data-themer-id="auto-button-152">
					{mobileMenuOpen ? (
						<X className="size-5" data-themer-id="auto-x-153" />
					) : (
						<Menu className="size-5" data-themer-id="auto-menu-154" />
					)}
				</button>
			</div>

			{/* Mobile Menu Dropdown */}
			{mobileMenuOpen && (
				<div
					className="border-border/60 bg-bg border-b px-4 pt-3 pb-6 sm:hidden"
					data-themer-id="auto-div-155">
					<nav
						className="flex flex-col space-y-3"
						data-themer-id="auto-nav-156">
						{navLinks.map((item) => (
							<Link
								key={item.label}
								href={item.href}
								onClick={() => setMobileMenuOpen(false)}
								className="text-fg-secondary hover:text-fg flex items-center justify-between py-1.5 text-sm font-medium hover:underline"
								data-themer-id="auto-link-157">
								<span data-themer-id="auto-span-158">{item.label}</span>
								{item.hasDropdown && (
									<ChevronDown
										className="text-fg-tertiary size-4"
										data-themer-id="auto-chevrondown-159"
									/>
								)}
							</Link>
						))}
						<div className="pt-2" data-themer-id="auto-div-160">
							<Button
								variant="strong"
								color="neutral"
								size="36"
								className="w-full rounded-md text-xs font-bold tracking-wider uppercase"
								data-themer-id="auto-button-161">
								<span data-themer-id="auto-span-162">GET STARTED</span>
							</Button>
						</div>
					</nav>
				</div>
			)}
		</header>
	)
}

interface ProblemCardItem {
	title: string
	description: string
	imageUrl: string
}

const problemCards: ProblemCardItem[] = [
	{
		title: "No Unified Agent Layer",
		description:
			"Fragmented tools and disconnected automations lead to chaotic task delegation, high maintenance overhead, and inconsistent outputs.",
		imageUrl:
			"https://framerusercontent.com/images/Um7kpW33X62N4GTAd2zbgaxoTdc.png",
	},
	{
		title: "Time-Consuming Tasks",
		description:
			"Repetitive, manual operations drain team bandwidth, slow down customer-facing workflows, and increase operational costs.",
		imageUrl:
			"https://framerusercontent.com/images/sNfkiiKpmA5n0lXmgjZgrZkvCk.png",
	},
	{
		title: "Zero Process Visibility",
		description:
			"Lack of centralized tracking and real-time observability leaves organizations blind to pipeline bottlenecks and silent task failures.",
		imageUrl:
			"https://framerusercontent.com/images/vBQrwmEehzRwXON1C4YwQsAp8M.png",
	},
]

export function AgentlabProblemSection() {
	return (
		<section
			id="problem-section"
			className="bg-black-inverse text-white-inverse relative overflow-hidden py-24 md:py-32"
			data-themer-id="auto-section-163">
			<div
				className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
				data-themer-id="auto-div-164">
				{/* Category Badge */}
				<div className="flex justify-center" data-themer-id="auto-div-165">
					<div
						className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-semibold tracking-wider text-white/80 uppercase"
						data-themer-id="auto-div-166">
						<span
							className="text-primary font-bold"
							data-themer-id="auto-span-167">
							—
						</span>
						<span data-themer-id="auto-span-168">THE PROBLEM</span>
					</div>
				</div>

				{/* Section Heading (Rule 13: heading-2) */}
				<h2
					className="heading-2 mx-auto mt-6 max-w-4xl text-center font-serif text-white"
					data-themer-id="auto-h2-169">
					Most Organizations Operate with{" "}
					<span className="text-white/50" data-themer-id="auto-span-170">
						Broken Data Pipelines, Siloed Teams, and Outdated Workflows.
					</span>
				</h2>

				{/* 3 Problem Cards Grid (Rule 18: mapped array) */}
				<div
					className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8"
					data-themer-id="auto-div-171">
					{problemCards.map((item) => (
						<div
							key={item.title}
							className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]"
							data-themer-id="auto-div-172">
							{/* 3D Icon Graphic */}
							<div
								className="relative mb-8 h-44 w-full sm:h-52"
								data-themer-id="auto-div-173">
								<Image
									src={item.imageUrl}
									alt={item.title}
									fill
									sizes="(max-width: 768px) 100vw, 33vw"
									className="object-contain object-left transition-transform duration-500 group-hover:scale-105"
									data-themer-id="auto-image-174"
								/>
							</div>

							{/* Card Content */}
							<div data-themer-id="auto-div-175">
								<h3
									className="heading-4 font-serif text-white"
									data-themer-id="auto-h3-176">
									{item.title}
								</h3>
								<p
									className="mt-3 text-xs leading-relaxed text-white/60 sm:text-sm"
									data-themer-id="auto-p-177">
									{item.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

interface MetricItem {
	value: string
	label: string
}

const leftMetrics: MetricItem[] = [
	{ value: "10x", label: "Faster workflow execution" },
	{ value: "85%", label: "Reduction in repetitive tasks" },
]

export function AgentlabRoiSection() {
	return (
		<section
			id="case-study"
			className="border-border/60 bg-fill1/40 border-t py-24 md:py-32"
			data-themer-id="auto-section-178">
			<div
				className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
				data-themer-id="auto-div-179">
				<div
					className="border-border/80 bg-bg grid grid-cols-1 items-center gap-12 rounded-3xl border p-8 shadow-sm md:p-12 lg:grid-cols-2 lg:gap-16"
					data-themer-id="auto-div-180">
					{/* Left Column: Metrics & Chart */}
					<div
						className="flex flex-col justify-between"
						data-themer-id="auto-div-181">
						<div
							className="grid grid-cols-2 gap-6"
							data-themer-id="auto-div-182">
							{leftMetrics.map((item) => (
								<div key={item.label} data-themer-id="auto-div-183">
									<div
										className="text-fg font-serif text-4xl font-normal sm:text-5xl"
										data-themer-id="auto-div-184">
										{item.value}
									</div>
									<div
										className="text-fg-secondary mt-2 text-xs font-medium sm:text-sm"
										data-themer-id="auto-div-185">
										{item.label}
									</div>
								</div>
							))}
						</div>

						{/* Chart Visualization */}
						<div
							className="from-primary/5 to-primary/10 relative mt-10 h-48 w-full overflow-hidden rounded-xl bg-gradient-to-b p-4 sm:h-56"
							data-themer-id="auto-div-186">
							<Image
								src="https://framerusercontent.com/images/hEq2lGnA6G6ziYMb2M9sqX6hSdU.png"
								alt="Growth trajectory analytics curve"
								fill
								sizes="(max-width: 1024px) 100vw, 50vw"
								className="object-contain object-bottom"
								data-themer-id="auto-image-187"
							/>
						</div>
					</div>

					{/* Right Column: Narrative & High-Uptime Metric */}
					<div
						className="flex flex-col justify-between lg:pl-6"
						data-themer-id="auto-div-188">
						<div data-themer-id="auto-div-189">
							<h3
								className="heading-3 text-fg font-serif"
								data-themer-id="auto-h3-190">
								Automate your most complex, high-impact multi-step workflows
							</h3>
							<p
								className="text-fg-secondary mt-4 text-sm leading-relaxed sm:text-base"
								data-themer-id="auto-p-191">
								Streamline multi-step processes, reduce manual effort, and
								improve consistency across your operations with real-time
								execution and control.
							</p>
						</div>

						<div
							className="border-border/60 mt-12 border-t pt-8"
							data-themer-id="auto-div-192">
							<div
								className="text-fg font-serif text-4xl font-normal sm:text-5xl"
								data-themer-id="auto-div-193">
								99.9%
							</div>
							<div
								className="text-fg-secondary mt-2 text-xs font-medium sm:text-sm"
								data-themer-id="auto-div-194">
								Reliable task completion across workflows
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

interface SecurityFeature {
	title: string
	description: string
	icon: React.ComponentType<{ className?: string }>
}

const securityFeatures: SecurityFeature[] = [
	{
		title: "End-to-End Encryption",
		description: "All data encrypted in transit and at rest using AES-256.",
		icon: CheckCircle2,
	},
	{
		title: "Zero Data Retention",
		description: "Your data is never stored or used for model training.",
		icon: Lock,
	},
	{
		title: "Private Deployment",
		description: "Deploy in your own VPC for complete data sovereignty.",
		icon: Server,
	},
]

const complianceBadges = ["SOC 2", "GDPR", "HIPAA"]

export function AgentlabSecuritySection() {
	return (
		<section
			id="security-section"
			className="border-border/60 bg-bg border-t py-24 md:py-32"
			data-themer-id="auto-section-195">
			<div
				className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
				data-themer-id="auto-div-196">
				<div
					className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16"
					data-themer-id="auto-div-197">
					{/* Left Title & Compliance Badges */}
					<div className="lg:col-span-5" data-themer-id="auto-div-198">
						<h2
							className="heading-2 text-fg font-serif"
							data-themer-id="auto-h2-199">
							Enterprise-Grade Security Standards
						</h2>

						<div
							className="mt-8 flex items-center gap-3.5"
							data-themer-id="auto-div-200">
							{complianceBadges.map((badge) => (
								<div
									key={badge}
									className="from-primary to-primary-hover flex size-16 items-center justify-center rounded-full bg-gradient-to-br font-mono text-xs font-bold text-white shadow-md transition-transform hover:scale-105"
									data-themer-id="auto-div-201">
									{badge}
								</div>
							))}
						</div>
					</div>

					{/* Right 3 Feature Columns (Rule 18: mapped array) */}
					<div
						className="divide-border/60 grid grid-cols-1 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:col-span-7"
						data-themer-id="auto-div-202">
						{securityFeatures.map((item) => {
							const Icon = item.icon
							return (
								<div
									key={item.title}
									className="p-6 sm:first:pl-0 sm:last:pr-0"
									data-themer-id="auto-div-203">
									<div
										className="border-border bg-fill2 text-fg mb-6 flex size-10 items-center justify-center rounded-lg border"
										data-themer-id="auto-div-204">
										<Icon
											className="text-primary size-5"
											data-themer-id="auto-icon-205"
										/>
									</div>
									<h3
										className="heading-4 text-fg font-serif"
										data-themer-id="auto-h3-206">
										{item.title}
									</h3>
									<p
										className="text-fg-secondary mt-2.5 text-xs leading-relaxed sm:text-sm"
										data-themer-id="auto-p-207">
										{item.description}
									</p>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}

export function AgentlabSolutionSection() {
	return (
		<section
			id="product"
			className="relative overflow-hidden py-24 md:py-32"
			data-themer-id="auto-section-208">
			<div
				className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
				data-themer-id="auto-div-209">
				{/* Top Section Headline (Rule 13: heading-2) */}
				<div className="text-center" data-themer-id="auto-div-210">
					<h2
						className="heading-2 text-fg mx-auto max-w-4xl font-serif"
						data-themer-id="auto-h2-211">
						Eliminate Operational Friction, Cut Manual Errors, and Increase
						Deployment Speed by 10x with Enterprise-Grade AI Agent
						Infrastructure
					</h2>
				</div>

				{/* Feature 1: Agent Builder */}
				<div
					className="mt-20 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16"
					data-themer-id="auto-div-212">
					{/* Left Text */}
					<div className="lg:col-span-5" data-themer-id="auto-div-213">
						<div
							className="border-border/80 bg-fill2/70 text-fg-secondary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase"
							data-themer-id="auto-div-214">
							<span
								className="text-primary font-bold"
								data-themer-id="auto-span-215">
								—
							</span>
							<span data-themer-id="auto-span-216">AGENT BUILDER</span>
						</div>
						<h3
							className="heading-3 text-fg mt-4 font-serif"
							data-themer-id="auto-h3-217">
							Build and Deploy Agents in Minutes
						</h3>
						<p
							className="text-fg-secondary mt-4 text-sm leading-relaxed sm:text-base"
							data-themer-id="auto-p-218">
							Design intelligent agents with a visual builder — no coding
							required. Define triggers, actions, and logic with an intuitive
							drag-and-drop interface.
						</p>

						<div className="mt-6 space-y-3" data-themer-id="auto-div-219">
							{[
								"Natural language prompt-to-agent generation",
								"Pre-configured logic templates for sales and support",
								"One-click deployment to cloud infrastructure",
							].map((item) => (
								<div
									key={item}
									className="text-fg-secondary flex items-center gap-2.5 text-xs sm:text-sm"
									data-themer-id="auto-div-220">
									<CheckCircle2
										className="text-primary size-4 shrink-0"
										data-themer-id="auto-checkcircle2-221"
									/>
									<span data-themer-id="auto-span-222">{item}</span>
								</div>
							))}
						</div>
					</div>

					{/* Right Interactive Mockup Graphic */}
					<div
						className="border-border/60 bg-fill2 relative min-h-[420px] overflow-hidden rounded-2xl border p-6 shadow-xl sm:p-8 lg:col-span-7"
						data-themer-id="auto-div-223">
						<div
							className="absolute inset-0 -z-10"
							data-themer-id="auto-div-224">
							<Image
								src="https://framerusercontent.com/images/i6BW3QgDJgD0jVkXifqeODXE59c.png"
								alt="Agent Builder Preview Graphic"
								fill
								sizes="(max-width: 1024px) 100vw, 58vw"
								className="object-cover object-center"
								data-themer-id="auto-image-225"
							/>
						</div>

						{/* Support Agent Card Overlay */}
						<div
							className="relative mx-auto mt-4 w-full max-w-md rounded-xl border border-white/40 bg-white/95 p-5 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-black/90"
							data-themer-id="auto-div-226">
							<div
								className="border-border/60 flex items-center justify-between border-b pb-3"
								data-themer-id="auto-div-227">
								<span
									className="text-fg-secondary text-xs font-bold tracking-wider uppercase"
									data-themer-id="auto-span-228">
									SUPPORT AGENT
								</span>
								<span
									className="flex size-2 animate-pulse rounded-full bg-emerald-500"
									data-themer-id="auto-span-229"
								/>
							</div>

							<div className="mt-4 space-y-3" data-themer-id="auto-div-230">
								{/* Bot Message */}
								<div
									className="flex items-start gap-2.5"
									data-themer-id="auto-div-231">
									<div
										className="bg-primary flex size-6 shrink-0 items-center justify-center rounded-sm text-white"
										data-themer-id="auto-div-232">
										<Sparkles
											className="size-3.5"
											data-themer-id="auto-sparkles-233"
										/>
									</div>
									<div
										className="border-border/60 bg-fill2 text-fg rounded-lg rounded-tl-none border p-3 text-xs"
										data-themer-id="auto-div-234">
										Hello! Describe the agent you want to build.
									</div>
								</div>

								{/* User Message */}
								<div
									className="flex items-end justify-end gap-2.5"
									data-themer-id="auto-div-235">
									<div
										className="bg-black-inverse text-white-inverse rounded-lg rounded-tr-none p-3 text-xs shadow-sm"
										data-themer-id="auto-div-236">
										Handle customer order updates and returns
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Feature 2: Workflow Automation */}
				<div
					className="mt-28 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16"
					data-themer-id="auto-div-237">
					{/* Left Mockup Graphic */}
					<div
						className="border-border/60 bg-fill2 relative order-2 min-h-[420px] overflow-hidden rounded-2xl border p-6 shadow-xl sm:p-8 lg:order-1 lg:col-span-7"
						data-themer-id="auto-div-238">
						<div
							className="absolute inset-0 -z-10"
							data-themer-id="auto-div-239">
							<Image
								src="https://framerusercontent.com/images/xQagQ8uubfx7UqGyS04prpQ8IEE.png"
								alt="Workflow Automation Preview"
								fill
								sizes="(max-width: 1024px) 100vw, 58vw"
								className="object-cover object-center"
								data-themer-id="auto-image-240"
							/>
						</div>

						{/* Workflow Execution Card Overlay */}
						<div
							className="relative mx-auto mt-4 w-full max-w-md rounded-xl border border-white/40 bg-white/95 p-5 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-black/90"
							data-themer-id="auto-div-241">
							<div
								className="border-border/60 flex items-center justify-between border-b pb-3"
								data-themer-id="auto-div-242">
								<span
									className="text-fg text-xs font-bold tracking-wider uppercase"
									data-themer-id="auto-span-243">
									WORKFLOW - RUNNING
								</span>
								<span
									className="text-primary text-xs font-medium"
									data-themer-id="auto-span-244">
									Lead Enrichment
								</span>
							</div>

							<div className="mt-4 space-y-2.5" data-themer-id="auto-div-245">
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
										}`}
										data-themer-id="auto-div-246">
										<div
											className={`flex size-4 items-center justify-center rounded-full ${
												step.done
													? "bg-black-inverse text-white-inverse"
													: "border-border border"
											}`}
											data-themer-id="auto-div-247">
											{step.done && (
												<CheckCircle2
													className="size-3"
													data-themer-id="auto-checkcircle2-248"
												/>
											)}
										</div>
										<span data-themer-id="auto-span-249">{step.label}</span>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Right Text */}
					<div
						className="order-1 lg:order-2 lg:col-span-5"
						data-themer-id="auto-div-250">
						<div
							className="border-border/80 bg-fill2/70 text-fg-secondary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase"
							data-themer-id="auto-div-251">
							<span
								className="text-primary font-bold"
								data-themer-id="auto-span-252">
								—
							</span>
							<span data-themer-id="auto-span-253">WORKFLOW AUTOMATION</span>
						</div>
						<h3
							className="heading-3 text-fg mt-4 font-serif"
							data-themer-id="auto-h3-254">
							Automate Complex Multi-Step Workflows
						</h3>
						<p
							className="text-fg-secondary mt-4 text-sm leading-relaxed sm:text-base"
							data-themer-id="auto-p-255">
							Deploy intelligent AI agents that understand your business
							context, coordinate complex workflows, and execute tasks with
							unprecedented precision.
						</p>

						<div
							className="text-fg hover:text-primary mt-6 flex items-center gap-2 text-xs font-semibold transition-colors sm:text-sm"
							data-themer-id="auto-div-256">
							<ArrowRight
								className="text-primary size-4"
								data-themer-id="auto-arrowright-257"
							/>
							<span data-themer-id="auto-span-258">
								Automated workflow orchestration with error fallback
							</span>
						</div>
					</div>
				</div>

				{/* Feature 3: Analytics & Insights */}
				<div
					className="mt-28 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16"
					data-themer-id="auto-div-259">
					{/* Left Text */}
					<div className="lg:col-span-5" data-themer-id="auto-div-260">
						<div
							className="border-border/80 bg-fill2/70 text-fg-secondary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase"
							data-themer-id="auto-div-261">
							<span
								className="text-primary font-bold"
								data-themer-id="auto-span-262">
								—
							</span>
							<span data-themer-id="auto-span-263">
								ANALYTICS &amp; INSIGHTS
							</span>
						</div>
						<h3
							className="heading-3 text-fg mt-4 font-serif"
							data-themer-id="auto-h3-264">
							Monitor Agent Performance in Real Time
						</h3>
						<p
							className="text-fg-secondary mt-4 text-sm leading-relaxed sm:text-base"
							data-themer-id="auto-p-265">
							Track performance metrics, identify bottlenecks, and optimize
							agent efficiency with real-time analytics.
						</p>

						<div
							className="text-fg hover:text-primary mt-6 flex items-center gap-2 text-xs font-semibold transition-colors sm:text-sm"
							data-themer-id="auto-div-266">
							<ArrowRight
								className="text-primary size-4"
								data-themer-id="auto-arrowright-267"
							/>
							<span data-themer-id="auto-span-268">
								Real-time performance monitoring and latency alerts
							</span>
						</div>
					</div>

					{/* Right Graphic */}
					<div
						className="border-border/60 bg-fill2 relative min-h-[420px] overflow-hidden rounded-2xl border p-6 shadow-xl sm:p-8 lg:col-span-7"
						data-themer-id="auto-div-269">
						<div
							className="absolute inset-0 -z-10"
							data-themer-id="auto-div-270">
							<Image
								src="https://framerusercontent.com/images/CXipLKeSIdL0cDkxv4uZJivb2E.png"
								alt="Analytics Background Graphic"
								fill
								sizes="(max-width: 1024px) 100vw, 58vw"
								className="object-cover object-center"
								data-themer-id="auto-image-271"
							/>
						</div>

						{/* Analytics Card Overlay */}
						<div
							className="relative mx-auto mt-4 w-full max-w-md rounded-xl border border-white/40 bg-white/95 p-5 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-black/90"
							data-themer-id="auto-div-272">
							<p
								className="text-fg-secondary text-xs font-bold tracking-wider uppercase"
								data-themer-id="auto-p-273">
								ANALYTICS OVERVIEW
							</p>

							{/* Key Numbers Grid */}
							<div
								className="border-border/60 mt-4 grid grid-cols-3 gap-2 border-b pb-4 text-center"
								data-themer-id="auto-div-274">
								<div data-themer-id="auto-div-275">
									<div
										className="text-fg text-lg font-bold"
										data-themer-id="auto-div-276">
										1,247
									</div>
									<div
										className="text-fg-tertiary text-[10px]"
										data-themer-id="auto-div-277">
										Tasks Today
									</div>
								</div>
								<div data-themer-id="auto-div-278">
									<div
										className="text-fg text-lg font-bold"
										data-themer-id="auto-div-279">
										98.4%
									</div>
									<div
										className="text-fg-tertiary text-[10px]"
										data-themer-id="auto-div-280">
										Success Rate
									</div>
								</div>
								<div data-themer-id="auto-div-281">
									<div
										className="text-fg text-lg font-bold"
										data-themer-id="auto-div-282">
										1.2s
									</div>
									<div
										className="text-fg-tertiary text-[10px]"
										data-themer-id="auto-div-283">
										Avg Duration
									</div>
								</div>
							</div>

							{/* Simulated Activity Bar Chart (Rule 18: mapped array) */}
							<div className="mt-4" data-themer-id="auto-div-284">
								<p
									className="text-fg-tertiary text-[11px] font-medium"
									data-themer-id="auto-p-285">
									Task volume — last 12 hours
								</p>
								<div
									className="mt-2.5 flex h-14 items-end gap-1.5"
									data-themer-id="auto-div-286">
									{[35, 60, 45, 80, 50, 90, 70, 95, 65, 85, 75, 100].map(
										(height, idx) => (
											<div
												key={idx}
												className="bg-black-inverse hover:bg-primary w-full rounded-xs transition-all duration-300"
												style={{ height: `${height}%` }}
												data-themer-id="auto-div-287"
											/>
										)
									)}
								</div>
							</div>

							<div
								className="border-border/60 mt-4 flex items-center justify-between border-t pt-3 text-xs"
								data-themer-id="auto-div-288">
								<div
									className="flex items-center gap-2"
									data-themer-id="auto-div-289">
									<span
										className="size-2 rounded-full bg-emerald-500"
										data-themer-id="auto-span-290"
									/>
									<span
										className="text-fg font-medium"
										data-themer-id="auto-span-291">
										Research Agent
									</span>
								</div>
								<span
									className="text-fg font-bold"
									data-themer-id="auto-span-292">
									342 tasks
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

interface TestimonialItem {
	id: string
	companyName: string
	logoUrl: string
	headline: string
	quote: string
	authorName: string
	authorRole: string
	avatarUrl: string
}

const testimonials: TestimonialItem[] = [
	{
		id: "zenzap",
		companyName: "ZenZap",
		logoUrl:
			"https://framerusercontent.com/images/yg73mxfKVqYxGdl9PXd5goIE.svg",
		headline:
			"The orchestration layer simplifies complex workflows and makes easier to manage.",
		quote:
			"AgentLab brings much-needed structure to AI automation workflows. The orchestration layer is rock solid, giving our engineering team complete peace of mind while scaling our agent fleets.",
		authorName: "Marcus Vance",
		authorRole: "VP of Engineering, ZenZap",
		avatarUrl:
			"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
	},
	{
		id: "sparkle",
		companyName: "Sparkle",
		logoUrl:
			"https://framerusercontent.com/images/6Fbv7vEmmB0WPOWiVDEZNhoZ0.svg",
		headline: "Deployed our first 10 production agents in less than two weeks.",
		quote:
			"We cut customer support resolution times by 65% in the first month alone. The guardrails and fallback mechanisms are unmatched.",
		authorName: "Elena Rostova",
		authorRole: "Head of Operations, Sparkle",
		avatarUrl:
			"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
	},
	{
		id: "craftgram",
		companyName: "Craftgram",
		logoUrl:
			"https://framerusercontent.com/images/0tQJ7SlKdpCZUVbUjxOEy57XRhA.svg",
		headline:
			"Automated our entire multi-step lead enrichment pipeline without writing glue code.",
		quote:
			"AgentLab saved our team hundreds of hours each sprint. The pre-built agent logic and instant CRM sync let us launch faster than ever.",
		authorName: "David Chen",
		authorRole: "Chief Technology Officer, Craftgram",
		avatarUrl:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
	},
	{
		id: "pulse",
		companyName: "Pulse",
		logoUrl:
			"https://framerusercontent.com/images/hsbt5NG4UUe3LO7ERSFGv8A0PrA.svg",
		headline:
			"99.9% uptime SLA and real-time observability across all AI tasks.",
		quote:
			"As an enterprise fintech company, security and audit logs are non-negotiable. AgentLab checked every compliance box from day one.",
		authorName: "Sarah Jenkins",
		authorRole: "Director of Product, Pulse",
		avatarUrl:
			"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
	},
]

export function AgentlabTestimonialsSection() {
	const [activeTab, setActiveTab] = useState<string>("zenzap")

	const activeTestimonial =
		testimonials.find((t) => t.id === activeTab) || testimonials[0]

	return (
		<section
			id="testimonials-section"
			className="bg-black-inverse text-white-inverse relative overflow-hidden py-24 md:py-32"
			data-themer-id="auto-section-293">
			<div
				className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
				data-themer-id="auto-div-294">
				{/* Top Header */}
				<div
					className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
					data-themer-id="auto-div-295">
					<div data-themer-id="auto-div-296">
						<div
							className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-semibold tracking-wider text-white/80 uppercase"
							data-themer-id="auto-div-297">
							<span
								className="text-primary font-bold"
								data-themer-id="auto-span-298">
								—
							</span>
							<span data-themer-id="auto-span-299">TESTIMONIALS</span>
						</div>
						<h2
							className="heading-2 mt-4 font-serif text-white"
							data-themer-id="auto-h2-300">
							What People Are Saying
						</h2>
					</div>

					<Button
						variant="outline"
						color="neutral"
						size="36"
						className="gap-2 border-white/20 bg-transparent text-xs font-bold tracking-wider text-white uppercase hover:bg-white/10"
						data-themer-id="auto-button-301">
						<ArrowUpRight
							className="size-4"
							data-themer-id="auto-arrowupright-302"
						/>
						<span data-themer-id="auto-span-303">SEE ALL CASE STUDIES</span>
					</Button>
				</div>

				{/* Brand Tabs (Rule 18: mapped array) */}
				<div
					className="mt-14 grid grid-cols-2 border border-white/10 sm:grid-cols-4"
					data-themer-id="auto-div-304">
					{testimonials.map((item) => {
						const isSelected = activeTab === item.id
						return (
							<button
								key={item.id}
								type="button"
								onClick={() => setActiveTab(item.id)}
								className={`flex h-16 items-center justify-center border-b-2 px-4 transition-all ${
									isSelected
										? "border-primary bg-white/10"
										: "border-transparent bg-white/5 opacity-60 hover:opacity-100"
								}`}
								data-themer-id="auto-button-305">
								<Image
									src={item.logoUrl}
									alt={item.companyName}
									width={80}
									height={22}
									className="h-5 w-auto object-contain brightness-0 invert"
									data-themer-id="auto-image-306"
								/>
							</button>
						)
					})}
				</div>

				{/* Active Testimonial Showcase */}
				<div
					className="mt-8 grid grid-cols-1 gap-8 rounded-2xl border border-white/10 bg-white/5 p-8 lg:grid-cols-12 lg:gap-12 lg:p-12"
					data-themer-id="auto-div-307">
					{/* Left Quote Graphic */}
					<div className="lg:col-span-7" data-themer-id="auto-div-308">
						<h3
							className="heading-3 font-serif text-white"
							data-themer-id="auto-h3-309">
							&ldquo;{activeTestimonial.headline}&rdquo;
						</h3>
					</div>

					{/* Right Author Meta */}
					<div
						className="flex flex-col justify-between border-t border-white/10 pt-6 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10"
						data-themer-id="auto-div-310">
						<div
							className="flex items-center gap-4"
							data-themer-id="auto-div-311">
							<div
								className="relative size-14 overflow-hidden rounded-full border border-white/20"
								data-themer-id="auto-div-312">
								<Image
									src={activeTestimonial.avatarUrl}
									alt={activeTestimonial.authorName}
									fill
									sizes="56px"
									className="object-cover"
									data-themer-id="auto-image-313"
								/>
							</div>
							<div data-themer-id="auto-div-314">
								<div
									className="text-sm font-bold text-white"
									data-themer-id="auto-div-315">
									{activeTestimonial.authorName}
								</div>
								<div
									className="text-xs text-white/60"
									data-themer-id="auto-div-316">
									{activeTestimonial.authorRole}
								</div>
							</div>
						</div>

						<p
							className="mt-6 text-xs leading-relaxed text-white/70 sm:text-sm"
							data-themer-id="auto-p-317">
							{activeTestimonial.quote}
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

const merriweather = Merriweather({
	weight: ["300", "400", "700"],
	subsets: ["latin"],
	variable: "--font-merriweather",
	display: "swap",
})

export default function LandingPage() {
	return (
		<div
			id="page"
			className={`${merriweather.variable} bg-bg text-fg min-h-screen font-sans antialiased`}
			data-themer-id="auto-div-318">
			<AgentlabAnnouncementBar data-themer-id="auto-agentlabannouncementbar-319" />
			<AgentlabNavbar data-themer-id="auto-agentlabnavbar-320" />
			<main data-themer-id="auto-main-321">
				<AgentlabHeroSection data-themer-id="auto-agentlabherosection-322" />
				<AgentlabLogoMarquee data-themer-id="auto-agentlablogomarquee-323" />
				<AgentlabProblemSection data-themer-id="auto-agentlabproblemsection-324" />
				<AgentlabSolutionSection data-themer-id="auto-agentlabsolutionsection-325" />
				<AgentlabRoiSection data-themer-id="auto-agentlabroisection-326" />
				<AgentlabMultiModelSection data-themer-id="auto-agentlabmultimodelsection-327" />
				<AgentlabIndustrySection data-themer-id="auto-agentlabindustrysection-328" />
				<AgentlabTestimonialsSection data-themer-id="auto-agentlabtestimonialssection-329" />
				<AgentlabSecuritySection data-themer-id="auto-agentlabsecuritysection-330" />
				<AgentlabFaqSection data-themer-id="auto-agentlabfaqsection-331" />
				<AgentlabCtaBanner data-themer-id="auto-agentlabctabanner-332" />
			</main>
			<AgentlabFooter data-themer-id="auto-agentlabfooter-333" />
		</div>
	)
}
