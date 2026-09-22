"use client"

import React from "react"
import { Asterisk } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import { Card } from "@/styles/default/ui/card"
import { FEATURE_AVATARS } from "./types"

export function LoginFeatureCard() {
	return (
		<div className="relative flex min-h-[560px] w-full flex-col justify-between overflow-hidden rounded-3xl bg-[#121316] p-8 sm:min-h-[620px] sm:p-12">
			{/* Watermark Curved Arcs */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
				<div className="absolute -top-24 -left-24 size-[520px] rounded-full border-[28px] border-white/[0.04]" />
				<div className="absolute top-1/4 -left-36 size-[460px] rounded-full border-[24px] border-white/[0.03]" />
				<div className="absolute -bottom-20 -left-20 size-[380px] rounded-full border-[20px] border-white/[0.03]" />
			</div>

			{/* Top Heading Content */}
			<div className="relative z-10 flex flex-col gap-3">
				<h2 className="heading-2 max-w-md font-bold text-white">
					Welcome back! Please sign in to your Shadcn Studio account
				</h2>
				<p className="max-w-sm text-xs leading-relaxed text-white/70 sm:text-sm">
					Thank you for registering! Please check your inbox and click the
					verification link to activate your account.
				</p>
			</div>

			{/* Docked Floating White Card */}
			<div className="relative z-10 mt-8">
				<Card className="relative overflow-hidden rounded-2xl border-0 bg-white p-6 text-zinc-900 shadow-2xl">
					{/* Top Right Black Star Badge */}
					<div className="absolute top-5 right-5 flex size-10 items-center justify-center rounded-xl bg-black text-white shadow-md">
						<Asterisk className="size-5 stroke-[2.5]" />
					</div>

					<div className="flex flex-col gap-1 pr-14">
						<h3 className="text-base font-bold text-zinc-900 sm:text-lg">
							Please enter your login details
						</h3>
						<p className="max-w-xs text-xs leading-relaxed text-zinc-600">
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
									className="border-2 border-white ring-0">
									<AvatarImage src={user.avatarUrl} alt={user.name} />
									<AvatarFallback className="text-[10px] font-semibold text-zinc-800">
										{user.initials}
									</AvatarFallback>
								</Avatar>
							))}
							<div className="flex size-7 items-center justify-center rounded-full border-2 border-white bg-zinc-100 text-[10px] font-semibold text-zinc-800">
								+3695
							</div>
						</div>
					</div>
				</Card>
			</div>
		</div>
	)
}
