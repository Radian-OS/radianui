"use client"

import React from "react"
import { ChatgptSettings } from "./chatgpt-settings"

export default function ChatgptSettingsPage() {
	return (
		<main className="bg-bg text-fg flex min-h-screen w-full items-center justify-center">
			<ChatgptSettings />
		</main>
	)
}
