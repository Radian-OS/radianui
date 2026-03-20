"use client"

import { Eye } from "lucide-react"
import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { AuthLayout } from "./auth-layout"
import { RadianLogo } from "./radian-logo"

export function SignupStep({ onNext }: { onNext: () => void }) {
	return (
		<AuthLayout>
			<div className="flex w-full max-w-[360px] flex-col gap-8">
				<div className="flex flex-col gap-6">
					<RadianLogo />
					<div className="flex flex-col gap-2">
						<h2 className="heading-5">Sign up with email</h2>
						<p className="text-fg-secondary text-sm tracking-[-0.14px]">
							Already have an account?{" "}
							<Link href="#" className="text-primary font-medium">
								Sign in
							</Link>
						</p>
					</div>
				</div>

				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-5">
						<div className="flex flex-col gap-4">
							<div className="flex flex-col gap-1.5">
								<Label>Email Address</Label>
								<Input placeholder="Enter your email" type="email" />
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>Password</Label>
								<div className="relative">
									<Input placeholder="Enter your password" type="password" />
									<button
										type="button"
										className="text-fg-tertiary absolute right-2.5 top-1/2 -translate-y-1/2">
										<Eye className="size-5" />
									</button>
								</div>
							</div>
						</div>
						<Button onClick={onNext} className="w-full">
							Create an account
						</Button>
					</div>

					<div className="flex items-center gap-2">
						<Divider className="flex-1" />
						<span className="text-fg-tertiary text-sm font-medium tracking-[-0.14px]">
							Or continue with
						</span>
						<Divider className="flex-1" />
					</div>

					<div className="flex gap-3">
						<Button variant="outline" className="flex-1">
							<GoogleIcon />
							Google
						</Button>
						<Button variant="outline" className="flex-1">
							<GithubIcon />
							Github
						</Button>
					</div>
				</div>
			</div>
		</AuthLayout>
	)
}

function GoogleIcon() {
	return (
		<svg className="size-5" viewBox="0 0 20 20" fill="none">
			<path
				d="M18.171 8.368h-.67v-.035H10v3.333h4.709A5.002 5.002 0 010 10a5 5 0 015-5c1.275 0 2.434.48 3.317 1.267l2.357-2.357A8.295 8.295 0 0010 1.667a8.333 8.333 0 108.171 6.701z"
				fill="#FFC107"
			/>
			<path
				d="M1.628 6.121l2.74 2.009A5.002 5.002 0 0110 5c1.275 0 2.434.48 3.317 1.267l2.357-2.357A8.295 8.295 0 0010 1.667 8.329 8.329 0 001.628 6.121z"
				fill="#FF3D00"
			/>
			<path
				d="M10 18.333a8.294 8.294 0 005.587-2.163l-2.579-2.183A4.963 4.963 0 0110 15a5.002 5.002 0 01-4.701-3.32l-2.717 2.092A8.327 8.327 0 0010 18.333z"
				fill="#4CAF50"
			/>
			<path
				d="M18.171 8.368H17.5v-.035H10v3.333h4.71a5.017 5.017 0 01-1.703 2.321l2.58 2.183c-.183.166 2.746-2.003 2.746-6.17 0-.559-.057-1.104-.163-1.632z"
				fill="#1976D2"
			/>
		</svg>
	)
}

function GithubIcon() {
	return (
		<svg className="size-5" viewBox="0 0 20 20" fill="currentColor">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M10 1.667A8.333 8.333 0 001.667 10c0 3.683 2.388 6.804 5.704 7.908.417.075.571-.179.571-.4 0-.2-.008-.862-.008-1.567-2.096.387-2.638-.513-2.804-.983-.096-.242-.512-.983-.875-1.183-.3-.159-.729-.554-.009-.563.675-.008 1.159.621 1.321.879.775 1.304 2.013.937 2.509.712.075-.562.3-.937.545-1.154-1.904-.216-3.895-.954-3.895-4.229 0-.933.333-1.704.879-2.304-.087-.217-.383-1.092.087-2.271 0 0 .717-.225 2.354.879a7.894 7.894 0 012.084-.28c.708 0 1.416.096 2.083.28 1.638-1.112 2.354-.879 2.354-.879.471 1.179.175 2.054.088 2.271.546.6.879 1.363.879 2.304 0 3.284-1.996 4.013-3.896 4.229.309.267.575.783.575 1.588 0 1.15-.008 2.075-.008 2.362 0 .221.154.483.571.4A8.345 8.345 0 0018.333 10 8.333 8.333 0 0010 1.667z"
			/>
		</svg>
	)
}
