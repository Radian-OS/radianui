"use client"

import {
	AppWindow,
	ArrowDownRight,
	ArrowUpRight,
	Calendar as CalendarIcon,
	ChartLine,
	CircleGauge,
	CircleUser,
	ClipboardCheck,
	Component,
	FolderGit,
	LayoutDashboard,
	Loader,
	MousePointerClick,
	PanelRight,
	ScanEye,
	Siren,
	SlidersHorizontal,
	SquareArrowDown,
	SquareCheck,
	SquareCode,
	SwatchBook,
	Table as TableIcon,
	Tag,
	Terminal,
	TextCursorInput,
	ToggleLeft,
} from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Calendar } from "@/registry/ui/calendar"
import { CodeArea } from "@/registry/ui/code-area"
import { Skeleton } from "@/registry/ui/skeleton"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/registry/ui/table"
import { FlickeringGrid } from "../effects/flickering"

const datas = [
	{
		company: "PLTR",
		currency: "USD",
		FY1_growth: 7.54,
		daily_earning: 250.5,
		EBITDA: "1.5B",
		performance: "+35.14%",
	},
	{
		company: "AMZN",
		currency: "YEN",
		FY1_growth: -4.11,
		daily_earning: 95.0,
		EBITDA: "-285.45M",
		performance: "-14.14%",
	},
	{
		company: "UBER",
		currency: "JR",
		FY1_growth: -14.41,
		daily_earning: 275.25,
		EBITDA: "-120M",
		performance: "-2.14%",
	},
	{
		company: "NFLX",
		currency: "GE",
		FY1_growth: 0.73,
		daily_earning: 120.0,
		EBITDA: "215M",
		performance: "+9.8%",
	},
	{
		company: "GOOGL",
		currency: "CHF",
		FY1_growth: 28.6,
		daily_earning: 400.0,
		EBITDA: "-120M",
		performance: "+75.4%",
	},
]

export default function FeaturesSection() {
	const { resolvedTheme } = useTheme()
	return (
		<div className="flex flex-col items-center gap-20 pt-40">
			<div className="flex flex-col items-center gap-8">
				<div className="relative">
					<Badge className="relative z-10" variant="soft" color="neutral" size="28">
						<Component className="text-primary" /> Rapid Development
					</Badge>

					<svg
						className="not-md:hidden absolute bottom-1/2 left-1/2 -translate-x-1/2"
						width="1095"
						height="350"
						viewBox="0 0 1095 350"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0.433594 1.2504L70.1484 122C73.1494 127.198 78.6956 130.4 84.6976 130.4L177.71 130.4C184.379 130.4 190.417 134.346 193.095 140.454L280.203 339.097C282.882 345.205 288.886 349.15 295.555 349.15C444.741 349.15 649.277 349.15 798.467 349.15C805.147 349.15 811.159 345.193 813.831 339.071L900.956 139.479C903.629 133.358 909.674 129.4 916.353 129.4L1009.35 129.4C1015.35 129.4 1020.89 126.198 1023.89 121L1093.61 0.250397"
							strokeWidth="1"
							stroke="var(--color-soft)"
						/>
					</svg>

					{/* Left side line */}
					<svg className="-left-180 -top-122 absolute" width="698" height="798" viewBox="0 0 698 798" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M245 609.5H205C191.745 609.5 181 598.755 181 585.5V475.441C181 469.076 178.471 462.971 173.971 458.471L8.52944 293.029C4.02856 288.529 1.5 282.424 1.5 276.059V0"
							stroke="url(#paint0_linear_1_26452)"
						/>
						<rect x="125.5" y="410" width="5" height="5" rx="2.5" fill="var(--color-soft)" />
						<rect x="127" y="411.5" width="2" height="2" rx="1" fill="var(--color-soft)" />
						<path d="M495 463L464.065 494.749C459.548 499.385 453.349 502 446.876 502H285C271.745 502 261 512.745 261 526V798" stroke="url(#paint1_linear_1_26452)" />
						<path d="M261 606V526C261 512.745 271.745 502 285 502H417" stroke="url(#paint2_linear_1_26452)" />
						<defs>
							<linearGradient id="paint0_linear_1_26452" x1="197" y1="-158" x2="196.66" y2="689.5" gradientUnits="userSpaceOnUse">
								<stop stopColor="var(--color-soft)" stopOpacity="0" />
								<stop offset="0.9" stopColor="var(--color-soft)" />
							</linearGradient>
							<linearGradient id="paint1_linear_1_26452" x1="277.326" y1="798" x2="474.726" y2="432.852" gradientUnits="userSpaceOnUse">
								<stop stopColor="var(--color-soft)" stopOpacity="0" />
								<stop offset="0.15" stopColor="var(--color-soft)" />
								<stop offset="0.85" stopColor="var(--color-soft)" />
								<stop offset="1" stopColor="var(--color-soft)" stopOpacity="0" />
							</linearGradient>
							<linearGradient id="paint2_linear_1_26452" x1="243.437" y1="627.677" x2="431.51" y2="475.893" gradientUnits="userSpaceOnUse">
								<stop offset="1" stopColor="var(--color-soft)" stopOpacity="0" />
							</linearGradient>
						</defs>
					</svg>

					{/* Right side line */}
					<svg className="-right-180 -top-122 absolute scale-x-[-1]" width="698" height="798" viewBox="0 0 698 798" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M245 609.5H205C191.745 609.5 181 598.755 181 585.5V475.441C181 469.076 178.471 462.971 173.971 458.471L8.52944 293.029C4.02856 288.529 1.5 282.424 1.5 276.059V0"
							stroke="url(#paint0_linear_1_26452)"
						/>
						<rect x="125.5" y="410" width="5" height="5" rx="2.5" fill="var(--color-soft)" />
						<rect x="127" y="411.5" width="2" height="2" rx="1" fill="var(--color-soft)" />
						<path d="M495 463L464.065 494.749C459.548 499.385 453.349 502 446.876 502H285C271.745 502 261 512.745 261 526V798" stroke="url(#paint1_linear_1_26452)" />
						<path d="M261 606V526C261 512.745 271.745 502 285 502H417" stroke="url(#paint2_linear_1_26452)" />
					</svg>
				</div>
				<div className="flex w-full max-w-[730px] flex-col gap-6 text-center">
					<h2 className="heading-2 text-center">
						<span className="from-fg to-fg-secondary bg-gradient-to-b bg-clip-text text-transparent">A design system built for speed,</span>
						<br />
						<span className="bg-gradient-to-r from-[#7655F6] to-[#492EB8] bg-clip-text text-transparent">scale and simplicity.</span>
					</h2>
					<p className="text-fg-secondary text-base font-normal">
						Get from design file to production-ready web application. Radian gives you everything you need to design and build faster.
					</p>
				</div>
			</div>

			<div className="border-border w-full max-w-[1440px] rounded-xl border">
				<div className="border-border flex h-[584px] border-b">
					<div className="flex-1/3 border-border relative flex flex-col gap-12 border-r">
						<div className="flex flex-col gap-4 px-16 pt-16">
							<Terminal className="bg-primary-focus stroke-primary border-primary rounded-xs cursor-pointer border-2" />
							<h6 className="heading-6">Copy-paste or install via command line</h6>
							<p className="text-fg-secondary">Install with one command or copy the snippet. No configuration. No waiting. Just build.</p>
						</div>

						<div className="pl-[42.5px] pr-[93.5px]">
							<div className="max-w-107.5 flex max-h-16 rounded-2xl border p-2">
								<CodeArea
									language="shell"
									theme={resolvedTheme === "light" ? "github-light-high-contrast" : "github-dark-default"}
									code={`npx radianui@latest add [component]`}
									className="h-12 w-full border"
								/>
							</div>
						</div>
						<svg className="bottom-6.5 absolute left-[20.75%] z-10" width={100} height={254} viewBox="0 0 80 203" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M3.5 7V150.5C3.5 163.755 14.2452 174.5 27.5 174.5H56.5" stroke="url(#paint0_linear_851_12638)" strokeDasharray="2 2" />
							<path d="M73 200H69C62.3726 200 58 194.627 57 188V170" className="stroke-fg-disabled" />
							<path d="M73 150H69C62.3726 150 57 155.373 57 162V180" className="stroke-fg-disabled" />
							<circle cx={76} cy={149.5} r={3} fill={resolvedTheme === "light" ? "#ffffff" : "#090a0b"} className="stroke-fg-disabled" />
							<circle cx={76} cy={174.5} r={3} fill={resolvedTheme === "light" ? "#ffffff" : "#090a0b"} className="stroke-fg-disabled" />
							<circle cx={76} cy={199.5} r={3} fill={resolvedTheme === "light" ? "#ffffff" : "#090a0b"} className="stroke-fg-disabled" />
							<path d="M57.5 174.5H73" className="stroke-fg-disabled" />
							<circle cx={3.5} cy={3.5} r={3} fill={resolvedTheme === "light" ? "#ffffff" : "#090a0b"} className="stroke-fg-disabled" />
							<defs>
								<linearGradient id="paint0_linear_851_12638" x1={-28} y1={26} x2={86} y2={186.5} gradientUnits="userSpaceOnUse">
									<stop stopColor={resolvedTheme === "light" ? "#C8C8D0" : "#545463"} />
									<stop offset={0.466346} stopColor={resolvedTheme === "light" ? "#C8C8D0" : "#545463"} />
									<stop offset={0.87} stopColor={resolvedTheme === "light" ? "#623DF5" : "#7655F6"} />
									<stop offset={0.88} stopColor={resolvedTheme === "light" ? "#C8C8D0" : "#545463"} />
								</linearGradient>
							</defs>
						</svg>
						<div className="absolute bottom-0 right-0">
							<div className="bg-fill1 max-h-[200px] max-w-[300px] overflow-hidden rounded-xl rounded-b-none rounded-r-none border border-b-0 border-r-0">
								<div className="text-fg-tertiary flex items-center justify-between px-4 py-3 text-xs">
									<div className="gap-1.25 inline-flex items-center">
										<Skeleton className="bg-fg-disabled size-2 rounded-full" />
										<Skeleton className="bg-fg-disabled size-2 rounded-full" />
										<Skeleton className="bg-fg-disabled size-2 rounded-full" />
									</div>
									<div className="self-center">radianos.js</div>
									<div></div>
								</div>
								<CodeArea
									language="tsx"
									theme={resolvedTheme === "light" ? "github-light-high-contrast" : "github-dark-high-contrast"}
									code={`import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function Page() {
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
							<BorderBeam size={50} />`}
								/>
							</div>
						</div>
					</div>
					<div className="flex-2/3 pr-15 relative flex flex-col gap-14 pl-16 pt-16">
						<div className="flex flex-col gap-4">
							<ScanEye className="text-primary" size={28} />
							<h6 className="heading-6">Accessible Components</h6>
							<p className="text-fg-secondary max-w-116 w-full">From keyboard navigation to structural semantics, everything follows modern accessibility standards.</p>
						</div>

						<div className="flex flex-col overflow-hidden">
							<FlickeringGrid
								shape="square"
								className="inset-0 z-10 max-h-[48px] max-w-[188.8px] self-end"
								squareSize={3.2}
								gridGap={3}
								color={resolvedTheme === "light" ? "#E5DFFB" : "#211452"}
								maxOpacity={0.4}
								flickerChance={0.1}
							/>
							<div className="overflow-hidden rounded-lg rounded-b-none border border-b-0">
								<Table>
									<TableCaption>A list of user details.</TableCaption>
									<TableHeader>
										<TableRow>
											<TableHead>Company</TableHead>
											<TableHead>CCY</TableHead>
											<TableHead>FY1 growth</TableHead>
											<TableHead>Daily Earning</TableHead>
											<TableHead>EBITDA</TableHead>
											<TableHead>Performance</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{datas.map((data) => (
											<TableRow key={data.company}>
												<TableCell className="flex items-center">{data.company}</TableCell>
												<TableCell>
													<Badge size="20" color="neutral">
														{data.currency}
													</Badge>
												</TableCell>
												<TableCell className={cn("flex", data.FY1_growth > 0 ? "text-success-text" : "text-error-text")}>
													{data.FY1_growth > 0 ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
													{data.FY1_growth}%
												</TableCell>
												<TableCell className="text-fg-secondary">${data.daily_earning}</TableCell>
												<TableCell className="text-fg-secondary">{data.EBITDA}</TableCell>
												<TableCell>
													<Badge color="success" variant="outline">
														{data.performance}
													</Badge>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</div>
					</div>
				</div>

				<div className="border-border flex h-[568px] border-b">
					<div className="flex-1/3 pb-23.25 relative flex flex-col justify-between pl-16 pt-16">
						<div className="flex flex-col gap-4">
							<ClipboardCheck size={28} className="text-primary" />
							<h6 className="heading-6">Clean, Modular Components</h6>
							<p className="text-fg-secondary">Radian’s building blocks are composable, easy to override, and perfect for scaling projects.</p>
						</div>
						<div className="flex flex-wrap items-center gap-3">
							<Badge size="28" variant="outline" color="neutral">
								<SquareArrowDown />
								Accordion
							</Badge>
							<Badge size="28" variant="outline" color="neutral">
								<PanelRight />
								Drawers
							</Badge>
							<Badge size="28" variant="outline" color="neutral">
								<Tag />
								Drawers
							</Badge>
							<Badge size="28" variant="outline" color="neutral">
								<MousePointerClick />
								Button
							</Badge>
							<Badge size="28" variant="outline" color="neutral">
								<Siren />
								Alert
							</Badge>
							<Badge size="28" variant="outline" color="neutral">
								<CircleUser />
								Avatar
							</Badge>
							<Badge size="28">
								<CalendarIcon />
								Calendar
							</Badge>

							<Badge size="28" variant="outline" color="neutral">
								<SlidersHorizontal />
								Slider
							</Badge>
							<Badge size="28" variant="outline" color="neutral">
								<SquareCheck />
								Checkbox
							</Badge>
							<Badge size="28" variant="outline" color="neutral">
								<AppWindow />
								Dialogs
							</Badge>
							<Badge size="28" variant="outline" color="neutral">
								<Loader />
								Loader
							</Badge>
							<Badge size="28" variant="outline" color="neutral">
								<SquareCode />
								Code
							</Badge>
							<Badge size="28" variant="outline" color="neutral">
								<TableIcon />
								Table
							</Badge>
							<Badge size="28" variant="outline" color="neutral">
								<ChartLine />
								Chart
							</Badge>
							<Badge size="28" variant="outline" color="neutral">
								<ToggleLeft />
								Switch
							</Badge>
							<Badge size="28" variant="outline" color="neutral">
								<TextCursorInput />
								Input Feilds
							</Badge>
							<Badge size="28" variant="outline" color="neutral">
								<Component />
								Toaster
							</Badge>
							<Badge size="28" variant="outline" color="neutral">
								<Component />
								Banner
							</Badge>
						</div>
					</div>
					<div className="flex-2/3 flex flex-col items-center justify-center gap-4 pl-16 pt-16">
						<div className="border-alpha bg-elevation-level1 rounded-xl border">
							<Calendar className="border-0 bg-transparent pb-2" mode="range" numberOfMonths={2} showOutsideDays={false} />
							<div className="border-border flex justify-end gap-2 border-t px-2 py-3">
								<Button variant="outline" color="neutral">
									Cancel
								</Button>
								<Button>Apply</Button>
							</div>
						</div>
					</div>
				</div>
				<div className="border-border flex h-[584px] border-b">
					<div className="flex-2/3 border-border gap-22 flex flex-col overflow-hidden border-r">
						<div className="flex flex-col gap-4 pl-16 pt-16">
							<LayoutDashboard className="text-primary" size={28} />
							<h6 className="heading-6">Reusable UI Blocks</h6>
							<p className="text-fg-secondary max-w-116 w-full">From keyboard navigation to structural semantics, everything follows modern accessibility standards.</p>
						</div>
						<div className="gap-18 relative flex items-center justify-center">
							<div className="max-h-54.25 max-w-50 gap-2.75 flex flex-col">
								<div className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm">
									<Badge className="rounded-lg">
										<Component />
									</Badge>
									Blogs Section /03
								</div>
								<div className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm">
									<Badge className="rounded-lg">
										<Component />
									</Badge>
									Blogs Section /03
								</div>
								<div className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm">
									<Badge className="rounded-lg">
										<Component />
									</Badge>
									Blogs Section /03
								</div>
								<div className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm">
									<Badge className="rounded-lg">
										<Component />
									</Badge>
									Blogs Section /03
								</div>
							</div>

							<div className="max-w-100 size-full max-h-[384px] rounded-xl border">
								<div className="flex items-center justify-center gap-2 border border-b border-l-0 border-r-0 border-t-0 px-6 pb-4">
									<Skeleton className="w-43 h-23 bg-fill4-alpha rounded-lg rounded-t-none" />
									<Skeleton className="w-43 h-23 bg-fill4-alpha rounded-lg rounded-t-none" />
								</div>
								<div className="p-6">
									<div className="flex flex-col gap-1.5">
										<div className="bg-primary-hover h-0.5 w-4 rounded-lg" />
										<p className="text-fg-secondary text-sm font-semibold">Blogs Section #03</p>
										<Skeleton className="h-0.75 bg-fg-disabled w-32 rounded-lg" />
										<Skeleton className="h-0.75 w-23.25 bg-fg-disabled rounded-lg" />
									</div>
									<div className="flex gap-2.5 pt-4">
										<div className="flex flex-col gap-2">
											<Skeleton className="w-43 h-23 bg-fill4-alpha rounded-lg" />
										</div>
										<div className="flex flex-col gap-2">
											<Skeleton className="w-43 h-23 bg-fill4-alpha rounded-lg" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex-1/3 relative flex flex-col gap-12 overflow-hidden">
						<div className="pr-15.75 relative flex flex-col gap-4 pl-16 pt-16">
							<CircleGauge className="text-primary" size={28} />
							<h6 className="heading-6">Performance First Design</h6>
							<p className="text-fg-secondary">Built with lightweight code and minimal DOM to deliver fast-loading, snappy experiences.</p>
						</div>
						<div className="gap-18 relative flex h-full items-center">
							<div className="size-full max-h-[507px] max-w-[398px] overflow-hidden rounded-xl rounded-b-none rounded-l-none border border-b-0 border-l-0">
								<div className="text-fg-tertiary bg-fill1 flex items-center justify-between rounded-xl rounded-b-none rounded-l-none border border-l-0 border-r-0 border-t-0 px-4 py-3 text-xs">
									<div className="gap-1.25 inline-flex items-center">
										<Skeleton className="bg-fg-disabled size-2 rounded-full" />
										<Skeleton className="bg-fg-disabled size-2 rounded-full" />
										<Skeleton className="bg-fg-disabled size-2 rounded-full" />
									</div>
									<div className="self-center">radianos.js</div>
									<div></div>
								</div>
								<CodeArea
									language="tsx"
									theme={resolvedTheme === "light" ? "github-light-high-contrast" : "github-dark-high-contrast"}
									code={`import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function Page() {
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
							<BorderBeam size={50} />`}
								/>
							</div>
							<div className="rounded-l-0 size-full max-h-[507px] max-w-[398px] translate-y-[100px] rounded-xl rounded-b-none rounded-r-none border border-b-0 border-r-0">
								<div className="text-fg-tertiary bg-fill1 flex items-center justify-between rounded-xl rounded-b-none rounded-r-none border border-l-0 border-r-0 border-t-0 px-4 py-3 text-xs">
									<div className="gap-1.25 inline-flex items-center">
										<Skeleton className="bg-fg-disabled size-2 rounded-full" />
										<Skeleton className="bg-fg-disabled size-2 rounded-full" />
										<Skeleton className="bg-fg-disabled size-2 rounded-full" />
									</div>
									<div className="self-center">radianos.js</div>
								</div>
								<div className="bg-linear-to-b from-bg to-fill1 flex h-full w-full flex-col gap-1.5 pl-16 pt-16">
									<div className="w-5.75 h-0.75 bg-primary rounded-lg" />
									<h5 className="heading-6 text-fg-secondary max-w-[179px]">Enhance your productivity.</h5>
									<Skeleton className="h-0.75 w-32 rounded-lg" />
									<Skeleton className="h-0.75 w-23.25 rounded-lg" />
								</div>
							</div>
							<svg className="right-7.5 absolute top-0" width={250} height={140} viewBox="0 0 198 57" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M194.5 57L194.5 46.5C194.5 28.8269 180.173 14.5 162.5 14.5L3 14.5" className="stroke-fg-disabled" strokeDasharray="6 4" />
								<g filter="url(#filter0_d_851_5324)">
									<rect x={84} width={28} height={28} rx={8} fill={resolvedTheme === "light" ? "#ffffff" : "#090a0b"} shapeRendering="crispEdges" />
									<rect x={84.5} y={0.5} width={27} height={27} rx={7.5} className="stroke-fg-disabled" shapeRendering="crispEdges" />
									<path
										d="M92.6663 15.3333C92.5401 15.3337 92.4164 15.2983 92.3096 15.2313C92.2027 15.1642 92.1171 15.0682 92.0626 14.9544C92.0082 14.8406 91.9871 14.7137 92.0019 14.5884C92.0167 14.4631 92.0668 14.3446 92.1463 14.2466L98.7463 7.44661C98.7958 7.38947 98.8632 7.35085 98.9376 7.3371C99.0119 7.32335 99.0887 7.33529 99.1554 7.37095C99.2221 7.40661 99.2746 7.46388 99.3045 7.53335C99.3343 7.60283 99.3396 7.68038 99.3196 7.75328L98.0396 11.7666C98.0018 11.8676 97.9892 11.9763 98.0026 12.0833C98.0161 12.1903 98.0554 12.2924 98.117 12.3809C98.1786 12.4694 98.2608 12.5416 98.3564 12.5914C98.4521 12.6412 98.5584 12.667 98.6663 12.6666H103.333C103.459 12.6662 103.583 12.7016 103.69 12.7686C103.796 12.8357 103.882 12.9317 103.937 13.0455C103.991 13.1593 104.012 13.2862 103.997 13.4115C103.982 13.5368 103.932 13.6553 103.853 13.7533L97.2529 20.5533C97.2034 20.6104 97.1359 20.649 97.0616 20.6628C96.9873 20.6765 96.9104 20.6646 96.8438 20.6289C96.7771 20.5933 96.7245 20.536 96.6947 20.4665C96.6649 20.3971 96.6595 20.3195 96.6796 20.2466L97.9596 16.2333C97.9973 16.1323 98.01 16.0236 97.9965 15.9166C97.983 15.8096 97.9438 15.7075 97.8822 15.619C97.8206 15.5305 97.7384 15.4583 97.6427 15.4085C97.5471 15.3587 97.4408 15.3329 97.3329 15.3333H92.6663Z"
										className="stroke-fg-secondary"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</g>
								<circle cx={3.5} cy={13.5} r={3} fill={resolvedTheme === "light" ? "#ffffff" : "#090a0b"} className="stroke-fg-disabled" />
								<circle cx={194.5} cy={53.5} r={3} fill={resolvedTheme === "light" ? "#ffffff" : "#090a0b"} className="stroke-fg-disabled" />
								<defs>
									<filter id="filter0_d_851_5324" x={83} y={0} width={30} height={30} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
										<feFlood floodOpacity={0} result="BackgroundImageFix" />
										<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
										<feOffset dy={1} />
										<feGaussianBlur stdDeviation={0.5} />
										<feComposite in2="hardAlpha" operator="out" />
										<feColorMatrix type="matrix" values="0 0 0 0 0.0980392 0 0 0 0 0.0941176 0 0 0 0 0.105882 0 0 0 0.04 0" />
										<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_851_5324" />
										<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_851_5324" result="shape" />
									</filter>
								</defs>
							</svg>
						</div>
					</div>
				</div>
				<div className="border-border flex h-[584px] border-b-0">
					<div className="border-border flex w-1/2 flex-col gap-4 border-r pl-16 pt-16">
						<FolderGit className="text-primary" size={28} />
						<h6 className="heading-6">Seamless Design-to-Code Sync</h6>
						<p className="text-fg-secondary max-w-116 w-full">Changes made in Figma are easily replicable in the code, guaranteeing pixel-perfect consistency.</p>
					</div>
					<div className="flex w-1/2 flex-col gap-4 pl-16 pt-16">
						<SwatchBook className="text-primary" size={28} />
						<h6 className="heading-6">Streamlined component library</h6>
						<p className="text-fg-secondary max-w-116 w-full">Our vast collection of customizable components eliminates the need to reinvent the wheel.</p>
					</div>
				</div>
			</div>
		</div>
	)
}
