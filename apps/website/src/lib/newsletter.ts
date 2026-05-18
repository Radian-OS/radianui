export type SubscriptionResult = {
	message: string
	status: number
}

export async function subscribeToNewsletter(
	email: string
): Promise<SubscriptionResult> {
	const response = await fetch("/api/subscribe", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email }),
	})

	const data = await response.json().catch(() => null)

	if (
		data &&
		typeof data.message === "string" &&
		typeof data.status === "number"
	) {
		return data
	}

	return {
		message: response.ok
			? "Email subscribed successfully"
			: "Something went wrong. Please try again later.",
		status: response.status || 500,
	}
}
