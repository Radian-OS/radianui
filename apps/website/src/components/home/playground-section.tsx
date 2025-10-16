"use client"

import { useState } from "react"
import { Copy, LockKeyhole, Plus, Share, Squircle, SwatchBook } from "lucide-react"
import { BorderBeam } from "@/registry/animated/border-beam"
import { Badge } from "@/registry/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import PlaygroundSignin from "./playground-signin"

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
	grey: {
		label: "Grey",
		icon: <Squircle size={20} className="fill-fg-tertiary stroke-fg-tertiary" />,
	},
}

type COLOR_VALUES_TYPE = keyof typeof COLOR_VALUES

export default function PlaygroundSection() {
	const [color, setColor] = useState<COLOR_VALUES_TYPE>("violet")

	return (
		<div className="py-15 min-[1920px]:pt-25 flex flex-col items-center gap-10 px-5 min-[1920px]:gap-16 min-[1920px]:px-60 min-[1920px]:py-20">
			<div className="border-soft align-center pt-15 xl:px-15 relative flex justify-center rounded-t-3xl px-5 xl:border-l xl:border-r xl:border-t">
				<div className="border-bg absolute bottom-0 z-10 h-1/3 w-full border-b border-l border-r bg-transparent"></div>
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

			<div className="border-soft bg-bg z-20 flex aspect-video w-full max-w-[1440px] flex-col gap-2.5 rounded-2xl border p-3">
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
				<div className="border-soft bg-bg flex h-full w-full flex-col rounded-xl border">
					<div className="border-soft border-b p-3">
						<Tabs value={color} onValueChange={(value) => setColor(value as COLOR_VALUES_TYPE)}>
							<TabsList size="md" variant="default" defaultValue="violet">
								{(Object.keys(COLOR_VALUES) as COLOR_VALUES_TYPE[]).map((color) => (
									<TabsTrigger key={color} value={color}>
										{COLOR_VALUES[color].icon}
										<span className="not-md:hidden">{COLOR_VALUES[color].label}</span>
									</TabsTrigger>
								))}
							</TabsList>
						</Tabs>
					</div>
					<div className="flex flex-1">
						<div className="border-soft flex-1 border-r">Code</div>
						<div className={`color-${color} w-[480px]`}>
							<PlaygroundSignin />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
