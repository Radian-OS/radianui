"use client"

import React from "react"
import { useEmailSubscribe } from "@/hooks/use-email-subscribe"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"

export const EmailSubscribe = () => {
	const { email, setEmail, isPending, subscriptionResult, handleSubscribe } = useEmailSubscribe()
	return (
		<div className="z-30 flex flex-col gap-3">
			<form className="flex gap-3" onSubmit={handleSubscribe}>
				<Input size="40" className="sm:min-w-70.25 w-72" type="email" required placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
				<Button
					size="40"
					loading={isPending}
					disabled={isPending}
					className="border-primary-hover border bg-gradient-to-b from-[#6347EB] to-[#5133CF] shadow-[0px_4px_4px_rgba(24,25,27,0.16),0px_0px_0px_1.5px_#5B3FE0] hover:from-[#6A52F2] hover:to-[#5B3FE0]">
					{isPending ? "Subscribing" : "Subscribe"}
				</Button>
			</form>
			<p
				className={cn("text-fg-tertiary text-xs font-normal", {
					"text-error-text": subscriptionResult?.success == false,
				})}>
				{subscriptionResult?.message ? subscriptionResult.message : "Alpha release. Subscribe for latest updates"}
			</p>
		</div>
	)
}
