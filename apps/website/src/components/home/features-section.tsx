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

					<svg className="absolute bottom-1/2 left-1/2 -translate-x-1/2" width="1095" height="350" viewBox="0 0 1095 350" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0.433594 1.2504L70.1484 122C73.1494 127.198 78.6956 130.4 84.6976 130.4L177.71 130.4C184.379 130.4 190.417 134.346 193.095 140.454L280.203 339.097C282.882 345.205 288.886 349.15 295.555 349.15C444.741 349.15 649.277 349.15 798.467 349.15C805.147 349.15 811.159 345.193 813.831 339.071L900.956 139.479C903.629 133.358 909.674 129.4 916.353 129.4L1009.35 129.4C1015.35 129.4 1020.89 126.198 1023.89 121L1093.61 0.250397"
							stroke="#1C1D21"
						/>
					</svg>

					{/* Left side line */}
					{/* <svg className="-left-200 absolute top-1/2" width="698" height="798" viewBox="0 0 698 798" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M245 609.5H205C191.745 609.5 181 598.755 181 585.5V475.441C181 469.076 178.471 462.971 173.971 458.471L8.52944 293.029C4.02856 288.529 1.5 282.424 1.5 276.059V0"
							stroke="url(#paint0_linear_1_26452)"
						/>
						<rect x="125.5" y="410" width="5" height="5" rx="2.5" fill="#090A0B" />
						<rect x="127" y="411.5" width="2" height="2" rx="1" fill="#26272C" />
						<path d="M495 463L464.065 494.749C459.548 499.385 453.349 502 446.876 502H285C271.745 502 261 512.745 261 526V798" stroke="url(#paint1_linear_1_26452)" />
						<path d="M261 606V526C261 512.745 271.745 502 285 502H417" stroke="url(#paint2_linear_1_26452)" />
						<defs>
							<linearGradient id="paint0_linear_1_26452" x1="197" y1="-158" x2="196.66" y2="689.5" gradientUnits="userSpaceOnUse">
								<stop stop-color="#060637" stop-opacity="0" />
								<stop offset="0.9" stop-color="#1C1D21" />
							</linearGradient>
							<linearGradient id="paint1_linear_1_26452" x1="277.326" y1="798" x2="474.726" y2="432.852" gradientUnits="userSpaceOnUse">
								<stop stop-color="#060637" stop-opacity="0" />
								<stop offset="0.15" stop-color="#1C1D21" />
								<stop offset="0.85" stop-color="#1C1D21" />
								<stop offset="1" stop-color="#060637" stop-opacity="0" />
							</linearGradient>
							<linearGradient id="paint2_linear_1_26452" x1="243.437" y1="627.677" x2="431.51" y2="475.893" gradientUnits="userSpaceOnUse">
								<stop stop-color="#623DF5" />
								<stop offset="1" stop-color="#060637" stop-opacity="0" />
							</linearGradient>
						</defs>
					</svg> */}
				</div>
				<div className="flex w-full max-w-[708px] flex-col gap-6 text-center">
					<h2 className="heading-2 text-center">
						A design system built for speed, <span className="bg-gradient-to-r from-[#7655F6] to-[#492EB8] bg-clip-text text-transparent">scale and simplicity.</span>
					</h2>
					<p className="text-fg-secondary text-base font-normal">
						From tons of figma Components & Multiple Responsive Ui blocks to production-ready React components, Radian gives you everything you need to design, build, and ship
						faster.
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
						<div className="absolute bottom-0 right-0">
							<div className="bg-fill1 max-h-[200px] max-w-[300px] overflow-hidden rounded-xl rounded-b-none rounded-r-none border border-b-0 border-r-0">
								<div className="text-fg-tertiary flex items-center justify-between px-4 py-3 text-xs">
									<div className="gap-1.25 inline-flex items-center">
										<span className="bg-fg-disabled size-2 rounded-full"></span>
										<span className="bg-fg-disabled size-2 rounded-full"></span>
										<span className="bg-fg-disabled size-2 rounded-full"></span>
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
					<div className="flex-2/3 border-border gap-22 flex flex-col border-r">
						<div className="flex flex-col gap-4 pl-16 pt-16">
							<LayoutDashboard className="text-primary" size={28} />
							<h6 className="heading-6">Reusable UI Blocks</h6>
							<p className="text-fg-secondary max-w-116 w-full">From keyboard navigation to structural semantics, everything follows modern accessibility standards.</p>
						</div>
						<div className="pl-25 flex items-center gap-[72px]">
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
							<div className="h-full rounded-xl rounded-b-none border border-b-0">
								<div className="flex justify-center gap-2 border border-l-0 border-r-0 border-t-0 px-6 pb-4">
									<div className="bg-fill4-alpha w-43 h-23 rounded-md rounded-t-none" />
									<div className="bg-fill4-alpha w-43 h-23 rounded-md rounded-t-none" />
								</div>
								<div className="flex flex-col p-6">
									<div className="flex flex-col gap-2">
										<section className="bg-primary-hover h-0.5 w-4 rounded-lg" />
										<p className="text-fg-secondary text-sm font-semibold">Blogs Section #03</p>
									</div>
									<div className="mt-1.5 flex flex-col gap-1.5">
										<div className="h-0.75 bg-fg-tertiary w-32 rounded-lg" />
										<div className="h-0.75 bg-fg-tertiary w-23.25 rounded-lg" />
									</div>
									<div className="mt-4 flex justify-center gap-2 overflow-hidden">
										<div className="bg-fill4-alpha w-43 h-23 rounded-md rounded-t-none" />
										<div className="bg-fill4-alpha w-43 h-23 rounded-md rounded-t-none" />
									</div>
								</div>
							</div>
						</div>
						{/* <div></div> */}
					</div>
					<div className="flex-1/3">
						<div className="pr-15.75 relative flex flex-col gap-4 pl-16 pt-16">
							<CircleGauge className="text-primary" size={28} />
							<h6 className="heading-6">Performance First Design</h6>
							<p className="text-fg-secondary">Built with lightweight code and minimal DOM to deliver fast-loading, snappy experiences.</p>
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
