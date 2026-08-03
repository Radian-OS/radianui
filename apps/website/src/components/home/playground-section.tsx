"use client"

import { useEffect, useState } from "react"
import { FileCode, Lock, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { usePlayground } from "@/contexts/playground"
import code from "@/data/code-snippets.json"
import colorvalue from "@/data/color-value.json"
import { BadgeDot } from "@/registry/ui/badge"
import { Badge } from "@/styles/default/ui/badge"
import { CodeArea } from "@/styles/default/ui/code-area"
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/styles/default/ui/tabs"
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
	const [activeFile, setActiveFile] = useState<"signin.tsx" | "globals.css">(
		"signin.tsx"
	)

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
		<section
			aria-labelledby="customize-section-title"
			className="bg-bg relative z-30 mx-auto w-full max-w-[1440px]">
			<div className="max-w-360 border-soft mx-auto flex w-full flex-col overflow-hidden border border-y-0">
				<div className="lg:px-15 lg:py-30 flex flex-col gap-4 px-5 py-16 sm:gap-6 sm:px-10">
					<Badge size="28" color="primary" variant="soft">
						<BadgeDot className="bg-primary" />
						Customize
					</Badge>
					<h2 className="heading-3 font-heading w-full lg:w-[900px]">
						<span className="text-fg font-medium">Flexible by default. </span>
						<span className="text-fg-secondary font-medium">
							Personalize colors, fonts, themes, and component properties to
							match your design system in minutes.
						</span>
					</h2>
				</div>

				<div className="border-soft bg-bg z-20 flex h-fit w-full flex-col gap-2.5 border border-x-0 border-b-0 pt-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2 px-4">
							<span className="bg-error size-2.5 rounded-full" />
							<span className="bg-success size-2.5 rounded-full" />
							<span className="bg-warning size-2.5 rounded-full" />
						</div>
						<div className="text-fg-tertiary flex items-center gap-1.5">
							<Lock size={16} />
							<span className="text-sm">radianos.com</span>
						</div>
						<div className="text-fg-tertiary flex items-center gap-3 px-3">
							{/* <Share size={16} /> */}
						</div>
					</div>
					<Tabs
						defaultValue="preview"
						className="border-soft flex h-full w-full flex-col gap-0 overflow-hidden border border-x-0 border-b-0">
						{/* Mobile/Tablet View */}
						<div
							style={{
								fontFamily: `${fontName}, ${fontCategory}`,
							}}
							className={`sm:h-205 h-190 lg:hidden color-${color}`}>
							<div
								style={{
									backgroundImage:
										"radial-gradient(circle, var(--color-fill4-alpha) 1px, transparent 1px)",
									backgroundSize: "10px 10px",
								}}
								className="bg-elevation-negative flex h-12 w-full items-center justify-center p-1 sm:justify-end">
								<div className={theme === "light" ? "dark" : "theme-inverse"}>
									<div className="bg-bg/20 mt-5 rounded-xl p-1 sm:mr-3">
										<div className="border-border bg-bg flex h-10 gap-1 rounded-lg border p-1 shadow-[0_4px_8px_color-mix(in_srgb,oklch(1_0_0),transparent_88%)] dark:shadow-[0_4px_8px_color-mix(in_srgb,oklch(0_0_0),transparent_60%)]">
											<div className="border-soft flex h-8 items-center border-r">
												<Layout />
											</div>
											<div className="text-fg-secondary flex">
												<Radius />
												<Font />
												<ListTodos />
												<Uploads />
											</div>
											<div className="border-soft flex h-8 items-center border-l pl-2">
												<div className="text-fg-secondary flex">
													<button
														aria-label="Toggle Theme"
														onClick={toggleTheme}
														className="hover:bg-fill2 text-fg flex size-8 cursor-pointer items-center justify-center rounded-md">
														{theme === "light" ? (
															<MoonIcon size={18} />
														) : (
															<SunIcon size={18} />
														)}
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
								<Tabs
									className="h-full gap-0"
									value={activeFile}
									onValueChange={(value) =>
										setActiveFile(value as typeof activeFile)
									}>
									<div className="border-border flex h-10 items-center justify-between border-b pl-4">
										<div className="flex items-center gap-2">
											<FileCode size={20} className="text-fg-tertiary" />
											<p className="text-fg-secondary text-sm font-normal">
												app/auth/{layout}.tsx
											</p>
										</div>
										<TabsList className="h-full !rounded-none border-none data-[orientation=horizontal]:h-full">
											<TabsTrigger
												// className="border-border h-full border-l data-[orientation=horizontal]:first:rounded-l-none data-[orientation=horizontal]:last:rounded-r-none"
												value="signin.tsx">
												{layout}.tsx
											</TabsTrigger>
											<TabsTrigger
												// className="h-full data-[orientation=horizontal]:first:rounded-l-none data-[orientation=horizontal]:last:rounded-r-none"
												value="globals.css">
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
												theme={
													theme === "dark"
														? "github-dark-high-contrast"
														: "github-light"
												}
											/>
										</TabsContent>
										<TabsContent value="globals.css">
											<CodeArea
												code={globalsCode}
												language="css"
												className="h-full w-full overflow-scroll [&>pre>pre]:!p-4"
												lineNumbers
												theme={
													theme === "dark"
														? "github-dark-high-contrast"
														: "github-light"
												}
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
											<div className="border-soft flex h-8 items-center border-r">
												<Layout />
											</div>
											<div className="text-bg flex">
												<Radius />
												<Font />
												<ListTodos />
												<Uploads />
											</div>
											<div className="border-soft flex h-8 items-center border-l pl-2">
												<div className="text-fg-secondary flex">
													<button
														onClick={toggleTheme}
														aria-label="Toggle Theme"
														className="hover:bg-fill2 text-fg flex size-8 cursor-pointer items-center justify-center rounded-md">
														{theme === "light" ? (
															<MoonIcon size={18} />
														) : (
															<SunIcon size={18} />
														)}
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
		</section>
	)
}
