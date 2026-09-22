"use client"

import React from "react"
import { ChatgptSettings } from "./chatgpt-settings"

export default function ChatgptSettingsPage() {
	return (
		<main className="bg-background/90 text-foreground flex min-h-screen w-full items-center justify-center">
			<ChatgptSettings />
		</main>
	)
}
