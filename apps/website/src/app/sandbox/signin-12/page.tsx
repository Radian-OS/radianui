import type { Metadata } from "next"
import { LoginView } from "./login-view"

export const metadata: Metadata = {
	title: "Login 04 — Modern Two-Column Authentication Page",
	description:
		"Welcome to Shadcn Space. Secure login screen with OAuth social sign in, email validation, and interactive wave visual showcase.",
}

export default function Login04Page() {
	return (
		<main className="bg-bg text-fg min-h-screen w-full">
			<LoginView />
		</main>
	)
}
