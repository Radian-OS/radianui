"use client"

import React from "react"
import { Asterisk } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import { Card } from "@/styles/default/ui/card"
import { FEATURE_AVATARS } from "./types"

export function LoginFeatureCard() {
	return (
		<div className="border-border bg-elevation-level2 relative flex min-h-[560px] w-full flex-col justify-between overflow-hidden rounded-3xl border p-8 sm:min-h-[620px] sm:p-12">
			{/* Watermark Curved Arcs */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
				<div className="border-fg/[0.04] absolute -top-24 -left-24 size-[520px] rounded-full border-[28px]" />
				<div className="border-fg/[0.03] absolute top-1/4 -left-36 size-[460px] rounded-full border-[24px]" />
				<div className="border-fg/[0.03] absolute -bottom-20 -left-20 size-[380px] rounded-full border-[20px]" />
			</div>

			{/* Top Heading Content */}
			<div className="relative z-10 flex flex-col gap-3">
				<h2 className="heading-2 text-fg max-w-md font-bold">
					Welcome back! Please sign in to your Shadcn Studio account
				</h2>
				<p className="text-fg-secondary max-w-sm text-xs leading-relaxed sm:text-sm">
					Thank you for registering! Please check your inbox and click the
					verification link to activate your account.
				</p>
			</div>

			{/* Docked Floating Card */}
			<div className="relative z-10 mt-8">
				<Card className="border-border bg-card text-fg relative overflow-hidden rounded-2xl border p-6 shadow-2xl">
					{/* Top Right Star Badge */}
					<div className="bg-primary text-primary-fg absolute top-5 right-5 flex size-10 items-center justify-center rounded-xl shadow-md">
						<Asterisk className="size-5 stroke-[2.5]" />
					</div>

					<div className="flex flex-col gap-1 pr-14">
						<h3 className="text-fg text-base font-bold sm:text-lg">
							Please enter your login details
						</h3>
						<p className="text-fg-secondary max-w-xs text-xs leading-relaxed">
							Stay connected with shadcn/studio Subscribe now for the latest
							updates and news.
						</p>
					</div>

					{/* Bottom Avatar Stack */}
					<div className="mt-5 flex items-center justify-end">
						<div className="flex items-center -space-x-2">
							{FEATURE_AVATARS.map((user) => (
								<Avatar
									key={user.id}
									size="24"
									rounded="circle"
									className="border-card border-2 ring-0">
									<AvatarImage src={user.avatarUrl} alt={user.name} />
									<AvatarFallback className="text-fg text-[10px] font-semibold">
										{user.initials}
									</AvatarFallback>
								</Avatar>
							))}
							<div className="border-card bg-fill2 text-fg flex size-7 items-center justify-center rounded-full border-2 text-[10px] font-semibold">
								+3695
							</div>
						</div>
					</div>
				</Card>
			</div>
		</div>
	)
}
