"use client"

import React from "react"
import { ChevronDown, RotateCcw, ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from "@/styles/default/ui/card"

function SubtleGridAnimation() {
	const containerRef = React.useRef<HTMLDivElement>(null)
	const [activeBoxes, setActiveBoxes] = React.useState<
		Array<{ id: number; col: number; row: number; key: number }>
	>([])

	React.useEffect(() => {
		const pickBox = (id: number) => {
			const width = containerRef.current?.clientWidth ?? 500
			const height = containerRef.current?.clientHeight ?? 900
			const maxCols = Math.max(3, Math.floor(width / 80) - 1)
			const maxRows = Math.max(4, Math.floor(height / 80) - 1)
			return {
				id,
				col: Math.floor(Math.random() * maxCols),
				row: Math.floor(Math.random() * maxRows),
				key: Date.now() + id + Math.random(),
			}
		}

		// Initialize with 2 boxes
		setActiveBoxes([pickBox(1), pickBox(2)])

		// Box 1 cycles every 3.6s
		const interval1 = setInterval(() => {
			setActiveBoxes((prev) => [pickBox(1), prev[1] || pickBox(2)])
		}, 3600)

		// Box 2 cycles every 3.6s, staggered by 1.8s
		let interval2: NodeJS.Timeout
		const timeout = setTimeout(() => {
			setActiveBoxes((prev) => [prev[0] || pickBox(1), pickBox(2)])
			interval2 = setInterval(() => {
				setActiveBoxes((prev) => [prev[0] || pickBox(1), pickBox(2)])
			}, 3600)
		}, 1800)

		return () => {
			clearInterval(interval1)
			clearTimeout(timeout)
			if (interval2) clearInterval(interval2)
		}
	}, [])

	return (
		<div
			ref={containerRef}
			className="pointer-events-none absolute inset-0 overflow-hidden"
			aria-hidden="true">
			{/* Dynamically animating lighter boxes */}
			{activeBoxes.map((box) => (
				<motion.div
					key={box.key}
					className="pointer-events-none absolute rounded-xs border border-white/[0.08] bg-white/[0.08] shadow-xs"
					style={{
						left: box.col * 80,
						top: box.row * 80,
						width: 80,
						height: 80,
					}}
					initial={{ opacity: 0 }}
					animate={{ opacity: [0, 0.85, 0.85, 0] }}
					transition={{
						duration: 3.2,
						times: [0, 0.35, 0.65, 1],
						ease: "easeInOut",
					}}
				/>
			))}
		</div>
	)
}

export function LoginFeatureCard() {
	return (
		<Card className="relative flex h-full min-h-screen w-full flex-col items-center justify-between overflow-hidden rounded-none border-0 bg-gradient-to-b from-[#222429] via-[#141518] to-[#0b0c0e] px-6 py-8 text-white shadow-none sm:px-8 sm:py-10">
			{/* Architectural Grid Background Overlay (80px x 80px Bigger Grid Boxes) */}
			<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px] opacity-40" />

			{/* Subtle Background Grid Box Animation (boxes becoming lighter) */}
			<SubtleGridAnimation />

			{/* Soft Ambient Radial Light Glow in Cool Grey */}
			<div className="pointer-events-none absolute top-1/4 left-1/2 size-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-400/10 blur-3xl" />

			{/* Top Stage: 3 Layered Dashboard Cards */}
			<div className="relative z-10 flex w-full flex-1 items-center justify-center pt-2 pb-0">
				<div className="relative h-[520px] w-[430px] max-w-full">
					{/* Card 2: "Future Funds" (z-20, moved more 20px right to left-[-40px]) */}
					<div className="absolute top-[120px] left-[-40px] z-20 w-[230px]">
						<div className="relative rounded-[22px] border border-white/25 bg-white/10 p-1 shadow-[0_16px_36px_-6px_rgba(0,0,0,0.35)] backdrop-blur-sm">
							<Card className="w-full gap-2 rounded-[16px] border-0 bg-white p-3.5 text-neutral-900 shadow-sm">
								<CardHeader className="p-0">
									<CardTitle className="text-xs font-bold text-neutral-900">
										Future Funds
									</CardTitle>
								</CardHeader>

								<CardContent className="flex flex-col gap-2 p-0 pt-0.5">
									{/* Item 1: Bucket List Trip */}
									<div className="flex flex-col gap-0.5">
										<span className="text-[10px] font-bold text-neutral-900">
											Bucket List Trip
										</span>
										<span className="text-[8.5px] text-neutral-400">
											Due date — Apr 09, 2025
										</span>
										<div className="flex items-baseline gap-1 text-[10px]">
											<span className="font-bold text-neutral-900">$1900</span>
											<span className="text-[8.5px] font-semibold text-[#0D7482]">
												/ $6,500
											</span>
										</div>
										<div className="mt-0.5 h-1 w-full overflow-hidden rounded-full bg-neutral-100">
											<div className="h-full w-[38%] rounded-full bg-[#0D7482]" />
										</div>
										<div className="flex items-center justify-between text-[8px]">
											<span className="text-neutral-400">
												Amount Required to Complete
											</span>
											<span className="font-bold text-[#0D7482]">
												4500 (62%)
											</span>
										</div>
									</div>

									<div className="border-t border-neutral-100" />

									{/* Item 2: Plan */}
									<div className="flex flex-col gap-0.5">
										<span className="text-[10px] font-bold text-neutral-900">
											Dream Plan
										</span>
										<span className="text-[8.5px] text-neutral-400">
											Due date — Apr 18, 2025
										</span>
										<div className="flex items-baseline gap-1 text-[10px]">
											<span className="font-bold text-neutral-900">$8,000</span>
											<span className="text-[8.5px] font-semibold text-[#0D7482]">
												/ $20,000
											</span>
										</div>
										<div className="mt-0.5 h-1 w-full overflow-hidden rounded-full bg-neutral-100">
											<div className="h-full w-[75%] rounded-full bg-[#F59E0B]" />
										</div>
										<div className="flex items-center justify-between text-[8px]">
											<span className="text-neutral-400">
												Amount Required to Complete
											</span>
											<span className="font-bold text-[#0D7482]">
												$12,000 (75%)
											</span>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>

					{/* Card 1: Top Card "Financial Plan" (z-10, moved more 20px right to left-[75px]) */}
					<div className="absolute top-0 left-[75px] z-10 w-[235px]">
						<div className="relative rounded-[22px] border border-white/25 bg-white/10 p-1 shadow-[0_16px_36px_-6px_rgba(0,0,0,0.35)] backdrop-blur-sm">
							<Card className="w-full gap-2 rounded-[16px] border-0 bg-white p-3.5 text-neutral-900 shadow-sm">
								{/* Header */}
								<CardHeader className="flex flex-row items-center justify-between p-0">
									<CardTitle className="text-xs font-bold text-neutral-900">
										Financial Plan
									</CardTitle>
									<span className="flex items-center gap-0.5 text-[8.5px] font-medium text-neutral-400">
										This Month{" "}
										<ChevronDown className="size-2 text-neutral-400" />
									</span>
								</CardHeader>

								{/* Donut Chart & Available Metrics */}
								<CardContent className="p-0">
									<div className="flex items-center gap-2 pt-0.5">
										{/* SVG Donut Chart */}
										<div className="relative size-13 shrink-0">
											<svg viewBox="0 0 60 60" className="size-full -rotate-90">
												<circle
													cx="30"
													cy="30"
													r="21"
													fill="none"
													stroke="#F1F5F9"
													strokeWidth="6.5"
												/>
												{/* Amber Segment ~20% (top-right) */}
												<circle
													cx="30"
													cy="30"
													r="21"
													fill="none"
													stroke="#F59E0B"
													strokeWidth="7"
													strokeDasharray="18 132"
													strokeDashoffset="-3"
													strokeLinecap="round"
												/>
												{/* Coral Segment ~15% (right) */}
												<circle
													cx="30"
													cy="30"
													r="21"
													fill="none"
													stroke="#F43F5E"
													strokeWidth="7"
													strokeDasharray="14 132"
													strokeDashoffset="-28"
													strokeLinecap="round"
												/>
												{/* Teal/Cyan Segment ~65% (bottom & left) */}
												<circle
													cx="30"
													cy="30"
													r="21"
													fill="none"
													stroke="#0D7482"
													strokeWidth="7"
													strokeDasharray="68 132"
													strokeDashoffset="-50"
													strokeLinecap="round"
												/>
											</svg>
										</div>

										{/* Value & Legend */}
										<div className="flex flex-col">
											<div className="text-[13px] font-bold tracking-tight text-neutral-900">
												$ 2,005.45
											</div>
											<div className="text-[9px] font-medium text-neutral-400">
												Available
											</div>
											<div className="mt-0.5 flex flex-col gap-0.5 text-[8.5px] text-neutral-600">
												<span className="flex items-center gap-1">
													<span className="size-1.5 rounded-full bg-[#F59E0B]" />
													Budgeted Expenses
												</span>
												<span className="flex items-center gap-1">
													<span className="size-1.5 rounded-full bg-[#F43F5E]" />
													Additional Spending
												</span>
												<span className="flex items-center gap-1">
													<span className="size-1.5 rounded-full bg-[#0D7482]" />
													In Stock
												</span>
											</div>
										</div>
									</div>

									{/* Anticipated Costs Section */}
									<div className="mt-2 border-t border-neutral-100 pt-1.5">
										<div className="text-[9px] font-bold text-neutral-800">
											Anticipated Costs
										</div>
										<div className="mt-1 flex items-center gap-2.5 text-[8px]">
											{/* Item 1: Samsung TV */}
											<div className="flex flex-1 flex-col gap-0.5">
												<div className="flex items-center justify-between">
													<span className="flex items-center gap-0.5 font-semibold text-neutral-700">
														Samsung Tv{" "}
														<ChevronDown className="size-2 text-neutral-400" />
													</span>
													<span className="text-[7.5px] text-neutral-400">
														$190 / $249
													</span>
												</div>
												<div className="h-1 w-full overflow-hidden rounded-full bg-neutral-100">
													<div className="h-full w-[75%] rounded-full bg-[#0D7482]" />
												</div>
											</div>

											{/* Item 2: Estate */}
											<div className="flex flex-1 flex-col gap-0.5">
												<div className="flex items-center justify-between">
													<span className="font-semibold text-neutral-700">
														Estate...
													</span>
													<span className="text-[7.5px] text-neutral-400">
														$1,200
													</span>
												</div>
												<div className="h-1 w-full overflow-hidden rounded-full bg-neutral-100">
													<div className="h-full w-[45%] rounded-full bg-[#F59E0B]" />
												</div>
											</div>
										</div>
									</div>

									{/* Action Button */}
									<button
										type="button"
										className="mt-2 w-full rounded-md bg-[#132E35] py-1 text-center text-[9px] font-semibold text-white shadow-xs transition-colors hover:bg-neutral-900">
										Explore All Plans
									</button>
								</CardContent>
							</Card>
						</div>
					</div>

					{/* Card 3: Card "Capital Allocations" (z-30, moved more 20px right to left-[75px]) */}
					<div className="absolute top-[280px] left-[75px] z-30 w-[245px]">
						<div className="relative rounded-[22px] border border-white/25 bg-white/10 p-1 shadow-[0_20px_45px_-6px_rgba(0,0,0,0.45)] backdrop-blur-sm">
							<Card className="w-full gap-1.5 rounded-[16px] border-0 bg-white p-3.5 text-neutral-900 shadow-sm">
								<CardHeader className="flex flex-row items-center justify-between p-0">
									<CardTitle className="text-xs font-bold text-neutral-900">
										Capital Allocations
									</CardTitle>
									<span className="flex items-center gap-0.5 text-[8px] text-neutral-400">
										<RotateCcw className="size-2 text-neutral-400" /> Updated
										just now
									</span>
								</CardHeader>

								<CardContent className="flex flex-col gap-1 p-0">
									{/* Total Value */}
									<div className="flex flex-col">
										<span className="text-[8.5px] font-medium text-neutral-400">
											Total value
										</span>
										<div className="flex items-center gap-1.5">
											<span className="text-[13px] font-bold tracking-tight text-neutral-900">
												$ 17,366.00
											</span>
											<span className="flex items-center gap-0.5 rounded bg-amber-100 px-1 py-0.5 text-[8px] font-bold text-amber-700">
												<ArrowUpRight className="size-2" /> 12%
											</span>
										</div>
									</div>

									{/* List of Investments */}
									<div className="flex flex-col gap-1 border-t border-neutral-100 pt-1 text-[9px]">
										{/* Item 1 */}
										<div className="flex items-center justify-between py-0.5">
											<div>
												<div className="font-semibold text-neutral-900">
													iPhone 15 Pro Max
												</div>
												<div className="text-[8px] text-neutral-400">
													Apple • 40 shares
												</div>
											</div>
											<div className="text-right">
												<div className="font-bold text-neutral-900">$1,000</div>
												<div className="text-[8px] font-semibold text-emerald-600">
													+3.8%
												</div>
											</div>
										</div>

										{/* Item 2 */}
										<div className="flex items-center justify-between py-0.5">
											<div>
												<div className="font-semibold text-neutral-900">
													Gree Air Conditioner
												</div>
												<div className="text-[8px] text-neutral-400">
													Gree • 25 shares
												</div>
											</div>
											<div className="text-right">
												<div className="font-bold text-neutral-900">$700</div>
												<div className="text-[8px] font-semibold text-emerald-600">
													+2.5%
												</div>
											</div>
										</div>

										{/* Item 3 */}
										<div className="flex items-center justify-between py-0.5">
											<div>
												<div className="font-semibold text-neutral-900">
													Tvs Apache RTR Bike
												</div>
												<div className="text-[8px] text-neutral-400">
													TVS • 0.1 BTC
												</div>
											</div>
											<div className="text-right">
												<div className="font-bold text-neutral-900">$1,400</div>
												<div className="text-[8px] font-semibold text-emerald-600">
													+4.2%
												</div>
											</div>
										</div>
									</div>

									{/* Action Button */}
									<button
										type="button"
										className="mt-1.5 w-full rounded-md bg-[#132E35] py-1.5 text-center text-[9px] font-semibold text-white shadow-xs transition-colors hover:bg-neutral-900">
										Review Investment
									</button>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Section: Left-aligned Title & Description (moved 20px right, 75% width) */}
			<div className="relative z-10 mt-auto flex w-full flex-col items-start pt-8 pb-1 pl-5 text-left sm:pb-2">
				{/* Headline (24px, 75% width, left-aligned) */}
				<h2 className="max-w-[75%] text-left text-[24px] leading-tight font-bold tracking-tight text-white">
					Design better. Build faster.
				</h2>

				{/* Description (14px, 75% width, left-aligned) */}
				<p className="mt-2.5 max-w-[75%] text-left text-[14px] leading-relaxed text-white/75">
					Radian gives you the tools and resources to create polished digital
					products with less effort and more confidence.
				</p>
			</div>
		</Card>
	)
}
