"use client"

import Image from "next/image"
import Link from "next/link"

interface AuthLayoutProps {
	children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<div className="flex min-h-screen w-full bg-white">
			{/* Left side - Decorative image (edge-to-edge) */}
			<div className="relative hidden lg:block lg:flex-1">
				<Image
					src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920&q=80"
					alt="Decorative gradient"
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/50 to-purple-600/60" />
			</div>

			{/* Right side - Form */}
			<div className="relative flex flex-1 flex-col">
				<div className="flex flex-1 items-center justify-center p-6">
					{children}
				</div>
				<p className="text-fg-tertiary pb-8 text-center text-sm">
					Having trouble? Contact our team at{" "}
					<Link
						href="mailto:support@radian.os"
						className="text-primary font-medium hover:underline">
						support@radian.os
					</Link>
				</p>
			</div>
		</div>
	)
}
