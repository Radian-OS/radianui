"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { AuthLayout } from "./auth-layout"
import { RadianLogo } from "./radian-logo"

interface SignupStepProps {
	onNext: () => void
}

export function SignupStep({ onNext }: SignupStepProps) {
	const [showPassword, setShowPassword] = useState(false)

	return (
		<AuthLayout>
			<div className="flex w-full max-w-[360px] flex-col gap-8">
				<div className="flex flex-col gap-6">
					<RadianLogo />
					<div className="flex flex-col gap-2">
						<h1 className="heading-5">Sign up with email</h1>
						<p className="text-fg-secondary text-sm">
							Already have an account?{" "}
							<Link href="#" className="text-primary font-medium">
								Sign in
							</Link>
						</p>
					</div>
				</div>

				<div className="flex flex-col gap-6">
					<Button variant="outline" size="36" className="w-full gap-1.5">
						<svg className="size-5" viewBox="0 0 24 24">
							<path
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
								fill="#4285F4"
							/>
							<path
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								fill="#34A853"
							/>
							<path
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								fill="#FBBC05"
							/>
							<path
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								fill="#EA4335"
							/>
						</svg>
						Continue with Google
					</Button>

					<div className="flex items-center gap-2">
						<Divider className="flex-1" />
						<span className="text-fg-tertiary text-sm font-medium">Or</span>
						<Divider className="flex-1" />
					</div>

					<div className="flex flex-col gap-5">
						<div className="flex flex-col gap-4">
							<div className="flex flex-col gap-1.5">
								<Label>Email Address</Label>
								<Input type="email" size="36" placeholder="you@example.com" />
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>Password</Label>
								<div className="relative">
									<Input
										type={showPassword ? "text" : "password"}
										size="36"
										className="pr-10"
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="text-fg-tertiary hover:text-fg-secondary absolute right-2.5 top-1/2 -translate-y-1/2">
										{showPassword ? (
											<EyeOff className="size-5" />
										) : (
											<Eye className="size-5" />
										)}
									</button>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-3">
							<Button
								variant="strong"
								color="primary"
								size="36"
								className="w-full"
								onClick={onNext}>
								Create account
							</Button>
							<p className="text-fg-secondary text-[13px]">
								By signing up, you agree to Radian&apos;s{" "}
								<Link href="#" className="text-primary font-medium">
									Terms of Service
								</Link>{" "}
								and{" "}
								<Link href="#" className="text-primary font-medium">
									Privacy Policy
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</AuthLayout>
	)
}
