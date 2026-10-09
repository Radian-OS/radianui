"use client"

import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/styles/default/ui/card"
import { FEATURE_AVATARS } from "./types"

export function LoginFeatureCard() {
	return (
		<Card className="relative flex h-full justify-between overflow-hidden rounded-2xl border-0 bg-neutral-950 px-0 py-8 text-white shadow-xl dark:bg-neutral-950">
			{/* Top Heading Content */}
			<CardHeader className="relative z-10 flex flex-col gap-6 p-0 px-8">
				<CardTitle className="text-4xl font-bold tracking-tight text-white xl:text-[42px] xl:leading-[54px] 2xl:text-5xl 2xl:leading-[62px]">
					Every great idea starts with a new beginning full of possibilities.
				</CardTitle>
				<CardDescription className="text-xl leading-relaxed font-normal text-white/80">
					Create an account to get started and bring your ideas to life.
				</CardDescription>
			</CardHeader>

			{/* Giant Geometric Asterisk Watermark */}
			<svg
				width="1em"
				height="1em"
				viewBox="0 0 128 128"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="pointer-events-none absolute bottom-[120px] -left-[200px] size-[520px] text-white/10 select-none"
				aria-hidden="true">
				<path
					d="M63.6734 24.8486V49.3899C63.6734 57.4589 57.1322 64.0001 49.0632 64.0001H25.2041"
					stroke="currentColor"
					strokeWidth="8.11681"
				/>
				<path
					d="M64.3266 103.152L64.3266 78.6106C64.3266 70.5416 70.8678 64.0003 78.9368 64.0003L102.796 64.0004"
					stroke="currentColor"
					strokeWidth="8.11681"
				/>
				<line
					x1="93.3468"
					y1="35.6108"
					x2="76.555"
					y2="52.205"
					stroke="currentColor"
					strokeWidth="8.11681"
				/>
				<line
					x1="51.7697"
					y1="77.0624"
					x2="34.9778"
					y2="93.6567"
					stroke="currentColor"
					strokeWidth="8.11681"
				/>
				<line
					x1="50.9584"
					y1="51.3189"
					x2="34.2651"
					y2="34.6256"
					stroke="currentColor"
					strokeWidth="8.11681"
				/>
				<line
					x1="93.1625"
					y1="93.6397"
					x2="76.4692"
					y2="76.9464"
					stroke="currentColor"
					strokeWidth="8.11681"
				/>
			</svg>

			{/* Docked Floating Card with Custom Notched Corner */}
			<CardContent className="relative z-1 mx-8 h-[248px] overflow-hidden rounded-2xl p-0">
				{/* Left extension background filler for ultra-wide screen responsiveness */}
				<div className="absolute inset-y-0 right-[1000px] left-0 -z-1 rounded-l-2xl bg-white" />

				{/* Exact shadcnstudio SVG cutout */}
				<svg
					width="1094"
					height="249"
					viewBox="0 0 1094 249"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="pointer-events-none absolute right-0 -z-1 select-none">
					<path
						d="M0.263672 16.8809C0.263672 8.0443 7.42712 0.880859 16.2637 0.880859H786.394H999.115C1012.37 0.880859 1023.12 11.626 1023.12 24.8808L1023.12 47.3809C1023.12 60.6357 1033.86 71.3809 1047.12 71.3809H1069.6C1082.85 71.3809 1093.6 82.126 1093.6 95.3809L1093.6 232.881C1093.6 241.717 1086.43 248.881 1077.6 248.881H16.2637C7.42716 248.881 0.263672 241.717 0.263672 232.881V16.8809Z"
						fill="white"
					/>
				</svg>

				{/* Top Right Studio Logo Badge */}
				<div className="absolute top-0 right-0 flex size-15 items-center justify-center rounded-2xl bg-white text-black">
					<svg
						width="1em"
						height="1em"
						viewBox="0 0 128 128"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="size-15 p-2.5">
						<path
							d="M63.6734 24.8486V49.3899C63.6734 57.4589 57.1322 64.0001 49.0632 64.0001H25.2041"
							stroke="currentColor"
							strokeWidth="8.11681"
						/>
						<path
							d="M64.3266 103.152L64.3266 78.6106C64.3266 70.5416 70.8678 64.0003 78.9368 64.0003L102.796 64.0004"
							stroke="currentColor"
							strokeWidth="8.11681"
						/>
						<line
							x1="93.3468"
							y1="35.6108"
							x2="76.555"
							y2="52.205"
							stroke="currentColor"
							strokeWidth="8.11681"
						/>
						<line
							x1="51.7697"
							y1="77.0624"
							x2="34.9778"
							y2="93.6567"
							stroke="currentColor"
							strokeWidth="8.11681"
						/>
						<line
							x1="50.9584"
							y1="51.3189"
							x2="34.2651"
							y2="34.6256"
							stroke="currentColor"
							strokeWidth="8.11681"
						/>
						<line
							x1="93.1625"
							y1="93.6397"
							x2="76.4692"
							y2="76.9464"
							stroke="currentColor"
							strokeWidth="8.11681"
						/>
					</svg>
				</div>

				{/* Card Text & Avatar Content */}
				<div className="relative z-1 flex flex-col gap-5 p-6 text-black">
					<p className="line-clamp-2 pr-12 text-3xl font-bold">
						Make room for what&apos;s next.
					</p>
					<p className="line-clamp-2 text-lg text-neutral-600">
						A fresh start begins with a single step. Create your account and get
						going.
					</p>
					<div className="flex -space-x-4 self-end">
						{FEATURE_AVATARS.map((user) => (
							<Avatar
								key={user.id}
								size="48"
								rounded="circle"
								className="border-2 border-white ring-0">
								<AvatarImage src={user.avatarUrl} alt={user.name} />
								<AvatarFallback className="bg-neutral-100 text-xs font-normal text-neutral-600">
									{user.initials}
								</AvatarFallback>
							</Avatar>
						))}
						<Avatar
							size="48"
							rounded="circle"
							className="border-2 border-white ring-0">
							<AvatarFallback className="bg-[#f4f4f5] text-xs font-normal text-neutral-600">
								+3695
							</AvatarFallback>
						</Avatar>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
