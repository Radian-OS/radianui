import React from "react"
import {
	BadgeHelp,
	BookOpen,
	Box,
	CircleUserRound,
	Keyboard,
	LogOutIcon,
	Settings,
	Slack,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Divider } from "@/registry/ui/divider"

const Dropdown = () => {
	return (
		<div className="bg-elevation-level1 border-soft w-full rounded-lg border">
			<div className="p-1">
				<div className="flex items-center gap-3 p-2">
					<Avatar size="36" rounded="circle">
						<AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" />
						<AvatarFallback>SS</AvatarFallback>
					</Avatar>
					<span className="grow">
						<p className="text-fg text-sm font-medium">Saru Shrestha</p>
						<p className="text-fg-tertiary text-[13px] font-normal">
							saru@radian.com
						</p>
					</span>
					<Badge variant="strong" color="primary" size="24">
						PRO
					</Badge>
				</div>
			</div>
			<Divider className="my-1" orientation="horizontal" />
			<div className="p-1">
				<p className="text-fg-tertiary p-2 text-[12px] font-medium"> GENERAL</p>
				<span className="hover:bg-fill2-alpha flex cursor-pointer gap-2 rounded-sm p-2">
					<CircleUserRound
						size={20}
						strokeWidth={1.5}
						className="text-fg-secondary"
					/>
					<p className="text-fg text-sm font-normal">View Profile</p>
				</span>
				<span className="hover:bg-fill2-alpha flex cursor-pointer gap-2 rounded-sm p-2">
					<Keyboard size={20} strokeWidth={1.5} className="text-fg-secondary" />
					<p className="text-fg text-sm font-normal">Keyboard shortcuts</p>
				</span>
			</div>
			<Divider className="my-1" orientation="horizontal" />
			<div className="p-1">
				<span className="hover:bg-fill2-alpha flex cursor-pointer gap-2 rounded-sm p-2">
					<BookOpen size={20} strokeWidth={1.5} className="text-fg-secondary" />
					<p className="text-fg text-sm font-normal">Change logs</p>
				</span>
				<span className="hover:bg-fill2-alpha flex cursor-pointer gap-2 rounded-sm p-2">
					<Slack size={20} strokeWidth={1.5} className="text-fg-secondary" />
					<p className="text-fg text-sm font-normal">Slack Community</p>
				</span>
				<span className="hover:bg-fill2-alpha flex cursor-pointer gap-2 rounded-sm p-2">
					<BadgeHelp
						size={20}
						strokeWidth={1.5}
						className="text-fg-secondary"
					/>
					<p className="text-fg text-sm font-normal">Support</p>
				</span>
				<span className="hover:bg-fill2-alpha flex cursor-pointer gap-2 rounded-sm p-2">
					<Box size={20} strokeWidth={1.5} className="text-fg-secondary" />
					<p className="text-fg text-sm font-normal">API</p>
				</span>
			</div>
			<Divider className="my-1" orientation="horizontal" />
			<div className="p-1">
				<span className="hover:bg-fill2-alpha flex cursor-pointer gap-2 rounded-sm p-2">
					<Settings size={20} strokeWidth={1.5} className="text-fg-secondary" />
					<p className="text-fg text-sm font-normal">Settings</p>
				</span>
				<span className="hover:bg-fill2-alpha flex cursor-pointer gap-2 rounded-sm p-2">
					<LogOutIcon
						size={20}
						strokeWidth={1.5}
						className="text-fg-secondary"
					/>
					<p className="text-fg text-sm font-normal">Log out</p>
				</span>
			</div>
		</div>
	)
}

export default Dropdown
