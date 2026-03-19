"use client"

import { Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import RadianLogo from "./radian-logo"
import SupportFooter from "./support-footer"

type SignupStepProps = {
	onNext: () => void
}

export default function SignupStep({ onNext }: SignupStepProps) {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center px-4">
			<div className="flex w-full max-w-[360px] flex-col gap-8">
				<div className="flex flex-col gap-6">
					<RadianLogo />
					<div className="flex flex-col gap-2">
						<h1 className="heading-5">Sign up with email</h1>
						<p className="text-fg-secondary text-sm">
							Already have an account?{" "}
							<Link href="#" className="text-primary-text font-medium">
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
								<Input type="email" placeholder="Enter your email" />
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>Password</Label>
								<Input type="password" placeholder="Create a password" />
							</div>
						</div>
						<Button
							variant="strong"
							color="primary"
							className="w-full"
							onClick={onNext}>
							Create an account
						</Button>
					</div>

					<div className="flex items-center gap-2">
						<Divider className="flex-1" />
						<span className="text-fg-tertiary text-sm font-medium">
							Or continue with
						</span>
						<Divider className="flex-1" />
					</div>

					<div className="flex gap-3">
						<Button variant="outline" color="neutral" className="flex-1">
							<Image
								src="https://www.google.com/favicon.ico"
								alt="Google"
								width={20}
								height={20}
								unoptimized
							/>
							Google
						</Button>
						<Button variant="outline" color="neutral" className="flex-1">
							<Github className="size-5" />
							Github
						</Button>
					</div>
				</div>
			</div>

			<div className="absolute bottom-10">
				<SupportFooter />
			</div>
		</div>
	)
}
