"use client"

import {
	AppWindow,
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
	Table,
	Tag,
	Terminal,
	TextCursorInput,
	ToggleLeft,
} from "lucide-react"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Calendar } from "@/registry/ui/calendar"

export default function FeaturesSection() {
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
							strokeWidth="1"
							stroke="var(--color-soft)"
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
					<div className="flex-1/3 border-border border-r">
						<div className="flex flex-col gap-4 pl-16 pt-16">
							<Terminal className="bg-primary-focus stroke-primary border-primary rounded-xs cursor-pointer border-2" />
							<h6 className="heading-6">Copy-paste or install via command line</h6>
							<p className="text-fg-secondary">Install with one command or copy the snippet. No configuration. No waiting. Just build.</p>
						</div>
					</div>
					<div className="flex-2/3 flex flex-col gap-4 pl-16 pt-16">
						<ScanEye className="text-primary" size={28} />
						<h6 className="heading-6">Accessible Components</h6>
						<p className="text-fg-secondary max-w-116 w-full">From keyboard navigation to structural semantics, everything follows modern accessibility standards.</p>
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
								<Table />
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
					<div className="flex-2/3 border-border flex flex-col gap-4 border-r pl-16 pt-16">
						<LayoutDashboard className="text-primary" size={28} />
						<h6 className="heading-6">Reusable UI Blocks</h6>
						<p className="text-fg-secondary max-w-116 w-full">From keyboard navigation to structural semantics, everything follows modern accessibility standards.</p>
					</div>
					<div className="flex-1/3">
						<div className="pr-15.75 flex flex-col gap-4 pl-16 pt-16">
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
