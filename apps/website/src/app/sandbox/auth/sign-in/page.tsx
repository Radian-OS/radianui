import { Suspense } from "react"
import type { Metadata } from "next"
import SigninForm from "../sign-in"

export const metadata: Metadata = {
	title: "Sign In — Sandbox Playground",
	description: "Sign in to your Radian OS Sandbox account.",
}

export default function SignInPage() {
	return (
		<Suspense fallback={null}>
			<SigninForm />
		</Suspense>
	)
}
