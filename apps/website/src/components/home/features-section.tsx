"use client"

import React, { useEffect, useRef, useState } from "react"
import {
	ArrowDownRight,
	ArrowUpRight,
	ChevronDown,
	CircleGauge,
	Component,
	FolderGit,
	Grid,
	LayoutDashboard,
	MousePointer2,
	ScanEye,
	ShipWheel,
	SquareTerminal,
	SwatchBook,
} from "lucide-react"
import { useTheme } from "next-themes"
// import ShikiHighlighter from "react-shiki"
import { cn } from "@/lib/utils"
import { InfiniteScroll } from "@/registry/animated/infinite-scroll"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code-area"
import { Skeleton } from "@/registry/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/ui/table"

// import { FlickeringGrid } from "../effects/flickering"

const FeaturesSectionNew = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const [pos, setPos] = useState({ x: 0, y: 150 })
	const [animated, setAnimated] = useState(false)

	useEffect(() => {
		if (!containerRef.current) return
		const containerWidth = containerRef.current.offsetWidth
		let direction = 1
		let x = lensSize / 2

		const speed = 2 // pixels per frame
		const interval = setInterval(() => {
			x += direction * speed
			if (x + lensSize / 2 >= containerWidth || x - lensSize / 2 <= 0) {
				direction *= -1 // reverse when hitting edges
			}
			setPos((prev) => ({ ...prev, x }))
		}, 16) // ~60fps

		setAnimated(true)
		return () => clearInterval(interval)
	}, [])

	const lensSize = 180
	const zoom = 2

	const items = [
		"Circle Clover - Purple",
		"Knotted Links - Purple",
		"Sun Burst - Red",
		"Wave Globe - Green",
		"Flow Cross - Blue",
		"Octo Frame - Blue",
		"Petal Grid - Green",
		"Gradient - Purple",
	]

	const [activeIndex, setActiveIndex] = useState(2) // Start at "Sun Burst - Red"

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex((prevIndex) => (prevIndex + 1) % items.length)
		}, 2000)

		return () => {
			clearInterval(interval)
		}
	}, [items.length])

	const colorMap: Record<string, { gradient: string; bg: string }> = {
		"Circle Clover - Purple": {
			gradient: "from-[#C084FC] to-[#9333EA]",
			bg: "bg-[#9333EA]",
		},
		"Knotted Links - Purple": {
			gradient: "from-[#A78BFA] to-[#7C3AED]",
			bg: "bg-[#7C3AED]",
		},
		"Sun Burst - Red": {
			gradient: "from-[#FB7185] to-[#DC2626]",
			bg: "bg-[#DC2626]",
		},
		"Wave Globe - Green": {
			gradient: "from-[#86EFAC] to-[#16A34A]",
			bg: "bg-[#16A34A]",
		},
		"Flow Cross - Blue": {
			gradient: "from-[#93C5FD] to-[#2563EB]",
			bg: "bg-[#2563EB]",
		},
		"Octo Frame - Blue": {
			gradient: "from-[#60A5FA] to-[#1E40AF]",
			bg: "bg-[#1E40AF]",
		},
		"Petal Grid - Green": {
			gradient: "from-[#4ADE80] to-[#15803D]",
			bg: "bg-[#15803D]",
		},
		"Gradient - Purple": {
			gradient: "from-[#D8B4FE] to-[#7E22CE]",
			bg: "bg-[#7E22CE]",
		},
	}

	const { gradient, bg } = colorMap[items[activeIndex]] || colorMap["Sun Burst - Red"]

	const { resolvedTheme } = useTheme()
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

	return (
		<div className="flex flex-col items-center gap-20 pb-40 pt-40">
			<div className="flex flex-col items-center gap-8 px-5">
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
			<div className="flex w-full max-w-[1400px] flex-col gap-6 px-5">
				<div className="flex h-full w-full flex-col gap-6 rounded-xl lg:flex-row">
					<div className="lg:flex-2/3 pt-15 border-soft relative flex flex-col gap-12 overflow-hidden rounded-xl border">
						<div className="h-30 from-bg/5 to-bg absolute bottom-0 z-10 w-full bg-gradient-to-b" />
						<div className="flex items-center justify-between px-7 sm:pl-12">
							<div className="flex flex-col gap-4">
								<span className="pb-2">
									<ScanEye size={28} className="stroke-primary-hover" />
								</span>
								<h6 className="heading-6 font-medium">High Quality Base Components</h6>
								<p className="text-fg-secondary w-full max-w-[420px] text-sm">
									From keyboard navigation to structural semantics, everything follows modern accessibility standards.
								</p>
							</div>
						</div>
						<div className="pl-0 pr-0 md:pl-12 lg:px-12">
							<div className="bg-fill1 rounded-b-none! w-full pt-5 md:rounded-l-2xl md:pl-5 lg:rounded-t-2xl lg:px-5">
								<div className="lg:border-r-1 md:border-l-1 rounded-b-none! overflow-hidden border border-b-0 border-l-0 border-r-0 md:rounded-l-2xl lg:rounded-t-2xl">
									<div ref={containerRef} className="relative overflow-hidden">
										{/* Base table */}
										<Table className="relative w-full select-none">
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
														<TableCell className={cn("flex items-center", data.FY1_growth > 0 ? "text-success-text" : "text-error-text")}>
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

										{/* Magnifier overlay */}
										{animated && (
											<div
												className="border-3 bg-fill2 pointer-events-none absolute rounded-full"
												style={{
													width: lensSize,
													height: lensSize,
													top: pos.y - lensSize / 2,
													left: pos.x - lensSize / 2,
													overflow: "hidden",
													boxShadow: "0 4px 8px hsla(260, 6%, 10%, 0.08)",
												}}>
												{/* instead of just lens-size, make inner zoomed area cover full table */}
												<div
													className="absolute h-full w-full"
													style={{
														transform: `scale(${zoom})`,
														transformOrigin: `${pos.x}px ${pos.y}px`,
														top: -pos.y * (zoom - 1),
														left: -pos.x * (zoom - 1),
														width: containerRef.current?.offsetWidth ?? "100%",
														height: containerRef.current?.offsetHeight ?? "100%",
													}}>
													<div className="absolute left-0 top-0 w-full">
														{/* full cloned table */}
														<Table className="w-full select-none">
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
																		<TableCell className={cn("flex items-center", data.FY1_growth > 0 ? "text-success-text" : "text-error-text")}>
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
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="lg:flex-1/3 border-soft relative flex flex-col gap-12 overflow-hidden rounded-xl border">
						<div className="h-30 from-bg/5 to-bg absolute bottom-0 z-10 w-full bg-gradient-to-b" />
						<div className="pt-15 flex flex-col gap-4 px-7 sm:px-12">
							<span className="pb-2">
								<SquareTerminal size={28} className="stroke-primary-hover" />
							</span>
							<h6 className="heading-6 font-medium">Copy-paste or Install via CLI</h6>
							<p className="text-fg-secondary w-full max-w-[420px] text-sm">Install with one command or copy the snippet. No configuration. No waiting. Just build.</p>
						</div>
						<div className="gap-12.25 flex flex-col">
							<div className="pr-11.5 pl-12">
								<div className="w-104 border-soft flex items-center justify-center rounded-xl border p-1.5">
									<div className="bg-elevation-level1 border-soft pr-13.25 text-fg-secondary w-full rounded-[10px] border py-3 pl-3 font-mono text-sm">
										<span className="text-primary-text">npx</span> <span className="text-info-text">radianui</span> <span className="text-success-text">add</span>{" "}
										<span className="text-warning-text">[component]</span>
									</div>
								</div>
							</div>

							<div className="pl-13.5">
								<div className="max-w-101 border-soft rounded-r-0 w-full rounded-r-none rounded-t-xl border border-b-0 border-r-0">
									<div className="border-soft flex rounded-t-xl border border-l-0 border-r-0 border-t-0 px-4 py-3">
										<div className="gap-1.25 flex items-center">
											<Skeleton className="bg-fg-disabled size-2 rounded-full" />
											<Skeleton className="bg-fg-disabled size-2 rounded-full" />
											<Skeleton className="bg-fg-disabled size-2 rounded-full" />
										</div>
										<div className="text-fg-tertiary flex grow items-center justify-center text-xs">radianos.js</div>
									</div>
									<div>
										<CodeArea
											className="h-[155px]"
											code={`import { Button, Card, Heading, Text } from '@radianos/ui';
function MyDashboard() {
  return (
    <Card>
      <Heading as="h2">Welcome to Radian</Heading>
      <Text>
        Build beautiful interfaces with Radian.
      </Text>
      <Button
        variant="primary"
        onClick={() => console.log('Button clicked!')}
      >
        Get Started
      </Button>
    </Card>
  );
}

export default MyDashboard;`}
											theme={resolvedTheme === "light" ? "github-light-high-contrast" : "github-dark-high-contrast"}
											language="tsx"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex h-full w-full flex-col gap-6 rounded-xl lg:flex-row">
					<div className="border-soft pt-15 max-h-150 flex w-full flex-col gap-12 overflow-hidden rounded-xl border lg:w-1/2">
						<div className="flex flex-col gap-4 px-7 sm:pl-12">
							<span className="pb-2">
								<FolderGit size={28} className="stroke-primary-hover" />
							</span>
							<h6 className="heading-6 font-medium">Seamless Design to Code Sync</h6>
							<p className="text-fg-secondary text-sm">Changes made in Figma are easily replicable in the code, guaranteeing pixel-perfect consistency.</p>
						</div>
						<div className="sm:pl-13.5 gap-5.25 flex flex-col px-7 sm:pr-0">
							<div className="gap-9.75 flex flex-col items-center sm:flex-row">
								<div className="w-75.5 h-56.75 border-soft overflow-hidden rounded-lg border">
									<div className="border-soft flex w-full items-center border border-l-0 border-r-0 border-t-0 px-4 py-3">
										<div className="gap-1.25 flex items-center">
											<Skeleton className="bg-fg-disabled size-2 rounded-full" />
											<Skeleton className="bg-fg-disabled size-2 rounded-full" />
											<Skeleton className="bg-fg-disabled size-2 rounded-full" />
										</div>
										<div className="text-fg-tertiary flex grow items-center justify-center text-xs">Figma</div>
									</div>
									<div className="px-9.75 size-full">
										<Skeleton className="bg-fill1 size-full" />
									</div>
								</div>
								<div className="w-75.5 h-56.75 border-soft sm:translate-x-2.25 overflow-hidden rounded-lg border">
									<div className="border-soft flex w-full items-center border border-l-0 border-r-0 border-t-0 px-4 py-3">
										<div className="gap-1.25 flex items-center">
											<Skeleton className="bg-fg-disabled size-2 rounded-full" />
											<Skeleton className="bg-fg-disabled size-2 rounded-full" />
											<Skeleton className="bg-fg-disabled size-2 rounded-full" />
										</div>
										<div className="text-fg-tertiary flex grow items-center justify-center text-xs">Prod</div>
									</div>
									<div className="px-9.75 size-full">
										<Skeleton className="bg-fill1 size-full" />
									</div>
								</div>
							</div>
							<div className="gap-9.75 flex items-center">
								<div className="w-75.5 h-56.75 border-soft translate-x-2.25 overflow-hidden rounded-lg border">
									<div className="border-soft flex w-full items-center border border-l-0 border-r-0 border-t-0 px-4 py-3">
										<div className="gap-1.25 flex items-center">
											<Skeleton className="bg-fg-disabled size-2 rounded-full" />
											<Skeleton className="bg-fg-disabled size-2 rounded-full" />
											<Skeleton className="bg-fg-disabled size-2 rounded-full" />
										</div>
										<div className="text-fg-tertiary flex grow items-center justify-center text-xs">Dev</div>
									</div>
									<div className="px-9.75 size-full">
										<Skeleton className="bg-fill1 size-full" />
									</div>
								</div>
								<div className="w-75.5 h-56.75 rounded-lg"></div>
							</div>
						</div>
					</div>
					<div className="border-soft relative flex w-full flex-col gap-12 overflow-hidden rounded-xl border lg:w-1/2">
						<div className="h-30 from-bg/5 to-bg absolute bottom-0 z-10 w-full bg-gradient-to-b" />
						<div className="pt-15 flex flex-col gap-4 px-7 sm:pl-12">
							<span className="pb-2">
								<SwatchBook size={28} className="stroke-primary-hover" />
							</span>
							<h6 className="heading-6 font-medium">Themeable System</h6>
							<p className="text-fg-secondary text-sm">Edit one token to restyle your entire design system — light, dark, or custom themes.</p>
						</div>
						<div className="flex gap-14 pl-10">
							<div className="flex w-full max-w-[241px] flex-col gap-1">
								<div className={`flex w-full items-center justify-between rounded-lg border px-2.5 py-2`}>
									<span className="text-fg-secondary text-sm">Sun Burst - Red</span>
									<ChevronDown className="text-fg-tertiary" size={20} />
								</div>
								<div className="flex h-full max-h-[333px] flex-col gap-1 rounded-[10px] rounded-b-none border border-b-0 px-1 pt-1">
									{items.map((item, index) => (
										<div key={index} className={`relative flex whitespace-nowrap rounded-md px-2 py-1.5 ${index === activeIndex ? "bg-primary-accent" : ""}`}>
											{item}
											{index === activeIndex && (
												<span className="absolute right-0 top-5">
													<MousePointer2 size={20} className={`fill-primary stroke-white`} />
													<Badge className="relative left-5" variant="strong">
														David
													</Badge>
												</span>
											)}
										</div>
									))}
								</div>
							</div>
							<div className="border-soft relative h-[322px] w-[512px] overflow-hidden rounded-xl rounded-r-none border border-r-0 pl-1.5 pt-1.5">
								{/* gradient that changes dynamically */}
								<div className={`h-25 w-full rounded-xl rounded-r-none bg-gradient-to-r ${gradient}`} />

								{/* ShipWheel background box */}
								<div className={`top-15 border-6 border-elevation-level1 absolute left-6 flex size-20 items-center justify-center rounded-2xl ${bg}`}>
									<ShipWheel className="text-white" size={36} />
								</div>

								{/* rest same */}
								<div className="pl-6.5 flex flex-col gap-2.5 pt-10">
									<div className="flex flex-col gap-1.5">
										<h5 className="heading-5 whitespace-nowrap">Hisoka Meureum</h5>
										<p className="text-fg-secondary whitespace-nowrap text-sm">Founder and CEO at Acme</p>
									</div>
									<div className="whitespace-nowrap text-sm">4200 followers</div>
									<div className="pt-1.5">
										<Button className="border-primary-hover border bg-gradient-to-b from-[#6347EB] to-[#5133CF] shadow-[0px_4px_4px_rgba(24,25,27,0.16)] ring-[1.5px] ring-[#5B3FE0] hover:from-[#6A52F2] hover:to-[#5B3FE0]">
											Send Message
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="relative flex h-full w-full flex-col gap-6 rounded-xl lg:flex-row">
					<div className="border-soft pt-15 relative flex flex-col gap-12 rounded-xl border lg:w-[510px]">
						<div className="flex flex-col gap-4 px-7 sm:px-8 lg:px-12">
							<span className="pb-2">
								<LayoutDashboard size={28} className="stroke-primary-hover" />
							</span>
							<h6 className="heading-6 font-medium">Reusable UI Blocks</h6>
							<p className="text-fg-secondary text-sm">Get access to high quality pre-built UI blocks, designed and developed to plug into any layout and ready for use</p>
						</div>
						<div className="h-30 from-bg/5 to-bg w-15 absolute top-[220px] z-10 bg-gradient-to-l" />
						<div className="h-30 from-bg/5 to-bg w-15 absolute right-0 top-[220px] z-10 bg-gradient-to-r" />

						<InfiniteScroll>
							<div className="relative flex items-center justify-center gap-2">
								<div className="py-1.75 border-soft w-45 flex h-9 items-center rounded-lg border px-2.5">
									<div className="bg-primary-border border-soft-alpha flex size-[21.6px] items-center justify-center rounded-[7.2px] border">
										<Grid className="text-white" size={14.4} />
									</div>
									<p className="text-fg-secondary flex grow items-center justify-center text-xs">Blogs Section / 01</p>
								</div>
								<div className="py-1.75 border-soft w-45 flex h-9 items-center rounded-lg border px-2.5">
									<div className="bg-primary-border border-soft-alpha flex size-[21.6px] items-center justify-center rounded-[7.2px] border">
										<Grid className="text-white" size={14.4} />
									</div>
									<p className="text-fg-secondary flex grow items-center justify-center text-xs">Blogs Section / 02</p>
								</div>
								<div className="py-1.75 border-soft w-45 flex h-9 items-center rounded-lg border px-2.5">
									<div className="bg-primary-border border-soft-alpha flex size-[21.6px] items-center justify-center rounded-[7.2px] border">
										<Grid className="text-white" size={14.4} />
									</div>
									<p className="text-fg-secondary flex grow items-center justify-center text-xs">Blogs Section / 03</p>
								</div>
								<div className="py-1.75 border-soft w-45 flex h-9 items-center rounded-lg border px-2.5">
									<div className="bg-primary-border border-soft-alpha flex size-[21.6px] items-center justify-center rounded-[7.2px] border">
										<Grid className="text-white" size={14.4} />
									</div>
									<p className="text-fg-secondary flex grow items-center justify-center text-xs">Blogs Section / 04</p>
								</div>
								<div className="py-1.75 border-soft w-45 flex h-9 items-center rounded-lg border px-2.5">
									<div className="bg-primary-border border-soft-alpha flex size-[21.6px] items-center justify-center rounded-[7.2px] border">
										<Grid className="text-white" size={14.4} />
									</div>
									<p className="text-fg-secondary flex grow items-center justify-center text-xs">Blogs Section / 05</p>
								</div>
							</div>
						</InfiniteScroll>

						<div className="flex items-center justify-center">
							<Skeleton className="bg-fill2 h-[359px] w-full max-w-[321px] rounded-xl rounded-b-none px-9 sm:max-w-[423px] sm:px-0" />
						</div>
					</div>
					<div className="border-soft pt-15 relative flex min-h-[488px] w-full flex-col gap-12 overflow-hidden rounded-xl border">
						<div className="flex flex-col gap-4 px-7 sm:px-8 lg:pl-12">
							<span className="pb-2">
								<CircleGauge size={28} className="stroke-primary-hover" />
							</span>
							<h6 className="heading-6 font-medium">Tree-Shakable Architecture</h6>
							<p className="text-fg-secondary text-sm">Only imports what you use ultra-light bundles for fast and improved performance.</p>
						</div>
						<div className="flex h-full gap-[23px] pl-12">
							<Skeleton className="bg-fill2 min-h-[359px] w-1/3 min-w-[140px] rounded-xl rounded-b-none" />
							<Skeleton className="bg-fill2 min-h-[359px] w-2/3 min-w-[421px] rounded-xl rounded-b-none" />
						</div>
						<div className="h-30 from-bg/5 to-bg absolute bottom-0 z-10 w-full bg-gradient-to-b" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default FeaturesSectionNew
