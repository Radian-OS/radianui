import { useState, useTransition } from "react"

import { subscribe } from "@/app/api/email/actions"

export function useEmailSubscribe() {
	const [email, setEmail] = useState("")
	const [isPending, startTransition] = useTransition()
	const [subscriptionResult, setSubscriptionResult] = useState<{ success: boolean; message: string }>()

	async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		startTransition(() => {
			subscribe(email).then((result) => {
				setSubscriptionResult(result)
				if (result.success) setEmail("")
			})
		})
	}

	return {
		email,
		setEmail,
		isPending,
		subscriptionResult,
		handleSubscribe,
	}
}
