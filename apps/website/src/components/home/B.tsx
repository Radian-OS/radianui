"use client"

import React from "react"
import Chevron from "@public/icons/chevron-selector-vertical.svg"
import Cube from "@public/icons/cube-01.svg"
import CubeOutline from "@public/icons/cube-outline.svg"
import LineChart from "@public/icons/line-chart-up-02.svg"
import Menu from "@public/icons/menu-01.svg"
import Search from "@public/icons/search-refraction.svg"
import Settings from "@public/icons/settings-02.svg"
import User from "@public/icons/user-circle.svg"
import { AccordionContent } from "@radix-ui/react-accordion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Accordion, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"
import { Avatar } from "@/registry/ui/avatar"
import { Divider } from "@/registry/ui/divider"

function B({ className }: { className?: string }) {
	const [activeItem, setActiveItem] = React.useState<string>("dashboard")
	const [activeAccordionItem, setActiveAccordionItem] = React.useState<string | null>(null)

	return (
		<div
			className={cn(
				"bg-bg1 border-stroke top-48 right-10 flex h-200 w-80 scale-90 flex-col justify-between rounded-2xl border duration-1000",
				className
			)}>
			<div className="flex flex-col">
				<div className="text-fg1 flex items-center gap-2 px-3 py-4">
					<div className="p-2">
						<Menu className="text-fg1" />
					</div>
					<Image className="dark:hidden" src={"/radian.svg"} width={90} height={24} alt="Radian Logo" />
					<Image className="hidden dark:block" src={"/radian-dark.svg"} width={90} height={24} alt="Radian Logo" />
				</div>
				<div className="flex items-center justify-center px-3 py-1">
					<div className="border-stoke text-fg1 flex w-full items-center justify-center gap-3 rounded-lg border px-3 py-2.5">
						<Image src="/hero-section-avatar.png" width={32} height={32} alt="Avatar" />
						<div className="flex flex-1 flex-col">
							<span className="text-sm font-medium">Radian OS</span>
							<span className="text-text-disabled text-xs">Team - 44 members</span>
						</div>
						<Chevron className="text-fg1" />
					</div>
				</div>
				<div className="flex flex-col gap-0.5 px-3 py-1">
					<span className="text-text-disabled px-2 py-1 text-xs leading-4.5 font-medium">USER PANEL</span>
					<Item
						id="dashboard"
						prefix={<Cube className="text-fg2" />}
						text="Dashboard"
						active={activeItem === "dashboard"}
						onClick={() => setActiveItem("dashboard")}
					/>
					<Accordion collapsible defaultValue="components">
						<AccordionItem value="components">
							<AccordionTrigger className={cn("hover:bg-bg2 flex h-10 cursor-default gap-3 rounded-md px-2 text-sm")}>
								<Search className="text-fg2" /> <span className="flex-1">Components</span>
							</AccordionTrigger>
							<AccordionContent className="pt-0.5">
								<div className="flex flex-col gap-0.5">
									<AccordionTextItem
										text="Navigation"
										active={activeAccordionItem === "Navigation"}
										onClick={() => setActiveAccordionItem("Navigation")}
									/>
									<AccordionTextItem
										text="Hero Section"
										active={activeAccordionItem === "Hero Section"}
										onClick={() => setActiveAccordionItem("Hero Section")}
									/>
									<AccordionTextItem
										text="Social Proof"
										active={activeAccordionItem === "Social Proof"}
										onClick={() => setActiveAccordionItem("Social Proof")}
									/>
									<AccordionTextItem text="Features" active={activeAccordionItem === "Features"} onClick={() => setActiveAccordionItem("Features")} />
									<AccordionTextItem
										text="Testimonials"
										active={activeAccordionItem === "Testimonials"}
										onClick={() => setActiveAccordionItem("Testimonials")}
									/>
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
					<Item
						id="blocks"
						prefix={<CubeOutline className="text-fg2" />}
						text="Blocks"
						suffix={<span className="rounded-full bg-black px-1.5 py-0.5 text-xs text-white dark:bg-white dark:text-black">16</span>}
						active={activeItem === "blocks"}
						onClick={() => setActiveItem("blocks")}
					/>
					<Item
						id="users"
						prefix={<User className="text-fg2" />}
						text="Users"
						active={activeItem === "users"}
						onClick={() => setActiveItem("users")}
					/>
				</div>
				<Divider />
				<div className="flex flex-col gap-0.5 px-3 py-1">
					<span className="text-text-disabled px-2 py-1 text-xs leading-4.5 font-medium">ADMIN</span>
					<Item
						id="analytics"
						prefix={<LineChart className="text-fg2" />}
						text="Analytics"
						active={activeItem === "analytics"}
						onClick={() => setActiveItem("analytics")}
					/>
					<Item
						id="settings"
						prefix={<Settings className="text-fg2" />}
						text="Settings"
						active={activeItem === "settings"}
						onClick={() => setActiveItem("settings")}
					/>
				</div>
			</div>
			<div className="flex gap-3 px-3 py-2">
				<Avatar src="/icons/Avatar-2.png" size="32" name="JM" />
				<div className="flex flex-col">
					<p className="text-fg1 text-sm font-medium">James Mitchell</p>
					<p className="text-fg2 text-xs">james@radianos.com</p>
				</div>
			</div>
		</div>
	)
}

type AccordionTextItemProps = {
	text: string
	active?: boolean
	onClick?: () => void
}

function AccordionTextItem({ text, active, onClick }: AccordionTextItemProps) {
	return (
		<span
			onClick={onClick}
			className={cn("cursor-default rounded-md py-2 pr-2 pl-11 text-sm transition-colors", {
				"bg-bg3": active,
				"hover:bg-bg2": !active,
			})}>
			{text}
		</span>
	)
}

type ItemProps = {
	id: string
	prefix: React.ReactNode
	suffix?: React.ReactNode
	text: string
	active?: boolean
	onClick?: () => void
}

function Item({ id, prefix, suffix, text, active, onClick }: ItemProps) {
	return (
		<div
			id={id}
			onClick={onClick}
			className={cn("flex cursor-default items-center gap-3 rounded-md p-2 text-sm transition-colors", {
				"bg-bg3": active,
				"hover:bg-bg2": !active,
			})}>
			{prefix}
			<span className="flex-1">{text}</span>
			{suffix && suffix}
		</div>
	)
}

export default B
