import { useEffect, useRef, useState } from "react"
import React, { SVGProps } from "react"
import { motion } from "motion/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Badge, BadgeDot } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"

const COLORS = [
	{ title: "Red", value: "red" },
	{ title: "Orange", value: "orange" },
	{ title: "Amber", value: "amber" },
	{ title: "Yellow", value: "yellow" },
	{ title: "Neon", value: "neon" },
	{ title: "Green", value: "green" },
	{ title: "Emerald", value: "emerald" },
	{ title: "Teal", value: "teal" },
	{ title: "Cyan", value: "cyan" },
	{ title: "Light Blue", value: "light-blue" },
	{ title: "Blue", value: "blue" },
	{ title: "Violet Blue", value: "violet-blue" },
	{ title: "Purple", value: "purple" },
	{ title: "Dark Orchid", value: "dark-orchid" },
	{ title: "Fuchsia", value: "fuchsia" },
	{ title: "Magenta", value: "magenta" },
	{ title: "Rose", value: "rose" },
] as const

const COLOR_CLASSES = {
	red: "bg-[oklch(0.64_0.22_26.04)]",
	orange: "bg-[oklch(0.6211_0.1686_43.12)]",
	amber: "bg-[oklch(0.8016_0.1705_73.27)]",
	yellow: "bg-[oklch(0.8_0.1625_94.77)]",
	neon: "bg-[oklch(0.7153_0.1873_128.9)]",
	green: "bg-[oklch(0.6523_0.2156_142.6)]",
	emerald: "bg-[oklch(0.6334_0.171_148.65)]",
	teal: "bg-[oklch(0.6432_0.1255_169.12)]",
	cyan: "bg-[oklch(0.6549_0.1092_194.82)]",
	"light-blue": "bg-[oklch(0.6092_0.2041_255.8)]",
	blue: "bg-[oklch(0.5345_0.223_272.15)]",
	"violet-blue": "bg-[oklch(0.528_0.2539_282.58)]",
	purple: "bg-[oklch(0.5554_0.2522_292.8)]",
	"dark-orchid": "bg-[oklch(0.623_0.2799_310.69)]",
	fuchsia: "bg-[oklch(0.6901_0.2628_327.97)]",
	magenta: "bg-[oklch(0.6175_0.2503_347.29)]",
	rose: "bg-[oklch(0.6515_0.221_6.33)]",
} as const

export function ThemeableSystem() {
	const containerRef = useRef<HTMLDivElement>(null)
	const ITEM_HEIGHT = 36

	const [scrollIndex, setScrollIndex] = useState(0)
	const [containerHeight, setContainerHeight] = useState(0)
	const [containerWidth, setContainerWidth] = useState(0)

	// duplicate list to allow continuous scroll
	const duplicatedData = Array(20).fill(COLORS).flat()

	useEffect(() => {
		if (containerRef.current) {
			setContainerHeight(containerRef.current.clientHeight)
			setContainerWidth(containerRef.current.clientWidth)
		}
	}, [])

	// continuously increment scrollIndex
	useEffect(() => {
		const interval = setInterval(() => {
			setScrollIndex((prev) => prev + 1)
		}, 2000) // change speed here

		return () => clearInterval(interval)
	}, [])

	// reset scrollIndex silently when near end to avoid snapping
	useEffect(() => {
		if (scrollIndex > 150) {
			setScrollIndex(COLORS.length)
		}
	}, [scrollIndex, duplicatedData.length])

	// compute active color
	const activeColorIndex = scrollIndex % COLORS.length
	const activeColor = COLORS[activeColorIndex].value

	// offset so active item is centered with extra gap
	const ACTIVE_OFFSET = 190
	const ITEM_WIDTH = 120
	const ACTIVE_OFFSET_X = 275
	const GAP_SIZE = 8

	const centerOffset = scrollIndex * ITEM_HEIGHT - (containerHeight / 2 - ITEM_HEIGHT / 2) + ACTIVE_OFFSET
	const centerOffsetX = scrollIndex * (ITEM_WIDTH + GAP_SIZE) - (containerWidth / 2 - ITEM_WIDTH / 2) + ACTIVE_OFFSET_X

	return (
		<div ref={containerRef} className="relative flex h-full w-full select-none flex-col items-center gap-4 overflow-hidden px-10 sm:flex-row sm:gap-20">
			{/* Top gradient */}
			<div className="z-1 h-39 from-bg/5 to-bg absolute left-0 top-0 hidden w-full bg-gradient-to-t sm:block" />
			<div className="z-1 h-43 from-bg/5 to-bg absolute bottom-0 left-0 hidden w-full bg-gradient-to-b sm:block" />

			<div className="z-1 from-bg/5 to-bg absolute left-0 h-full w-40 bg-gradient-to-l sm:hidden" />
			<div className="z-1 from-bg/5 to-bg absolute right-0 h-full w-40 bg-gradient-to-r sm:hidden" />

			{/* Color list */}
			<motion.div animate={{ y: -centerOffset }} transition={{ duration: 0.6, ease: "easeOut" }} className="hidden flex-col sm:flex">
				{duplicatedData.map((colorOption, index) => {
					const isActive = index % COLORS.length === activeColorIndex

					return (
						<div key={index} className="flex h-[36px] items-center justify-center">
							<Badge className={`min-w-30 ${isActive ? "bg-fill2" : ""}`} size="28" variant="outline" color="neutral">
								<BadgeDot className={COLOR_CLASSES[colorOption.value as keyof typeof COLOR_CLASSES]} /> <p className="w-full text-center">{colorOption.title}</p>
							</Badge>
						</div>
					)
				})}
			</motion.div>

			<motion.div animate={{ x: -centerOffsetX }} transition={{ duration: 0.6, ease: "easeOut" }} className="flex gap-2 sm:hidden">
				{duplicatedData.map((colorOption, index) => {
					const isActive = index % COLORS.length === activeColorIndex

					return (
						<div key={index} className="flex h-[36px] items-center justify-center">
							<Badge className={`min-w-30 ${isActive ? "bg-fill2" : ""}`} size="28" variant="outline" color="neutral">
								<BadgeDot className={COLOR_CLASSES[colorOption.value as keyof typeof COLOR_CLASSES]} /> <p className="w-full text-center">{colorOption.title}</p>
							</Badge>
						</div>
					)
				})}
			</motion.div>

			{/* Hover card */}
			<HoverCard activeColor={activeColor} />
		</div>
	)
}
const profile = {
	name: "Zoya Petrova",
	description: "Engineering partner for @Radianos",
	avatar: "/media/male-2.jpg",
	address: "Berlin, Germany",
	followingInThousands: 1.4,
	followersInThousands: 412.4,
}

function HoverCard({ activeColor }: { activeColor: string }) {
	return (
		<div className={`color-${activeColor} z-1`}>
			<div className={`border-border bg-bg flex h-fit w-80 flex-col overflow-hidden rounded-xl border p-0`}>
				<div className={`bg-primary-focus relative h-16`}>
					<Avatar size="80" className="border-bg border-6 absolute bottom-0 left-4 translate-y-1/2">
						<AvatarImage alt={profile.name} src={profile.avatar} />
						<AvatarFallback className="text-base">{profile.name.charAt(0).toUpperCase()}</AvatarFallback>
					</Avatar>
				</div>

				<div className={`flex flex-col gap-4 px-4 pb-4 pt-14`}>
					<div className="flex flex-col gap-1">
						<div className="flex items-center gap-1">
							<p className="font-medium">{profile.name}</p>
							<VerifiedSVGIcon />
						</div>
						<p className="text-sm">{profile.description}</p>
						<p className="text-fg-tertiary text-[13px]">{profile.address}</p>
					</div>

					<div className={`flex h-5 gap-3 text-sm`}>
						<p className="flex items-center gap-1">
							<span className="font-medium">{profile.followingInThousands}k</span>
							<span className="text-fg-secondary">Following</span>
						</p>
						<Divider orientation="vertical" className="bg-soft-alpha" />
						<p className="flex items-center gap-1">
							<span className="font-medium">{profile.followersInThousands}k</span>
							<span className="text-fg-secondary">Followers</span>
						</p>
					</div>

					<div className={`flex gap-3`}>
						<Button className={`w-full flex-1`}>Message</Button>
						<Button variant="outline" className={`w-full flex-1`}>
							Follow
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

function VerifiedSVGIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<mask id="a" maskUnits="userSpaceOnUse" x={-0.5} y={-0.5} width={21} height={21} fill="#000">
				<path className="fill-white" d="M-.5-.5h21v21h-21z" />
				<path d="M18.392 9.348a1.5 1.5 0 0 0-.476-.558l-1.108-.833a.3.3 0 0 1-.117-.167.3.3 0 0 1 0-.208l.459-1.359c.073-.243.09-.5.05-.75a1.5 1.5 0 0 0-.3-.7 1.55 1.55 0 0 0-.583-.475 1.46 1.46 0 0 0-.709-.141h-1.25a.34.34 0 0 1-.325-.25l-.358-1.25a1.6 1.6 0 0 0-.384-.675 1.7 1.7 0 0 0-.65-.409 1.7 1.7 0 0 0-.766-.05 1.6 1.6 0 0 0-.692.325l-.95.75a.3.3 0 0 1-.192.075.3.3 0 0 1-.183-.041l-.942-.75a1.54 1.54 0 0 0-.666-.317 1.56 1.56 0 0 0-.734 0c-.241.067-.464.19-.65.358-.19.184-.335.41-.424.659L6.083 3.84a.32.32 0 0 1-.125.183.34.34 0 0 1-.225.059H4.55a1.6 1.6 0 0 0-.742.15 1.5 1.5 0 0 0-.591.475c-.154.203-.257.44-.3.691a1.55 1.55 0 0 0 .05.734l.408 1.408q.03.104 0 .208a.34.34 0 0 1-.117.167l-1.108.833a1.66 1.66 0 0 0-.483.567 1.6 1.6 0 0 0 0 1.425c.116.223.281.417.483.567l1.108.833a.34.34 0 0 1 .117.375l-.458 1.358a1.7 1.7 0 0 0-.059.759c.042.249.145.483.3.683.153.209.357.375.592.483.22.105.464.154.708.142H5.7a.32.32 0 0 1 .208.067c.06.04.102.103.117.175l.358 1.258c.074.249.206.477.384.667a1.575 1.575 0 0 0 2.116.141l.958-.758a.325.325 0 0 1 .409 0l.941.75c.2.169.442.281.7.325q.143.012.284 0 .247 0 .483-.075a1.56 1.56 0 0 0 1.034-1.067l.366-1.266a.28.28 0 0 1 .117-.175.33.33 0 0 1 .225-.067h1.191c.255.01.51-.038.742-.142a1.59 1.59 0 0 0 .825-1.933l-.45-1.35a.3.3 0 0 1 0-.208.3.3 0 0 1 .117-.167l1.108-.833a1.56 1.56 0 0 0 .475-.567c.117-.22.177-.467.175-.717a1.6 1.6 0 0 0-.191-.65m-4.534-.633-3.683 3.683a1.7 1.7 0 0 1-.492.334 1.6 1.6 0 0 1-.583.116 1.4 1.4 0 0 1-.592-.125 1.6 1.6 0 0 1-.5-.333l-1.817-1.825A.834.834 0 0 1 7.366 9.39L9.1 11.123l3.583-3.591a.833.833 0 0 1 1.175 0 .833.833 0 0 1 0 1.216z" />
			</mask>
			<path
				d="M18.392 9.348a1.5 1.5 0 0 0-.476-.558l-1.108-.833a.3.3 0 0 1-.117-.167.3.3 0 0 1 0-.208l.459-1.359c.073-.243.09-.5.05-.75a1.5 1.5 0 0 0-.3-.7 1.55 1.55 0 0 0-.583-.475 1.46 1.46 0 0 0-.709-.141h-1.25a.34.34 0 0 1-.325-.25l-.358-1.25a1.6 1.6 0 0 0-.384-.675 1.7 1.7 0 0 0-.65-.409 1.7 1.7 0 0 0-.766-.05 1.6 1.6 0 0 0-.692.325l-.95.75a.3.3 0 0 1-.192.075.3.3 0 0 1-.183-.041l-.942-.75a1.54 1.54 0 0 0-.666-.317 1.56 1.56 0 0 0-.734 0c-.241.067-.464.19-.65.358-.19.184-.335.41-.424.659L6.083 3.84a.32.32 0 0 1-.125.183.34.34 0 0 1-.225.059H4.55a1.6 1.6 0 0 0-.742.15 1.5 1.5 0 0 0-.591.475c-.154.203-.257.44-.3.691a1.55 1.55 0 0 0 .05.734l.408 1.408q.03.104 0 .208a.34.34 0 0 1-.117.167l-1.108.833a1.66 1.66 0 0 0-.483.567 1.6 1.6 0 0 0 0 1.425c.116.223.281.417.483.567l1.108.833a.34.34 0 0 1 .117.375l-.458 1.358a1.7 1.7 0 0 0-.059.759c.042.249.145.483.3.683.153.209.357.375.592.483.22.105.464.154.708.142H5.7a.32.32 0 0 1 .208.067c.06.04.102.103.117.175l.358 1.258c.074.249.206.477.384.667a1.575 1.575 0 0 0 2.116.141l.958-.758a.325.325 0 0 1 .409 0l.941.75c.2.169.442.281.7.325q.143.012.284 0 .247 0 .483-.075a1.56 1.56 0 0 0 1.034-1.067l.366-1.266a.28.28 0 0 1 .117-.175.33.33 0 0 1 .225-.067h1.191c.255.01.51-.038.742-.142a1.59 1.59 0 0 0 .825-1.933l-.45-1.35a.3.3 0 0 1 0-.208.3.3 0 0 1 .117-.167l1.108-.833a1.56 1.56 0 0 0 .475-.567c.117-.22.177-.467.175-.717a1.6 1.6 0 0 0-.191-.65m-4.534-.633-3.683 3.683a1.7 1.7 0 0 1-.492.334 1.6 1.6 0 0 1-.583.116 1.4 1.4 0 0 1-.592-.125 1.6 1.6 0 0 1-.5-.333l-1.817-1.825A.834.834 0 0 1 7.366 9.39L9.1 11.123l3.583-3.591a.833.833 0 0 1 1.175 0 .833.833 0 0 1 0 1.216z"
				className="fill-info opacity-100"
			/>
			<path
				d="M18.392 9.348a1.5 1.5 0 0 0-.476-.558l-1.108-.833a.3.3 0 0 1-.117-.167.3.3 0 0 1 0-.208l.459-1.359c.073-.243.09-.5.05-.75a1.5 1.5 0 0 0-.3-.7 1.55 1.55 0 0 0-.583-.475 1.46 1.46 0 0 0-.709-.141h-1.25a.34.34 0 0 1-.325-.25l-.358-1.25a1.6 1.6 0 0 0-.384-.675 1.7 1.7 0 0 0-.65-.409 1.7 1.7 0 0 0-.766-.05 1.6 1.6 0 0 0-.692.325l-.95.75a.3.3 0 0 1-.192.075.3.3 0 0 1-.183-.041l-.942-.75a1.54 1.54 0 0 0-.666-.317 1.56 1.56 0 0 0-.734 0c-.241.067-.464.19-.65.358-.19.184-.335.41-.424.659L6.083 3.84a.32.32 0 0 1-.125.183.34.34 0 0 1-.225.059H4.55a1.6 1.6 0 0 0-.742.15 1.5 1.5 0 0 0-.591.475c-.154.203-.257.44-.3.691a1.55 1.55 0 0 0 .05.734l.408 1.408q.03.104 0 .208a.34.34 0 0 1-.117.167l-1.108.833a1.66 1.66 0 0 0-.483.567 1.6 1.6 0 0 0 0 1.425c.116.223.281.417.483.567l1.108.833a.34.34 0 0 1 .117.375l-.458 1.358a1.7 1.7 0 0 0-.059.759c.042.249.145.483.3.683.153.209.357.375.592.483.22.105.464.154.708.142H5.7a.32.32 0 0 1 .208.067c.06.04.102.103.117.175l.358 1.258c.074.249.206.477.384.667a1.575 1.575 0 0 0 2.116.141l.958-.758a.325.325 0 0 1 .409 0l.941.75c.2.169.442.281.7.325q.143.012.284 0 .247 0 .483-.075a1.56 1.56 0 0 0 1.034-1.067l.366-1.266a.28.28 0 0 1 .117-.175.33.33 0 0 1 .225-.067h1.191c.255.01.51-.038.742-.142a1.59 1.59 0 0 0 .825-1.933l-.45-1.35a.3.3 0 0 1 0-.208.3.3 0 0 1 .117-.167l1.108-.833a1.56 1.56 0 0 0 .475-.567c.117-.22.177-.467.175-.717a1.6 1.6 0 0 0-.191-.65Zm-4.534-.633-3.683 3.683a1.7 1.7 0 0 1-.492.334 1.6 1.6 0 0 1-.583.116 1.4 1.4 0 0 1-.592-.125 1.6 1.6 0 0 1-.5-.333l-1.817-1.825A.834.834 0 0 1 7.366 9.39L9.1 11.123l3.583-3.591a.833.833 0 0 1 1.175 0 .833.833 0 0 1 0 1.216z"
				className="stroke-bg stroke-3"
				mask="url(#a)"
			/>
		</svg>
	)
}
