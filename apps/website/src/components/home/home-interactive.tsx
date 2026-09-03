"use client"

import { useState } from "react"
import { Check, Clipboard } from "lucide-react"
import dynamic from "next/dynamic"
import { toast } from "sonner"
import { Button } from "@/registry/ui/button"
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/styles/default/ui/tabs"

const PAGES = [
	{
		value: "signin",
		label: "Sign In",
		command: "pnpm dlx radianui@latest add signin-09",
		link: "/blocks/signin",
	},
	{
		value: "signup",
		label: "Sign Up",
		command: "pnpm dlx radianui@latest add signup-02",
		link: "/blocks/signup",
	},
	{
		value: "verification",
		label: "Verification",
		command: "pnpm dlx radianui@latest add verification-01",
		link: "/blocks/verification",
	},
	{
		value: "password-reset",
		label: "Password Reset",
		command: "pnpm dlx radianui@latest add password-reset-01",
		link: "/blocks/password-reset",
	},
	{
		value: "new-password",
		label: "New Password",
		command: "pnpm dlx radianui@latest add new-password-01",
		link: "/blocks/new-password",
	},
] as const

type PageValue = (typeof PAGES)[number]["value"]

const PAGE_COMPONENTS = {
	signin: dynamic(() => import("@/app/blocks/signin/page"), {
		loading: () => null,
	}),
	signup: dynamic(() => import("@/app/blocks/signup/page"), {
		loading: () => null,
	}),
	verification: dynamic(() => import("@/app/blocks/verification/page"), {
		loading: () => null,
	}),
	"password-reset": dynamic(() => import("@/app/blocks/password-reset/page"), {
		loading: () => null,
	}),
	"new-password": dynamic(() => import("@/app/blocks/new-password/page"), {
		loading: () => null,
	}),
} as const

const HomeInteractive = () => {
	function useCopyPaste() {
		const [copied, setCopied] = useState(false)

		const copy = (
			e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
			code: string
		) => {
			e.preventDefault()
			navigator.clipboard.writeText(code)
			setCopied(true)

			setTimeout(() => {
				setCopied(false)
			}, 1500)
		}

		return { copied, copy }
	}
	const [activeTab, setActiveTab] = useState<PageValue>("signin")
	const [loadedTabs, setLoadedTabs] = useState<Record<PageValue, boolean>>({
		signin: true,
		signup: false,
		verification: false,
		"password-reset": false,
		"new-password": false,
	})
	const { copy, copied } = useCopyPaste()

	const handleTabChange = (value: string) => {
		const nextTab = value as PageValue

		setActiveTab(nextTab)
		setLoadedTabs((current) =>
			current[nextTab] ? current : { ...current, [nextTab]: true }
		)
	}

	return (
		<div className="bg-fill1-alpha border-soft relative z-30 h-full border p-3 backdrop-blur-[45px]">
			<Tabs
				value={activeTab}
				onValueChange={handleTabChange}
				className="h-full">
				<div className="flex justify-between">
					<div className="flex [scrollbar-width:none] overflow-x-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
						<TabsList className="mx-auto shrink-0 bg-transparent">
							{PAGES.map((page, idx) => (
								<TabsTrigger key={`${page.value}-${idx}`} value={page.value}>
									{page.label}
								</TabsTrigger>
							))}
						</TabsList>
					</div>
					<div className="flex items-center gap-0.5">
						<Button
							onClick={(e) => {
								const activePage = PAGES.find((p) => p.value === activeTab)!
								copy(e, activePage.command)
								toast.custom(() => (
									<div className="bg-black-inverse text-fg-inverse flex w-[416px] items-center gap-2 rounded-lg px-3 py-2.5">
										<Check size={20} className="text-success" />
										<div className="text-fg-inverse">
											<p className="text-sm font-medium">Copied Command:</p>
											<p className="text-sm font-normal">
												{activePage.command}
											</p>
										</div>
									</div>
								))
							}}
							color="neutral"
							aria-label="Copy Add Block Command Button"
							variant="ghost"
							size="28">
							{copied ? (
								<Check size={16} className="stroke-fg-tertiary shrink-0" />
							) : (
								<Clipboard size={16} className="stroke-fg-tertiary shrink-0" />
							)}
						</Button>
					</div>
				</div>
				{PAGES.map((page) => {
					const PageComponent = PAGE_COMPONENTS[page.value]

					return (
						<TabsContent
							key={page.value}
							value={page.value}
							className="border-soft h-full w-full overflow-clip rounded-lg border">
							{loadedTabs[page.value] ? (
								<PageComponent fullScreen={false} />
							) : null}
						</TabsContent>
					)
				})}
			</Tabs>
		</div>
	)
}

export default HomeInteractive
