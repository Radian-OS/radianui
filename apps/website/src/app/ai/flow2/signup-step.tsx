"use client"

import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import Signup from "../_components/signup"
import { GoogleIcon } from "../icon/google"
import { Radian } from "../icon/radian"

export default function SignupStep({ onNext }: { onNext: () => void }) {
	return (
		<div className="flex w-full max-w-[360px] flex-col gap-8">
			{/* Header */}
			<div className="flex flex-col gap-6">
				<Radian />
				<div className="flex flex-col gap-2">
					<h1 className="heading-5">Sign up with email</h1>
					<p className="text-fg-secondary text-sm">
						Already have an account?{" "}
						<Link href="#" className="text-primary font-medium hover:underline">
							Sign in
						</Link>
					</p>
				</div>
			</div>

			{/* Form */}
			<div className="flex flex-col gap-6">
				{/* Google Button */}
				<Button
					type="button"
					variant="outline"
					color="neutral"
					size="36"
					className="w-full">
					<GoogleIcon />
					Continue with Google
				</Button>

				{/* Divider */}
				<div className="flex items-center gap-2">
					<Divider className="flex-1" />
					<span className="text-fg-tertiary whitespace-nowrap text-sm font-medium">
						Or
					</span>
					<Divider className="flex-1" />
				</div>

				{/* Email & Password Form */}
				<Signup onNext={onNext} condition={true} />
			</div>
		</div>
	)
}
