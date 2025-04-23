"use client"

import React from "react"
import { Mail } from "lucide-react"
import { subscribe } from "@/app/api/email/actions"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"

export default function EmailSection() {
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
		<div className="max-w-310 mx-auto">
			<div id="body" className="lg:pb-15 flex flex-col gap-8 px-4 py-6 md:px-6 lg:p-10">
				<div className="bg-stroke-decorative -ml-396 hidden h-[0.5px] w-[calc(100%+999rem)] lg:block" />
				<div className="md:py-15 flex w-full flex-col items-center justify-center gap-8 rounded-xl border px-6 py-6 text-center md:px-10 lg:flex-row lg:justify-between">
					<div className="flex flex-col gap-2 sm:gap-3">
						<h4 className="heading-4">Get notified when new stuff drops.</h4>
						<p className="text-text-secondary text-base">Subscribe to get latest updates, tips, & exclusive offers from Radian.</p>
					</div>
					<form className="flex flex-col gap-2 text-start" onSubmit={handleSubscribe}>
						<div className="flex w-full flex-col gap-3 sm:w-fit sm:flex-row">
							<Input
								className="w-full sm:w-80"
								placeholder="Enter your email"
								lead={<Mail className="stroke-stroke" />}
								value={email}
								type="email"
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
							<Button disabled={isPending} type="submit" className="w-full sm:w-fit">
								{!isPending ? "Subscribe" : "Subscribing"}
							</Button>
						</div>
						<div>
							<p
								className={cn("text-text-tertiary text-xs font-normal", {
									"text-error-text": subscriptionResult?.success == false,
								})}>
								{subscriptionResult?.message && subscriptionResult.message}
							</p>
						</div>
					</form>
				</div>
				<div className="bg-stroke-decorative -ml-396 hidden h-[0.5px] w-[calc(100%+999rem)] lg:block"></div>
			</div>
		</div>
	)
}
