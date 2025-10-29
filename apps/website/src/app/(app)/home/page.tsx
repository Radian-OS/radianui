"use client"

import { useState } from "react"
import { Box, Check, Clipboard, Code, Menu, SearchCode } from "lucide-react"
import Link from "next/link"
import Background from "@/components/effects/background"
import ComponentsSection from "@/components/home/components-section"
import CTASection from "@/components/home/cta-section"
import FAQSection from "@/components/home/faq-section"
import FeaturesSection from "@/components/home/features-section"
import FooterSection from "@/components/home/footer-section"
import Signin from "@/components/home/pages/signin"
import Signup from "@/components/home/pages/signup"
import Verification from "@/components/home/pages/verification"
import PlaygroundSection from "@/components/home/playground-section"
import VideoSection from "@/components/home/video-section"
import { BorderBeam } from "@/registry/animated/border-beam"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/registry/ui/drawer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

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

export default function Page() {
	const [activeTab, setActiveTab] = useState<(typeof PAGES)[number]["value"]>("signin")
	const { copy, copied } = useCopyPaste()

	return (
		<div className="min-h-screen w-full overflow-x-hidden">
			<Background>
				<div className="pt-30 flex flex-col items-center justify-center gap-12">
					<div className="max-w-250 flex flex-col items-center justify-center gap-6">
						<div className="relative h-[28px] rounded-md">
							<Badge size="28">
								<Box size={16} />
								Under Development - Alpha Release
							</Badge>
							<BorderBeam size={50} />
						</div>
						<h1 className="heading-1 from-fg to-fg-secondary bg-gradient-to-b bg-clip-text text-center text-transparent">Build next gen of world class products and solutions</h1>
						<p className="text-fg-secondary text-center text-lg font-normal">
							Radian is a high-quality, flexible and open-source, design and development library built using React and Tailwind. Start your next product here
						</p>
					</div>
					<div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
						<Link href="/docs/components/accordion" className="w-full sm:w-fit">
							<Button size="36" className="w-full sm:w-fit" variant="outline" color="neutral">
								<SearchCode />
								Browse Components
							</Button>
						</Link>
						<Button
							size="36"
							className="border-primary-hover w-full border bg-gradient-to-b from-[#6347EB] to-[#5133CF] shadow-[0px_4px_4px_rgba(24,25,27,0.16)] ring-[1.5px] ring-[#5B3FE0] hover:from-[#6A52F2] hover:to-[#5B3FE0] sm:w-fit">
							<Code />
							Copy Terminal Command
						</Button>
					</div>
				</div>

				<div className="mt-27 relative mx-auto h-[860px] max-w-[1400px]">
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

					{/* Upper left line */}
					<svg className="not-lg:hidden full -left-290 absolute bottom-[70%] -z-10 max-h-[756px]" viewBox="0 0 1552 756" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M 1552 756 L 1284.28 210.94 C 1280.06 203.268 1272 198.5 1263.24 198.5 L 1088.88 198.5 C 1080.31 198.5 1072.39 193.926 1068.1 186.5 L 967.928 13 C 963.641 5.5744 955.718 1 947.144 1 H 0"
							stroke="var(--color-soft)"
						/>

						<path
							id="beamPath"
							d="M 1552 756 L 1284.28 210.94 C 1280.06 203.268 1272 198.5 1263.24 198.5 L 1088.88 198.5 C 1080.31 198.5 1072.39 193.926 1068.1 186.5 L 967.928 13 C 963.641 5.5744 955.718 1 947.144 1 H 0"
							fill="none"
							stroke="var(--color-primary)"
							strokeWidth="1"
							strokeLinecap="round"
							className="animate-[var(--animate-beam-flow)] [stroke-dasharray:50_1000] [stroke-dashoffset:0]"
							pathLength="1000"
						/>
					</svg>

					{/* Lower left line */}
					<svg className="not-lg:hidden -left-290 absolute bottom-[75%] -z-10" width="1331" height="402" viewBox="0 0 1331 402" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M1329.73 401L1193.99 159.301C1190.79 153.591 1184.75 150.057 1178.2 150.057L1019.5 150.057C1013.03 150.057 1007.05 146.604 1003.81 141L928.21 10.0566C924.974 4.45235 918.995 1 912.523 1H-4"
							stroke="var(--color-soft)"
							strokeWidth="1"
						/>
						<path
							id="beamPath"
							d="M1329.73 401L1193.99 159.301C1190.79 153.591 1184.75 150.057 1178.2 150.057L1019.5 150.057C1013.03 150.057 1007.05 146.604 1003.81 141L928.21 10.0566C924.974 4.45235 918.995 1 912.523 1H-4"
							fill="none"
							stroke="var(--color-primary)"
							strokeWidth="1"
							strokeLinecap="round"
							className="animate-[var(--animate-beam-flow2)] opacity-0 [stroke-dasharray:50_1000] [stroke-dashoffset:0]"
							vectorEffect="non-scaling-stroke"
							pathLength="1000"
						/>
					</svg>

					{/* Upper right line */}
					<svg
						className="not-lg:hidden full -right-290 absolute bottom-[70%] -z-10 max-h-[756px] scale-x-[-1]"
						viewBox="0 0 1552 756"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M 1552 756 L 1284.28 210.94 C 1280.06 203.268 1272 198.5 1263.24 198.5 L 1088.88 198.5 C 1080.31 198.5 1072.39 193.926 1068.1 186.5 L 967.928 13 C 963.641 5.5744 955.718 1 947.144 1 H 0"
							stroke="var(--color-soft)"
						/>

						<path
							id="beamPath"
							d="M 1552 756 L 1284.28 210.94 C 1280.06 203.268 1272 198.5 1263.24 198.5 L 1088.88 198.5 C 1080.31 198.5 1072.39 193.926 1068.1 186.5 L 967.928 13 C 963.641 5.5744 955.718 1 947.144 1 H 0"
							fill="none"
							stroke="var(--color-primary)"
							strokeWidth="1"
							strokeLinecap="round"
							className="animate-[var(--animate-beam-flow)] [stroke-dasharray:50_1000] [stroke-dashoffset:0]"
							vectorEffect="non-scaling-stroke"
							pathLength="1000"
						/>
					</svg>

					{/* Lower right line */}
					<svg
						className="not-lg:hidden -right-290 absolute bottom-[75%] -z-10 scale-x-[-1]"
						width="1331"
						height="402"
						viewBox="0 0 1331 402"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M1329.73 401L1193.99 159.301C1190.79 153.591 1184.75 150.057 1178.2 150.057L1019.5 150.057C1013.03 150.057 1007.05 146.604 1003.81 141L928.21 10.0566C924.974 4.45235 918.995 1 912.523 1H-4"
							stroke="var(--color-soft)"
							strokeWidth="1"
						/>
						<path
							id="beamPath"
							d="M1329.73 401L1193.99 159.301C1190.79 153.591 1184.75 150.057 1178.2 150.057L1019.5 150.057C1013.03 150.057 1007.05 146.604 1003.81 141L928.21 10.0566C924.974 4.45235 918.995 1 912.523 1H-4"
							fill="none"
							stroke="var(--color-primary)"
							strokeWidth="1"
							strokeLinecap="round"
							className="animate-[var(--animate-beam-flow2)] opacity-0 [stroke-dasharray:50_1000] [stroke-dashoffset:0]"
							vectorEffect="non-scaling-stroke"
							pathLength="1000"
						/>
					</svg>
				</div>
			</Background>

			<FeaturesSection />

			<ComponentsSection />

			<PlaygroundSection />

			<VideoSection />

			<FAQSection />

			<CTASection />

			<FooterSection />
		</div>
	)
}
