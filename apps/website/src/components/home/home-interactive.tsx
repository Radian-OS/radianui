"use client"

import React, { useState } from "react"
import { Check, ChevronDown, Clipboard, Maximize, Share2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import Signin from "@/app/blocks/signin/page"
import Signup from "@/app/blocks/signup/page"
import Verification from "@/app/blocks/verification/page"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const PAGES = [
	{
		value: "signin",
		label: "Sign In",
		component: <Signin />,
		command: "pnpm dlx @radianos/radianbeta add signin-09",
		link: "/blocks/signin",
	},
	{
		value: "signup",
		label: "Sign Up",
		component: <Signup />,
		command: "pnpm dlx @radianos/radianbeta add signup-02",
		link: "/blocks/signup",
	},
	{
		value: "verification",
		label: "Verification",
		component: <Verification />,
		command: "pnpm dlx @radianos/radianbeta add verification-01",
		link: "/blocks/verification",
	},
	{
		value: "password-reset",
		label: "Password Reset",
		component: <Verification />,
		command: "pnpm dlx @radianos/radianbeta add password-reset-01",
		link: "/blocks/password-reset",
	},
] as const

const HomeInteractive = () => {
	function useCopyPaste() {
		const [copied, setCopied] = useState(false)

		const copy = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, code: string) => {
			e.preventDefault()
			navigator.clipboard.writeText(code)
			setCopied(true)

			setTimeout(() => {
				setCopied(false)
			}, 1500)
		}

		return { copied, copy }
	}
	const [activeTab, setActiveTab] = useState<(typeof PAGES)[number]["value"]>("signin")
	const { copy, copied } = useCopyPaste()
	return (
		<div className="bg-bg/60 border-soft relative z-50 h-full rounded-xl border p-3 backdrop-blur-[45px]">
			<Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as (typeof PAGES)[number]["value"])} className="h-full">
				<div className="flex justify-between">
					<div className="flex items-center gap-1.5 pl-3">
						<span className="bg-fill4 size-2 rounded-full" />
						<span className="bg-fill4 size-2 rounded-full" />
						<span className="bg-fill4 size-2 rounded-full" />
					</div>
					<TabsList variant="outline-ghost" size="md" className="not-lg:hidden mx-auto shrink-0 bg-transparent">
						{PAGES.map((page, idx) => (
							<TabsTrigger key={`${page.value}-${idx}`} value={page.value}>
								{page.label}
							</TabsTrigger>
						))}
						<div className="flex items-center gap-2 pl-3">
							<Link href={process.env.NEXT_PUBLIC_BLOCKS_URL!} target="_blank" className="text-fg-secondary text-sm">
								More Blocks
							</Link>
							<Badge variant="soft" size="20">
								Coming Soon
							</Badge>
						</div>
					</TabsList>
					<div className="flex items-center gap-0.5">
						<Button
							onClick={(e) => {
								copy(e, PAGES.find((p) => p.value === activeTab)!.command)
								toast.custom(() => (
									<div className="bg-black-inverse text-fg-inverse flex w-[200px] items-center justify-between gap-2 rounded-lg p-3">
										<div className="text-fg-inverse">
											<p className="text-sm font-normal">Successfully Copied Command</p>
										</div>
									</div>
								))
							}}
							color="neutral"
							variant="ghost"
							size="28">
							{copied ? <Check size={16} className="shrink-0" /> : <Clipboard size={16} className="shrink-0" />}
						</Button>
						<Button size="28" color="neutral" variant="ghost" asChild>
							<Share2 size={16} className="shrink-0" />
						</Button>
						<Button size="28" color="neutral" variant="ghost" asChild>
							<Link href={PAGES.find((p) => p.value === activeTab)?.link ?? ""} target="_blank">
								<Maximize size={16} className="shrink-0" />
							</Link>
						</Button>
						<Dropdown>
							<DropdownTrigger asChild className="lg:hidden">
								<Button color="neutral" size="28" variant="ghost">
									<ChevronDown size={16} className="shrink-0" />
								</Button>
							</DropdownTrigger>
							<DropdownContent align="end">
								<DropdownRadioGroup value={activeTab} onValueChange={(value) => setActiveTab(value as (typeof PAGES)[number]["value"])}>
									{PAGES.map((p) => (
										<DropdownRadioItem key={p.value} value={p.value}>
											{p.label}
										</DropdownRadioItem>
									))}
								</DropdownRadioGroup>
							</DropdownContent>
						</Dropdown>
					</div>
				</div>
				{PAGES.map((page) => (
					<TabsContent forceMount key={page.value} value={page.value} className="border-soft h-full w-full overflow-clip rounded-lg border">
						<iframe src={page.link} className="h-full w-full" />
					</TabsContent>
				))}
			</Tabs>
		</div>
	)
}

export default HomeInteractive
