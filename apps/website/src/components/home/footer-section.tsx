"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { FieldValues, useForm } from "react-hook-form"
import z from "zod"
import { subscribe } from "@/app/actions/subscribe"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/registry/ui/form"
import { Input } from "@/registry/ui/input"
import { Spinner } from "@/registry/ui/spinner"
import { WebsiteLogo } from "../navbar/website-logo"

type FormData = {
	email: string
}

const formSchema = z.object({
	email: z.string().min(1, "Email is required").email("Please enter a valid email address."),
})

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
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { email: "" },
	})

	const [subscriptionResult, setSubscriptionResult] = useState<{ message: string; status: number } | null>(null)

	// Keep the subscription result for 5 seconds
	useEffect(() => {
		if (subscriptionResult) {
			const timer = setTimeout(() => {
				setSubscriptionResult(null)
			}, 5000)

			return () => clearTimeout(timer)
		}
	}, [subscriptionResult])

	const onSubmit = async (data: FormData) => {
		setSubscriptionResult(null)
		try {
			const result = await subscribe(data.email)
			setSubscriptionResult(result)
			if (result.status < 400) {
				form.reset()
			}
		} catch (error) {
			console.error("Failed to subscribe email:", error)
			setSubscriptionResult({ message: "Something went wrong. Please try again.", status: 500 })
		}
	}

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
				<div className="max-w-360 lg:px-30 flex w-full flex-col justify-between gap-8 px-5 py-8 md:flex-row md:py-10">
					<div className="flex max-w-[396px] flex-col gap-2">
						<h5 className="heading-5">Love Building Products?</h5>
						<p className="text-fg-secondary text-sm font-normal">We’re adding tons of cool components and blocks to help you build. Subscribe to get updates on development</p>
					</div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className="flex gap-3">
								<FormField
									control={form.control}
									name="email"
									render={({ field }: { field: FieldValues }) => (
										<FormItem className="w-70">
											<FormControl>
												<Input placeholder="Enter your email" type="email" {...field} required />
											</FormControl>
											<FormMessage className={cn({ "text-success-text": subscriptionResult?.status === 201 })}>{subscriptionResult?.message}</FormMessage>
										</FormItem>
									)}
								/>
								<Button className="w-23" type="submit" disabled={form.formState.isSubmitting}>
									{form.formState.isSubmitting ? <Spinner variant="activity" /> : "Subscribe"}
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>

			<Divider className="via-border bg-gradient-to-r from-transparent to-transparent" />
			<div className="h-13 flex items-center justify-center">
				<p className="text-fg-secondary text-center text-sm font-medium">© Copyright Radian OS 2025. All rights reserved.</p>
			</div>
		</footer>
	)
}
