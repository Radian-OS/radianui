"use client"

import React from "react"
import { Asterisk } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import { Card } from "@/styles/default/ui/card"
import { FEATURE_AVATARS } from "./types"

export function LoginFeatureCard() {
	return (
		<div className="border-soft bg-elevation-level2 relative hidden min-h-[560px] w-full flex-col justify-between overflow-hidden rounded-3xl border p-8 sm:min-h-[620px] sm:p-12 md:flex">
			{/* Top Heading Content */}
			<div className="relative z-10 flex flex-col gap-3">
				<h2 className="heading-3">
					Welcome back! Please sign in to your Radian UI account
				</h2>
				<p className="text-fg-secondary max-w-sm text-sm leading-relaxed sm:text-sm">
					Thank you for registering! Please check your inbox and click the
					verification link to activate your account.
				</p>
			</div>

			{/* Docked Floating Card */}
			<div className="relative z-10 mt-8">
				<Card className="border-soft bg-card text-fg relative overflow-hidden rounded-2xl border p-6">
					{/* Top Right Star Badge */}
					<div className="absolute top-5 right-5 flex size-10 items-center justify-center">
						<img src="/logo.svg" alt="Radian Logo" className="size-14" />
					</div>

					<div className="flex flex-col gap-1 pr-14">
						<h3 className="text-fg text-base font-bold sm:text-lg">
							Please enter your login details
						</h3>
						<p className="text-fg-secondary max-w-xs text-xs leading-relaxed">
							Stay connected with Radian Subscribe now for the latest updates
							and news.
						</p>
					</div>

					{/* Bottom Avatar Stack */}
					<div className="mt-5 flex items-center justify-end">
						<div className="flex items-center -space-x-2">
							{FEATURE_AVATARS.map((user) => (
								<Avatar
									key={user.id}
									size="sm"
									rounded="circle"
									className="bg-fg">
									<AvatarImage src={user.avatarUrl} alt={user.name} />
									<AvatarFallback className="">{user.initials}</AvatarFallback>
								</Avatar>
							))}
							<Avatar size="sm" rounded="circle">
								<AvatarFallback>+9</AvatarFallback>
							</Avatar>
						</div>
					</div>
				</Card>
			</div>
		</div>
	)
}
