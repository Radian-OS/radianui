"use client"

import { useId, useState } from "react"
import Image from "next/image"
import { Button, LinkButton } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Divider } from "@/registry/ui/divider"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Spinner } from "@/registry/ui/spinner"
import { GithubIcon } from "./github-icon"
import { GoogleIcon } from "./google-icon"

export const radiusMap: Record<string, string> = {
	default: "",
	rounded: "rounded-full",
	flat: "rounded-none",
	fun: "rounded-xl",
}

export default function PlaygroundSignin({ rounded }: { rounded: "default" | "rounded" | "flat" | "fun" }) {
	const rememberMeId = useId()
	const emailId = useId()
	const passwordId = useId()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [rememberMe, setRememberMe] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsLoading(true)
		console.log({ email, password, rememberMe })

		setTimeout(() => {
			setIsLoading(false)
			setEmail("")
			setPassword("")
			setRememberMe(false)
		}, 2000)
	}

	return (
		<div className="bg-elevation-negative flex h-full w-full items-center justify-center px-5 py-4">
			<div className="w-100 bg-bg border-border flex rounded-2xl border px-6 py-8">
				<div className="flex flex-1 flex-col gap-8">
					<Image src="/mstile-144x144.png" alt="Logo" width="48" height="48" />
					<div className="flex flex-col gap-2">
						<h1 className="heading-5">Sign In</h1>
						<p className="text-fg-secondary text-sm">Welcome! Sign in to continue</p>
					</div>
					<div className="flex flex-1 flex-col gap-6">
						<div className="flex gap-3">
							<Button variant="outline" color="neutral" className={`text-fg-secondary w-full ${radiusMap[rounded]}`}>
								<GoogleIcon />
								Google
							</Button>
							<Button variant="outline" color="neutral" className={`text-fg-secondary w-full ${radiusMap[rounded]}`}>
								<GithubIcon />
								Github
							</Button>
						</div>
						<div className="flex items-center gap-2">
							<Divider className="flex-1" />
							<span className="text-fg-secondary whitespace-nowrap text-sm font-medium">Or continue with</span>
							<Divider className="flex-1" />
						</div>
					</div>

					<form onSubmit={handleSubmit}>
						<div className="flex flex-col gap-5">
							<div className="flex flex-col gap-1.5">
								<Label htmlFor={emailId}>Email Address</Label>
								<Input id={emailId} size="36" type="email" className={`${radiusMap[rounded]} w-full`} value={email} onChange={(e) => setEmail(e.target.value)} />
							</div>

							<div className="flex flex-col gap-1.5">
								<Label htmlFor={passwordId}>Password</Label>
								<Input id={passwordId} size="36" type="password" className={`${radiusMap[rounded]} w-full`} value={password} onChange={(e) => setPassword(e.target.value)} />
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<Checkbox id={rememberMeId} checked={rememberMe} onCheckedChange={(checked) => setRememberMe(!!checked)} className={`${radiusMap[rounded]}`} />
									<Label htmlFor={rememberMeId} className="text-fg-secondary font-normal">
										Remember me
									</Label>
								</div>
								<LinkButton href="#" color="primary">
									Forgot Password?
								</LinkButton>
							</div>

							<Button className={`w-full ${radiusMap[rounded]}`} type="button" disabled={isLoading}>
								{isLoading ? <Spinner variant="default" /> : "Sign In"}
							</Button>
						</div>
					</form>

					<p className="text-fg text-center text-sm">
						Don&apos;t have an account?{" "}
						<LinkButton href="#" color="primary">
							Create account
						</LinkButton>
					</p>
				</div>
			</div>
		</div>
	)
}
