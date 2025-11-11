"use client"

import React, { useState } from "react"
import { Check, Clipboard, Menu } from "lucide-react"
import Signin from "@/components/home/pages/signin"
import Signup from "@/components/home/pages/signup"
import Verification from "@/components/home/pages/verification"
import { Button } from "@/registry/ui/button"
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/registry/ui/drawer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const HomeInteractive = () => {
	const PAGES = [
		{
			value: "signin",
			label: "Sign In",
			component: <Signin />,
			command: "pnpm dlx @radianos/radianbeta add signin-09",
		},
		{
			value: "signup",
			label: "Sign Up",
			component: <Signup />,
			command: "pnpm dlx @radianos/radianbeta add signup-02",
		},
		{
			value: "verification",
			label: "Verification",
			component: <Verification />,
			command: "pnpm dlx @radianos/radianbeta add verification-01",
		},
		{
			value: "settings",
			label: "Settings",
			component: <Verification />,
			command: "pnpm dlx @radianos/radianbeta add settings-01",
		},
		{
			value: "dashboard",
			label: "Dashboard",
			component: <Verification />,
			command: "pnpm dlx @radianos/radianbeta add settings-01",
		},
		{
			value: "hero",
			label: "Hero Section",
			component: <Verification />,
			command: "pnpm dlx @radianos/radianbeta add settings-01",
		},
		{
			value: "form",
			label: "Form",
			component: <Verification />,
			command: "pnpm dlx @radianos/radianbeta add settings-01",
		},
	] as const
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
		<div className="bg-bg border-soft z-50 h-full rounded-xl border p-3">
			<Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as (typeof PAGES)[number]["value"])} className="h-full">
				<div className="flex justify-between">
					<Drawer direction="left">
						<DrawerTrigger className="md:hidden">
							<Button variant="ghost" color="neutral">
								<Menu />
							</Button>
						</DrawerTrigger>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle>{undefined}</DrawerTitle>
							</DrawerHeader>
							<DrawerBody>
								<TabsList variant="outline-ghost" size="md" className="!h-fit !flex-col md:hidden">
									{PAGES.map((page, idx) => (
										<TabsTrigger key={`${page.value}-${idx}`} value={page.value} className="w-full">
											{page.label}
										</TabsTrigger>
									))}
								</TabsList>
							</DrawerBody>
						</DrawerContent>
					</Drawer>
					<TabsList variant="outline-ghost" size="md" className="not-md:hidden mx-auto shrink-0">
						{PAGES.map((page, idx) => (
							<TabsTrigger key={`${page.value}-${idx}`} value={page.value}>
								{page.label}
							</TabsTrigger>
						))}
					</TabsList>
					<Button onClick={(e) => copy(e, PAGES.find((p) => p.value === activeTab)!.command)} color="neutral" variant="ghost" size="36">
						{copied ? <Check /> : <Clipboard />}
					</Button>
				</div>
				{PAGES.map((page) => (
					<TabsContent key={page.value} value={page.value} className="border-soft h-full w-full overflow-clip rounded-lg border">
						{page.component}
					</TabsContent>
				))}
			</Tabs>
		</div>
	)
}

export default HomeInteractive
