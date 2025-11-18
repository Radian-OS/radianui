"use client"

import { useEffect, useState } from "react"
import { CircleDashed, CircleDotDashed, FileCode, ListTodo, Lock, Moon, Square, SquareDashed, Squircle, SwatchBook, Type } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { dmSans, figtree, geist, ibmPlexSans, lato, manrope, openSans, raleway, roboto, rubik, workSans } from "@/lib/fetch-fonts"
import { BorderBeam } from "@/registry/animated/border-beam"
import { Badge } from "@/registry/ui/badge"
import { CodeArea } from "@/registry/ui/code-area"
// import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"
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

export const COLOR_VALUES = {
	red: {
		label: "Red",
		icon: <Squircle size={16} className="fill-error stroke-error" />,
	},
	orange: {
		label: "Orange",
		icon: <Squircle size={16} className="color-orange fill-primary stroke-primary" />,
	},
	amber: {
		label: "Amber",
		icon: <Squircle size={16} className="color-amber fill-primary stroke-primary" />,
	},
	yellow: {
		label: "Yellow",
		icon: <Squircle size={16} className="fill-warning stroke-warning" />,
	},
	neon: {
		label: "Neon",
		icon: <Squircle size={16} className="color-neon fill-primary stroke-primary" />,
	},
	green: {
		label: "Green",
		icon: <Squircle size={16} className="color-green fill-primary stroke-primary" />,
	},
	emerald: {
		label: "Emerald",
		icon: <Squircle size={16} className="color-emerald fill-primary stroke-primary" />,
	},
	teal: {
		label: "Teal",
		icon: <Squircle size={16} className="color-teal fill-primary stroke-primary" />,
	},
	cyan: {
		label: "Cyan",
		icon: <Squircle size={16} className="color-cyan fill-primary stroke-primary" />,
	},
	"light-blue": {
		label: "Light Blue",
		icon: <Squircle size={16} className="color-light-blue fill-primary stroke-primary" />,
	},
	blue: {
		label: "Blue",
		icon: <Squircle size={16} className="fill-info stroke-info" />,
	},
	"violet-blue": {
		label: "Violet Blue",
		icon: <Squircle size={16} className="color-violet-blue fill-primary stroke-primary" />,
	},
	purple: {
		label: "Purple",
		icon: <Squircle size={16} className="color-purple fill-primary stroke-primary" />,
	},
	"dark-orchid": {
		label: "Dark Orchid",
		icon: <Squircle size={16} className="color-dark-orchid fill-primary stroke-primary" />,
	},
	fuchsia: {
		label: "Fuchsia",
		icon: <Squircle size={16} className="color-fuchsia fill-primary stroke-primary" />,
	},
	magenta: {
		label: "Magenta",
		icon: <Squircle size={16} className="color-magenta fill-primary stroke-primary" />,
	},
	rose: {
		label: "Rose",
		icon: <Squircle size={16} className="color-rose fill-primary stroke-primary" />,
	},
}

export const ROUNDED_VALUES = {
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
			colorValues = `--color-primary: oklch(0.64 0.22 26.04);
	--color-primary-accent: oklch(0.9465 0.0252 17.61);
	--color-primary-focus: oklch(0.9133 0.0414 17.93);
	--color-primary-border: oklch(0.719 0.1751 22.5);
	--color-primary-hover: oklch(0.6786 0.2095 24.66);
	--color-primary-text: oklch(0.5716 0.2125 27.27);`
			break
		}

		case "blue": {
			colorValues = `--color-primary: oklch(0.5345 0.223 272.15);
	--color-primary-accent: oklch(0.9413 0.0229 283.26);
	--color-primary-focus: oklch(0.9093 0.0355 280.44);
	--color-primary-border: oklch(0.6082 0.1993 274.96);
	--color-primary-hover: oklch(0.6082 0.1993 274.96);
	--color-primary-text: oklch(0.6082 0.1993 274.96);`
			break
		}

		case "green": {
			colorValues = `--color-primary: oklch(0.6523 0.2156 142.6);
	--color-primary-accent: oklch(0.9662 0.0421 145.24);
	--color-primary-focus: oklch(0.9454 0.0691 145);
	--color-primary-border: oklch(0.8006 0.2661 142.58);
	--color-primary-hover: oklch(0.7118 0.2291 142.69);
	--color-primary-text: oklch(0.5552 0.1767 142.73);`
			break
		}

		case "yellow": {
			colorValues = `--color-primary: oklch(0.8 0.1625 94.77);
	--color-primary-accent: oklch(0.9596 0.0763 97.95);
	--color-primary-focus: oklch(0.9333 0.1239 97.87);
	--color-primary-border: oklch(0.8 0.1625 94.77);
	--color-primary-hover: oklch(0.8809 0.1806 94.02);
	--color-primary-text: oklch(0.5465 0.1045 96.86);`
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
	--color-primary-border: oklch(0.7761 0.2117 148.55);
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
		case "amber": {
			colorValues = `--color-primary: oklch(0.8016 0.1705 73.27);
	--color-primary-accent: oklch(0.9622 0.0384 83.83);
	--color-primary-focus: oklch(0.946 0.0574 85.03);
	--color-primary-border: oklch(0.8016 0.1705 73.27)
	--color-primary-hover: oklch(0.8342 0.1594 79.51);
	--color-primary-text: oklch(0.5461 0.1088 77.73);
			`
			break
		}
		case "fuchsia": {
			colorValues = `--color-primary: oklch(0.6901 0.2628 327.97);
	--color-primary-accent: oklch(0.9505 0.0442 325.92);
	--color-primary-focus: oklch(0.923 0.0701 326.13);
	--color-primary-border: oklch(0.7768 0.2026 327.31);
	--color-primary-hover: oklch(0.7228 0.2325 327.65);
	--color-primary-text: oklch(0.5839 0.2494 328.2);
			`
			break
		}
		case "dark-orchid": {
			colorValues = `--color-primary: oklch(0.623 0.2799 310.69);
	--color-primary-accent: oklch(0.9431 0.039 314.14);
	--color-primary-focus: oklch(0.9219 0.054454 314.5407);
	--color-primary-border: oklch(0.7475 0.1859 313.32);
	--color-primary-hover: oklch(0.6625 0.2518 311.98);
	--color-primary-text: oklch(0.5468 0.2503 310.33);
			`
			break
		}
		case "light-blue": {
			colorValues = `--color-primary: oklch(0.6092 0.2041 255.8);
	--color-primary-accent: oklch(0.949 0.0213 245.85);
	--color-primary-focus: oklch(0.9135 0.0358 249.52);
	--color-primary-border: oklch(0.829 0.0811 248.83);
	--color-primary-hover: oklch(0.6722 0.1615 251.56);
	--color-primary-text: oklch(0.6092 0.2041 255.8)";
			`
			break
		}
		case "magenta": {
			colorValues = `--color-primary: oklch(0.6175 0.2503 347.29);
	--color-primary-accent: oklch(0.951 0.0283 336.42);
	--color-primary-focus: oklch(0.9221 0.0463 338.25);
	--color-primary-border: oklch(0.7455 0.1847 341.92);
	--color-primary-hover: oklch(0.6725 0.2452 344.84);
	--color-primary-text: oklch(0.5565 0.2156 345.71);
			`
			break
		}
		case "neon": {
			colorValues = `--color-primary: oklch(0.7153 0.1873 128.9);
	--color-primary-accent: oklch(0.9792 0.0554 122.76);
	--color-primary-focus: oklch(0.9656 0.0946 123.33);
	--color-primary-border: oklch(0.825 0.2175 129.2);
	--color-primary-hover: oklch(0.825 0.2175 129.2);
	--color-primary-text: oklch(0.5815 0.147 127.99);
			`
			break
		}
		case "orange": {
			colorValues = `--color-primary: oklch(0.6211 0.1686 43.12);
	--color-primary-accent: oklch(0.9602 0.0221 49.93);
	--color-primary-focus: oklch(0.9372 0.035253 49.2368);
	--color-primary-border: oklch(0.6842 0.185 43.27);
	--color-primary-hover: oklch(0.6842 0.185 43.27);
	--color-primary-text: oklch(0.5381 0.1375 43.87);
			`
			break
		}
		case "rose": {
			colorValues = `--color-primary: oklch(0.6515 0.221 6.33);
	--color-primary-accent: oklch(0.9489 0.0236 354.28);
	--color-primary-focus: oklch(0.9188 0.0392 355.78);
	--color-primary-border: oklch(0.7471 0.1505 0.03);
	--color-primary-hover: oklch(0.6861 0.1948 3.2);
	--color-primary-text: oklch(0.546 0.1982 8.02);
			`
			break
		}
		case "violet-blue": {
			colorValues = `--color-primary: oklch(0.528 0.2539 282.58);
	--color-primary-accent: oklch(0.94 0.0271 295.05);
	--color-primary-focus: oklch(0.9169 0.0383 295.46);
	--color-primary-border: oklch(0.6784 0.1708 290.38);
	--color-primary-hover: oklch(0.5768 0.2279 286.25);
	--color-primary-text: oklch(0.528 0.2539 282.58);
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
	const [color] = useState<COLOR_VALUES_TYPE>("violet-blue")
	const [rounded] = useState<ROUNDED_VALUES_TYPE>("default")
	const [activeFile, setActiveFile] = useState<"signin.tsx" | "globals.css">("signin.tsx")
	const [selectedFont] = useState<keyof typeof FONTS>("Inter Display and Inter")

	// 	const [color, setColor] = useState<COLOR_VALUES_TYPE>("violet-blue")
	// const [rounded, setRounded] = useState<ROUNDED_VALUES_TYPE>("default")
	// const [activeFile, setActiveFile] = useState<"signin.tsx" | "globals.css">("signin.tsx")
	// const [selectedFont, setSelectedFont] = useState<keyof typeof FONTS>("Inter Display and Inter")

	const CODE = `
export default function Signin() {
	return (
	<div className="flex flex-col gap-4">
		{/* ... */}

		<div className="flex flex-col gap-1.5">
			<Label htmlFor="email">Email</Label>
			<Input size="36" id="email" className="${radiusMap[rounded]}" />
		</div>

		<div className="flex flex-col gap-1.5">
			<Label htmlFor="password">Password</Label>
			<Input size="36" type="password" id="password" className="${radiusMap[rounded]}" />
		</div>

		<div className="flex items-center gap-2">
			<Checkbox id="remember-me" className="${radiusMap[rounded]}" />
			<Label htmlFor="remember-me">Remember me</Label>
		</div>

		{/* ... */}

		<Button size="36" className="w-full ${radiusMap[rounded]}">
			Log In
		</Button>

		{/* ... */}
	</div>
	)
}
`

	useEffect(() => {
		setActiveFile("globals.css")
	}, [color])

	useEffect(() => {
		setActiveFile("signin.tsx")
	}, [rounded])

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
						<Lock size={16} />
						<span className="text-sm">radianos.com</span>
					</div>
					<div className="text-fg-tertiary flex items-center gap-3 px-3">
						{/* <Share size={16} />
						<Plus size={16} />
						<Copy size={16} /> */}
					</div>
				</div>
				<Tabs defaultValue="preview" className="border-soft bg-bg flex h-full w-full flex-col gap-0 rounded-xl border">
					{/* <div className="border-soft flex items-center justify-between border-b p-3">
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
								<SelectTrigger size="36" className="text-fg-secondary w-38 font-medium">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{(Object.keys(COLOR_VALUES) as COLOR_VALUES_TYPE[]).map((color) => (
										<SelectItem value={color} key={color}>
											<div className="flex items-center gap-1.5">
												{COLOR_VALUES[color].icon}
												{COLOR_VALUES[color].label}
											</div>
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


						</div>
					</div> */}
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
					<div className="not-lg:hidden h-205 flex flex-1">
						<div className="border-soft h-205 flex-1 border-r">
							<Tabs className="h-full gap-0" value={activeFile} onValueChange={(value) => setActiveFile(value as typeof activeFile)}>
								<div className="border-border flex h-10 items-center justify-between border-b pl-4">
									<div className="flex items-center gap-2">
										<FileCode size={20} className="text-fg-tertiary" />
										<p className="text-fg-secondary text-sm font-normal">app/signin/signin.tsx</p>
									</div>
									<TabsList variant="outline" className="h-full rounded-none border-none">
										<TabsTrigger value="signin.tsx">signin.tsx</TabsTrigger>
										<TabsTrigger value="globals.css">globals.css</TabsTrigger>
									</TabsList>
								</div>
								<div className="flex-1 overflow-auto">
									<TabsContent value="signin.tsx">
										<CodeArea code={CODE} language="tsx" className="h-full p-0" lineNumbers theme={theme === "dark" ? "github-dark-high-contrast" : "github-light"} />
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
								</div>
							</Tabs>
						</div>
						<div className={`relative flex-1 color-${color} ${FONTS[selectedFont]}`}>
							<div className="bg-bg absolute right-4 top-4 flex h-12 items-center rounded-xl p-1">
								<div className="border-border flex h-10 items-center gap-1 rounded-lg border p-1">
									<div className="border-border flex h-8 items-center border-r">
										<p className="hover:bg-fill2 mr-1 flex h-8 cursor-pointer items-center rounded-md px-2 text-sm font-medium">Layout</p>
									</div>
									<div className="text-fg-secondary flex">
										<div className="hover:bg-fill2 flex size-8 cursor-pointer items-center justify-center rounded-md">
											<CircleDashed size={18} />
										</div>
										<div className="hover:bg-fill2 flex size-8 cursor-pointer items-center justify-center rounded-md">
											<Type size={18} />
										</div>
										<div className="hover:bg-fill2 flex size-8 cursor-pointer items-center justify-center rounded-md">
											<ListTodo size={18} />
										</div>
										<div className="hover:bg-fill2 flex size-8 cursor-pointer items-center justify-center rounded-md">
											<Image alt="" height={18} width={18} src="/mstile-70x70.png" />
										</div>
									</div>
									<div className="border-border flex h-8 items-center border-l px-2">
										<div className="text-fg-secondary flex">
											<div className="hover:bg-fill2 flex size-8 cursor-pointer items-center justify-center rounded-md">
												<Moon size={18} />
											</div>
											<div className="hover:bg-fill2 flex size-8 cursor-pointer items-center justify-center rounded-md">
												<div className="size-4.5 bg-primary border-border rounded-full border"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* <Tabs className="absolute right-4 top-4" value={rounded} onValueChange={(value) => setRounded(value as ROUNDED_VALUES_TYPE)}>
								<TabsList>
									{(Object.keys(ROUNDED_VALUES) as ROUNDED_VALUES_TYPE[]).map((value) => (
										<TabsTrigger key={value} value={value}>
											{ROUNDED_VALUES[value].icon}
											<span className="not-lg:hidden">{ROUNDED_VALUES[value].label}</span>
										</TabsTrigger>
									))}
								</TabsList>
							</Tabs> */}
							<PlaygroundSignin rounded={rounded} />
						</div>
					</div>
				</Tabs>
			</div>
		</div>
	)
}
