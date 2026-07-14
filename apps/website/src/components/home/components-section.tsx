import { Component } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import ComponentSectionItems from "./components-section/components-section-items"

export default function ComponentsSection() {
	return (
		<div className="pb-25 flex w-full flex-col items-center gap-12 px-5 pt-36 xl:gap-20">
			<div className="w-full max-w-[1230px]">
				<div className="relative flex max-w-[880px] flex-col gap-6">
					<Badge size="28" className="z-20">
						<Component className="text-primary" />
						Base Components
					</Badge>

					<svg
						className="not-xl:hidden -left-26 absolute -top-36 z-10"
						width="996"
						height="931"
						viewBox="0 0 996 931"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M 1 613 V 175 C 1 166.163 8.1634 159 17 159 H 705 C 713.837 159 721 151.837 721 143 V 0 M 1 613 H 85.5 M 1 613 V 914 C 1 922.837 8.1634 930 17 930 H 85.5 M 996 0 V 108 C 996 116 990 123 983 124 H 722"
							stroke="var(--color-soft)"
							strokeWidth={1}
						/>
					</svg>

					<h2 className="heading-2 z-20">
						<span className="from-fg to-fg-secondary bg-gradient-to-b bg-clip-text text-transparent">
							Accelerate your workflow with{" "}
						</span>
						<span className="bg-gradient-to-r from-[#7655F6] to-[#492EB8] bg-clip-text text-transparent">
							powerful components and blocks.
						</span>
					</h2>
					<p className="text-fg-secondary z-20 text-base font-normal">
						Multiple customizable components that seamlessly adapt to your
						project need of every size.
					</p>
				</div>
			</div>

			<div className="relative w-full max-w-[1230px]">
				<div className="not-xl:hidden bg-bg absolute -top-[70px] right-10 z-30 px-2">
					<span className="text-fg-tertiary text-xs">
						Press{" "}
						<Badge
							size="20"
							variant="outline"
							color="neutral"
							className="text-fg-tertiary">
							CMD + K
						</Badge>{" "}
						To search for components
					</span>
				</div>

				<svg
					className="not-xl:hidden -right-25 absolute bottom-[calc(93%)] z-20"
					xmlns="http://www.w3.org/2000/svg"
					width={999}
					height={98}
					viewBox="0 0 999 98"
					fill="none">
					<defs>
						<linearGradient
							id="lineGradient"
							x1="0"
							y1="0"
							x2="999"
							y2="0"
							gradientUnits="userSpaceOnUse">
							<stop
								offset="0%"
								stopColor="color-mix(in srgb, var(--color-bg) 4%, transparent)"
							/>
							<stop offset="30%" stopColor="var(--color-soft)" />
							<stop offset="100%" stopColor="var(--color-soft)" />
						</linearGradient>
					</defs>

					<path
						d="M 0 0 L 985 0 C 997 1 999 5 999 16 L 999 81 C 999 90 998 96 988 98 L 928 98"
						stroke="url(#lineGradient)"
						strokeWidth={1}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>

				<div className="relative z-10 grid w-full grid-cols-1 gap-4 gap-x-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
					<ComponentSectionItems />
				</div>

				{/* Gradient overlay */}
				<div className="from-bg/4 to-bg absolute bottom-0 z-10 h-[150px] w-full bg-gradient-to-b" />
				<div className="from-bg/4 to-bg absolute bottom-[-4.35rem] z-10 h-[70px] w-full bg-gradient-to-t" />
			</div>

			<Button variant="outline" color="neutral" className="z-40" asChild>
				<Link href="/components">
					<Component />
					View all Components
				</Link>
			</Button>
		</div>
	)
}
