"use client"

import React from "react"
import { Card } from "@/styles/default/ui/card"
import { CheckoutHeader } from "./checkout-header"
import { CheckoutForm } from "./checkout-form"

export default function CheckoutFormPage() {
	return (
		<div className="bg-background flex min-h-screen w-full items-center justify-center p-4 sm:p-6 md:p-10">
			<Card className="border-border bg-card w-full max-w-md rounded-2xl border p-6 shadow-xl sm:p-8">
				<div className="flex flex-col gap-6">
					<CheckoutHeader />
					<CheckoutForm />
				</div>
			</Card>
		</div>
	)
}
