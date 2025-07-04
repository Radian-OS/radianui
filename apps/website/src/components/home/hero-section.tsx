"use client"

import React from "react"
import { Box } from "lucide-react"
import { subscribe } from "@/app/api/email/actions"
import { cn } from "@/lib/utils"
import { BorderBeam } from "@/registry/animated/border-beam"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"

export default function HeroSection() {
	const [email, setEmail] = React.useState("")
	const [isPending, startTransition] = React.useTransition()
	const [subscriptionResult, setSubscriptionResult] = React.useState<{
		success: boolean
		message: string
	}>()

	async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		startTransition(() => {
			subscribe(email).then((result) => {
				setSubscriptionResult(result)
				if (result.success) setEmail("")
			})
		})
	}

	return (
		<div className="relative box-border flex flex-col gap-1 px-4 pb-4 pt-6 md:px-6 lg:px-10 lg:py-16">
			<section className="max-w-187 flex flex-col justify-between gap-6">
				<Badge size="28" className="bg-primary-focus text-primary-text relative w-fit text-sm font-medium">
					<Box size={20} />
					<span>Under Development</span>
					<BorderBeam />
				</Badge>
				<h1 className="heading-1">Ship next generation of world class products and solutions</h1>
				<p className="text-text-secondary text-lg font-normal">
					Radian is a high quality design and development library to build systems that scale quickly. Get from design to product in few hours.
				</p>
				<div className="z-30 flex flex-col gap-3">
					<form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubscribe}>
						<Input size="40" className="sm:w-80" type="email" required placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
						<Button size="40" disabled={isPending} type="submit">
							{isPending ? "Subscribing" : "Subscribe"}
						</Button>
					</form>
					<p
						className={cn("text-text-tertiary text-xs font-normal", {
							"text-error-text": subscriptionResult?.success == false,
						})}>
						{subscriptionResult?.message ? subscriptionResult.message : "Alpha release. Subscribe for latest updates"}
					</p>
				</div>
			</section>
		</div>
	)
}
