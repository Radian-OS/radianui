"use client"

import { useEffect, useState } from "react"
import { FileCode, Lock, MoonIcon, SunIcon, SwatchBook } from "lucide-react"
import { useTheme } from "next-themes"
import { usePlayground } from "@/contexts/playground"
import code from "@/data/code-snippets.json"
import colorvalue from "@/data/color-value.json"
import { BorderBeam } from "@/registry/animated/border-beam"
import { Badge } from "@/registry/ui/badge"
import { CodeArea } from "@/registry/ui/code-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import HoverCard from "./block/hover-card"
import Signin1 from "./block/signin1"
import Signin2 from "./block/signin2"
import Signin3 from "./block/signin3"
import Signup2 from "./block/signup2"
import Colors from "./playground/color"
import Font from "./playground/font"
import Layout from "./playground/layout"
import ListTodos from "./playground/list-todo"
import Radius from "./playground/radius"
import Uploads from "./playground/upload"

export default function PlaygroundSection() {
	const { theme, setTheme } = useTheme()
	const [activeFile, setActiveFile] = useState<"signin.tsx" | "globals.css">("signin.tsx")

	const { layout, color, fontName, fontCategory } = usePlayground()

	const layouts = {
		"signin-1": <Signin1 />,
		"signin-2": <Signin2 />,
		"signin-3": <Signin3 />,
		signup: <Signup2 />,
		"hover-card": <HoverCard />,
	}

	const currentCode = code?.[layout] || "// Loading..."

	const globalsCode = `@theme {
\t/* ... */

\t${colorvalue[color as keyof typeof colorvalue]}

\t/* ... */
}`

	useEffect(() => {
		if (!fontName) return
		const link = document.createElement("link")
		link.rel = "stylesheet"
		link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, "+")}&display=swap`
		document.head.appendChild(link)
		return () => {
			document.head.removeChild(link)
		}
	}, [fontName])

	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light")
	}

	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}
	return (
		<div className="py-15 min-[1920px]:pt-25 flex flex-col items-center gap-10 px-5 min-[1920px]:gap-16 min-[1920px]:px-60 min-[1920px]:py-20">
			<div className="border-soft align-center pt-15 xl:px-15 relative flex justify-center rounded-t-3xl px-5 xl:border-l xl:border-r xl:border-t">
				{/* Div to hide bottom of border beam */}
				<div className="bg-bg absolute -bottom-1 z-10 h-2 w-full"></div>
				<BorderBeam size={100} className="not-xl:hidden" />

				<svg className="-top-25 not-xl:hidden absolute" width="812" height="77" viewBox="0 0 812 77" fill="none" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<linearGradient id="playgroundPath" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stopColor="var(--color-bg)" stopOpacity="1" />
							<stop offset="10%" stopColor="var(--color-soft)" stopOpacity="1" />
							<stop offset="50%" stopColor="var(--color-soft)" stopOpacity="1" />
							<stop offset="90%" stopColor="var(--color-soft)" stopOpacity="1" />
							<stop offset="100%" stopColor="var(--color-bg)" stopOpacity="1" />
						</linearGradient>
					</defs>
					<path d="M811.5 76.5V25C811.5 11.7452 800.755 1 787.5 1H25C11.7452 1 1 11.7452 1 25V76.5" stroke="url(#playgroundPath)" />
				</svg>

				<div className="flex flex-col items-center gap-6">
					<div className="bg-bg absolute bottom-full h-fit translate-y-1/2 px-4">
						<div className="border-soft px-7 xl:border-l xl:border-r">
							<Badge size="28" variant="soft">
								<SwatchBook className="text-primary" />
								Flexibility
							</Badge>
						</div>
					</div>
					<div className="flex max-w-[752px] flex-col items-center gap-5">
						<h2 className="heading-2 text-center">
							<span className="from-fg to-fg-secondary bg-gradient-to-b bg-clip-text text-transparent">Customize Every Detail, </span>
							<span className="bg-gradient-to-b from-[#492EB8] to-[#7655F6] bg-clip-text text-transparent">Effortlessly</span>
						</h2>
						<p className="text-fg-secondary max-w-[550px] text-center text-base font-normal">
							From colors to corners to fonts and themes, fine-tune any component to match your brand and ship polished interfaces faster.
						</p>
					</div>
				</div>

				<div className="bg-bg absolute -right-1 bottom-0 z-40 h-1/3 w-2" />
				<div className="bg-bg absolute -left-1 bottom-0 z-40 h-1/3 w-2" />

				{/* Right curve line */}
				<svg
					className="not-xl:hidden z-5 absolute bottom-1/2 left-[calc(100%+20px)]"
					xmlns="http://www.w3.org/2000/svg"
					width={80}
					height={410}
					viewBox="0 -503 80 520"
					fill="none">
					<path d="M 0 0 L 45 0 C 68 0 70 -10 69 -43 L 69 -503" stroke="var(--color-soft)" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />

					<path
						id="beamPath"
						d="M 0 0 L 45 0 C 68 0 70 -10 69 -43 L 69 -503"
						fill="none"
						stroke="var(--color-primary)"
						strokeWidth="1"
						strokeLinecap="round"
						className="animate-[var(--animate-beam-flow3)] opacity-0 [stroke-dasharray:60_1000] [stroke-dashoffset:1000]"
						pathLength="1000"
					/>
				</svg>

				{/* Left curve line */}
				<svg
					className="not-xl:hidden absolute bottom-1/2 right-[calc(100%+20px)] scale-x-[-1]"
					xmlns="http://www.w3.org/2000/svg"
					width={80}
					height={410}
					viewBox="0 -503 80 520"
					fill="none">
					<path d="M 0 0 L 45 0 C 68 0 70 -10 69 -43 L 69 -503" stroke="var(--color-soft)" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
					<path
						id="beamPath"
						d="M 0 0 L 45 0 C 68 0 70 -10 69 -43 L 69 -503"
						fill="none"
						stroke="var(--color-primary)"
						strokeWidth="1"
						strokeLinecap="round"
						className="animate-[var(--animate-beam-flow3)] opacity-0 [stroke-dasharray:60_1000] [stroke-dashoffset:1000]"
						pathLength="1000"
					/>
				</svg>
			</div>

			<div className="border-soft bg-bg z-20 flex h-fit w-full max-w-[1440px] flex-col gap-2.5 rounded-2xl border p-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2 px-2">
						<span className="bg-error size-2.5 rounded-full" />
						<span className="bg-success size-2.5 rounded-full" />
						<span className="bg-warning size-2.5 rounded-full" />
					</div>
					<div className="text-fg-tertiary flex items-center gap-1.5">
						<Lock size={16} />
						<span className="text-sm">radianos.com</span>
					</div>
					<div className="text-fg-tertiary flex items-center gap-3 px-3">{/* <Share size={16} /> */}</div>
				</div>
				<Tabs defaultValue="preview" className="border-soft flex h-full w-full flex-col gap-0 overflow-hidden rounded-xl border">
					{/* Mobile/Tablet View */}
					<div
						style={{
							fontFamily: `${fontName}, ${fontCategory}`,
						}}
						className={`sm:h-205 h-190 lg:hidden color-${color}`}>
						<div
							style={{
								backgroundImage: "radial-gradient(circle, var(--color-fill4-alpha) 1px, transparent 1px)",
								backgroundSize: "10px 10px",
							}}
							className="bg-elevation-negative flex h-12 w-full items-center justify-center p-1 sm:justify-end">
							<div className={theme === "light" ? "dark" : "theme-inverse"}>
								<div className="bg-bg/20 mt-5 rounded-xl p-1 sm:mr-3">
									<div className="border-border bg-bg flex h-10 gap-1 rounded-lg border p-1 shadow-[0_4px_8px_color-mix(in_srgb,oklch(1_0_0),transparent_88%)] dark:shadow-[0_4px_8px_color-mix(in_srgb,oklch(0_0_0),transparent_60%)]">
										<div className="border-border flex h-8 items-center border-r">
											<Layout />
										</div>
										<div className="text-fg-secondary flex">
											<Radius />
											<Font />
											<ListTodos />
											<Uploads />
										</div>
										<div className="border-border flex h-8 items-center border-l pl-2">
											<div className="text-fg-secondary flex">
												<button
													aria-label="Toggle Theme"
													onClick={toggleTheme}
													className="hover:bg-fill2 text-fg flex size-8 cursor-pointer items-center justify-center rounded-md">
													{theme === "light" ? <MoonIcon size={18} /> : <SunIcon size={18} />}
												</button>
												<Colors />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						{layouts[layout]}
					</div>
					{/* Desktop View */}
					<div className="not-lg:hidden h-205 flex flex-1 overflow-hidden">
						<div className="border-soft h-205 w-1/2 flex-shrink-0 border-r">
							<Tabs className="h-full gap-0" value={activeFile} onValueChange={(value) => setActiveFile(value as typeof activeFile)}>
								<div className="border-border flex h-10 items-center justify-between border-b pl-4">
									<div className="flex items-center gap-2">
										<FileCode size={20} className="text-fg-tertiary" />
										<p className="text-fg-secondary text-sm font-normal">app/auth/{layout}.tsx</p>
									</div>
									<TabsList variant="outline" className="h-full !rounded-none border-none data-[orientation=horizontal]:h-full">
										<TabsTrigger
											className="border-border h-full border-l data-[orientation=horizontal]:first:rounded-l-none data-[orientation=horizontal]:last:rounded-r-none"
											value="signin.tsx">
											{layout}.tsx
										</TabsTrigger>
										<TabsTrigger className="h-full data-[orientation=horizontal]:first:rounded-l-none data-[orientation=horizontal]:last:rounded-r-none" value="globals.css">
											globals.css
										</TabsTrigger>
									</TabsList>
								</div>
								<div className="flex-1 overflow-auto">
									<TabsContent value="signin.tsx">
										<CodeArea
											code={currentCode}
											language="tsx"
											className="h-full [&>pre>pre]:!p-4"
											lineNumbers
											theme={theme === "dark" ? "github-dark-high-contrast" : "github-light"}
										/>
									</TabsContent>
									<TabsContent value="globals.css">
										<CodeArea
											code={globalsCode}
											language="css"
											className="h-full w-full overflow-scroll [&>pre>pre]:!p-4"
											lineNumbers
											theme={theme === "dark" ? "github-dark-high-contrast" : "github-light"}
										/>
									</TabsContent>
								</div>
							</Tabs>
						</div>
						<div
							style={{
								fontFamily: `${fontName}, ${fontCategory}`,
							}}
							className={`relative w-1/2 flex-shrink-0 color-${color}`}>
							<div className={theme === "light" ? "dark" : "theme-inverse"}>
								<div className="bg-bg/20 absolute right-4 top-4 z-10 flex h-12 items-center rounded-xl p-1">
									<div className="border-border bg-bg flex h-10 items-center gap-1 rounded-lg border p-1 shadow-[0_4px_8px_color-mix(in_srgb,oklch(1_0_0),transparent_88%)] dark:shadow-[0_4px_8px_color-mix(in_srgb,oklch(0_0_0),transparent_60%)]">
										<div className="border-border flex h-8 items-center border-r">
											<Layout />
										</div>
										<div className="text-bg flex">
											<Radius />
											<Font />
											<ListTodos />
											<Uploads />
										</div>
										<div className="border-border flex h-8 items-center border-l pl-2">
											<div className="text-fg-secondary flex">
												<button
													onClick={toggleTheme}
													aria-label="Toggle Theme"
													className="hover:bg-fill2 text-fg flex size-8 cursor-pointer items-center justify-center rounded-md">
													{theme === "light" ? <MoonIcon size={18} /> : <SunIcon size={18} />}
												</button>
												<Colors />
											</div>
										</div>
									</div>
								</div>
							</div>
							{layouts[layout]}
						</div>
					</div>
				</Tabs>
			</div>
		</div>
	)
}
