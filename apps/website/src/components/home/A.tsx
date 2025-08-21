"use client"

import React, { useState } from "react"

import BarChart from "@public/icons/bar-chart-12.svg"
import Cube from "@public/icons/cube-01.svg"
import CubeOutline from "@public/icons/cube-outline.svg"
import HomeSmile from "@public/icons/home-smile.svg"
import Inbox from "@public/icons/inbox-01.svg"
import LifeBuoy from "@public/icons/life-buoy-02.svg"
import Lightning from "@public/icons/lightning-01.svg"
import LineChart from "@public/icons/line-chart-up-02.svg"
import Search from "@public/icons/search-refraction.svg"
import Settings from "@public/icons/settings-02.svg"
import Share from "@public/icons/share-07.svg"
import User from "@public/icons/user-circle.svg"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Avatar } from "@/registry/ui/avatar"
import { Divider } from "@/registry/ui/divider"

function A({ className }: { className?: string }) {
	const [activeSidebarIcon, setActiveSidebarIcon] = useState("homesmile")
	const [activeItem, setActiveItem] = useState<string>("dashboard")

	return (
		<div className={cn("border-border right-38 h-200 w-90 top-20 flex overflow-hidden rounded-2xl border transition-all duration-1000", className)}>
			<div className="bg-elevation-negative flex w-fit flex-col justify-between px-2 py-3">
				<div className="flex h-full flex-col items-center justify-between">
					<div className="flex flex-col items-center gap-3">
						<div className="p-1.5">
							<Image src="/icons/logo.svg" height={28} width={28} alt="Radian Logo" />
						</div>
						<div className="flex flex-col gap-0.5">
							<SidebarIcon
								id="homesmile"
								icon={<HomeSmile className="text-fg-secondary" />}
								active={activeSidebarIcon === "homesmile"}
								onClick={() => setActiveSidebarIcon("homesmile")}
							/>
							<SidebarIcon id="inbox" icon={<Inbox className="text-fg-secondary" />} active={activeSidebarIcon === "inbox"} onClick={() => setActiveSidebarIcon("inbox")} />
							<SidebarIcon
								id="barchart"
								icon={<BarChart className="text-fg-secondary" />}
								active={activeSidebarIcon === "barchart"}
								onClick={() => setActiveSidebarIcon("barchart")}
							/>
							<SidebarIcon
								id="lightning"
								icon={<Lightning className="text-fg-secondary" />}
								active={activeSidebarIcon === "lightning"}
								onClick={() => setActiveSidebarIcon("lightning")}
							/>
							<SidebarIcon id="cube" icon={<Cube className="text-fg-secondary" />} active={activeSidebarIcon === "cube"} onClick={() => setActiveSidebarIcon("cube")} />
							<SidebarIcon id="share" icon={<Share className="text-fg-secondary" />} active={activeSidebarIcon === "share"} onClick={() => setActiveSidebarIcon("share")} />
						</div>
					</div>
					<div className="flex flex-col items-center gap-3">
						<div className="flex flex-col gap-0.5">
							<SidebarIcon
								id="lifebuoy"
								icon={<LifeBuoy className="text-fg-secondary" />}
								active={activeSidebarIcon === "lifebuoy"}
								onClick={() => setActiveSidebarIcon("lifebuoy")}
							/>
							<SidebarIcon
								id="settings-left"
								icon={<Settings className="text-fg-secondary" />}
								active={activeSidebarIcon === "settings-left"}
								onClick={() => setActiveSidebarIcon("settings-left")}
							/>
						</div>
						<Avatar src="/icons/Avatar-2.webp" size="40" name="JM" />
					</div>
				</div>
			</div>

			{/* Workspace Panel */}
			<div className="bg-bg flex w-full flex-col">
				<span className="text-fg w-full px-4 py-5 font-medium leading-6">My Workspace</span>
				<div className="text-fg-secondary flex flex-col gap-0.5 px-3">
					<span className="text-fg-disabled py-2.25 px-2 text-xs font-medium">USER PANEL</span>
					<Item id="dashboard" icon={<Cube />} text="Dashboard" active={activeItem === "dashboard"} onClick={() => setActiveItem("dashboard")} />
					<Item id="components" icon={<Search />} text="Components" active={activeItem === "components"} onClick={() => setActiveItem("components")} />
					<Item id="blocks" icon={<CubeOutline />} text="Blocks" active={activeItem === "blocks"} onClick={() => setActiveItem("blocks")} />
					<Item id="users" icon={<User />} text="Users" active={activeItem === "users"} onClick={() => setActiveItem("users")} />
					<Item id="analytics-user" icon={<LineChart />} text="Analytics" active={activeItem === "analytics-user"} onClick={() => setActiveItem("analytics-user")} />
					<Item id="settings-user" icon={<Settings />} text="Settings" active={activeItem === "settings-user"} onClick={() => setActiveItem("settings-user")} />
				</div>
				<Divider spacing="8" />
				<div className="bg-bg flex w-full flex-col">
					<div className="text-fg-secondary flex flex-col gap-0.5 px-3">
						<span className="text-fg-disabled py-2.25 px-2 text-xs font-medium">ADMIN</span>
						<Item id="analytics-admin" icon={<LineChart />} text="Analytics" active={activeItem === "analytics-admin"} onClick={() => setActiveItem("analytics-admin")} />
						<Item id="settings-admin" icon={<Settings />} text="Settings" active={activeItem === "settings-admin"} onClick={() => setActiveItem("settings-admin")} />
					</div>
				</div>
			</div>
		</div>
	)
}

type ItemProps = {
	id: string
	icon: React.ReactNode
	text: string
	active: boolean
	onClick: () => void
}

function Item({ id, icon, text, active, onClick }: ItemProps) {
	return (
		<div
			id={id}
			onClick={onClick}
			className={cn("font-mediu flex cursor-default items-center gap-3 rounded-md p-2 text-sm", {
				"bg-elevation-negative": active,
				"hover:bg-fill1": !active,
			})}>
			{icon} <span>{text}</span>
		</div>
	)
}

type SidebarIconProps = {
	id: string
	icon: React.ReactNode
	active: boolean
	onClick: () => void
}

function SidebarIcon({ id, icon, active, onClick }: SidebarIconProps) {
	return (
		<div
			id={id}
			onClick={onClick}
			className={cn("cursor-default rounded-md p-3", {
				"bg-base": active,
				"hover:bg-inverse-fill4": !active,
			})}>
			{icon}
		</div>
	)
}

export default A
