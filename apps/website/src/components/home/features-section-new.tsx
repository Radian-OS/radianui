import React from "react"
import { ArrowDownRight, ArrowUpRight, Component, ScanEye, SquareTerminal } from "lucide-react"
import { useTheme } from "next-themes"
// import ShikiHighlighter from "react-shiki"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { CodeArea } from "@/registry/ui/code-area"
import { Skeleton } from "@/registry/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/ui/table"

// import { FlickeringGrid } from "../effects/flickering"

const FeaturesSectionNew = () => {
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
							stroke="var(--color-fg-disabled)"
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
			<div className="flex h-full w-full max-w-[1400px] flex-col gap-6 rounded-xl px-5 lg:flex-row">
				<div className="lg:flex-2/3 pt-15 border-soft flex flex-col gap-12 overflow-hidden rounded-xl border">
					<div className="flex items-center justify-between pl-12">
						<div className="flex flex-col gap-4">
							<span className="pb-2">
								<ScanEye size={28} className="stroke-primary-hover" />
							</span>
							<h6 className="heading-6">High Quality Base Components</h6>
							<p className="text-fg-secondary w-full max-w-[420px] text-sm">From keyboard navigation to structural semantics, everything follows modern accessibility standards.</p>
						</div>
						{/* <div className="flex h-full w-1/2 items-end justify-center px-12">
							<div>
								<FlickeringGrid
									shape="square"
									className="inset-0 z-10 max-h-[48px] max-w-[188.8px] self-end"
									squareSize={3.2}
									gridGap={3}
									color={resolvedTheme === "light" ? "#E5DFFB" : "#211452"}
									maxOpacity={0.4}
									flickerChance={0.1}
								/>
							</div>
						</div> */}
					</div>
					<div className="pl-0 pr-0 md:pl-12 lg:px-12">
						<div className="bg-fill1 rounded-b-none! w-full pt-5 md:rounded-l-2xl md:pl-5 lg:rounded-t-2xl lg:px-5">
							<div className="lg:border-r-1 md:border-l-1 rounded-b-none! overflow-hidden border border-b-0 border-l-0 border-r-0 md:rounded-l-2xl lg:rounded-t-2xl">
								<Table>
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
				<div className="lg:flex-1/3 border-soft flex flex-col gap-12 rounded-xl border">
					<div className="pt-15 flex flex-col gap-4 px-12">
						<span className="pb-2">
							<SquareTerminal size={28} className="stroke-primary-hover" />
						</span>
						<h6 className="heading-6">Copy-paste or Install via CLI</h6>
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
							<div className="max-w-101 border-soft w-full rounded-t-xl border border-b-0">
								<div className="border-soft flex rounded-t-xl border border-l-0 border-r-0 border-t-0 px-4 py-3">
									<div className="gap-1.25 flex items-center">
										<Skeleton className="bg-fg-disabled size-2 rounded-full" />
										<Skeleton className="bg-fg-disabled size-2 rounded-full" />
										<Skeleton className="bg-fg-disabled size-2 rounded-full" />
									</div>
									<div className="text-fg-tertiary flex grow items-center justify-center text-xs">radianos js</div>
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
		</div>
	)
}

export default FeaturesSectionNew
