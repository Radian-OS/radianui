"use client"

import React, { CSSProperties, useId } from "react"
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

const mask = "url(/themer/phone-mask.webp) 0 0/100% 100% no-repeat"

function VerifiedBadge() {
	return (
		<svg
			viewBox="197.8 211.5 23.7 23.8"
			className="size-6 shrink-0 text-[var(--color-primary)]"
			aria-label="Verified">
			<path
				fill="currentColor"
				d="M221.31 222.38C221.156 222.072 220.929 221.805 220.649 221.604L219.109 220.445C219.029 220.39 218.971 220.308 218.946 220.214C218.912 220.12 218.912 220.018 218.946 219.924L219.584 218.036C219.686 217.698 219.71 217.342 219.653 216.993C219.6 216.639 219.456 216.304 219.236 216.02C219.024 215.737 218.746 215.51 218.425 215.36C218.119 215.213 217.78 215.145 217.441 215.163H215.703C215.6 215.162 215.501 215.127 215.419 215.065C215.338 215.002 215.279 214.915 215.251 214.816L214.753 213.078C214.657 212.725 214.474 212.403 214.22 212.14C213.967 211.883 213.658 211.688 213.317 211.572C212.972 211.466 212.607 211.442 212.251 211.503C211.898 211.571 211.568 211.727 211.29 211.954L209.969 212.997C209.896 213.063 209.801 213.1 209.702 213.101C209.614 213.11 209.524 213.089 209.448 213.043L208.139 212.001C207.87 211.781 207.552 211.63 207.212 211.56C206.877 211.479 206.527 211.479 206.192 211.56C205.857 211.654 205.547 211.824 205.289 212.059C205.025 212.314 204.823 212.628 204.698 212.974L204.2 214.723C204.175 214.826 204.113 214.917 204.026 214.978C203.935 215.04 203.824 215.069 203.714 215.059H202.069C201.713 215.045 201.36 215.116 201.038 215.267C200.711 215.412 200.427 215.64 200.215 215.928C200.002 216.211 199.859 216.54 199.798 216.889C199.739 217.23 199.763 217.579 199.868 217.908L200.435 219.866C200.464 219.961 200.464 220.061 200.435 220.156C200.406 220.248 200.349 220.328 200.273 220.387L198.732 221.546C198.452 221.754 198.222 222.024 198.061 222.334C197.908 222.642 197.829 222.98 197.829 223.324C197.829 223.668 197.908 224.006 198.061 224.314C198.222 224.624 198.452 224.894 198.732 225.102L200.273 226.261C200.349 226.32 200.406 226.4 200.435 226.492C200.464 226.587 200.464 226.687 200.435 226.782L199.798 228.67C199.69 229.01 199.662 229.371 199.717 229.724C199.776 230.07 199.919 230.397 200.134 230.674C200.346 230.965 200.63 231.196 200.957 231.346C201.263 231.492 201.602 231.56 201.941 231.543H203.667C203.772 231.538 203.874 231.571 203.957 231.636C204.04 231.693 204.098 231.78 204.119 231.879L204.617 233.628C204.72 233.974 204.903 234.292 205.15 234.555C205.528 234.948 206.039 235.186 206.583 235.223C207.127 235.259 207.665 235.091 208.092 234.752L209.424 233.698C209.505 233.633 209.605 233.597 209.708 233.597C209.812 233.597 209.912 233.633 209.992 233.698L211.301 234.74C211.579 234.975 211.915 235.131 212.274 235.192C212.405 235.203 212.537 235.203 212.668 235.192C212.896 235.193 213.123 235.158 213.34 235.088C213.684 234.979 213.995 234.787 214.246 234.528C214.497 234.269 214.679 233.952 214.776 233.605L215.286 231.844C215.307 231.745 215.365 231.658 215.448 231.601C215.538 231.533 215.649 231.5 215.761 231.508H217.417C217.772 231.522 218.124 231.455 218.448 231.311C218.768 231.159 219.046 230.932 219.26 230.65C219.474 230.368 219.616 230.038 219.676 229.689C219.736 229.333 219.709 228.967 219.595 228.624L218.97 226.747C218.935 226.654 218.935 226.551 218.97 226.458C218.994 226.363 219.052 226.281 219.132 226.226L220.672 225.067C220.953 224.862 221.179 224.591 221.333 224.28C221.495 223.973 221.578 223.63 221.576 223.284C221.554 222.966 221.463 222.658 221.31 222.38ZM215.008 221.5L209.888 226.62C209.69 226.814 209.458 226.971 209.204 227.083C208.947 227.189 208.672 227.244 208.393 227.245C208.11 227.247 207.83 227.188 207.571 227.071C207.311 226.964 207.075 226.806 206.876 226.608L204.351 224.071C204.161 223.85 204.062 223.565 204.073 223.273C204.084 222.981 204.205 222.705 204.411 222.499C204.618 222.292 204.894 222.171 205.186 222.16C205.477 222.149 205.762 222.248 205.984 222.438L208.393 224.847L213.375 219.855C213.592 219.639 213.885 219.518 214.191 219.518C214.497 219.518 214.791 219.639 215.008 219.855C215.124 219.963 215.216 220.094 215.279 220.239C215.342 220.385 215.375 220.542 215.375 220.7C215.375 220.859 215.342 221.016 215.279 221.161C215.216 221.307 215.124 221.437 215.008 221.546V221.5Z"
			/>
		</svg>
	)
}

export function XavionMark() {
	const id = useId().replace(/:/g, "")
	return (
		<svg viewBox="85.78 119.14 51.9 51.9" className="size-full" aria-hidden>
			<defs>
				<linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
					<stop stopColor="white" />
					<stop offset="1" stopColor="white" stopOpacity=".5" />
				</linearGradient>
			</defs>
			<path
				fill={`url(#${id})`}
				d="M119.833 154.817C119.833 163.774 112.572 171.034 103.615 171.034H101.994C93.0367 171.034 85.7759 163.774 85.7759 154.817H119.833ZM137.672 154.817C137.672 163.774 130.412 171.034 121.455 171.034V154.817H137.672ZM102.804 119.138C112.209 119.138 119.833 126.762 119.833 136.166C119.833 145.571 112.209 153.195 102.804 153.195C93.3998 153.195 85.7759 145.571 85.7759 136.166C85.7759 126.762 93.3998 119.138 102.804 119.138ZM121.455 119.138C130.412 119.138 137.672 126.399 137.672 135.356V136.977C137.672 145.934 130.412 153.195 121.455 153.195V119.138Z"
			/>
		</svg>
	)
}

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

const dots = (size: number, x: number, y: number) =>
	({
		backgroundImage:
			"radial-gradient(circle, rgb(36 46 66 / 0.04) 1px, transparent 1px)",
		backgroundSize: `${size}px ${size}px`,
		backgroundPosition: `${x}px ${y}px`,
	}) satisfies CSSProperties

function Logo({ color }: { color: string }) {
	const style: CSSProperties = { backgroundColor: color }
	return (
		<span
			style={style}
			className="grid size-[24.12px] shrink-0 place-items-center rounded-[6.03px] bg-[linear-gradient(to_bottom,transparent,rgb(255_255_255/0.15))] shadow-[inset_0_0_0_0.5px_rgb(0_0_0/0.1),inset_0_1px_0.5px_rgb(255_255_255/0.1),inset_0_-1px_0.5px_rgb(0_0_0/0.1)]">
			<svg
				viewBox="0 0 14.07 14.07"
				className="size-[14.07px] drop-shadow-[0_0.675px_0.675px_rgb(36_36_36/0.1)]"
				fill="url(#logo-fade)">
				<defs>
					<linearGradient id="logo-fade" x1="0" y1="0" x2="0" y2="1">
						<stop stopColor="#fff" />
						<stop offset="1" stopColor="#fff" stopOpacity=".5" />
					</linearGradient>
				</defs>
				<path d="M9.233 9.673 C9.233 12.101 7.265 14.07 4.836 14.07 H4.396 C1.968 14.07 0 12.101 0 9.673 H9.233ZM14.07 9.673 C14.07 12.101 12.101 14.07 9.673 14.07 V9.673 H14.07ZM4.616 0 C7.166 0 9.233 2.067 9.233 4.617 C9.233 7.166 7.166 9.233 4.616 9.233 C2.067 9.233 0 7.166 0 4.617 C0 2.067 2.067 0 4.616 0ZM9.673 0 C12.101 0 14.07 1.968 14.07 4.397 V4.837 C14.07 7.265 12.101 9.233 9.673 9.233 V0Z" />
			</svg>
		</span>
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
					<div className="relative isolate h-[216px] w-full overflow-hidden rounded-[20px]">
						{/* grayscale grain image, recolored by the blend layer below */}
						<div className="absolute inset-0 bg-[url(/gradient-grain.webp)] bg-cover bg-center" />
						<div
							className="absolute inset-0 mix-blend-color"
							style={{ backgroundColor: "var(--color-primary)" }}
						/>

						{/* browser window (overflows the card on the right, clipped) */}
						<div className="bg-elevation-level1 absolute top-[48px] left-[41px] h-[120px] w-[803px] overflow-hidden rounded-[16.74px]">
							<div className="bg-fill4 relative h-[55.81px]">
								<div className="absolute top-[21.07px] left-5 flex gap-[11.17px]">
									{[0, 1, 2].map((i) => (
										<span
											key={i}
											className="bg-fg-disabled/40 size-[15.74px] rounded-full"
										/>
									))}
								</div>

								{/* concave fillet where the tab meets the toolbar */}
								<div className="absolute top-[39.07px] left-[96.81px] size-[16.74px] bg-[radial-gradient(circle_at_top_left,transparent_16.2px,var(--color-elevation-level1)_16.9px)]" />

								<div className="bg-elevation-level1 absolute top-[8.37px] left-[113.56px] flex h-[47.44px] w-[306.98px] items-center gap-[10.62px] rounded-t-[22.3px] px-[11.16px]">
									<Logo color="var(--color-primary)" />
									<span className="text-fg w-[215px] overflow-hidden [mask-image:linear-gradient(to_right,#000_86%,transparent_98.5%)] text-[16.74px] font-medium whitespace-nowrap">
										Xavion
									</span>
								</div>
							</div>

							<div className="flex h-[64.19px] items-center gap-3 px-[20.93px]">
								<div className="flex items-center justify-center gap-2.5">
									<IconSlot slot="arrow-left" size={16} />
									<IconSlot
										slot="arrow-right"
										size={16}
										className="text-fg-disabled"
									/>
									<IconSlot slot="repeat" size={16} />
									{/* <Icon d="M4.003 9.419 H16.744 V7.326 H4.003 L9.863 1.465 L8.372 0 L0 8.372 L8.372 16.744 L9.863 15.279 L4.003 9.419Z" className="text-fg-secondary" /> */}
									{/* <Icon d="M12.741 9.419 H0 V7.326 H12.741 L6.881 1.465 L8.372 0 L16.744 8.372 L8.372 16.744 L6.881 15.279 L12.741 9.419Z" className="text-fg-disabled" /> */}
									{/* <Icon d="M8.372 16.744 C6.035 16.744 4.055 15.933 2.433 14.311 C0.811 12.689 0 10.71 0 8.372 C0 6.035 0.811 4.055 2.433 2.433 C4.055 0.811 6.035 0 8.372 0 C9.575 0 10.727 0.249 11.825 0.746 C12.924 1.243 13.866 1.954 14.651 2.878 V0 H16.744 V7.326 H9.419 V5.233 H13.814 C13.256 4.256 12.493 3.489 11.525 2.93 C10.557 2.372 9.506 2.093 8.372 2.093 C6.628 2.093 5.145 2.704 3.924 3.925 C2.703 5.146 2.093 6.628 2.093 8.372 C2.093 10.117 2.703 11.599 3.924 12.82 C5.145 14.041 6.628 14.651 8.372 14.651 C9.715 14.651 10.927 14.268 12.009 13.5 C13.09 12.733 13.849 11.721 14.285 10.465 H16.482 C15.994 12.314 15 13.823 13.5 14.992 C12 16.16 10.291 16.744 8.372 16.744Z" className="text-fg-secondary" /> */}
								</div>
								<div className="border-soft-alpha bg-fill2 text-fg-tertiary ml-[3px] flex h-[45.45px] w-[659.37px] shrink-0 items-center rounded-[13.16px] border px-[13.93px] text-lg">
									www.xavion.com
								</div>
							</div>
						</div>

						<div className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-[#242E42]/[0.08] ring-inset" />
					</div>

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

					<div className="bg-primary-accent relative h-83 w-full overflow-hidden rounded-[20px]">
						<div className="absolute inset-0" style={dots(10, 4, 2)} />

						{/* card (intentionally larger than the frame so it's cropped) */}
						<div className="bg-bg absolute top-[45px] left-[45px] h-[502.7px] w-[444.8px] overflow-hidden rounded-[16.7px] shadow-[0_15.5px_23.3px_-3.9px_rgb(24_24_27/0.12)]">
							<div
								className="absolute inset-0"
								style={dots(17.44, 4.36, -1.58)}
							/>

							{/* header */}
							<div className="border-soft bg-primary-border relative h-[97.3px] border-b-[1.4px]">
								<svg
									viewBox="45 45 444.8 97.3"
									className="absolute inset-0 size-full">
									<defs>
										<linearGradient
											id="hdr-shapes"
											gradientUnits="userSpaceOnUse"
											x1="121.8"
											y1="54.1"
											x2="295.7"
											y2="228">
											<stop stopColor="white" />
											<stop offset="1" stopColor="white" stopOpacity=".5" />
										</linearGradient>
									</defs>
									<path
										opacity=".6"
										fill="url(#hdr-shapes)"
										d="M268.53 146.456C298.536 176.462 298.536 225.111 268.53 255.117L263.097 260.55C233.091 290.556 184.442 290.556 154.436 260.55L268.53 146.456ZM328.293 86.6931C358.299 116.699 358.299 165.348 328.293 195.354L273.963 141.023L328.293 86.6931ZM91.956 83.9766C123.462 52.4704 174.544 52.4704 206.05 83.9766C237.556 115.483 237.556 166.564 206.05 198.07C174.544 229.576 123.462 229.576 91.956 198.07C60.4499 166.564 60.4499 115.483 91.956 83.9766ZM154.436 21.4967C184.442 -8.50929 233.091 -8.5093 263.097 21.4967L268.53 26.9297C298.536 56.9357 298.536 105.584 268.53 135.59L154.436 21.4967Z"
									/>
								</svg>
							</div>

							{/* logo tile */}
							<div className="absolute top-[55.6px] left-[22.2px] grid size-[89px] place-items-center rounded-[34px] bg-[var(--color-primary)] bg-gradient-to-b from-transparent to-white/15 shadow-[0_0_0_3.7px_rgb(0_0_0/0.1),0_0_0_3.7px_rgb(255_255_255/0.28),inset_0_3.7px_1.9px_rgb(255_255_255/0.1),inset_0_-3.7px_1.9px_rgb(0_0_0/0.1),inset_0_0_0_1.9px_rgb(0_0_0/0.06)]">
								<div className="size-[52px] drop-shadow-[0_2.5px_2.5px_rgb(36_36_36/0.1)]">
									<XavionMark />
								</div>
							</div>

							{/* text */}
							<div className="relative px-[22px] pt-[69px]">
								<div className="flex items-center gap-[7.5px]">
									<h3 className="text-fg text-[22px] leading-7 font-medium tracking-tight">
										Xavion Corp
									</h3>
									<VerifiedBadge />
								</div>
								<p className="text-fg-tertiary mt-0 text-[17px] leading-6">
									xavion.com
								</p>
								<p className="text-fg-secondary mt-4 text-lg leading-[27px]">
									An open-source design library and system built for
									high-performance dashboard layouts.
								</p>
							</div>

							<div className="pointer-events-none absolute inset-0 rounded-[inherit] border-[1.4px] border-[#242E42]/[.08]" />
						</div>

						<div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-[#242E42]/[.08]" />
					</div>

					{/* 2.3 Color Palette Swatches Bar */}
					<Card className="gap-0 border-none p-0 shadow-none">
						<div className="border-soft grid h-20 grid-cols-5 overflow-hidden rounded-lg border shadow-inner">
							<div
								className="bg-primary flex items-center justify-center transition-colors"
								title="Primary"
							/>
							<div
								className="bg-primary-border flex items-center justify-center transition-colors"
								title="Primary Border"
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
					<Card className="relative flex aspect-338/452 items-center justify-center gap-0 overflow-hidden rounded-3xl p-3 shadow-none">
						<img
							src="/themer/bg.webp"
							alt=""
							className="absolute inset-0 size-full"
						/>
						<div className="absolute inset-0 bg-[color-mix(in_srgb,var(--color-primary)_70%,#808080)] mix-blend-color" />
						<div className="absolute inset-0 [background:conic-gradient(at_2px_2px,transparent_270deg,rgb(36_46_66/.04)_0)_8px_5px/10px_10px]" />

						<div className="absolute inset-0 blur-[.5px]">
							<img
								src="/themer/phone.webp"
								alt=""
								className="absolute inset-0 size-full"
							/>
							<div
								className="absolute inset-0"
								style={{ mask, WebkitMask: mask }}>
								<img
									src="/themer/screen.webp"
									alt=""
									className="absolute top-[15.05%] left-[24.6%] h-[84.95%] w-[75.4%]"
								/>
								<div className="absolute inset-0 bg-[color-mix(in_srgb,var(--color-primary)_80%,transparent)] mix-blend-color [clip-path:polygon(24.6%_19.9%,135.5%_15.1%,198.8%_226.4%,87.5%_233.3%)]" />
							</div>
							<svg
								viewBox="0 0 338 452"
								className="absolute inset-0 size-full overflow-visible">
								<defs>
									<filter
										id="f1"
										x="108.294"
										y="165.647"
										width="120.689"
										height="114.927"
										filterUnits="userSpaceOnUse"
										colorInterpolationFilters="sRGB">
										<feFlood floodOpacity="0" result="b" />
										<feColorMatrix
											in="SourceAlpha"
											values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
											result="a"
										/>
										<feOffset dy="11.353" />
										<feGaussianBlur stdDeviation="11.353" />
										<feComposite in2="a" operator="out" />
										<feColorMatrix values="0 0 0 0 .098 0 0 0 0 .094 0 0 0 0 .106 0 0 0 .08 0" />
										<feBlend in2="b" result="e" />
										<feBlend in="SourceGraphic" in2="e" />
									</filter>
									<filter
										id="f2"
										x="146.701"
										y="191.406"
										width="43.9957"
										height="44.5167"
										filterUnits="userSpaceOnUse"
										colorInterpolationFilters="sRGB">
										<feFlood floodOpacity="0" result="b" />
										<feColorMatrix
											in="SourceAlpha"
											values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
											result="a"
										/>
										<feMorphology
											radius="1.27114"
											operator="erode"
											in="SourceAlpha"
										/>
										<feOffset dy="1.9067" />
										<feGaussianBlur stdDeviation="1.9067" />
										<feComposite in2="a" operator="out" />
										<feColorMatrix values="0 0 0 0 .141 0 0 0 0 .141 0 0 0 0 .141 0 0 0 .1 0" />
										<feBlend in2="b" result="e" />
										<feBlend in="SourceGraphic" in2="e" />
									</filter>
									<linearGradient
										id="g1"
										x1="160.977"
										y1="178.571"
										x2="167.684"
										y2="245.919"
										gradientUnits="userSpaceOnUse">
										<stop stopColor="#fff" stopOpacity="0" />
										<stop offset="1" stopColor="#fff" stopOpacity=".15" />
									</linearGradient>
									<linearGradient
										id="g2"
										x1="164.169"
										y1="192.399"
										x2="166.217"
										y2="231.477"
										gradientUnits="userSpaceOnUse">
										<stop stopColor="#fff" />
										<stop offset="1" stopColor="#fff" stopOpacity=".5" />
									</linearGradient>
								</defs>
								<g filter="url(#f1)">
									<path
										d="M134.831 196.735C132.715 187.571 138.614 179.743 148.006 179.251L173.947 177.891C183.34 177.399 192.669 184.429 194.784 193.593L202.446 226.779C204.562 235.943 198.663 243.771 189.271 244.264L163.33 245.623C153.937 246.115 144.608 239.085 142.492 229.921L134.831 196.735Z"
										className="fill-[var(--color-primary)]"
									/>
									<path
										d="M134.831 196.735C132.715 187.571 138.614 179.743 148.006 179.251L173.947 177.891C183.34 177.399 192.669 184.429 194.784 193.593L202.446 226.779C204.562 235.943 198.663 243.771 189.271 244.264L163.33 245.623C153.937 246.115 144.608 239.085 142.492 229.921L134.831 196.735Z"
										fill="url(#g1)"
									/>
									<path
										d="M148.119 179.74L174.06 178.38C183.175 177.903 192.23 184.725 194.283 193.619L201.945 226.806C203.998 235.7 198.273 243.297 189.157 243.774L163.216 245.134C154.101 245.612 145.047 238.789 142.994 229.895L135.332 196.709C133.279 187.815 139.004 180.218 148.119 179.74Z"
										strokeWidth="1"
										className="fill-none [stroke:color-mix(in_srgb,var(--color-primary),white_25%)]"
									/>
									<g filter="url(#f2)">
										<path
											d="M175.779 218.73C177.322 225.412 173.679 231.086 167.643 231.402L166.55 231.459C160.514 231.776 154.371 226.615 152.828 219.933L175.779 218.73ZM187.801 218.1C189.343 224.782 185.701 230.456 179.665 230.772L176.872 218.673L187.801 218.1ZM158.158 192.714C164.496 192.381 170.947 197.8 172.567 204.816C174.186 211.833 170.362 217.79 164.024 218.122C157.686 218.454 151.235 213.035 149.616 206.019C147.996 199.003 151.82 193.046 158.158 192.714ZM170.726 192.055C176.762 191.739 182.906 196.899 184.449 203.581L184.728 204.791C186.271 211.473 182.628 217.147 176.592 217.463L170.726 192.055Z"
											fill="url(#g2)"
										/>
									</g>
								</g>
							</svg>
						</div>

						<div className="absolute inset-0 rounded-[20px] ring-1 ring-[#242e42]/[.08] ring-inset" />
					</Card>

					{/* 3.3 Glassmorphic Dock */}
					<Card className="border-border/80 relative flex h-40 items-center justify-center gap-0 overflow-hidden p-0 shadow-sm">
						<img
							src="/themer/pattern2.png"
							className="absolute inset-0 object-cover"
							alt="Pattern"
						/>

						<div className="bg-primary absolute inset-0 mix-blend-color"></div>

						{/* Frosted Dock Pill */}
						<div className="relative z-10 flex items-center justify-center gap-2.5 rounded-2xl border border-white/40 bg-white/20 p-3 backdrop-blur-md">
							<SettingsIcon size={50} />
							<BrandAppIcon size={64} />
							<VideoIcon size={50} />
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
					<Card className="border-soft bg-bg gap-4 rounded-3xl p-6 shadow-none">
						<div className="flex flex-col gap-2">
							<div className="flex items-center justify-between">
								<h3 className="heading-3 text-primary-text text-5xl font-bold">
									10M+
								</h3>
								<div className="bg-primary text-primary flex size-10 items-center justify-center rounded-full">
									<IconSlot slot="users-2" className="size-6 text-white" />
								</div>
							</div>
							<p className="text-fg-tertiary text-lg font-normal">
								Active happy users in over 20+ countries worldwide
							</p>
						</div>

						{/* Testimonial Portrait Card with Dynamic Primary Graphic */}
						<div className="relative aspect-[576/516] overflow-hidden rounded-2xl bg-[linear-gradient(165deg,color-mix(in_oklab,var(--color-primary),white_10%),var(--color-primary))]">
							<svg
								viewBox="0 0 250 250"
								className="absolute top-[8%] left-[7%] w-[85%] text-white/25">
								<path
									fill="currentColor"
									stroke="white"
									strokeOpacity=".1"
									strokeWidth="2"
									d="M163.144 169.484C163.144 211.919 128.744 246.319 86.3096 246.319H78.6261C36.1912 246.319 1.79138 211.919 1.79138 169.484H163.144ZM247.662 169.484C247.662 211.919 213.263 246.319 170.828 246.319V169.484H247.662ZM82.4678 0.447876C127.024 0.447876 163.144 36.5679 163.144 81.1243C163.144 125.681 127.024 161.801 82.4678 161.801C37.9114 161.801 1.79138 125.681 1.79138 81.1243C1.79138 36.5679 37.9114 0.447876 82.4678 0.447876ZM170.828 0.447876C213.263 0.447876 247.662 34.8477 247.662 77.2826V84.9661C247.662 127.401 213.263 161.801 170.828 161.801V0.447876Z"
								/>
							</svg>

							<div className="absolute top-[5%] left-[7%] isolate aspect-square w-[87%]">
								<img src="/themer/person.png" alt="" className="size-full" />
								<div
									className="bg-primary absolute bottom-0 left-0 aspect-[492/217] w-[98%] mix-blend-color"
									style={{
										maskImage: `url(/themer/suit.png)`,
										WebkitMaskImage: `url(/themer/suit.png)`,
										maskSize: "100% 100%",
										WebkitMaskSize: "100% 100%",
									}}
								/>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	)
}

function SettingsIcon({ size = 65, ...props }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="6.125 3.063 51.972 51.972"
			fill="none"
			overflow="visible"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			{...props}>
			<image
				y="6.10352e-05"
				width="64.2231"
				height="64.2232"
				preserveAspectRatio="none"
				xlinkHref="data:image/png;base64,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"
			/>
		</svg>
	)
}

function VideoIcon({ size = 65, ...props }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="6.125 3.063 51.972 51.972"
			fill="none"
			overflow="visible"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			{...props}>
			<g opacity="0.9" filter="url(#filter0_d_1131_1599)">
				<g filter="url(#filter1_ii_1131_1599)">
					<use
						xlinkHref="#stroke0_1131_1599"
						fill="url(#paint0_linear_1131_1599)"
					/>
					<use
						xlinkHref="#stroke0_1131_1599"
						fill="url(#paint1_linear_1131_1599)"
						fillOpacity="0.1"
						style={{ mixBlendMode: "soft-light" }}
					/>
				</g>
				<g filter="url(#filter2_dd_1131_1599)">
					<g filter="url(#filter3_iiii_1131_1599)">
						<use xlinkHref="#stroke1_1131_1599" fill="white" />
						<use
							xlinkHref="#stroke1_1131_1599"
							fill="url(#paint2_linear_1131_1599)"
						/>
					</g>
				</g>
			</g>
			<defs>
				<filter
					id="filter0_d_1131_1599"
					x="2.81334e-05"
					y="1.40667e-05"
					width="64.2226"
					height="64.2226"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB">
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="3.06273" />
					<feGaussianBlur stdDeviation="3.06273" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.0980392 0 0 0 0 0.0941176 0 0 0 0 0.105882 0 0 0 0.08 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_1131_1599"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_1131_1599"
						result="shape"
					/>
				</filter>
				<filter
					id="filter1_ii_1131_1599"
					x="5.70987"
					y="2.64713"
					width="52.8029"
					height="52.8029"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB">
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="BackgroundImageFix"
						result="shape"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dx="0.415616" dy="0.415616" />
					<feGaussianBlur stdDeviation="0.207808" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0"
					/>
					<feBlend
						mode="normal"
						in2="shape"
						result="effect1_innerShadow_1131_1599"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dx="-0.415616" dy="-0.415616" />
					<feGaussianBlur stdDeviation="0.207808" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
					/>
					<feBlend
						mode="normal"
						in2="effect1_innerShadow_1131_1599"
						result="effect2_innerShadow_1131_1599"
					/>
				</filter>
				<filter
					id="filter2_dd_1131_1599"
					x="8.86133"
					y="15.2201"
					width="46.6435"
					height="34.7234"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB">
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="1.03904" />
					<feGaussianBlur stdDeviation="0.831232" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_1131_1599"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="3.53274" />
					<feGaussianBlur stdDeviation="2.28589" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
					/>
					<feBlend
						mode="normal"
						in2="effect1_dropShadow_1131_1599"
						result="effect2_dropShadow_1131_1599"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect2_dropShadow_1131_1599"
						result="shape"
					/>
				</filter>
				<filter
					id="filter3_iiii_1131_1599"
					x="13.4331"
					y="10.4405"
					width="37.5"
					height="31.3985"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB">
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="BackgroundImageFix"
						result="shape"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="-5.81862" />
					<feGaussianBlur stdDeviation="5.1952" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
					/>
					<feBlend
						mode="normal"
						in2="shape"
						result="effect1_innerShadow_1131_1599"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="-1.55856" />
					<feGaussianBlur stdDeviation="0.51952" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.45 0"
					/>
					<feBlend
						mode="normal"
						in2="effect1_innerShadow_1131_1599"
						result="effect2_innerShadow_1131_1599"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="-2.5976" />
					<feGaussianBlur stdDeviation="2.07808" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.476471 0 0 0 0 0.9 0 0 0 0 0.45 0 0 0 1 0"
					/>
					<feBlend
						mode="normal"
						in2="effect2_innerShadow_1131_1599"
						result="effect3_innerShadow_1131_1599"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="-1.03904" />
					<feGaussianBlur stdDeviation="1.03904" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0"
					/>
					<feBlend
						mode="normal"
						in2="effect3_innerShadow_1131_1599"
						result="effect4_innerShadow_1131_1599"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_1131_1599"
					x1="32.1113"
					y1="3.06274"
					x2="32.1113"
					y2="55.0344"
					gradientUnits="userSpaceOnUse">
					<stop stopColor="#83F180" />
					<stop offset="1" stopColor="#5BC34E" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_1131_1599"
					x1="32.1113"
					y1="3.06274"
					x2="32.1113"
					y2="55.0344"
					gradientUnits="userSpaceOnUse">
					<stop offset="0.151042" stopColor="white" />
					<stop offset="1" stopOpacity="0.1" />
				</linearGradient>
				<linearGradient
					id="paint2_linear_1131_1599"
					x1="32.2119"
					y1="7.07275"
					x2="32.2119"
					y2="36.1546"
					gradientUnits="userSpaceOnUse">
					<stop offset="0.00520833" stopColor="white" stopOpacity="0.08" />
					<stop offset="0.0851933" stopOpacity="0.08" />
					<stop offset="0.336988" stopColor="white" stopOpacity="0.1" />
					<stop offset="0.660917" stopColor="white" stopOpacity="0.1" />
					<stop offset="1" stopOpacity="0.1" />
				</linearGradient>
				<path
					id="stroke0_1131_1599"
					d="M6.12549 21.3498C6.12549 14.9488 6.12549 11.7482 7.37122 9.30333C8.467 7.15274 10.2155 5.40426 12.3661 4.30848C14.811 3.06274 18.0115 3.06274 24.4126 3.06274H39.8101C46.2112 3.06274 49.4117 3.06274 51.8566 4.30848C54.0072 5.40426 55.7557 7.15274 56.8514 9.30333C58.0972 11.7482 58.0972 14.9488 58.0972 21.3498V36.7473C58.0972 43.1484 58.0972 46.349 56.8514 48.7939C55.7557 50.9444 54.0072 52.6929 51.8566 53.7887C49.4117 55.0344 46.2112 55.0344 39.8101 55.0344H24.4126C18.0115 55.0344 14.811 55.0344 12.3661 53.7887C10.2155 52.6929 8.467 50.9444 7.37122 48.7939C6.12549 46.349 6.12549 43.1484 6.12549 36.7473V21.3498Z"
				/>
				<path
					id="stroke1_1131_1599"
					d="M18.5106 41.839H35.4832C38.6626 41.839 40.5608 40.0118 40.5608 36.8616V21.2523C40.5608 18.0863 38.8208 16.2592 35.6414 16.2592H18.5106C15.4736 16.2592 13.4331 18.0863 13.4331 21.2523V36.8616C13.4331 40.0118 15.3312 41.839 18.5106 41.839ZM41.3951 33.6956L47.1528 38.6572C47.6906 39.1298 48.3233 39.429 48.8928 39.429C50.1266 39.429 50.9333 38.5312 50.9333 37.2396V20.8585C50.9333 19.5669 50.1266 18.6691 48.8928 18.6691C48.3233 18.6691 47.6906 18.9683 47.1528 19.4409L41.3951 24.3867V33.6956Z"
				/>
			</defs>
		</svg>
	)
}
