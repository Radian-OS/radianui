"use client"

import React from "react"
import { motion } from "motion/react"
import {
	BookOpen,
	CheckCircle2,
	CircleUser,
	Clock,
	Command,
	FileText,
	Globe,
	Keyboard,
	Lock,
	Mail,
	MailPlus,
	Monitor,
	RotateCw,
	Settings,
	ShieldCheck,
	Smartphone,
	Sparkles,
	Tablet,
	User,
	UserPlus,
	Users,
	Video,
	X,
	Zap,
	ArrowLeft,
	ArrowRight,
	Calendar as CalendarIcon,
	Image as ImageIcon,
	TrendingUp,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, IconButton } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/styles/default/ui/card"
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	AvatarIndicator,
	AvatarStatus,
} from "@/styles/default/ui/avatar"
import { IconSlot } from "@/registry/icon/icon-library"
import { Divider } from "@/styles/default/ui/divider"

function BrandLogo({
	size = 24,
	className,
	fill = "currentColor",
	...props
}: {
	size?: number
	className?: string
	fill?: string
} & React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="26 18 28 28"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={cn("shrink-0", className)}
			shapeRendering="geometricPrecision"
			{...props}>
			<path
				d="M44.375 37.25C44.375 42.0825 40.4575 46 35.625 46H34.75C29.9175 46 26 42.0825 26 37.25H44.375ZM54 37.25C54 42.0825 50.0825 46 45.25 46V37.25H54ZM35.1875 18C40.2616 18 44.375 22.1134 44.375 27.1875C44.375 32.2616 40.2616 36.375 35.1875 36.375C30.1134 36.375 26 32.2616 26 27.1875C26 22.1134 30.1134 18 35.1875 18ZM45.25 18C50.0825 18 54 21.9175 54 26.75V27.625C54 32.4575 50.0825 36.375 45.25 36.375V18Z"
				fill={fill}
			/>
		</svg>
	)
}

function BrandAppIcon({
	size = 48,
	className,
	fill = "var(--color-primary, #F36A25)",
	stroke = "color-mix(in srgb, var(--color-primary, #F36A25) 85%, white 15%)",
	glyphFill,
	style,
	...props
}: {
	size?: number
	className?: string
	fill?: string
	stroke?: string
	glyphFill?: string
} & Omit<React.SVGProps<SVGSVGElement>, "fill" | "stroke">) {
	const id = React.useId()

	return (
		<svg
			width={size}
			height={size}
			viewBox="16 8 48 48"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={cn("shrink-0", className)}
			shapeRendering="geometricPrecision"
			style={{
				filter: "drop-shadow(0 8px 16px rgba(25, 24, 27, 0.08))",
				...style,
			}}
			{...props}>
			<defs>
				<linearGradient
					id={`paint0_linear_${id}`}
					x1="40"
					y1="8"
					x2="42"
					y2="56"
					gradientUnits="userSpaceOnUse">
					<stop stopColor="white" stopOpacity="0" />
					<stop offset="1" stopColor="white" stopOpacity="0.15" />
				</linearGradient>
				<linearGradient
					id={`paint1_linear_${id}`}
					x1="40"
					y1="18"
					x2="40"
					y2="46"
					gradientUnits="userSpaceOnUse">
					<stop stopColor="white" />
					<stop offset="1" stopColor="white" stopOpacity="0.75" />
				</linearGradient>
			</defs>
			{/* Squircle base */}
			<path
				d="M16 20C16 13.3726 21.3726 8 28 8H52C58.6274 8 64 13.3726 64 20V44C64 50.6274 58.6274 56 52 56H28C21.3726 56 16 50.6274 16 44V20Z"
				fill={fill}
			/>
			{/* Subtle linear shine */}
			<path
				d="M16 20C16 13.3726 21.3726 8 28 8H52C58.6274 8 64 13.3726 64 20V44C64 50.6274 58.6274 56 52 56H28C21.3726 56 16 50.6274 16 44V20Z"
				fill={`url(#paint0_linear_${id})`}
			/>
			{/* Inner border stroke */}
			<path
				d="M28 8.35352H52C58.4321 8.35352 63.6465 13.5679 63.6465 20V44C63.6465 50.4321 58.4321 55.6465 52 55.6465H28C21.5679 55.6465 16.3535 50.4321 16.3535 44V20C16.3535 13.5679 21.5679 8.35352 28 8.35352Z"
				stroke={stroke}
				strokeWidth="0.70713"
			/>
			{/* Logo Glyph */}
			<path
				d="M44.375 37.25C44.375 42.0825 40.4575 46 35.625 46H34.75C29.9175 46 26 42.0825 26 37.25H44.375ZM54 37.25C54 42.0825 50.0825 46 45.25 46V37.25H54ZM35.1875 18C40.2616 18 44.375 22.1134 44.375 27.1875C44.375 32.2616 40.2616 36.375 35.1875 36.375C30.1134 36.375 26 32.2616 26 27.1875C26 22.1134 30.1134 18 35.1875 18ZM45.25 18C50.0825 18 54 21.9175 54 26.75V27.625C54 32.4575 50.0825 36.375 45.25 36.375V18Z"
				fill={glyphFill ?? `url(#paint1_linear_${id})`}
			/>
		</svg>
	)
}

export default function Preview07() {
	return (
		<div className="bg-bg min-h-screen w-full p-4 sm:p-6 lg:p-8">
			<div className="mx-auto grid max-w-[1340px] grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
				{/* ---------------- COLUMN 1: Brand Assets & Context Window ---------------- */}
				<div className="flex flex-col gap-4">
					<Card className="border-border/80 group relative aspect-[1.53/1] gap-0 overflow-hidden rounded-[26px] p-0 shadow-sm select-none">
						<img
							src="/themer/card.png"
							className="h-full w-full object-cover"
							alt="Card"
						/>
						<div className="bg-primary absolute inset-0 mix-blend-color"></div>
					</Card>

					{/* 1.2 App Icon Variants */}
					<Card className="border-soft gap-0 p-6 shadow-none">
						<div className="flex items-center justify-center gap-6">
							{/* Solid Primary App Icon */}
							<div className="transition-transform hover:scale-105">
								<BrandAppIcon size={48} />
							</div>
							{/* Tinted Accent App Icon */}
							<div className="transition-transform hover:scale-105">
								<BrandAppIcon
									size={48}
									fill="var(--color-fg-tertiary)"
									stroke="var(--color-fg-tertiary)"
									glyphFill="var(--color-fg-inverse)"
								/>
							</div>
							{/* Elevated Outline App Icon */}
							<div className="transition-transform hover:scale-105">
								<BrandAppIcon
									size={48}
									fill="none"
									stroke="var(--color-soft)"
									glyphFill="var(--color-primary)"
								/>
							</div>
							{/* Neutral Muted App Icon */}
							<div className="transition-transform hover:scale-105">
								<BrandAppIcon
									size={48}
									fill="none"
									stroke="var(--color-soft)"
									glyphFill="var(--color-fg-tertiary)"
								/>
							</div>
						</div>
					</Card>

					{/* 1.3 Browser Mockup Card */}
					<Card className="border-border/80 relative gap-0 overflow-hidden p-0 shadow-sm">
						{/* Window Header */}
						<div className="border-border/80 bg-fill1/80 flex items-center gap-2 border-b px-3 py-2">
							<div className="flex items-center gap-1.5">
								<span className="size-2.5 rounded-full bg-red-400/80" />
								<span className="size-2.5 rounded-full bg-amber-400/80" />
								<span className="size-2.5 rounded-full bg-emerald-400/80" />
							</div>
							<div className="border-border/80 bg-bg text-fg -mb-2 flex items-center gap-1.5 rounded-t-lg border-x border-t px-2.5 py-1 text-[11px] font-medium shadow-xs">
								<BrandLogo
									className="text-primary size-3"
									fill="currentColor"
								/>
								<span className="">Xavion</span>
							</div>
						</div>

						{/* Window Nav & Address Bar */}
						<div className="border-border/60 bg-fill1/40 flex items-center gap-2 border-b px-3 py-1.5">
							<div className="text-fg-secondary flex items-center gap-1">
								<ArrowLeft className="size-3" />
								<ArrowRight className="size-3" />
								<RotateCw className="size-3" />
							</div>
							<div className="border-border/60 bg-bg text-fg flex flex-1 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px]">
								<Lock className="text-primary size-2.5" />
								<span className="text-fg-secondary">www.xavion.com</span>
							</div>
						</div>

						{/* Browser Viewport Area with Dynamic Primary Wave */}
						<div
							className="relative h-20 w-full overflow-hidden"
							style={{
								background:
									"radial-gradient(circle at 65% 30%, color-mix(in srgb, var(--color-primary) 35%, transparent), transparent 75%), linear-gradient(180deg, var(--color-fill1), var(--color-fill2))",
							}}>
							<div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:10px_10px]" />
						</div>
					</Card>

					{/* 1.4 Context Window Token Visualizer */}
					<Card className="border-border/80 gap-3 p-4 shadow-sm">
						<div className="flex items-center justify-between">
							<span className="text-fg text-sm font-semibold">
								Context window
							</span>
							<div className="flex items-center gap-1.5">
								<span className="border-border bg-fill2 text-fg-secondary rounded border px-1.5 py-0.5 text-[10px] font-medium">
									gpt-4o
								</span>
								<Badge color="primary" variant="soft" size="sm">
									88%
								</Badge>
							</div>
						</div>

						<div>
							<span className="text-fg text-lg font-bold tracking-tight">
								178.5K
							</span>{" "}
							<span className="text-fg-secondary text-xs">of 200K tokens</span>
						</div>

						{/* 70 Blocks Matrix (14 cols x 5 rows) */}
						<div className="grid grid-cols-14 gap-1 py-1">
							{Array.from({ length: 70 }).map((_, index) => {
								let bgClass = "bg-fill3 border border-border/50"
								if (index < 18) {
									bgClass = "bg-primary"
								} else if (index < 38) {
									bgClass = "bg-primary/80"
								} else if (index < 62) {
									bgClass = "bg-primary/45"
								}
								return (
									<div
										key={index}
										className={`aspect-square rounded-[2px] transition-colors duration-300 ${bgClass}`}
									/>
								)
							})}
						</div>

						{/* Breakdown Legend */}
						<div className="text-fg-secondary space-y-1.5 pt-1 text-xs">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-1.5">
									<span className="bg-primary size-2 rounded-full" />
									<span>System prompt</span>
								</div>
								<span className="text-fg font-medium">10</span>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center gap-1.5">
									<span className="bg-primary/80 size-2 rounded-full" />
									<span>Files</span>
								</div>
								<span className="text-fg font-medium">4</span>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center gap-1.5">
									<span className="bg-primary/45 size-2 rounded-full" />
									<span>Conversation</span>
								</div>
								<Button
									size="xs"
									variant="outline"
									color="neutral"
									className="h-5 px-1.5 text-[10px]">
									Compact
								</Button>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center gap-1.5">
									<span className="border-border bg-fill3 size-2 rounded-full border" />
									<span>Token remaining</span>
								</div>
								<span className="text-fg-secondary text-[11px]">21.5K</span>
							</div>
						</div>
					</Card>
				</div>

				<div className="flex flex-col gap-4">
					<Card className="text-primary-fg bg-primary-text relative max-w-118 gap-5.5 overflow-hidden rounded-[20px] p-6 shadow-none">
						<div className="relative z-10 flex flex-col items-start gap-3">
							<div className="flex items-center gap-3">
								<div className="border-primary-accent bg-primary-accent flex size-9 shrink-0 items-center justify-center rounded-lg border">
									<IconSlot
										slot="zap"
										className="fill-primary stroke-primary"
										size={20}
									/>
								</div>
								<h3 className="text-primary-accent text-xl font-medium tracking-tight">
									Bank level security
								</h3>
							</div>
							<div>
								<p className="text-primary-accent text-sm font-normal">
									Security you can trust. Your financial safety is our highest
									priority.
								</p>
							</div>
						</div>

						<div className="border-primary text-primary-accent relative z-10 space-y-2.5 rounded-[20px] border bg-white/8 p-4">
							<div className="flex items-center justify-between gap-3">
								<span className="text-base font-medium">
									Realtime Transaction Alert
								</span>
								<div className="glass bg-white-inverse/20 flex size-8.5 items-center justify-center rounded-full">
									<IconSlot slot="clock" size={16} />
								</div>
							</div>

							<Divider className="bg-primary my-3.5" />

							<div className="bg-primary flex items-center justify-between rounded-xl p-2.5">
								<div className="flex items-center gap-2.5">
									<div className="bg-primary-accent flex size-9 items-center justify-center rounded-lg">
										<TrendingUp className="text-primary size-5" />
									</div>
									<div className="flex flex-col gap-1">
										<div className="text-xs font-medium">Off Grid Chart</div>
										<div className="text-xs font-normal">Tue, 1:30</div>
									</div>
								</div>
								<div className="flex flex-col gap-1 text-right">
									<div className="text-xs font-medium">$409.00</div>
									<div className="text-xs font-normal">$0 Fee</div>
								</div>
							</div>

							<div className="bg-primary flex items-center justify-between rounded-xl p-2.5">
								<div className="flex items-center gap-2.5">
									<Avatar
										rounded="square"
										className="bg-primary-accent"
										size="md">
										<AvatarImage
											src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/2.png"
											alt="Michaela Stone"
										/>
										<AvatarFallback className="text-[9px]">MS</AvatarFallback>
									</Avatar>
									<div className="flex flex-col gap-1">
										<div className="text-xs font-medium">Michaela Stone</div>
										<div className="text-xs font-normal">Member</div>
									</div>
								</div>
								<div className="flex flex-col gap-1 text-right">
									<div className="text-xs font-medium">$129.42</div>
									<div className="text-xs font-normal">$0 Fee</div>
								</div>
							</div>

							<div className="bg-primary flex items-center justify-between rounded-xl p-2.5">
								<div className="flex items-center gap-2.5">
									<div className="flex size-9 items-center justify-center rounded-lg bg-white/15">
										<Globe className="size-5 text-white" />
									</div>
									<div className="text-xs font-medium">Acme Inc.</div>
								</div>
								<div className="text-right text-xs font-normal">$129.42</div>
							</div>
						</div>

						<div className="flex items-center justify-center gap-1.5 pt-1">
							<span className="size-1.5 rounded-full bg-white/40" />
							<span className="size-1.5 rounded-full bg-white/40" />
							<span className="h-1.5 w-4 rounded-full bg-white" />
							<span className="size-1.5 rounded-full bg-white/40" />
						</div>
					</Card>

					<Card className="border-border/80 gap-0 overflow-hidden p-0 shadow-sm">
						{/* Top graphic wave */}
						<div
							className="h-14 w-full"
							style={{
								background:
									"radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--color-primary) 30%, transparent), transparent 70%), var(--color-fill2)",
							}}
						/>
						<CardContent className="-mt-6 space-y-2 p-4 pt-0">
							<div className="flex size-12 items-center justify-center">
								<BrandAppIcon size={48} />
							</div>

							<div>
								<div className="text-fg flex items-center gap-1.5 text-sm font-bold">
									<span>Xavion Corp</span>
									<CheckCircle2 className="text-primary fill-primary/20 size-4" />
								</div>
								<a
									href="https://xavion.com"
									className="text-primary hover:text-primary-hover text-xs font-medium transition-colors">
									https://xavion.com
								</a>
							</div>

							<p className="text-fg-secondary text-xs leading-relaxed">
								An open-source design library and foundational design system for
								modern software products.
							</p>
						</CardContent>
					</Card>

					{/* 2.3 Color Palette Swatches Bar */}
					<Card className="border-border/80 gap-0 p-2 shadow-sm">
						<div className="border-border/60 grid h-8 grid-cols-5 overflow-hidden rounded-lg border shadow-inner">
							<div
								className="bg-primary flex items-center justify-center transition-colors"
								title="Primary"
							/>
							<div
								className="bg-primary/80 flex items-center justify-center transition-colors"
								title="Primary 80%"
							/>
							<div
								className="bg-primary-accent flex items-center justify-center transition-colors"
								title="Primary Accent"
							/>
							<div
								className="bg-primary-focus flex items-center justify-center transition-colors"
								title="Primary Focus"
							/>
							<div
								className="bg-fg flex items-center justify-center transition-colors"
								title="Foreground"
							/>
						</div>
					</Card>
				</div>

				{/* ---------------- COLUMN 3: Hero Banner & Smartphone Mockup ---------------- */}
				<div className="flex flex-col gap-4">
					{/* 3.1 Brand Aurora Hero Banner */}
					<Card className="border-soft relative flex h-52 items-center justify-center gap-0 overflow-hidden rounded-[20px] p-0">
						<img
							src="/themer/pattern1.png"
							className="h-full w-full object-cover"
							alt="Card"
						/>
						<div className="bg-primary absolute inset-0 z-10 mix-blend-color"></div>
						<div className="absolute z-20 flex items-center gap-4 mix-blend-overlay">
							<BrandLogo className="size-12 text-white" fill="currentColor" />
							<span className="text-4xl font-bold tracking-tight text-white">
								Xavion
							</span>
						</div>
					</Card>

					{/* 3.2 Smartphone Mockup */}
					<Card className="border-border/80 relative flex items-center justify-center gap-0 overflow-hidden bg-neutral-950 p-3 shadow-sm">
						<div className="relative flex aspect-[9/15.5] w-full max-w-[210px] flex-col justify-between overflow-hidden rounded-[30px] border-[5px] border-neutral-800 bg-neutral-950 p-2.5 shadow-2xl">
							{/* Ambient Screen Wallpaper */}
							<div
								className="absolute inset-0"
								style={{
									background:
										"radial-gradient(circle at 50% 35%, color-mix(in srgb, var(--color-primary) 40%, transparent), transparent 70%), #0c1015",
								}}
							/>

							{/* Dynamic Island & Status Bar */}
							<div className="relative z-10">
								<div className="mx-auto mb-1 h-3.5 w-14 rounded-full bg-black shadow-xs" />
								<div className="flex items-center justify-between px-1 text-[10px] font-semibold text-white">
									<span>9:41</span>
									<div className="flex items-center gap-1">
										<span className="size-1.5 rounded-full bg-white" />
										<span className="size-1.5 rounded-full bg-white" />
									</div>
								</div>
							</div>

							{/* Home Screen App Grid */}
							<div className="relative z-10 my-auto grid grid-cols-3 gap-2 py-2">
								{/* App: Xavion */}
								<div className="flex flex-col items-center gap-1">
									<div className="flex size-9 items-center justify-center transition-transform hover:scale-105">
										<BrandAppIcon size={36} />
									</div>
									<span className="text-[9px] text-white/90">Xavion</span>
								</div>

								{/* App: Calendar */}
								<div className="flex flex-col items-center gap-1">
									<div className="flex size-9 flex-col items-center justify-center rounded-xl bg-white text-neutral-900 shadow-sm transition-transform hover:scale-105">
										<span className="text-[8px] font-bold text-red-500">
											Tue
										</span>
										<span className="text-xs leading-none font-bold">1</span>
									</div>
									<span className="text-[9px] text-white/90">Calendar</span>
								</div>

								{/* App: Photos */}
								<div className="flex flex-col items-center gap-1">
									<div className="flex size-9 items-center justify-center rounded-xl bg-white text-neutral-900 shadow-sm transition-transform hover:scale-105">
										<ImageIcon className="size-4 text-amber-500" />
									</div>
									<span className="text-[9px] text-white/90">Photos</span>
								</div>

								{/* App: Mail */}
								<div className="flex flex-col items-center gap-1">
									<div className="flex size-9 items-center justify-center rounded-xl bg-blue-500 text-white shadow-sm transition-transform hover:scale-105">
										<Mail className="size-4" />
									</div>
									<span className="text-[9px] text-white/90">Mail</span>
								</div>

								{/* App: Notes */}
								<div className="flex flex-col items-center gap-1">
									<div className="flex size-9 items-center justify-center rounded-xl bg-amber-400 text-neutral-900 shadow-sm transition-transform hover:scale-105">
										<FileText className="size-4" />
									</div>
									<span className="text-[9px] text-white/90">Notes</span>
								</div>

								{/* App: Podcasts */}
								<div className="flex flex-col items-center gap-1">
									<div className="flex size-9 items-center justify-center rounded-xl bg-purple-600 text-white shadow-sm transition-transform hover:scale-105">
										<Sparkles className="size-4" />
									</div>
									<span className="text-[9px] text-white/90">Podcasts</span>
								</div>
							</div>

							{/* Bottom Indicator */}
							<div className="relative z-10 mx-auto h-1 w-16 rounded-full bg-white/40" />
						</div>
					</Card>

					{/* 3.3 Glassmorphic Dock */}
					<Card className="border-border/80 relative flex h-24 items-center justify-center gap-0 overflow-hidden p-0 shadow-sm">
						<div
							className="absolute inset-0"
							style={{
								background:
									"radial-gradient(ellipse at 50% 50%, color-mix(in srgb, var(--color-primary) 45%, #03120c), #030806 90%)",
							}}
						/>
						{/* Subtle streak */}
						<div className="bg-primary/40 pointer-events-none absolute inset-y-0 w-12 skew-x-6 blur-lg" />

						{/* Frosted Dock Pill */}
						<div className="relative z-10 flex items-center gap-2.5 rounded-2xl border border-white/25 bg-white/15 p-2 shadow-xl backdrop-blur-md dark:bg-white/10">
							<div className="flex size-8 items-center justify-center rounded-lg bg-neutral-800 text-white/90 shadow-xs">
								<Settings className="size-4" />
							</div>
							<div className="flex size-8 items-center justify-center">
								<BrandAppIcon size={32} />
							</div>
							<div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-xs">
								<Video className="size-4" />
							</div>
						</div>
					</Card>
				</div>

				{/* ---------------- COLUMN 4: Menu, Controls & Testimonial ---------------- */}
				<div className="flex flex-col gap-4">
					{/* 4.1 User Profile Dropdown Menu */}
					<Card className="border-soft relative isolate flex max-h-89 items-center justify-center gap-0 overflow-hidden rounded-3xl p-8 pb-0 sm:px-5">
						<img
							src="/themer/pattern1.png"
							className="absolute inset-0 h-full w-full object-cover"
							alt="Pattern"
						/>
						<div className="bg-primary absolute inset-0 z-10 mix-blend-color" />

						{/* Inset Profile Menu Card */}
						<div className="bg-fill2 z-20 h-100 rounded-3xl rounded-b-none p-1.5">
							<div className="bg-elevation-level1 border-soft relative h-fit w-full overflow-hidden rounded-2xl border font-normal shadow-lg">
								{/* User Info Header */}
								<div className="flex items-center justify-between gap-3 p-3.5">
									<div className="flex items-center gap-2.5 overflow-hidden">
										<Avatar
											size="md"
											rounded="square"
											className="bg-primary-accent">
											<AvatarImage
												src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/13.png"
												alt="Laura Morga"
											/>
											<AvatarFallback className="text-xs font-semibold">
												LM
											</AvatarFallback>
											<AvatarIndicator className="right-1 bottom-1">
												<AvatarStatus size="lg" variant={"online"} />
											</AvatarIndicator>
										</Avatar>
										<div className="truncate">
											<div className="text-fg text-sm leading-tight font-medium">
												Laura Morga
											</div>
											<div className="text-fg-secondary truncate text-xs leading-normal font-normal">
												morga@radian.com
											</div>
										</div>
									</div>
									<Badge variant="strong">
										<Zap className="size-3.5 fill-current" /> PRO
									</Badge>
								</div>

								<div className="border-soft border-b" />

								{/* Group 1: Profile & Shortcuts */}
								<div className="space-y-0.5 p-1.5 font-normal">
									<div className="text-fg hover:bg-fill1 flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-1.5 text-sm transition-colors">
										<CircleUser className="text-fg-secondary size-4.5" />
										<span>Profile</span>
									</div>
									<div className="text-fg hover:bg-fill1 flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-1.5 text-sm transition-colors">
										<Keyboard className="text-fg-secondary size-4.5" />
										<span>Keyboard shortcuts</span>
									</div>
								</div>

								<div className="border-soft border-b" />

								{/* Group 2: Settings, Invite & Team */}
								<div className="space-y-0.5 p-1.5">
									<div className="text-fg hover:bg-fill1 flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-1.5 text-sm transition-colors">
										<Settings className="text-fg-secondary size-4.5" />
										<span>Settings</span>
									</div>
									<div className="text-fg hover:bg-fill1 flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-1.5 text-sm transition-colors">
										<MailPlus className="text-fg-secondary size-4.5" />
										<span>Invite colleagues</span>
									</div>
									<div className="bg-fill1 text-fg flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-1.5 text-sm font-normal transition-colors">
										<Users className="size-4.5" />
										<span>Team</span>
									</div>
								</div>

								<div className="border-soft border-b" />

								{/* Group 3: Change logs */}
								<div className="p-1.5">
									<div className="text-fg hover:bg-fill1 flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-1.5 text-sm transition-colors">
										<BookOpen className="text-fg-secondary size-4.5" />
										<span>Change logs</span>
									</div>
								</div>
							</div>
						</div>
					</Card>

					{/* 4.2 Floating Control Bar */}
					<div className="bg-primary relative flex items-center justify-center gap-2 overflow-clip rounded-2xl p-6">
						<img
							src="/themer/grainypattern.png"
							className="absolute inset-0 h-full w-full object-cover"
						/>

						<div className="bg-primary absolute inset-0 mix-blend-color"></div>

						<IconButton
							variant="ghost"
							title="Close"
							size="md"
							className="rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-md hover:bg-white/25">
							<X className="size-5" />
						</IconButton>

						<div className="flex items-center gap-2 rounded-full border border-white/40 bg-white/20 p-1.5 text-white backdrop-blur-md">
							<div className="flex items-center gap-1.5 text-neutral-300">
								<div className="flex size-9 items-center justify-center rounded-full bg-white/20">
									<Monitor className="size-5 cursor-pointer text-white" />
								</div>

								<div className="flex size-9 items-center justify-center rounded-full hover:bg-white/20">
									<Tablet className="size-5 cursor-pointer text-white" />
								</div>

								<div className="flex size-9 items-center justify-center rounded-full hover:bg-white/20">
									<Smartphone className="size-5 cursor-pointer text-white" />
								</div>
							</div>

							<Button
								type="button"
								variant="glossy"
								size="sm"
								className="rounded-full">
								<Sparkles className="size-3" />
								<span>Full page</span>
							</Button>
						</div>
					</div>

					{/* 4.3 10M+ Stat & Testimonial Card */}
					<Card className="border-soft gap-4 p-4 shadow-sm">
						<div>
							<div className="flex items-center justify-between">
								<h3 className="heading-3 text-primary">10M+</h3>
								<div className="bg-primary/10 text-primary flex size-7 items-center justify-center rounded-full">
									<Users className="size-4" />
								</div>
							</div>
							<p className="text-fg-secondary mt-1 text-xs leading-relaxed font-medium">
								Active happy users in over 20+ countries worldwide
							</p>
						</div>

						{/* Testimonial Portrait Card with Dynamic Primary Graphic */}
						<div
							className="relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-xl border border-white/15 p-3 text-white shadow-sm"
							style={{
								background:
									"linear-gradient(145deg, var(--color-primary), color-mix(in srgb, var(--color-primary) 70%, #030d09))",
							}}>
							{/* Concentric Geometric Arches Overlay */}
							<svg
								viewBox="0 0 200 200"
								fill="none"
								className="pointer-events-none absolute inset-0 size-full stroke-white/15"
								strokeWidth="1.5">
								<circle cx="100" cy="100" r="40" />
								<circle cx="100" cy="100" r="70" />
								<circle cx="100" cy="100" r="100" />
								<circle cx="100" cy="100" r="130" />
							</svg>

							{/* Smiling User Avatar */}
							<div className="relative z-10 flex items-center gap-2.5 rounded-lg bg-black/25 p-2 backdrop-blur-md">
								<Avatar
									size="md"
									rounded="circle"
									className="border border-white/40">
									<AvatarImage
										src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/1.png"
										alt="Happy user"
									/>
									<AvatarFallback>HU</AvatarFallback>
								</Avatar>
								<div className="leading-tight">
									<div className="text-xs font-semibold text-white">
										Sophia Chen
									</div>
									<div className="text-[10px] text-white/70">
										Product Lead, Aurora
									</div>
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	)
}
