"use client"

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { useEmailSubscribe } from "@/hooks/use-email-subscribe"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { Input } from "@/registry/ui/input"
import { WebsiteLogo } from "../navbar/website-logo"

const LINKS = [
	{
		title: "Documentation",
		linkItems: [
			{
				href: "/docs/getting-started/introduction",
				name: "Getting Started",
			},
			{
				href: "/docs/fundamentals/colors",
				name: "Fundamentals",
			},
			{
				href: "/docs/components/accordion",
				name: "Base Components",
			},
			{
				href: process.env.NEXT_PUBLIC_BLOCKS_URL!,
				name: "Explore Blocks",
				badge: <ArrowUpRight className="text-fg-secondary size-5" />,
			},
		],
	},
	{
		title: "Resources",
		linkItems: [
			{
				href: "/docs/getting-started/changelog",
				name: "Change Logs",
				badge: (
					<Badge variant="soft" size="20">
						New
					</Badge>
				),
			},
			{
				href: "/blog",
				name: "Release Notes",
			},
			{
				href: "/blog",
				name: "Blog Articles",
			},
			{
				href: "#",
				name: "Radian Figma",
				badge: (
					<Badge variant="soft" size="20">
						New
					</Badge>
				),
			},
		],
	},
	{
		title: "Community",
		linkItems: [
			{
				href: "https://github.com/Radian-os/radianos",
				name: "Github",
			},
			{
				href: "#",
				name: "Figma",
			},
			{
				href: "#",
				name: "X (Twitter)",
			},
		],
	},
]

export default function FooterSection() {
	const { email, setEmail, isPending, subscriptionResult, handleSubscribe } = useEmailSubscribe()

	return (
		<footer className="bg-bg before:from-bg before:via-soft before:to-bg w-full before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r">
			{/* For tablet and mobile */}
			<div className="flex flex-col gap-5 px-5 pb-5 pt-10 xl:hidden">
				<WebsiteLogo />
				<div>
					<Accordion size="lg" type="single" variant="open" collapsible>
						{LINKS.map((item) => (
							<AccordionItem key={item.title} value={item.title}>
								<AccordionTrigger>{item.title}</AccordionTrigger>
								<AccordionContent>
									<div className="flex flex-col">
										{item.linkItems.map((linkItem) => (
											<Link key={linkItem.name} href={linkItem.href} className="py-2.5">
												{linkItem.name}
											</Link>
										))}
									</div>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>

			{/* For desktop (larger than 1280px) */}
			<div className="not-xl:hidden max-w-360 px-30 py-15 mx-auto flex justify-between">
				<WebsiteLogo />
				<div className="flex gap-20">
					{LINKS.map((item) => (
						<div className="flex flex-col gap-5" key={item.title}>
							<p className="text-fg-tertiary text-sm font-medium uppercase">{item.title}</p>
							<div className="flex flex-col gap-4">
								{item.linkItems.map((linkItem) => (
									<span key={linkItem.name} className="flex items-center gap-2">
										<Link href={linkItem.href}>{linkItem.name}</Link>
										{linkItem.badge && linkItem.badge}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="flex flex-col items-center justify-center">
				<Divider className="via-border bg-gradient-to-r from-transparent to-transparent" />
				<div className="flex w-full max-w-[1120px] flex-col justify-between gap-8 px-5 py-8 md:flex-row md:py-10">
					<div className="flex max-w-[396px] flex-col gap-2">
						<h5 className="heading-5">Love Building Products?</h5>
						<p className="text-fg-secondary text-sm font-normal">We’re adding tons of cool components and blocks to help you build. Subscribe to get updates on development</p>
					</div>
					<form onSubmit={handleSubscribe}>
						<div className="flex gap-3">
							<Input placeholder="Enter your email" size="40" className="w-70" value={email} onChange={(e) => setEmail(e.target.value)} required />
							<Button size="40" type="submit" disabled={isPending}>
								{isPending ? "Subscribing" : "Subscribe"}
							</Button>
						</div>
						<p
							className={cn("text-fg-tertiary mt-2 text-xs font-normal", {
								"text-error-text": subscriptionResult?.success == false,
							})}>
							{subscriptionResult?.message && subscriptionResult.message}
						</p>
					</form>
				</div>
			</div>

			<Divider className="via-border bg-gradient-to-r from-transparent to-transparent" />
			<div className="h-13 flex items-center justify-center">
				<p className="text-fg-secondary text-center text-sm font-medium">© Copyright Radian OS 2025. All rights reserved.</p>
			</div>
			{/* <div className="hidden h-10 xl:block" /> */}
		</footer>
	)
}
