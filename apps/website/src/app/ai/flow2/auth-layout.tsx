"use client"

import { LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { Radian } from "../icon/radian"

interface AuthLayoutProps {
	children: React.ReactNode
	showHeader?: boolean
}

export default function AuthLayout({
	children,
	showHeader = false,
}: AuthLayoutProps) {
	return (
		<div className="flex min-h-screen w-full">
			{/* Left side - Form */}
			<div className="relative flex flex-1 flex-col">
				{showHeader && (
					<div className="flex items-center justify-between p-8">
						<Radian />
						<div className="flex items-center">
							<Button
								variant="ghost"
								color="neutral"
								className="text-fg-secondary flex items-center gap-1 text-sm font-medium">
								<LogOut className="size-5" />
								Sign out
							</Button>
							<span className="text-fg-tertiary text-sm">
								(design@radian.com)
							</span>
						</div>
					</div>
				)}
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

			{/* Right side - Decorative image */}
			<div className="hidden p-6 lg:flex lg:flex-1">
				<div className="relative w-full overflow-hidden rounded-2xl">
					<Image
						src="/media/background-2.jpg"
						alt="Decorative gradient"
						fill
						className="object-cover"
						priority
					/>
				</div>
			</div>
		</div>
	)
}
