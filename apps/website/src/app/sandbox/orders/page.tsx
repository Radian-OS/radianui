"use client"

import React from "react"
import { OrdersView } from "./orders-view"

export default function OrdersPage() {
	return (
		<main className="bg-background text-foreground min-h-screen w-full">
			<OrdersView />
		</main>
	)
}
