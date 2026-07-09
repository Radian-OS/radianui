import * as React from "react"
import { BarChart, CheckSquare, ExternalLink, Folder, Mail } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/registry/ui/badge"
import { Checkbox } from "@/registry/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"
import {
	Stepper,
	StepperIndicator,
	StepperItem,
	StepperNav,
	StepperSeparator,
	StepperTrigger,
} from "@/registry/ui/stepper"
import { Switch, SwitchWrapper } from "@/registry/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/registry/ui/tabs"

function Card({
	title,
	variants,
	children,
	href,
}: {
	title: string
	variants: string
	children: React.ReactNode
	href: string
}) {
	return (
		<div className="flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
			<div className="mb-6 flex items-center justify-between">
				<span className="text-sm font-semibold text-zinc-900 dark:text-white">
					{title}
				</span>
				<span className="text-xs text-zinc-500">{variants}</span>
			</div>
			<div className="relative mb-6 flex min-h-[140px] flex-1 items-center justify-center overflow-hidden rounded-lg border border-zinc-100 bg-zinc-50 dark:border-zinc-800/50 dark:bg-zinc-900/30">
				{/* Background dot pattern */}
				<div
					className="absolute inset-0 opacity-40 dark:opacity-20"
					style={{
						backgroundImage: "radial-gradient(#d4d4d8 1px, transparent 1px)",
						backgroundSize: "16px 16px",
					}}></div>
				<div className="relative z-10 flex w-full items-center justify-center p-4">
					{children}
				</div>
			</div>
			<Link
				href={href}
				className="flex items-center justify-center gap-2 rounded-lg bg-zinc-100 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">
				<ExternalLink className="h-4 w-4" /> View page
			</Link>
		</div>
	)
}

export function ComponentExpansionGrid() {
	return (
		<div className="my-10 grid grid-cols-1 gap-5 md:grid-cols-2">
			{/* Stepper */}
			<Card title="Stepper" variants="(6 variants)" href="#">
				<Stepper defaultValue={3} className="w-full max-w-[200px] px-2">
					<StepperNav>
						<StepperItem step={1}>
							<StepperTrigger className="rounded-md">
								<StepperIndicator className="rounded-md">1</StepperIndicator>
							</StepperTrigger>
							<StepperSeparator />
						</StepperItem>
						<StepperItem step={2}>
							<StepperTrigger className="rounded-md">
								<StepperIndicator className="rounded-md">2</StepperIndicator>
							</StepperTrigger>
							<StepperSeparator />
						</StepperItem>
						<StepperItem step={3}>
							<StepperTrigger className="rounded-md">
								<StepperIndicator className="rounded-md">3</StepperIndicator>
							</StepperTrigger>
							<StepperSeparator />
						</StepperItem>
						<StepperItem step={4}>
							<StepperTrigger className="rounded-md">
								<StepperIndicator className="rounded-md">4</StepperIndicator>
							</StepperTrigger>
						</StepperItem>
					</StepperNav>
				</Stepper>
			</Card>

			{/* Circular Progress Bar */}
			<Card title="Circular Progress Bar" variants="(4 Sizes)" href="#">
				<div className="bg-bg border-border relative flex h-24 w-24 items-center justify-center rounded-full border shadow-sm">
					<svg
						className="absolute inset-0 h-full w-full -rotate-90 transform p-1"
						viewBox="0 0 100 100">
						<circle
							cx="50"
							cy="50"
							r="42"
							fill="transparent"
							stroke="currentColor"
							strokeWidth="8"
							className="text-fg-tertiary"
						/>
						<circle
							cx="50"
							cy="50"
							r="42"
							fill="transparent"
							stroke="currentColor"
							strokeWidth="8"
							className="text-primary"
							strokeDasharray="264"
							strokeDashoffset="132"
							strokeLinecap="round"
						/>
					</svg>
					<div className="flex flex-col items-center">
						<span className="text-fg text-sm font-bold">50%</span>
						<span className="text-fg-secondary text-[10px] font-medium">
							Label
						</span>
					</div>
				</div>
			</Card>

			{/* Radio Card */}
			<Card title="Radio Card" variants="(7 variants)" href="#">
				<div className="border-border bg-bg flex w-full max-w-[220px] items-center gap-3 rounded-xl border p-3 shadow-sm">
					<div className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white shadow-inner">
						<svg
							className="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 10V3L4 14h7v7l9-11h-7z"
							/>
						</svg>
					</div>
					<div className="flex min-w-0 flex-1 flex-col">
						<div className="flex items-center gap-1">
							Label{" "}
							<Badge size="20" color="emerald" variant="soft">
								New
							</Badge>
						</div>
						<span className="text-fg-tertiary truncate text-[9px]">
							Insert the cards description here.
						</span>
					</div>
					<RadioGroup className="shrink-0">
						<RadioGroupItem value="item-1" />
					</RadioGroup>
				</div>
			</Card>

			{/* Switch Card */}
			<Card title="Switch Card" variants="(7 variants)" href="#">
				<div className="border-border bg-bg flex w-full max-w-[220px] items-center gap-3 rounded-xl border p-3 shadow-sm">
					<div className="bg-red-accent text-red-text flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[9px] font-bold">
						PDF
					</div>
					<div className="flex min-w-0 flex-1 flex-col">
						<div className="flex items-center gap-1">
							Label{" "}
							<Badge variant="soft" color="emerald" size="20">
								New
							</Badge>
						</div>
						<span className="truncate text-[9px] text-zinc-500">
							Insert the cards description here.
						</span>
					</div>
					<SwitchWrapper className="shrink-0">
						<Switch defaultChecked size="20" />
					</SwitchWrapper>
				</div>
			</Card>

			{/* Vertical Tab */}
			<Card title="Vertical Tab" variants="(6 variants)" href="#">
				<Tabs defaultValue="inbox" orientation="vertical">
					<TabsList variant="open" className="w-12">
						<TabsTrigger value="inbox" className="justify-start">
							<Mail className="h-3.5 w-3.5 opacity-80" /> Inbox
						</TabsTrigger>
						<TabsTrigger value="projects" className="justify-start">
							<Folder className="h-3.5 w-3.5 opacity-80" /> Projects
						</TabsTrigger>
						<TabsTrigger value="tasks" className="justify-start">
							<CheckSquare className="h-3.5 w-3.5 opacity-80" /> Tasks
						</TabsTrigger>
						<TabsTrigger value="analytics" className="justify-start">
							<BarChart className="h-3.5 w-3.5 opacity-80" /> Analytics
						</TabsTrigger>
					</TabsList>
				</Tabs>
			</Card>

			{/* Checkbox Card */}
			<Card title="Checkbox Card" variants="(7 variants)" href="#">
				<div className="bg-bg flex w-full max-w-[220px] items-center gap-3 rounded-xl border-2 p-3">
					<div className="bg-orange-accent flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full text-xl">
						<span className="text-sm">👨‍💻</span>
					</div>
					<div className="flex min-w-0 flex-1 flex-col">
						<div className="flex items-center gap-1">
							Label
							<Badge variant="soft" color="emerald" size="20">
								New
							</Badge>
						</div>
						<span className="text-fg-tertiary truncate text-[9px]">
							Insert the cards description here.
						</span>
					</div>
					<Checkbox defaultChecked size="sm" className="shrink-0" />
				</div>
			</Card>
		</div>
	)
}
