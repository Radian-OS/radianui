"use client"

import { useEffect, useState } from "react"
import { Box, CircleDashed, CircleDotDashed, Copy, LockKeyhole, Plus, Share, Square, SquareDashed, Squircle, SwatchBook } from "lucide-react"
import { useTheme } from "next-themes"
import { dmSans, figtree, geist, ibmPlexSans, lato, manrope, openSans, raleway, roboto, rubik, workSans } from "@/lib/fetch-fonts"
import { BorderBeam } from "@/registry/animated/border-beam"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import PlaygroundSignin, { radiusMap } from "./playground-signin"

const FONTS: Record<string, string> = {
	"Inter Display and Inter": ``,
	Roboto: roboto.className,
	"Open Sans": openSans.className,
	Manrope: manrope.className,
	Geist: geist.className,
	Rubik: rubik.className,
	"DM Sans": dmSans.className,
	Lato: lato.className,
	Raleway: raleway.className,
	"Work Sans": workSans.className,
	"IBM Plex Sans": ibmPlexSans.className,
	Figtree: figtree.className,
}

const COLOR_VALUES = {
	violet: {
		label: "Violet",
		icon: <Squircle size={20} className="fill-primary-text stroke-primary-text" />,
	},
	red: {
		label: "Red",
		icon: <Squircle size={20} className="fill-error stroke-error" />,
	},
	yellow: {
		label: "Yellow",
		icon: <Squircle size={20} className="fill-warning stroke-warning" />,
	},
	green: {
		label: "Green",
		icon: <Squircle size={20} className="fill-success stroke-success" />,
	},
	blue: {
		label: "Blue",
		icon: <Squircle size={20} className="fill-info stroke-info" />,
	},
	emerald: {
		label: "Emerald",
		icon: <Squircle size={20} className="fill-fg-tertiary stroke-fg-tertiary" />,
	},
	teal: {
		label: "Teal",
		icon: <Squircle size={20} className="fill-fg-tertiary stroke-fg-tertiary" />,
	},
	cyan: {
		label: "Cyan",
		icon: <Squircle size={20} className="fill-fg-tertiary stroke-fg-tertiary" />,
	},
	purple: {
		label: "Purple",
		icon: <Squircle size={20} className="fill-fg-tertiary stroke-fg-tertiary" />,
	},
}

const ROUNDED_VALUES = {
	rounded: {
		label: "Rounded",
		icon: <CircleDashed size={20} className="text-fg-secondary" />,
	},
	default: {
		label: "Default",
		icon: <SquareDashed size={20} className="text-fg-secondary" />,
	},
	flat: {
		label: "Flat",
		icon: <Square size={20} className="text-fg-secondary" />,
	},
	fun: {
		label: "Fun",
		icon: <CircleDotDashed size={20} className="text-fg-secondary" />,
	},
}

type COLOR_VALUES_TYPE = keyof typeof COLOR_VALUES
type ROUNDED_VALUES_TYPE = keyof typeof ROUNDED_VALUES

const getGlobalsFileCode = (color: COLOR_VALUES_TYPE) => {
	let colorValues = ``

	switch (color) {
		case "red": {
			colorValues = `--color-primary: oklch(0.6092 0.2041 255.8);
	--color-primary-accent: oklch(0.949 0.0213 245.85);
	--color-primary-focus: oklch(0.9135 0.0358 249.52);
	--color-primary-border: oklch(0.719 0.1751 22.5);
	--color-primary-hover: oklch(0.6722 0.1615 251.56);
	--color-primary-text: oklch(0.4663 0.1065 251.21);`
			break
		}
		case "blue": {
			colorValues = `--color-primary: oklch(0.6092 0.2041 255.8);
	--color-primary-accent: oklch(0.949 0.0213 245.85);
	--color-primary-focus: oklch(0.9135 0.0358 249.52);
	--color-primary-border: oklch(0.6722 0.1615 251.56);
	--color-primary-hover: oklch(0.6722 0.1615 251.56);
	--color-primary-text: oklch(0.4663 0.1065 251.21);`
			break
		}
		case "green": {
			colorValues = `--color-primary: oklch(0.6334 0.171 148.65);
	--color-primary-accent: oklch(0.271 0.0537 151.74);
	--color-primary-focus: oklch(0.3887 0.0924 150.55);
	--color-primary-border: oklch(0.7118 0.2291 142.69);
	--color-primary-hover: oklch(0.6901 0.1748 149.64);
	--color-primary-text: oklch(0.871 0.1501 153.14);`
			break
		}
		case "violet": {
			colorValues = `--color-primary: oklch(0.528 0.2539 282.58);
	--color-primary-accent: oklch(0.94 0.0271 295.05);
	--color-primary-focus: oklch(0.9169 0.0383 295.46);
	--color-primary-hover: oklch(0.5768 0.2279 286.25);
	--color-primary-text: oklch(0.4304 0.202 282.82);`
			break
		}
		case "yellow": {
			colorValues = `--color-primary: oklch(0.8016 0.1705 73.27);
	--color-primary-accent: oklch(0.2663 0.0372 84.34);
	--color-primary-focus: oklch(0.3744 0.0636 81.14);
	--color-primary-border: oklch(0.8 0.1625 94.77);
	--color-primary-hover: oklch(0.8342 0.1594 79.51);
	--color-primary-text: oklch(0.8776 0.1255 82.88);`
			break
		}
		case "cyan": {
			colorValues = `--color-primary: oklch(0.6549 0.1092 194.82);
	--color-primary-accent: oklch(0.9719 0.041 196.5);
	--color-primary-focus: oklch(0.9531 0.0564 196.24);
	--color-primary-border: oklch(0.7375 0.1249 194.79);
	--color-primary-hover: oklch(0.7375 0.1249 194.79);
	--color-primary-text: oklch(0.5517 0.089 194.88);`
			break
		}
		case "emerald": {
			colorValues = `--color-primary: oklch(0.6334 0.171 148.65);
	--color-primary-accent: oklch(0.9685 0.0336 157.66);
	--color-primary-focus: oklch(0.9489 0.0556 156.34);
	--color-primary-border: oklch(0.6901 0.1748 149.64);
	--color-primary-hover: oklch(0.6901 0.1748 149.64);
	--color-primary-text: oklch(0.5388 0.1339 149.74);
			`
			break
		}
		case "purple": {
			colorValues = `--color-primary: oklch(0.5554 0.2522 292.8);
	--color-primary-accent: oklch(0.9424 0.0277 301.75);
	--color-primary-focus: oklch(0.92 0.0391 301.86);
	--color-primary-border: oklch(0.6963 0.1724 298.93);
	--color-primary-hover: oklch(0.6106 0.2219 295.95);
	--color-primary-text: oklch(0.5554 0.2522 292.8);
			`
			break
		}
		case "teal": {
			colorValues = `--color-primary: oklch(0.6432 0.1255 169.12);
	--color-primary-accent: oklch(0.972 0.0389 178.68);
	--color-primary-focus: oklch(0.9513 0.0697 177.06);
	--color-primary-border: oklch(0.7472 0.1465 169.02);
	--color-primary-hover: oklch(0.7472 0.1465 169.02);
	--color-primary-text: oklch(0.5427 0.1008 170.56);
			`
			break
		}
	}

	return `@theme {
	/* ... */

	${colorValues}

	/* ... */
}`
}

export default function PlaygroundSection() {
	const { theme } = useTheme()
	const [color, setColor] = useState<COLOR_VALUES_TYPE>("violet")
	const [rounded, setRounded] = useState<ROUNDED_VALUES_TYPE>("default")
	const [activeFile, setActiveFile] = useState<"signin.tsx" | "globals.css">("signin.tsx")
	const [selectedFont, setSelectedFont] = useState<keyof typeof FONTS>("Inter Display and Inter")

	const CODE = `
export default function PlaygroundSignin() {
	return (
	{/* ... */}

	<div className="flex flex-col gap-1.5">
		<Label htmlFor="email">Email</Label>
		<Input size="36" id="email" placeholder="example@radianos.com" className="${radiusMap[rounded]}"/>
	</div>

	<div className="flex flex-col gap-1.5">
		<Label htmlFor="password">Password</Label>
		<Input size="36" type="password" id="password" placeholder="••••••••••••" className="${radiusMap[rounded]}"/>
	</div>

	{/* ... */}

	<div className="flex items-center gap-2">
		<Checkbox id="remember-me" className="${radiusMap[rounded]}"/> <Label htmlFor="remember-me">Remember me</Label>
	</div>

	{/* ... */}

	<Button size="36" className="w-full ${radiusMap[rounded]}">
		Log In
	</Button>

	<div className="flex items-center gap-1.5">
		<Divider className="flex-1" />
		<span className="text-fg-tertiary whitespace-nowrap text-sm font-medium">Or continue with</span>
		<Divider className="flex-1" />
	</div>

	<div className="flex gap-3">
		<Button variant="outline" color="neutral" className="text-fg-secondary w-full ${radiusMap[rounded]}">
			{/* ... */}
			Google
		</Button>
		<Button variant="outline" color="neutral" className="text-fg-secondary w-full ${radiusMap[rounded]}">
			{/* ... */}
			Github
		</Button>
	</div>

	{/* ... */}

	</div>
	)
}
`

	useEffect(() => {
		setActiveFile("globals.css")
	}, [color])

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
							<Badge size="28" variant="soft" color="neutral">
								<SwatchBook className="text-primary" />
								Flexibility
							</Badge>
						</div>
					</div>
					<div className="flex max-w-[752px] flex-col items-center gap-5">
						<h2 className="heading-2 from-fg to-fg-secondary bg-gradient-to-b bg-clip-text text-center text-transparent">
							Customize Every Detail, <span className="bg-gradient-to-b from-[#492EB8] to-[#7655F6] bg-clip-text text-transparent">Effortlessly</span>
						</h2>
						<p className="text-fg-secondary max-w-[550px] text-center text-base font-normal">
							From colors to corners to fonts and themes, fine-tune any component to match your brand and ship polished interfaces faster.
						</p>
					</div>
				</div>

				<div className="bg-bg absolute -right-1 bottom-0 z-50 h-1/3 w-2" />
				<div className="bg-bg absolute -left-1 bottom-0 z-50 h-1/3 w-2" />

				{/* Right curve line */}
				<svg className="not-xl:hidden absolute bottom-1/2 left-[calc(100%+20px)]" xmlns="http://www.w3.org/2000/svg" width={80} height={520} viewBox="0 -503 80 520" fill="none">
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
					height={520}
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
						<LockKeyhole size={16} />
						<span className="text-sm">radianos.com</span>
					</div>
					<div className="text-fg-tertiary flex items-center gap-3 px-3">
						<Share size={16} />
						<Plus size={16} />
						<Copy size={16} />
					</div>
				</div>
				<Tabs defaultValue="preview" className="border-soft bg-bg flex h-full w-full flex-col gap-0 rounded-xl border">
					<div className="border-soft flex items-center justify-between border-b p-3">
						<TabsList className="lg:hidden">
							<TabsTrigger value="preview">Preview</TabsTrigger>
							<TabsTrigger value="code">Code</TabsTrigger>
						</TabsList>

						<Popover>
							<PopoverTrigger asChild>
								<Button size="36" variant="outline" color="neutral" className="md:hidden">
									<Box className="text-fg-tertiary" />
								</Button>
							</PopoverTrigger>
							<PopoverContent align="end" className="flex flex-col gap-3">
								<Select value={color} onValueChange={(value) => setColor(value as COLOR_VALUES_TYPE)}>
									<SelectTrigger size="36" className="text-fg-secondary w-full font-medium">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{(Object.keys(COLOR_VALUES) as COLOR_VALUES_TYPE[]).map((color) => (
											<SelectItem value={color} key={color}>
												{COLOR_VALUES[color].label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<Select value={selectedFont} onValueChange={(value) => setSelectedFont(value)}>
									<SelectTrigger size="36" className="text-fg-secondary w-full font-medium">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{Object.keys(FONTS).map((fontName) => (
											<SelectItem key={fontName} value={fontName}>
												{fontName}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<Tabs value={rounded} onValueChange={(value) => setRounded(value as ROUNDED_VALUES_TYPE)}>
									<TabsList>
										{(Object.keys(ROUNDED_VALUES) as ROUNDED_VALUES_TYPE[]).map((value) => (
											<TabsTrigger key={value} value={value}>
												{ROUNDED_VALUES[value].icon}
												<span className="not-lg:hidden">{ROUNDED_VALUES[value].label}</span>
											</TabsTrigger>
										))}
									</TabsList>
								</Tabs>
							</PopoverContent>
						</Popover>

						<div className="not-md:hidden flex items-center gap-3">
							<Select value={color} onValueChange={(value) => setColor(value as COLOR_VALUES_TYPE)}>
								<SelectTrigger size="36" className="text-fg-secondary w-32 font-medium">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{(Object.keys(COLOR_VALUES) as COLOR_VALUES_TYPE[]).map((color) => (
										<SelectItem value={color} key={color}>
											{COLOR_VALUES[color].label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<Select value={selectedFont} onValueChange={(value) => setSelectedFont(value)}>
								<SelectTrigger size="36" className="text-fg-secondary w-49 font-medium">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{Object.keys(FONTS).map((fontName) => (
										<SelectItem key={fontName} value={fontName}>
											{fontName}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<Tabs value={rounded} onValueChange={(value) => setRounded(value as ROUNDED_VALUES_TYPE)}>
								<TabsList>
									{(Object.keys(ROUNDED_VALUES) as ROUNDED_VALUES_TYPE[]).map((value) => (
										<TabsTrigger key={value} value={value}>
											{ROUNDED_VALUES[value].icon}
											<span className="not-lg:hidden">{ROUNDED_VALUES[value].label}</span>
										</TabsTrigger>
									))}
								</TabsList>
							</Tabs>
						</div>
					</div>
					{/* Mobile/Tablet View */}
					<div className={`h-190 flex flex-1 lg:hidden color-${color}`}>
						<TabsContent value="preview" className={`${FONTS[selectedFont]}`}>
							<PlaygroundSignin rounded={rounded} />
						</TabsContent>
						<TabsContent value="code" className="h-190 overflow-scroll p-2">
							<Tabs className="h-full gap-0" value={activeFile} onValueChange={(value) => setActiveFile(value as typeof activeFile)}>
								<TabsList variant="outline-ghost">
									<TabsTrigger value="signin.tsx">signin.tsx</TabsTrigger>
									<TabsTrigger value="globals.css">globals.css</TabsTrigger>
								</TabsList>
								<TabsContent value="signin.tsx">
									<CodeArea code={CODE} language="tsx" className="h-full" lineNumbers theme={theme === "dark" ? "github-dark-high-contrast" : "github-light"} />
								</TabsContent>
								<TabsContent value="globals.css" className="h-full">
									<CodeArea
										code={getGlobalsFileCode(color)}
										language="css"
										className="h-full w-full overflow-scroll"
										lineNumbers
										theme={theme === "dark" ? "github-dark-high-contrast" : "github-light"}
									/>
								</TabsContent>
							</Tabs>
						</TabsContent>
					</div>
					{/* Desktop View */}
					<div className="not-lg:hidden h-200 flex flex-1">
						<div className="border-soft h-200 flex-1 overflow-scroll border-r">
							<div className="p-2">
								<Tabs className="gap-0" value={activeFile} onValueChange={(value) => setActiveFile(value as typeof activeFile)}>
									<TabsList variant="outline-ghost">
										<TabsTrigger value="signin.tsx">signin.tsx</TabsTrigger>
										<TabsTrigger value="globals.css">globals.css</TabsTrigger>
									</TabsList>
									<TabsContent value="signin.tsx">
										<CodeArea code={CODE} language="tsx" className="h-full" lineNumbers theme={theme === "dark" ? "github-dark-high-contrast" : "github-light"} />
									</TabsContent>
									<TabsContent value="globals.css">
										<CodeArea
											code={getGlobalsFileCode(color)}
											language="css"
											className="h-full w-full overflow-scroll"
											lineNumbers
											theme={theme === "dark" ? "github-dark-high-contrast" : "github-light"}
										/>
									</TabsContent>
								</Tabs>
							</div>
						</div>
						<div className={`w-[480px] color-${color} ${FONTS[selectedFont]}`}>
							<PlaygroundSignin rounded={rounded} />
						</div>
					</div>
				</Tabs>
			</div>
		</div>
	)
}
